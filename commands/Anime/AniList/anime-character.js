const { Command } = require('klasa');
const Discord = require("discord.js");
const request = require('node-superfetch');
const { stripIndents } = require('common-tags');
const searchGraphQL = stripIndents`
	query ($search: String) {
		characters: Page (perPage: 1) {
			results: characters (search: $search) { id }
		}
	}
`;
const resultGraphQL = stripIndents`
	query ($id: Int!) {
		Character (id: $id) {
			id
			name {
				first
				last
			}
			image {
				large
				medium
			}
			description(asHtml: false)
			siteUrl
			media(page: 1, perPage: 5) {
				edges {
					node {
						title {
							english
							userPreferred
						}
						type
						siteUrl
					}
				}
			}
		}
	}
`;
const types = {
	ANIME: 'Anime',
	MANGA: 'Manga'
};
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'anime-character',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: ["ac"],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Search for an anime character',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        function embedURL(title, url, display) {
            return `[${title}](${url.replace(/\)/g, '%27')}${display ? ` "${display}"` : ''})`;
        }
        
        function cleanAnilistHTML(html, removeLineBreaks = true) {
            let clean = html;
            if (removeLineBreaks) clean = clean.replace(/\r|\n|\f/g, '');
            clean = clean
                .replace(/<br>/g, '\n')
                .replace(/&#039;/g, '\'')
                .replace(/&quot;/g, '"')
                .replace(/<\/?i>/g, '*')
                .replace(/<\/?b>/g, '**')
                .replace(/~!|!~/g, '||')
                .replace(/&mdash;/g, '—');
            if (clean.length > 2000) clean = `${clean.substr(0, 1995)}...`;
            const spoilers = (clean.match(/\|\|/g) || []).length;
            if (spoilers !== 0 && (spoilers && (spoilers % 2))) clean += '||';
            return clean;
        }
        
        function trimArray(arr, maxLen = 10) {
            if (arr.length > maxLen) {
                const len = arr.length - maxLen;
                arr = arr.slice(0, maxLen);
                arr.push(`${len} more...`);
            }
            return arr;
        }
        let query = msg.content.split(" ").slice(1).join(" ");
		try {
			const id = await this.search(query);
			if (!id) return msg.channel.send('Could not find any results.');
			const character = await this.fetchCharacter(id);
			const embed = new Discord.MessageEmbed()
				.setColor(0x02A9FF)
				.setAuthor('AniList', 'https://i.imgur.com/iUIRC7v.png', 'https://anilist.co/')
				.setURL(character.siteUrl)
				.setThumbnail(character.image.large || character.image.medium || null)
				.setTitle(`${character.name.first || ''}${character.name.last ? ` ${character.name.last}` : ''}`)
				.setDescription(character.description ? cleanAnilistHTML(character.description, false) : 'No description.')
				.addField('❯ Appearances', trimArray(character.media.edges.map(edge => {
					const title = edge.node.title.english || edge.node.title.userPreferred;
					return embedURL(`${title} (${types[edge.node.type]})`, edge.node.siteUrl);
				}), 5).join(', '));
			return msg.channel.send(embed);
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
    }

    async search(query) {
		const { body } = await request
			.post('https://graphql.anilist.co/')
			.send({
				variables: { search: query },
				query: searchGraphQL
			});
		if (!body.data.characters.results.length) return null;
		return body.data.characters.results[0].id;
	}

	async fetchCharacter(id) {
		const { body } = await request
			.post('https://graphql.anilist.co/')
			.send({
				variables: { id },
				query: resultGraphQL
			});
		return body.data.Character;
	}

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};


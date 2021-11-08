const { Command } = require('klasa');
const Discord = require("discord.js");
const { Mal } = require("node-myanimelist");
const moment = require("moment");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'season',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: ["ps"],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'MyAnimeList seasonal anime',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
		let args = msg.content.split(" ").slice(1);

        if (args.length < 2) return msg.channel.send("No search query. [year (1917-2021)] [season (summer, spring, fall, winter)] [page]");

        let year = args[0];
        var regEx = /[^1234567890]/g
        if (regEx.test(year)) return msg.channel.send(`year invalid.`);
        year = Number(year);
        if(year < 1917 || year > (Number(moment().format('YYYY'))+1)) return msg.channel.send(`year invalid.`);

        let season = args[1].toLowerCase();
        let seasons = ["summer", "spring", "fall", "winter"];
        if (!seasons.includes(season)) return msg.channel.send(`season invalid.`);

        let page = args[2];
        if (regEx.test(page)) page=0;
        else page = Number(page)-1;

        Mal.season(year, season)
            .then(res => res.data)
            .then(searchJson => {
                let anime = Mal.anime(searchJson.anime[page].mal_id);
                anime.info()
                    .then(res => res.data)
    				.then(animeJson => {
						let genres = [];
							animeJson.genres.forEach(g => {
								genres.push(`[${g.name}](${g.url})`)
							})
						let embed = new Discord.MessageEmbed()
						.setColor("#2e51a2")
						.setThumbnail("https://i.imgur.com/BetleIp.png")
						.setTitle(`(${animeJson.mal_id}) ${animeJson.title_english}`)
						.setDescription(`
**Japanese title:** ${animeJson.title_japanese}
**Type:** ${animeJson.type}
**Source:** ${animeJson.source}
**Episodes:** ${animeJson.episodes}
**Genres:** ${genres.join(", ")}
**Status:** ${animeJson.status}
**Airing:** ${animeJson.airing ? "Airing" : "Not Airing"}
**Aired:** ${animeJson.aired.string}
**Duration:** ${animeJson.duration}
**Rating:** ${animeJson.rating}
**Score:** ${animeJson.score}
**Rank:** ${animeJson.rank}
**Popularity:** ${animeJson.popularity}
**Premiered:** ${animeJson.premiered}
**Broadcast:** ${animeJson.broadcast}
[More information](${animeJson.url})`)
                        .setImage(animeJson.image_url)
                        .setFooter(`Page ${page+1}/${searchJson.anime.length}`)
						msg.channel.send({embed})
					})
            })
	}

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};


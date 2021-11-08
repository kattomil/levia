const { Command } = require('klasa');
const Discord = require("discord.js");
const { Mal } = require("node-myanimelist");
const moment = require("moment");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'manga-search',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: ["ms"],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'MyAnimeList manga search',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
		let args = msg.content.split(" ").slice(1).join(" ");

		if (args.length < 1) return msg.channel.send("No search query.");

		Mal.search().manga({ q: args})
			.then(res => res.data)
			.then(searchJson => {
				if (searchJson.results.length < 1) return msg.channel.send("No results.");
				let anime = Mal.manga(searchJson.results[0].mal_id);
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
**Volumes:** ${animeJson.volumes}
**Chapters:** ${animeJson.chapters}
**Genres:** ${genres.join(", ")}
**Status:** ${animeJson.status}
**Publishing:** ${animeJson.publishing ? "Publishing" : "Not Publishing"}
**Score:** ${animeJson.score}
**Rank:** ${animeJson.rank}
**Popularity:** ${animeJson.popularity}
[More information](${animeJson.url})`)
						.setImage(animeJson.image_url)
						msg.channel.send({embed})
					})

			})
	}

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};


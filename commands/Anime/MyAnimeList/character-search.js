const { Command } = require('klasa');
const Discord = require("discord.js");
const { Mal } = require("node-myanimelist");
const moment = require("moment");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'character-search',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: ["cs"],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'MyAnimeList character search',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
		let args = msg.content.split(" ").slice(1).join(" ");

		if (args.length < 1) return msg.channel.send("No search query.");

		Mal.search().anime({ q: args})
			.then(res => res.data)
			.then(searchJson => {
				if (searchJson.results.length < 1) return msg.channel.send("No results.");
				let anime = Mal.character(searchJson.results[0].mal_id);
				anime.info()
					.then(res => res.data)
    				.then(animeJson => {
						let animes = [], mangas = [], actors = [];
						animeJson.animeography.forEach(z => animes.push(`[${z.name}](${z.url})`))
						animeJson.mangaography.forEach(z => mangas.push(`[${z.name}](${z.url})`))
						animeJson.voice_actors.forEach(z => actors.push(`[${z.name}](${z.url})`))
						let embed = new Discord.MessageEmbed()
						.setColor("#2e51a2")
						.setThumbnail("https://i.imgur.com/BetleIp.png")
						.setTitle(`(${animeJson.mal_id}) ${animeJson.name}`)
						.setDescription(`
**Japanese name:** ${animeJson.name_kanji}
**Nicknames:** ${animeJson.nicknames.length > 0 ? animeJson.nicknames.join(" | ") : "None"}
**Animeography:** ${animes.length > 0 ? animes.join(" | ") : "None"}
**Mangaography:** ${mangas.length > 0 ? mangas.join(" | ") : "None"}
**Voice actors:** ${actors.length > 0 ? actors.join(" | ") : "None"}
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


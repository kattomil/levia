const { Command } = require('klasa');
const Discord = require("discord.js");
const { Mal } = require("node-myanimelist");
const moment = require("moment");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'person-search',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: ["ps"],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'MyAnimeList person search',
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
				let anime = Mal.person(searchJson.results[0].mal_id);
				anime.info()
					.then(res => res.data)
    				.then(animeJson => {
						let embed = new Discord.MessageEmbed()
						.setColor("#2e51a2")
						.setThumbnail("https://i.imgur.com/BetleIp.png")
						.setTitle(`(${animeJson.mal_id}) ${animeJson.name}`)
						.setDescription(`
**Given name:** ${animeJson.given_name}
**Family name:** ${animeJson.family_name}
**Alternate names:** ${animeJson.alternate_names.join(" | ")}
**Birthday:** ${moment(animeJson.birthday, "YYYY-MM-DDThh:mm:ss").format("MMMM Do YYYY, h:mm:ss a")}
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


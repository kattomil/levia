const { Command } = require('klasa');
const Discord = require("discord.js");
const { Mal } = require("node-myanimelist");
const moment = require("moment");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'profile',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'MyAnimeList users profiles',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        let args = msg.content.split(" ").slice(1).join(" ").toLowerCase();
        if (args.length < 1) return msg.channel.send("No user specified.");
        let user = Mal.user(args);
        user.profile()
            .then(res => res.data)
            .then(profile => {
                const embed = new Discord.MessageEmbed()
                    .setColor("#2e51a2")
                    .setAuthor(`${profile.username} (${profile.user_id})`, profile.image_url, profile.url)
                    .setThumbnail(profile.image_url)
                    .setDescription(`
**Joined:** ${moment(profile.joined, "YYYY-MM-DDThh:mm:ss").format("DD/MMM/YYYY h:mm:ss a")}
**Last online:** ${moment(profile.last_online, "YYYY-MM-DDThh:mm:ss").format("DD/MMM/YYYY h:mm:ss a")}
**Birthday:** ${profile.birthday ? moment(profile.birthday, "YYYY-MM-DDThh:mm:ss").format("DD/MMM/YYYY h:mm:ss a") : "Not specified"}
**Gender:** ${profile.gender ? profile.gender : "Not specified"}
**Location:** ${profile.location ? profile.location : "Not specified"}

**Anime list**

**Days watched:** ${profile.anime_stats.days_watched}
**Mean score:** ${profile.anime_stats.mean_score}
**Watching:** ${profile.anime_stats.watching}
**Completed:** ${profile.anime_stats.completed}
**On hold:** ${profile.anime_stats.on_hold}
**Dropped:** ${profile.anime_stats.dropped}
**Plan to watch:** ${profile.anime_stats.plan_to_watch}
**Total entries:** ${profile.anime_stats.total_entries}
**Rewatched:** ${profile.anime_stats.rewatched}
**Episodes watched:** ${profile.anime_stats.episodes_watched}`)
                msg.channel.send({embed})
            })
	}

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};


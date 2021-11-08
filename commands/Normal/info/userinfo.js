const { Command } = require('klasa');
const Discord = require('discord.js');
const urlExists = require('url-exists');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'userinfo',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: ["whois"],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Show your discord info or someone else\'s',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        var user;
        if (!msg.content.split(" ").slice(1)[0]) user=msg.author;
        else user = msg.mentions.users.first() || await this.client.users.fetch(msg.content.split(" ").slice(1)[0]);
        const embed = new Discord.MessageEmbed()
            .setFooter("Created: " + user.createdAt + '\n' + `Joined: ${(msg.guild.member(user) ? msg.guild.member(user).joinedAt : "Not in the server")}`)
            .setColor('#' + ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6))
            .setDescription(`\`\`\`asciidoc
• User     :: ${user.tag}
• ID       :: ${user.id}
• Status   :: ${user.presence.status}
• Activity :: ${(user.presence.activities.map(a => a.name).join(" | ") || 'Not playing anything')}
• Bot      :: ${user.bot}
• Roles    :: ${msg.guild.member(user) ? msg.guild.member(user).roles.cache.map(r => r.name).join(", ").replace(", @everyone", "") : "Not in the server"}\`\`\``)
        urlExists(user.displayAvatarURL({ format: 'gif' }), function(err, exists) {
            if (exists) {
                embed.setThumbnail(user.displayAvatarURL({ format: 'gif' }))
            }
            else {
                embed.setThumbnail(user.displayAvatarURL({ format: 'png' }))
            }
        })
        setTimeout(() => {
            msg.channel.send({ embed })
        }, 500)
}

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
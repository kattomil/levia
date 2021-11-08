const { Command } = require('klasa');
const Discord = require('discord.js');
const urlExists = require('url-exists');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'avatar',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: ["av"],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Show your or someone else\'s avatar',
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
        var embed = new Discord.MessageEmbed()
            .setDescription(`**${user.tag}**\'s avatar`)
            .setColor('#' + ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6))

        urlExists(user.displayAvatarURL({ format: 'gif' }), function(err, exists) {
            if (exists) {
                embed.setImage(user.displayAvatarURL({ format: 'gif', size: 512 }))
            }
            else {
                embed.setImage(user.displayAvatarURL({ format: 'png', size: 512 }))
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
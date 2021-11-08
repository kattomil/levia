const { Command } = require('klasa');
const Discord = require("discord.js");
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'lockdown',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: ["ld"],
            permissionLevel: 10,
            botPerms: [],
            requiredSettings: [],
            description: 'Owner command',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        const sw = msg.content.split(" ").slice(1)[0];
        if (!sw) return msg.channel.send("smh, on or off?");
        if (sw.toLowerCase() == "on") {
            msg.guild.channels.cache.forEach(ch => {
                if (ch.type == "text") {
                    ch.updateOverwrite(msg.guild.roles.cache.get("486508485844926475"), {
                        SEND_MESSAGES: false
                    })
                } else if (ch.type == "voice") {
                    ch.updateOverwrite(msg.guild.roles.cache.get("486508485844926475"), {
                        CONNECT: false
                    })
                }
            })
            msg.channel.send(`**${msg.author.tag}** has **enabled** the lockdown.`)
        } else if (sw.toLowerCase() == "off") {
            msg.guild.channels.cache.forEach(ch => {
                if (ch.type == "text") {
                    ch.updateOverwrite(msg.guild.roles.cache.get("486508485844926475"), {
                        SEND_MESSAGES: null
                    })
                } else if (ch.type == "voice") {
                    ch.updateOverwrite(msg.guild.roles.cache.get("486508485844926475"), {
                        CONNECT: null
                    })
                }
            })
            msg.channel.send(`**${msg.author.tag}** has **disabled** the lockdown`)
        }
        msg.delete();
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
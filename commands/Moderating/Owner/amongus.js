const { Command } = require('klasa');
const Discord = require('discord.js');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'amongus',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permissionLevel: 10,
            botPerms: [],
            requiredSettings: [],
            description: 'Among us',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        const args = msg.content.split(" ").slice(1).join(" ");
        if (args.toLowerCase() == "on") {
            msg.guild.channels.cache.get("752519760243195917").members.forEach(m => {
                m.voice.setMute(true);
            })
        } else if (args.toLowerCase() == "off") {
            msg.guild.channels.cache.get("752519760243195917").members.forEach(m => {
                m.voice.setMute(false);
            })
        }
        msg.delete();
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
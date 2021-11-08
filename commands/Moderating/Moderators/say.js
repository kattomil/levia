const { Command } = require('klasa');
const Discord = require('discord.js');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'say',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Make the bot say something',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        if (!msg.guild.member(msg.author).roles.cache.has("719954439078936619") && !msg.member.permissions.has("ADMINISTRATOR")) return;

        let text = msg.content.split(" ").slice(1).join(" ");
        if (!text) return msg.channel.send(`**${msg.author.tag}** you did not provide any text`)
        msg.channel.send(text);
        msg.delete();
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
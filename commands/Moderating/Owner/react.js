const { Command } = require('klasa');
const Discord = require('discord.js');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'react',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permissionLevel: 10,
            botPerms: [],
            requiredSettings: [],
            description: 'React to a message',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        const args = msg.content.split(" ").slice(1);
        if (!args) return msg.channel.send(`**${msg.author.tag}** id and emoji(s) missing.`);

        const id = args[0];
        var regEx = /[^1234567890]/g
            if (regEx.test(id)) return msg.channel.send(`**${msg.author.tag}** that is not a valid message ID.`);

        const emojis = args.slice(1);
        if (!emojis) return msg.channel.send(`**${msg.author.tag}** emoji(s) missing.`);
        
        const m = await msg.channel.messages.fetch(args[0])
        emojis.forEach(async e => {
            await m.react(e);
        })
        msg.delete();
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
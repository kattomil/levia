const { Command } = require('klasa');
const Discord = require('discord.js');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'banned',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Check if someone is banned',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        const args = msg.content.split(" ").slice(1);
        const user = args.join(" ");
        msg.guild.fetchBans().then(banned => {
            let list = banned.find(u => (u.user.id == user || u.user.username.includes(user)))
            if (list)
                msg.channel.send(`**${msg.author.tag}**, the user **${list.user.tag}** is banned.`)
            else
                msg.channel.send(`**${msg.author.tag}**, that user is not banned.`)
        })
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
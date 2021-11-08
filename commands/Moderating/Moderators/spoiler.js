const { Command } = require('klasa');
const Discord = require('discord.js');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'spoiler',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Spoiler the spoilers',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        if (!msg.guild.member(msg.author).roles.cache.has("719954439078936619") && !msg.member.permissions.has("ADMINISTRATOR")) return;

        let nr = msg.content.split(" ").slice(1).join(" ");

        var regEx = /[^1234567890]/g
            if (regEx.test(nr)) return msg.channel.send(`**${msg.author.tag}** that is not a number.`);
        
        const message = await msg.channel.messages.fetch(nr);

        let staff;
            if (msg.member.permissions.has("ADMINISTRATOR")) staff = "Administrator ";
            else staff = "Moderator ";
        
        msg.channel.send(`${staff}**${msg.author.tag}** marked **${message.author.tag}**'s ${message.content ? "message" : "images"} as spoiler: ${message.content ? `\n|| ${message.content} ||` : ""}`)

        if (message.attachments.size >= 1) {
            message.attachments.forEach(a => {
                msg.channel.send({
                    files: [{
                       attachment: a.url,
                       name: "SPOILER_"+a.name
                    }]
                 });
            })
        }
        
        await msg.delete().then(() => {
            message.delete();
        })
        
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
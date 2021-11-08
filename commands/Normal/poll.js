const { Command } = require('klasa');
const Discord = require("discord.js");
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'poll',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Make Polls',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {

        let emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"]
        
        let poll = msg.content.split(" ").slice(1).join(" ");
        if (!poll) return msg.channel.send(`**${msg.author.tag}** you have to provide at least 2 options separated by comma and then a space\nexample: \`bread, potato, tomato\` `)
        let options = poll.split(", ")
        if (options.length < 2) return msg.channel.send(`**${msg.author.tag}** you have to provide at least 2 options separated by comma and then a space\nexample: \`bread, potato, tomato\` `)
        let description = [], count = 0;
        options.forEach(o => {
            description.push(`${emojis[count]} - ${o}`)
            count ++;
        })
        msg.delete();
        let embed = new Discord.MessageEmbed()
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL({format: "png"}))
        .setDescription(description.join("\n"))
        msg.channel.send({ embed }).then(async m => {
            for(var i = 0; i < count; i++)
                await m.react(emojis[i]);
        })
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
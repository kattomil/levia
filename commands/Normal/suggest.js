const { Command } = require('klasa');
const Discord = require("discord.js");
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'suggest',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: ["suggestion"],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Suggestions about our bots or server',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        const args = msg.content.split(" ").slice(1);
        if(args.length < 1) return msg.channel.send(`**${msg.author.tag}** you did not make any suggestion.`)
        const embed = new Discord.MessageEmbed()
            .setTitle(msg.author.tag)
            .setDescription(args.join(" "))
            .setFooter(`User ID `+msg.author.id)
            .setColor('#' + ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6))
        msg.delete();
        msg.guild.channels.cache.get("720019874726019073").send(embed).then(async m => {
            await m.react(this.client.emojis.cache.get("709744862722785360"))
            await m.react("🤷");
            await m.react(this.client.emojis.cache.get("709744862458806353"))
        })
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
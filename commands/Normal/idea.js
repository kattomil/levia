const { Command } = require('klasa');
const Discord = require("discord.js");
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'idea',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'A command for the KEEP IT 100 team',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        if (!msg.member.roles.cache.has("707227720924528650")) return;
        const args = msg.content.split(" ").slice(1);
        const embed = new Discord.MessageEmbed()
      .setTitle(msg.author.tag)
      .setDescription(args.join(" "));
        msg.delete();
        msg.guild.channels.cache.get("709742692174790726").send(embed).then(async m => {
            await m.react(this.client.emojis.cache.get("709744862722785360"))
            await m.react(this.client.emojis.cache.get("709744862458806353"))
        })
        msg.delete();
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
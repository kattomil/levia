const { Command } = require('klasa');
const Discord = require("discord.js");
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'approve',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: ["app"],
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
        const args = msg.content.split(" ").slice(1);
        const embed = new Discord.MessageEmbed()
      .setImage(args[0])
      .setTitle(args[1].toUpperCase()+":")
      .setDescription(args.slice(2).join(" "))
        msg.guild.channels.cache.get("708658942435393536").send(embed);
        msg.delete();
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
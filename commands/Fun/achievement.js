const { Command } = require('klasa');
const Discord = require("discord.js")
const snekfetch = require('snekfetch');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'achievement',
            enabled: true,
            runIn: ['text'],
            cooldown: 5,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Minecraft Achievements',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        let args = msg.content.split(" ").slice(1);
        if (args.length < 1) return msg.channel.send("an achievement about what")
        let [title, contents] = args.join(" ").split("|");
        if(!contents) {
          [title, contents] = ["Achievement Get!", title];
        }
        let rnd = Math.floor((Math.random() * 39) + 1);
        if(args.join(" ").toLowerCase().includes("burn")) rnd = 38;
        if(args.join(" ").toLowerCase().includes("cookie")) rnd = 21;
        if(args.join(" ").toLowerCase().includes("cake")) rnd = 10;
      
        if(title.length > 22 || contents.length > 22) return msg.channel.send("Max Length: 22 Characters. Soz.");
        const url = `https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}`;
        snekfetch.get(url)
         .then(r=>msg.channel.send(new Discord.MessageAttachment(r.body)));
        msg.delete();
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
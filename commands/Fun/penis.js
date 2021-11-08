const { Command } = require('klasa');
const Discord = require("discord.js");
let Jimp = require('jimp');
let fs = require("fs");
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'penis',
            enabled: true,
            runIn: ['text'],
            cooldown: 5,
            aliases: ["pula", "penbis", "bepis", "lenos", "penos"],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Show how big your penis is',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        
        const user = msg.mentions.users.first() || msg.author;

        let haspenis = Math.floor((Math.random() * 100));
        let haspussy =  Math.floor((Math.random() * 100)) <= 10 ? "Probably has a pussy." : "";
        if (haspenis <= 2.5) return msg.channel.send(`No ${msg.content.split(" ")[0].slice(1)} found for **${msg.guild.member(user).nickname || user.username}**. ${haspussy}`);

        var randomColor = Math.floor(Math.random()*16777215).toString(16);

        var penis = "8";

        var length = Math.floor((Math.random() * Math.floor((Math.random() * 30))));
        var chance = Math.floor((Math.random() * 100));

        if (chance >= 50) length -= length/2;

        chance = Math.floor((Math.random() * 100));

        if (chance <= 25) length *= 2;

        for(var i=1; i<=length; i++)
            penis+="=";

        penis+="D";

        if (length < 1) penis = "c8";

        if (length >= 20) penis += "~";
        if (length >= 40) penis += "~";
        if (length >= 47) penis += "~";

        let image = new Jimp(90+(38*Math.floor(length)), 65, ("#"+randomColor), (err, image) => {
            if (err) throw err;
        });

        Jimp.loadFont(Jimp.FONT_SANS_64_BLACK)
        .then(font => {
            image.print(font, 0, 0, penis)
                 .write(`meme/cache/${msg.author.id}penis.png`)
        })

            setTimeout(() => {
                msg.channel.send(`**${msg.guild.member(user).nickname || user.username}**'s ${msg.content.split(" ")[0].slice(1)} is **${length} cm** ${length < 1 ? "(jenant)" : ""}`, new Discord.MessageAttachment(`meme/cache/${msg.author.id}penis.png`)).then(() => {
                    setTimeout(() => {
                        fs.unlinkSync(`meme/cache/${msg.author.id}penis.png`)
                    }, 1000);
                })
            }, 1000);
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
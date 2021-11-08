const { Command } = require('klasa');
const Discord = require("discord.js");
const Jimp = require('jimp');
const fs = require('fs');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'randomhex',
            enabled: true,
            runIn: ['text'],
            cooldown: 2,
            aliases: ["rhex"],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Random hex colors',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        let image = new Jimp(300, 100, ("#"+randomColor), (err, image) => {
            if (err) throw err;
        });
        Jimp.loadFont(Jimp.FONT_SANS_64_BLACK).then(font => {
            image.print(font, 0, 0, {
                text: "#"+randomColor,
                alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
            }, 300, 100);
          }).then(() => {
            image.write(`meme/cache/${msg.author.id}hex.png`);
            setTimeout(() => {
                    msg.channel.send(new Discord.MessageAttachment(`meme/cache/${msg.author.id}hex.png`)).then(() => {
                    setTimeout(() => {
                        fs.unlinkSync("meme/cache/" + msg.author.id + "hex" + ".png");
                    }, 750);
                })
            }, 750);
          })
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
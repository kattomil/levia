const { Command } = require('klasa');
const Discord = require('discord.js');
const path = require('path')
const getColors = require('get-image-colors')
fs             = require('fs'); 
var onecolor = require('onecolor');  
const download = require('image-downloader')
let Jimp = require('jimp');
let rimraf = require("rimraf");
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'phexp',
            enabled: true,
            runIn: ['text'],
            cooldown: 30,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Show your or someone else\'s avatar\'s hex colour palette',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    run(msg, [...params]) {
        var jimps = [];
        var user = msg.author;
        const options = {
            url: `${user.displayAvatarURL({ format: 'png', size: 512 })}`,
            dest: `${msg.author.id}pfp.png`                // will be saved to /path/to/dest/image.jpg
        }
        download.image(options)
        .then(({ filename }) => {
            msg.channel.send("Downloading image & getting hex palette...").then(mes => {
                setTimeout(() => {
                    getColors(filename).then(colors => {
                        var i = 0;
                        let image = new Jimp(300, 500, ("#FFFFFF"), (err, image) => {
                            if (err) throw err;
                        });
                        colors.forEach(color => {
                            var rgb = color._rgb;
                            var rgbCode = 'rgb( ' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')'; // 'rgb(r, g, b)'
                            var hex = onecolor(rgbCode).hex();
                            let picture = new Jimp(300, 100, (hex), (err, picture) => {
                                if (err) throw err;
                            });
                            Jimp.loadFont(Jimp.FONT_SANS_64_BLACK).then(font => {
                                picture.print(font, 0, 0, {
                                text: hex,
                                alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                                alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                            }, 300, 100);
                            }).then(() => {
                                image.composite(picture, 0, 100*i);
                                i++;
                            })
                        })
                        setTimeout(() => {
                            image.write(`${msg.author.id}palette.png`)
                        }, 2000)
                        setTimeout(() => {
                            mes.delete().then(() => {
                                msg.channel.send(new Discord.MessageAttachment(`${msg.author.id}palette.png`))
                                setTimeout(() => {
                                    fs.unlinkSync(`${msg.author.id}palette.png`);
                                    fs.unlinkSync(`${msg.author.id}pfp.png`);
                                }, 750);
                            })
                        }, 2500)
                      })
                }, 2000)
            })
        })
        .catch((err) => console.error(err))
    }
    

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
const { Command } = require('klasa');
const Discord = require('discord.js');
var ColorThief = require('color-thief'),  
colorThief     = new ColorThief(),  
fs             = require('fs'); 
var onecolor = require('onecolor');  
const download = require('image-downloader')
let Jimp = require('jimp');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'phex',
            enabled: true,
            runIn: ['text'],
            cooldown: 30,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Show your or someone else\'s avatar\'s dominant hex colour',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        var user=msg.author;
        const options = {
            url: `${user.displayAvatarURL({ format: 'png', size: 512 })}`,
            dest: `${msg.author.id}pfp.png`                // will be saved to /path/to/dest/image.jpg
        }
        download.image(options)
        .then(({ filename }) => {
            msg.channel.send("Downloading image...").then(mes => {
                setTimeout(() => {
                    var rgb = colorThief.getColor(filename);  
                    var rgbCode = 'rgb( ' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')'; // 'rgb(r, g, b)'
                    var hex = onecolor(rgbCode).hex();
                    mes.edit("Getting dominant hex...").then(m => {
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
                        picture.write(`meme/cache/${msg.author.id}dominanthex.png`);
                            setTimeout(() => {
                                    msg.channel.send(new Discord.MessageAttachment(`meme/cache/${msg.author.id}dominanthex.png`)).then(() => {
                                    setTimeout(() => {
                                        fs.unlinkSync("meme/cache/" + msg.author.id + "dominanthex" + ".png");
                                    }, 750);
                                })
                            }, 750);
                            setTimeout(() => {
                                fs.unlinkSync(filename);
                                m.delete();
                            }, 1000)
                        })
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
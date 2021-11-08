const { Command } = require('klasa');
const Discord = require("discord.js");
const jimp = require("jimp");
const fs = require("fs");
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'meme',
            enabled: true,
            runIn: ['text'],
            cooldown: 5,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Create a meme with a chosen template',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        const args = msg.content.split(" ").slice(1);
        var images = [];
        if(args.length < 2) return msg.channel.send(`**\`Usage:\` meme <meme> <image URL>**
                                                   \n**\`Available memes:\`** jotaro, michael`);
        switch(args[0].toLowerCase()) {
          case "jotaro":
              images.push("meme/jotaro/blank.png");
              images.push("meme/jotaro/meme.png");
              images.push(args[1]);
              var jimps = [];
              for (var i = 0; i < images.length; i++) {
                jimps.push(jimp.read(images[i]));
              }
              Promise.all(jimps).then(function(data) {
                return Promise.all(jimps);
              }).then(function(data) {
                  data[2]
                  .resize(135, 105);
                  data[0]
                  .composite(data[2], 100, 90)
                  .composite(data[1], 0, 0)
                  .write("meme/cache/" + msg.author.username + "s meme" + '.png');
              });
              
              msg.channel.send("**Creating  your meme...**").then(m => {
                setTimeout(() => {
                    m.delete().then(() => msg.channel.send(new Discord.MessageAttachment("meme/cache/" + msg.author.username + "s meme" + ".png"))).then(() => {
                        setTimeout(() => {
                            fs.unlinkSync("meme/cache/" + msg.author.username + "s meme" + ".png");
                        }, 500);
                    })
                }, 500);
            })
            break;
          case "michael":
            images.push("meme/michael/blank.png");
            images.push("meme/michael/meme.png");
            images.push(args[1]);
                var jimps = [];
                for (var i = 0; i < images.length; i++) {
                  jimps.push(jimp.read(images[i]));
                }
                Promise.all(jimps).then(function(data) {
                  return Promise.all(jimps);
                }).then(function(data) {
                    data[2]
                    .resize(147, 203);
                    data[0]
                    .composite(data[2], 296, 42)
                    .composite(data[1], 0, 0)
                    .write("meme/cache/" + msg.author.username + "s meme" + '.png');
                });
                
                msg.channel.send("**Creating  your meme...**").then(m => {
                  setTimeout(() => {
                      m.delete().then(() => msg.channel.send(new Discord.MessageAttachment("meme/cache/" + msg.author.username + "s meme" + ".png"))).then(() => {
                          setTimeout(() => {
                              fs.unlinkSync("meme/cache/" + msg.author.username + "s meme" + ".png");
                          }, 500);
                      })
                  }, 500);
              })
              break;
        }
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
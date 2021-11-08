const { Command } = require('klasa');
const Discord = require("discord.js");
const path = require('path');
const fs = require('fs');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'emoji',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: ["emote", "emojis", "emotes"],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Make the bot send one of the custom emojis from the server',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        let sent=false;
        const args = msg.content.split(" ").slice(1);
        if (args.length < 1) return msg.channel.send("You did not specify an emoji name.");

        if (args[0].toLowerCase() == "random") {
            var i=0, j=Math.floor(Math.random() * 653);
            fs.readdirSync("emotes").forEach(file => {
                if (sent == false && i==j) {
                    sent = true;
                    msg.channel.send(`:${file.replace(".png", "").replace(".gif", "")}:`, new Discord.MessageAttachment("emotes/"+file));
                }
                i=i+1;
            });
        } else if (args[0].toLowerCase() == "matching" && args.length > 1) {
            var em = [];
            fs.readdirSync("emotes").forEach(file => {
                if (file.toLowerCase().includes(args[1].toLowerCase())) {
                    em.push(file);
                }
            });
            if (em.length >= 1) {
                async function* asyncGenerator() {
                    let i = 0;
                    while (i < em.length) {
                      yield i++;
                    }
                  }
                for await (let i of asyncGenerator())
                    em[i] = em[i].replace(".png", "").replace(".gif", "")
                let list = em.join("\n");
                let message = `Emoji matching **${args[1]}** (${em.length}):\n${list}`;
                if(message.length > 2000) {
                    await fs.writeFile("emojis.txt", message, function(err) {
                        if(err) {
                            return msg.author.send("Something went wrong...")
                        }
                    }); 
                    return msg.author.send("List too long.", new Discord.MessageAttachment("emojis.txt"))
                    .catch(() => {
                        msg.channel.send(`**${msg.author.tag}** your dms are disabled and i cannot send you the list.`);
                    })
                    .then(() => {
                        msg.channel.send(`**${msg.author.tag}** check your DMs (${em.length}).`);
                        fs.unlinkSync("emojis.txt");
                    });
                } else {
                    return msg.author.send(message)
                    .catch(() => {
                        msg.channel.send(`**${msg.author.tag}** your dms are disabled and i cannot send you the list.`);
                    })
                    .then(() => {
                        msg.channel.send(`**${msg.author.tag}** check your DMs (${em.length}).`);
                    })
                }
            }
        }
        if (sent == true) return;

        var emojis = this.client.emojis.cache.find(emoji => emoji.name.toLowerCase() == args[0].toLowerCase())
        if (typeof emojis == "undefined") emojis = this.client.emojis.cache.find(emoji => emoji.name.toLowerCase().includes(args[0].toLowerCase()))

        if (typeof emojis == "undefined") {
                var em = [];
                fs.readdirSync("emotes").forEach(file => {
                    if (file.toLowerCase().includes(args[0].toLowerCase())) {
                        em.push(file);
                    }
                });
                if (em.length > 1) {
                    let num = Math.floor(Math.random() * em.length);
                    let themote = em[num];
                    return msg.channel.send(`:${themote.replace(".png", "").replace(".gif", "")}:`, new Discord.MessageAttachment("emotes/"+themote));
                } else if (em.length == 1) {
                    let themote = em[0];
                    return msg.channel.send(`:${themote.replace(".png", "").replace(".gif", "")}:`, new Discord.MessageAttachment("emotes/"+themote));
                }
        }

        if (sent == true) return;
                if (typeof emojis == "undefined") return msg.channel.send(`**${msg.author.tag}** that emoji does not exist.`)
                msg.channel.send(`:${emojis.name}:`, new Discord.MessageAttachment(emojis.url)).catch(() => msg.channel.send("Something happened..."));
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
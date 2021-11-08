const { Command } = require('klasa');
const Discord = require("discord.js");
const Stopwatch = require('statman-stopwatch');
const stopwatch = new Stopwatch();
const prettyMilliseconds = require('pretty-ms');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'selfrole',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Get yourself one of our special roles',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        const filter = (reaction, user) => {
            return ['💃', '♥️', '🎉'].includes(reaction.emoji.name) && user.id === msg.author.id;
        };
        const embed = new Discord.MessageEmbed()
            .setColor('#' + ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6))
            .setTitle("React to which role you want to get")
            .setDescription(`💃 - ${msg.guild.roles.cache.get("711566912529629285").name}
♥️ - ${msg.guild.roles.cache.get("714957243459698758").name}
🎉 - ${msg.guild.roles.cache.get("720691827505627206").name}`)
            .setFooter("Command used by " + msg.author.tag)
        msg.channel.send({ embed }).then(async m => {
            await m.react("💃");
            await m.react("♥️");
            await m.react("🎉");
            m.awaitReactions(filter, {
                max: 1,
                time: 30000,
                errors: ['time']
            })
            .then(async collected => {
                const reaction = collected.first();
                m.delete()
                switch (reaction.emoji.name) {
                    case "💃":
                            if (msg.member.roles.cache.has("711566912529629285")) {
                                msg.channel.send(`**${msg.author.tag}** has left the **${msg.guild.roles.cache.get("711566912529629285").name}** role`)
                                msg.member.roles.remove("711566912529629285")
                            } else {
                                msg.channel.send(`**${msg.author.tag}** has joined the **${msg.guild.roles.cache.get("711566912529629285").name}** role`)
                                msg.member.roles.add("711566912529629285")
                            }
                        break;
                    case "♥️":
                            if (msg.member.roles.cache.has("714957243459698758")) {
                                msg.channel.send(`**${msg.author.tag}** has left the **${msg.guild.roles.cache.get("714957243459698758").name}** role`)
                                msg.member.roles.remove("714957243459698758")
                            } else {
                                msg.channel.send(`**${msg.author.tag}** has joined the **${msg.guild.roles.cache.get("714957243459698758").name}** role`)
                                msg.member.roles.add("714957243459698758")
                            }
                        break;
                    case "🎉":
                            if (msg.member.roles.cache.has("720691827505627206")) {
                                msg.channel.send(`**${msg.author.tag}** has left the **${msg.guild.roles.cache.get("720691827505627206").name}** role`)
                                msg.member.roles.remove("720691827505627206")
                            } else {
                                msg.channel.send(`**${msg.author.tag}** has joined the **${msg.guild.roles.cache.get("720691827505627206").name}** role`)
                                msg.member.roles.add("720691827505627206")
                            }
                        break;
                                
                }
            })
        })
        msg.delete();
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
const { Command } = require('klasa');
const Discord = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'roulette',
            enabled: true,
            runIn: ['text'],
            cooldown: 5,
            aliases: [],
            permissionLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Win lots of money or lose them all.',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {

        let args = msg.content.split(" ").slice(1);

        if (args.length < 1) return msg.channel.send("You need to play at least 50 coins.");

        var regEx = /[^1234567890]/g
        if (regEx.test(args)) return msg.channel.send(`**${msg.author.tag}** that is not a number.`);

        args = Number(args);

        if (args < 50) return msg.channel.send("You need to play at least 50 coins.");
        if (args > 100000) return msg.channel.send("You need to play something lower than 100000 coins.")

        let random = Math.floor(Math.random() * 99 + 1);
        let sign, multiplier;

        if (random >= 70) sign = "+";
        else sign = "-";

        msg.channel.send(`The sign is: **${sign}**`).then(async (m) => {
            multiplier = Math.ceil(Math.random() * 6);
            setTimeout(async () => {await m.edit(`The sign is: **${sign}**\nMultiplier: **x${multiplier}**`)}, 1000)
            setTimeout(async () => {
                if (sign == "+")
                    m.edit(`The sign is: **${sign}**\nMultiplier: **x${multiplier}**\nYou won **${args*multiplier}** and spent **${args}**.`);
                else
                    m.edit(`The sign is: **${sign}**\nMultiplier: **x${multiplier}**\nYou lost **${args*multiplier}** and spent **${args}**.`);
            }, 2000)
        })
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
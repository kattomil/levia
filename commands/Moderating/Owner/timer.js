const { Command } = require('klasa');
const Discord = require("discord.js");
const Stopwatch = require('statman-stopwatch');
const stopwatch = new Stopwatch();
const prettyMilliseconds = require('pretty-ms');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'timer',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permissionLevel: 10,
            botPerms: [],
            requiredSettings: [],
            description: 'Timer command',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        const args = msg.content.split(" ").slice(1);

        if (args[0]=="start") {
            stopwatch.start();
            msg.channel.send("Timer **started**");
        } else if (args[0]=="stop") {
            stopwatch.stop();
            const time = stopwatch.read();
            msg.channel.send(`Timer **stopped**. Time elapsed: ${prettyMilliseconds(Number(time))}`);
        } else {
            msg.channel.send(`Missing args: start / stop`);
        }

        msg.delete();
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
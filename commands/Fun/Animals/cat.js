const { Command } = require('klasa');
const {get} = require("snekfetch");
const Discord = require('discord.js');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'cat',
            enabled: true,
            runIn: ['text'],
            cooldown: 10,
            aliases: ["pussy"],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Send a random cat picture',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        
  get(`https://aws.random.cat/meow`).then(response => {
    msg.channel.send(new Discord.MessageAttachment(response.body.file)).catch(() => msg.channel.send("Failed sending a cat image."))
  });
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
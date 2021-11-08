const { Command } = require('klasa');
const request = require('request');
const Discord = require('discord.js');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'dog',
            enabled: true,
            runIn: ['text'],
            cooldown: 10,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Send a random dog picture',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        const response = await request('https://random.dog/woof.json', (e,r,b) => {
            msg.channel.send(new Discord.MessageAttachment(JSON.parse(b).url)).catch(() => msg.channel.send("Failed sending a dog image."))
        
          })
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
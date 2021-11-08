const { Command } = require('klasa');
const Discord = require("discord.js");
const API_KEY = '880WnFDZOzUwASrpkLU0wj4ZbDef4V7y';
var GphApiClient = require('giphy-js-sdk-core')
const client = GphApiClient(API_KEY)
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'pat',
            enabled: true,
            runIn: ['text'],
            cooldown: 5,
            aliases: ["pet"],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'pat pat',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        let user = msg.mentions.users.first();
        if (!user) return msg.channel.send(`**${msg.author.tag}** pet who?`);

        let message = "";
        if (user.id == msg.author.id) message = "Pat Pat !";
        else message = `**${user.username}** has been petted by **${msg.author.username}**`;

        const searchForGif = (gifName) => {
            return client.search('gifs', {"q": gifName})
                   .then((response) => {
                       //console.log(response.data[Math.floor((Math.random() * 10)+1)%response.data.length]);
                     var gif = response.data[Math.floor(Math.random() * response.data.length)].images.original.url;
                     return gif;
                   })
                   .catch((err) => {
                     return "https://media.giphy.com/media/N0CIxcyPLputW/giphy.gif";
                   })
          }

        var searchPromise = searchForGif("anime pat");

        searchPromise.then((gif) => {
            msg.channel.send(message ,{files: [new Discord.MessageAttachment(gif)]});
        })

    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
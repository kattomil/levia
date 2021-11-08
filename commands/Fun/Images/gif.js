const { Command } = require('klasa');
const Discord = require("discord.js");
const API_KEY = '880WnFDZOzUwASrpkLU0wj4ZbDef4V7y';
var GphApiClient = require('giphy-js-sdk-core')
const client = GphApiClient(API_KEY)
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'gif',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: ["gifs"],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'GIFs for everyone',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        let args = msg.content.split(" ").slice(1).join(" ");
        let isfirst = false;

        if (!args) return msg.channel.send(`**${msg.author.tag}** a gif with what?`)

        if (args.toLowerCase().startsWith("fg")) {
            args = args.slice(2);
            isfirst = true;
        }
        const searchForGif = (gifName) => {
            return client.search('gifs', {"q": gifName})
                   .then((response) => {
                       //console.log(response.data[Math.floor((Math.random() * 10)+1)%response.data.length]);
                       var gif;
                       if (isfirst)
                            gif = response.data[0].images.original.url
                       else
                            gif = response.data[Math.floor(Math.random() * response.data.length)].images.original.url;
                     return gif;
                   })
                   .catch((err) => {
                     return "https://media3.giphy.com/media/14uQ3cOFteDaU/giphy.gif";
                   })
          }

        var searchPromise = searchForGif(args);

        searchPromise.then((gif) => {
            msg.channel.send(gif);
        })

    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
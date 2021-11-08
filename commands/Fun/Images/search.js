const { Command } = require('klasa');
const Discord = require("discord.js");
var gis = require('g-i-s');
var swearjar = require('swearjar');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'search',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Images for everyone',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        let args = msg.content.split(" ").slice(1).join(" ");
        if (!args) return msg.channel.send(`**${msg.author.tag}** an image with what?`)
        let profanity=["pula", "pizda", "coaie", "sex", "penis", "cock", "anal", "oral", "suge", "suck", "porn", "pornography", "porno", "nude", "nud", "dick", "hentai"]
        let isProfanity = false;

        gis(args, result)

        async function result(error, results) {
            if (error) {
                return msg.channel.send(error);
            }
            else {
                if (results.length < 1) return msg.channel.send(`https://tenor.com/view/nothing-spaceballs-we-aint-found-shit-gif-15092542`)
                await args.split(" ").forEach(a => {
                    if (profanity.includes(a.toLowerCase()) || swearjar.profane(a.toLowerCase()))
                        isProfanity = true;
                })
                if (isProfanity) msg.channel.send(" ||" + results[0].url + " ||")
                else msg.channel.send(results[0].url)
            }
        }

    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
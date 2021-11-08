const { Command } = require('klasa');
const Discord = require('discord.js');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'ad',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: ['ads'],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Shows the server ad for partner managers',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        if (!msg.member.permissions.has("ADMINISTRATOR") && !msg.guild.member(msg.author).roles.cache.has("720386440994881657")) return;
        msg.channel.send(`\`\`\`:white_heart: Hi and welcome to **/r/wonderland** !
:star2: We are a new and friendly community !
:globe_with_meridians: Why you should consider joining us:
        
:star: NSFW and Gore and similarities are prohibited from our server!
:star: We have fun bots, chat rank up, music bots, our own MMORPG bot (still in developing) and our own moderating bot that has fun features too and we are always open to feedback!
:star: Our server is friendly and supportive to everyone!
:star: We have some self assignable roles that unlock special channels!
:star: We have giveaways and fun events made by our Events Managers!
:star2: We're looking for Events Managers & Partner Managers!
:star2: Looking for partners too !
:candle: And lots more! Check our server if you are interested!
        
:cupid: Invite link: https://discord.gg/YTqKfDu\`\`\``)
        msg.delete();
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
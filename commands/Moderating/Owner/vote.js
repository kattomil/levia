const { Command } = require('klasa');
const Discord = require('discord.js');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'vote',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permissionLevel: 10,
            botPerms: [],
            requiredSettings: [],
            description: 'Voting',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        const args = msg.content.split(" ").slice(1).join(" ");
        const embed = new Discord.MessageEmbed()
            .setAuthor(msg.author.tag)
            .setDescription(args);
        await msg.channel.send({ embed }).then(async (m) => {
            await m.react(this.client.emojis.cache.get("709744862722785360"));
            await m.react("🤷");
            await m.react(this.client.emojis.cache.get("709744862458806353"));
        })
        msg.delete();
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
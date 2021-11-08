const { Command } = require('klasa');
const Discord = require('discord.js');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'wipebans',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permissionLevel: 10,
            botPerms: [],
            requiredSettings: [],
            description: 'Wipe all the server`s bans',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        let size;
        await msg.guild.fetchBans().then(banned => {
            size = banned.size;
            banned.forEach(u => msg.guild.members.unban(u.user, { reason: "ban wipe " + ` by ${msg.author.tag}` }))
        })
        msg.channel.send(`Wiped all the **${size}** bans!`);
        const embed = new Discord.MessageEmbed()
                    .setAuthor("[Ban Wipe] Administrator " + msg.author.tag + ` unbanned ${size} users`, msg.author.displayAvatarURL())
                    .setFooter(`ID Mod: ${msg.author.id}`)
                    .setColor("#ffff7f");
        this.client.channels.cache.get("484331277164740620").send({ embed })
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
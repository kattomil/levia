const { Command } = require('klasa');
const Discord = require('discord.js');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'clear',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: ['purge'],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Delete messages',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        if (!msg.member.permissions.has("MANAGE_MESSAGES")) return;

        let nr = msg.content.split(" ").slice(1).join(" ");

        if (nr.length < 1) {
            msg.delete();
            msg.channel.send(`**${msg.author.tag}** you have not specified how many messages to delete.`);
        } else {
            var regEx = /[^1234567890]/g
            if (regEx.test(nr)) return msg.channel.send(`**${msg.author.tag}** that is not a number.`);
            msg.channel.bulkDelete(Number(nr)+1)

            let staff;
            if (msg.member.permissions.has("ADMINISTRATOR")) staff = "Administrator ";
            else staff = "Moderator ";

            const embed = new Discord.MessageEmbed()
                .setAuthor("[Clear Case] " + staff + msg.author.tag, msg.author.displayAvatarURL())
                .setDescription(`deleted ${Number(nr)} messages in <#${msg.channel.id}>`)
                .setFooter(`ID Mod: ${msg.author.id}`)
                .setColor("#ffff7f");
            this.client.channels.cache.get("484331277164740620").send({ embed })
        }
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
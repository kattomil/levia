const { Event } = require('klasa');
const Discord = require('discord.js');
module.exports = class extends Event {

    constructor(...args) {
        super(...args, { name:'guildMemberRemove', enabled: true });
    }

    run(member) {
        const channel = member.guild.channels.cache.get("484331277164740620");
        var randomColor = Math.floor(Math.random()*16777215).toString(16);

        const embed = new Discord.MessageEmbed()
            .setAuthor("[Member Left] " + member.user.tag, member.user.displayAvatarURL())
            .setFooter(`ID: ${member.user.id}\nCreated: ${member.user.createdAt}`)
            .setColor("#FF0000");

        channel.send({ embed });
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
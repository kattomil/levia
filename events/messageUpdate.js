const { Event } = require('klasa');
const Discord = require('discord.js');
module.exports = class extends Event {

    constructor(...args) {
        super(...args, { name:'messageUpdate', enabled: true });
    }

    run(oldmsg, newmsg) {

        if (oldmsg.author.bot) return;
        if (oldmsg.guild.member(oldmsg.author) && (oldmsg.guild.member(oldmsg.author).permissions.has(`ADMINISTRATOR`) || oldmsg.guild.member(oldmsg.author).roles.cache.has("719954439078936619"))) return;

        const channel = oldmsg.guild.channels.cache.get("484331277164740620");

        if(oldmsg.content.includes("http") || newmsg.content.includes("http")) return;

        if (!oldmsg.partial && !newmsg.partial) {
            var randomColor = Math.floor(Math.random()*16777215).toString(16);
            const embed = new Discord.MessageEmbed()
                .setAuthor("[Message Edited] " + oldmsg.author.tag + ` (${oldmsg.author.id})`, oldmsg.author.displayAvatarURL())
                .addField(`Old Message`, oldmsg)
                .addField(`New Message`, newmsg)
                .setFooter(`Channel: ${oldmsg.channel.name}\nAttachments: ${oldmsg.attachments.size}\nMessage ID: ${oldmsg.id}`)
                .setColor("#4c4cff")
            channel.send({ embed })
        }
    }

    async init() {
        // if (msg.attachments.size > 0) {
        //    channel.send(``)
        //    msg.attachments.forEach(a => channel.send(new Discord.MessageAttachment(a.url)))
        //}
    }

};

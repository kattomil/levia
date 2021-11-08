const { Event } = require('klasa');
const Discord = require('discord.js');
module.exports = class extends Event {

    constructor(...args) {
        super(...args, { name:'messageDelete', enabled: true });
    }

    run(msg) {

        if (msg.author.bot) return;
        if (msg.guild.member(msg.author) && (msg.guild.member(msg.author).permissions.has(`ADMINISTRATOR`) || msg.guild.member(msg.author).roles.cache.has("719954439078936619"))) return;

        const channel = msg.guild.channels.cache.get("484331277164740620");

        if (msg.content.startsWith("!") || msg.content.startsWith("/") || msg.content.startsWith("%") || msg.content.startsWith("-") || msg.content.startsWith(">") || msg.content.startsWith("t!") || msg.content.startsWith("?")) return;
        if(msg.channel.id == "719967026461802516") return;
        if (!msg.partial) {
            var randomColor = Math.floor(Math.random()*16777215).toString(16);
            const embed = new Discord.MessageEmbed()
            .setAuthor("[Deleted Message] " + msg.author.tag + ` (${msg.author.id})`, msg.author.displayAvatarURL())
            .setDescription(msg.content)
            .setFooter(`Channel: ${msg.channel.name}\nAttachments: ${msg.attachments.size}\nMessage ID: ${msg.id}`)
            .setColor("#080808")
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

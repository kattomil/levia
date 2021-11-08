const { Event } = require('klasa');
const Discord = require('discord.js');
const moment = require("moment");
module.exports = class extends Event {

    constructor(...args) {
        super(...args, { name:'guildMemberAdd', enabled: true });
    }

    run(member) {
        const channel = member.guild.channels.cache.get("484331277164740620");
        const welcome = member.guild.channels.cache.get("719961466509328406");
        const staff = member.guild.channels.cache.get("719962002285396051");

        var randomColor = Math.floor(Math.random()*16777215).toString(16);

        if (member.user.bot) member.roles.add("412205417251209216");
        else member.roles.add("486508485844926475");

        const embed = new Discord.MessageEmbed()
            .setAuthor("[Member Joined] " + member.user.tag, member.user.displayAvatarURL())
            .setFooter(`ID: ${member.user.id}\nCreated: ${member.user.createdAt}`)
            .setColor("#7FFF00");
        
        if (moment(member.user.createdAt).format("YYYY") == moment(new Date()).format("YYYY"))
            staff.send(`|| <@&724187839696470017> || **${member.user.tag}** (**${member.user.id}**) has their account created **${moment(member.user.createdAt).fromNow()}**.`)

        channel.send({ embed }).then(() => {
            let nb;
            if (member.guild.members.cache.size % 10 == 1) nb = "st";
            else if (member.guild.members.cache.size % 10 == 2) nb = "nd";
            else if (member.guild.members.cache.size % 10 == 3) nb = "rd";
            else nb = "th";
            const wel = new Discord.MessageEmbed()
            .setDescription(`We hope you will have a good time here! Don't forget to read and follow our <#719962575307145347>`)
            .setFooter(`You are our ${member.guild.members.cache.size}${nb} member !`)
            .setColor(randomColor);
            welcome.send(`Welcome <@${member.user.id}> !`, { embed: wel });
        })
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
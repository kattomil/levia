const { Command } = require('klasa');
const Discord = require('discord.js');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'serverinfo',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Check the server\'s info',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        let i = 0;
        msg.guild.members.cache.forEach(member => {if(!member.user.bot) i = i + 1;});
        let b = 0;
        msg.guild.members.cache.forEach(member => {if(member.user.bot) b = b + 1;});
        const embed = new Discord.MessageEmbed()
        .setThumbnail(msg.guild.iconURL({ format: 'png' }))
        .setFooter("Created: " + msg.guild.createdAt)
        .setColor('#' + ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6))
        .setDescription(`\`\`\`asciidoc
• Server Name        :: ${msg.guild.name}
• Server ID          :: ${msg.guild.id}
• Server Region      :: ${msg.guild.region}
• Owner              :: ${msg.guild.owner.user.tag}
• Owner ID           :: ${msg.guild.owner.user.id}
• Members            :: ${msg.guild.memberCount}
• Humans             :: ${i}
• Bots               :: ${b}
• Verification Level :: ${msg.guild.verificationLevel}
• Roles              :: ${msg.guild.roles.cache.size-1} role(s)
• Emotes             :: ${msg.guild.emojis.cache.size} emoji(s)\`\`\``)
        msg.channel.send({ embed})
}

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
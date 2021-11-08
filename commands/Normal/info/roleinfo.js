const { Command } = require('klasa');
const Discord = require('discord.js');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'roleinfo',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Role information',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {

        let roleName = msg.content.split(" ").slice(1).join(" ");

        if (roleName.length < 1) return msg.channel.send(`**${msg.author.tag}** you did not specify a role.`)
        if (!msg.guild.roles.cache.find(r => r.name.toLowerCase() == roleName.toLowerCase())) return msg.channel.send(`**${msg.author.tag}** I am unable to find that role.`)

        let role = msg.guild.roles.cache.find(r => r.name.toLowerCase() == roleName.toLowerCase());

        let embed = new Discord.MessageEmbed()
        .setTitle(role.name)
        .setColor(role.color)
        .setDescription(`\`\`\`asciidoc
Color       :: ${role.hexColor}
Hoist       :: ${role.hoist}
Position    :: ${role.rawPosition}
Mentionable :: ${role.mentionable}
Users       :: ${role.members.size}\`\`\``)
        .setFooter(`Role id: ${role.id}`)

        msg.channel.send({embed});
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
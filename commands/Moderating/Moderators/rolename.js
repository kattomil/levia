const { Command } = require('klasa');
const Discord = require('discord.js');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'rolename',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Role management',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        if (!msg.member.permissions.has("MANAGE_ROLES") && !msg.guild.member(msg.author).roles.cache.has("719954439078936619")) return;

        let args = msg.content.split(" ").slice(1).join(" ");
        let roleName = args.split(", ");

        if (roleName[0].length < 1) return msg.channel.send(`**${msg.author.tag}** you did not specify a role.`)
        if (roleName[1].length < 1) return msg.channel.send(`**${msg.author.tag}** rename it to what?`)
        if (!msg.guild.roles.cache.find(r => r.name.toLowerCase() == roleName[0].toLowerCase())) return msg.channel.send(`**${msg.author.tag}** I am unable to find that role.`)

        if((msg.guild.roles.cache.find(r => r.name.toLowerCase() == roleName[0].toLowerCase()).rawPosition > msg.guild.roles.cache.find(r => r.name.toLowerCase() == "muted").rawPosition) && !msg.member.permissions.has("ADMINISTRATOR"))
            return  msg.channel.send(`**${msg.author.tag}** You cannot edit administrative roles.`)

        let role = msg.guild.roles.cache.find(r => r.name.toLowerCase() == roleName[0].toLowerCase());

        let staff;
        if (msg.member.permissions.has("ADMINISTRATOR")) staff = "Administrator ";
        else staff = "Moderator ";

        role.edit({ name: roleName[1]}).then(() => msg.channel.send(`${staff}**${msg.author.tag}** changed the name of **${roleName[0]}** to **${roleName[1]}**`))
        
        msg.delete();
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
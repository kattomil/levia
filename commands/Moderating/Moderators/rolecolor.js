const { Command } = require('klasa');
const Discord = require('discord.js');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'rolecolor',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: ["rolecolour"],
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

        let roleName = msg.content.split(" ").slice(2).join(" ");

        if (!msg.content.split(" ").slice(1)[0]) return msg.channel.send(`**${msg.author.tag}** you did not specify an hex colour.`)

        var hex = msg.content.split(" ").slice(1)[0];

        if ((hex.length != 7 && hex[0]!="#") && hex.length != 6) return msg.channel.send(`**${msg.author.tag}** that is not a hex.`);
            if (hex.length == 6) hex = "#" + hex;
        if (roleName.length < 1) return msg.channel.send(`**${msg.author.tag}** you did not specify a role.`)
        if (!msg.guild.roles.cache.find(r => r.name.toLowerCase() == roleName.toLowerCase())) return msg.channel.send(`**${msg.author.tag}** I am unable to find that role.`)
        if((msg.guild.roles.cache.find(r => r.name.toLowerCase() == roleName.toLowerCase()).rawPosition > msg.guild.roles.cache.find(r => r.name.toLowerCase() == "muted").rawPosition) && !msg.member.permissions.has("ADMINISTRATOR"))
            return  msg.channel.send(`**${msg.author.tag}** You cannot edit administrative roles.`)

        let role = msg.guild.roles.cache.find(r => r.name.toLowerCase() == roleName.toLowerCase());

        let staff;
        if (msg.member.permissions.has("ADMINISTRATOR")) staff = "Administrator ";
        else staff = "Moderator ";

        role.edit({ color: hex}).then(() => msg.channel.send(`${staff}**${msg.author.tag}** changed the colour of **${role.name}** to **${hex}**`))
        
        msg.delete();
    }

    async giveget(msg) {

    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
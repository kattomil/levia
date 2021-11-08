const { Command } = require('klasa');
const Discord = require('discord.js');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'role',
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

        let roleName = msg.content.split(" ").slice(2).join(" ");

        if (!msg.content.split(" ").slice(1)[0]) return msg.channel.send(`**${msg.author.tag}** you did not ping or give the id of someone.`)

        const user = msg.mentions.users.first() || await this.client.users.fetch(msg.content.split(" ").slice(1)[0]);

        if (!user) return msg.channel.send(`**${msg.author.tag}** I am unable to find that user.`);
        if (roleName.length < 1) return msg.channel.send(`**${msg.author.tag}** you did not specify a role.`)
        if (!msg.guild.roles.cache.find(r => r.name.toLowerCase() == roleName.toLowerCase())) return msg.channel.send(`**${msg.author.tag}** I am unable to find that role.`)
        if((msg.guild.roles.cache.find(r => r.name.toLowerCase() == roleName.toLowerCase()).rawPosition > msg.guild.roles.cache.find(r => r.name.toLowerCase() == "muted").rawPosition) && !msg.member.permissions.has("ADMINISTRATOR"))
            return  msg.channel.send(`**${msg.author.tag}** You cannot give or take administrative roles.`);

        let role = msg.guild.roles.cache.find(r => r.name.toLowerCase() == roleName.toLowerCase());

        let staff;
        if (msg.member.permissions.has("ADMINISTRATOR")) staff = "Administrator ";
        else staff = "Moderator ";

        if (msg.guild.member(user).roles.cache.has(role.id)) {
            msg.guild.member(user).roles.remove(role.id).then(() => {
                const embed = new Discord.MessageEmbed()
                .setAuthor("[Role Remove Case] " + staff + msg.author.tag + ` removed ` + user.tag, msg.author.displayAvatarURL())
                .setDescription(`From the role <@&${role.id}>`)
                .setFooter(`ID Mod: ${msg.author.id}\nID User: ${user.id}`)
                .setColor("#ffff7f");
                msg.channel.send(`${staff}**${msg.author.tag}** removed **${user.tag}** from the role **${role.name}**`).then(this.client.channels.cache.get("484331277164740620").send({ embed }))
              }).catch(() => msg.channel.send(`**${msg.author.tag}** I can't remove **${user.tag}** from that role.`))
        } else {
            const embed = new Discord.MessageEmbed()
            .setAuthor("[Role Give Case] " + staff + msg.author.tag + ` gave ` + user.tag, msg.author.displayAvatarURL())
            .setDescription(`The role <@&${role.id}>`)
            .setFooter(`ID Mod: ${msg.author.id}\nID User: ${user.id}`)
            .setColor("#ffff7f");
            msg.guild.member(user).roles.add(role.id).then(() => {
                msg.channel.send(`${staff}**${msg.author.tag}** gave **${user.tag}** the role **${role.name}**`).then(this.client.channels.cache.get("484331277164740620").send({embed}))
              }).catch(() => msg.channel.send(`**${msg.author.tag}** I can't give **${user.tag}** that role.`))
        }
        msg.delete();
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
const { Command } = require('klasa');
const Discord = require('discord.js');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'ban',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: ["bursa"],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Ban an user by mention or id',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        if (!msg.member.permissions.has("BAN_MEMBERS")) return;

        let reason = msg.content.split(" ").slice(2).join(" ") || 'No reason provided';

        if (!msg.content.split(" ").slice(1)[0]) return msg.channel.send(`**${msg.author.tag}** you did not ping or give the id of someone.`)
        
        else if (msg.content.split(" ").slice(1)[0].toLowerCase() == "match") {
            if (!msg.member.permissions.has("ADMINISTRATOR")) return;
            if (!msg.content.split(" ").slice(1)[1]) return msg.channel.send(`**${msg.author.tag}** matching what?.`)
            let usernames = msg.content.split(" ").slice(1)[1].toLowerCase();
            msg.guild.members.cache.forEach(mem => {
                if (mem.user.username.toLowerCase().includes(usernames))
                msg.guild.members.ban(mem.user, { reason: (reason.split(" ").slice(1).join(" ") || "Match ban with No reason provided") + ` by ${msg.author.tag}` }).then(() => {
                    const embed = new Discord.MessageEmbed()
                    .setAuthor("[Ban Case] " + staff + msg.author.tag + ` banned ` + mem.user.tag, msg.author.displayAvatarURL())
                    .setDescription("reason: " + reason)
                    .setFooter(`ID Mod: ${msg.author.id}\nID User: ${mem.user.id}`)
                    .setColor("#ffff7f");
                    msg.channel.send(`${staff}**${msg.author.tag}** banned **${mem.user.tag}** for **${reason}**`).then(this.client.channels.cache.get("484331277164740620").send({ embed }))
                  })
              })
              return msg.delete();
        }
        
        const user = msg.mentions.users.first() || await this.client.users.fetch(msg.content.split(" ").slice(1)[0]);

        if (!user) return msg.channel.send(`**${msg.author.tag}** I am unable to find that user.`);
        if (user.id == msg.author.id) return msg.channel.send(`**${msg.author.tag}** even if you want to, you can't ban yourself.`);
        if (msg.guild.member(user) && msg.guild.member(user).permissions.has(`BAN_MEMBERS`)) return msg.channel.send(`**${msg.author.tag}** you cannot ban this user.`);
        if (msg.guild.member(user) && msg.guild.member(user).roles.cache.has("724187839696470017")) return msg.channel.send(`**${msg.author.tag}** you cannot ban other mods.`);
        if (msg.guild.member(user) && msg.guild.member(user).roles.cache.has("579691573135147020")) return msg.channel.send(`**${msg.author.tag}** cant ban ma frends m8.`);

        let staff;
        if (msg.member.permissions.has("ADMINISTRATOR")) staff = "Administrator ";
        else staff = "Moderator ";

            await msg.guild.members.ban(user, { reason: reason + ` by ${msg.author.tag}` }).then(() => {
                const embed = new Discord.MessageEmbed()
                .setAuthor("[Ban Case] " + staff + msg.author.tag + ` banned ` + user.tag, msg.author.displayAvatarURL())
                .setDescription("reason: " + reason)
                .setFooter(`ID Mod: ${msg.author.id}\nID User: ${user.id}`)
                .setColor("#ffff7f");
                msg.channel.send(`${staff}**${msg.author.tag}** banned **${user.tag}** for **${reason}**`).then(this.client.channels.cache.get("484331277164740620").send({ embed }))
              })
        msg.delete();
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
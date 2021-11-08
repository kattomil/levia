const { Command } = require('klasa');
const Discord = require('discord.js');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'unban',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Unban an user by id',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        if (!msg.member.permissions.has("BAN_MEMBERS")) return;

        if(!msg.content.split(" ").slice(1)[0]) return msg.channel.send(`**${msg.author.tag}** you haven't specified an ID.`);

        let reason = msg.content.split(" ").slice(2).join(" ") || 'No reason provided';

        if (!msg.content.split(" ").slice(1)[0]) return msg.channel.send(`**${msg.author.tag}** you did not ping or give the id of someone.`)
        
        const user = await this.client.users.fetch(msg.content.split(" ").slice(1)[0]);

        if (!user) return msg.channel.send(`**${msg.author.tag}** I am unable to find that user.`);
        if (user.id == msg.author.id) return msg.channel.send(`**${msg.author.tag}** you're not banned if you can do this.`);
        if (msg.guild.member(user) && (msg.guild.member(user).permissions.has(`BAN_MEMBERS`) || !msg.guild.member(user).banable)) return msg.channel.send(`**${msg.author.tag}** this user is clearly not banned.`);

        let staff;
        if (msg.member.permissions.has("ADMINISTRATOR")) staff = "Administrator ";
        else staff = "Moderator ";

        msg.guild.fetchBans().then(async banned => {
            let list = banned.find(u => u.user.id == user.id)
            if (list)
                await msg.guild.members.unban(user, { reason: reason + ` by ${msg.author.tag}` }).then(() => {
                    const embed = new Discord.MessageEmbed()
                    .setAuthor("[Unban Case] " + staff + msg.author.tag + ` unbanned ` + user.tag, msg.author.displayAvatarURL())
                    .setDescription("reason: " + reason)
                    .setFooter(`ID Mod: ${msg.author.id}\nID User: ${user.id}`)
                    .setColor("#ffff7f");
                    msg.channel.send(`${staff}**${msg.author.tag}** unbanned **${user.tag}** for **${reason}**`).then(this.client.channels.cache.get("484331277164740620").send({ embed }))
                  })
            else
                msg.channel.send(`**${msg.author.tag}**, the user **${user.tag}** is not banned.`)
        })
        msg.delete();
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
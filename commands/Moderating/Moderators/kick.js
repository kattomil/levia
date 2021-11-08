const { Command } = require('klasa');
const Discord = require('discord.js');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'kick',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Kick an user by mention or id',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        if (!msg.member.permissions.has("KICK_MEMBERS")) return;

        let reason = msg.content.split(" ").slice(2).join(" ") || 'No reason provided';

        if (!msg.content.split(" ").slice(1)[0]) return msg.channel.send(`**${msg.author.tag}** you did not ping or give the id of someone.`)
        
        const user = msg.mentions.users.first() || await this.client.users.fetch(msg.content.split(" ").slice(1)[0]);

        if (!user) return msg.channel.send(`**${msg.author.tag}** I am unable to find that user.`);
        if (user.id == msg.author.id) return msg.channel.send(`**${msg.author.tag}** even if you want to, you can't kick yourself.`);
        if (msg.guild.member(user) && msg.guild.member(user).permissions.has(`KICK_MEMBERS`)) return msg.channel.send(`**${msg.author.tag}** you cannot kick this user.`);
        if (msg.guild.member(user) && msg.guild.member(user).roles.cache.has("724187839696470017")) return msg.channel.send(`**${msg.author.tag}** you cannot kick other mods.`);
        if (msg.guild.member(user) && msg.guild.member(user).roles.cache.has("579691573135147020")) return msg.channel.send(`**${msg.author.tag}** cant kick ma frends m8.`);
        
        let staff;
        if (msg.member.permissions.has("ADMINISTRATOR")) staff = "Administrator ";
        else staff = "Moderator ";

            msg.guild.member(user).kick(reason + ` by ${msg.author.tag}`).then(() => {
                const embed = new Discord.MessageEmbed()
                .setAuthor("[Kick Case] " + staff + msg.author.tag + ` kicked ` + user.tag, msg.author.displayAvatarURL())
                .setDescription("reason: " + reason)
                .setFooter(`ID Mod: ${msg.author.id}\nID User: ${user.id}`)
                .setColor("#ffff7f");
                msg.channel.send(`${staff}**${msg.author.tag}** kicked **${user.tag}** for **${reason}**`).then(this.client.channels.cache.get("484331277164740620").send({ embed }))
              }).catch(() => msg.channel.send(`**${msg.author.tag}** I can't kick **${user.tag}**`))

        msg.delete();
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
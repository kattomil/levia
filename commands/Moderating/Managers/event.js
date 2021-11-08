const { Command } = require('klasa');
const Discord = require('discord.js');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'event',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: ['events'],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Activate/Deactivate the events channel',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        if (!msg.member.permissions.has("ADMINISTRATOR") && !msg.guild.member(msg.author).roles.cache.has("720691963342487693")) return;
        let args = msg.content.split(" ").slice(1) || '352839';
        let option = args[0] || '352839';

            let staff;
            if (msg.member.permissions.has("ADMINISTRATOR")) staff = "Administrator ";
            else staff = "Events Manager ";

        if (option.toLowerCase() == "on") {
            msg.guild.channels.cache.get(`721821307418968115`).updateOverwrite(msg.guild.roles.cache.find(r => r.id == "720691827505627206"), {
                SEND_MESSAGES: true
              })
            msg.guild.channels.cache.get(`722042454336864286`).updateOverwrite(msg.guild.roles.cache.find(r => r.id == "720691827505627206"), {
                CONNECT: true
              })
            msg.guild.channels.cache.get(`726891261541351475`).updateOverwrite(msg.guild.roles.cache.find(r => r.id == "720691827505627206"), {
                CONNECT: true
              })
            msg.channel.send(`${staff} **${msg.author.tag}** activated the events channel.`)
        } else if (option.toLowerCase() == "off") {
            msg.guild.channels.cache.get(`721821307418968115`).updateOverwrite(msg.guild.roles.cache.find(r => r.id == "720691827505627206"), {
                SEND_MESSAGES: false
              })
            msg.guild.channels.cache.get(`722042454336864286`).updateOverwrite(msg.guild.roles.cache.find(r => r.id == "720691827505627206"), {
                CONNECT: false
              })
            msg.guild.channels.cache.get(`726891261541351475`).updateOverwrite(msg.guild.roles.cache.find(r => r.id == "720691827505627206"), {
                CONNECT: false
              })
            msg.channel.send(`${staff} **${msg.author.tag}** deactivated the events channel.`)
        } else {
            msg.channel.send(`**${msg.author.tag}**, the options are: on, off`)
        }
        msg.delete();
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
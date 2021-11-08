const { Command } = require('klasa');
const Discord = require("discord.js");
const { Mal } = require("node-myanimelist");
const moment = require("moment");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'list',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'MyAnimeList users list',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        let args = msg.content.split(" ").slice(1);
        
        let listing = args[0].toLowerCase();
        let av = ["all", "watch", "hold", "drop", "plan"];
        if (!av.includes(listing)) return msg.channel.send("Usage: ?list [all/watch/hold/drop/plan] (optional: page) <user>");

        var regEx = /[^1234567890]/g
        let page = args[1];
        if (regEx.test(page)) {
            page = 1;
            args = args.slice(1).join(" ");
        }
        else {
            page = Number(args[1])
            args = args.slice(2).join(" ");
        };

        let user = Mal.user(args);
        let animelist = user.animelist();

        let embed = new Discord.MessageEmbed()

        user.profile()
            .then(res => res.data)
            .then(u => {
                embed.setAuthor(`${u.username} (${u.user_id})`, u.image_url, u.url)
                .setThumbnail(u.image_url)
                .setColor("#2e51a2")
            })
        switch (listing) {
            case "all":
                animelist.all()
                .then(res => res.data)
                .then(list => {
                    if (page > Math.ceil(list.anime.length/5)) return msg.channel.send("invalid page");
                    let listarr = [];
                    for (var i = (page-1)*5; i <= (page-1)*5 + 4 && i < list.anime.length; i++)
                        listarr.push(`${i+1}. [${list.anime[i].title}](${list.anime[i].url})`)
                    embed.setDescription(listarr.join("\n"))
                    .setFooter(`Page ${page} / ${Math.ceil(list.anime.length/5)} | ${list.anime.length} anime`)
                    msg.channel.send({embed})
                })
                break;
            case "watch":
                animelist.watching()
                .then(res => res.data)
                .then(list => {
                    if (page > Math.ceil(list.anime.length/5)) return msg.channel.send("invalid page");
                    let listarr = [];
                    for (var i = (page-1)*5; i <= (page-1)*5 + 4 && i < list.anime.length; i++)
                        listarr.push(`${i+1}. [${list.anime[i].title}](${list.anime[i].url})`)
                    embed.setDescription(listarr.join("\n"))
                    .setFooter(`Page ${page} / ${Math.ceil(list.anime.length/5)} | ${list.anime.length} anime`)
                    msg.channel.send({embed})
                })
                break;
            case "hold":
                animelist.onhold()
                .then(res => res.data)
                .then(list => {
                    if (page > Math.ceil(list.anime.length/5)) return msg.channel.send("invalid page");
                    let listarr = [];
                    for (var i = (page-1)*5; i <= (page-1)*5 + 4 && i < list.anime.length; i++)
                        listarr.push(`${i+1}. [${list.anime[i].title}](${list.anime[i].url})`)
                    embed.setDescription(listarr.join("\n"))
                    .setFooter(`Page ${page} / ${Math.ceil(list.anime.length/5)} | ${list.anime.length} anime`)
                    msg.channel.send({embed})
                })
                break;
            case "drop":
                animelist.dropped()
                .then(res => res.data)
                .then(list => {
                    if (page > Math.ceil(list.anime.length/5)) return msg.channel.send("invalid page");
                    let listarr = [];
                    for (var i = (page-1)*5; i <= (page-1)*5 + 4 && i < list.anime.length; i++)
                        listarr.push(`${i+1}. [${list.anime[i].title}](${list.anime[i].url})`)
                    embed.setDescription(listarr.join("\n"))
                    .setFooter(`Page ${page} / ${Math.ceil(list.anime.length/5)} | ${list.anime.length} anime`)
                    msg.channel.send({embed})
                })
                break;
            case "plan":
                animelist.plantowatch()
                .then(res => res.data)
                .then(list => {
                    if (page > Math.ceil(list.anime.length/5)) return msg.channel.send("invalid page");
                    let listarr = [];
                    for (var i = (page-1)*5; i <= (page-1)*5 + 4 && i < list.anime.length; i++)
                        listarr.push(`${i+1}. [${list.anime[i].title}](${list.anime[i].url})`)
                    embed.setDescription(listarr.join("\n"))
                    .setFooter(`Page ${page} / ${Math.ceil(list.anime.length/5)} | ${list.anime.length} anime`)
                    msg.channel.send({embed})
                })
                break;
        }
        
        
	}

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};


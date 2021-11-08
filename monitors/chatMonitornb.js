const { Monitor } = require('klasa');
const Discord = require('discord.js');

let cooldowns = { };
let replymsg="", nmsg=0, user1, user2;
module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, {
            name: 'chatMonitornb',
            enabled: true,
            ignoreBots: true,
            ignoreSelf: true,
            ignoreOthers: false,
            ignoreWebhooks: true,
            ignoreEdits: true,
            ignoreBlacklistedUsers: false,
            ignoreBlacklistedGuilds: false
        });
    }

    run(msg) {
        if (!msg.content) return;

        var mesaj;
        for(var i=0; i<msg.content.length; i++)
            mesaj+=msg.content[i].toLowerCase().replace("ă", "a").replace("â", "a").replace("ț", "t").replace("î", "i").replace("ș", "s").replace("ă", "a");
        mesaj = mesaj.replace("undefined", "");

        //miroase a cacat la tine in masina
        if (mesaj.includes("miroase a cacat la tine in masina")) return msg.channel.send(new Discord.MessageAttachment("meme/miroaseacacatlatineinmasina.jpg"))

        //sati vad pula
        if (mesaj.includes("sati vad pula")) return msg.channel.send(new Discord.MessageAttachment("meme/sativadpula.png"))

        //puti dar ma excita
        if (mesaj.includes("puti dar ma excita")) return msg.channel.send(new Discord.MessageAttachment("meme/putidarmaexcita.png"))

        //buy me nitro
        if (mesaj.includes("nitro gift")) return msg.channel.send(new Discord.MessageAttachment("meme/buymenitro.gif"))

        //atingema simti cami pasa ?
        if (mesaj.includes("atinge-ma, simti ca imi pasa") || mesaj.includes("atinge-ma, simti ca-mi pasa")) return msg.channel.send(new Discord.MessageAttachment("meme/atingemasimticamipasa.png"))

        //si daca is javra ?
        if (mesaj.includes("si daca is javra") || mesaj.includes("si daca sunt javra")) return msg.channel.send(new Discord.MessageAttachment("meme/sidacaisjavra.jpg"))

        //poti macar din politete sa imi raspunzi ?
        if (mesaj.includes("poti macar din politete sa imi raspunzi")) return msg.channel.send(new Discord.MessageAttachment("meme/potimacardinpolitetesaimiraspunzi.jpg"))

        //atingema simti cami pasa ?
        if (mesaj.includes("ti as da limbi 5 luni sa te fut o data") || mesaj.includes("ti-as da limbi 5 luni sa te fut o data")) return msg.channel.send(new Discord.MessageAttachment("meme/tiasdalimbi.jpg"))

        //buy me nitro
        if (mesaj.includes("cu kfc inainte")) return msg.channel.send(new Discord.MessageAttachment("meme/cukfcinainte.jpg"))

        //amang us
        if (mesaj.includes("amang us") || mesaj.includes("amangus"))return msg.channel.send(new Discord.MessageAttachment("meme/amangus.png"))

        //random spongebob
        if (((Math.random() * 200) <= 1) && msg.content) {
            var message;
            for (var i=0; i<msg.content.length; i+=1)
                if(msg.content[i] && i%2!=0)
                    message+=msg.content[i].toUpperCase();
                else message+=msg.content[i].toLowerCase();
            return msg.channel.send(message.replace("undefined", ""));
        }

        //jenant
        if (msg.content.toLowerCase().includes("jenant")) {
            if (cooldowns[0]) {
                cooldowns[0] = false;
                msg.channel.send("jenant");
                setTimeout(() => {
                    cooldowns[0]=true;
                }, 15000)
            }
        }

        //venice
        if (mesaj.includes("venice"))
            msg.channel.send(`You know Paris, France? In English, it's pronounced "Paris" but everyone else pronounces it without the "s" sound, like the French do. But with Venezia, everyone pronouces it the English way: "Venice". Like 'The Merchant of Venice' or 'Death in Venice'. WHY, THOUGH!? WHY ISN'T THE TITLE DEATH IN VENEZIA!? ARE YOU FUCKING KIDDING ME!? IT TAKES PLACE IN ITALY, SO USE THE ITALIAN WORD, DAMMIT! THAT SHIT PISSES ME OFF! BUNCH OF DUMBASSES!`)

        //cool
        if (msg.channel.id == "719961466509328406") {

            if (nmsg > 2 && msg.content == replymsg) return;
            
            if (nmsg == 2 && msg.content == replymsg && (msg.author.id != user1 && msg.author.id != user2)) {
                msg.channel.send(msg.content)
            } else if (nmsg == 1 && msg.content == replymsg && msg.author.id != user1) {
                user2 = msg.author.id;
                nmsg = 2;
            } else {
                nmsg = 1;
                user1 = msg.author.id;
                user2 = "";
                replymsg = msg.content;
            }
        }
        
    }

    async init() {
        cooldowns[0] = true;
    }

};
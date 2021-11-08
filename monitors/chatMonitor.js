const { Monitor } = require('klasa');
const Discord = require('discord.js');
let cooldowns = { };
let msgid;
var claim;
module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, {
            name: 'chatMonitor',
            enabled: true,
            ignoreBots: false,
            ignoreSelf: false,
            ignoreOthers: false,
            ignoreWebhooks: true,
            ignoreEdits: true,
            ignoreBlacklistedUsers: false,
            ignoreBlacklistedGuilds: false
        });
    }

    run(msg) {

        //snob
        if (msg.author.id == "673362753489993749" && msg.channel.id == "748872275675185152") {
            if (msg.embeds.length > 0 && (msg.embeds[0].title && msg.embeds[0].title.includes("Tier"))) {
                let theembed = msg.embeds[0];
                //let rank = theembed.title.split(": ")[1];
                let seconds = 24;
                msg.channel.send(`Despawning in ${seconds} seconds.`).then(m => {
                    msgid = m.id;
                    function taimar() {
                        if (seconds <= 2) {
                            clearInterval(myTaimar);
                            return m.delete();
                        }
                        seconds-=2;
                        m.edit(`Despawning in ${seconds} seconds.`);
                    }
                    var myTaimar = setInterval(taimar, 2000);
                })
                //if (Number(rank) >= 4) return msg.channel.send(`<@&748874360726618162> a Tier ${rank} has been spawned!`)
            }
            
            if (msg.embeds.length > 0 && (msg.embeds[0].description && msg.embeds[0].description.includes("got the card!"))) {
                msg.react("💜");
                function taimar() {
                    msg.channel.send("claim");
                }
                if (claim) {
                    clearTimeout(claim);
                    claim = setTimeout(taimar, 120000+15000);
                } else {
                    claim = setTimeout(taimar, 120000+15000);
                }
            }
                
            
        }

        //invites
        const inviteRegex = /(https?:\/\/)?(www\.|canary\.|ptb\.)?discord(\.gg|(app)?\.com\/invite|\.me)\/([^ ]+)\/?/gi;
        const secondInviteRegex = /(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i;
        if ((inviteRegex.test(msg.content) || secondInviteRegex.test(msg.content)) && !msg.member.permissions.has("ADMINISTRATOR") && !msg.guild.member(msg.author).roles.cache.has("719954439078936619") && !msg.guild.member(msg.author).roles.cache.has("579691573135147020")) {
            if (!msg.guild.member(msg.author).roles.cache.has("412196549775458306"))
                msg.guild.member(msg.author).roles.add("412196549775458306")
            msg.delete()
        }

        
        //Chat Monitor
        var channels = [ "718775221615722536", "719965182486380574" ]
        var channelsDel = [ "730736197697273886" ]
        if (channels.includes(msg.channel.id) && msg.attachments.size < 1) return msg.delete();
        if (channelsDel.includes(msg.channel.id)) return msg.delete();

        //Level role giver
        if(msg.author.id == "159985870458322944") {
            const args = msg.content.split(" ");
            let level = Number(args[0]);
            let user = msg.mentions.users.first();

            if(!level || !user) return;

            if (level >= 50) {
                if (!msg.guild.member(user).roles.cache.has("720283480558272523")) {
                    msg.guild.member(user).roles.add("720283480558272523");
                    msg.guild.member(user).roles.remove("720283480935759963");
                }
            }
            else if (level >= 35) {
                if (!msg.guild.member(user).roles.cache.has("720283480935759963")) {
                    msg.guild.member(user).roles.add("720283480935759963");
                    msg.guild.member(user).roles.remove("720282775965532190");
                }
            }
            else if (level >= 25){
                if (!msg.guild.member(user).roles.cache.has("720282775965532190")) {
                    msg.guild.member(user).roles.add("720282775965532190");
                    msg.guild.member(user).roles.remove("720282787797532782");
                }
            }
            else if (level >= 20){
                if (!msg.guild.member(user).roles.cache.has("720282787797532782")) {
                    msg.guild.member(user).roles.add("720282787797532782");
                    msg.guild.member(user).roles.remove("720282787986407455");
                }
            }
            else if (level >= 15){
                if (!msg.guild.member(user).roles.cache.has("720282787986407455")) {
                    msg.guild.member(user).roles.add("720282787986407455");
                    msg.guild.member(user).roles.remove("720282788309499986");
                }
            }
            else if (level >= 10){
                if (!msg.guild.member(user).roles.cache.has("720282788309499986")) {
                    msg.guild.member(user).roles.add("720282788309499986");
                    msg.guild.member(user).roles.remove("720282659573727344");
                }
            }
            else if (level >= 5){
                if (!msg.guild.member(user).roles.cache.has("720282659573727344")) {
                    msg.guild.member(user).roles.add("720282659573727344");
                }
            }
            else return;
        }

        
    }

    async init() {
        cooldowns[0] = true;
    }

};
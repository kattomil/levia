const { Event } = require('klasa');
const Discord = require('discord.js');
module.exports = class extends Event {

    constructor(...args) {
        super(...args, { name:'messageReactionAdd', enabled: true });
    }

    async run(reaction, user) {
        const msg = reaction.message;
        if (msg.guild.id != "412190331434565632") return;
        if (((msg.author.id == user.id || user.id == "413335791272460288") && reaction.emoji.name == '⭐')) return reaction.users.remove(msg.author.id);
        if (reaction.emoji.name == '⭐') {
            const sbchannel = msg.guild.channels.cache.get("714075533796966460");
            const fetchedMessages = await sbchannel.messages.fetch({limit: 30});
            const stars = fetchedMessages.find(m => m.embeds[0].footer.text.startsWith('⭐') && m.embeds[0].footer.text.endsWith(msg.id));
            if (stars) {
                const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(stars.embeds[0].footer.text);
                const foundStar = stars.embeds[0];
                const image = msg.attachments.size > 0 ? await this.extension(reaction, msg.attachments.array()[0].url) : ''; 
                const embed = new Discord.MessageEmbed()
                  .setColor(foundStar.color)
                  .setDescription(foundStar.description)
                  .setAuthor(msg.author.tag, msg.author.displayAvatarURL(), `https://discordapp.com/channels/${msg.guild.id}/${msg.channel.id}/${msg.id}`)
                  .setTimestamp()
                  .setFooter(`⭐ ${parseInt(star[1])+1} | ${msg.id}`)
                  .setImage(image);
                const starMsg = await sbchannel.messages.fetch(stars.id);
                await starMsg.edit(`Sent in <#${msg.channel.id}>`,{ embed }); 
              }
            if (!stars) {
                const image = msg.attachments.size > 0 ? await this.extension(reaction, msg.attachments.array()[0].url) : ''; 
                if (image == '' && msg.cleanContent.length < 1) return msg.channel.send(`${user}, you cannot star an empty message.`); 
                const embed = new Discord.MessageEmbed()
                    .setColor("#FFD700")
                    .setDescription(msg.cleanContent.length > 0 ? msg.cleanContent + `\n\n[go to message](https://discordapp.com/channels/${msg.guild.id}/${msg.channel.id}/${msg.id})` : '[go to message](https://discordapp.com/channels/${msg.guild.id}/${msg.channel.id}/${msg.id})')
                    .setAuthor(msg.author.tag, msg.author.displayAvatarURL(), `https://discordapp.com/channels/${msg.guild.id}/${msg.channel.id}/${msg.id}`)
                    .setTimestamp(new Date())
                    .setFooter(`⭐ 1 | ${msg.id}`)
                    .setImage(image);
                  await sbchannel.send(`Sent in <#${msg.channel.id}>`,{ embed });
              }
        }
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

    extension(reaction, attachment) {
        const imageLink = attachment.split('.');
        const typeOfImage = imageLink[imageLink.length - 1];
        const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
        if (!image) return '';
        return attachment;
    };
};
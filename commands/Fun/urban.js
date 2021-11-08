const { Command } = require('klasa');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'urban',
            enabled: true,
            runIn: ['text'],
            cooldown: 10,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Search for something in the urban dictionary',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        let args = msg.content.split(" ").slice(1);

        let reason = args.join(' ')
        if (reason.length < 1) return msg.channel.send(`\`\`\`diff\n-Text is a required argument.\`\`\``)

        var urban = require('urban');
        urban(`${reason}`).first(function(json) {
            if (!json) return msg.channel.send(`\`\`\`py\n@ I can't find this word in Urban Dictionary, try something else.\`\`\``)
            msg.channel.send(`**${json.word}** is **${json.definition}**\nExample: **${json.example}**\nDefined by **${json.author}** (${json.defid})`);
        })
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};
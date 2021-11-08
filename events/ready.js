const { Event } = require('klasa');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, { name:'ready', enabled: true });
    }

    run(...params) {

        this.client.channels.cache.get("713005666943500341").send("Startup on **" + getDateTime() + "**");
        this.client.user.setActivity(`Netflix. | ?help`, {type: 'WATCHING'})
        if(this.client.user.id == "413335791272460288")
            this.client.channels.cache.get("719961466509328406").send("im bacc")

        /**
        setInterval(() => {
            var date = new Date();
            var hour = date.getHours();
            hour = (hour < 10 ? "0" : "") + hour;
            if (hour >= 6 && hour <= 21)
                this.client.guilds.cache.get("412190331434565632").roles.cache.get("579691573135147020").edit({color: "#" + Math.floor(Math.random()*16777215).toString(16)})
        }, 300000);
        */
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};

function getDateTime() {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return year + "/" + month + "/" + day + " at " + hour + ":" + min + ":" + sec;
}
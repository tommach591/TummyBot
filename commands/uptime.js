module.exports = {
    name: 'uptime',
    description: "Get uptime on bot.",

    execute(message, masterData) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();
        
        var currentTime = new Date();
        var difference = currentTime - masterData["savefile"].startTime;

        var hours = Math.floor(difference / (1000 * 60 * 60));
        var min = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        var sec = Math.floor((difference % (1000 * 60 * 60)) % (1000 * 60) / (1000));

        if (hours < 10) {
            hours = "0" + hours.toString();
        }
        if (min < 10) {
            min = "0" + min.toString();
        }
        if (sec < 10) {
            sec = "0" + sec.toString();
        }
        
        embedMsg.setTitle('Bot Status');
        embedMsg.setColor('00FF00');
        embedMsg.setFields(
            {name: "**__Online Since__** :sunrise:", value: masterData["savefile"].startTime.toLocaleString() + " PST", inline: false},
            {name: "**__Uptime__** :white_sun_small_cloud:", value: hours + ":" + min + ":" + sec, inline: false},
            {name: "**__Last Saved__** :pencil:", value: masterData["savefile"].lastSave.toLocaleString() + " PST", inline: false}
        );
        embedMsg.setThumbnail("https://c.tenor.com/9dxJDRZinKYAAAAM/good-morning-sun.gif");
        message.channel.send({ embeds: [embedMsg] });
    }
}
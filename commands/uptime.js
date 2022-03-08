module.exports = {
    name: 'uptime',
    description: "Get uptime on bot.",

    execute(message, args, savefile) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();
        
        var currentTime = new Date();
        var difference = currentTime - savefile.startTime;

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
        
        embedMsg.setTitle('Uptime!');
        embedMsg.setColor('00FF00');
        embedMsg.setDescription("Online Since: " + savefile.startTime.toLocaleString() + " PST\nUptime: " + hours + ":" + min + ":" + sec + "\n");
        embedMsg.setFooter("Uptime: " + hours + ":" + min + ":" + sec + "\n");
        embedMsg.setFooter("Last Saved: " + savefile.lastSave.toLocaleString() + " PST\n");
        message.channel.send({ embeds: [embedMsg] });
    }
}
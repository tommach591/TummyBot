module.exports = {
    name: 'level',
    description: "Spend points to increase income.",

    execute(message, args, userid, userData, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        var keys = [];
        for (var k in userData) {
            keys.push(k);
        }

        keys.sort((firstEl, secondEl) => { 
            if (userData[firstEl].points < userData[secondEl].points) {
                return -1;
            }
            if (userData[firstEl].points > userData[secondEl].points) {
                return 1;
            }
            return 0;
        });

        var names = "";
        var points = "";
        for (var k in keys) {
            names += userData[k].name + "\n";
            points += userData[k].points + "\n";
        }
        embedMsg.setTitle("**__The Leaderboard__**");
        embedMsg.setFields(
            {name: "Player", value: names, inline: true},
            {name: "Points", value: points, inline: true}
        )
        message.channel.send({ embeds: [embedMsg] });
    }
}
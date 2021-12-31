module.exports = {
    name: 'beg',
    description: "Beg to feed your gambling addiction.",

    execute(message, args, userid, userData, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();
        const beggingMsg = new MessageEmbed();

        embedMsg.setTitle('The Beggar Prays!');
        var newTime = new Date();
        var timeDiff = newTime.getTime() - userData[userid].begTime;
        var begCD = 1000 * 60 * 10; // 10min

        var begTime = 5000;
        beggingMsg.setTitle('The Beggar Prays!');
        beggingMsg.setDescription('Begging in progress...');
        beggingMsg.setImage('https://thumbs.gfycat.com/MiserableAmusedHarvestmen-max-1mb.gif');
        message.channel.send({ embeds: [beggingMsg] }).then(msg=> {setTimeout(() => msg.delete(), begTime - 500)});

        setTimeout(function() { 
            if (timeDiff >= begCD) {
                var pity = Math.floor(Math.random() * 49) + 1;
                userData[userid].points += pity;
                embedMsg.setColor('00FF00');
                embedMsg.setDescription("The gods have given the beggar " + pity + " points!");
                embedMsg.setImage('http://media1.giphy.com/media/Sb9g8EwGfrPqg/giphy.gif');
                message.channel.send({ embeds: [embedMsg] });
                userData[userid].begTime = newTime.getTime();
            }
            else {
                embedMsg.setColor('FF0000');
                embedMsg.setDescription("The gods are busy drinking tea for another " + Math.floor((begCD - timeDiff) / 1000) + " seconds.");
                embedMsg.setImage('https://media2.giphy.com/media/3oKIP8kNuTJJL3zT0I/source.gif');
                message.channel.send({ embeds: [embedMsg] });
            }
        }, begTime);
    }
}
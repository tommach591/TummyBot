module.exports = {
    name: 'beg',
    description: "Beg to feed your gambling addiction.",

    execute(message, userid, masterData) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();
        const beggingMsg = new MessageEmbed();

        embedMsg.setTitle('The Beggar Prays!');
        var newTime = new Date();
        var timeDiff = newTime.getTime() - masterData["userData"][userid].begTime;
        var begCD = 1000 * 60 * 10; // 10min

        var begTime = 5000;

        if (timeDiff >= begCD) {
            var pity = Math.floor(Math.random() * 49) + 1;
            masterData["userData"][userid].points += pity;
            masterData["userData"][userid].begTime = newTime.getTime();
            beggingMsg.setTitle('The Beggar Prays!');
            beggingMsg.setDescription('Begging in progress...');
            beggingMsg.setImage('https://thumbs.gfycat.com/MiserableAmusedHarvestmen-max-1mb.gif');
            message.channel.send({ embeds: [beggingMsg] }).then(msg=> {setTimeout(() => msg.delete(), begTime - 500)});
            
            setTimeout(function() { 
                embedMsg.setColor('00FF00');
                embedMsg.setDescription("The gods have given the beggar " + pity + " points!");
                embedMsg.setImage('http://media1.giphy.com/media/Sb9g8EwGfrPqg/giphy.gif');
                message.channel.send({ embeds: [embedMsg] });
            }, begTime);
        }
        else {
            embedMsg.setColor('FF0000');
            embedMsg.setDescription("The gods are busy drinking tea for another " + Math.floor((begCD - timeDiff) / 1000) + " seconds.");
            embedMsg.setImage('https://c.tenor.com/FhBDy-T1L6AAAAAM/kermit-the-frog-sip.gif');
            message.channel.send({ embeds: [embedMsg] });
        }
    }
}
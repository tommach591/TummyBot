module.exports = {
    name: 'bosshere',
    description: "Set channel to spawn boss.",

    execute(message, userid, masterData) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        if (masterData["userData"][userid].gm >= 1) {
            if (!masterData["currHunt"].alertChannels.includes(message.channel))
            {
                masterData["currHunt"].alertChannels.push(message.channel);
                embedMsg.setTitle('Error!');
                embedMsg.setColor('00FF00');
                embedMsg.setDescription('This channel will be notified for boss alerts!');
                message.channel.send({ embeds: [embedMsg] });
                console.log(message.channel);
            }
            else
            {
                embedMsg.setTitle('Error!');
                embedMsg.setColor('FF0000');
                embedMsg.setDescription('This channel is already registered!');
                message.channel.send({ embeds: [embedMsg] });
            }

        }
        else {
            embedMsg.setTitle('Error!');
            embedMsg.setColor('FF0000');
            embedMsg.setDescription('You do not have permission to use this command!');
            message.channel.send({ embeds: [embedMsg] });
        }
    }
}
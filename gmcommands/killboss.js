module.exports = {
    name: 'killboss',
    description: "Kills current boss.",

    execute(message, args, userid, userData, currHunt, monsterdex, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        if (userData[userid].gm >= 1) {
            if (currHunt["active"]) {
                currHunt.lastDifficulty.push(currHunt["active"].difficulty);
                delete currHunt["active"];
                embedMsg.setTitle('Success!');
                embedMsg.setColor('FF0000');
                embedMsg.setDescription('Boss is banished to the Shadow Realm!');
                message.channel.send({ embeds: [embedMsg] });
            }
            else {
                embedMsg.setTitle('Error!');
                embedMsg.setColor('FF0000');
                embedMsg.setDescription('Boss is not active!');
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
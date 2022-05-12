module.exports = {
    name: 'killboss',
    description: "Kills current boss.",

    execute(message, args, userid, userData, userHunt, currHunt, monsterdex, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        if (userData[userid].gm >= 1) {
            if (currHunt["active"]) {
                var players = currHunt["active"].targets;
                for (let i = 0; i < players.length; i++)
                {
                    userHunt[players[i]].currentHP = userHunt[players[i]].maxHP;
                }
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
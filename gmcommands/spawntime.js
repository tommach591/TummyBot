module.exports = {
    name: 'spawntime',
    description: "Set a new boss spawn time.",

    execute(message, args, userid, userData, currHunt, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        if (userData[userid].gm >= 1) {
            if (args.length == 0) {
                embedMsg.setTitle('Error!');
                embedMsg.setColor('FF0000');
                embedMsg.setDescription('Please enter a new time!');
                message.channel.send({ embeds: [embedMsg] });
                return;
            }
            var newtime = Math.floor(Number(args[0]));
            var lastspawn = new Date();

            if (!isNaN(newtime)) {
                currHunt.lastSpawn = lastspawn.getTime();
                currHunt.nextSpawn = (1000 * 60) * newtime;
                embedMsg.setTitle('Success!');
                embedMsg.setColor('00FF00');
                embedMsg.setDescription('New boss spawn time set to next ' + newtime + ' minutes!');
                message.channel.send({ embeds: [embedMsg] });
            }
            else {
                embedMsg.setTitle('Error!');
                embedMsg.setColor('FF0000');
                embedMsg.setDescription('Not a number!');
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
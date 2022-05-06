module.exports = {
    name: 'droprate',
    description: "Set drop rate for hunt.",

    execute(message, args, userid, userData, currHunt, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        if (userData[userid].gm >= 1) {
            if (args.length < 2) {
                embedMsg.setTitle('Error!');
                embedMsg.setColor('FF0000');
                embedMsg.setDescription('Please enter a drop rate and duration!');
                message.channel.send({ embeds: [embedMsg] });
                return;
            }
            var rate = Number(args[0]);
            var time = Math.floor(Number(args[1])) * 1000 * 60 * 60;
            var newTime = new Date();
            
            if (!isNaN(rate) && !isNaN(time)) {
                currHunt.dropRate = rate;
                currHunt.dropDuration = time;
                currHunt.dropRateStart = newTime.getTime();
                embedMsg.setTitle('Drop Rate!');
                embedMsg.setColor('00FF00');
                embedMsg.setDescription('Drop rate set to ' + (currHunt.dropRate).toLocaleString() + 'x for ' + (time / (1000 * 60)).toLocaleString() + ' hour(s)!');
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
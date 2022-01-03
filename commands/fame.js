module.exports = {
    name: 'fame',
    description: "Fame someone.",

    execute(message, args, userid, userData, client){
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        if (args.length == 0) {
            embedMsg.setTitle('Error!');
            embedMsg.setColor('FF0000');
            embedMsg.setDescription('Please @ the user!');
            message.channel.send({ embeds: [embedMsg] });
            return;
        }
        var mention = args[0];

        if (mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);
    
            if (mention.startsWith('!')) {
                mention = mention.slice(1);
            }
    
            if (!userData[mention]) {
                embedMsg.setTitle('Error!');
                embedMsg.setColor('FF0000');
                embedMsg.setDescription('User does not exist!');
                message.channel.send({ embeds: [embedMsg] });
                return;
            }
            const target = client.users.cache.get(mention);

            var newTime = new Date();
            var timeDiff = newTime.getTime() - userData[userid].fameTime;
            var fameCD = 1000 * 60 * 60 * 20; // 20 hrs

            if (timeDiff >= fameCD) {
                userData[mention].fame++;
                embedMsg.setTitle('Success!');
                embedMsg.setColor('00FF00');
                embedMsg.setThumbnail('https://i.imgur.com/xEg1ecb.png');
                embedMsg.setDescription(userData[userid].name + " famed " + target.username + "!");
                message.channel.send({ embeds: [embedMsg] });
                userData[userid].fameTime = newTime.getTime();
            }
            else {
                var hours = Math.floor((fameCD - timeDiff) / (1000 * 60 * 60));
                var min = Math.floor(((fameCD - timeDiff) % (1000 * 60 * 60)) / (1000 * 60));
                var sec = Math.floor(((fameCD - timeDiff) % (1000 * 60 * 60)) % (1000 * 60) / (1000));
                if (hours < 10) {
                    hours = "0" + hours.toString();
                }
                if (min < 10) {
                    min = "0" + min.toString();
                }
                if (sec < 10) {
                    sec = "0" + sec.toString();
                }
                embedMsg.setTitle('Error!');
                embedMsg.setColor('FF0000');
                embedMsg.setDescription(userData[userid].name + " can't fame yet!");
                embedMsg.setThumbnail('https://c.tenor.com/P285-2vH5FYAAAAC/alone-lonely.gif');
                embedMsg.setFooter('Cooldown: ' + hours + ":" + min + ":" + sec);
                message.channel.send({ embeds: [embedMsg] });
            }
        }
        else {
            embedMsg.setTitle('Error!');
            embedMsg.setColor('FF0000');
            embedMsg.setDescription('User does not exist!');
            message.channel.send({ embeds: [embedMsg] });
        }
    }
}
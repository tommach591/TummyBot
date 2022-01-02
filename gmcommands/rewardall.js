module.exports = {
    name: 'rewardall',
    description: "Reward points to everyone.",

    execute(message, args, userid, userData, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        if (userData[userid].gm >= 1) {
            if (args.length == 0) {
                embedMsg.setTitle('Error!');
                embedMsg.setColor('FF0000');
                embedMsg.setDescription('Please enter an amount!');
                message.channel.send({ embeds: [embedMsg] });
                return;
            }

            var keys = [];
            for (var k in userData) {
                keys.push(k);
            }

            var amount = Math.floor(Number(args[0]));

            if (!isNaN(amount)) {
                if (amount > 0) {
                    for (var i = 0; i < keys.length; i++) {
                        userData[keys[i]].points += amount;
                    }
                    embedMsg.setTitle('Success!');
                    embedMsg.setColor('00FF00');
                    embedMsg.setThumbnail('https://i.imgur.com/2J59UgH.png');
                    embedMsg.setDescription("Everyone has been rewarded with " + amount + " points!");
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription(userData[userid].name + " can't reward 0 points!");
                    message.channel.send({ embeds: [embedMsg] });
                }
            }
            else {
                embedMsg.setTitle('Error!');
                embedMsg.setColor('FF0000');
                embedMsg.setDescription('Please enter a valid amount!');
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
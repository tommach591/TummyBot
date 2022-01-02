module.exports = {
    name: 'reward',
    description: "Reward points to someone.",

    execute(message, args, userid, userData, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        if (userData[userid].gm >= 1) {
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
                var amount = Math.floor(Number(args[1]));

                if (!isNaN(amount)) {
                    if (amount > 0) {
                        userData[mention].points += amount;
                        embedMsg.setTitle('Success!');
                        embedMsg.setColor('00FF00');
                        embedMsg.setThumbnail('https://i.imgur.com/2J59UgH.png');
                        embedMsg.setDescription(target.username + " has been rewarded with " + amount + " points!");
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
                embedMsg.setDescription('User does not exist!');
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
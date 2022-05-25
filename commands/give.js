module.exports = {
    name: 'give',
    description: "Give points to someone.",

    execute(message, args, userid, masterData, client){
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
    
            if (!masterData["userData"][mention]) {
                embedMsg.setTitle('Error!');
                embedMsg.setColor('FF0000');
                embedMsg.setDescription('User does not exist!');
                message.channel.send({ embeds: [embedMsg] });
                return;
            }
            const target = client.users.cache.get(mention);
            var amount = Math.floor(Number(args[1]));

            if (!isNaN(amount)) {
                if (masterData["userData"][userid].points >= amount && amount > 0) {
                    masterData["userData"][userid].points -= amount;
                    masterData["userData"][mention].points += amount;
                    embedMsg.setTitle('Success!');
                    embedMsg.setColor('00FF00');
                    embedMsg.setThumbnail('https://i.imgur.com/2J59UgH.png');
                    embedMsg.setDescription(masterData["userData"][userid].name + " gives " + target.username + " " + amount + " points!");
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    if (amount == 0) {
                        embedMsg.setDescription(masterData["userData"][userid].name + " can't give 0 points!");
                    }
                    else {
                        embedMsg.setDescription(masterData["userData"][userid].name + " does not have " + amount + " point(s)!");
                    }
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
}
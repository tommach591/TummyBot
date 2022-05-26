module.exports = {
    name: 'gm',
    description: "Set GM level.",

    execute(message, args, userid, masterData, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        if (masterData["userData"][userid].gm >= 1) {
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
                var level = Math.floor(Number(args[1]));

                if (!isNaN(level)) {
                    if (level >= 0) {
                        masterData["userData"][mention].gm = level;
                        embedMsg.setTitle('Success!');
                        embedMsg.setColor('00FF00');
                        embedMsg.setDescription(target.username + " has been set to GM level " + level + "!");
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else {
                        embedMsg.setTitle('Error!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription(masterData["userData"][userid].name + " can't be set to GM level " + level + "!");
                        message.channel.send({ embeds: [embedMsg] });
                    }
                }
                else {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription('Please enter a valid level!');
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
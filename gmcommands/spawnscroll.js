module.exports = {
    name: 'spawnscroll',
    description: "Generate a scroll for a user!",

    execute(message, args, userid, userData, userHunt, scrolls, client) {
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

                var choice = Math.floor(Number(args[1]));

                if (!isNaN(choice) && scrolls[choice]) {
                    var scrollobtained = scrolls[choice];
                    userHunt[mention].scrolls.push(choice);
                    embedMsg.setTitle('Success!');
                    embedMsg.setColor('00FF00');
                    embedMsg.setDescription(userData[mention].name + ' was gifted a ' + scrollobtained.name + '!');
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription('Please enter a valid scroll ID!');
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
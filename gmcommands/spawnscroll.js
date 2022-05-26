module.exports = {
    name: 'spawnscroll',
    description: "Generate a scroll for a user!",

    execute(message, args, userid, masterData, masterStorage, client) {
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

                var choice = Math.floor(Number(args[1]));
                var amount = Math.floor(Number(args[2]));

                if (!isNaN(choice) && masterStorage["scrolls"][choice]) {
                    var scrollobtained = masterStorage["scrolls"][choice];
                    if (!isNaN(amount) && amount > 0) {
                        for (let i = 0; i < amount; i++) {
                            masterData["userHunt"][mention].scrolls.push(choice);
                        }
                        embedMsg.setDescription(masterData["userData"][mention].name + ' was gifted ' + amount + " " + scrollobtained.name + '\'s!');
                    }
                    else {
                        masterData["userHunt"][mention].scrolls.push(choice);
                        embedMsg.setDescription(masterData["userData"][mention].name + ' was gifted a ' + scrollobtained.name + '!');
                    }
                    embedMsg.setTitle('Success!');
                    embedMsg.setColor('00FF00');
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
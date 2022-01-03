module.exports = {
    name: 'marry',
    description: "Marry someone.",

    execute(message, args, userid, userData, client) {
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

            const filter = (reaction, user) => {
                return user.id === message.author.id;
            };

            message.react('👍').then(() => message.react('👎'));
            const collector  = message.createReactionCollector({
                filter,
                max: 1,
                time: 1000 * 10
            });

            collector.on('collect', (reaction) => {
                console.log(reaction.emoji);
            });

            collector.on('end', (collected) => {
                if (collected.size === 0) {
                    message.reply("You did not reply in time");
                    return;
                }

                message.reply("You reacted!");
            });

        }
        else {
            embedMsg.setTitle('Error!');
            embedMsg.setColor('FF0000');
            embedMsg.setDescription('User does not exist!');
            message.channel.send({ embeds: [embedMsg] });
        }
    }
}
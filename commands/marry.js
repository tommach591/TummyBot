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
                console.log(user.id);
                console.log(message.author.id);
                return ['thumbsup', 'thumbsdown'].includes(reaction.emoji.name) && user.id === message.author.id;
            };

            message.react('thumbsup').then(() => message.react('thumbsdown')).then(
                message.awaitReactions({ filter, max: 1, time: (1000 * 10), errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first();
                    if (reaction.emoji.name == 'thumbsup') {
                        message.reply('You reacted with a thumbs up.');
                    } else {
                        message.reply('You reacted with a thumbs down.');
                    }
                })
                .catch(collected => {
                    message.reply('You reacted with neither a thumbs up, nor a thumbs down.');
                })
            );
        }
        else {
            embedMsg.setTitle('Error!');
            embedMsg.setColor('FF0000');
            embedMsg.setDescription('User does not exist!');
            message.channel.send({ embeds: [embedMsg] });
        }
    }
}
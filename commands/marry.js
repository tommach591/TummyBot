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

            embedMsg.setTitle('Marriage Proposal!');
            embedMsg.setColor('FFAAAA');
            embedMsg.setDescription("Would you, " + userData[mention].name + " , like to marry me, " + userData[userid].name + "?");

            let proposalid;
            message.channel.send({ embeds: [embedMsg] }).then(
                sent => { proposal = sent } 
            ).then(
                () => {
                    proposal.react('👍').then(() => proposal.react('👎'));
                    const filter = (reaction, user) => {
                        return ['👍', '👎'].includes(reaction.emoji.name) && user.id === mention;
                    };
                    proposal.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] })
                    .then(collected => {
                        const reaction = collected.first();
                
                        if (reaction.emoji.name === '👍') {
                            proposal.reply('You are now married! (not really didnt code it yet)');
                        } else {
                            proposal.reply('You got rejected! HAHA');
                        }
                    })
                    .catch(collected => {
                        proposal.reply('You didnt respond.');
                    });
                }
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
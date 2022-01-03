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

            const proposalMsg = new MessageEmbed();
            proposalMsg.setTitle('Marriage Proposal!');
            proposalMsg.setColor('FF80AB');
            proposalMsg.setThumbnail("https://c.tenor.com/XyTOSR4H93wAAAAC/rosycheeks-mochi-peach.gif");
            proposalMsg.setDescription("Would you, " + userData[mention].name + " , like to marry me, " + userData[userid].name + "?");

            let proposal; 
            message.channel.send({ embeds: [embedMsg] }).then(
                sent => { 
                    proposal = sent; 
                }
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
                            userData[userid].married = userid;
                            userData[mention].married = mention;
                            const responseMsg = new MessageEmbed();
                            responseMsg.setTitle('Congratulations!');
                            responseMsg.setColor('FF80AB');
                            responseMsg.setThumbnail("https://media4.giphy.com/media/qFmdpUKAFZ6rMobzzu/200w.gif");
                            responseMsg.setDescription(userData[userid].name + " and " + userData[mention].name + " are now married!");
                            message.channel.send({ embeds: [responseMsg] });
                        } else {
                            responseMsg.setTitle('HAHA!');
                            responseMsg.setColor('FF0000');
                            responseMsg.setThumbnail("https://c.tenor.com/txglRAFL8SwAAAAC/cat-laugh-laugh.gif");
                            responseMsg.setDescription(userData[mention].name + " rejected you!");
                            message.channel.send({ embeds: [responseMsg] });
                        }
                    })
                    .catch(collected => {
                        embedMsg.setTitle('HAHA!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setThumbnail("https://c.tenor.com/txglRAFL8SwAAAAC/cat-laugh-laugh.gif");
                        embedMsg.setDescription(userData[mention].name + " ignored you!");
                        message.channel.send({ embeds: [embedMsg] });
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
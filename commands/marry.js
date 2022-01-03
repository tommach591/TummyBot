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
            if (userData[mention] == userData[userid]) {
                embedMsg.setTitle('Error!');
                embedMsg.setColor('FF0000');
                embedMsg.setDescription('You can\'t marry yourself!');
                message.channel.send({ embeds: [embedMsg] });
                return;
            }
            const target = client.users.cache.get(mention);

            if (userData[userid].married != "") {
                embedMsg.setTitle('Error!');
                embedMsg.setColor('FF0000');
                embedMsg.setFooter("Wow you're horrible...");
                embedMsg.setDescription(userData[userid].name + " is already married!");
                message.channel.send({ embeds: [embedMsg] });
            }
            else if (userData[mention].married != "") {
                embedMsg.setTitle('Error!');
                embedMsg.setColor('FF0000');
                embedMsg.setFooter("Try getting them to divorce!");
                embedMsg.setDescription(userData[mention].name + " is already married!");
                message.channel.send({ embeds: [embedMsg] });
            }
            else {

                const proposalMsg = new MessageEmbed();
                proposalMsg.setTitle('Marriage Proposal!');
                proposalMsg.setColor('FF80AB');
                proposalMsg.setThumbnail("https://i.imgur.com/H069LVz.png");
                proposalMsg.setDescription("Would you, " + userData[mention].name + " , like to marry me, " + userData[userid].name + "?");

                
                let proposal; 
                message.channel.send({ embeds: [proposalMsg] }).then(
                    sent => { proposal = sent } 
                ).then(
                    () => {
                        proposal.react('👍').then(() => proposal.react('👎'));
                        const filter = (reaction, user) => {
                            return ['👍', '👎'].includes(reaction.emoji.name) && user.id === mention;
                        };
                        proposal.awaitReactions({ filter, max: 1, time: 30000, errors: ['time'] })
                        .then(collected => {
                            const reaction = collected.first();
                            if (reaction.emoji.name === '👍') {
                                userData[userid].married = mention;
                                userData[mention].married = userid;
                                embedMsg.setTitle('Congratulations!');
                                embedMsg.setColor('FF80AB');
                                embedMsg.setThumbnail("https://media4.giphy.com/media/qFmdpUKAFZ6rMobzzu/200w.gif");
                                embedMsg.setDescription(userData[userid].name + " and " + userData[mention].name + " are now married!");
                                message.channel.send({ embeds: [embedMsg] });
                            } else {
                                embedMsg.setTitle('HAHA!');
                                embedMsg.setColor('FF0000');
                                embedMsg.setThumbnail("https://c.tenor.com/txglRAFL8SwAAAAC/cat-laugh-laugh.gif");
                                embedMsg.setDescription(userData[mention].name + " rejected you!");
                                message.channel.send({ embeds: [embedMsg] });
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
                )
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
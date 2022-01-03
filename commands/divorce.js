module.exports = {
    name: 'divorce',
    description: "Divorce someone.",

    execute(message, args, userid, userData, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        if (userData[userid].married == "") {
            embedMsg.setTitle('Error!');
            embedMsg.setColor('FF0000');
            embedMsg.setDescription(userData[userid].name + " is already alone!");
            embedMsg.setFooter("HAHA YOU CAN'T DIVORCE YOUR LEFT HAND!");
            message.channel.send({ embeds: [embedMsg] });
        }
        else {
            const proposalMsg = new MessageEmbed();
            proposalMsg.setTitle('Divorce Proposal!');
            proposalMsg.setColor('FF80AB');
            proposalMsg.setThumbnail("https://i.imgur.com/C7XXOTl.png");
            proposalMsg.setDescription("Would you, " + userData[userid].name + " , like to divorce " + userData[userData[userid].married].name + "?");

            
            let proposal; 
            message.channel.send({ embeds: [proposalMsg] }).then(
                sent => { proposal = sent } 
            ).then(
                () => {
                    proposal.react('👍').then(() => proposal.react('👎'));
                    const filter = (reaction, user) => {
                        return ['👍', '👎'].includes(reaction.emoji.name) && user.id === userid;
                    };
                    proposal.awaitReactions({ filter, max: 1, time: 30000, errors: ['time'] })
                    .then(
                        collected => {
                        const reaction = collected.first();
                        if (reaction.emoji.name === '👍') {
                            userData[userData[userid].married].married = "";
                            userData[userid].married = "";
                            embedMsg.setTitle('Congratulations!');
                            embedMsg.setColor('00FF00');
                            embedMsg.setThumbnail("https://c.tenor.com/3rT81tCWpkIAAAAC/dance-cute.gif");
                            embedMsg.setDescription(userData[userid].name + " is are now single!");
                            embedMsg.setFooter("AND READY TO MINGLE!");
                            message.channel.send({ embeds: [embedMsg] });
                        } 
                        else {
                            embedMsg.setTitle('Huh?');
                            embedMsg.setColor('FF80AB');
                            embedMsg.setThumbnail("https://c.tenor.com/PzUoQ5JIihsAAAAC/cute-cat.gif");
                            embedMsg.setDescription("Maybe " + userData[userid].name + " just wasn't feeling loved at the moment...");
                            embedMsg.setFooter("Make up your mind please.");
                            message.channel.send({ embeds: [embedMsg] });
                        }
                    })
                    .catch(collected => {
                        embedMsg.setTitle('Huh?');
                        embedMsg.setColor('FF0000');
                        embedMsg.setThumbnail("https://c.tenor.com/MQiDUNqWZZwAAAAC/peachcat-sleepy.gif");
                        embedMsg.setDescription("The bot got bored of " + userData[userid].name + "'s life issues!");
                        embedMsg.setFooter("Either you took too long or something went wrong...");
                        message.channel.send({ embeds: [embedMsg] });
                    });
                }
            );
        }
    }
}
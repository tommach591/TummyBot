module.exports = {
    name: 'level',
    description: "Spend points to increase income.",

    execute(message, args, userid, userData, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        var curr = userData[userid].income;
        var price;
        var nextPrice;
        var tier;

        let askToLevel = () =>
        {
            if (userData[userid].points < price) {
                embedMsg.setTitle('Error!');
                embedMsg.setColor('FF0000');
                embedMsg.setDescription("Next level costs " + price + " points!");
                embedMsg.setThumbnail('https://c.tenor.com/E05L3qlURd0AAAAd/no-money-broke.gif');
                embedMsg.setFooter('Try grinding at Pig Beach!');
                message.channel.send({ embeds: [embedMsg] });
            }
            else {
                const proposalMsg = new MessageEmbed();
                proposalMsg.setTitle('Leveling Up!');
                proposalMsg.setColor('FFF000');
                proposalMsg.setThumbnail('https://i.imgur.com/OKCWdNy.png');
                proposalMsg.setDescription("Would " + userData[userid].name + " like to level up their income for " + price + " points?");

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
                                userData[userid].points -= price;
                                userData[userid].income++;
                                embedMsg.setTitle('Congratz!');
                                embedMsg.setColor('00FF00');
                                embedMsg.setDescription(userData[userid].name + " leveled up to " + tier + " tier!");
                                embedMsg.setThumbnail('https://i.imgur.com/OKCWdNy.png');
                                embedMsg.setFooter('Next level: ' + nextPrice.toLocaleString() + ' points');
                                message.channel.send({ embeds: [embedMsg] });
                            } 
                            else {
                                embedMsg.setTitle('Declined!');
                                embedMsg.setColor('FF0000');
                                proposalMsg.setThumbnail('https://i.imgur.com/OKCWdNy.png');
                                embedMsg.setDescription(userData[userid].name + " declined!");
                                embedMsg.setFooter('Next level: ' + price.toLocaleString() + ' points');
                                message.channel.send({ embeds: [embedMsg] });
                            }
                        })
                        .catch(collected => {
                            embedMsg.setTitle('Fail!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription(userData[userid].name + " took too long to respond!");
                            proposalMsg.setThumbnail('https://i.imgur.com/OKCWdNy.png');
                            embedMsg.setFooter('Next level: ' + price.toLocaleString() + ' points');
                            message.channel.send({ embeds: [embedMsg] });
                        });
                    }
                );
            }
        }
        
        switch(curr) {
            case 1:
                price = 10000;
                nextPrice = 100000;
                tier = "Silver";
                askToLevel();
                break;
            case 2:
                price = 100000;
                nextPrice = 1000000;
                tier = "Gold";
                askToLevel();
                break;
            case 3:
                price = 1000000;
                nextPrice = 10000000;
                tier = "Platinum";
                askToLevel();
                break;
            case 4:
                price = 10000000;
                nextPrice = 13333333337;
                tier = "Diamond";
                askToLevel();
                break;
            case 5:
                price = 13333333337;
                nextPrice = "Infinite";
                tier = "Onyx";
                askToLevel();
                break;
            default:
                embedMsg.setTitle('Congratz!');
                embedMsg.setColor('00FF00');
                embedMsg.setDescription(userData[userid].name + " you are already maxed level!");
                embedMsg.setThumbnail('https://media2.giphy.com/media/xT9IgC2RzpbE7vBZ6M/giphy.gif');
                embedMsg.setFooter('Next level: Infinite points');
                message.channel.send({ embeds: [embedMsg] });
                break;
        }
    }
}

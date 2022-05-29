module.exports = {
    name: 'level',
    description: "Spend points to increase income.",

    execute(message, userid, masterData) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        var curr = masterData["userData"][userid].income;
        var price;
        var nextPrice;
        var tier;

        const handsMsg = new MessageEmbed();
        var hands = "";

        let generateEquip = (itemName) => {
            if (!masterStorage["equips"][itemName]) {
                return;
            }
            var id = "";
            while (masterData["items"][id]) {
                id = "";
                for (var i = 0; i < 6; i++) {
                    id += (Math.floor(Math.random() * 10)).toString();
                }
            }
            masterData["items"][id] = {
                name: masterStorage["equips"][itemName].name,
                type: masterStorage["equips"][itemName].type,
                maxHP: 0,
                attack: 0,
                magic: 0,
                defense: 0,
                speed: 0,
                slots: (masterStorage["equips"][itemName].rarity * 10)
            }
            return id;
        }

        let askToLevel = () =>
        {
            if (masterData["userData"][userid].points < price) {
                embedMsg.setTitle('Error!');
                embedMsg.setColor('FF0000');
                embedMsg.setDescription("Next level costs " + price.toLocaleString() + " points!");
                embedMsg.setThumbnail('https://c.tenor.com/E05L3qlURd0AAAAd/no-money-broke.gif');
                embedMsg.setFooter('Try grinding at Pig Beach!');
                message.channel.send({ embeds: [embedMsg] });
            }
            else {
                const proposalMsg = new MessageEmbed();
                proposalMsg.setTitle('Leveling Up!');
                proposalMsg.setColor('FFF000');
                proposalMsg.setThumbnail('https://i.imgur.com/OKCWdNy.png');
                proposalMsg.setDescription("Would " + masterData["userData"][userid].name + " like to level up their income for " + price.toLocaleString() + " points?");

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
                                masterData["userData"][userid].points -= price;
                                masterData["userData"][userid].income++;
                                embedMsg.setTitle('Congratz!');
                                embedMsg.setColor('00FF00');
                                embedMsg.setDescription(masterData["userData"][userid].name + " leveled up to " + tier + " tier!");
                                embedMsg.setThumbnail('https://i.imgur.com/OKCWdNy.png');
                                embedMsg.setFooter('Next level: ' + nextPrice.toLocaleString() + ' points');
                                message.channel.send({ embeds: [embedMsg] });

                                if (tier == "Diamond")
                                {
                                    var itemObtained = generateEquip("Diamond Hands");
                                    masterData["userHunt"][userid].equips.push(itemObtained);
                                    hands = masterData["userData"][userid].name + " has leveled to Diamond and was rewarded with :sparkles: Diamond Hands :sparkles:!";
                                }

                                if (tier == "Red Diamond")
                                {
                                    var itemObtained = generateEquip("Red Diamond Hands");
                                    masterData["userHunt"][userid].equips.push(itemObtained);
                                    hands = masterData["userData"][userid].name + " has leveled to Diamond and was rewarded with :sparkles: Red Diamond Hands :sparkles:!";
                                }

                                if (hands != "")
                                {
                                    handsMsg.setColor('FFF000');
                                    handsMsg.setTitle('Congrats!');
                                    handsMsg.setDescription(hands);
                                    handsMsg.setImage('https://i.gifer.com/origin/c9/c99a2ba9b7b577dfe17e7f74c4314fc2_w200.gif');
                                    handsMsg.setFooter('Check !tp h inv!');
                                    message.channel.send({ embeds: [handsMsg] });
                                }
                            } 
                            else {
                                embedMsg.setTitle('Declined!');
                                embedMsg.setColor('FF0000');
                                proposalMsg.setThumbnail('https://i.imgur.com/OKCWdNy.png');
                                embedMsg.setDescription(masterData["userData"][userid].name + " declined!");
                                embedMsg.setFooter('Next level: ' + price.toLocaleString() + ' points');
                                message.channel.send({ embeds: [embedMsg] });
                            }
                        })
                        .catch(collected => {
                            embedMsg.setTitle('Fail!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription(masterData["userData"][userid].name + " took too long to respond!");
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
                tier = "Red Diamond";
                askToLevel();
                break;
            default:
                embedMsg.setTitle('Congratz!');
                embedMsg.setColor('00FF00');
                embedMsg.setDescription(masterData["userData"][userid].name + " you are already maxed level!");
                embedMsg.setThumbnail('https://media2.giphy.com/media/xT9IgC2RzpbE7vBZ6M/giphy.gif');
                embedMsg.setFooter('Next level: Infinite points');
                message.channel.send({ embeds: [embedMsg] });
                break;
        }
    }
}

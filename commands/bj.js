module.exports = {
    name: 'bj',
    description: "Blackjack to lose all your money.",

    execute(message, args, userid, userData, blackjack, client, fs) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        const deck = [
            1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0,
            1.1, 2.1, 3.1, 4.1, 5.1, 6.1, 7.1, 8.1, 9.1, 10.1, 11.1, 12.1, 13.1,
            1.2, 2.2, 3.2, 4.2, 5.2, 6.2, 7.2, 8.2, 9.2, 10.2, 11.2, 12.2, 13.2,
            1.3, 2.3, 3.3, 4.3, 5.3, 6.3, 7.3, 8.3, 9.3, 10.3, 11.3, 12.3, 13.3 
        ]

        var target = client.users.cache.get(userid);
        embedMsg.setAuthor({ name: userData[userid].name, iconURL: target.displayAvatarURL() });

        let getSymbol = function(card) {
            var symbolID = Math.round((card - Math.floor(card)) * 10);
            switch (symbolID) {
                case 0:
                    return ":spades:"
                case 1:
                    return ":hearts:"
                case 2:
                    return ":clubs:"
                case 3:
                    return ":diamonds:"
            }
        }

        let shuffle = function(array) {
            let currentIndex = array.length,  randomIndex;
            // While there remain elements to shuffle...
            while (currentIndex != 0) {
              // Pick a remaining element...
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex--;
              // And swap it with the current element.
              [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
            }
          
            return array;
        }

        let countHand = function(hand) {
            var sum = 0;
            var hasAce = false;
            for (let i = 0; i < hand.length; i++) {
                var value = Math.floor(hand[i]);
                if (value > 10) {
                    value = 10;
                }
                if (value == 1) {
                    hasAce = true;
                }
                sum += value;
            }
            if (hasAce && (sum + 10) <= 21) {
                sum += 10;
            }
            return sum;
        }

        var hand = [deck[1], deck[13]];
        console.log(countHand(hand));

        var command = args[0];
        switch(command) {
            case 'help':
                const bjCommands = new Map();
                bjCommands.set('help', 'Displays list of gardening commands.');
                bjCommands.set('hand', 'Displays gardening info.');
                bjCommands.set('hit', 'Plant a random seed.');
                bjCommands.set('stand', 'Harvest fully grown plants.');
                bjCommands.set('double', 'Upgrade field, allowing you to plant more.');

                embedMsg.setTitle('List of Gardening Commands');
                embedMsg.setColor('FFF000');

                bjCommands.forEach((values, keys)=> {
                    embedMsg.addField("!tp bj " + keys, values);
                });

                message.channel.send({ embeds: [embedMsg] });
                break;
            case 'bet':
                if (blackjack[userid]) {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription(userData[userid].name + " is already playing blackjack!");
                    embedMsg.setFooter('Use !tp bj (hit, stand, double) and lose before starting another one!');
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    var bet = args[1];
                    if (!isNaN(Number(bet)) && Math.floor(Number(bet)) > 0) {
                        bet = Math.floor(bet);
                        if (userData.bet < bet) {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription(userData[userid].name + " is broke!");
                            embedMsg.setThumbnail('https://c.tenor.com/E05L3qlURd0AAAAd/no-money-broke.gif');
                            embedMsg.setFooter('Come back when you have money punk!');
                            message.channel.send({ embeds: [embedMsg] });
                        }
                        else {
                            blackjack[userid] = {
                                name: message.author.username,
                                id: userid,
                                bet: bet,
                                deck: shuffle(deck),
                                hand: [[], []],
                                dealer: []
                            }
                        }
                    }
                }
                break;
            case 'hand':
                break;
            case 'hit':
                break;
            case 'stand':
                break;
            case 'double':
                break;
            default:
                embedMsg.setTitle('Error!');
                embedMsg.setColor('FF0000');
                embedMsg.setDescription("Invalid bj command!");
                embedMsg.setFooter('Use !tp bj help for list of blackjack commands!');
                message.channel.send({ embeds: [embedMsg] });
                break;
        }
    }
}
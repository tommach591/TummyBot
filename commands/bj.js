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

        let getCard = function(card) {
            var number = Math.round(Math.floor(card) % 13);
            switch(number) {
                case 1:
                    return "Ace (1) ";
                case 2:
                    return "Two (2) ";
                case 3:
                    return "Three (3) ";
                case 4:
                    return "Four (4) ";
                case 5:
                    return "Five (5) ";
                case 6:
                    return "Six (6) ";
                case 7:
                    return "Seven (7) ";
                case 8:
                    return "Eight (8) ";
                case 9:
                    return "Nine (9) ";
                case 10:
                    return "Ten (10) ";
                case 11:
                    return "Jack (10) ";
                case 12:
                    return "Queen (10) ";
                case 13:
                    return "King (10) ";
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

        let buildDeck = function() {
            var newDeck = [];
            for (let i = 0; i < 8; i++) {
                newDeck.concat(shuffle(deck));
            }
            return shuffle(newDeck);
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

        let displayGame = function() {
            const handone = blackjack[userid].hand[0];
            const handtwo = blackjack[userid].hand[1];
            const dealer = blackjack[userid].dealer;

            var handOnefield = "";
            var handOneValue = countHand(handone);
            for (let i = 0; i < handone.length; i++) {
                var card = getCard(handone[i]);
                var symbol = getSymbol(handone[i]);
                handOnefield += "⠀⠀" + card + symbol + "\n";
            }

            var handTwofield = "";
            var handTwoValue = 0;
            if (handtwo.length != 0) {
                handTwoValue = countHand(handtwo);
                for (let i = 0; i < handtwo.length; i++) {
                    var card = getCard(handtwo[i]);
                    var symbol = getSymbol(handtwo[i]);
                    handTwofield += "⠀⠀" + card + symbol + "\n";
                }
            }

            var dealerField = "";
            var dealerValue = 0;
            if (!blackjack[userid].done) {
                var card = getCard(dealer[0]);
                var symbol = getSymbol(dealer[0]);
                dealerField += "⠀⠀" + card + symbol + "\n";

                var value = Math.floor(blackjack[userid].hand[0]);
                if (value > 10) {
                    value = 10;
                }
                if (value == 1) {
                    value = 11;
                }
                dealerValue = value;
            }
            else {
                dealerValue = countHand(dealer);
                for (let i = 0; i < dealer.length; i++) {
                    var card = getCard(dealer[i]);
                    var symbol = getSymbol(dealer[i]);
                    dealerField += "⠀⠀" + card + symbol + "\n";
                }
            }
            
            embedMsg.setTitle('Blackjack - Bet ' + blackjack[userid].bet + ' points');
            if (handtwo.length != 0) {
                embedMsg.setField("**__Hand One - " + handOneValue + " __**", handOnefield, true);
                embedMsg.setField("**__Hand Two - " + handTwoValue + " __**", handTwofield, true);
            }
            else {
                embedMsg.setField("**__Hand One - " + handOneValue + " __**", handOnefield);
            }
            embedMsg.setField("**__Dealer - " + dealerValue + " __**", dealerField);

            message.channel.send({ embeds: [embedMsg] });
        }

        var command = args[0];
        switch(command) {
            case 'help':
                const bjCommands = new Map();
                bjCommands.set('help', 'Displays list of blackjack commands.');
                bjCommands.set('bet', 'Start a blackjack game with your current bet. Win 2x bet or lost all.');
                bjCommands.set('hand', 'Displays current hand.');
                bjCommands.set('hit', 'Hit.');
                bjCommands.set('stand', 'Stand.');
                bjCommands.set('double', 'Double.');
                bjCommands.set('split', 'Split.');

                embedMsg.setTitle('List of BlackJack Commands');
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
                                deck: buildDeck(),
                                hand: [[], []],
                                dealer: [],
                                done: false,
                                onHand: 0
                            }
                            blackjack[userid].hand[0].push(blackjack[userid].deck.pop());
                            blackjack[userid].dealer.push(blackjack[userid].deck.pop());
                            blackjack[userid].hand[0].push(blackjack[userid].deck.pop());
                            blackjack[userid].dealer.push(blackjack[userid].deck.pop());

                            displayGame();
                        }
                    }
                }
                break;
            case 'hand':
                break;
            case 'hit':
                break;
            case 'stand':
                delete blackjack[userid];
                break;
            case 'double':
                break;
            case 'split':
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
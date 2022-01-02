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
                    return "Ace (A) ";
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
                case 0:
                    return "King (10) ";
            }
        }

        let shuffle = function(array) {
            let currentIndex = array.length, randomIndex;
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
                var shuffled = shuffle(deck);
                newDeck = newDeck.concat(shuffled);
            }
            newDeck = shuffle(newDeck);
            return newDeck;
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
                handOnefield += "⠀" + card + symbol + "\n";
            }

            var handTwofield = "";
            var handTwoValue = 0;
            if (handtwo.length != 0) {
                handTwoValue = countHand(handtwo);
                for (let i = 0; i < handtwo.length; i++) {
                    var card = getCard(handtwo[i]);
                    var symbol = getSymbol(handtwo[i]);
                    handTwofield += "⠀" + card + symbol + "\n";
                }
            }

            var dealerField = "";
            var dealerValue = 0;
            var reward = 0;
            var outcome = "";
            if (!blackjack[userid].done) {
                var card = getCard(dealer[0]);
                var symbol = getSymbol(dealer[0]);
                dealerField += "⠀" + card + symbol + "\n";
                dealerField += "⠀" + "???\n";

                var value = Math.floor(blackjack[userid].dealer[0]);
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
                while (dealerValue < 16) {
                    blackjack[userid].dealer.push(blackjack[userid].deck.pop());
                    dealerValue = countHand(dealer);
                }
                for (let i = 0; i < dealer.length; i++) {
                    var card = getCard(dealer[i]);
                    var symbol = getSymbol(dealer[i]);
                    dealerField += "⠀" + card + symbol + "\n";
                }


                if (firstTurn && handOneValue == 21) {
                    reward += Math.floor(blackjack[userid].bet * 1.5);
                }
                else if (handOneValue <= 21 && (dealerValue < handOneValue || dealerValue > 21)) {
                    reward += blackjack[userid].bet * 2;
                }
                else if (handOneValue <= 21 && dealerValue == handOneValue) {
                    reward += blackjack[userid].bet;
                }

                if (handtwo.length != 0) {
                    if (handTwoValue <= 21 && dealerValue < handTwoValue) {
                        reward += blackjack[userid].bet2 * 2;
                    }
                    else if (handTwoValue <= 21 && dealerValue == handTwoValue) {
                        reward += blackjack[userid].bet2;
                    }
                }

                

                if (reward > (blackjack[userid].bet + blackjack[userid].bet2)) {
                    embedMsg.setColor('00FF00');
                    outcome = "You WON " + reward + " points!";
                    embedMsg.setFooter("Net gain: " + (reward - (blackjack[userid].bet + blackjack[userid].bet2)) + " points");
                }
                else if (reward == (blackjack[userid].bet + blackjack[userid].bet2)) {
                    embedMsg.setColor('FF0000');
                    outcome = "You TIED for " + (blackjack[userid].bet + blackjack[userid].bet2) + " points!";
                    embedMsg.setFooter("Net gain: 0 points");
                }
                else {
                    embedMsg.setColor('FF0000');
                    outcome = "You LOST " + (blackjack[userid].bet + blackjack[userid].bet2) + " points!";
                    embedMsg.setFooter("Net gain: " + (reward - (blackjack[userid].bet + blackjack[userid].bet2)) + " points");
                }

                userData[userid].points += reward;
            }
            
            embedMsg.setTitle('Blackjack - Bet ' + blackjack[userid].bet + ' points');
            if (handtwo.length != 0) {
                if (blackjack[userid].onHand == 0 && !blackjack[userid].done) {
                    embedMsg.addField("**__:point_right: Hand One - " + handOneValue + " __**", handOnefield, true);
                }
                else {
                    embedMsg.addField("**__Hand One - " + handOneValue + " __**", handOnefield, true);
                }
                if (blackjack[userid].onHand == 1 && !blackjack[userid].done) {
                    embedMsg.addField("**__:point_right: Hand Two - " + handTwoValue + " __**", handTwofield, true);
                }
                else {
                    embedMsg.addField("**__Hand Two - " + handTwoValue + " __**", handTwofield, true);
                }
            }
            else {
                embedMsg.addField("**__Hand One - " + handOneValue + " __**", handOnefield);
            }
            embedMsg.addField("**__Dealer - " + dealerValue + " __**", dealerField);

            if (blackjack[userid].done) {
                embedMsg.addField("**__Outcome__**", outcome);
            }

            message.channel.send({ embeds: [embedMsg] });

            if (blackjack[userid].done) {
                delete blackjack[userid];
            }
        }

        var command = args[0];
        switch(command) {
            case 'help':
                const bjCommands = new Map();
                bjCommands.set('help', 'Displays list of blackjack commands.');
                bjCommands.set('#', 'Start a blackjack game with the # you entered. Win 2x bet or lost all.');
                bjCommands.set('hand', 'Displays current hand.');
                bjCommands.set('hit', 'Hit.');
                bjCommands.set('stand', 'Stand.');
                bjCommands.set('double', 'Double the bet and hit once.');
                bjCommands.set('split', 'Split if you have two matching values for starting hand.');

                embedMsg.setTitle('List of BlackJack Commands');
                embedMsg.setColor('FFF000');

                bjCommands.forEach((values, keys)=> {
                    embedMsg.addField("!tp bj " + keys, values);
                });

                message.channel.send({ embeds: [embedMsg] });
                break;
            case 'hand':
                if (!blackjack[userid]) {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription(userData[userid].name + " is not playing blackjack!");
                    embedMsg.setFooter('Use !tp bj bet # to start!');
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    displayGame();
                }
                break;
            case 'hit':
                if (!blackjack[userid]) {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription(userData[userid].name + " is not playing blackjack!");
                    embedMsg.setFooter('Use !tp bj bet # to start!');
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    var currentHand = blackjack[userid].onHand;
                    blackjack[userid].hand[currentHand].push(blackjack[userid].deck.pop());
                    if (countHand(blackjack[userid].hand[currentHand]) > 21 || countHand(blackjack[userid].hand[currentHand]) == 21) {
                        if (currentHand != 1 && blackjack[userid].hand[1].length != 0) {
                            blackjack[userid].onHand = 1;
                        }
                        else {
                            blackjack[userid].done = true;
                        }
                    }
                    displayGame();
                }
                break;
            case 'stand':
                if (!blackjack[userid]) {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription(userData[userid].name + " is not playing blackjack!");
                    embedMsg.setFooter('Use !tp bj bet # to start!');
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    var currentHand = blackjack[userid].onHand;
                    if (currentHand != 1 && blackjack[userid].hand[1].length != 0) {
                        blackjack[userid].onHand = 1;
                    }
                    else {
                        blackjack[userid].done = true;
                    }
                    displayGame();
                }
                break;
            case 'double':
                if (!blackjack[userid]) {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription(userData[userid].name + " is not playing blackjack!");
                    embedMsg.setFooter('Use !tp bj bet # to start!');
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    var bet = blackjack[userid].bet;

                    if (userData[userid].points < bet) {
                        embedMsg.setTitle('Error!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription(userData[userid].name + " is broke!");
                        embedMsg.setThumbnail('https://c.tenor.com/E05L3qlURd0AAAAd/no-money-broke.gif');
                        embedMsg.setFooter('Come back when you have money punk!');
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else if (blackjack[userid].hand[blackjack[userid].onHand].length == 2) {
                        userData[userid].points -= bet;

                        if (blackjack[userid].onHand == 1) {
                            blackjack[userid].bet2 += bet;
                        }
                        else {
                            blackjack[userid].bet += bet;
                        }

                        var currentHand = blackjack[userid].onHand;
                        blackjack[userid].hand[currentHand].push(blackjack[userid].deck.pop());
                        if (currentHand != 1 && blackjack[userid].hand[1].length != 0) {
                            blackjack[userid].onHand = 1;
                        }
                        else {
                            blackjack[userid].done = true;
                        }
                        displayGame();
                    }
                    else {
                        embedMsg.setTitle('Error!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription("It is too late to double!");
                        embedMsg.setFooter('You can only double with your starting hand!');
                        message.channel.send({ embeds: [embedMsg] });
                    }
                }
                break;
            case 'split':
                if (!blackjack[userid]) {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription(userData[userid].name + " is not playing blackjack!");
                    embedMsg.setFooter('Use !tp bj bet # to start!');
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    var cardOne = Math.floor(blackjack[userid].hand[0][0]);
                    var cardTwo = Math.floor(blackjack[userid].hand[0][1]);
                    if (cardOne > 10) {
                        cardOne = 10;
                    }
                    if (cardTwo > 10) {
                        cardTwo = 10;
                    }
                    if (blackjack[userid].onHand == 0 && blackjack[userid].hand[0].length == 2 && cardOne == cardTwo) {
                        var bet = blackjack[userid].bet;
                        if (userData[userid].points < bet) {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription(userData[userid].name + " is broke!");
                            embedMsg.setThumbnail('https://c.tenor.com/E05L3qlURd0AAAAd/no-money-broke.gif');
                            embedMsg.setFooter('Come back when you have money punk!');
                            message.channel.send({ embeds: [embedMsg] });
                        }
                        else {
                            userData[userid].bet2 = bet;
                            userData[userid].points -= bet;
                            
                            blackjack[userid].hand[1].push(blackjack[userid].hand[0].pop());
                            blackjack[userid].hand[0].push(blackjack[userid].deck.pop());
                            blackjack[userid].hand[1].push(blackjack[userid].deck.pop());
                            displayGame();
                        }
                    }
                    else {
                        embedMsg.setTitle('Error!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription("You cannot split unless you have two matching values!");
                        embedMsg.setFooter('Use !tp bj help for list of blackjack commands!');
                        message.channel.send({ embeds: [embedMsg] });
                    }
                }
                break;
            default:
                if (blackjack[userid]) {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription(userData[userid].name + " is already playing blackjack!");
                    embedMsg.setFooter('Use !tp bj (hit, stand, double) and lose before starting another one!');
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    var bet = args[0];
                    if (!isNaN(Number(bet)) && Math.floor(Number(bet)) > 0) {
                        bet = Math.floor(bet);

                        if (userData[userid].points < bet) {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription(userData[userid].name + " is broke!");
                            embedMsg.setThumbnail('https://c.tenor.com/E05L3qlURd0AAAAd/no-money-broke.gif');
                            embedMsg.setFooter('Come back when you have money punk!');
                            message.channel.send({ embeds: [embedMsg] });
                        }
                        else {
                            userData[userid].points -= bet;
                            var newDeck = buildDeck();
                            blackjack[userid] = {
                                name: message.author.username,
                                id: userid,
                                bet: bet,
                                bet2: 0,
                                deck: newDeck,
                                hand: [[], []],
                                dealer: [],
                                done: false,
                                onHand: 0,
                                firstTurn: false
                            }
                            blackjack[userid].hand[0].push(blackjack[userid].deck.pop());
                            blackjack[userid].dealer.push(blackjack[userid].deck.pop());
                            blackjack[userid].hand[0].push(blackjack[userid].deck.pop());
                            blackjack[userid].dealer.push(blackjack[userid].deck.pop());

                            if (countHand(blackjack[userid].hand[0]) == 21) {
                                blackjack[userid].firstTurn = true;
                                blackjack[userid].done = true;
                            }

                            displayGame();
                        }
                    }
                    else {
                        embedMsg.setTitle('Error!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription("Please enter a command or valid value!");
                        embedMsg.setFooter('Use !tp bj help for commands!');
                        message.channel.send({ embeds: [embedMsg] });
                    }
                }
                break;
        }
    }
}
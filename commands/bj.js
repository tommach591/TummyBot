module.exports = {
    name: 'bj',
    description: "Blackjack to lose all your money.",

    execute(message, args, userid, userData, blackjack, client) {
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

            const dealer = blackjack[userid].dealer;
            var handFields = [];
            var handValues = [];

            const reducer = (previousValue, currentValue) => previousValue + currentValue;
            var totalBet = blackjack[userid].bet.reduce(reducer)
            
            embedMsg.setTitle('Blackjack - Bet ' + totalBet + ' points');

            for (let i = 0; i < blackjack[userid].hand.length; i++) {
                var hand = blackjack[userid].hand[i];
                var handField = "";
                var handValue = countHand(hand);
                for (let i = 0; i < hand.length; i++) {
                    var card = getCard(hand[i]);
                    var symbol = getSymbol(hand[i]);
                    handField += "⠀" + card + symbol + "\n";
                }
                handFields.push(handField);
                handValues.push(handValue);
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
                embedMsg.setFooter("!tp bj hit/stand/double/split ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ Cards in Deck: " + blackjack[userid].deck.length);
            }
            else {
                dealerValue = countHand(dealer);
                while (dealerValue <= 16) {
                    blackjack[userid].dealer.push(blackjack[userid].deck.pop());
                    dealerValue = countHand(dealer);
                }
                for (let i = 0; i < dealer.length; i++) {
                    var card = getCard(dealer[i]);
                    var symbol = getSymbol(dealer[i]);
                    dealerField += "⠀" + card + symbol + "\n";
                }


                if (blackjack[userid].firstTurn && handValues[0] == 21) {
                    reward += Math.floor(blackjack[userid].bet[0] * 2.5);
                }
                else {
                    for (var i = 0; i < handValues.length; i++) {
                        if (handValues[i] <= 21 && (dealerValue < handValues[i] || dealerValue > 21)) {
                            reward += blackjack[userid].bet[i] * 2;
                        }
                        else if (handValues[i] <= 21 && dealerValue == handValues[i]) {
                            reward += blackjack[userid].bet[i];
                        }
                    }
                }

                userData[userid].points += reward;

                if (reward > totalBet) {
                    embedMsg.setColor('00FF00');
                    outcome = "You WON " + reward + " points!";
                    embedMsg.setFooter("Net gain: " + (reward - totalBet) + " points ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ Cards in Deck: " + blackjack[userid].deck.length);
                }
                else if (reward == totalBet) {
                    embedMsg.setColor('FFB000');
                    outcome = "You PUSH for " + totalBet + " points!";
                    embedMsg.setFooter("Net gain: 0 points ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ Cards in Deck: " + blackjack[userid].deck.length);
                }
                else {
                    embedMsg.setColor('FF0000');
                    outcome = "You LOST " + totalBet + " points!";
                    embedMsg.setFooter("Net gain: " + (reward - totalBet) + " points ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ Cards in Deck: " + blackjack[userid].deck.length);
                    if (userData[userid].points == 0 && totalBet >= 10000 && dealerValue == 21) {
                        embedMsg.setImage('https://c.tenor.com/K9-SqJMNjkEAAAAC/emotional-damage.gif');
                    }
                }

            }

            for (var i = 0; i < blackjack[userid].hand.length; i++) {
                if (i == blackjack[userid].index && !blackjack[userid].done && blackjack[userid].hand.length != 1) {
                    embedMsg.addField("__(" + (i + 1) + ") __**__Hand - " + handValues[i] + " :point_left:__**", handFields[i], true);
                }
                else {
                    embedMsg.addField("__(" + (i + 1) + ") __**__Hand - " + handValues[i] + " __**", handFields[i], true);
                }
            }

            embedMsg.addField("**__Dealer - " + dealerValue + " __**", dealerField);

            if (blackjack[userid].done) {
                embedMsg.addField("**__Outcome__**", outcome);
            }

            embedMsg.setThumbnail("https://i.imgur.com/Fmn1zNY.png");
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
                    var index = blackjack[userid].index;
                    blackjack[userid].hand[index].push(blackjack[userid].deck.pop());
                    if (countHand(blackjack[userid].hand[index]) > 21 || countHand(blackjack[userid].hand[index]) == 21) {
                        if (index < blackjack[userid].hand.length - 1) {
                            blackjack[userid].index++;
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
                    var index = blackjack[userid].index;
                    if (index < blackjack[userid].hand.length - 1) {
                        blackjack[userid].index++;
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
                    var index = blackjack[userid].index;
                    var bet = blackjack[userid].bet[index];

                    if (userData[userid].points < bet) {
                        embedMsg.setTitle('Error!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription(userData[userid].name + " is broke!");
                        embedMsg.setThumbnail('https://c.tenor.com/E05L3qlURd0AAAAd/no-money-broke.gif');
                        embedMsg.setFooter('Come back when you have money punk!');
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else if (blackjack[userid].hand[index].length == 2) {

                        userData[userid].points -= bet;
                        blackjack[userid].bet[index] += bet;

                        blackjack[userid].hand[index].push(blackjack[userid].deck.pop());
                        if (index < blackjack[userid].hand.length - 1) {
                            blackjack[userid].index++;
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
                    var index = blackjack[userid].index
                    var cardOne = Math.floor(blackjack[userid].hand[index][0]);
                    var cardTwo = Math.floor(blackjack[userid].hand[index][1]);
                    if (cardOne > 10) {
                        cardOne = 10;
                    }
                    if (cardTwo > 10) {
                        cardTwo = 10;
                    }
                    if (blackjack[userid].hand[index].length == 2 && cardOne == cardTwo && blackjack[userid].hand.length < 4) {
                        var bet = blackjack[userid].bet[index];
                        if (userData[userid].points < bet) {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription(userData[userid].name + " is broke!");
                            embedMsg.setThumbnail('https://c.tenor.com/E05L3qlURd0AAAAd/no-money-broke.gif');
                            embedMsg.setFooter('Come back when you have money punk!');
                            message.channel.send({ embeds: [embedMsg] });
                        }
                        else {
                            blackjack[userid].bet.push(bet);
                            userData[userid].points -= bet;
                            
                            var newHand = []
                            newHand.push(blackjack[userid].hand[index].pop());

                            blackjack[userid].hand[index].push(blackjack[userid].deck.pop());
                            newHand.push(blackjack[userid].deck.pop());

                            blackjack[userid].hand.push(newHand);

                            displayGame();
                        }
                    }
                    else {
                        embedMsg.setTitle('Error!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription("You cannot split!");
                        embedMsg.setFooter('Reason: Hand size is not 2 / Not matching pair value / Maxed split reached!');
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
                    if ((!isNaN(Number(bet)) && Math.floor(Number(bet)) > 0) || bet == "all") {
                        if (bet == "all") {
                            bet = userData[userid].points;
                        }
                        else
                        {
                            bet = Math.floor(bet);
                        }

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
                                deck: newDeck,
                                bet: [bet],
                                hand: [[]],
                                index: 0,
                                dealer: [],
                                done: false,
                                firstTurn: false
                            }
                            blackjack[userid].hand[blackjack[userid].index].push(blackjack[userid].deck.pop());
                            blackjack[userid].dealer.push(blackjack[userid].deck.pop());
                            blackjack[userid].hand[blackjack[userid].index].push(blackjack[userid].deck.pop());
                            blackjack[userid].dealer.push(blackjack[userid].deck.pop());

                            if (countHand(blackjack[userid].hand[blackjack[userid].index]) == 21) {
                                blackjack[userid].firstTurn = true;
                                blackjack[userid].done = true;
                            }

                            displayGame();
                        }
                    }
                    else {
                        embedMsg.setTitle('Invalid blackjack command or amount!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription("Use __!tp bj help__ for commands!");
                        embedMsg.setThumbnail("https://4.bp.blogspot.com/-DV8zj3oNPO8/XZKl8Y1_KkI/AAAAAAAMsvI/HEq47t0TPmYhX0b2igMkkxbcPQPbUXR2gCLcBGAsYHQ/s1600/AS0005827_02.gif");
                        message.channel.send({ embeds: [embedMsg] });
                    }
                }
                break;
        }
    }
}
module.exports = {
    name: 'scratch',
    description: "Spend points on scratch cards. There are ten different scratch cards!",
    
    execute(message, args, userid, masterData) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();
        const scratchingMsg = new MessageEmbed();
        if (args.length > 0) {
            var choice = Number(args[0]);
            var user = masterData["userData"][userid];
            var scratchTime = 1000 * Math.floor((Math.random() * 3) + 2);
            if (!isNaN(choice)) {
                switch(choice) {
                    case 1:
                        if (user.points >= 10) {
                            embedMsg.setTitle('Scratcher #1: Costs 10 points');
                            embedMsg.setColor('00FF00');
                            user.points -= 10;

                            scratchingMsg.setTitle('Scratcher #1: Costs 10 points');
                            scratchingMsg.setDescription('Scratching...');
                            scratchingMsg.setThumbnail('https://c.tenor.com/cSxnxUFCeo4AAAAC/gawr-gura.gif');
                            message.channel.send({ embeds: [scratchingMsg] }).then(msg=> {setTimeout(() => msg.delete(), scratchTime - 500)});

                            setTimeout(function() { 
                                var luck = Math.floor(Math.random() * 100);
                                if (luck == 99) {
                                    user.points += 200;
                                    embedMsg.setDescription("POG! " + user.name + " won 200 points!");
                                    embedMsg.setFooter("Net gain: 190 points");
                                    embedMsg.setThumbnail('https://c.tenor.com/TcMXxO_U0dgAAAAC/mochi-mochi-cat-peach.gif');
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                else if (luck > 94) {
                                    user.points += 50;
                                    embedMsg.setDescription(user.name + " won 50 points!");
                                    embedMsg.setFooter("Net gain: 40 points");
                                    embedMsg.setThumbnail('https://c.tenor.com/TcMXxO_U0dgAAAAC/mochi-mochi-cat-peach.gif');
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                else if (luck > 79) {
                                    user.points += 20;
                                    embedMsg.setDescription(user.name + " won 20 points!");
                                    embedMsg.setFooter("Net gain: 10 points");
                                    embedMsg.setThumbnail('https://c.tenor.com/TcMXxO_U0dgAAAAC/mochi-mochi-cat-peach.gif');
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                else if (luck > 49) {
                                    user.points += 10;
                                    embedMsg.setDescription(user.name + " won 10 points!");
                                    embedMsg.setFooter("Net gain: 0 points");
                                    embedMsg.setThumbnail('https://c.tenor.com/TcMXxO_U0dgAAAAC/mochi-mochi-cat-peach.gif');
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                else {
                                    embedMsg.setDescription(user.name + " won depression!");
                                    embedMsg.setFooter("Net gain: -10 points");
                                    embedMsg.setThumbnail('https://c.tenor.com/QQpkCbV07UIAAAAC/mochj-cat.gif');
                                    embedMsg.setColor('FF0000');
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                            }, scratchTime);
                        }
                        else {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription("Not enough points!");
                            message.channel.send({ embeds: [embedMsg] });
                        }
                        break;
                    case 2:
                        if (user.points >= 50) {
                            embedMsg.setTitle('Scratcher #2: Costs 50 points');
                            embedMsg.setColor('00FF00');
                            user.points -= 50;

                            scratchingMsg.setTitle('Scratcher #2: Costs 50 points');
                            scratchingMsg.setDescription('Scratching...');
                            scratchingMsg.setThumbnail('https://c.tenor.com/cSxnxUFCeo4AAAAC/gawr-gura.gif');
                            message.channel.send({ embeds: [scratchingMsg] }).then(msg=> {setTimeout(() => msg.delete(), scratchTime - 500)});

                            setTimeout(function() {
                                var luck = Math.floor(Math.random() * 101);
                                if (luck == 100) {
                                    user.points += 500;
                                    embedMsg.setDescription("I WAS HERE POG I WAS HERE POG! "+ user.name + " WON 500 POINTS!");
                                    embedMsg.setFooter("Net gain: 450 points");
                                    embedMsg.setThumbnail('https://c.tenor.com/W86RWiljUyEAAAAC/gawr-gura-gura.gif');
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                else if (luck > 70) {
                                    user.points += 100;
                                    embedMsg.setDescription("POG! "+ user.name + " won 100 points!");
                                    embedMsg.setFooter("Net gain: 50 points");
                                    embedMsg.setThumbnail('https://c.tenor.com/TcMXxO_U0dgAAAAC/mochi-mochi-cat-peach.gif');
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                else if (luck > 50) {
                                    user.points += 50;
                                    embedMsg.setDescription(user.name + " won 50 points!");
                                    embedMsg.setFooter("Net gain: 0 points");
                                    embedMsg.setThumbnail('https://c.tenor.com/TcMXxO_U0dgAAAAC/mochi-mochi-cat-peach.gif');
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                else if (luck > 25) {
                                    user.points += 25;
                                    embedMsg.setDescription(user.name + " won 25 points!");
                                    embedMsg.setFooter("Net gain: -25 points");
                                    embedMsg.setThumbnail('https://c.tenor.com/QQpkCbV07UIAAAAC/mochj-cat.gif');
                                    embedMsg.setColor('FF0000');
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                else if (luck > 15) {
                                    user.points += 10;
                                    embedMsg.setDescription(user.name + " won 10 points!");
                                    embedMsg.setFooter("Net gain: -40 points");
                                    embedMsg.setThumbnail('https://c.tenor.com/QQpkCbV07UIAAAAC/mochj-cat.gif');
                                    embedMsg.setColor('FF0000');
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                else if (luck > 10) {
                                    user.points += 5;
                                    embedMsg.setDescription(user.name + " won 5 points!");
                                    embedMsg.setFooter("Net gain: -45 points");
                                    embedMsg.setThumbnail('https://c.tenor.com/QQpkCbV07UIAAAAC/mochj-cat.gif');
                                    embedMsg.setColor('FF0000');
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                else if (luck > 5) {
                                    user.points += 1;
                                    embedMsg.setDescription(user.name + " won 1 point!");
                                    embedMsg.setFooter("Net gain: -49 points");
                                    embedMsg.setThumbnail('https://c.tenor.com/QQpkCbV07UIAAAAC/mochj-cat.gif');
                                    embedMsg.setColor('FF0000');
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                else {
                                    embedMsg.setDescription(user.name + " won depression!");
                                    embedMsg.setFooter("Net gain: -50 points");
                                    embedMsg.setThumbnail('https://c.tenor.com/QQpkCbV07UIAAAAC/mochj-cat.gif');
                                    embedMsg.setColor('FF0000');
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                            }, scratchTime);
                        }
                        else {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription("Not enough points!");
                            message.channel.send({ embeds: [embedMsg] });
                        }
                        break;
                    case 3:
                        if (user.points >= 100) {
                            embedMsg.setTitle('Scratcher #3: Costs 100 points');
                            embedMsg.setColor('00FF00');
                            user.points -= 100;

                            scratchingMsg.setTitle('Scratcher #3: Costs 100 points');
                            scratchingMsg.setDescription('Scratching...');
                            scratchingMsg.setThumbnail('https://c.tenor.com/cSxnxUFCeo4AAAAC/gawr-gura.gif');
                            message.channel.send({ embeds: [scratchingMsg] }).then(msg=> {setTimeout(() => msg.delete(), scratchTime - 500)});

                            setTimeout(function() {
                                var luck = Math.floor(Math.random() * 101);
                                if (luck > 50) {
                                    user.points += 200;
                                    embedMsg.setDescription(user.name + " won 200 points!");
                                    embedMsg.setFooter("Net gain: 100 points");
                                    embedMsg.setThumbnail('https://c.tenor.com/TcMXxO_U0dgAAAAC/mochi-mochi-cat-peach.gif');
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                else {
                                    embedMsg.setDescription(user.name + " won depression!");
                                    embedMsg.setFooter("Net gain: -100 points");
                                    embedMsg.setThumbnail('https://c.tenor.com/QQpkCbV07UIAAAAC/mochj-cat.gif');
                                    embedMsg.setColor('FF0000');
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                            }, scratchTime - 500);
                        }
                        else {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription("Not enough points!");
                            message.channel.send({ embeds: [embedMsg] });
                        }
                        break;
                    case 4:
                        if (user.points >= 500) {
                            embedMsg.setTitle('Scratcher #4: Costs 500 points');
                            embedMsg.setColor('00FF00');
                            user.points -= 500;

                            scratchingMsg.setTitle('Scratcher #4: Costs 500 points');
                            scratchingMsg.setDescription('Scratching...');
                            scratchingMsg.setThumbnail('https://c.tenor.com/cSxnxUFCeo4AAAAC/gawr-gura.gif');
                            message.channel.send({ embeds: [scratchingMsg] }).then(msg=> {setTimeout(() => msg.delete(), scratchTime - 500)});

                            setTimeout(function() {
                                var luck = Math.floor(Math.random() * 101);
                                if (luck == 100) {
                                    user.points += 5000;
                                    embedMsg.setDescription(user.name + " won 5,000 points!");
                                    embedMsg.setFooter("Net gain: 4,500 points");
                                    embedMsg.setThumbnail('https://c.tenor.com/TcMXxO_U0dgAAAAC/mochi-mochi-cat-peach.gif');
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                else if (luck > 90) {
                                    user.points += 2000;
                                    embedMsg.setDescription(user.name + " won 2,000 points!");
                                    embedMsg.setFooter("Net gain: 1,500 points");
                                    embedMsg.setThumbnail('https://c.tenor.com/TcMXxO_U0dgAAAAC/mochi-mochi-cat-peach.gif');
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                else if (luck > 70) {
                                    user.points += 1000;
                                    embedMsg.setDescription(user.name + " won 1,000 points!");
                                    embedMsg.setFooter("Net gain: 500 points");
                                    embedMsg.setThumbnail('https://c.tenor.com/TcMXxO_U0dgAAAAC/mochi-mochi-cat-peach.gif');
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                else if (luck > 40) {
                                    user.points += 250;
                                    embedMsg.setDescription(user.name + " won 250 points!");
                                    embedMsg.setFooter("Net gain: -250 points");
                                    embedMsg.setThumbnail('https://c.tenor.com/QQpkCbV07UIAAAAC/mochj-cat.gif');
                                    embedMsg.setColor('FF0000');
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                else if (luck > 20) {
                                    user.points += 100;
                                    embedMsg.setDescription(user.name + " won 100 points!");
                                    embedMsg.setFooter("Net gain: -400 points");
                                    embedMsg.setThumbnail('https://c.tenor.com/QQpkCbV07UIAAAAC/mochj-cat.gif');
                                    embedMsg.setColor('FF0000');
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                else {
                                    embedMsg.setDescription(user.name + " won depression!");
                                    embedMsg.setFooter("Net gain: -500 points");
                                    embedMsg.setThumbnail('https://c.tenor.com/QQpkCbV07UIAAAAC/mochj-cat.gif');
                                    embedMsg.setColor('FF0000');
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                            }, scratchTime - 500);
                        }
                        else {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription("Not enough points!");
                            message.channel.send({ embeds: [embedMsg] });
                        }
                        break;
                    case 5:
                        if (user.points >= 1000) {
                            embedMsg.setTitle('Scratcher #5: Costs 1,000 points');
                            embedMsg.setColor('00FF00');
                            user.points -= 1000;

                            scratchingMsg.setTitle('Scratcher #5: Costs 1,000 points');
                            scratchingMsg.setDescription('Scratching...');
                            scratchingMsg.setThumbnail('https://c.tenor.com/cSxnxUFCeo4AAAAC/gawr-gura.gif');
                            message.channel.send({ embeds: [scratchingMsg] }).then(msg=> {setTimeout(() => msg.delete(), scratchTime - 500)});

                            setTimeout(function() {
                                var luck = Math.floor(Math.random() * 101);
                                if (luck == 100) {
                                    user.points += 10000;
                                    embedMsg.setDescription(user.name + " won 10,000 points!");
                                    embedMsg.setFooter("Net gain: 9000 points");
                                    embedMsg.setThumbnail('https://c.tenor.com/TcMXxO_U0dgAAAAC/mochi-mochi-cat-peach.gif');
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                else if (luck > 66) {
                                    user.points += 2000;
                                    embedMsg.setDescription(user.name + " won 2,000 points!");
                                    embedMsg.setFooter("Net gain: 1000 points");
                                    embedMsg.setThumbnail('https://c.tenor.com/TcMXxO_U0dgAAAAC/mochi-mochi-cat-peach.gif');
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                else if (luck > 33) {
                                    user.points += 500;
                                    embedMsg.setDescription(user.name + " won 500 points!");
                                    embedMsg.setFooter("Net gain: -500 points");
                                    embedMsg.setThumbnail('https://c.tenor.com/QQpkCbV07UIAAAAC/mochj-cat.gif');
                                    embedMsg.setColor('FF0000');
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                else {
                                    embedMsg.setDescription(user.name + " won depression!");
                                    embedMsg.setFooter("Net gain: -1,000 points");
                                    embedMsg.setThumbnail('https://c.tenor.com/QQpkCbV07UIAAAAC/mochj-cat.gif');
                                    embedMsg.setColor('FF0000');
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                            }, scratchTime - 500);
                        }
                        else {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription("Not enough points!");
                            message.channel.send({ embeds: [embedMsg] });
                        }
                        break;
                    case 6:
                        if (user.points > 0)
                        {
                            var amount = Math.floor(user.points * 0.10);
                            var profit;
                            var netGain;
                            user.points -= amount;
    
                            embedMsg.setTitle('Scratcher #6: Costs ' + amount.toLocaleString() + ' points (10%)');
                            embedMsg.setColor('00FF00');
                            scratchingMsg.setTitle('Scratcher #6: Costs ' + amount.toLocaleString() + ' points (10%)');
                            scratchingMsg.setDescription('Scratching...');
                            scratchingMsg.setThumbnail('https://c.tenor.com/cSxnxUFCeo4AAAAC/gawr-gura.gif');
                            message.channel.send({ embeds: [scratchingMsg] }).then(msg=> {setTimeout(() => msg.delete(), scratchTime - 500)});
    
                            setTimeout(function() {
                                profit = Math.floor(Math.random() * 2 * amount);
                                user.points += profit;
                                netGain = profit - amount;
                                embedMsg.setDescription(user.name + " won " + profit.toLocaleString() + " points!");
                                embedMsg.setFooter("Net gain: " + netGain.toLocaleString() + " points");
                                if (netGain <= 0)
                                {
                                    embedMsg.setColor('FF0000');
                                    embedMsg.setThumbnail('https://c.tenor.com/QQpkCbV07UIAAAAC/mochj-cat.gif');
                                }
                                else
                                {
                                    embedMsg.setColor('00FF00');
                                    embedMsg.setThumbnail('https://c.tenor.com/TcMXxO_U0dgAAAAC/mochi-mochi-cat-peach.gif');
                                }
                                message.channel.send({ embeds: [embedMsg] });
                            }, scratchTime - 500);
                        }
                        else {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription("Not enough points!");
                            message.channel.send({ embeds: [embedMsg] });
                        }
                        break;
                    case 7:
                        if (user.points > 0)
                        {
                            var amount = Math.floor(user.points * 0.25);
                            var profit;
                            var netGain;
                            user.points -= amount;

                            embedMsg.setTitle('Scratcher #7: Costs ' + amount.toLocaleString() + ' points (25%)');
                            embedMsg.setColor('00FF00');
                            scratchingMsg.setTitle('Scratcher #7: Costs ' + amount.toLocaleString() + ' points (25%)');
                            scratchingMsg.setDescription('Scratching...');
                            scratchingMsg.setThumbnail('https://c.tenor.com/cSxnxUFCeo4AAAAC/gawr-gura.gif');
                            message.channel.send({ embeds: [scratchingMsg] }).then(msg=> {setTimeout(() => msg.delete(), scratchTime - 500)});

                            setTimeout(function() {
                                profit = Math.floor(Math.random() * 2 * amount);
                                user.points += profit;
                                netGain = profit - amount;
                                embedMsg.setDescription(user.name + " won " + profit.toLocaleString() + " points!");
                                embedMsg.setFooter("Net gain: " + netGain.toLocaleString() + " points");
                                if (netGain <= 0)
                                {
                                    embedMsg.setColor('FF0000');
                                    embedMsg.setThumbnail('https://c.tenor.com/QQpkCbV07UIAAAAC/mochj-cat.gif');
                                }
                                else
                                {
                                    embedMsg.setColor('00FF00');
                                    embedMsg.setThumbnail('https://c.tenor.com/TcMXxO_U0dgAAAAC/mochi-mochi-cat-peach.gif');
                                }
                                message.channel.send({ embeds: [embedMsg] });
                            }, scratchTime - 500);
                        }
                        else 
                        {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription("Not enough points!");
                            message.channel.send({ embeds: [embedMsg] });
                        }
                        break;
                    case 8:
                        if (user.points > 0)
                        {
                            var amount = Math.floor(user.points * 0.50);
                            var profit;
                            var netGain;
                            user.points -= amount;

                            embedMsg.setTitle('Scratcher #8: Costs ' + amount.toLocaleString() + ' points (50%)');
                            embedMsg.setColor('00FF00');
                            scratchingMsg.setTitle('Scratcher #8: Costs ' + amount.toLocaleString() + ' points (50%)');
                            scratchingMsg.setDescription('Scratching...');
                            scratchingMsg.setThumbnail('https://c.tenor.com/cSxnxUFCeo4AAAAC/gawr-gura.gif');
                            message.channel.send({ embeds: [scratchingMsg] }).then(msg=> {setTimeout(() => msg.delete(), scratchTime - 500)});

                            setTimeout(function() {
                                profit = Math.floor(Math.random() * 2 * amount);
                                user.points += profit;
                                netGain = profit - amount;
                                embedMsg.setDescription(user.name + " won " + profit.toLocaleString() + " points!");
                                embedMsg.setFooter("Net gain: " + netGain.toLocaleString() + " points");
                                if (netGain <= 0)
                                {
                                    embedMsg.setColor('FF0000');
                                    embedMsg.setThumbnail('https://c.tenor.com/QQpkCbV07UIAAAAC/mochj-cat.gif');
                                }
                                else
                                {
                                    embedMsg.setColor('00FF00');
                                    embedMsg.setThumbnail('https://c.tenor.com/TcMXxO_U0dgAAAAC/mochi-mochi-cat-peach.gif');
                                }
                                message.channel.send({ embeds: [embedMsg] });
                            }, scratchTime - 500);
                        }
                        else 
                        {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription("Not enough points!");
                            message.channel.send({ embeds: [embedMsg] });
                        }
                        break;
                    case 9:
                        if (user.points > 0)
                        {
                            var amount = Math.floor(user.points * 0.75);
                            var profit;
                            var netGain;
                            user.points -= amount;

                            embedMsg.setTitle('Scratcher #9: Costs ' + amount.toLocaleString() + ' points (75%)');
                            embedMsg.setColor('00FF00');
                            scratchingMsg.setTitle('Scratcher #9: Costs ' + amount.toLocaleString() + ' points (75%)');
                            scratchingMsg.setDescription('Scratching...');
                            scratchingMsg.setThumbnail('https://c.tenor.com/cSxnxUFCeo4AAAAC/gawr-gura.gif');
                            message.channel.send({ embeds: [scratchingMsg] }).then(msg=> {setTimeout(() => msg.delete(), scratchTime - 500)});

                            setTimeout(function() {
                                profit = Math.floor(Math.random() * 2 * amount);
                                user.points += profit;
                                netGain = profit - amount;
                                embedMsg.setDescription(user.name + " won " + profit.toLocaleString() + " points!");
                                embedMsg.setFooter("Net gain: " + netGain.toLocaleString() + " points");
                                if (netGain <= 0)
                                {
                                    embedMsg.setColor('FF0000');
                                    embedMsg.setThumbnail('https://c.tenor.com/QQpkCbV07UIAAAAC/mochj-cat.gif');
                                }
                                else
                                {
                                    embedMsg.setColor('00FF00');
                                    embedMsg.setThumbnail('https://c.tenor.com/TcMXxO_U0dgAAAAC/mochi-mochi-cat-peach.gif');
                                }
                                message.channel.send({ embeds: [embedMsg] });
                            }, scratchTime - 500);
                        }
                        else 
                        {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription("Not enough points!");
                            message.channel.send({ embeds: [embedMsg] });
                        }
                        break;
                    case 10:
                        if (user.points > 0)
                        {
                            var amount = Math.floor(user.points * 1.00);
                            var profit;
                            var netGain;
                            user.points -= amount;

                            embedMsg.setTitle('Scratcher #10: Costs ' + amount.toLocaleString() + ' points (100%)');
                            embedMsg.setColor('00FF00');
                            scratchingMsg.setTitle('Scratcher #10: Costs ' + amount.toLocaleString() + ' points (100%)');
                            scratchingMsg.setDescription('Scratching...');
                            scratchingMsg.setThumbnail('https://c.tenor.com/cSxnxUFCeo4AAAAC/gawr-gura.gif');
                            message.channel.send({ embeds: [scratchingMsg] }).then(msg=> {setTimeout(() => msg.delete(), scratchTime - 500)});

                            setTimeout(function() {
                                profit = Math.floor(Math.random() * 2 * amount);
                                user.points += profit;
                                netGain = profit - amount;
                                embedMsg.setDescription(user.name + " won " + profit.toLocaleString() + " points!");
                                embedMsg.setFooter("Net gain: " + netGain.toLocaleString() + " points");
                                if (netGain <= 0)
                                {
                                    embedMsg.setColor('FF0000');
                                    embedMsg.setThumbnail('https://c.tenor.com/QQpkCbV07UIAAAAC/mochj-cat.gif');
                                }
                                else
                                {
                                    embedMsg.setColor('00FF00');
                                    embedMsg.setThumbnail('https://c.tenor.com/TcMXxO_U0dgAAAAC/mochi-mochi-cat-peach.gif');
                                }
                                message.channel.send({ embeds: [embedMsg] });
                            }, scratchTime - 500);
                        }
                        else 
                        {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription("Not enough points!");
                            message.channel.send({ embeds: [embedMsg] });
                        }
                        break;
                    default:
                        embedMsg.setTitle('Error!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription("Choose a scratcher 1-10!");
                        message.channel.send({ embeds: [embedMsg] });
                        break;
                }
            }
            else {
                embedMsg.setTitle('Error!');
                embedMsg.setColor('FF0000');
                embedMsg.setDescription("Choose a scratcher 1-10!");
                message.channel.send({ embeds: [embedMsg] });
            }
        }
        else {
            embedMsg.setTitle('Scratchers');
            embedMsg.setDescription("List of scratchers available:");
            embedMsg.setFields(
                {name: "Scratcher #1 - 10 points", value: "Low chance of winning.", inline: false },
                {name: "Scratcher #2 - 50 points", value: "1% chance of winning BIG.", inline: false },
                {name: "Scratcher #3 - 100 points", value: "50/50. No cap.", inline: false },
                {name: "Scratcher #4 - 500 points", value: "Idk more stuff.", inline: false },
                {name: "Scratcher #5 - 1000 points", value: "Same.", inline: false },
                {name: "Scratcher #6 - 10% points", value: "Pray to RNG Gods.", inline: false },
                {name: "Scratcher #7 - 25% points", value: "Pray to RNG Gods.", inline: false },
                {name: "Scratcher #8 - 50% points", value: "Pray to RNG Gods.", inline: false },
                {name: "Scratcher #9 - 75% points", value: "Pray to RNG Gods.", inline: false },
                {name: "Scratcher #10 - 100% points", value: "Pray to RNG Gods.", inline: false }
            )
            embedMsg.setFooter("Select with !tp scratch #");
            message.channel.send({ embeds: [embedMsg] });
        }
    }
}
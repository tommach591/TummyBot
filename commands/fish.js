module.exports = {
    name: 'fish',
    description: "Fish for hot waifus.",

    execute(message, args, userid, userData, userFish, fishdex, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        var sixstar = ["1", "24"];
        var fivestar = ["2","15", "25", "68", "69"];
        var fourstar = ["51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67"];
        var threestar = ["11", "12", "14", "17", "22", "23", "34", "35", "36", "37", "38", "39", "40", "45"];
        var twostar = ["8", "9", "10", "13", "18", "30", "31", "32", "33", "41", "42", "43", "44"];
        var onestar = ["3", "4", "5", "6", "7", "16", "19", "20", "21", "26", "27", "28", "29", "46", "47", "48", "49", "50"];

        var command = args[0];
        switch(command) {
            case 'help':
                const fishingCommands = new Map();
                fishingCommands.set('help', 'Displays list of fishing commands.');
                fishingCommands.set('info', 'Displays fishing info.');
                fishingCommands.set('start', 'Start fishing.');
                fishingCommands.set('buy', 'Buy some bait.');
                fishingCommands.set('sell', 'Sell your fish.');
                fishingCommands.set('upgrade', 'Upgrades fishing rod.');
                fishingCommands.set('inventory', 'Show all the fishes you have.');
                fishingCommands.set('fishdex', 'Shows unique fishes you have caught.');

                embedMsg.setTitle('List of Fishing Commands');
                embedMsg.setColor('FFF000');

                fishingCommands.forEach((values, keys)=> {
                    embedMsg.addField("!tp fish " + keys, values);
                });

                message.channel.send({ embeds: [embedMsg] });
                break;
            case 'info':
                var target = client.users.cache.get(userid);
                embedMsg.setTitle('Fishing Equipment');
                embedMsg.setAuthor({ name: userData[userid].name, iconURL: target.displayAvatarURL() });
                if (userFish[userid].fishingRod == "Bare Hand") {
                    embedMsg.setThumbnail('https://i.imgur.com/rfD4zwW.png');
                }
                else if (userFish[userid].fishingRod == "Old Rod") {
                    embedMsg.setThumbnail('https://i.imgur.com/hUOugXB.png');
                }
                else if (userFish[userid].fishingRod == "Good Rod") {
                    embedMsg.setThumbnail('https://i.imgur.com/KXYAoKp.png');
                }
                else if (userFish[userid].fishingRod == "Super Rod") {
                    embedMsg.setThumbnail('https://i.imgur.com/aP3CFzj.png');
                }
                embedMsg.addFields(
                    { name: "__Fishing Rod__ :fishing_pole_and_fish:", value: "" + userFish[userid].fishingRod, inline: true },
                    { name: "__Bait__ :worm:", value: "" + userFish[userid].fishBait, inline: true }
                )
                embedMsg.setColor('FFF000');
                message.channel.send({ embeds: [embedMsg] });
                break;
            case 'buy':
                if (args.length < 2) {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription('Please enter amount of fish bait to buy!');
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    var amount = Math.floor(Number(args[1]));
                    var cost = 5;
                    if (!isNaN(amount)) {
                        if (userData[userid].points >= amount * cost && amount > 0) {

                            const proposalMsg = new MessageEmbed();
                            proposalMsg.setTitle('Buying Bait!');
                            proposalMsg.setColor('FFF000');
                            proposalMsg.setThumbnail('https://i.imgur.com/ActIoIR.png');
                            proposalMsg.setDescription("Would " + userData[userid].name + " like to buy " + amount + " fish bait for " + (amount * cost) + " points?");
                            proposalMsg.setFooter("Bait costs " + cost + " points each!");

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
                                            userData[userid].points -= amount * cost;
                                            userFish[userid].fishBait += amount;
                                            embedMsg.setTitle('Success!');
                                            embedMsg.setColor('00FF00');
                                            embedMsg.setThumbnail('https://i.imgur.com/ActIoIR.png');
                                            embedMsg.setDescription(userData[userid].name + " buys " + amount + " fish bait for " + amount * cost + " points!");
                                            message.channel.send({ embeds: [embedMsg] });
                                        } 
                                        else {
                                            embedMsg.setTitle('Declined!');
                                            embedMsg.setColor('FF0000');
                                            embedMsg.setThumbnail('https://i.imgur.com/ActIoIR.png');
                                            embedMsg.setDescription(userData[userid].name + " declined!");
                                            message.channel.send({ embeds: [embedMsg] });
                                        }
                                    })
                                    .catch(collected => {
                                        embedMsg.setTitle('Fail!');
                                        embedMsg.setColor('FF0000');
                                        embedMsg.setThumbnail('https://i.imgur.com/ActIoIR.png');
                                        embedMsg.setDescription(userData[userid].name + " took too long to respond!");
                                        message.channel.send({ embeds: [embedMsg] });
                                    });
                                }
                            );
                        }
                        else {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription(userData[userid].name + " does not have " + (amount * cost) + " point(s)!");
                            embedMsg.setFooter("Bait costs " + cost + " points each!");
                            message.channel.send({ embeds: [embedMsg] });
                        }
                    }
                    else {
                        embedMsg.setTitle('Error!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription('Please enter a valid amount!');
                        message.channel.send({ embeds: [embedMsg] });
                    }
                }
                break;
            case 'upgrade':
                switch(userFish[userid].fishingRod) {
                    case 'Bare Hand':
                        if (userData[userid].points < 1000) {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription("Old Rod costs 1000 points!");
                            embedMsg.setThumbnail('https://c.tenor.com/E05L3qlURd0AAAAd/no-money-broke.gif');
                            embedMsg.setFooter('Try fishing with your bare hands!');
                            message.channel.send({ embeds: [embedMsg] });
                        }
                        else {
                            const proposalMsg = new MessageEmbed();
                            proposalMsg.setTitle('Upgrading Rod!');
                            proposalMsg.setColor('FFF000');
                            proposalMsg.setThumbnail('https://i.imgur.com/hUOugXB.png');
                            proposalMsg.setDescription("Would " + userData[userid].name + " like to upgrade to Old Rod for 1000 points?");

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
                                            userData[userid].points -= 1000;
                                            userFish[userid].fishingRod = 'Old Rod';
                                            embedMsg.setTitle('Congratz!');
                                            embedMsg.setColor('00FF00');
                                            embedMsg.setDescription(userData[userid].name + " bought an Old Rod!");
                                            embedMsg.setThumbnail('https://i.imgur.com/hUOugXB.png');
                                            embedMsg.setFooter('Next level: 10000 points');
                                            message.channel.send({ embeds: [embedMsg] });
                                        } 
                                        else {
                                            embedMsg.setTitle('Declined!');
                                            embedMsg.setColor('FF0000');
                                            embedMsg.setThumbnail('https://i.imgur.com/aMY06nC.png');
                                            embedMsg.setDescription(userData[userid].name + " declined!");
                                            embedMsg.setFooter('Next level: 1000 points');
                                            message.channel.send({ embeds: [embedMsg] });
                                        }
                                    })
                                    .catch(collected => {
                                        embedMsg.setTitle('Fail!');
                                        embedMsg.setColor('FF0000');
                                        embedMsg.setThumbnail('https://i.imgur.com/aMY06nC.png');
                                        embedMsg.setDescription(userData[userid].name + " took too long to respond!");
                                        embedMsg.setFooter('Next level: 1000 points');
                                        message.channel.send({ embeds: [embedMsg] });
                                    });
                                }
                            );
                        }
                        break;
                    case 'Old Rod':
                        if (userData[userid].points < 10000) {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription("Good Rod costs 10000 points!");
                            embedMsg.setThumbnail('https://c.tenor.com/E05L3qlURd0AAAAd/no-money-broke.gif');
                            embedMsg.setFooter('Try fishing with your bare hands!');
                            message.channel.send({ embeds: [embedMsg] });
                        }
                        else {
                            const proposalMsg = new MessageEmbed();
                            proposalMsg.setTitle('Upgrading Rod!');
                            proposalMsg.setColor('FFF000');
                            proposalMsg.setThumbnail('https://i.imgur.com/KXYAoKp.png');
                            proposalMsg.setDescription("Would " + userData[userid].name + " like to upgrade to Good Rod for 10000 points?");

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
                                            userData[userid].points -= 10000;
                                            userFish[userid].fishingRod = 'Good Rod';
                                            embedMsg.setTitle('Congratz!');
                                            embedMsg.setColor('00FF00');
                                            embedMsg.setDescription(userData[userid].name + " bought a Good Rod!");
                                            embedMsg.setThumbnail('https://i.imgur.com/KXYAoKp.png');
                                            embedMsg.setFooter('Next level: 100000 points');
                                            message.channel.send({ embeds: [embedMsg] });
                                        } 
                                        else {
                                            embedMsg.setTitle('Declined!');
                                            embedMsg.setColor('FF0000');
                                            embedMsg.setThumbnail('https://i.imgur.com/hUOugXB.png');
                                            embedMsg.setDescription(userData[userid].name + " declined!");
                                            embedMsg.setFooter('Next level: 10000 points');
                                            message.channel.send({ embeds: [embedMsg] });
                                        }
                                    })
                                    .catch(collected => {
                                        embedMsg.setTitle('Fail!');
                                        embedMsg.setColor('FF0000');
                                        embedMsg.setThumbnail('https://i.imgur.com/hUOugXB.png');
                                        embedMsg.setDescription(userData[userid].name + " took too long to respond!");
                                        embedMsg.setFooter('Next level: 10000 points');
                                        message.channel.send({ embeds: [embedMsg] });
                                    });
                                }
                            );
                        }
                        break;
                    case 'Good Rod':
                        if (userData[userid].points < 100000) {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription("Super Rod costs 100000 points!");
                            embedMsg.setThumbnail('https://c.tenor.com/E05L3qlURd0AAAAd/no-money-broke.gif');
                            embedMsg.setFooter('Try fishing with your bare hands!');
                            message.channel.send({ embeds: [embedMsg] });
                        }
                        else {
                            const proposalMsg = new MessageEmbed();
                            proposalMsg.setTitle('Upgrading Rod!');
                            proposalMsg.setColor('FFF000');
                            proposalMsg.setThumbnail('https://i.imgur.com/aP3CFzj.png');
                            proposalMsg.setDescription("Would " + userData[userid].name + " like to upgrade to Super Rod for 100000 points?");

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
                                            userData[userid].points -= 100000;
                                            userFish[userid].fishingRod = 'Super Rod';
                                            embedMsg.setTitle('Congratz!');
                                            embedMsg.setColor('00FF00');
                                            embedMsg.setDescription(userData[userid].name + " bought a Super Rod! You have the best rod!");
                                            embedMsg.setThumbnail('https://i.imgur.com/aP3CFzj.png');
                                            embedMsg.setFooter('Next level: Infinite points');
                                            message.channel.send({ embeds: [embedMsg] });
                                        } 
                                        else {
                                            embedMsg.setTitle('Declined!');
                                            embedMsg.setColor('FF0000');
                                            embedMsg.setThumbnail('https://i.imgur.com/KXYAoKp.png');
                                            embedMsg.setDescription(userData[userid].name + " declined!");
                                            embedMsg.setFooter('Next level: 100000 points');
                                            message.channel.send({ embeds: [embedMsg] });
                                        }
                                    })
                                    .catch(collected => {
                                        embedMsg.setTitle('Fail!');
                                        embedMsg.setColor('FF0000');
                                        embedMsg.setThumbnail('https://i.imgur.com/KXYAoKp.png');
                                        embedMsg.setDescription(userData[userid].name + " took too long to respond!");
                                        embedMsg.setFooter('Next level: 100000 points');
                                        message.channel.send({ embeds: [embedMsg] });
                                    });
                                }
                            );
                        }
                        break;
                    default:
                        embedMsg.setTitle('Congratz!');
                        embedMsg.setColor('00FF00');
                        embedMsg.setDescription(userData[userid].name + " already has the best rod!");
                        embedMsg.setFooter('Next level: Infinite points');
                        message.channel.send({ embeds: [embedMsg] });
                        break;
                }
                break;
            case 'start':
                var newTime = new Date();
                var timeDiff = newTime.getTime() - userFish[userid].fishTime;
                var fishCD = 1000 * 7;

                if (userFish[userid].fishBait == 0) {
                    embedMsg.setTitle('No Bait!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription(userData[userid].name + " has no bait!");
                    embedMsg.setFooter('Use !tp fish buy # for more bait!');
                    message.channel.send({ embeds: [embedMsg] });
                }
                else if (timeDiff < fishCD) {
                    embedMsg.setTitle('Chill!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription(userData[userid].name + " needs to rest!");
                    embedMsg.setFooter('Cooldown: ' + Math.floor((fishCD - timeDiff) / 1000) + ' seconds');
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    const fishingMsg = new MessageEmbed();
                    var fishTime = 1000 * Math.floor((Math.random() * 3) + 3);
                    userFish[userid].fishBait--;
                    var newFishingTime = new Date();
                    userFish[userid].fishTime = newFishingTime.getTime();

                    fishingMsg.setTitle('Fishing!');
                    fishingMsg.setDescription('Waiting...');
                    fishingMsg.setColor('008FFF');
                    fishingMsg.setImage('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/0ab4b036812305.572a1cada9fdc.gif');
                    message.channel.send({ embeds: [fishingMsg] }).then(msg=> {setTimeout(() => msg.delete(), fishTime - 500)});
                    
                    setTimeout(function() { 
                        var fishingPower;
                        switch(userFish[userid].fishingRod) {
                            case "Bare Hand":
                                fishingPower = 1;
                                break;
                            case "Old Rod":
                                fishingPower = 2;
                                break;
                            case "Good Rod":
                                fishingPower = 3;
                                break;
                            case "Super Rod":
                                fishingPower = 4;
                                break;
                        }

                        var fishCaught = "-1";
                        if (fishCaught == "-1") {
                            for (let i = 0; i < fishingPower; i++) {
                                var luck = Math.floor((Math.random() * 100000) + 1);
                                var chance = 100000 * 0.0001;
                                if (luck <= chance) {
                                    embedMsg.setTitle('OMG (OH MY GOD)! (★★★★★★)');
                                    fishCaught = fishdex[sixstar[Math.floor(Math.random() * sixstar.length)]];
                                    break;
                                }
                            }
                        }
                        if (fishCaught == "-1") {
                            for (let i = 0; i < fishingPower; i++) {
                                var luck = Math.floor((Math.random() * 100000) + 1);
                                var chance = 100000 * 0.001;
                                if (luck <= chance) {
                                    embedMsg.setTitle('POGGERS! (★★★★★)');
                                    fishCaught = fishdex[fivestar[Math.floor(Math.random() * fivestar.length)]];
                                    break;
                                }
                            }
                        }
                        if (fishCaught == "-1") {
                            for (let i = 0; i < fishingPower; i++) {
                                var luck = Math.floor((Math.random() * 100000) + 1);
                                var chance = 100000 * 0.01;
                                if (luck <= chance) {
                                    embedMsg.setTitle('NO WAY! (★★★★)');
                                    fishCaught = fishdex[fourstar[Math.floor(Math.random() * fourstar.length)]];
                                    break;
                                }
                            }
                        }
                        if (fishCaught == "-1") {
                            for (let i = 0; i < fishingPower; i++) {
                                var luck = Math.floor((Math.random() * 100000) + 1);
                                var chance = 100000 * 0.03;
                                if (luck <= chance) {
                                    embedMsg.setTitle('WOAH! (★★★)');
                                    fishCaught = fishdex[threestar[Math.floor(Math.random() * threestar.length)]];
                                    break;
                                }
                            }
                        }
                        if (fishCaught == "-1") {
                            for (let i = 0; i < fishingPower; i++) {
                                var luck = Math.floor((Math.random() * 100000) + 1);
                                var chance = 100000 * 0.3;
                                if (luck <= chance) {
                                    embedMsg.setTitle('Wow! (★★)');
                                    fishCaught = fishdex[twostar[Math.floor(Math.random() * twostar.length)]];
                                    break;
                                }
                            }
                        }
                        if (fishCaught == "-1") {
                            embedMsg.setTitle('Yay! (★)');
                            fishCaught = fishdex[onestar[Math.floor(Math.random() * onestar.length)]];
                        }

                        if (!userFish[userid].fishdex.includes(fishCaught.id)) {
                            userFish[userid].fishdex.push(fishCaught.id);
                            userFish[userid].fishdex.sort((firstEl, secondEl) => { 
                                if (Number(firstEl) < Number(secondEl)) {
                                    return -1;
                                }
                                if (Number(firstEl) > Number(secondEl)) {
                                    return 1;
                                }
                                return 0;
                            });
                            embedMsg.setDescription(userData[userid].name + " caught a " + fishCaught.name + "!\n\n **Fishdex Entry**\n" + fishCaught.info);
                            embedMsg.setFooter("Value: " + fishCaught.value + " points (New!)");
                        }
                        else {
                            embedMsg.setDescription(userData[userid].name + " caught a " + fishCaught.name + "!");
                            embedMsg.setFooter("Value: " + fishCaught.value + " points");
                        }
                        userFish[userid].fishInventory.push(fishCaught.id);
                        userFish[userid].fishInventory.sort((firstEl, secondEl) => { 
                            if (Number(firstEl) < Number(secondEl)) {
                                return -1;
                            }
                            if (Number(firstEl) > Number(secondEl)) {
                                return 1;
                            }
                            return 0;
                        });
                        embedMsg.setColor('00FF00');
                        embedMsg.setThumbnail(fishCaught.image);
                        message.channel.send({ embeds: [embedMsg] });
                    }, fishTime);
                }
                break;
            case 'sell':
                if (args.length < 2) {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription('Please enter which fish to sell!');
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    if (args[1] == 'all') {
                        var profit = 0;
                        while (userFish[userid].fishInventory.length > 0) {
                            var temp = userFish[userid].fishInventory.pop();
                            profit += fishdex[temp].value;
                        }
                        userData[userid].points += profit;
                        embedMsg.setTitle('Sold!');
                        embedMsg.setColor('00FF00');
                        embedMsg.setThumbnail('https://i.imgur.com/biKmDze.png');
                        embedMsg.setDescription('Sold everything for ' + profit + ' points!');
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else {
                        var target = args[1];
                        if (!isNaN(Number(target))) {
                            var amount = Number(args[2]);
                            var profit = 0;
                            if (!userFish[userid].fishInventory.includes(target)) {
                                embedMsg.setTitle('Error!');
                                embedMsg.setColor('FF0000');
                                embedMsg.setDescription('Fish does not exist!');
                                message.channel.send({ embeds: [embedMsg] });
                            }
                            else {
                                if (isNaN(amount)) {
                                    amount = 1;
                                }
                                for (let i = 0; i < amount; i++) {
                                    const index = userFish[userid].fishInventory.indexOf(target);
                                    if (index > -1) {
                                        profit += fishdex[target].value;
                                        userFish[userid].fishInventory.splice(index, 1);
                                    }
                                }
                                userData[userid].points += profit;
                                embedMsg.setTitle('Sold!');
                                embedMsg.setColor('00FF00');
                                embedMsg.setThumbnail('https://i.imgur.com/biKmDze.png');
                                embedMsg.setDescription('Sold ' + fishdex[target].name + ' for ' + profit + ' points!');
                                message.channel.send({ embeds: [embedMsg] });
                            }
                        }
                        else {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription('Please enter which fish to sell!');
                            message.channel.send({ embeds: [embedMsg] });
                        }
                    }
                }
                break;
            case 'inv':
            case 'inventory':
                var target = client.users.cache.get(userid);
                embedMsg.setAuthor({ name: userData[userid].name, iconURL: target.displayAvatarURL() });
                embedMsg.setTitle('Fish Inventory');
                embedMsg.setColor('FFF000');
                embedMsg.setThumbnail('https://i.imgur.com/ME2PxQ3.png');
                if (userFish[userid].fishInventory.length == 0) {
                    embedMsg.setDescription('No fish :(');
                }
                else {
                    var fishes = "";
                    var lastFish = "";
                    var cost = 0;
                    userFish[userid].fishInventory.forEach((element) => {
                        cost += fishdex[element].value;
                        if (lastFish != element) {
                            var amount = userFish[userid].fishInventory.filter(match => match == element).length;
                            fishes += "**__#" + fishdex[element].id + ". " + fishdex[element].name + "__**\nAmount: " + amount + "\nValue: " + fishdex[element].value + "\n\n";
                            lastFish = element;
                        }
                    });
                    embedMsg.setDescription(fishes);
                    embedMsg.setFooter("Total Value: " + cost + " points");
                }
                message.channel.send({ embeds: [embedMsg] });
                break;
            case 'dex':
            case 'fishdex':
                var target = client.users.cache.get(userid);
                embedMsg.setAuthor({ name: userData[userid].name, iconURL: target.displayAvatarURL() });
                embedMsg.setTitle('Fishdex');
                embedMsg.setThumbnail('https://i.imgur.com/liDWgLr.png');
                embedMsg.setColor('FFF000');
                if (args.length > 1) {
                    var selected = args[1];
                    if (!isNaN(Number(selected)) && fishdex[selected] && userFish[userid].fishdex.includes(selected)) {
                        var stars = " (★)";
                        if (sixstar.includes(fishdex[selected].id)) {
                            stars = " (★★★★★★)";
                        }
                        else if (fivestar.includes(fishdex[selected].id)) {
                            stars = " (★★★★★)";
                        }
                        else if (fourstar.includes(fishdex[selected].id)) {
                            stars = " (★★★★)";
                        }
                        else if (threestar.includes(fishdex[selected].id)) {
                            stars = " (★★★)";
                        }
                        else if (twostar.includes(fishdex[selected].id)) {
                            stars = " (★★)";
                        }
                        embedMsg.setDescription("#" + fishdex[selected].id + ". " + fishdex[selected].name + stars + "\n");
                        embedMsg.setThumbnail(fishdex[selected].image);
                        embedMsg.addField('Fishdex Entry', "" + fishdex[selected].info);
                        embedMsg.addField('Value', "" + fishdex[selected].value);
                        messageSent.edit({ embeds: [embedMsg] });
                    }
                    else {
                        embedMsg.setDescription('You never caught this fish or it does not exist!');
                        messageSent.edit({ embeds: [embedMsg] });
                    }
                }
                else {
                    var fishes = [""];
                    var index = 0;
                    var count = 0;
                    var keys = [];
                    for (var k in fishdex) {
                        keys.push(k);
                    }
                    for (let i = 1; i < keys.length + 1; i++) {
                        if (count >= 20) {
                            index++;
                            count = 0;
                            fishes[index] = "";
                        }
                        if (userFish[userid].fishdex.includes(i.toString())) {
                            fishes[index] += "#" + fishdex[i].id + ". " + fishdex[i].name + "\n";
                        }
                        else {
                            fishes[index] += "#" + fishdex[i].id + ". ???\n";
                        }
                        count++;
                    }
                    index = 0;
                    embedMsg.setDescription("```" + fishes[index] + "```");

                    const pages = [];
                    for (let i = 0; i < fishes.length; i++) {
                        const page = new MessageEmbed();
                        page.setAuthor({ name: userData[userid].name, iconURL: target.displayAvatarURL() });
                        page.setTitle('Fishdex');
                        page.setThumbnail('https://i.imgur.com/liDWgLr.png');
                        page.setColor('FFF000');
                        page.setDescription("```" + fishes[i] + "```");
                        pages.push(page);
                    }

                    console.log(pages.length);

                    const pagination = require('discord.js-pagination');

                    const emoji = ["⏪", "⏩"]
                    const timeout = '180000'

                    pagination(message, pages, emoji, timeout)
                }
                break;
            default:
                embedMsg.setTitle('Error!');
                embedMsg.setColor('FF0000');
                embedMsg.setDescription("Invalid fishing command!");
                embedMsg.setFooter('Use !tp fish help for list of fishing commands!');
                message.channel.send({ embeds: [embedMsg] });
                break;
        }
    }
}
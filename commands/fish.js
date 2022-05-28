
module.exports = {
    name: 'fish',
    description: "Fish for money! Gotta catch em all! Start with !tp f help.",

    execute(message, args, userid, masterData, masterStorage, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        var sixstar = ["1", "24", "70", "71"];
        var fivestar = ["2","15", "25", "68", "69", "72", "103", "104", "105"];
        var fourstar = ["51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "73", "74", "75", "76", "77"
        , "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100", "101"
        , "102"];
        var threestar = ["11", "12", "14", "17", "22", "23", "34", "35", "36", "37", "38", "39", "40", "45"];
        var twostar = ["8", "9", "10", "13", "18", "30", "31", "32", "33", "41", "42", "43", "44"];
        var onestar = ["3", "4", "5", "6", "7", "16", "19", "20", "21", "26", "27", "28", "29", "46", "47", "48", "49", "50"];

        var command = args[0];
        switch(command) {
            case 'help':
                const fishingCommands = new Map();
                fishingCommands.set('help', 'Displays list of fishing commands.');
                fishingCommands.set('info', 'Displays fishing info.');
                fishingCommands.set('start', 'Start fishing. How exciting');
                fishingCommands.set('buy #', 'Buy # amount of bait.');
                fishingCommands.set('sell #1 #2', 'Sell your fish. #1 - index of fish, #2 - amount of fish.');
                fishingCommands.set('sell all', 'Sell all your fish.');
                fishingCommands.set('upgrade', 'Upgrades fishing rod.');
                fishingCommands.set('inv', 'Show all the fishes you have.');
                fishingCommands.set('dex', 'Shows unique fishes you have caught.');
                fishingCommands.set('dex #', 'Shows the fishdex entry of the fish you have caught.');

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
                embedMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: target.displayAvatarURL() });
                if (masterData["userFish"][userid].fishingRod == "Bare Hand") {
                    embedMsg.setThumbnail('https://i.imgur.com/rfD4zwW.png');
                }
                else if (masterData["userFish"][userid].fishingRod == "Old Rod") {
                    embedMsg.setThumbnail('https://i.imgur.com/hUOugXB.png');
                }
                else if (masterData["userFish"][userid].fishingRod == "Good Rod") {
                    embedMsg.setThumbnail('https://i.imgur.com/KXYAoKp.png');
                }
                else if (masterData["userFish"][userid].fishingRod == "Super Rod") {
                    embedMsg.setThumbnail('https://i.imgur.com/aP3CFzj.png');
                }
                else if (masterData["userFish"][userid].fishingRod == "Mega Rod") {
                    embedMsg.setThumbnail('https://m.media-amazon.com/images/I/51yOu0U+2iL._AC_SY450_.jpg');
                }
                else if (masterData["userFish"][userid].fishingRod == "Ultra Rod") {
                    embedMsg.setThumbnail('https://dodo.ac/np/images/5/5c/Golden_Rod_NH_Icon.png');
                }
                embedMsg.addFields(
                    { name: "__Fishing Rod__ :fishing_pole_and_fish:", value: "" + masterData["userFish"][userid].fishingRod, inline: true },
                    { name: "__Bait__ :worm:", value: "" + masterData["userFish"][userid].fishBait.toLocaleString(), inline: true }
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
                else if (masterData["userFish"][userid].fishBait >= 100) 
                {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription('Your fish bait pouch is full!');
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    var amount = Math.floor(Number(args[1]));
                    if (masterData["userFish"][userid].fishBait + amount > 100)
                    {
                        amount = 100 - masterData["userFish"][userid].fishBait;
                    }
                    var cost = 5 * Math.pow(masterData["userData"][userid].income, masterData["userData"][userid].income - 1);
                    if (!isNaN(amount) || amount > 0) {
                        if (masterData["userData"][userid].points >= amount * cost && amount > 0) {

                            const proposalMsg = new MessageEmbed();
                            proposalMsg.setTitle('Buying Bait!');
                            proposalMsg.setColor('FFF000');
                            proposalMsg.setThumbnail('https://i.imgur.com/ActIoIR.png');
                            proposalMsg.setDescription("Would " + masterData["userData"][userid].name + " like to buy " + amount + " fish bait for " + (amount * cost).toLocaleString() + " points?");
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
                                            masterData["userData"][userid].points -= amount * cost;
                                            masterData["userFish"][userid].fishBait += amount;
                                            embedMsg.setTitle('Success!');
                                            embedMsg.setColor('00FF00');
                                            embedMsg.setThumbnail('https://i.imgur.com/ActIoIR.png');
                                            embedMsg.setDescription(masterData["userData"][userid].name + " buys " + amount + " fish bait for " + (amount * cost).toLocaleString() + " points!");
                                            message.channel.send({ embeds: [embedMsg] });
                                        } 
                                        else {
                                            embedMsg.setTitle('Declined!');
                                            embedMsg.setColor('FF0000');
                                            embedMsg.setThumbnail('https://i.imgur.com/ActIoIR.png');
                                            embedMsg.setDescription(masterData["userData"][userid].name + " declined!");
                                            message.channel.send({ embeds: [embedMsg] });
                                        }
                                    })
                                    .catch(collected => {
                                        embedMsg.setTitle('Fail!');
                                        embedMsg.setColor('FF0000');
                                        embedMsg.setThumbnail('https://i.imgur.com/ActIoIR.png');
                                        embedMsg.setDescription(masterData["userData"][userid].name + " took too long to respond!");
                                        message.channel.send({ embeds: [embedMsg] });
                                    });
                                }
                            );
                        }
                        else {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription(masterData["userData"][userid].name + " does not have " + (amount * cost).toLocaleString() + " point(s)!");
                            embedMsg.setFooter("Bait costs " + cost.toLocaleString() + " points each!");
                            message.channel.send({ embeds: [embedMsg] });
                        }
                    }
                    else {
                        embedMsg.setTitle('Error!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription('Please enter a valid amount!');
                        embedMsg.setFooter("Or maybe your pouch is too full?");
                        message.channel.send({ embeds: [embedMsg] });
                    }
                }
                break;
            case 'upgrade':
                let upgradeRod = (cost, newCost, newRod, oldImage, newImage) =>
                {
                    if (masterData["userData"][userid].points < cost) {
                        embedMsg.setTitle('Error!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription(newRod + " costs " + cost.toLocaleString() +  " points!");
                        embedMsg.setThumbnail('https://c.tenor.com/E05L3qlURd0AAAAd/no-money-broke.gif');
                        embedMsg.setFooter('Try fishing with your bare hands!');
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else {
                        const proposalMsg = new MessageEmbed();
                        proposalMsg.setTitle('Upgrading Rod!');
                        proposalMsg.setColor('FFF000');
                        proposalMsg.setThumbnail(newImage);
                        proposalMsg.setDescription("Would " + masterData["userData"][userid].name + " like to upgrade to " + newRod + " for " +  cost.toLocaleString() + " points?");

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
                                        masterData["userData"][userid].points -= cost;
                                        masterData["userFish"][userid].fishingRod = newRod;
                                        embedMsg.setTitle('Congratz!');
                                        embedMsg.setColor('00FF00');
                                        embedMsg.setDescription(masterData["userData"][userid].name + " bought an " + newRod + "!");
                                        embedMsg.setThumbnail(newImage);
                                        embedMsg.setFooter('Next level: ' + newCost.toLocaleString() + ' points');
                                        message.channel.send({ embeds: [embedMsg] });
                                    } 
                                    else {
                                        embedMsg.setTitle('Declined!');
                                        embedMsg.setColor('FF0000');
                                        embedMsg.setThumbnail(oldImage);
                                        embedMsg.setDescription(masterData["userData"][userid].name + " declined!");
                                        embedMsg.setFooter('Next level: ' + cost.toLocaleString() + ' points');
                                        message.channel.send({ embeds: [embedMsg] });
                                    }
                                })
                                .catch(collected => {
                                    embedMsg.setTitle('Fail!');
                                    embedMsg.setColor('FF0000');
                                    embedMsg.setThumbnail(oldImage);
                                    embedMsg.setDescription(masterData["userData"][userid].name + " took too long to respond!");
                                    embedMsg.setFooter('Next level: ' + cost.toLocaleString() + ' points');
                                    message.channel.send({ embeds: [embedMsg] });
                                });
                            }
                        );
                    }
                }

                var cost;
                var newRod;
                var oldImage;
                var newImage;

                switch(masterData["userFish"][userid].fishingRod) {
                    case 'Bare Hand':
                        cost = 1000;
                        newCost = 10000;
                        newRod = 'Old Rod';
                        oldImage = 'https://i.imgur.com/aMY06nC.png';
                        newImage = 'https://i.imgur.com/hUOugXB.png';
                        upgradeRod(cost, newCost, newRod, oldImage, newImage);
                        break;
                    case 'Old Rod':
                        cost = 10000;
                        newCost = 100000;
                        newRod = 'Good Rod';
                        oldImage = 'https://i.imgur.com/hUOugXB.png';
                        newImage = 'https://i.imgur.com/KXYAoKp.png';
                        upgradeRod(cost, newCost, newRod, oldImage, newImage);
                        break;
                    case 'Good Rod':
                        cost = 100000;
                        newCost = 10000000;
                        newRod = 'Super Rod';
                        oldImage = 'https://i.imgur.com/KXYAoKp.png';
                        newImage = 'https://i.imgur.com/aP3CFzj.png';
                        upgradeRod(cost, newCost, newRod, oldImage, newImage);
                        break;
                    case 'Super Rod':
                        cost = 10000000;
                        newCost = 1333333337;
                        newRod = 'Mega Rod';
                        oldImage = 'https://i.imgur.com/aP3CFzj.png';
                        newImage = 'https://m.media-amazon.com/images/I/51yOu0U+2iL._AC_SY450_.jpg';
                        upgradeRod(cost, newCost, newRod, oldImage, newImage);
                        break;
                    case 'Mega Rod':
                        cost = 1333333337;
                        newCost = 'Infinite';
                        newRod = 'Ultra Rod';
                        oldImage = 'https://m.media-amazon.com/images/I/51yOu0U+2iL._AC_SY450_.jpg';
                        newImage = 'https://dodo.ac/np/images/5/5c/Golden_Rod_NH_Icon.png';
                        upgradeRod(cost, newCost, newRod, oldImage, newImage);
                        break;
                    default:
                        embedMsg.setTitle('Congratz!');
                        embedMsg.setColor('00FF00');
                        embedMsg.setDescription(masterData["userData"][userid].name + " already has the best rod!");
                        embedMsg.setFooter('Next level: Infinite points');
                        message.channel.send({ embeds: [embedMsg] });
                        break;
                }
                break;
            case 'start':
                var newTime = new Date();
                var timeDiff = newTime.getTime() - masterData["userFish"][userid].fishTime;
                var fishCD = 1000 * 5;

                if (masterData["userFish"][userid].fishBait == 0) {
                    embedMsg.setTitle('No Bait!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription(masterData["userData"][userid].name + " has no bait!");
                    embedMsg.setFooter('Use !tp fish buy # for more bait!');
                    message.channel.send({ embeds: [embedMsg] });
                }
                else if (timeDiff < fishCD) {
                    embedMsg.setTitle('Chill!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription(masterData["userData"][userid].name + " needs to rest!");
                    embedMsg.setFooter('Cooldown: ' + Math.floor((fishCD - timeDiff) / 1000) + ' seconds');
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    const fishingMsg = new MessageEmbed();
                    var fishTime = 1000 * 5;
                    masterData["userFish"][userid].fishBait--;
                    var newFishingTime = new Date();
                    masterData["userFish"][userid].fishTime = newFishingTime.getTime();
                    var lucky = false;

                    fishingMsg.setTitle('Fishing!');
                    
                    var luck = Math.floor((Math.random() * 100) + 1);
                    var chance = 100 * 0.01;

                    if (luck <= chance) {
                        fishingMsg.setColor('FFF000');
                        fishingMsg.setDescription('I can sense a big one..!');
                        fishingMsg.setImage("https://c.tenor.com/X36jN0wOAAMAAAAC/kirito-anime.gif");
                        lucky = true;
                    }
                    else 
                    {
                        fishingMsg.setColor('008FFF');
                        fishingMsg.setDescription('Waiting...');
                        fishingMsg.setImage('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/0ab4b036812305.572a1cada9fdc.gif');
                    }

                    message.channel.send({ embeds: [fishingMsg] }).then(msg=> {setTimeout(() => msg.delete(), fishTime - 500)});
                    
                    setTimeout(function() { 
                        var fishingPower;
                        switch(masterData["userFish"][userid].fishingRod) {
                            case "Old Rod":
                                fishingPower = 2;
                                break;
                            case "Good Rod":
                                fishingPower = 3;
                                break;
                            case "Super Rod":
                                fishingPower = 5;
                                break;
                            case "Mega Rod":
                                fishingPower = 10;
                                break;
                            case "Ultra Rod":
                                fishingPower = 15;
                                break;
                            default:
                                fishingPower = 1;
                                break;
                        }

                        var fishCaught = "-1";
                        if (lucky) 
                        {
                            var luck = Math.floor((Math.random() * 100) + 1);
                            if (luck <= 5)
                            {
                                embedMsg.setTitle('OMG (OH MY GOD)! (★★★★★★)');
                                fishCaught = masterStorage["fishdex"][sixstar[Math.floor(Math.random() * sixstar.length)]];
                            }
                            else if (luck <= 20)
                            {
                                embedMsg.setTitle('POGGERS! (★★★★★)');
                                fishCaught = masterStorage["fishdex"][fivestar[Math.floor(Math.random() * fivestar.length)]];
                            }
                            else 
                            {
                                embedMsg.setTitle('NO WAY! (★★★★)');
                                fishCaught = masterStorage["fishdex"][fourstar[Math.floor(Math.random() * fourstar.length)]];
                            }
                        }
                        
                        if (fishCaught == "-1") {
                            for (let i = 0; i < fishingPower; i++) {
                                var luck = Math.floor((Math.random() * 100000) + 1);
                                var chance = 100000 * 0.0001;
                                if (luck <= chance) {
                                    embedMsg.setTitle('OMG (OH MY GOD)! (★★★★★★)');
                                    fishCaught = masterStorage["fishdex"][sixstar[Math.floor(Math.random() * sixstar.length)]];
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
                                    fishCaught = masterStorage["fishdex"][fivestar[Math.floor(Math.random() * fivestar.length)]];
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
                                    fishCaught = masterStorage["fishdex"][fourstar[Math.floor(Math.random() * fourstar.length)]];
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
                                    fishCaught = masterStorage["fishdex"][threestar[Math.floor(Math.random() * threestar.length)]];
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
                                    fishCaught = masterStorage["fishdex"][twostar[Math.floor(Math.random() * twostar.length)]];
                                    break;
                                }
                            }
                        }
                        if (fishCaught == "-1") {
                            embedMsg.setTitle('Yay! (★)');
                            fishCaught = masterStorage["fishdex"][onestar[Math.floor(Math.random() * onestar.length)]];
                        }

                        if (!masterData["userFish"][userid].fishdex.includes(fishCaught.id)) {
                            masterData["userFish"][userid].fishdex.push(fishCaught.id);
                            masterData["userFish"][userid].fishdex.sort((firstEl, secondEl) => { 
                                if (Number(firstEl) < Number(secondEl)) {
                                    return -1;
                                }
                                if (Number(firstEl) > Number(secondEl)) {
                                    return 1;
                                }
                                return 0;
                            });
                            embedMsg.setDescription("<@!" +userid + "> caught a " + fishCaught.name + "!\n\n**Fishdex Entry**\n" + fishCaught.info);
                            embedMsg.setFooter("Base Value: " + fishCaught.value + " points (New!)");
                        }
                        else {
                            embedMsg.setDescription("<@!" +userid + "> caught a " + fishCaught.name + "!");
                            embedMsg.setFooter("Base Value: " + fishCaught.value + " points");
                        }
                        masterData["userFish"][userid].fishInventory.push(fishCaught.id);
                        masterData["userFish"][userid].fishInventory.sort((firstEl, secondEl) => { 
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
                        while (masterData["userFish"][userid].fishInventory.length > 0) {
                            var temp = masterData["userFish"][userid].fishInventory.pop();
                            profit += masterStorage["fishdex"][temp].value * Math.pow(masterData["userData"][userid].income, masterData["userData"][userid].income - 1);
                        }
                        masterData["userData"][userid].points += profit;
                        embedMsg.setTitle('Sold!');
                        embedMsg.setColor('00FF00');
                        embedMsg.setThumbnail('https://i.imgur.com/biKmDze.png');
                        embedMsg.setDescription('Sold everything for ' + profit.toLocaleString() + ' points!');
                        embedMsg.setFooter('Fish price scaled by income.');
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else {
                        var target = args[1];
                        if (!isNaN(Number(target))) {
                            var amount = Number(args[2]);
                            var profit = 0;
                            if (!masterData["userFish"][userid].fishInventory.includes(target)) {
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
                                    const index = masterData["userFish"][userid].fishInventory.indexOf(target);
                                    if (index > -1) {
                                        profit += masterStorage["fishdex"][target].value * Math.pow(masterData["userData"][userid].income, masterData["userData"][userid].income - 1);
                                        masterData["userFish"][userid].fishInventory.splice(index, 1);
                                    }
                                }
                                masterData["userData"][userid].points += profit;
                                embedMsg.setTitle('Sold!');
                                embedMsg.setColor('00FF00');
                                embedMsg.setThumbnail('https://i.imgur.com/biKmDze.png');
                                embedMsg.setDescription('Sold ' + masterStorage["fishdex"][target].name + ' for ' + profit.toLocaleString() + ' points!');
                                embedMsg.setFooter('Fish price scaled by income.');
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
                embedMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: target.displayAvatarURL() });
                embedMsg.setTitle('Fish Inventory');
                embedMsg.setColor('FFF000');
                embedMsg.setThumbnail('https://i.imgur.com/ME2PxQ3.png');
                if (masterData["userFish"][userid].fishInventory.length == 0) {
                    embedMsg.setDescription('No fish :(');
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    var fishes = [""];
                    var lastFish = "";
                    var index = 0;
                    var count = 0;
                    var cost = 0;
                    masterData["userFish"][userid].fishInventory.forEach((element) => {
                        cost += masterStorage["fishdex"][element].value * Math.pow(masterData["userData"][userid].income, masterData["userData"][userid].income - 1);
                        if (count >= 5) {
                            fishes[index] += "\n";
                            index++;
                            count = 0;
                            fishes.push("");
                        }
                        if (lastFish != element) {
                            var amount = masterData["userFish"][userid].fishInventory.filter(match => match == element).length;
                            fishes[index] += "**__#" + masterStorage["fishdex"][element].id + ". " + masterStorage["fishdex"][element].name + "__**\nAmount: " + amount + "\nValue: " + (masterStorage["fishdex"][element].value * Math.pow(masterData["userData"][userid].income, masterData["userData"][userid].income - 1)).toLocaleString() + "\n\n";
                            lastFish = element;
                            count++;
                        }
                    });

                    let pages = [];
                    for (let i = 0; i < fishes.length; i++) {
                        pages.push(fishes[i]);
                    }

                    let page = 1;
                    embedMsg
                        .setFooter(`Total Value: ${cost.toLocaleString()} ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ Page ${page} of ${pages.length}`)
                        .setDescription(pages[page-1])
                        .setAuthor({ name: masterData["userData"][userid].name, iconURL: target.displayAvatarURL() })
                        .setTitle('Fish Inventory')
                        .setThumbnail('https://i.imgur.com/ME2PxQ3.png')
                        .setColor('FFF000');

                    message.channel.send({ embeds: [embedMsg] }).then(msg => {
                        msg.react("◀️").then(r => {
                            msg.react("▶️")

                            const filter = (reaction, user) => ["◀️", "▶️"].includes(reaction.emoji.name) && user.id === userid;
                            const collector = msg.createReactionCollector({ filter, time: 1000 * 120 });

                            collector.on('collect', r => {
                                embedMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: target.displayAvatarURL() });
                                embedMsg.setTitle('Fish Inventory');
                                embedMsg.setThumbnail('https://i.imgur.com/ME2PxQ3.png');
                                embedMsg.setColor('FFF000');
                                
                                if (r.emoji.name === "◀️") {
                                    if (page === 1) {
                                        r.users.remove(userid);
                                        return;
                                    }
                                    page--;
                                    embedMsg.setDescription(pages[page-1]);
                                    embedMsg.setFooter(`Total Value: ${cost.toLocaleString()} ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ Page ${page} of ${pages.length}`)
                                    msg.edit({ embeds: [embedMsg] });
                                }
                                else if (r.emoji.name === "▶️") {
                                    if (page === pages.length) {
                                        r.users.remove(userid);
                                        return;
                                    }
                                    page++;
                                    embedMsg.setDescription(pages[page-1]);
                                    embedMsg.setFooter(`Total Value: ${cost.toLocaleString()} ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ Page ${page} of ${pages.length}`)
                                    msg.edit({ embeds: [embedMsg] });
                                }
                                r.users.remove(userid);
                            })

                        })
                    });
                }
                break;
            case 'dex':
            case 'fishdex':
                var target = client.users.cache.get(userid);
                embedMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: target.displayAvatarURL() });
                embedMsg.setTitle('Fishdex');
                embedMsg.setThumbnail('https://i.imgur.com/liDWgLr.png');
                embedMsg.setColor('FFF000');
                if (args.length > 1) {
                    var selected = args[1];
                    if (!isNaN(Number(selected)) && masterStorage["fishdex"][selected] && masterData["userFish"][userid].fishdex.includes(selected)) {
                        var stars = "";
                        if (sixstar.includes(masterStorage["fishdex"][selected].id)) {
                            stars = " (★★★★★★)";
                        }
                        else if (fivestar.includes(masterStorage["fishdex"][selected].id)) {
                            stars = " (★★★★★)";
                        }
                        else if (fourstar.includes(masterStorage["fishdex"][selected].id)) {
                            stars = " (★★★★)";
                        }
                        else if (threestar.includes(masterStorage["fishdex"][selected].id)) {
                            stars = " (★★★)";
                        }
                        else if (twostar.includes(masterStorage["fishdex"][selected].id)) {
                            stars = " (★★)";
                        }
                        else {
                            stars = " (★)"
                        }
                        embedMsg.setDescription("#" + masterStorage["fishdex"][selected].id + ". " + masterStorage["fishdex"][selected].name + stars + "\n");
                        embedMsg.setThumbnail(masterStorage["fishdex"][selected].image);
                        embedMsg.addField('Fishdex Entry', "" + masterStorage["fishdex"][selected].info);
                        embedMsg.addField('Base Value', "" + masterStorage["fishdex"][selected].value.toLocaleString());
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else {
                        embedMsg.setDescription('You never caught this fish or it does not exist!');
                        message.channel.send({ embeds: [embedMsg] }); 
                    }
                }
                else {
                    var fishes = [""];
                    var index = 0;
                    var count = 0;
                    var keys = [];
                    for (var k in masterStorage["fishdex"]) {
                        keys.push(k);
                    }
                    for (let i = 1; i < keys.length + 1; i++) {
                        if (count >= 20) {
                            index++;
                            count = 0;
                            fishes[index] = "";
                        }
                        if (masterData["userFish"][userid].fishdex.includes(i.toString())) {
                            fishes[index] += "#" + masterStorage["fishdex"][i].id + ". " + masterStorage["fishdex"][i].name + "\n";
                        }
                        else {
                            fishes[index] += "#" + masterStorage["fishdex"][i].id + ". ???\n";
                        }
                        count++;
                    }

                    let pages = [];
                    for (let i = 0; i < fishes.length; i++) {
                        pages.push("```" + fishes[i] + "```");
                    }

                    let page = 1;
                    embedMsg
                        .setFooter(`Page ${page} of ${pages.length}`)
                        .setDescription(pages[page-1])
                        .setAuthor({ name: masterData["userData"][userid].name, iconURL: target.displayAvatarURL() })
                        .setTitle('Fishdex')
                        .setThumbnail('https://i.imgur.com/liDWgLr.png')
                        .setColor('FFF000');

                    message.channel.send({ embeds: [embedMsg] }).then(msg => {
                        msg.react("◀️").then(r => {
                            msg.react("▶️")

                            const filter = (reaction, user) => ["◀️", "▶️"].includes(reaction.emoji.name) && user.id === userid;
                            const collector = msg.createReactionCollector({ filter, time: 1000 * 120 });

                            collector.on('collect', r => {
                                embedMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: target.displayAvatarURL() });
                                embedMsg.setTitle('Fishdex');
                                embedMsg.setThumbnail('https://i.imgur.com/liDWgLr.png');
                                embedMsg.setColor('FFF000');
                                
                                if (r.emoji.name === "◀️") {
                                    if (page === 1) {
                                        r.users.remove(userid);
                                        return;
                                    }
                                    page--;
                                    embedMsg.setDescription(pages[page-1]);
                                    embedMsg.setFooter(`Page ${page} of ${pages.length}`);
                                    msg.edit({ embeds: [embedMsg] });
                                }
                                else if (r.emoji.name === "▶️") {
                                    if (page === pages.length) {
                                        r.users.remove(userid);
                                        return;
                                    }
                                    page++;
                                    embedMsg.setDescription(pages[page-1]);
                                    embedMsg.setFooter(`Page ${page} of ${pages.length}`);
                                    msg.edit({ embeds: [embedMsg] });
                                }
                                r.users.remove(userid);
                            })

                        })
                    });
                }
                break;
            default:
                embedMsg.setTitle("Invalid fishing command!");
                embedMsg.setColor('FF0000');
                embedMsg.setDescription('Use __!tp fish help__ for list of fishing commands!');
                embedMsg.setThumbnail("https://4.bp.blogspot.com/-DV8zj3oNPO8/XZKl8Y1_KkI/AAAAAAAMsvI/HEq47t0TPmYhX0b2igMkkxbcPQPbUXR2gCLcBGAsYHQ/s1600/AS0005827_02.gif");
                message.channel.send({ embeds: [embedMsg] });
                break;
        }
    }
}
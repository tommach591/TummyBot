module.exports = {
    name: 'fish',
    description: "Fish for hot waifus.",

    execute(message, args, userid, userData, userFish, fishdex, client, fs) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        // Delete when wipe!
        if (!userFish[userid]) {
            userFish[userid] = {
                id: userid,
                name: userData[userid].name,
                fishingRod: 'Bare Hand',
                fishBait: 0,
                fishTime: 0,
                fishdex: [],
                fishInventory: []
            }
        }

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
                    { name: "__Fishing Rod__", value: "" + userFish[userid].fishingRod, inline: true },
                    { name: "__Bait__", value: "" + userFish[userid].fishBait, inline: true }
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
                            userData[userid].points -= amount * cost;
                            userFish[userid].fishBait += amount;
                            embedMsg.setTitle('Success!');
                            embedMsg.setColor('00FF00');
                            embedMsg.setThumbnail('https://i.imgur.com/ActIoIR.png');
                            embedMsg.setDescription(userData[userid].name + " buys " + amount + " fish bait for " + amount * cost + " points!");
                            message.channel.send({ embeds: [embedMsg] });
                        }
                        else {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription(userData[userid].name + " does not have " + amount + " point(s)!");
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
                        }
                        else {
                            userData[userid].points -= 1000;
                            userFish[userid].fishingRod = 'Old Rod';
                            embedMsg.setTitle('Congratz!');
                            embedMsg.setColor('00FF00');
                            embedMsg.setDescription(userData[userid].name + " bought an Old Rod!");
                            embedMsg.setThumbnail('https://i.imgur.com/hUOugXB.png');
                            embedMsg.setFooter('Next level: 10000 points');
                        }
                        message.channel.send({ embeds: [embedMsg] });
                        break;
                    case 'Old Rod':
                        if (userData[userid].points < 10000) {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription("Good Rod costs 10000 points!");
                            embedMsg.setThumbnail('https://c.tenor.com/E05L3qlURd0AAAAd/no-money-broke.gif');
                            embedMsg.setFooter('Try fishing with your bare hands!');
                        }
                        else {
                            userData[userid].points -= 10000;
                            userFish[userid].fishingRod = 'Good Rod';
                            embedMsg.setTitle('Congratz!');
                            embedMsg.setColor('00FF00');
                            embedMsg.setDescription(userData[userid].name + " bought a Good Rod!");
                            embedMsg.setThumbnail('https://i.imgur.com/KXYAoKp.png');
                            embedMsg.setFooter('Next level: 100000 points');
                        }
                        message.channel.send({ embeds: [embedMsg] });
                    case 'Good Rod':
                        if (userData[userid].points < 100000) {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription("Super Rod costs 100000 points!");
                            embedMsg.setThumbnail('https://c.tenor.com/E05L3qlURd0AAAAd/no-money-broke.gif');
                            embedMsg.setFooter('Try fishing with your bare hands!');
                        }
                        else {
                            userData[userid].points -= 100000;
                            userFish[userid].fishingRod = 'Super Rod';
                            embedMsg.setTitle('Congratz!');
                            embedMsg.setColor('00FF00');
                            embedMsg.setDescription(userData[userid].name + " bought a Super Rod! You have the best rod!");
                            embedMsg.setThumbnail('https://i.imgur.com/aP3CFzj.png');
                            embedMsg.setFooter('Next level: Infinite points');
                        }
                        message.channel.send({ embeds: [embedMsg] });
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
                            tierfive = ["1", "24"];
                            for (let i = 0; i < fishingPower; i++) {
                                var luck = Math.floor(Math.random() * 100001);
                                if (luck >= 99990) {
                                    embedMsg.setTitle('OMG (OH MY GOD)!');
                                    fishCaught = fishdex[tierfive[Math.floor(Math.random() * tierfive.length)]];
                                    break;
                                }
                            }
                        }
                        if (fishCaught == "-1") {
                            tierfour = ["2","15", "25"];
                            for (let i = 0; i < fishingPower; i++) {
                                var luck = Math.floor(Math.random() * 100001);
                                if (luck > 99900) {
                                    embedMsg.setTitle('POG!');
                                    fishCaught = fishdex[tierfour[Math.floor(Math.random() * tierfour.length)]];
                                    break;
                                }
                            }
                        }
                        if (fishCaught == "-1") {
                            tierthree = ["11", "12", "14", "17", "22", "23", "34", "35", "36", "37", "38", "39", "40", "45"];
                            for (let i = 0; i < fishingPower; i++) {
                                var luck = Math.floor(Math.random() * 100001);
                                if (luck > 97000) {
                                    embedMsg.setTitle('WOAH!');
                                    fishCaught = fishdex[tierthree[Math.floor(Math.random() * tierthree.length)]];
                                    break;
                                }
                            }
                        }
                        if (fishCaught == "-1") {
                            tiertwo = ["8", "9", "10", "13", "18", "30", "31", "32", "33", "41", "42", "43", "44"];
                            for (let i = 0; i < fishingPower; i++) {
                                var luck = Math.floor(Math.random() * 100001);
                                if (luck > 70000) {
                                    embedMsg.setTitle('Wow!');
                                    fishCaught = fishdex[tiertwo[Math.floor(Math.random() * tiertwo.length)]];
                                    break;
                                }
                            }
                        }
                        if (fishCaught == "-1") {
                            tierone = ["3", "4", "5", "6", "7", "16", "19", "20", "21", "26", "27", "28", "29"];
                            embedMsg.setTitle('Yay!');
                            fishCaught = fishdex[tierone[Math.floor(Math.random() * tierone.length)]];
                        }

                        if (!userFish[userid].fishdex.includes(fishCaught.id)) {
                            userFish[userid].fishdex.push(fishCaught.id);
                            userFish[userid].fishdex.sort((firstEl, secondEl) => { 
                                if (Number(firstEl) < Number(secondEl)) {
                                    return -1;
                                }
                                if (Number(firstEl) < Number(secondEl)) {
                                    return 1;
                                }
                                return 0;
                            });
                            embedMsg.setFooter("wow a new fish!");
                        }
                        else {
                            embedMsg.setFooter("omg (oh my god) so cool!");
                        }
                        userFish[userid].fishInventory.push(fishCaught.id);
                        userFish[userid].fishInventory.sort((firstEl, secondEl) => { 
                            if (Number(firstEl) < Number(secondEl)) {
                                return -1;
                            }
                            if (Number(firstEl) < Number(secondEl)) {
                                return 1;
                            }
                            return 0;
                        });
                        embedMsg.setColor('00FF00');
                        embedMsg.setDescription(userData[userid].name + " caught a " + fishCaught.name + "!");
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
                    userFish[userid].fishInventory.forEach((element) => {
                        if (lastFish != element) {
                            var amount = userFish[userid].fishInventory.filter(match => match == element).length;
                            fishes += "**__#" + fishdex[element].id + ". " + fishdex[element].name + "__**\nAmount: " + amount + "\nValue: " + fishdex[element].value + "\n\n";
                            lastFish = element;
                        }
                    });
                    embedMsg.setDescription(fishes);
                }
                message.channel.send({ embeds: [embedMsg] });
                break;
            case 'dex':
            case 'fishdex':
                var target = client.users.cache.get(userid);
                embedMsg.setAuthor({ name: userData[userid].name, iconURL: target.displayAvatarURL() });
                embedMsg.setTitle('Fishdex');
                embedMsg.setColor('FFF000');
                if (args.length > 1) {
                    var selected = args[1];
                    if (!isNaN(Number(selected)) && fishdex[selected] && userFish[userid].fishdex.includes(selected)) {
                        embedMsg.setDescription("#" + fishdex[selected].id + ". " + fishdex[selected].name + "\n");
                        embedMsg.setThumbnail(fishdex[selected].image);
                        embedMsg.addField('Fishdex Entry', "" + fishdex[selected].info);
                        embedMsg.addField('Value', "" + fishdex[selected].value);
                    }
                    else {
                        embedMsg.setDescription('You never caught this fish or it does not exist!');
                    }
                }
                else {
                    var fishes = "";
                    var keys = [];
                    for (var k in fishdex) {
                        keys.push(k);
                    }
                    for (let i = 1; i < keys.length + 1; i++) {
                        if (userFish[userid].fishdex.includes(i.toString())) {
                            fishes += "#" + fishdex[i].id + ". " + fishdex[i].name + "\n";
                        }
                        else {
                            fishes += "#" + fishdex[i].id + ". ???\n";
                        }
                    }
                    embedMsg.setDescription("```" + fishes + "```");
                }
                message.channel.send({ embeds: [embedMsg] });
                break;
            default:
                embedMsg.setTitle('Error!');
                embedMsg.setColor('FF0000');
                embedMsg.setDescription("Invalid fishing command!");
                embedMsg.setFooter('Use !tp fish help for list of fishing commands!');
                message.channel.send({ embeds: [embedMsg] });
                break;
        }
        fs.writeFile('storage/userData.json', JSON.stringify(userData, null, 4), (err) => {
            if (err) console.error(err);
        });
        fs.writeFile('storage/userFish.json', JSON.stringify(userFish, null, 4), (err) => {
            if (err) console.error(err);
        });
    }
}
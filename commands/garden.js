module.exports = {
    name: 'garden',
    description: "Garden for hot waifus.",

    execute(message, args, userid, userData, userGarden, gardendex, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        var command = args[0];
        switch(command) {
            case 'help':
                const gardeningCommands = new Map();
                gardeningCommands.set('help', 'Displays list of gardening commands.');
                gardeningCommands.set('info', 'Displays gardening info.');
                gardeningCommands.set('plant', 'Plant a random seed.');
                gardeningCommands.set('harvest', 'Harvest fully grown plants.');
                gardeningCommands.set('upgrade', 'Upgrade field, allowing you to plant more.');
                gardeningCommands.set('gardendex', 'Shows unique plants you have grown.');

                embedMsg.setTitle('List of Gardening Commands');
                embedMsg.setColor('FFF000');

                gardeningCommands.forEach((values, keys)=> {
                    embedMsg.addField("!tp garden " + keys, values);
                });

                message.channel.send({ embeds: [embedMsg] });
                break;
            case 'info':
                var target = client.users.cache.get(userid);
                embedMsg.setTitle('Gardening Info');
                embedMsg.setAuthor({ name: userData[userid].name, iconURL: target.displayAvatarURL() });
                embedMsg.setThumbnail('https://i.imgur.com/xuAGOau.png');
                for (let i = 0; i < 3; i++) {
                    var progress = "";
                    var pot = "";
                    switch(i) {
                        case 0:
                            pot = "__Pot One__ :potted_plant:";
                            break;
                        case 1:
                            pot = "__Pot Two__ :potted_plant:";
                            break;
                        case 2:
                            pot = "__Pot Three__ :potted_plant:";
                            break;
                    }
                    if (userGarden[userid].pots[i] == "-1") {
                        progress = "Progress:⠀⠀⠀⠀⠀⠀⠀Unavailable" + "\nTime: ⠀⠀⠀⠀⠀⠀⠀⠀⠀00:00:00\n";
                    }
                    else if (userGarden[userid].pots[i] == "0") {
                        progress = "Progress:⠀⠀⠀⠀⠀⠀⠀Empty" + "\nTime: ⠀⠀⠀⠀⠀⠀⠀⠀⠀00:00:00\n";
                    }
                    else {
                        var newDate = new Date();
                        var timeDiff = newDate.getTime() - userGarden[userid].potTime[i];
                        var growthTime = 1000 * 60 * 60 * 20;
                        if (timeDiff < growthTime) {
                            var hours = Math.floor((growthTime - timeDiff) / (1000 * 60 * 60));
                            var min = Math.floor(((growthTime - timeDiff) % (1000 * 60 * 60)) / (1000 * 60));
                            var sec = Math.floor(((growthTime - timeDiff) % (1000 * 60 * 60)) % (1000 * 60) / (1000));
                            if (hours < 10) {
                                hours = "0" + hours.toString();
                            }
                            if (min < 10) {
                                min = "0" + min.toString();
                            }
                            if (sec < 10) {
                                sec = "0" + sec.toString();
                            }
                            progress = "Progress:⠀⠀⠀⠀⠀⠀⠀Growing" + "\nTime: ⠀⠀⠀⠀⠀⠀⠀⠀⠀" + hours + ":" + min + ":" + sec + "\n";
                        }
                        else {
                            progress = "Progress:⠀⠀⠀⠀⠀⠀⠀Done" + "\nTime: ⠀⠀⠀⠀⠀⠀⠀⠀⠀00:00:00\n";
                        }
                    }
                    embedMsg.addField(pot, progress);
                }

                embedMsg.setColor('FFF000');
                message.channel.send({ embeds: [embedMsg] });
                break;
            case 'plant':
                var cost = 200;
                var target = client.users.cache.get(userid);
                embedMsg.setTitle('Gardening Info');
                embedMsg.setAuthor({ name: userData[userid].name, iconURL: target.displayAvatarURL() });
                if (userData[userid].points < cost) {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription("Not enough points!");
                    embedMsg.setFooter("Planting costs " + cost + " points!");
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    var planted = false;
                    var keys = [];
                    for (var k in gardendex) {
                        keys.push(k);
                    }
                    var newDate = new Date();
                    for (let i = 0; i < 3; i++) {
                        if (userGarden[userid].pots[i] == "0") {
                            userGarden[userid].pots[i] = keys[Math.floor(Math.random() * keys.length)];
                            userGarden[userid].potTime[i] = newDate.getTime();
                            userData[userid].points -= cost;
                            planted = true;
                            break;
                        }
                    }
                    if (planted) {
                        embedMsg.setTitle('Success!');
                        embedMsg.setColor('00FF00');
                        embedMsg.setDescription("Successfully planted mysterious seed!");
                        embedMsg.setThumbnail("https://i.imgur.com/yNgyFnp.png");
                        embedMsg.setFooter("Harvest in 20 hours!");
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else {
                        embedMsg.setTitle('Oh nyoooooo~!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription("Your pots are all filled!");
                        embedMsg.setThumbnail("https://c.tenor.com/xDxd1bVH4ccAAAAM/peach-peach-cat.gif");
                        message.channel.send({ embeds: [embedMsg] });
                    }
                }
                break;
            case 'harvest':
                var profit = 0;
                var reward = 400;
                var newPlant = [];
                for (let i = 0; i < 3; i++) {
                    var newDate = new Date();
                    var timeDiff = newDate.getTime() - userGarden[userid].potTime[i];
                    var growthTime = 1000 * 60 * 60 * 20;

                    if (userGarden[userid].pots[i] != "0" && userGarden[userid].pots[i] != "-1" && timeDiff >= growthTime) {
                        var plantRaised = userGarden[userid].pots[i];
                        if (!userGarden[userid].gardendex.includes(plantRaised)) {
                            userGarden[userid].gardendex.push(plantRaised);
                            userGarden[userid].gardendex.sort((firstEl, secondEl) => { 
                                if (Number(firstEl) < Number(secondEl)) {
                                    return -1;
                                }
                                if (Number(firstEl) > Number(secondEl)) {
                                    return 1;
                                }
                                return 0;
                            });
                            newPlant.push(plantRaised);
                        }
                        userGarden[userid].pots[i] = "0";
                        profit += reward;
                    }
                }
                if (profit == 0) {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription("There is nothing to harvest!");
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    embedMsg.setTitle('Successfully Harvested!');
                    embedMsg.setColor('00FF00');
                    embedMsg.setDescription("Your harvest earned you " + profit + " points!");
                    userData[userid].points += profit;
                    message.channel.send({ embeds: [embedMsg] });
                    if (newPlant.length != 0) {
                        for (let i = 0; i < newPlant.length; i++) {
                            const newPlantMsg = new MessageEmbed();
                            newPlantMsg.setTitle("**New Plant #" + newPlant[i] + "**");
                            newPlantMsg.setDescription("Omg (oh my god) is that a " + gardendex[newPlant[i]].name + "!?\n\n **Gardendex Entry** \n" + gardendex[newPlant[i]].info);
                            newPlantMsg.setThumbnail(gardendex[newPlant[i]].image);
                            newPlantMsg.setFooter("New plant added to the Gardendex!");
                            message.channel.send({ embeds: [newPlantMsg] });
                        }
                    }
                }
                break;
            case 'upgrade':
                var cost = 0;
                var potIndex;
                for (let i = 1; i < 3; i++) {
                    if (userGarden[userid].pots[i] == "-1") {
                        if (i == 1) {
                            cost = 3000;
                            potIndex = i;
                            break;
                        }
                        if (i == 2) {
                            cost = 5000;
                            potIndex = i;
                            break;
                        }
                    }
                }
                if (cost == 0) {
                    embedMsg.setTitle('You maxed out!');
                    embedMsg.setColor('FFF000');
                    embedMsg.setDescription("You can't buy anymore pots!");
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    if (userData[userid].points >= cost) {
                        userData[userid].points -= cost;
                        userGarden[userid].pots[potIndex] = "0";
                        embedMsg.setTitle('Congratz!');
                        embedMsg.setColor('00FF00');
                        embedMsg.setDescription(userData[userid].name + " bought a new pot!");
                        embedMsg.setThumbnail('https://i.imgur.com/kWWFPYB.png');
                        if (potIndex == 1)
                            embedMsg.setFooter('Next pot: 5000 points');
                        else 
                            embedMsg.setFooter('Maxed pot!');
                    }
                    else {
                        embedMsg.setTitle('Error!');
                        embedMsg.setColor('FF0000');
                        if (potIndex == 1)
                            embedMsg.setDescription("Next pot costs 3000 points!");
                        else
                            embedMsg.setDescription("Next pot costs 5000 points!");
                        embedMsg.setThumbnail('https://c.tenor.com/E05L3qlURd0AAAAd/no-money-broke.gif');
                        embedMsg.setFooter('Haha you\'re poor!');
                    }
                    message.channel.send({ embeds: [embedMsg] });
                }
                break;
            case 'dex':
            case 'gardendex':
                var target = client.users.cache.get(userid);
                embedMsg.setAuthor({ name: userData[userid].name, iconURL: target.displayAvatarURL() });
                embedMsg.setTitle('Gardendex');
                embedMsg.setThumbnail('https://i.imgur.com/CCkcmSz.png');
                embedMsg.setColor('FFF000');
                if (args.length > 1) {
                    var selected = args[1];
                    if (!isNaN(Number(selected)) && gardendex[selected] && userGarden[userid].gardendex.includes(selected)) {
                        embedMsg.setDescription("#" + gardendex[selected].id + ". " + gardendex[selected].name + "\n");
                        embedMsg.setThumbnail(gardendex[selected].image);
                        embedMsg.addField('Gardendex Entry', "" + gardendex[selected].info);
                    }
                    else {
                        embedMsg.setDescription('You never planted this plant or it does not exist!');
                    }
                }
                else {
                    var plants = "";
                    var keys = [];
                    for (var k in gardendex) {
                        keys.push(k);
                    }
                    for (let i = 1; i < keys.length + 1; i++) {
                        if (userGarden[userid].gardendex.includes(i.toString())) {
                            plants += "#" + gardendex[i].id + ". " + gardendex[i].name + "\n";
                        }
                        else {
                            plants += "#" + gardendex[i].id + ". ???\n";
                        }
                    }
                    embedMsg.setDescription("```" + plants + "```");
                }
                message.channel.send({ embeds: [embedMsg] });
                break;
            default:
                embedMsg.setTitle('Error!');
                embedMsg.setColor('FF0000');
                embedMsg.setDescription("Invalid gardening command!");
                embedMsg.setFooter('Use !tp garden help for list of gardening commands!');
                message.channel.send({ embeds: [embedMsg] });
                break;
        }
    }
}
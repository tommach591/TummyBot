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
                        var growthTime = 1000 * 60 * 60 * 8;
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
                    const proposalMsg = new MessageEmbed();
                    proposalMsg.setTitle('Gardening Info!');
                    proposalMsg.setColor('FFF000');
                    proposalMsg.setThumbnail('https://i.imgur.com/kWWFPYB.png');
                    proposalMsg.setDescription("Would " + userData[userid].name + " like to plant a mystery seed for " + cost + " points?");
                    proposalMsg.setFooter("Harvest in 20 hours to make 200 profit!");

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
                                else {
                                    embedMsg.setTitle('Declined!');
                                    embedMsg.setColor('FF0000');
                                    embedMsg.setThumbnail('https://i.imgur.com/kWWFPYB.png');
                                    embedMsg.setDescription(userData[userid].name + " declined!");
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                            })
                            .catch(collected => {
                                embedMsg.setTitle('Fail!');
                                embedMsg.setColor('FF0000');
                                embedMsg.setDescription(userData[userid].name + " took too long to respond!");
                                embedMsg.setThumbnail('https://i.imgur.com/kWWFPYB.png');
                                message.channel.send({ embeds: [embedMsg] });
                            });
                        }
                    );
                }
                break;
            case 'harvest':
                var profit = 0;
                var reward = 400;
                var newPlant = [];
                for (let i = 0; i < 3; i++) {
                    var newDate = new Date();
                    var timeDiff = newDate.getTime() - userGarden[userid].potTime[i];
                    var growthTime = 1000 * 60 * 60 * 8;

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
                            newPlantMsg.setDescription("Omg (oh my god) is that a " + gardendex[newPlant[i]].name + "!?\n\n**Gardendex Entry** \n" + gardendex[newPlant[i]].info);
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
                        const proposalMsg = new MessageEmbed();
                        proposalMsg.setTitle('Buying Pot!');
                        proposalMsg.setColor('FFF000');
                        proposalMsg.setThumbnail('https://i.imgur.com/kWWFPYB.png');
                        proposalMsg.setDescription("Would " + userData[userid].name + " like to buy a new pot for " + cost + " points?");
    
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
                                        message.channel.send({ embeds: [embedMsg] });
                                    } 
                                    else {
                                        embedMsg.setTitle('Declined!');
                                        embedMsg.setColor('FF0000');
                                        proposalMsg.setThumbnail('https://i.imgur.com/kWWFPYB.png');
                                        embedMsg.setDescription(userData[userid].name + " declined!");
                                        if (potIndex == 0)
                                            embedMsg.setFooter('Next pot: 3000 points');
                                        else 
                                            embedMsg.setFooter('Next pot: 5000 points');
                                        message.channel.send({ embeds: [embedMsg] });
                                    }
                                })
                                .catch(collected => {
                                    embedMsg.setTitle('Fail!');
                                    embedMsg.setColor('FF0000');
                                    embedMsg.setDescription(userData[userid].name + " took too long to respond!");
                                    proposalMsg.setThumbnail('https://i.imgur.com/kWWFPYB.png');
                                    if (potIndex == 0)
                                        embedMsg.setFooter('Next pot: 3000 points');
                                    else 
                                        embedMsg.setFooter('Next pot: 5000 points');
                                    message.channel.send({ embeds: [embedMsg] });
                                });
                            }
                        );
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
                        message.channel.send({ embeds: [embedMsg] });
                    }
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
                    var plants = [""];
                    var index = 0;
                    var count = 0;
                    var keys = [];
                    for (var k in gardendex) {
                        keys.push(k);
                    }
                    for (let i = 1; i < keys.length + 1; i++) {
                        if (count >= 20) {
                            index++;
                            count = 0;
                            plants[index] = "";
                        }
                        if (userGarden[userid].gardendex.includes(i.toString())) {
                            plants[index] += "#" + gardendex[i].id + ". " + gardendex[i].name + "\n";
                        }
                        else {
                            plants[index] += "#" + gardendex[i].id + ". ???\n";
                        }
                        count++;
                    }

                    let pages = [];
                    for (let i = 0; i < plants.length; i++) {
                        pages.push("```" + plants[i] + "```");
                    }
    
                    let page = 1;
                    embedMsg
                        .setFooter(`Page ${page} of ${pages.length}`)
                        .setDescription(pages[page-1])
                        .setAuthor({ name: userData[userid].name, iconURL: target.displayAvatarURL() })
                        .setTitle('Gardendex')
                        .setThumbnail('https://i.imgur.com/liDWgLr.png')
                        .setColor('FFF000');
    
                    message.channel.send({ embeds: [embedMsg] }).then(msg => {
                        msg.react("◀️").then(r => {
                            msg.react("▶️")
    
                            const filter = (reaction, user) => ["◀️", "▶️"].includes(reaction.emoji.name) && user.id === userid;
                            const collector = msg.createReactionCollector({ filter, time: 1000 * 60 * 30 });
    
                            collector.on('collect', r => {
                                embedMsg.setAuthor({ name: userData[userid].name, iconURL: target.displayAvatarURL() });
                                embedMsg.setTitle('Gardendex');
                                embedMsg.setThumbnail('https://i.imgur.com/CCkcmSz.png');
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
                embedMsg.setTitle('Invalid gardening command!');
                embedMsg.setColor('FF0000');
                embedMsg.setDescription('Use __!tp garden help__ for list of gardening commands!');
                embedMsg.setThumbnail("https://4.bp.blogspot.com/-DV8zj3oNPO8/XZKl8Y1_KkI/AAAAAAAMsvI/HEq47t0TPmYhX0b2igMkkxbcPQPbUXR2gCLcBGAsYHQ/s1600/AS0005827_02.gif");
                message.channel.send({ embeds: [embedMsg] });
                break;
        }
    }
}
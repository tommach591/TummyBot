module.exports = {
    name: 'hunt',
    description: "Hunt for honor and glory!",

    execute(message, args, userid, userData, userHunt, monsterdex, currHunt, items, equips, scrolls, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();
        const randomAttackGifs = [
            "https://i.imgur.com/O62yU0U.gif",
            "https://c.tenor.com/O0Rd9v0NpjkAAAAC/keqing-genshin-impact.gif",
            "https://c.tenor.com/fG4HO_ccb68AAAAC/anime-my-hero-academia.gif",
            "https://c.tenor.com/kWtHiHKx0EYAAAAd/naruto-vs.gif",
            "https://i.makeagif.com/media/8-02-2015/0jqzEj.gif",
            "https://c.tenor.com/P951zVBB_vkAAAAC/ao-t-shingeki-no-kyojin.gif",
            "https://c.tenor.com/IM60lqQKKY0AAAAC/kid-goku-kamehameha.gif",
            "https://c.tenor.com/xc19_U9dSNMAAAAC/chika-fujiwara-hit.gif",
            "https://c.tenor.com/Oxl7m7l88FwAAAAC/megumin-konosuba.gif",
            "https://c.tenor.com/w9MEZlRNxOUAAAAC/sword-art-online-sinon-asada.gif",
            "https://c.tenor.com/p7fVqdR0FWkAAAAC/punch-vi.gif",
            "https://i.makeagif.com/media/8-26-2017/pcdhp5.gif",
            "https://thumbs.gfycat.com/BlackandwhiteTangibleCero-size_restricted.gif",
            "https://c.tenor.com/FPBEXi3f8sQAAAAd/rock-lee-hidden-lotus.gif",
            "https://i.makeagif.com/media/2-16-2015/P0tA1a.gif"
        ]

        let generateEquip = (itemName) => {
            if (!equips[itemName]) {
                return;
            }
            var id = "";
            while (items[id]) {
                id = "";
                for (var i = 0; i < 6; i++) {
                    id += (Math.floor(Math.random() * 10)).toString();
                }
            }
            items[id] = {
                name: equips[itemName].name,
                type: equips[itemName].type,
                maxHP: 0,
                attack: 0,
                magic: 0,
                defense: 0,
                speed: 0,
            }
            return id;
        }

        var threestar = [];
        var twostar = [];
        var onestar = [];
        var zerostar = [];
        var scrolldrop = [];

        let getDrops = () => {
            for (var k in equips) {
                switch(equips[k].rarity) {
                    case 1:
                        onestar.push(k);
                        break;
                    case 2:
                        twostar.push(k);
                        break;
                    case 3:
                        threestar.push(k);
                        break;
                    default:
                        zerostar.push(k);
                        break;
                }
            }
            for (var k in scrolls) {
                scrolldrop.push(k);
            }
        }

        var weapon;
        var armor;
        var accessory;

        var maxHP;
        var attack;
        var magic;
        var defense;
        var speed;

        let updateStats = () => {
            weapon = items[userHunt[userid].weapon];
            armor = items[userHunt[userid].armor];
            accessory = items[userHunt[userid].accessory];
    
            maxHP = userHunt[userid].maxHP;
            attack = userHunt[userid].attack;
            magic = userHunt[userid].magic;
            defense = userHunt[userid].defense;
            speed = userHunt[userid].speed;
    
            if (weapon.name != "Nothing") {
                maxHP += weapon.maxHP + equips[weapon.name].maxHP;
                attack += weapon.attack + equips[weapon.name].attack;
                magic += weapon.magic + equips[weapon.name].magic;
                defense += weapon.defense + equips[weapon.name].defense;
                speed += weapon.speed + equips[weapon.name].speed;
            }
    
            if (armor.name != "Nothing") {
                maxHP += armor.maxHP + equips[armor.name].maxHP;
                attack += armor.attack + equips[armor.name].attack;
                magic += armor.magic + equips[armor.name].magic;
                defense += armor.defense + equips[armor.name].defense;
                speed += armor.speed + equips[armor.name].speed;
            }
    
            if (accessory.name != "Nothing") {
                maxHP += accessory.maxHP + equips[accessory.name].maxHP;
                attack += accessory.attack + equips[accessory.name].attack;
                magic += accessory.magic + equips[accessory.name].magic;
                defense += accessory.defense + equips[accessory.name].defense;
                speed += accessory.speed + equips[accessory.name].speed;
            }
        }

        updateStats();

        if (userHunt[userid].currentHP <= 0) {
            var newTime = new Date();
            var timeDiff = newTime.getTime() - userHunt[userid].deathTime;
            if (timeDiff >= 1000 * 65) {
                userHunt[userid].currentHP = maxHP;
                const reviveMsg = new MessageEmbed()
                reviveMsg.setTitle("A Hero Returned to Battle!");
                reviveMsg.setDescription(userData[userid].name + " has revived!");
                reviveMsg.setFooter('Don\'t die again!');
                message.channel.send({ embeds: [reviveMsg] });
            }
        }

        var command = args[0];
        switch(command) {
            case 'help':
                const huntingCommands = new Map();
                huntingCommands.set('help', 'Displays list of gardening commands.');
                huntingCommands.set('info', 'Displays hunting info.');
                huntingCommands.set('boss', 'Checks current boss.');
                huntingCommands.set('attack', 'Attack the boss if active!');
                huntingCommands.set('inv', 'Display inventory.');
                huntingCommands.set('equip', 'Equip an item.');
                huntingCommands.set('unequip', 'Unequip an item.');
                huntingCommands.set('scroll', 'Select a scroll to use on your equipments.');
                huntingCommands.set('give', 'Give an item.');
                huntingCommands.set('sell', 'Sell an item.');
                huntingCommands.set('dex', 'Shows unique monsters you have fought.');

                embedMsg.setTitle('List of Hunting Commands');
                embedMsg.setColor('FFF000');

                huntingCommands.forEach((values, keys)=> {
                    embedMsg.addField("!tp hunt " + keys, values);
                });

                message.channel.send({ embeds: [embedMsg] });
                break;
            case 'info':
                var target = client.users.cache.get(userid);
                embedMsg.setTitle('Hunting Equipment');
                embedMsg.setAuthor({ name: userData[userid].name, iconURL: target.displayAvatarURL() });
                embedMsg.setThumbnail(target.displayAvatarURL());
                embedMsg.setColor('FFF000');

                var stats = "Max HP: " + maxHP.toString() + "\nAttack: " + attack.toString() + "\nMagic: " + magic.toString() + "\nDefense: " + defense.toString() + "\nSpeed: " + speed.toString() + "\n";
                var currentCondition = "HP: " + userHunt[userid].currentHP + "\nRespawn: ";
                if (userHunt[userid].currentHP <= 0) {
                    currentCondition += Math.floor((1000 * 65 - (newTime.getTime() - userHunt[userid].deathTime)) / 1000) + "s\n";
                }
                else {
                    currentCondition += "0s\n";
                }

                embedMsg.setFields(
                    {name: "__Weapon:__  :dagger: ⠀⠀⠀⠀", value: "" + weapon.name + "\n", inline: true},
                    {name: "__Armor:__  :shield: ⠀⠀⠀⠀⠀", value: "" + armor.name + "\n", inline: true},
                    {name: "__Accessory:__  :feather: ⠀⠀⠀⠀", value: "" + accessory.name + "\n", inline: true},
                    {name: "__Stats:__  :bow_and_arrow: ⠀⠀⠀⠀", value: stats + "\n", inline: true},
                    {name: "__Battle Stats:__  :crossed_swords: ⠀⠀⠀⠀", value: currentCondition + "\n", inline: true},
                );
                message.channel.send({ embeds: [embedMsg] });
                break;
            case 'boss':
                if (currHunt["active"]) {
                    if (!currHunt["active"].channels.includes(message.channel)) {
                        currHunt["active"].channels.push(message.channel);
                    }
                    var stars = " (";
                    for (let i = 0; i < currHunt["active"].difficulty; i++) {
                        stars += "★";
                    }
                    stars += ")"
                    embedMsg.setTitle(currHunt["active"].name + stars);
                    embedMsg.setDescription(currHunt["active"].name + " is here!");
                    embedMsg.setImage(currHunt["active"].image);
                    embedMsg.setFooter("HP: " + currHunt["active"].currentHP + "/" + currHunt["active"].maxHP);
                    embedMsg.setColor("49000F");
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    embedMsg.setTitle("Emptiness...");
                    embedMsg.setDescription("There is no boss!");
                    embedMsg.setImage("https://ze-robot.com/images/source/25034.jpg");
                    embedMsg.setFooter("Let's wait for a little longer...");
                    message.channel.send({ embeds: [embedMsg] });
                }
                break;
            case 'attack':
                var newTime = new Date();
                if (currHunt["active"]) {
                    if (!currHunt["active"].channels.includes(message.channel)) {
                        currHunt["active"].channels.push(message.channel);
                    }
                    var timeDiff = newTime.getTime() - userHunt[userid].lastAttack;
                    var attackCD = (1000 * 3) - (speed * 100);
                    if (attackCD < 1000 * 1) {
                        attackCD = 1000 * 1;
                    }

                    if (currHunt["active"].deathCount >= currHunt["active"].deathLimit) {    
                        embedMsg.setTitle("Chill!");
                        embedMsg.setDescription(currHunt["active"].name + " is fleeing!");
                        embedMsg.setColor("FF0000");
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else if (currHunt["active"].currentHP <= 0) {    
                        embedMsg.setTitle("Chill!");
                        embedMsg.setDescription(currHunt["active"].name + " is already dead!");
                        embedMsg.setColor("FF0000");
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else if (userHunt[userid].currentHP <= 0) {
                        embedMsg.setTitle("You're dead!");
                        embedMsg.setDescription("You can't attack when you're dead!");
                        embedMsg.setColor("FF0000");
                        embedMsg.setFooter('Cooldown: ' + Math.floor((1000 * 65 - (newTime.getTime() - userHunt[userid].deathTime)) / 1000) + ' seconds');
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else if (timeDiff < attackCD) {
                        embedMsg.setTitle("Chill!");
                        embedMsg.setDescription("You can't attack yet!");
                        embedMsg.setColor("FF0000");
                        embedMsg.setFooter('Cooldown: ' + Math.floor((attackCD - timeDiff) / 1000) + ' seconds');
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else {
                        if (!currHunt["active"].targets.includes(userid)) {
                            currHunt["active"].targets.push(userid);
                            currHunt["active"].playerDamage.push(0);
                        }
                        if (!userHunt[userid].monsterdex.includes(currHunt["active"].id)) {
                            userHunt[userid].monsterdex.push(currHunt["active"].id);
                            userHunt[userid].monsterdex.sort((firstEl, secondEl) => { 
                                if (Number(firstEl) < Number(secondEl)) {
                                    return -1;
                                }
                                if (Number(firstEl) > Number(secondEl)) {
                                    return 1;
                                }
                                return 0;
                            });
                        }

                        var damageDealt = Math.floor(((attack - currHunt["active"].defense) + (magic - currHunt["active"].magicdefense)) * ((Math.random() * 1) + 0.5));
                        if (damageDealt <= 0) {
                            damageDealt = 1;
                        }
                        if (damageDealt > currHunt["active"].currentHP) {
                            damageDealt = currHunt["active"].currentHP;
                        }

                        userHunt[userid].lastAttack = newTime.getTime();

                        currHunt["active"].currentHP -= damageDealt;
                        currHunt["active"].playerDamage[currHunt["active"].targets.indexOf(userid)] += damageDealt;
                        currHunt["active"].lastPlayerAttack = newTime.getTime();

                        if (currHunt["active"].currentHP <= 0) {
                            embedMsg.setTitle("Attack!");
                            embedMsg.setDescription(userData[userid].name + " lands the finishing blow on " + currHunt["active"].name + "!\n\n" + currHunt["active"].death);
                            embedMsg.setImage("https://c.tenor.com/1Sd82w25kacAAAAM/one-punch-man-punch.gif");
                            embedMsg.setColor("00FF00");
                            embedMsg.setFooter('HP: ' + currHunt["active"].currentHP + "/" + currHunt["active"].maxHP);

                            getDrops();

                            var rewardLevel = currHunt["active"].difficulty;
                            var goldReward = 2000 * rewardLevel;
                            var reward = "";
                            for (let i = 0; i < currHunt["active"].targets.length; i++) {
                                var player = currHunt["active"].targets[i];
                                var goldEarned = 0;
                                goldEarned += Math.floor(goldReward * (currHunt["active"].playerDamage[i] / currHunt["active"].maxHP));

                                var itemsEarned = "";
                                for (let i = 0; i < rewardLevel; i++) {
                                    var luck = Math.floor((Math.random() * 100000) + 1);
                                    var chance = 100000 * 0.01;
                                    if (luck <= chance) {
                                        var itemObtained = generateEquip(threestar[Math.floor(Math.random() * threestar.length)]);
                                        userHunt[player].equips.push(itemObtained);
                                        itemsEarned += ", " + items[itemObtained].name;
                                    }
                                }

                                for (let i = 0; i < rewardLevel; i++) {
                                    var luck = Math.floor((Math.random() * 100000) + 1);
                                    var chance = 100000 * 0.03;
                                    if (luck <= chance) {
                                        var itemObtained = generateEquip(twostar[Math.floor(Math.random() * twostar.length)]);
                                        userHunt[player].equips.push(itemObtained);
                                        itemsEarned += ", " + items[itemObtained].name;
                                    }
                                }

                                for (let i = 0; i < rewardLevel; i++) {
                                    var luck = Math.floor((Math.random() * 100000) + 1);
                                    var chance = 100000 * 0.05;
                                    if (luck <= chance) {
                                        var itemObtained = generateEquip(onestar[Math.floor(Math.random() * onestar.length)]);
                                        userHunt[player].equips.push(itemObtained);
                                        itemsEarned += ", " + items[itemObtained].name;
                                    }
                                }

                                for (let i = 0; i < rewardLevel; i++) {
                                    var luck = Math.floor((Math.random() * 100000) + 1);
                                    var chance = 100000 * 0.10;
                                    if (luck <= chance) {
                                        var itemObtained = generateEquip(zerostar[Math.floor(Math.random() * zerostar.length)]);
                                        userHunt[player].equips.push(itemObtained);
                                        itemsEarned += ", " + items[itemObtained].name;
                                    }
                                }

                                for (let i = 0; i < rewardLevel; i++) {
                                    var luck = Math.floor((Math.random() * 100000) + 1);
                                    var chance = 100000 * 0.20;
                                    if (luck <= chance) {
                                        var scrollobtained = scrolldrop[Math.floor(Math.random() * scrolldrop.length)];
                                        userHunt[player].scrolls.push(scrollobtained);
                                        itemsEarned += ", " + scrolls[scrollobtained].name;
                                    }
                                }

                                userData[player].points += goldEarned;
                                userHunt[player].currentHP = maxHP;
                                
                                reward += userData[player].name + " has been awarded with: " + goldEarned + " points" + itemsEarned + "\n";
                            }

                            const rewardMsg = new MessageEmbed();
                            rewardMsg.setTitle("Congrats!");
                            rewardMsg.setDescription(reward);
                            rewardMsg.setColor("FFF000");
                            rewardMsg.setFooter("Hooray!");
                            
                            for (let i = 0; i < currHunt["active"].channels.length; i++) {
                                currHunt["active"].channels[i].send({ embeds: [embedMsg] }).then(msg => 
                                    {
                                    setTimeout(() => {
                                        currHunt["active"].channels[i].send({ embeds: [rewardMsg] });
                                    }, 3000);
                                }).then(() => 
                                {
                                    setTimeout(() => {
                                        delete currHunt["active"];
                                        currHunt.lastSpawn = newTime.getTime();
                                    }, 300000);
                                });
                            }
                        }
                        else {
                            embedMsg.setTitle("Attack!");
                            embedMsg.setDescription(userData[userid].name + " deals " + damageDealt + " damage to " + currHunt["active"].name + "!");
                            embedMsg.setImage(randomAttackGifs[Math.floor(Math.random() * randomAttackGifs.length)]);
                            embedMsg.setColor("00FF00");
                            embedMsg.setFooter('HP: ' + currHunt["active"].currentHP + "/" + currHunt["active"].maxHP);
                            message.channel.send({ embeds: [embedMsg] });
                        }
                    }
                }
                else {
                    embedMsg.setTitle("Emptiness...");
                    embedMsg.setDescription("There is no boss!");
                    embedMsg.setImage("https://ze-robot.com/images/source/25034.jpg");
                    embedMsg.setFooter("Let's wait for a little longer...");
                    message.channel.send({ embeds: [embedMsg] });
                }
                break;
            case 'inv':
                var target = client.users.cache.get(userid);
                embedMsg.setAuthor({ name: userData[userid].name, iconURL: target.displayAvatarURL() });
                embedMsg.setTitle('Hunting Inventory');
                embedMsg.setColor('FFF000');
                if (userHunt[userid].equips.length == 0) {
                    embedMsg.setDescription('No equips :(');
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    var equipment = [""];
                    var index = 0;
                    var count = 0;
                    userHunt[userid].equips.forEach((element) => {
                        if (count >= 3) {
                            equipment[index] += "\n";
                            index++;
                            count = 0;
                            equipment.push("");
                        }
                        var standard = equips[items[element].name]
                        equipment[index] += "**__" + (userHunt[userid].equips.indexOf(element) + 1) + ". " + items[element].name + "__**⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀"
                        + "\nRarity: " + standard.rarity
                        + "\nMaxHP: " + (items[element].maxHP + standard.maxHP) + "(+" + items[element].maxHP + ")"
                        + "\nAttack: " + (items[element].attack + standard.attack) + "(+" + items[element].attack + ")"
                        + "\nMagic: " + (items[element].magic + standard.magic) + "(+" + items[element].magic + ")"
                        + "\nDefense: " + (items[element].defense + standard.defense) + "(+" + items[element].defense + ")"
                        + "\nSpeed: " + (items[element].speed + standard.speed) + "(+" + items[element].speed + ")"
                        + "\n\n";
                        count++;
                    });

                    let pages = [];
                    for (let i = 0; i < equipment.length; i++) {
                        pages.push(equipment[i]);
                    }

                    let page = 1;
                    embedMsg
                        .setFooter(`Page ${page} of ${pages.length}`)
                        .setDescription(pages[page-1])
                        .setAuthor({ name: userData[userid].name, iconURL: target.displayAvatarURL() })
                        .setTitle('Hunting Inventory')
                        .setColor('FFF000');

                    message.channel.send({ embeds: [embedMsg] }).then(msg => {
                        msg.react("◀️").then(r => {
                            msg.react("▶️")

                            const filter = (reaction, user) => ["◀️", "▶️"].includes(reaction.emoji.name) && user.id === userid;
                            const collector = msg.createReactionCollector({ filter, time: 1000 * 30 });

                            collector.on('collect', r => {
                                embedMsg.setAuthor({ name: userData[userid].name, iconURL: target.displayAvatarURL() });
                                embedMsg.setTitle('Hunting Inventory');
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
            case 'equip':
                if (args.length < 2) {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription('Please select an item to equip!');
                    embedMsg.setFooter("Look at __!tp hunt inv__ and select a number!")
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    var target = args[1];
                    if (!isNaN(Number(target))) {
                        target = Math.floor(target);
                        if (target > userHunt[userid].equips.length || target <= 0) {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription('Please select a valid equipment # from equipments!');
                            embedMsg.setFooter("Look at __!tp hunt inv__ and select a number!")
                            message.channel.send({ embeds: [embedMsg] });
                        }
                        else {
                            var selected = userHunt[userid].equips[target-1];
                            userHunt[userid].equips.splice(target-1, 1);
                            switch(items[selected].type) {
                                case 0:
                                    if (userHunt[userid].weapon != "000000") {
                                        userHunt[userid].equips.push(userHunt[userid].weapon);
                                    }
                                    userHunt[userid].weapon = selected;
                                    break;
                                case 1:
                                    if (userHunt[userid].armor != "000000") {
                                        userHunt[userid].equips.push(userHunt[userid].armor);
                                    }
                                    userHunt[userid].armor = selected;
                                    break;
                                case 2:
                                    if (userHunt[userid].accessory != "000000") {
                                        userHunt[userid].equips.push(userHunt[userid].accessory);
                                    }
                                    userHunt[userid].accessory = selected;
                                    break;
                            }
                            updateStats();
                            embedMsg.setTitle('Equiped!');
                            embedMsg.setColor('00FF00');
                            embedMsg.setDescription('You equiped ' + items[selected].name);
                            message.channel.send({ embeds: [embedMsg] });
                        }
                    }
                    else {
                        embedMsg.setTitle('Error!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription('Please select a valid equipment # from equipments!');
                        message.channel.send({ embeds: [embedMsg] });
                    }
                }
                break;
            case 'unequip':
                if (args.length < 2) {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription('Please select weapon/armor/acc to unequip!');
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    var choice = args[1];
                    switch (choice) {
                        case "weapon":
                            if (userHunt[userid].weapon != "000000") {
                                userHunt[userid].equips.push(userHunt[userid].weapon);
                                userHunt[userid].weapon = "000000";
                                updateStats();
                                embedMsg.setTitle('Unequiped!');
                                embedMsg.setColor('00FF00');
                                embedMsg.setDescription('Successfully unequiped weapon!');
                                message.channel.send({ embeds: [embedMsg] });
                            }
                            else {
                                embedMsg.setTitle('Error!');
                                embedMsg.setColor('FF0000');
                                embedMsg.setDescription('You don\'t have anything equiped!');
                                message.channel.send({ embeds: [embedMsg] });
                            }
                            break;
                        case "armor":
                            if (userHunt[userid].armor != "000000") {
                                userHunt[userid].equips.push(userHunt[userid].armor);
                                userHunt[userid].armor = "000000";
                                updateStats();
                                embedMsg.setTitle('Unequiped!');
                                embedMsg.setColor('00FF00');
                                embedMsg.setDescription('Successfully unequiped armor!');
                                message.channel.send({ embeds: [embedMsg] });
                            }
                            else {
                                embedMsg.setTitle('Error!');
                                embedMsg.setColor('FF0000');
                                embedMsg.setDescription('You don\'t have anything equiped!');
                                message.channel.send({ embeds: [embedMsg] });
                            }
                            break;
                        case "accessory":
                        case "acc":
                            if (userHunt[userid].accessory != "000000") {
                                userHunt[userid].equips.push(userHunt[userid].accessory);
                                userHunt[userid].accessory = "000000";
                                updateStats();
                                embedMsg.setTitle('Unequiped!');
                                embedMsg.setColor('00FF00');
                                embedMsg.setDescription('Successfully unequiped accessory!');
                                message.channel.send({ embeds: [embedMsg] });
                            }
                            else {
                                embedMsg.setTitle('Error!');
                                embedMsg.setColor('FF0000');
                                embedMsg.setDescription('You don\'t have anything equiped!');
                                message.channel.send({ embeds: [embedMsg] });
                            }
                            break;
                        default:
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription('Please select weapon/armor/acc to unequip!');
                            message.channel.send({ embeds: [embedMsg] });
                            break;
                    }
                }
                break;
            case 'scroll':
                if (args.length < 2) {
                    var target = client.users.cache.get(userid);
                    embedMsg.setAuthor({ name: userData[userid].name, iconURL: target.displayAvatarURL() });
                    embedMsg.setTitle('Scroll Inventory');
                    embedMsg.setColor('FFF000');
                    if (userHunt[userid].scrolls.length == 0) {
                        embedMsg.setDescription('No scrolls :(');
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else {
                        var allscrolls = [""];
                        var index = 0;
                        var count = 0;
                        userHunt[userid].scrolls.forEach((element) => {
                            if (count >= 3) {
                                allscrolls[index] += "\n";
                                index++;
                                count = 0;
                                allscrolls.push("");
                            }
                            allscrolls[index] += "**__" + (userHunt[userid].scrolls.indexOf(element) + 1) + ". " + scrolls[element].name + "__**⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀"
                            + "\nMaxHP: " + (scrolls[element].maxHP) 
                            + "\nAttack: " + (scrolls[element].attack)
                            + "\nMagic: " + (scrolls[element].magic) 
                            + "\nDefense: " + (scrolls[element].defense)
                            + "\nSpeed: " + (scrolls[element].speed)
                            + "\n\n";
                            count++;
                        });

                        let pages = [];
                        for (let i = 0; i < allscrolls.length; i++) {
                            pages.push(allscrolls[i]);
                        }

                        let page = 1;
                        embedMsg
                            .setFooter(`Page ${page} of ${pages.length}` + "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ To use scroll - !tp scroll weapon/armor/acc #")
                            .setDescription(pages[page-1])
                            .setAuthor({ name: userData[userid].name, iconURL: target.displayAvatarURL() })
                            .setTitle('Scroll Inventory')
                            .setColor('FFF000');

                        message.channel.send({ embeds: [embedMsg] }).then(msg => {
                            msg.react("◀️").then(r => {
                                msg.react("▶️")

                                const filter = (reaction, user) => ["◀️", "▶️"].includes(reaction.emoji.name) && user.id === userid;
                                const collector = msg.createReactionCollector({ filter, time: 1000 * 30 });

                                collector.on('collect', r => {
                                    embedMsg.setAuthor({ name: userData[userid].name, iconURL: target.displayAvatarURL() });
                                    embedMsg.setTitle('Scroll Inventory');
                                    embedMsg.setColor('FFF000');
                                    
                                    if (r.emoji.name === "◀️") {
                                        if (page === 1) {
                                            r.users.remove(userid);
                                            return;
                                        }
                                        page--;
                                        embedMsg.setDescription(pages[page-1]);
                                        embedMsg.setFooter(`Page ${page} of ${pages.length}` + "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ To use scroll - !tp scroll weapon/armor/acc #");
                                        msg.edit({ embeds: [embedMsg] });
                                    }
                                    else if (r.emoji.name === "▶️") {
                                        if (page === pages.length) {
                                            r.users.remove(userid);
                                            return;
                                        }
                                        page++;
                                        embedMsg.setDescription(pages[page-1]);
                                        embedMsg.setFooter(`Page ${page} of ${pages.length}` + "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ To use scroll - !tp scroll weapon/armor/acc #");
                                        msg.edit({ embeds: [embedMsg] });
                                    }
                                    r.users.remove(userid);
                                })

                            })
                        });
                    }
                }
                else {
                    var choice = args[1];
                    var selectedindex = Math.floor(Number(args[2])) - 1;

                    if (!isNaN(selectedindex) && selectedindex >= 0 && selectedindex < userHunt[userid].scrolls.length) {
                        theScroll = scrolls[userHunt[userid].scrolls[selectedindex]];
                        switch (choice) {
                            case "weapon":
                                if (userHunt[userid].weapon != "000000") {
                                    var luck = Math.floor((Math.random() * 100000) + 1);
                                    var chance = 100000 * theScroll.rate;
                                    if (luck <= chance) {
                                        items[userHunt[userid].weapon].maxHP += theScroll.maxHP;
                                        items[userHunt[userid].weapon].attack += theScroll.attack;
                                        items[userHunt[userid].weapon].magic += theScroll.magic;
                                        items[userHunt[userid].weapon].defense += theScroll.defense;
                                        items[userHunt[userid].weapon].speed += theScroll.speed;
                                        updateStats();
                                        embedMsg.setTitle('Success!');
                                        embedMsg.setColor('00FF00');
                                        embedMsg.setThumbnail('https://i.imgur.com/eIJkAV4.gif');
                                        embedMsg.setDescription('The scroll lights up, and then its mysterious power has been transferred to the item.');
                                        message.channel.send({ embeds: [embedMsg] });
                                    }
                                    else {
                                        embedMsg.setTitle('Oh nyo!');
                                        embedMsg.setColor('FF0000');
                                        embedMsg.setThumbnail('https://i.imgur.com/M5HiLwr.gif');
                                        embedMsg.setDescription('The scroll lights up, but the item winds up as if nothing happened.');
                                        message.channel.send({ embeds: [embedMsg] });
                                    }
                                }
                                else {
                                    embedMsg.setTitle('Error!');
                                    embedMsg.setColor('FF0000');
                                    embedMsg.setDescription('You don\'t have anything equiped!');
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                break;
                            case "armor":
                                if (userHunt[userid].armor != "000000") {
                                    var luck = Math.floor((Math.random() * 100000) + 1);
                                    var chance = 100000 * theScroll.rate;
                                    if (luck <= chance) {
                                        theScroll = scrolls[userHunt[userid].scrolls[selectedindex]];
                                        items[userHunt[userid].armor].maxHP += theScroll.maxHP;
                                        items[userHunt[userid].armor].attack += theScroll.attack;
                                        items[userHunt[userid].armor].magic += theScroll.magic;
                                        items[userHunt[userid].armor].defense += theScroll.defense;
                                        items[userHunt[userid].armor].speed += theScroll.speed;
                                        updateStats();
                                        embedMsg.setTitle('Success!');
                                        embedMsg.setColor('00FF00');
                                        embedMsg.setThumbnail('https://i.imgur.com/eIJkAV4.gif');
                                        embedMsg.setDescription('The scroll lights up, and then its mysterious power has been transferred to the item.');
                                        message.channel.send({ embeds: [embedMsg] });
                                    }
                                    else {
                                        embedMsg.setTitle('Oh nyo!');
                                        embedMsg.setColor('FF0000');
                                        embedMsg.setThumbnail('https://i.imgur.com/M5HiLwr.gif');
                                        embedMsg.setDescription('The scroll lights up, but the item winds up as if nothing happened.');
                                        message.channel.send({ embeds: [embedMsg] });
                                    }
                                }
                                else {
                                    embedMsg.setTitle('Error!');
                                    embedMsg.setColor('FF0000');
                                    embedMsg.setDescription('You don\'t have anything equiped!');
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                break;
                            case "accessory":
                            case "acc":
                                if (userHunt[userid].accessory != "000000") {
                                    var luck = Math.floor((Math.random() * 100000) + 1);
                                    var chance = 100000 * theScroll.rate;
                                    if (luck <= chance) {
                                        theScroll = scrolls[userHunt[userid].scrolls[selectedindex]];
                                        items[userHunt[userid].accessory].maxHP += theScroll.maxHP;
                                        items[userHunt[userid].accessory].attack += theScroll.attack;
                                        items[userHunt[userid].accessory].magic += theScroll.magic;
                                        items[userHunt[userid].accessory].defense += theScroll.defense;
                                        items[userHunt[userid].accessory].speed += theScroll.speed;
                                        updateStats();
                                        embedMsg.setTitle('Success!');
                                        embedMsg.setColor('00FF00');
                                        embedMsg.setThumbnail('https://i.imgur.com/eIJkAV4.gif');
                                        embedMsg.setDescription('The scroll lights up, and then its mysterious power has been transferred to the item.');
                                        message.channel.send({ embeds: [embedMsg] });
                                    }
                                    else {
                                        embedMsg.setTitle('Oh nyo!');
                                        embedMsg.setColor('FF0000');
                                        embedMsg.setThumbnail('https://i.imgur.com/M5HiLwr.gif');
                                        embedMsg.setDescription('The scroll lights up, but the item winds up as if nothing happened.');
                                        message.channel.send({ embeds: [embedMsg] });
                                    }
                                }
                                else {
                                    embedMsg.setTitle('Error!');
                                    embedMsg.setColor('FF0000');
                                    embedMsg.setDescription('You don\'t have anything equiped!');
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                break;
                            default:
                                embedMsg.setTitle('Error!');
                                embedMsg.setColor('FF0000');
                                embedMsg.setDescription('Please select weapon/armor/acc to scroll!');
                                message.channel.send({ embeds: [embedMsg] });
                                break;
                        }
                        userHunt[userid].scrolls.splice(selectedindex, 1);
                    }
                    else {
                        embedMsg.setTitle('Error!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription('Please select a scroll in your inventory!');
                        message.channel.send({ embeds: [embedMsg] });
                    }
                }
                break;
            case 'give':
                if (args.length < 4) {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription('Please @ the user, select weapon/scroll, and index to give!');
                    embedMsg.setFooter("Look at __!tp hunt inv/scroll__ and select a number!")
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    var mention = args[1];
                    var choice = args[2];
                    var index = Math.floor(Number(args[3]) - 1);

                    if (mention.startsWith('<@') && mention.endsWith('>')) {
                        mention = mention.slice(2, -1);
                
                        if (mention.startsWith('!')) {
                            mention = mention.slice(1);
                        }
                
                        if (!userData[mention]) {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription('User does not exist!');
                            message.channel.send({ embeds: [embedMsg] });
                            return;
                        }
                        if (userData[mention] == userData[userid]) {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription('You can\'t marry yourself!');
                            message.channel.send({ embeds: [embedMsg] });
                            return;
                        }
                        
                        if (!isNaN(index)) {
                            switch(choice) {
                                case "weapon":
                                    if (index > userHunt[userid].equips.length || index < 0) {
                                        embedMsg.setTitle('Error!');
                                        embedMsg.setColor('FF0000');
                                        embedMsg.setDescription('Please select a valid equipment # from equipments!');
                                        embedMsg.setFooter("Look at __!tp hunt inv__ and select a number!")
                                        message.channel.send({ embeds: [embedMsg] });
                                    }
                                    else {
                                        const proposalMsg = new MessageEmbed();
                                        proposalMsg.setTitle('Give Item!');
                                        proposalMsg.setColor('FFF000');
                                        proposalMsg.setDescription("Would you like to give " + items[userHunt[userid].equips[index]].name + " to " + userData[mention].name + "?");
                        
                                        
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
                                                        var selected = userHunt[userid].equips[index];
                                                        userHunt[mention].equips.push(userHunt[userid].equips[index]);
                                                        userHunt[userid].equips.splice(index, 1);

                                                        embedMsg.setTitle('Success!');
                                                        embedMsg.setColor('00FF00');
                                                        embedMsg.setDescription(userData[userid].name + " gave " + userData[mention].name + " " + items[selected].name + "!");
                                                        message.channel.send({ embeds: [embedMsg] });
                                                    } else {
                                                        embedMsg.setTitle('Error!');
                                                        embedMsg.setColor('FF0000');
                                                        embedMsg.setDescription(userData[userid].name + " changed their mind!");
                                                        message.channel.send({ embeds: [embedMsg] });
                                                    }
                                                })
                                                .catch(collected => {
                                                    embedMsg.setTitle('Error!');
                                                    embedMsg.setColor('FF0000');
                                                    embedMsg.setDescription(userData[userid].name + " took too long to decide!");
                                                    message.channel.send({ embeds: [embedMsg] });
                                                });
                                            }
                                        );
                                    }
                                    break;
                                case "scroll":
                                    if (index > userHunt[userid].scrolls.length || index < 0) {
                                        embedMsg.setTitle('Error!');
                                        embedMsg.setColor('FF0000');
                                        embedMsg.setDescription('Please select a valid equipment # from equipments!');
                                        embedMsg.setFooter("Look at __!tp hunt inv__ and select a number!")
                                        message.channel.send({ embeds: [embedMsg] });
                                    }
                                    else {
                                        const proposalMsg = new MessageEmbed();
                                        proposalMsg.setTitle('Give Item!');
                                        proposalMsg.setColor('FFF000');
                                        proposalMsg.setDescription("Would you like to give " + scrolls[userHunt[userid].scrolls[index]].name + " to " + userData[mention].name + "?");
                        
                                        
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
                                                        var selected = userHunt[userid].scrolls[index];
                                                        userHunt[mention].scrolls.push(userHunt[userid].scrolls[index]);
                                                        userHunt[userid].scrolls.splice(index, 1);

                                                        embedMsg.setTitle('Success!');
                                                        embedMsg.setColor('00FF00');
                                                        embedMsg.setDescription(userData[userid].name + " gave " + userData[mention].name + " " + scrolls[selected].name + "!");
                                                        message.channel.send({ embeds: [embedMsg] });
                                                    } else {
                                                        embedMsg.setTitle('Error!');
                                                        embedMsg.setColor('FF0000');
                                                        embedMsg.setDescription(userData[userid].name + " declined!");
                                                        message.channel.send({ embeds: [embedMsg] });
                                                    }
                                                })
                                                .catch(collected => {
                                                    embedMsg.setTitle('Error!');
                                                    embedMsg.setColor('FF0000');
                                                    embedMsg.setDescription(userData[userid].name + " took too long to decide!");
                                                    message.channel.send({ embeds: [embedMsg] });
                                                });
                                            }
                                        );
                                    }
                                    break;
                                default:
                                    embedMsg.setTitle('Error!');
                                    embedMsg.setColor('FF0000');
                                    embedMsg.setDescription('Please select either weapon/scroll!');
                                    message.channel.send({ embeds: [embedMsg] });
                                    break;
                            }
                        }
                        else {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription('Please select a valid index from weapon/scroll!');
                            message.channel.send({ embeds: [embedMsg] });
                        }
                    }
                    else {
                        embedMsg.setTitle('Error!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription('Please @ a user!');
                        message.channel.send({ embeds: [embedMsg] });
                    }
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
                    var type = args[1];
                    var target = Math.floor(Number(args[2]) - 1);
                    if (!isNaN(target)) {
                        var profit = 0;
                        switch(type) {
                            case "weapon":
                                if (target < 0 || target >= userHunt[userid].equips.length) {
                                    embedMsg.setTitle('Error!');
                                    embedMsg.setColor('FF0000');
                                    embedMsg.setDescription('Weapon does not exist!');
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                else {
                                    var selectedWeapon = equips[items[userHunt[userid].equips[target]].name];
                                    if (selectedWeapon.rarity != 0) {
                                        var price = selectedWeapon.rarity * 1000;
                                    }
                                    else {
                                        var price = 500;
                                    }
                                    const proposalMsg = new MessageEmbed();
                                    proposalMsg.setTitle('Selling!');
                                    proposalMsg.setColor('FFF000');
                                    proposalMsg.setDescription("Would " + userData[userid].name + " like to sell " + selectedWeapon.name + " for " + price + " points?");
        
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
                                                    userData[userid].points += price;
                                                    var itemToDelete = userHunt[userid].equips[target];
                                                    userHunt[userid].equips.splice(target, 1);
                                                    delete items[itemToDelete];
                                                    embedMsg.setTitle('Sold!');
                                                    embedMsg.setColor('00FF00');
                                                    embedMsg.setDescription(userData[userid].name + " sold " + selectedWeapon.name + " for " + price + " points!");
                                                    message.channel.send({ embeds: [embedMsg] });
                                                } 
                                                else {
                                                    embedMsg.setTitle('Declined!');
                                                    embedMsg.setColor('FF0000');
                                                    embedMsg.setDescription(userData[userid].name + " declined!");
                                                    message.channel.send({ embeds: [embedMsg] });
                                                }
                                            })
                                            .catch(collected => {
                                                embedMsg.setTitle('Fail!');
                                                embedMsg.setColor('FF0000');
                                                embedMsg.setDescription(userData[userid].name + " took too long to respond!");
                                                message.channel.send({ embeds: [embedMsg] });
                                            });
                                        }
                                    );
                                }
                                break;
                            case "scroll":
                                if (target < 0 || target >= userHunt[userid].scrolls.length) {
                                    embedMsg.setTitle('Error!');
                                    embedMsg.setColor('FF0000');
                                    embedMsg.setDescription('Weapon does not exist!');
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                else {
                                    var selectedScroll = scrolls[userHunt[userid].scrolls[target]];
                                    var price = 1000;
                                    const proposalMsg = new MessageEmbed();
                                    proposalMsg.setTitle('Selling!');
                                    proposalMsg.setColor('FFF000');
                                    proposalMsg.setDescription("Would " + userData[userid].name + " like to sell " + selectedScroll.name + " for " + price + " points?");
        
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
                                                    userData[userid].points += price;
                                                    userHunt[userid].scrolls.splice(target, 1)
                                                    embedMsg.setTitle('Sold!');
                                                    embedMsg.setColor('00FF00');
                                                    embedMsg.setDescription(userData[userid].name + " sold " + selectedScroll.name + " for " + price + " points!");
                                                    message.channel.send({ embeds: [embedMsg] });
                                                } 
                                                else {
                                                    embedMsg.setTitle('Declined!');
                                                    embedMsg.setColor('FF0000');
                                                    embedMsg.setDescription(userData[userid].name + " declined!");
                                                    message.channel.send({ embeds: [embedMsg] });
                                                }
                                            })
                                            .catch(collected => {
                                                embedMsg.setTitle('Fail!');
                                                embedMsg.setColor('FF0000');
                                                embedMsg.setDescription(userData[userid].name + " took too long to respond!");
                                                message.channel.send({ embeds: [embedMsg] });
                                            });
                                        }
                                    );
                                }
                                break;
                            default:
                                break;
                        }
                    }
                    else {
                        embedMsg.setTitle('Error!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription('Please enter which index to sell!');
                        embedMsg.setFooter('');
                        message.channel.send({ embeds: [embedMsg] });
                    }
                }
                break;
            case 'dex':
            case 'monsterdex':
                var target = client.users.cache.get(userid);
                embedMsg.setAuthor({ name: userData[userid].name, iconURL: target.displayAvatarURL() });
                embedMsg.setTitle('Monsterdex');
                embedMsg.setThumbnail('https://i.imgur.com/liDWgLr.png');
                embedMsg.setColor('FFF000');
                if (args.length > 1) {
                    var selected = args[1];
                    if (!isNaN(Number(selected)) && monsterdex[selected] && userHunt[userid].monsterdex.includes(selected)) {
                        var stars = " (";
                        for (let i = 0; i < monsterdex[selected].difficulty; i++) {
                            stars += "★";
                        }
                        stars += ")"
                        embedMsg.setDescription("#" + monsterdex[selected].id + ". " + monsterdex[selected].name + stars + "\n");
                        embedMsg.setThumbnail(monsterdex[selected].image);
                        embedMsg.addField('Monsterdex Entry', "" + monsterdex[selected].info);
                        embedMsg.addField('MaxHP', "" + monsterdex[selected].maxHP);
                        embedMsg.addField('Attack', "" + monsterdex[selected].attack);
                        embedMsg.addField('Defense', "" + monsterdex[selected].defense);
                        embedMsg.addField('Magic Defense', "" + monsterdex[selected].magicdefense);
                        embedMsg.addField('Speed', "" + (monsterdex[selected].attackCD / 1000) + "s");
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else {
                        embedMsg.setDescription('You never encountered this monster or it does not exist!');
                        message.channel.send({ embeds: [embedMsg] }); 
                    }
                }
                else {
                    var monsters = [""];
                    var index = 0;
                    var count = 0;
                    var keys = [];
                    for (var k in monsterdex) {
                        keys.push(k);
                    }
                    for (let i = 1; i < keys.length + 1; i++) {
                        if (count >= 10) {
                            index++;
                            count = 0;
                            monsters[index] = "";
                        }
                        if (userHunt[userid].monsterdex.includes(i.toString())) {
                            monsters[index] += "#" + monsterdex[i].id + ". " + monsterdex[i].name + "\n";
                        }
                        else {
                            monsters[index] += "#" + monsterdex[i].id + ". ???\n";
                        }
                        count++;
                    }

                    let pages = [];
                    for (let i = 0; i < monsters.length; i++) {
                        pages.push("```" + monsters[i] + "```");
                    }

                    let page = 1;
                    embedMsg
                        .setFooter(`Page ${page} of ${pages.length}`)
                        .setDescription(pages[page-1])
                        .setAuthor({ name: userData[userid].name, iconURL: target.displayAvatarURL() })
                        .setTitle('Monsterdex')
                        .setThumbnail('https://i.imgur.com/liDWgLr.png')
                        .setColor('FFF000');

                    message.channel.send({ embeds: [embedMsg] }).then(msg => {
                        msg.react("◀️").then(r => {
                            msg.react("▶️")

                            const filter = (reaction, user) => ["◀️", "▶️"].includes(reaction.emoji.name) && user.id === userid;
                            const collector = msg.createReactionCollector({ filter, time: 1000 * 30 });

                            collector.on('collect', r => {
                                embedMsg.setAuthor({ name: userData[userid].name, iconURL: target.displayAvatarURL() });
                                embedMsg.setTitle('Monsterdex');
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
                embedMsg.setTitle('Invalid hunting command!');
                embedMsg.setColor('FF0000');
                embedMsg.setDescription('Use __!tp hunt help__ for list of hunting commands!');
                embedMsg.setThumbnail("https://4.bp.blogspot.com/-DV8zj3oNPO8/XZKl8Y1_KkI/AAAAAAAMsvI/HEq47t0TPmYhX0b2igMkkxbcPQPbUXR2gCLcBGAsYHQ/s1600/AS0005827_02.gif");
                message.channel.send({ embeds: [embedMsg] });
                break;
        }
    }
}
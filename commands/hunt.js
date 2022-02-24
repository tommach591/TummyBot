module.exports = {
    name: 'hunt',
    description: "Hunt for honor and glory!",

    execute(message, args, userid, userData, userHunt, monsterdex, currHunt, items, equips, scrolls, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();
        const randomAttackGifs = [
            "https://i.imgur.com/O62yU0U.gif", // Starburst Stream
            "https://c.tenor.com/O0Rd9v0NpjkAAAAC/keqing-genshin-impact.gif", // Keqing Q
            "https://c.tenor.com/fG4HO_ccb68AAAAC/anime-my-hero-academia.gif", // Deku Smash
            "https://c.tenor.com/kWtHiHKx0EYAAAAd/naruto-vs.gif", // Uzumaki Barrage
            "https://i.makeagif.com/media/8-02-2015/0jqzEj.gif", // Night Guy
            "https://c.tenor.com/P951zVBB_vkAAAAC/ao-t-shingeki-no-kyojin.gif", // Levi Spin
            "https://c.tenor.com/IM60lqQKKY0AAAAC/kid-goku-kamehameha.gif", // Goku Kamehameha
            "https://c.tenor.com/xc19_U9dSNMAAAAC/chika-fujiwara-hit.gif", // Chika Fan
            "https://c.tenor.com/Oxl7m7l88FwAAAAC/megumin-konosuba.gif", // Explosion
            "https://c.tenor.com/w9MEZlRNxOUAAAAC/sword-art-online-sinon-asada.gif", // Sinon Gun
            "https://c.tenor.com/p7fVqdR0FWkAAAAC/punch-vi.gif", // Vi Punch
            "https://i.makeagif.com/media/8-26-2017/pcdhp5.gif", // MHW Greatsword
            "https://thumbs.gfycat.com/BlackandwhiteTangibleCero-size_restricted.gif", // Haru All Out Attack
            "https://c.tenor.com/FPBEXi3f8sQAAAAd/rock-lee-hidden-lotus.gif", // Rock Lee Hidden Lotus
            "https://i.makeagif.com/media/4-19-2017/F5U3KL.gif", // Windwaker Ganon Plunge
            "https://thumbs.gfycat.com/AcademicAltruisticAsianwaterbuffalo-size_restricted.gif", // MHW Longsword
            "https://i.imgur.com/Db207vf.gif", // MHR SnS
            "https://i.imgur.com/JiiWAYm.gif", // Vi and Cait Vs Urgot
            "https://media0.giphy.com/media/dyjrpqaUVqCELGuQVr/giphy.gif", // Demon Slayer Tanjiro
            "https://www.icegif.com/wp-content/uploads/demon-slayer-icegif-1.gif", // Demon Slayer Zenitsu
            "https://i.imgur.com/jOJhpgq.gif", // Eris Vs Ruijerd
            "https://i.imgur.com/7uTs615.gif", // Phoenix Molly
            "https://i.imgur.com/VIoBlJq.gif" // Yoru Ult
        ];

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
                slots: (equips[itemName].rarity * 10) + 5
            }
            return id;
        }

        var unqiueDrops = [];
        var threestar = [];
        var twostar = [];
        var onestar = [];
        var zerostar = [];
        var scrolldrop = [];

        let getDrops = () => {
            for (var k in equips) {
                switch(equips[k].rarity) {
                    case 0:
                        if (k != "Nothing") {
                            zerostar.push(k);
                        }
                        break;
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
                        break;
                }
            }

            if (currHunt["active"].loot.length != 0) {
                unqiueDrops = currHunt["active"].loot;
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

            if (maxHP < 1) {
                maxHP = 1;
            }
            if (attack < 0) {
                attack = 0;
            }
            if (magic < 0) {
                magic = 0;
            }
            if (defense < 0) {
                defense = 0;
            }

            if (!currHunt["active"] || currHunt["active"].currentHP <= 0 || currHunt["active"].retreated) {
                userHunt[userid].currentHP = maxHP;
            }
        }

        updateStats();

        var command = args[0];
        switch(command) {
            case 'help':
                const huntingCommands = new Map();
                huntingCommands.set('help', 'Displays list of hunting commands.');
                huntingCommands.set('info', 'Displays hunting info.');
                huntingCommands.set('gear', 'Displays equipped item info.');
                huntingCommands.set('boss', 'Checks current boss.');
                huntingCommands.set('attack', 'Attack the boss if active!');
                huntingCommands.set('inv', 'Display inventory.');
                huntingCommands.set('equip #', 'Equip an item from the index of your inventory.');
                huntingCommands.set('unequip weapon/armor/acc', 'Unequip an item.');
                huntingCommands.set('scroll weapon/armor/acc #', 'Select a scroll from scroll inventory to use on one type of equipment you are wearing.');
                huntingCommands.set('give name equip/scroll #', 'Give an item from equip or scroll inventory at that index.');
                huntingCommands.set('sell equip/scroll #', 'Sell an item from equip or scroll inventory at that index.');
                huntingCommands.set('dex', 'Shows unique monsters you have fought.');

                embedMsg.setTitle('List of Hunting Commands');
                embedMsg.setColor('FFF000');

                huntingCommands.forEach((values, keys)=> {
                    embedMsg.addField("!tp hunt " + keys, values);
                });

                message.channel.send({ embeds: [embedMsg] });
                break;
            case 'info':
                var newTime = new Date();
                var target = client.users.cache.get(userid);
                embedMsg.setTitle('Hunting Equipment');
                embedMsg.setAuthor({ name: userData[userid].name, iconURL: target.displayAvatarURL() });
                embedMsg.setThumbnail(target.displayAvatarURL());
                embedMsg.setColor('FFF000');

                var stats = "Max HP: " + maxHP.toString() + "\nAttack: " + attack.toString() + "\nMagic: " + magic.toString() + "\nDefense: " + defense.toString() + "\nSpeed: " + speed.toString() + "\n";
                var currentCondition = "HP: " + userHunt[userid].currentHP + "\nRespawn: ";
                
                var respawntime = Math.floor((1000 * 180 - (newTime.getTime() - userHunt[userid].deathTime)) / 1000);
                if (userHunt[userid].currentHP <= 0 && currHunt["active"] && currHunt["active"].currentHP > 0 && !currHunt["active"].retreated && respawntime > 0) {
                    currentCondition += respawntime.toString() + "s\n";
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
            case 'gear':
                var target = client.users.cache.get(userid);
                embedMsg.setTitle('Equiped Gear');
                embedMsg.setAuthor({ name: userData[userid].name, iconURL: target.displayAvatarURL() });
                embedMsg.setThumbnail(target.displayAvatarURL());
                embedMsg.setColor('FFF000');

                var weapon = items[userHunt[userid].weapon];
                var armor = items[userHunt[userid].armor];
                var accessory = items[userHunt[userid].accessory];

                var baseWeapon = equips[weapon.name];
                var baseArmor = equips[armor.name];
                var baseAccessory = equips[accessory.name];

                var weaponMaxHP = weapon.maxHP.toString();
                var weaponAttack = weapon.attack.toString();
                var weaponMagic = weapon.magic.toString();
                var weaponDefense = weapon.defense.toString();
                var weaponSpeed = weapon.speed.toString();
                
                var armorMaxHP = armor.maxHP.toString();
                var armorAttack = armor.attack.toString();
                var armorMagic = armor.magic.toString();
                var armorDefense = armor.defense.toString();
                var armorSpeed = armor.speed.toString();

                var accessoryMaxHP = accessory.maxHP.toString();
                var accessoryAttack = accessory.attack.toString();
                var accessoryMagic = accessory.magic.toString();
                var accessoryDefense = accessory.defense.toString();
                var accessorySpeed = accessory.speed.toString();

                if (weapon.maxHP >= 0) weaponMaxHP = "+" + weaponMaxHP;
                if (weapon.attack >= 0) weaponAttack = "+" + weaponAttack;
                if (weapon.magic >= 0) weaponMagic = "+" + weaponMagic;
                if (weapon.defense >= 0) weaponDefense = "+" + weaponDefense;
                if (weapon.speed >= 0) weaponSpeed = "+" + weaponSpeed;

                if (armor.maxHP >= 0) armorMaxHP = "+" + armorMaxHP;
                if (armor.attack >= 0) armorAttack = "+" + armorAttack;
                if (armor.magic >= 0) armorMagic = "+" + armorMagic;
                if (armor.defense >= 0) armorDefense = "+" + armorDefense;
                if (armor.speed >= 0) armorSpeed = "+" + armorSpeed;

                if (accessory.maxHP >= 0) accessoryMaxHP = "+" + accessoryMaxHP;
                if (accessory.attack >= 0) accessoryAttack = "+" + accessoryAttack;
                if (accessory.magic >= 0) accessoryMagic = "+" + accessoryMagic;
                if (accessory.defense >= 0) accessoryDefense = "+" + accessoryDefense;
                if (accessory.speed >= 0) accessorySpeed = "+" + accessorySpeed;


                var weaponText = "\nRarity: " + baseWeapon.rarity
                + "\nMaxHP: " + (weapon.maxHP + baseWeapon.maxHP) + " (" + weaponMaxHP + ")"
                + "\nAttack: " + (weapon.attack + baseWeapon.attack) + " (" + weaponAttack + ")"
                + "\nMagic: " + (weapon.magic + baseWeapon.magic) + " (" + weaponMagic + ")"
                + "\nDefense: " + (weapon.defense + baseWeapon.defense) + " (" + weaponDefense + ")"
                + "\nSpeed: " + (weapon.speed + baseWeapon.speed) + " (" + weaponSpeed + ")"
                + "\nSlots: " + weapon.slots
                + "\n\n";

                var armorText = "\nRarity: " + baseArmor.rarity
                + "\nMaxHP: " + (armor.maxHP + baseArmor.maxHP) + " (" + armorMaxHP + ")"
                + "\nAttack: " + (armor.attack + baseArmor.attack) + " (" + armorAttack + ")"
                + "\nMagic: " + (armor.magic + baseArmor.magic) + " (" + armorMagic + ")"
                + "\nDefense: " + (armor.defense + baseArmor.defense) + " (" + armorDefense + ")"
                + "\nSpeed: " + (armor.speed + baseArmor.speed) + " (" + armorSpeed + ")"
                + "\nSlots: " + armor.slots
                + "\n\n";

                var accessoryText = "\nRarity: " + baseAccessory.rarity
                + "\nMaxHP: " + (accessory.maxHP + baseAccessory.maxHP) + " (" + accessoryMaxHP + ")"
                + "\nAttack: " + (accessory.attack + baseAccessory.attack) + " (" + accessoryAttack + ")"
                + "\nMagic: " + (accessory.magic + baseAccessory.magic) + " (" + accessoryMagic + ")"
                + "\nDefense: " + (accessory.defense + baseAccessory.defense) + " (" + accessoryDefense + ")"
                + "\nSpeed: " + (accessory.speed + baseAccessory.speed) + " (" + accessorySpeed + ")"
                + "\nSlots: " + accessory.slots
                + "\n\n";

                embedMsg.setFields(
                    {name: "" + weapon.name + "⠀⠀⠀⠀⠀⠀", value: weaponText, inline: true},
                    {name: "" + armor.name + "⠀⠀⠀⠀⠀⠀", value: armorText, inline: true},
                    {name: "" + accessory.name + "⠀⠀⠀⠀⠀⠀", value: accessoryText, inline: true}
                );
                message.channel.send({ embeds: [embedMsg] });
                break;
            case 'boss':
                if (currHunt["active"] && !currHunt["active"].retreated && currHunt["active"].currentHP > 0) {
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
                    embedMsg.setFooter("HP: " + currHunt["active"].currentHP + "/" + currHunt["active"].maxHP + "\n\nDeaths: " + currHunt["active"].deathCount + "/" + currHunt["active"].deathLimit);
                    embedMsg.setColor("49000F");

                    var selected = currHunt["active"].id;
                    embedMsg.addField('MaxHP', "" + monsterdex[selected].maxHP, true);
                    embedMsg.addField('Attack', "" + monsterdex[selected].attack, true);
                    embedMsg.addField('Defense', "" + monsterdex[selected].defense, true);
                    embedMsg.addField('Magic Defense', "" + monsterdex[selected].magicdefense, true);
                    embedMsg.addField('Speed', "" + (monsterdex[selected].attackCD / 1000) + "s", true);

                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    embedMsg.setTitle("Emptiness...");
                    embedMsg.setDescription("There is no boss!");
                    embedMsg.setColor('A0FF71');
                    embedMsg.setImage("http://i.imgur.com/7ZHrijt.gif");

                    var newtime = new Date();
                    var timeDiff = newtime.getTime() - currHunt.lastSpawn;
                    var nextSpawn = currHunt.nextSpawn;
                    var bossTime = nextSpawn - timeDiff;

                    if (bossTime <= 1000 * 60 * 5 && (!currHunt["active"] || (currHunt["active"] && currHunt["active"].retreated))) {
                        embedMsg.setFooter("You feel an ominous presence...");
                    }
                    else if (bossTime <= 1000 * 60 * 10 && (!currHunt["active"] || (currHunt["active"] && currHunt["active"].retreated))) {
                        embedMsg.setFooter("Nature is panicking...");
                    }
                    else if (bossTime <= 1000 * 60 * 15 && (!currHunt["active"] || (currHunt["active"] && currHunt["active"].retreated))) {
                        embedMsg.setFooter("You hear the howling winds...");
                    }
                    else if (bossTime <= 1000 * 60 * 30 && (!currHunt["active"] || (currHunt["active"] && currHunt["active"].retreated))) {
                        embedMsg.setFooter("It is suddenly very quiet...");
                    }
                    else {
                        embedMsg.setFooter("Let's wait for a little longer...");
                    }

                    message.channel.send({ embeds: [embedMsg] });
                }
                break;
            case 'attack':
                var newTime = new Date();

                if (userHunt[userid].currentHP <= 0) {
                    var newTime = new Date();
                    var timeDiff = newTime.getTime() - userHunt[userid].deathTime;
                    if (timeDiff >= 1000 * 180) {
                        userHunt[userid].currentHP = maxHP;
                        const reviveMsg = new MessageEmbed()
                        reviveMsg.setTitle("A Hero Returned to Battle!");
                        reviveMsg.setDescription(userData[userid].name + " has revived!");
                        reviveMsg.setImage("https://c.tenor.com/HNPszjXhDdUAAAAC/monster-hunter-world-mhw.gif");
                        reviveMsg.setColor('00FF00');
                        reviveMsg.setFooter('Don\'t die again!');
                        message.channel.send({ embeds: [reviveMsg] });
                    }
                }
                
                if (currHunt["active"]) {
                    if (!currHunt["active"].channels.includes(message.channel)) {
                        currHunt["active"].channels.push(message.channel);
                    }
                    var timeDiff = newTime.getTime() - userHunt[userid].lastAttack;
                    //var attackCD = (1000 * 3) - (speed * 100);
                    var attackCD = (1000 * 4.75);
                    /*
                    if (attackCD < 500) {
                        attackCD = 500;
                    }
                    */

                    if (currHunt["active"].retreated) {    
                        embedMsg.setTitle("Chotto matte!");
                        embedMsg.setDescription(currHunt["active"].name + " has left the field!");
                        embedMsg.setColor("FF0000");
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else if (currHunt["active"].currentHP <= 0) {    
                        embedMsg.setTitle("Stop!");
                        embedMsg.setDescription(currHunt["active"].name + " is already dead!");
                        embedMsg.setImage("https://media1.giphy.com/media/JCAZQKoMefkoX6TyTb/giphy.gif");
                        embedMsg.setColor("FF0000");
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else if (userHunt[userid].currentHP <= 0) {
                        embedMsg.setTitle(userData[userid].name + " is dead!");
                        embedMsg.setDescription(userData[userid].name + " can't attack when you're dead!");
                        embedMsg.setImage("https://media4.giphy.com/media/Wr2747CnxwBSqyK6xt/200.gif");
                        embedMsg.setColor("FF0000");
                        embedMsg.setFooter('Cooldown: ' + Math.floor((1000 * 180 - (newTime.getTime() - userHunt[userid].deathTime)) / 1000) + ' seconds');
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else if (timeDiff < attackCD) {
                        embedMsg.setTitle("Chotto matte!");
                        embedMsg.setDescription(userData[userid].name + " can't attack yet!");
                        embedMsg.setImage("https://c.tenor.com/eBByy4ihCocAAAAC/angry-fist.gif");
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


                        var physical = (attack - currHunt["active"].defense);
                        var magical = (magic - currHunt["active"].magicdefense);
                        if (physical < 0) {
                            physical = 0;
                        }
                        if (magical < 0) {
                            magical = 0;
                        }
                        var flatDamage = Math.floor(physical + magical);
                        var damageDealt = Math.floor(flatDamage + (flatDamage * ((Math.random() * 6) - 3) / 10));

                        if (damageDealt <= 0) {
                            damageDealt = 1;
                        }
                        if (damageDealt > currHunt["active"].currentHP) {
                            damageDealt = currHunt["active"].currentHP;
                        }

                        userHunt[userid].lastAttack = newTime.getTime();

                        var isCrit = false;
                        var critDmg = 5.00;

                        var crit = Math.floor((Math.random() * 100) + 1);
                        var critChance = (100 * (speed / 100)) + 1;
                        if (crit <= critChance) {
                            isCrit = true;
                        }

                        if (isCrit) {
                            if (speed > 100) {
                                critDmg += (speed - 100) / 10000;
                            }
                            damageDealt = Math.floor(damageDealt * critDmg);
                        }

                        currHunt["active"].currentHP -= damageDealt;
                        currHunt["active"].playerDamage[currHunt["active"].targets.indexOf(userid)] += damageDealt;
                        currHunt["active"].lastPlayerAttack = newTime.getTime();

                        if (currHunt["active"].currentHP <= 0) {
                            embedMsg.setTitle("Attack!");
                            embedMsg.setDescription(userData[userid].name + " lands the finishing blow on " + currHunt["active"].name + "!\n\n" + currHunt["active"].death);
                            embedMsg.setImage("https://c.tenor.com/1Sd82w25kacAAAAM/one-punch-man-punch.gif");
                            embedMsg.setColor("00FF00");
                            embedMsg.setFooter('HP: ' + currHunt["active"].currentHP + "/" + currHunt["active"].maxHP + "\n\nDeaths: " + currHunt["active"].deathCount + "/" + currHunt["active"].deathLimit);

                            getDrops();

                            currHunt.lastSpawn = newTime.getTime();
                            currHunt.nextSpawn = (1000 * 60 * 45) + (1000 * 60 * 45 * Math.random());
                            currHunt.lastDifficulty = [];

                            var rewardLevel = currHunt["active"].difficulty;
                            var goldReward = 1000 * rewardLevel;
                            var reward = "";
                            for (let i = 0; i < currHunt["active"].targets.length; i++) {
                                var player = currHunt["active"].targets[i];
                                var goldEarned = 0;
                                goldEarned += Math.floor(goldReward * (currHunt["active"].playerDamage[i] / currHunt["active"].maxHP));

                                var itemsEarned = "";

                                if (unqiueDrops.length != 0) {
                                    for (let i = 0; i < Math.floor(rewardLevel * 1.99); i++) {
                                        var luck = Math.floor((Math.random() * 100000) + 1);
                                        var chance = 100000 * 0.0025; // 0.25%
                                        if (luck <= chance) {
                                            var itemObtained = generateEquip(unqiueDrops[Math.floor(Math.random() * unqiueDrops.length)]);
                                            userHunt[player].equips.push(itemObtained);
                                            itemsEarned += ", " + items[itemObtained].name;
                                        }
                                    }
                                }

                                for (let i = 0; i < Math.floor(rewardLevel * 1.99); i++) {
                                    var luck = Math.floor((Math.random() * 100000) + 1);
                                    var chance = 100000 * 0.005; // 0.50%
                                    if (luck <= chance) {
                                        var itemObtained = generateEquip(threestar[Math.floor(Math.random() * threestar.length)]);
                                        userHunt[player].equips.push(itemObtained);
                                        itemsEarned += ", " + items[itemObtained].name;
                                    }
                                }

                                for (let i = 0; i < Math.floor(rewardLevel * 1.99); i++) {
                                    var luck = Math.floor((Math.random() * 100000) + 1);
                                    var chance = 100000 * 0.01; // 1.00%
                                    if (luck <= chance) {
                                        var itemObtained = generateEquip(twostar[Math.floor(Math.random() * twostar.length)]);
                                        userHunt[player].equips.push(itemObtained);
                                        itemsEarned += ", " + items[itemObtained].name;
                                    }
                                }

                                for (let i = 0; i < Math.floor(rewardLevel * 1.99); i++) {
                                    var luck = Math.floor((Math.random() * 100000) + 1);
                                    var chance = 100000 * 0.03; // 3.00%
                                    if (luck <= chance) {
                                        var itemObtained = generateEquip(onestar[Math.floor(Math.random() * onestar.length)]);
                                        userHunt[player].equips.push(itemObtained);
                                        itemsEarned += ", " + items[itemObtained].name;
                                    }
                                }

                                for (let i = 0; i < Math.floor(rewardLevel * 1.99); i++) {
                                    var luck = Math.floor((Math.random() * 100000) + 1);
                                    var chance = 100000 * 0.10; // 10.00%
                                    if (luck <= chance) {
                                        var itemObtained = generateEquip(zerostar[Math.floor(Math.random() * zerostar.length)]);
                                        userHunt[player].equips.push(itemObtained);
                                        itemsEarned += ", " + items[itemObtained].name;
                                    }
                                }

                                for (let i = 0; i < Math.floor(rewardLevel * 1.99); i++) {
                                    var luck = Math.floor((Math.random() * 100000) + 1);
                                    var chance = 100000 * 0.20; // 20.00%
                                    if (luck <= chance) {
                                        var scrollobtained = scrolldrop[Math.floor(Math.random() * scrolldrop.length)];
                                        userHunt[player].scrolls.push(scrollobtained);
                                        itemsEarned += ", " + scrolls[scrollobtained].name;
                                    }
                                }

                                userData[player].points += goldEarned;
                                
                                reward += userData[player].name + " has been awarded with: " + goldEarned + " points" + itemsEarned + "\n\n";
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
                                    }, 600000);
                                });
                            }
                        }
                        else {
                            embedMsg.setTitle("Attack!");
                            if (isCrit) {
                                embedMsg.setDescription(userData[userid].name + " lands a critical hit, dealing " + damageDealt + "(" + critDmg + "x)" + " damage to " + currHunt["active"].name + "!");
                            }
                            else {
                                embedMsg.setDescription(userData[userid].name + " deals " + damageDealt + " damage to " + currHunt["active"].name + "!");
                            }
                            embedMsg.setImage(randomAttackGifs[Math.floor(Math.random() * randomAttackGifs.length)]);
                            embedMsg.setColor("00FF00");
                            embedMsg.setFooter('HP: ' + currHunt["active"].currentHP + "/" + currHunt["active"].maxHP + "\n\nDeaths: " + currHunt["active"].deathCount + "/" + currHunt["active"].deathLimit);
                            message.channel.send({ embeds: [embedMsg] });
                        }
                    }
                }
                else {
                    embedMsg.setTitle("Emptiness...");
                    embedMsg.setDescription("There is no boss!");
                    embedMsg.setColor('A0FF71');
                    embedMsg.setImage("http://i.imgur.com/7ZHrijt.gif");

                    var newtime = new Date();
                    var timeDiff = newtime.getTime() - currHunt.lastSpawn;
                    var nextSpawn = currHunt.nextSpawn;
                    var bossTime = nextSpawn - timeDiff;

                    if (bossTime <= 1000 * 60 * 5) {
                        embedMsg.setFooter("You feel an ominous presence...");
                    }
                    else if (bossTime <= 1000 * 60 * 10) {
                        embedMsg.setFooter("Nature is panicking...");
                    }
                    else if (bossTime <= 1000 * 60 * 15) {
                        embedMsg.setFooter("You hear the howling winds...");
                    }
                    else if (bossTime <= 1000 * 60 * 30) {
                        embedMsg.setFooter("It is suddenly very quiet...");
                    }
                    else {
                        embedMsg.setFooter("Let's wait for a little longer...");
                    }

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
                else if (args.length >= 2 && args[1] == "sort") {
                    userHunt[userid].equips.sort((firstEl, secondEl) => { 
                        if (equips[items[firstEl].name].rarity > equips[items[secondEl].name].rarity) {
                            return -1;
                        }
                        if (equips[items[firstEl].name].rarity < equips[items[secondEl].name].rarity) {
                            return 1;
                        }
                        if (equips[items[firstEl].name].type < equips[items[secondEl].name].type) {
                            return -1;
                        }
                        if (equips[items[firstEl].name].type > equips[items[secondEl].name].type) {
                            return 1;
                        }
                        if (items[firstEl].slots < items[secondEl].slots) {
                            return -1;
                        }
                        if (items[firstEl].slots > items[secondEl].slots) {
                            return 1;
                        }
                        if (items[firstEl].name < items[secondEl].name) {
                            return -1;
                        }
                        if (items[firstEl].name > items[secondEl].name) {
                            return 1;
                        }
                        return 0;
                    });
                    embedMsg.setTitle('Success!');
                    embedMsg.setColor('00FF00');
                    embedMsg.setDescription('Inventory sorted!');
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    var equipment = [""];
                    var index = 0;
                    var count = 0;
                    userHunt[userid].equips.forEach((element) => {
                        if (count >= 4) {
                            equipment[index] += "\n";
                            index++;
                            count = 0;
                            equipment.push("");
                        }
                        var standard = equips[items[element].name];
                        var equipType = "";

                        switch (items[element].type) {
                            case 0:
                                equipType = "Weapon";
                                break;
                            case 1:
                                equipType = "Armor";
                                break;
                            case 2:
                                equipType = "Accessory";
                                break;
                        }

                        equipment[index] += "**__" + (userHunt[userid].equips.indexOf(element) + 1) + ". " + items[element].name + "__**⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀"
                        + "\nRarity: " + standard.rarity
                        + "\nType: " + equipType;
                        if (items[element].maxHP + standard.maxHP != 0) {
                            if (items[element].maxHP < 0) {
                                equipment[index] += "\nMaxHP: " + (items[element].maxHP + standard.maxHP) + " (" + items[element].maxHP + ")";
                            }
                            else {
                                equipment[index] += "\nMaxHP: " + (items[element].maxHP + standard.maxHP) + " (+" + items[element].maxHP + ")";
                            }
                        }
                        if (items[element].attack + standard.attack != 0) {
                            if (items[element].attack < 0) {
                                equipment[index] += "\nAttack: " + (items[element].attack + standard.attack) + " (" + items[element].attack + ")";
                            }
                            else {
                                equipment[index] += "\nAttack: " + (items[element].attack + standard.attack) + " (+" + items[element].attack + ")";
                            }
                        }
                        if (items[element].magic + standard.magic != 0) {
                            if (items[element].magic < 0) {
                                equipment[index] += "\nMagic: " + (items[element].magic + standard.magic) + " (" + items[element].magic + ")";
                            }
                            else {
                                equipment[index] += "\nMagic: " + (items[element].magic + standard.magic) + " (+" + items[element].magic + ")";
                            }
                        }
                        if (items[element].defense + standard.defense != 0) {
                            if (items[element].defense < 0) {
                                equipment[index] += "\nDefense: " + (items[element].defense + standard.defense) + " (" + items[element].defense + ")";
                            }
                            else {
                                equipment[index] += "\nDefense: " + (items[element].defense + standard.defense) + " (+" + items[element].defense + ")";
                            }
                        }
                        if (items[element].speed + standard.speed != 0) {
                            if (items[element].speed < 0) {
                                equipment[index] += "\nSpeed: " + (items[element].speed + standard.speed) + " (" + items[element].speed + ")";
                            }
                            else {
                                equipment[index] += "\nSpeed: " + (items[element].speed + standard.speed) + " (+" + items[element].speed + ")";
                            }
                        }
                        equipment[index] += "\nSlots: " + items[element].slots;
                        equipment[index] += "\n\n";
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
                            const collector = msg.createReactionCollector({ filter, time: 1000 * 120 });

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
                    embedMsg.setFooter("!tp hunt equip #");
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
                            embedMsg.setFooter("Look at !tp hunt inv and select a number!");
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
                            embedMsg.setDescription(userData[userid].name + ' equiped ' + items[selected].name);
                            message.channel.send({ embeds: [embedMsg] });
                        }
                    }
                    else {
                        embedMsg.setTitle('Error!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription('Please select a valid equipment # from equipments!');
                        embedMsg.setFooter("Look at !tp hunt inv and select a number!");
                        message.channel.send({ embeds: [embedMsg] });
                    }
                }
                break;
            case 'unequip':
                if (args.length < 2) {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription('Please select weapon/armor/acc to unequip!');
                    embedMsg.setFooter("!tp hunt unequip weapon/armor/acc");
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
                                embedMsg.setDescription(userData[userid].name + ' don\'t have anything equiped!');
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
                                embedMsg.setDescription(userData[userid].name + ' don\'t have anything equiped!');
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
                                embedMsg.setDescription(userData[userid].name + ' don\'t have anything equiped!');
                                message.channel.send({ embeds: [embedMsg] });
                            }
                            break;
                        default:
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription('Please select weapon/armor/acc to unequip!');
                            embedMsg.setFooter("!tp hunt unequip weapon/armor/acc");
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

                        for (let i = 0; i < userHunt[userid].scrolls.length; i++) {
                            if (count >= 6) {
                                allscrolls[index] += "\n";
                                index++;
                                count = 0;
                                allscrolls.push("");
                            }
                            var element = userHunt[userid].scrolls[i];
                            allscrolls[index] += "**__" + (i + 1) + ". " + scrolls[element].name + "__**⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀";
                            if (scrolls[element].maxHP != 0) {
                                allscrolls[index] += "\nMaxHP: " + (scrolls[element].maxHP);
                            }
                            if (scrolls[element].attack != 0) {
                                allscrolls[index] += "\nAttack: " + (scrolls[element].attack);
                            }
                            if (scrolls[element].magic != 0) {
                                allscrolls[index] += "\nMagic: " + (scrolls[element].magic);
                            }
                            if (scrolls[element].defense != 0) {
                                allscrolls[index] += "\nDefense: " + (scrolls[element].defense);
                            }
                            if (scrolls[element].speed != 0) {
                                allscrolls[index] += "\nSpeed: " + (scrolls[element].speed);
                            }
                            allscrolls[index] += "\n\n";
                            count++;
                        }

                        let pages = [];
                        for (let i = 0; i < allscrolls.length; i++) {
                            pages.push(allscrolls[i]);
                        }

                        let page = 1;
                        embedMsg
                            .setFooter(`Page ${page} of ${pages.length}` + "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ To use scroll - !tp hunt scroll weapon/armor/acc #")
                            .setDescription(pages[page-1])
                            .setAuthor({ name: userData[userid].name, iconURL: target.displayAvatarURL() })
                            .setTitle('Scroll Inventory')
                            .setColor('FFF000');

                        message.channel.send({ embeds: [embedMsg] }).then(msg => {
                            msg.react("◀️").then(r => {
                                msg.react("▶️")

                                const filter = (reaction, user) => ["◀️", "▶️"].includes(reaction.emoji.name) && user.id === userid;
                                const collector = msg.createReactionCollector({ filter, time: 1000 * 120 });

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
                                        embedMsg.setFooter(`Page ${page} of ${pages.length}` + "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ To use scroll - !tp hunt scroll weapon/armor/acc #");
                                        msg.edit({ embeds: [embedMsg] });
                                    }
                                    else if (r.emoji.name === "▶️") {
                                        if (page === pages.length) {
                                            r.users.remove(userid);
                                            return;
                                        }
                                        page++;
                                        embedMsg.setDescription(pages[page-1]);
                                        embedMsg.setFooter(`Page ${page} of ${pages.length}` + "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ To use scroll - !tp hunt scroll weapon/armor/acc #");
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

                    if (args[1] == "sort") {

                        var type = args[2];

                        switch(type) {
                            case "hp":
                            case "maxhp":
                            case "health":
                                userHunt[userid].scrolls.sort((firstEl, secondEl) => { 
                                    if (scrolls[firstEl].maxHP > scrolls[secondEl].maxHP) {
                                        return -1;
                                    }
                                    if (scrolls[firstEl].maxHP < scrolls[secondEl].maxHP) {
                                        return 1;
                                    }
                                    if (scrolls[firstEl].name < scrolls[secondEl].name) {
                                        return -1;
                                    }
                                    if (scrolls[firstEl].name > scrolls[secondEl].name) {
                                        return 1;
                                    }
                                    return 0;
                                });
                                embedMsg.setDescription('Scrolls sorted by HP!');
                                break;
                            case "atk":
                            case "attack":
                                userHunt[userid].scrolls.sort((firstEl, secondEl) => { 
                                    if (scrolls[firstEl].attack > scrolls[secondEl].attack) {
                                        return -1;
                                    }
                                    if (scrolls[firstEl].attack < scrolls[secondEl].attack) {
                                        return 1;
                                    }
                                    if (scrolls[firstEl].name < scrolls[secondEl].name) {
                                        return -1;
                                    }
                                    if (scrolls[firstEl].name > scrolls[secondEl].name) {
                                        return 1;
                                    }
                                    return 0;
                                });
                                embedMsg.setDescription('Scrolls sorted by attack!');
                                break;
                            case "mag":
                            case "matk":
                            case "magic":
                                userHunt[userid].scrolls.sort((firstEl, secondEl) => { 
                                    if (scrolls[firstEl].magic > scrolls[secondEl].magic) {
                                        return -1;
                                    }
                                    if (scrolls[firstEl].magic < scrolls[secondEl].magic) {
                                        return 1;
                                    }
                                    if (scrolls[firstEl].name < scrolls[secondEl].name) {
                                        return -1;
                                    }
                                    if (scrolls[firstEl].name > scrolls[secondEl].name) {
                                        return 1;
                                    }
                                    return 0;
                                });
                                embedMsg.setDescription('Scrolls sorted by magic!');
                                break;
                            case "def":
                            case "defense":
                                userHunt[userid].scrolls.sort((firstEl, secondEl) => { 
                                    if (scrolls[firstEl].defense > scrolls[secondEl].defense) {
                                        return -1;
                                    }
                                    if (scrolls[firstEl].defense < scrolls[secondEl].defense) {
                                        return 1;
                                    }
                                    if (scrolls[firstEl].name < scrolls[secondEl].name) {
                                        return -1;
                                    }
                                    if (scrolls[firstEl].name > scrolls[secondEl].name) {
                                        return 1;
                                    }
                                    return 0;
                                });
                                embedMsg.setDescription('Scrolls sorted by defense!');
                                break;
                            case "spd":
                            case "speed":
                                userHunt[userid].scrolls.sort((firstEl, secondEl) => { 
                                    if (scrolls[firstEl].speed > scrolls[secondEl].speed) {
                                        return -1;
                                    }
                                    if (scrolls[firstEl].speed < scrolls[secondEl].speed) {
                                        return 1;
                                    }
                                    if (scrolls[firstEl].name < scrolls[secondEl].name) {
                                        return -1;
                                    }
                                    if (scrolls[firstEl].name > scrolls[secondEl].name) {
                                        return 1;
                                    }
                                    return 0;
                                });
                                embedMsg.setDescription('Scrolls sorted by speed!');
                                break;
                            default:
                                userHunt[userid].scrolls.sort((firstEl, secondEl) => { 
                                    if (scrolls[firstEl].name < scrolls[secondEl].name) {
                                        return -1;
                                    }
                                    if (scrolls[firstEl].name > scrolls[secondEl].name) {
                                        return 1;
                                    }
                                    return 0;
                                });
                                embedMsg.setDescription('Scrolls sorted by name!');
                                break;
                        }
                        embedMsg.setTitle('Success!');
                        embedMsg.setColor('00FF00');
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else if (!isNaN(selectedindex) && selectedindex >= 0 && selectedindex < userHunt[userid].scrolls.length) {
                        theScroll = scrolls[userHunt[userid].scrolls[selectedindex]];
                        switch (choice) {
                            case "weapon":
                                if (userHunt[userid].weapon != "000000" && items[userHunt[userid].weapon].slots > 0) {
                                    var luck = Math.floor((Math.random() * 100) + 1);
                                    var chance = 100 * theScroll.rate;
                                    if (luck <= chance) {
                                        items[userHunt[userid].weapon].maxHP += theScroll.maxHP;
                                        items[userHunt[userid].weapon].attack += theScroll.attack;
                                        items[userHunt[userid].weapon].magic += theScroll.magic;
                                        items[userHunt[userid].weapon].defense += theScroll.defense;
                                        items[userHunt[userid].weapon].speed += theScroll.speed;
                                        items[userHunt[userid].weapon].slots--;
                                        updateStats();
                                        embedMsg.setTitle('Success! - ' + theScroll.name);
                                        embedMsg.setColor('00FF00');
                                        embedMsg.setThumbnail('https://i.imgur.com/dHbQVgC.gif');
                                        embedMsg.setDescription('The scroll lights up, and then its mysterious power has been transferred to the item.');
                                        embedMsg.setFooter(userData[userid].name + " rolled " + luck + "/100 and needed equal to or less than " + chance + " to pass!");
                                        message.channel.send({ embeds: [embedMsg] });
                                        userHunt[userid].scrolls.splice(selectedindex, 1);
                                    }
                                    else {
                                        embedMsg.setTitle('Fail! - ' + theScroll.name);
                                        embedMsg.setColor('FF0000');
                                        embedMsg.setThumbnail('https://i.imgur.com/Bi2LNzQ.gif');
                                        embedMsg.setDescription('The scroll lights up, but the item winds up as if nothing happened.');
                                        embedMsg.setFooter(userData[userid].name + " rolled " + luck + "/100 and needed equal to or less than " + chance + " to pass!");
                                        message.channel.send({ embeds: [embedMsg] });
                                        userHunt[userid].scrolls.splice(selectedindex, 1);
                                    }
                                }
                                else {
                                    embedMsg.setTitle('Error!');
                                    embedMsg.setColor('FF0000');
                                    embedMsg.setDescription(userData[userid].name + ' don\'t have anything equiped or your equip ran out of slots!');
                                    embedMsg.setFooter("!tp hunt scroll weapon/armor/acc #");
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                break;
                            case "armor":
                                if (userHunt[userid].armor != "000000" && items[userHunt[userid].armor].slots > 0) {
                                    var luck = Math.floor((Math.random() * 100) + 1);
                                    var chance = 100 * theScroll.rate;
                                    if (luck <= chance) {
                                        theScroll = scrolls[userHunt[userid].scrolls[selectedindex]];
                                        items[userHunt[userid].armor].maxHP += theScroll.maxHP;
                                        items[userHunt[userid].armor].attack += theScroll.attack;
                                        items[userHunt[userid].armor].magic += theScroll.magic;
                                        items[userHunt[userid].armor].defense += theScroll.defense;
                                        items[userHunt[userid].armor].speed += theScroll.speed;
                                        items[userHunt[userid].armor].slots--;
                                        updateStats();
                                        embedMsg.setTitle('Success! - ' + theScroll.name);
                                        embedMsg.setColor('00FF00');
                                        embedMsg.setThumbnail('https://i.imgur.com/dHbQVgC.gif');
                                        embedMsg.setDescription('The scroll lights up, and then its mysterious power has been transferred to the item.');
                                        embedMsg.setFooter(userData[userid].name + " rolled " + luck + "/100 and needed equal to or less than " + chance + " to pass!");
                                        message.channel.send({ embeds: [embedMsg] });
                                        userHunt[userid].scrolls.splice(selectedindex, 1);
                                    }
                                    else {
                                        embedMsg.setTitle('Fail! - ' + theScroll.name);
                                        embedMsg.setColor('FF0000');
                                        embedMsg.setThumbnail('https://i.imgur.com/Bi2LNzQ.gif');
                                        embedMsg.setDescription('The scroll lights up, but the item winds up as if nothing happened.');
                                        embedMsg.setFooter(userData[userid].name + " rolled " + luck + "/100 and needed equal to or less than " + chance + " to pass!");
                                        message.channel.send({ embeds: [embedMsg] });
                                        userHunt[userid].scrolls.splice(selectedindex, 1);
                                    }
                                }
                                else {
                                    embedMsg.setTitle('Error!');
                                    embedMsg.setColor('FF0000');
                                    embedMsg.setDescription(userData[userid].name + ' don\'t have anything equiped or your equip ran out of slots!');
                                    embedMsg.setFooter("!tp hunt scroll weapon/armor/acc #");
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                break;
                            case "accessory":
                            case "acc":
                                if (userHunt[userid].accessory != "000000" && items[userHunt[userid].accessory].slots > 0) {
                                    var luck = Math.floor((Math.random() * 100) + 1);
                                    var chance = 100 * theScroll.rate;
                                    if (luck <= chance) {
                                        theScroll = scrolls[userHunt[userid].scrolls[selectedindex]];
                                        items[userHunt[userid].accessory].maxHP += theScroll.maxHP;
                                        items[userHunt[userid].accessory].attack += theScroll.attack;
                                        items[userHunt[userid].accessory].magic += theScroll.magic;
                                        items[userHunt[userid].accessory].defense += theScroll.defense;
                                        items[userHunt[userid].accessory].speed += theScroll.speed;
                                        items[userHunt[userid].accessory].slots--;
                                        updateStats();
                                        embedMsg.setTitle('Success! - ' + theScroll.name);
                                        embedMsg.setColor('00FF00');
                                        embedMsg.setThumbnail('https://i.imgur.com/dHbQVgC.gif');
                                        embedMsg.setDescription('The scroll lights up, and then its mysterious power has been transferred to the item.');
                                        embedMsg.setFooter(userData[userid].name + " rolled " + luck + "/100 and needed equal to or less than " + chance + " to pass!");
                                        message.channel.send({ embeds: [embedMsg] });
                                        userHunt[userid].scrolls.splice(selectedindex, 1);
                                    }
                                    else {
                                        embedMsg.setTitle('Fail! - ' + theScroll.name);
                                        embedMsg.setColor('FF0000');
                                        embedMsg.setThumbnail('https://i.imgur.com/Bi2LNzQ.gif');
                                        embedMsg.setDescription('The scroll lights up, but the item winds up as if nothing happened.');
                                        embedMsg.setFooter(userData[userid].name + " rolled " + luck + "/100 and needed equal to or less than " + chance + " to pass!");
                                        message.channel.send({ embeds: [embedMsg] });
                                        userHunt[userid].scrolls.splice(selectedindex, 1);
                                    }
                                }
                                else {
                                    embedMsg.setTitle('Error!');
                                    embedMsg.setColor('FF0000');
                                    embedMsg.setDescription(userData[userid].name + ' don\'t have anything equiped or your equip ran out of slots!');
                                    embedMsg.setFooter("!tp hunt scroll weapon/armor/acc #");
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                break;
                            default:
                                embedMsg.setTitle('Error!');
                                embedMsg.setColor('FF0000');
                                embedMsg.setDescription('Please select weapon/armor/acc to scroll!');
                                embedMsg.setFooter("!tp hunt scroll weapon/armor/acc #");
                                message.channel.send({ embeds: [embedMsg] });
                                break;
                        }
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
                    embedMsg.setDescription('Please @ the user, select equip/scroll, and index to give!');
                    embedMsg.setFooter("!tp hunt give equip/scroll #");
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
                            embedMsg.setDescription(userData[userid].name + ' can\'t give to yourself!');
                            message.channel.send({ embeds: [embedMsg] });
                            return;
                        }
                        
                        if (!isNaN(index)) {
                            switch(choice) {
                                case "inv":
                                case "equip":
                                    if (index >= userHunt[userid].equips.length || index < 0) {
                                        embedMsg.setTitle('Error!');
                                        embedMsg.setColor('FF0000');
                                        embedMsg.setDescription('Please select a valid equipment # from equipments!');
                                        embedMsg.setFooter("Look at !tp hunt inv and select a number!")
                                        message.channel.send({ embeds: [embedMsg] });
                                    }
                                    else {

                                        let original = [...userHunt[userid].equips];

                                        const proposalMsg = new MessageEmbed();
                                        proposalMsg.setTitle('Give Item!');
                                        proposalMsg.setColor('FFF000');
                                        proposalMsg.setDescription("Would " + userData[userid].name + " like to give " + items[userHunt[userid].equips[index]].name + " to " + userData[mention].name + "?");
                        
                                        
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
                                                    if (reaction.emoji.name === '👍' && JSON.stringify(userHunt[userid].equips) == JSON.stringify(original)) {
                                                        var selected = userHunt[userid].equips[index];
                                                        userHunt[mention].equips.push(userHunt[userid].equips[index]);
                                                        userHunt[userid].equips.splice(index, 1);

                                                        embedMsg.setTitle('Success!');
                                                        embedMsg.setColor('00FF00');
                                                        embedMsg.setDescription(userData[userid].name + " gave " + userData[mention].name + " " + items[selected].name + "!");
                                                        message.channel.send({ embeds: [embedMsg] });
                                                    } 
                                                    else if (reaction.emoji.name === '👎')
                                                    {
                                                        embedMsg.setTitle('Error!');
                                                        embedMsg.setColor('FF0000');
                                                        embedMsg.setDescription(userData[userid].name + " declined!");
                                                        message.channel.send({ embeds: [embedMsg] });
                                                    }
                                                    else {
                                                        embedMsg.setTitle('Fail!');
                                                        embedMsg.setColor('FF0000');
                                                        embedMsg.setDescription(userData[userid].name + " inventory changed!");
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
                                    if (index >= userHunt[userid].scrolls.length || index < 0) {
                                        embedMsg.setTitle('Error!');
                                        embedMsg.setColor('FF0000');
                                        embedMsg.setDescription('Please select a valid scroll # from scroll!');
                                        embedMsg.setFooter("Look at !tp hunt scroll and select a number!")
                                        message.channel.send({ embeds: [embedMsg] });
                                    }
                                    else {

                                        let original = [...userHunt[userid].scrolls];

                                        const proposalMsg = new MessageEmbed();
                                        proposalMsg.setTitle('Give Item!');
                                        proposalMsg.setColor('FFF000');
                                        proposalMsg.setDescription("Would " + userData[userid].name + " like to give " + scrolls[userHunt[userid].scrolls[index]].name + " to " + userData[mention].name + "?");
                        
                                        
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
                                                    if (reaction.emoji.name === '👍' && JSON.stringify(userHunt[userid].scrolls) == JSON.stringify(original)) {
                                                        var selected = userHunt[userid].scrolls[index];
                                                        userHunt[mention].scrolls.push(userHunt[userid].scrolls[index]);
                                                        userHunt[userid].scrolls.splice(index, 1);

                                                        embedMsg.setTitle('Success!');
                                                        embedMsg.setColor('00FF00');
                                                        embedMsg.setDescription(userData[userid].name + " gave " + userData[mention].name + " " + scrolls[selected].name + "!");
                                                        message.channel.send({ embeds: [embedMsg] });
                                                    } 
                                                    else if (reaction.emoji.name === '👎') {
                                                        embedMsg.setTitle('Error!');
                                                        embedMsg.setColor('FF0000');
                                                        embedMsg.setDescription(userData[userid].name + " declined!");
                                                        message.channel.send({ embeds: [embedMsg] });
                                                    }
                                                    else {
                                                        embedMsg.setTitle('Fail!');
                                                        embedMsg.setColor('FF0000');
                                                        embedMsg.setDescription(userData[userid].name + " inventory changed!");
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
                                    embedMsg.setDescription('Please select either equip/scroll!');
                                    embedMsg.setFooter("!tp hunt give equip/scroll #");
                                    message.channel.send({ embeds: [embedMsg] });
                                    break;
                            }
                        }
                        else {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription('Please select a valid index from equip/scroll!');
                            embedMsg.setFooter("!tp hunt give equip/scroll #");
                            message.channel.send({ embeds: [embedMsg] });
                        }
                    }
                    else {
                        embedMsg.setTitle('Error!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription('Please @ a user!');
                        embedMsg.setFooter("!tp hunt give equip/scroll #");
                        message.channel.send({ embeds: [embedMsg] });
                    }
                }
                break;
            case 'sell':
                if (args.length < 2) {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription('Please enter which item to sell!');
                    embedMsg.setFooter("!tp hunt sell equip/scroll #");
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    var type = args[1];
                    var target = Math.floor(Number(args[2]) - 1);
                    if (!isNaN(target)) {
                        switch(type) {
                            case "inv":
                            case "equip":
                                if (target < 0 || target >= userHunt[userid].equips.length) {
                                    embedMsg.setTitle('Error!');
                                    embedMsg.setColor('FF0000');
                                    embedMsg.setDescription('Weapon does not exist!');
                                    embedMsg.setFooter("!tp hunt sell equip/scroll #");
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                else {
                                    let original = [...userHunt[userid].equips];

                                    var selectedWeapon = equips[items[userHunt[userid].equips[target]].name];
                                    if (selectedWeapon.rarity != 0) {
                                        var price = selectedWeapon.rarity * 500;
                                    }
                                    else {
                                        var price = 100;
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
                                                if (reaction.emoji.name === '👍' && JSON.stringify(userHunt[userid].equips) == JSON.stringify(original)) {
                                                    userData[userid].points += price;
                                                    var itemToDelete = userHunt[userid].equips[target];
                                                    userHunt[userid].equips.splice(target, 1);
                                                    delete items[itemToDelete];
                                                    embedMsg.setTitle('Sold!');
                                                    embedMsg.setColor('00FF00');
                                                    embedMsg.setDescription(userData[userid].name + " sold " + selectedWeapon.name + " for " + price + " points!");
                                                    message.channel.send({ embeds: [embedMsg] });
                                                } 
                                                else if (reaction.emoji.name === '👎') {
                                                    embedMsg.setTitle('Declined!');
                                                    embedMsg.setColor('FF0000');
                                                    embedMsg.setDescription(userData[userid].name + " declined!");
                                                    message.channel.send({ embeds: [embedMsg] });
                                                }
                                                else {
                                                    embedMsg.setTitle('Fail!');
                                                    embedMsg.setColor('FF0000');
                                                    embedMsg.setDescription(userData[userid].name + " inventory changed!");
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
                                    embedMsg.setDescription('Scroll does not exist!');
                                    embedMsg.setFooter("!tp hunt sell equip/scroll #");
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                else {
                                    let original = [...userHunt[userid].scrolls];
                                    var selectedScroll = scrolls[userHunt[userid].scrolls[target]];
                                    var price = 100;
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
                                                if (reaction.emoji.name === '👍' && JSON.stringify(userHunt[userid].scrolls) == JSON.stringify(original)) {
                                                    userData[userid].points += price;
                                                    userHunt[userid].scrolls.splice(target, 1)
                                                    embedMsg.setTitle('Sold!');
                                                    embedMsg.setColor('00FF00');
                                                    embedMsg.setDescription(userData[userid].name + " sold " + selectedScroll.name + " for " + price + " points!");
                                                    message.channel.send({ embeds: [embedMsg] });
                                                } 
                                                else if (reaction.emoji.name === '👎') {
                                                    embedMsg.setTitle('Declined!');
                                                    embedMsg.setColor('FF0000');
                                                    embedMsg.setDescription(userData[userid].name + " declined!");
                                                    message.channel.send({ embeds: [embedMsg] });
                                                }
                                                else {
                                                    embedMsg.setTitle('Fail!');
                                                    embedMsg.setColor('FF0000');
                                                    embedMsg.setDescription(userData[userid].name + " inventory changed!");
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
                        embedMsg.setFooter("!tp hunt sell equip/scroll #");
                        message.channel.send({ embeds: [embedMsg] });
                    }
                }
                break;
            case 'dex':
            case 'monsterdex':
                var target = client.users.cache.get(userid);
                embedMsg.setAuthor({ name: userData[userid].name, iconURL: target.displayAvatarURL() });
                embedMsg.setTitle('Monsterdex');
                embedMsg.setThumbnail('https://i.imgur.com/EJA4Vzn.png');
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
                        embedMsg.setDescription(userData[userid].name + ' never encountered this monster or it does not exist!');
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
                        .setThumbnail('https://i.imgur.com/EJA4Vzn.png')
                        .setColor('FFF000');

                    message.channel.send({ embeds: [embedMsg] }).then(msg => {
                        msg.react("◀️").then(r => {
                            msg.react("▶️")

                            const filter = (reaction, user) => ["◀️", "▶️"].includes(reaction.emoji.name) && user.id === userid;
                            const collector = msg.createReactionCollector({ filter, time: 1000 * 120 });

                            collector.on('collect', r => {
                                embedMsg.setAuthor({ name: userData[userid].name, iconURL: target.displayAvatarURL() });
                                embedMsg.setTitle('Monsterdex');
                                embedMsg.setThumbnail('https://i.imgur.com/EJA4Vzn.png');
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
                embedMsg.setDescription('Use !tp hunt help for list of hunting commands!');
                embedMsg.setThumbnail("https://4.bp.blogspot.com/-DV8zj3oNPO8/XZKl8Y1_KkI/AAAAAAAMsvI/HEq47t0TPmYhX0b2igMkkxbcPQPbUXR2gCLcBGAsYHQ/s1600/AS0005827_02.gif");
                message.channel.send({ embeds: [embedMsg] });
                break;
        }
    }
}
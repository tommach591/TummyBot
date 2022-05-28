module.exports = {
    name: 'hunt',
    description: "Hunt for honor and glory! Start with !tp h help.",

    execute(message, args, userid, masterData, masterStorage, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();
        const randomAttackGifs = [
            "https://i.imgur.com/O62yU0U.gif",                                                      // Starburst Stream
            "https://c.tenor.com/O0Rd9v0NpjkAAAAC/keqing-genshin-impact.gif",                       // Keqing Elemental Burst
            "https://c.tenor.com/fG4HO_ccb68AAAAC/anime-my-hero-academia.gif",                      // Deku Smash
            "https://c.tenor.com/kWtHiHKx0EYAAAAd/naruto-vs.gif",                                   // Uzumaki Barrage
            "https://i.makeagif.com/media/8-02-2015/0jqzEj.gif",                                    // Night Guy
            "https://c.tenor.com/P951zVBB_vkAAAAC/ao-t-shingeki-no-kyojin.gif",                     // Levi Spin
            "https://c.tenor.com/IM60lqQKKY0AAAAC/kid-goku-kamehameha.gif",                         // Goku Kamehameha
            "https://c.tenor.com/xc19_U9dSNMAAAAC/chika-fujiwara-hit.gif",                          // Chika Fan
            "https://c.tenor.com/Oxl7m7l88FwAAAAC/megumin-konosuba.gif",                            // Explosion
            "https://c.tenor.com/w9MEZlRNxOUAAAAC/sword-art-online-sinon-asada.gif",                // Sinon Gun
            "https://c.tenor.com/p7fVqdR0FWkAAAAC/punch-vi.gif",                                    // Vi Punch
            "https://i.makeagif.com/media/8-26-2017/pcdhp5.gif",                                    // MHW Greatsword
            "https://thumbs.gfycat.com/BlackandwhiteTangibleCero-size_restricted.gif",              // Haru All Out Attack
            "https://c.tenor.com/FPBEXi3f8sQAAAAd/rock-lee-hidden-lotus.gif",                       // Rock Lee Hidden Lotus
            "https://64.media.tumblr.com/dd15ab10cf2ddeed4509e63f75092ad0/08ebc2f82f6d00f7-a2/s540x810/c0773326827098d21ea129af98a092c4f74cafe4.gif",                     
                                                                                                    // Link Spin Attack
            "https://c.tenor.com/x0pScuOx-0gAAAAC/monster-hunter-rise.gif",                         // MHR Insect Glaive 
            "https://media0.giphy.com/media/dyjrpqaUVqCELGuQVr/giphy.gif",                          // Demon Slayer Tanjiro
            "https://www.icegif.com/wp-content/uploads/demon-slayer-icegif-1.gif",                  // Demon Slayer Zenitsu
            "https://i.imgur.com/jOJhpgq.gif",                                                      // Eris Vs Ruijerd
            "https://i.imgur.com/7uTs615.gif",                                                      // Phoenix Molly
            "https://i.imgur.com/VIoBlJq.gif",                                                      // Yoru Ult
            "https://i.kym-cdn.com/photos/images/newsfeed/000/890/770/1fe.gif",                     // Kirby Hammer
            "https://c.tenor.com/HjT9IC9T6cEAAAAM/so-long-bowser-bowser.gif",                       // Mario Spin Bowser
            "https://media1.giphy.com/media/qyjexFwQwJp9yUvMxq/giphy.gif",                          // Will Smith Slap
            "https://c.tenor.com/okMAfIsn7gAAAAAC/kimchi-slap-angry.gif",                           // Kimchi Slap
            "https://c.tenor.com/zXhf6-giP9cAAAAC/genshin-impact.gif",                              // Ayaka Elemental Burst
            "https://images.hive.blog/0x0/https://im2.ezgif.com/tmp/ezgif-2-ea0ea58b6e.gif",        // Raidan Elemental Burst
            "https://c.tenor.com/rhwVCB8Fi3wAAAAC/smol-ame-shooting.gif",                           // Smol Ame Punch
            "https://c.tenor.com/z7_bvudApncAAAAC/full-metal-alchemist-electricity.gif",            // Edward Elric Alchemy
            "https://i.imgur.com/LLJkJzK.gif",                                                      // Principal German Suplex Deer
            "https://c.tenor.com/VrWzG0RWmRQAAAAC/anime-punch.gif",                                 // Face Slam
            "https://media4.giphy.com/media/YD8BdrZl0aXpS/giphy.gif",                               // Naruto Rasen Shuriken
            "https://c.tenor.com/CWV7klJfPQQAAAAC/unrelenting-force.gif",                           // Fus Ro Dah
            "https://64.media.tumblr.com/5b6680f3484571290ccef4dc69d8abb2/5994a566b5352703-1a/s500x750/ff78b1a8f39657841951ceac74bbfcc59a569006.gif",
                                                                                                    // Calli vs Gura
            "https://c.tenor.com/bsWTj91W6KQAAAAd/rengoku.gif",                                     // Rengoku 
            "https://thumbs.gfycat.com/AcrobaticGorgeousIntermediateegret-max-1mb.gif",             // Haru Slam
            "https://c.tenor.com/q9__eH7qPYAAAAAC/smash-bros-falcon-punch.gif",                     // Falcon Punch
            "https://c.tenor.com/CZT2fuNfH0QAAAAC/gintama-punching.gif",                            // Gintama Gangup
            "https://c.tenor.com/zo7Xv4QuctQAAAAC/gintama-sadaharu-elizabeth.gif",                  // Sadaharu Punch Elizabeth
            "https://cdn.quotesgram.com/img/12/88/1840491438-tumblr_n8s23ilIjG1tgagauo1_500.gif",   // Reaper Chop
            "https://c.tenor.com/ZvX1_7YBGkEAAAAC/hinamatsuri-angry.gif",                           // Anzu vs Hina
            "https://64.media.tumblr.com/02f219b7d962585dce83f18e313835f5/e30ee1afb9436b78-0d/s500x750/7afba7d4a38fd19441e0f56f856f8fd8e2b8adaf.gif",
                                                                                                    // Mao vs Monks
            "https://i.gifer.com/ntL.gif",                                                          // Mugen vs Samurai
            "https://pa1.narvii.com/6792/1b835eb6198553d5c0a5528fccebea9290d72654_hq.gif",          // GGO Alt Bunny Pew Pew
            "https://c.tenor.com/LlZtlf4W7C8AAAAC/bts-suga.gif",                                    // PSY Slap Suga
            "https://i.pinimg.com/originals/41/3d/6a/413d6a22a316d33048accefdf160778e.gif",         // Roxy Water Ball
            "https://i.redd.it/7bkvp5ldqno71.gif",                                                  // Eris Kicks Ruijerd
            "https://c.tenor.com/IelwsI6Ev-kAAAAC/anime-attack.gif",                                // Ninja Girl Slash
            "https://media2.giphy.com/media/xUO4t2gkWBxDi/giphy.gif",                               // Toradora Punch
            "https://c.tenor.com/VOMInEglleoAAAAC/one-jump-man-animation.gif",                      // Luigi Punch
            "https://c.tenor.com/PjrHRZ83LjYAAAAC/pikachu-quick-attack.gif",                        // Pikachu Quick Attack
            "https://c.tenor.com/tlgJzKeIlJkAAAAC/anya-forger-spy-x-family.gif",                    // Anya Punch
            "https://thumbs.gfycat.com/ArcticVeneratedGull-max-1mb.gif",                            // Kirito Asuna Attack
            "https://data.whicdn.com/images/80210321/original.gif",                                 // Asuna Stab
            "https://c.tenor.com/blYwpMNaaCUAAAAC/nichijou-uppercut.gif",                           // Nichijou Uppercut
            "https://c.tenor.com/EIIInQ5_ARQAAAAC/nichijou-my-ordinary-life-in-north-america.gif",  // Nichijou Spin
            "https://c.tenor.com/NDOBC9JMHvcAAAAC/gintoki-takasugi.gif",                            // Gintama vs Takasugi
            "https://c.tenor.com/xRmKXpnMG1AAAAAC/konosuba-anime.gif",                              // Darkness Attack
            "https://c.tenor.com/jqMXr4BSeeUAAAAC/sucker-punch-punch.gif",                          // Punch Michael Scott
        ];

        let generateEquip = (itemName) => {
            if (!masterStorage["equips"][itemName]) {
                return;
            }
            var id = "";
            while (masterData["items"][id]) {
                id = "";
                for (var i = 0; i < 6; i++) {
                    id += (Math.floor(Math.random() * 10)).toString();
                }
            }
            masterData["items"][id] = {
                name: masterStorage["equips"][itemName].name,
                type: masterStorage["equips"][itemName].type,
                maxHP: 0,
                attack: 0,
                magic: 0,
                defense: 0,
                speed: 0,
                slots: (masterStorage["equips"][itemName].rarity * 10) + 5
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
            for (var k in masterStorage["equips"]) {
                switch(masterStorage["equips"][k].rarity) {
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

            if (masterData["currHunt"]["active"] && masterData["currHunt"]["active"].loot.length != 0) {
                unqiueDrops = masterData["currHunt"]["active"].loot;
            }

            for (var k in masterStorage["scrolls"]) {
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
        var critChance;
        var critDmg;

        let updateStats = (id) => {
            weapon = masterData["items"][masterData["userHunt"][id].weapon];
            armor = masterData["items"][masterData["userHunt"][id].armor];
            accessory = masterData["items"][masterData["userHunt"][id].accessory];
    
            maxHP = masterData["userHunt"][id].maxHP;
            attack = masterData["userHunt"][id].attack;
            magic = masterData["userHunt"][id].magic;
            defense = masterData["userHunt"][id].defense;
            speed = masterData["userHunt"][id].speed;
    
            if (weapon.name != "Nothing") {
                maxHP += weapon.maxHP + masterStorage["equips"][weapon.name].maxHP;
                attack += weapon.attack + masterStorage["equips"][weapon.name].attack;
                magic += weapon.magic + masterStorage["equips"][weapon.name].magic;
                defense += weapon.defense + masterStorage["equips"][weapon.name].defense;
                speed += weapon.speed + masterStorage["equips"][weapon.name].speed;
            }
    
            if (armor.name != "Nothing") {
                maxHP += armor.maxHP + masterStorage["equips"][armor.name].maxHP;
                attack += armor.attack + masterStorage["equips"][armor.name].attack;
                magic += armor.magic + masterStorage["equips"][armor.name].magic;
                defense += armor.defense + masterStorage["equips"][armor.name].defense;
                speed += armor.speed + masterStorage["equips"][armor.name].speed;
            }
    
            if (accessory.name != "Nothing") {
                maxHP += accessory.maxHP + masterStorage["equips"][accessory.name].maxHP;
                attack += accessory.attack + masterStorage["equips"][accessory.name].attack;
                magic += accessory.magic + masterStorage["equips"][accessory.name].magic;
                defense += accessory.defense + masterStorage["equips"][accessory.name].defense;
                speed += accessory.speed + masterStorage["equips"][accessory.name].speed;
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
            if (speed < 0) {
                speed = 0;
            }

            critChance = 0 + (100 * (speed * 0.5 / 100));
            if (critChance > 100) {
                critChance = 100;
                critDmg = 5 + ((speed - 200) * 0.02);
            }
            else
            {
                critDmg = 3 + (speed * 0.01);
            }

            if (!masterData["currHunt"]["active"] || masterData["currHunt"]["active"].currentHP <= 0 || masterData["currHunt"]["active"].retreated) {
                masterData["userHunt"][id].currentHP = maxHP;
            }
            
            if (masterData["currHunt"]["active"]) 
            {
                var alivePlayers = 0;
                var newTime = new Date();

                for (let i = 0; i < masterData["currHunt"]["active"].targets.length; i++) {
                    var target = masterData["currHunt"]["active"].targets[i];
                    if (masterData["userHunt"][target].currentHP > 0) {
                        alivePlayers++;
                    }
                }
            
                if (alivePlayers == 0)
                {
                    masterData["currHunt"]["active"].lastAttack = newTime.getTime();
                }
            }
        }

        let checkDropRate = () =>
        {
            var newTime = new Date();
            var timeDiff = newTime.getTime() - masterData["currHunt"].dropRateStart;
            var duration = masterData["currHunt"].dropDuration;

            if (masterData["currHunt"].dropRate == masterData["currHunt"].baseDropRate && timeDiff > duration)
            {
                masterData["currHunt"].dropRate = masterData["currHunt"].baseDropRate;
            }
        }

        updateStats(userid);

        var command = args[0];
        switch(command) {
            case 'help':
                const huntingCommands = new Map();
                huntingCommands.set('help', 'Displays list of hunting commands.');
                huntingCommands.set('info', 'Displays hunting info. @someone to see their info.');
                huntingCommands.set('gear', 'Displays equipped item info. @someone to see their equiped items.');
                huntingCommands.set('boss', 'Checks current boss.');
                huntingCommands.set('attack', 'Attack the boss if active!');
                huntingCommands.set('inv', 'Display inventory.');
                huntingCommands.set('inv sort', 'Sorts your inventory.');
                huntingCommands.set('equip #', 'Equip an item from the index of your inventory.');
                huntingCommands.set('unequip TYPE', 'Unequip an item. TYPE - weapon/armor/acc.');
                huntingCommands.set('scroll', 'Display all your scrolls.');
                huntingCommands.set('scroll sort CONDITION', 'Sort your scroll inventory. CONDITION - hp/atk/mag/mix/def/spd/chaos/purity/low/high, default sorts by name.');
                huntingCommands.set('scroll TYPE #', 'Select a scroll from scroll inventory to use on your equipped equip. TYPE - weapon/armor/acc, # - index of scroll.');
                huntingCommands.set('give PERSON TYPE #', 'Give an item from equip or scroll inventory at that index to someone. PERSON - the @user, TYPE - equip/scroll, # - index of item.');
                huntingCommands.set('sell TYPE #', 'Sell an item from equip or scroll inventory at that index. TYPE - equip/scroll, # - index of item.');
                huntingCommands.set('sell equip # all', 'Sell all equips starting at the index, ascending up. # - index of item.');
                huntingCommands.set('dex', 'Shows unique monsters you have slayed.');
                huntingCommands.set('dex #', 'Shows the monsterdex entry of the monster you have slayed.');
                huntingCommands.set('pray', 'Increase luck by 1. Just kidding it does\'t do anything.');
                huntingCommands.set('alert CHOICE', 'Turn on or off boss alerts. CHOICE - on/off.');

                embedMsg.setTitle('List of Hunting Commands');
                embedMsg.setColor('FFF000');

                huntingCommands.forEach((values, keys)=> {
                    embedMsg.addField("!tp hunt " + keys, values);
                });

                message.channel.send({ embeds: [embedMsg] });
                break;
            case 'info':
                let getInfo = (id) => {
                    var newTime = new Date();
                    var target = client.users.cache.get(id);
                    
                    embedMsg.setTitle('Hunting Equipment');
                    embedMsg.setAuthor({ name: masterData["userData"][id].name, iconURL: target.displayAvatarURL() });
                    embedMsg.setThumbnail(target.displayAvatarURL());
                    embedMsg.setColor('FFF000');
    
                    var stats = "Max HP: " + maxHP.toLocaleString() + "\nAttack: " + attack.toLocaleString() + "\nMagic: " + magic.toLocaleString() + "\nDefense: " + defense.toLocaleString() + "\nSpeed: " + speed.toLocaleString() + "\n";
                    var currentCondition = "HP: " + masterData["userHunt"][id].currentHP.toLocaleString() + "\n";
    
                    if (masterData["currHunt"]["active"])
                        currentCondition += "Resistance: " + ((1 - (masterData["currHunt"]["active"].attack / (masterData["currHunt"]["active"].attack + (defense * 2)))) * 100).toFixed(2) + "%\n";
                    else {
                        currentCondition += "Resistance: -.--%\n";
                    }
                    
                    currentCondition += "Affinity: " + critChance.toFixed(2) + "%\n";
                    currentCondition += "Crit Dmg: " + critDmg.toFixed(2) + "x\n";
    
                    currentCondition += "Respawn: ";
                    var respawntime = Math.floor((1000 * 120 - (newTime.getTime() - masterData["userHunt"][id].deathTime)) / 1000);
                    if (masterData["userHunt"][id].currentHP <= 0 && masterData["currHunt"]["active"] && masterData["currHunt"]["active"].currentHP > 0 && !masterData["currHunt"]["active"].retreated && respawntime > 0) {
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
                }

                if (args.length > 1) {
                    var mention = args[1];
                    if (mention.startsWith('<@') && mention.endsWith('>')) {
                        mention = mention.slice(2, -1);
                    
                        if (mention.startsWith('!')) {
                            mention = mention.slice(1);
                        }
                    
                        if (!masterData["userData"][mention]) {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription('User does not exist!');
                            message.channel.send({ embeds: [embedMsg] });
                            return;
                        }
                        
                        updateStats(mention);
                        getInfo(mention);
                        updateStats(userid);
                    }
                    else {
                        embedMsg.setTitle('Error!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription('User does not exist!');
                        message.channel.send({ embeds: [embedMsg] });
                        return;
                    }
                }
                else {
                    getInfo(userid);
                }
                break;
            case 'gear':
                let displayGear = (id) => {
                    var target = client.users.cache.get(id);
                    embedMsg.setTitle('Equiped Gear');
                    embedMsg.setAuthor({ name: masterData["userData"][id].name, iconURL: target.displayAvatarURL() });
                    embedMsg.setThumbnail(target.displayAvatarURL());
                    embedMsg.setColor('FFF000');

                    var weapon = masterData["items"][masterData["userHunt"][id].weapon];
                    var armor = masterData["items"][masterData["userHunt"][id].armor];
                    var accessory = masterData["items"][masterData["userHunt"][id].accessory];

                    var baseWeapon = masterStorage["equips"][weapon.name];
                    var baseArmor = masterStorage["equips"][armor.name];
                    var baseAccessory = masterStorage["equips"][accessory.name];

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
                    + "\n\nEnhancement: " + ((weapon.maxHP / 5) + weapon.attack + weapon.magic + weapon.defense + weapon.speed)
                    + "\n\n";

                    var armorText = "\nRarity: " + baseArmor.rarity
                    + "\nMaxHP: " + (armor.maxHP + baseArmor.maxHP) + " (" + armorMaxHP + ")"
                    + "\nAttack: " + (armor.attack + baseArmor.attack) + " (" + armorAttack + ")"
                    + "\nMagic: " + (armor.magic + baseArmor.magic) + " (" + armorMagic + ")"
                    + "\nDefense: " + (armor.defense + baseArmor.defense) + " (" + armorDefense + ")"
                    + "\nSpeed: " + (armor.speed + baseArmor.speed) + " (" + armorSpeed + ")"
                    + "\nSlots: " + armor.slots
                    + "\n\nEnhancement: " + ((armor.maxHP / 5) + armor.attack + armor.magic + armor.defense + armor.speed)
                    + "\n\n";

                    var accessoryText = "\nRarity: " + baseAccessory.rarity
                    + "\nMaxHP: " + (accessory.maxHP + baseAccessory.maxHP) + " (" + accessoryMaxHP + ")"
                    + "\nAttack: " + (accessory.attack + baseAccessory.attack) + " (" + accessoryAttack + ")"
                    + "\nMagic: " + (accessory.magic + baseAccessory.magic) + " (" + accessoryMagic + ")"
                    + "\nDefense: " + (accessory.defense + baseAccessory.defense) + " (" + accessoryDefense + ")"
                    + "\nSpeed: " + (accessory.speed + baseAccessory.speed) + " (" + accessorySpeed + ")"
                    + "\nSlots: " + accessory.slots
                    + "\n\nEnhancement: " + ((accessory.maxHP / 5) + accessory.attack + accessory.magic + accessory.defense + accessory.speed)
                    + "\n\n";

                    embedMsg.setFields(
                        {name: "" + weapon.name + "⠀⠀⠀⠀⠀⠀", value: weaponText, inline: true},
                        {name: "" + armor.name + "⠀⠀⠀⠀⠀⠀", value: armorText, inline: true},
                        {name: "" + accessory.name + "⠀⠀⠀⠀⠀⠀", value: accessoryText, inline: true}
                    );
                    message.channel.send({ embeds: [embedMsg] });
                }

                if (args.length > 1) {
                    var mention = args[1];
                    if (mention.startsWith('<@') && mention.endsWith('>')) {
                        mention = mention.slice(2, -1);
                    
                        if (mention.startsWith('!')) {
                            mention = mention.slice(1);
                        }
                    
                        if (!masterData["userData"][mention]) {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription('User does not exist!');
                            message.channel.send({ embeds: [embedMsg] });
                            return;
                        }
                        displayGear(mention);
                    }
                    else {
                        embedMsg.setTitle('Error!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription('User does not exist!');
                        message.channel.send({ embeds: [embedMsg] });
                        return;
                    }
                }
                else {
                    displayGear(userid);
                }

                break;
            case 'boss':
                if (masterData["currHunt"]["active"] && !masterData["currHunt"]["active"].retreated && masterData["currHunt"]["active"].currentHP > 0) {
                    if (!masterData["currHunt"]["active"].channels.includes(message.channel)) {
                        masterData["currHunt"]["active"].channels.push(message.channel);
                    }
                    var stars = " (";
                    for (let i = 0; i < masterData["currHunt"]["active"].difficulty; i++) {
                        stars += "★";
                    }
                    stars += ")"
                    embedMsg.setTitle(masterData["currHunt"]["active"].name + stars);
                    embedMsg.setDescription(masterData["currHunt"]["active"].name + " is here!");
                    embedMsg.setImage(masterData["currHunt"]["active"].image);
                    embedMsg.setFooter("HP: " + masterData["currHunt"]["active"].currentHP.toLocaleString() + "/" + masterData["currHunt"]["active"].maxHP.toLocaleString() + "\n\nDeaths: " + masterData["currHunt"]["active"].deathCount + "/" + masterData["currHunt"]["active"].deathLimit);
                    embedMsg.setColor("49000F");

                    var selected = masterData["currHunt"]["active"].id;
                    embedMsg.addField('MaxHP', "" + masterStorage["monsterdex"][selected].maxHP.toLocaleString(), true);
                    embedMsg.addField('Attack', "" + masterStorage["monsterdex"][selected].attack.toLocaleString(), true);
                    embedMsg.addField('Defense', "" + masterStorage["monsterdex"][selected].defense.toLocaleString(), true);
                    embedMsg.addField('Magic Defense', "" + masterStorage["monsterdex"][selected].magicdefense.toLocaleString(), true);
                    embedMsg.addField('Speed', "" + (masterStorage["monsterdex"][selected].attackCD / 1000) + "s", true);

                    var newTime = new Date();
                    masterData["currHunt"]["active"].lastBossCheck = newTime.getTime();

                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    embedMsg.setTitle("Emptiness...");
                    embedMsg.setDescription("There is no boss!");
                    embedMsg.setColor('A0FF71');
                    embedMsg.setImage("http://i.imgur.com/7ZHrijt.gif");

                    var newtime = new Date();
                    var timeDiff = newtime.getTime() - masterData["currHunt"].lastSpawn;
                    var nextSpawn = masterData["currHunt"].nextSpawn;
                    var bossTime = nextSpawn - timeDiff;

                    if (bossTime <= 1000 * 60 * 5 && (!masterData["currHunt"]["active"] || (masterData["currHunt"]["active"] && masterData["currHunt"]["active"].retreated))) {
                        embedMsg.setFooter("You feel an ominous presence...");
                    }
                    else if (bossTime <= 1000 * 60 * 10 && (!masterData["currHunt"]["active"] || (masterData["currHunt"]["active"] && masterData["currHunt"]["active"].retreated))) {
                        embedMsg.setFooter("Nature is panicking...");
                    }
                    else if (bossTime <= 1000 * 60 * 15 && (!masterData["currHunt"]["active"] || (masterData["currHunt"]["active"] && masterData["currHunt"]["active"].retreated))) {
                        embedMsg.setFooter("You hear the howling winds...");
                    }
                    else if (bossTime <= 1000 * 60 * 30 && (!masterData["currHunt"]["active"] || (masterData["currHunt"]["active"] && masterData["currHunt"]["active"].retreated))) {
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

                if (masterData["userHunt"][userid].currentHP <= 0) {
                    var timeDiff = newTime.getTime() - masterData["userHunt"][userid].deathTime;
                    if (timeDiff >= 1000 * 120) {
                        masterData["userHunt"][userid].currentHP = maxHP;
                        const reviveMsg = new MessageEmbed()
                        reviveMsg.setTitle("A Hero Returned to Battle!");
                        reviveMsg.setDescription(masterData["userData"][userid].name + " has revived!");
                        reviveMsg.setImage("https://64.media.tumblr.com/bd8a57c555e94c2add81b166bc2016dc/tumblr_ovrvc4t0t61u1ry24o3_500.gif");
                        reviveMsg.setColor('00FF00');
                        reviveMsg.setFooter('Don\'t die again!');
                        message.channel.send({ embeds: [reviveMsg] });
                    }
                }
                
                if (masterData["currHunt"]["active"]) {
                    if (!masterData["currHunt"]["active"].channels.includes(message.channel)) {
                        masterData["currHunt"]["active"].channels.push(message.channel);
                    }
                    var timeDiff = newTime.getTime() - masterData["userHunt"][userid].lastAttack;
                    var attackCD = (1000 * 4.75);

                    if (masterData["currHunt"]["active"].retreated) {    
                        embedMsg.setTitle("Chotto matte!");
                        embedMsg.setDescription(masterData["currHunt"]["active"].name + " has left the field!");
                        embedMsg.setColor("FF0000");
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else if (masterData["currHunt"]["active"].currentHP <= 0) {    
                        embedMsg.setTitle("Stop!");
                        embedMsg.setDescription(masterData["currHunt"]["active"].name + " is already dead!");
                        embedMsg.setImage("https://media1.giphy.com/media/JCAZQKoMefkoX6TyTb/giphy.gif");
                        embedMsg.setColor("FF0000");
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else if (masterData["userHunt"][userid].currentHP <= 0) {
                        embedMsg.setTitle(masterData["userData"][userid].name + " is dead!");
                        embedMsg.setDescription(masterData["userData"][userid].name + " can't attack when you're dead!");
                        var dead = Math.floor((Math.random() * 5) + 1);
                        switch(dead)
                        {
                            case 1:
                                embedMsg.setImage("https://i.imgflip.com/4smorc.gif");
                                break;
                            case 2:
                                embedMsg.setImage("https://c.tenor.com/yNBsgagTI6wAAAAC/dancing-pallbearers-dancing-coffin.gif");
                                break;
                            case 3:
                                embedMsg.setImage("https://c.tenor.com/bG7z11R7yx0AAAAd/funeral-coffin-meme.gif");
                                break;
                            case 4:
                                embedMsg.setImage("https://c.tenor.com/5AMRzU5SQnoAAAAC/coffin-meme-coffin-dance.gif");
                                break;
                            default:
                                embedMsg.setImage("https://i.imgflip.com/426jim.gif");
                                break;
                        }
                        embedMsg.setColor("FF0000");
                        embedMsg.setFooter('Cooldown: ' + Math.floor((1000 * 120 - (newTime.getTime() - masterData["userHunt"][userid].deathTime)) / 1000) + ' seconds');
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else if (timeDiff < attackCD) {
                        embedMsg.setTitle("Chotto matte!");
                        embedMsg.setDescription(masterData["userData"][userid].name + " can't attack yet!");
                        embedMsg.setImage("https://c.tenor.com/eBByy4ihCocAAAAC/angry-fist.gif");
                        embedMsg.setColor("FF0000");
                        embedMsg.setFooter('Cooldown: ' + Math.floor((attackCD - timeDiff) / 1000) + ' seconds');
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else {
                        if (!masterData["currHunt"]["active"].targets.includes(userid)) {
                            masterData["currHunt"]["active"].targets.push(userid);
                            masterData["currHunt"]["active"].playerDamage.push(0);
                        }
                        
                        var isCrit = false;

                        var crit = Math.floor((Math.random() * 100));

                        if (crit <= critChance) {
                            isCrit = true;
                        }

                        var physical = 0;
                        var magical = 0;
                        if (isCrit) {
                            physical = Math.floor(attack * (100 / (100 + (masterData["currHunt"]["active"].defense / 2))));
                            magical = Math.floor(magic * (100 / (100 + (masterData["currHunt"]["active"].magicdefense / 2))));
                        }
                        else {
                            physical = Math.floor(attack * (100 / (100 + masterData["currHunt"]["active"].defense)));
                            magical = Math.floor(magic * (100 / (100 + masterData["currHunt"]["active"].magicdefense)));
                        }

                        var flatDamage = Math.floor(physical + magical);
                        var damageDealt = Math.floor(flatDamage + (flatDamage * ((Math.random() * 6) - 3) / 10));

                        if (damageDealt <= 0) {
                            damageDealt = 1;
                        }

                        masterData["userHunt"][userid].lastAttack = newTime.getTime();

                        if (isCrit) {
                            damageDealt = Math.floor(damageDealt * critDmg);
                        }

                        if (damageDealt > masterData["currHunt"]["active"].currentHP) {
                            damageDealt = masterData["currHunt"]["active"].currentHP;
                        }

                        masterData["currHunt"]["active"].currentHP -= damageDealt;
                        masterData["currHunt"]["active"].playerDamage[masterData["currHunt"]["active"].targets.indexOf(userid)] += damageDealt;
                        masterData["currHunt"]["active"].lastPlayerAttack = newTime.getTime();

                        if (masterData["currHunt"]["active"].currentHP <= 0) {
                            embedMsg.setTitle("Attack!");
                            if (isCrit) {
                                embedMsg.setImage("https://giffiles.alphacoders.com/169/169719.gif");
                                embedMsg.setDescription(masterData["userData"][userid].name + " obliterates " + masterData["currHunt"]["active"].name + " with a critical hit!\n\n" + masterData["currHunt"]["active"].death);
                            }
                            else {
                                embedMsg.setImage("https://c.tenor.com/1Sd82w25kacAAAAM/one-punch-man-punch.gif");
                                embedMsg.setDescription(masterData["userData"][userid].name + " lands the finishing blow on " + masterData["currHunt"]["active"].name + "!\n\n" + masterData["currHunt"]["active"].death);
                            }
                            embedMsg.setColor("00FF00");
                            embedMsg.setFooter('HP: ' + masterData["currHunt"]["active"].currentHP.toLocaleString() + "/" + masterData["currHunt"]["active"].maxHP.toLocaleString() + "\n\nDeaths: " + masterData["currHunt"]["active"].deathCount + "/" + masterData["currHunt"]["active"].deathLimit);

                            getDrops();
                            checkDropRate();

                            masterData["currHunt"].lastSpawn = newTime.getTime();
                            masterData["currHunt"].nextSpawn = masterData["currHunt"].baseTime + (masterData["currHunt"].extraTime * Math.random());
                            masterData["currHunt"].lastDifficulty = [];

                            var rewardLevel = masterData["currHunt"]["active"].difficulty;
                            var goldReward = 1000 * rewardLevel;
                            var reward = "";
                            
                            for (let i = 0; i < masterData["currHunt"]["active"].targets.length; i++) {
                                var mostDamage = "";
                                var lastHit = "";
                                var player = masterData["currHunt"]["active"].targets[i];
                                var goldEarned = 0;
                                goldEarned += Math.floor(goldReward * (masterData["currHunt"]["active"].playerDamage[i] / masterData["currHunt"]["active"].maxHP));
                                var dropRate = masterData["currHunt"].dropRate;
                                if (masterData["currHunt"]["active"].playerDamage[i] == Math.max(...masterData["currHunt"]["active"].playerDamage))
                                {
                                    dropRate *= 1.25;
                                    mostDamage = "\n★ Bonus 0.25x droprate for most damage! ";
                                }
                                if (userid == player) 
                                {
                                    dropRate *= 1.25;
                                    lastHit = "\n★ Bonus 0.25x droprate for last hit! ";
                                }
                                if ((masterData["currHunt"]["active"].id == 27 || masterData["currHunt"]["active"].id == 62))
                                {
                                    dropRate *= 2;
                                }
                                var multiplier = 2.5;

                                var itemsEarned = "";

                                if (unqiueDrops.length != 0) {
                                    for (let i = 0; i < Math.floor(rewardLevel * multiplier); i++) {
                                        var luck = Math.floor((Math.random() * 100000) + 1);
                                        var chance = 100000 * 0.0050 * dropRate; // 0.50%
                                        if (luck <= chance) {
                                            var itemObtained = generateEquip(unqiueDrops[Math.floor(Math.random() * unqiueDrops.length)]);
                                            masterData["userHunt"][player].equips.push(itemObtained);
                                            itemsEarned += ", " + masterData["items"][itemObtained].name;
                                        }
                                    }
                                }

                                for (let i = 0; i < Math.floor(rewardLevel * multiplier); i++) {
                                    var luck = Math.floor((Math.random() * 100000) + 1);
                                    var chance = 100000 * 0.0100 * dropRate; // 1.00%
                                    if (luck <= chance && rewardLevel >= 3) {
                                        var itemObtained = generateEquip(threestar[Math.floor(Math.random() * threestar.length)]);
                                        masterData["userHunt"][player].equips.push(itemObtained);
                                        itemsEarned += ", " + masterData["items"][itemObtained].name;
                                    }
                                }

                                for (let i = 0; i < Math.floor(rewardLevel * multiplier); i++) {
                                    var luck = Math.floor((Math.random() * 100000) + 1);
                                    var chance = 100000 * 0.0200 * dropRate; // 2.00%
                                    if (luck <= chance  && rewardLevel >= 2) {
                                        var itemObtained = generateEquip(twostar[Math.floor(Math.random() * twostar.length)]);
                                        masterData["userHunt"][player].equips.push(itemObtained);
                                        itemsEarned += ", " + masterData["items"][itemObtained].name;
                                    }
                                }

                                for (let i = 0; i < Math.floor(rewardLevel * multiplier); i++) {
                                    var luck = Math.floor((Math.random() * 100000) + 1);
                                    var chance = 100000 * 0.0400 * dropRate; // 4.00%
                                    if (luck <= chance) {
                                        var itemObtained = generateEquip(onestar[Math.floor(Math.random() * onestar.length)]);
                                        masterData["userHunt"][player].equips.push(itemObtained);
                                        itemsEarned += ", " + masterData["items"][itemObtained].name;
                                    }
                                }

                                for (let i = 0; i < Math.floor(rewardLevel * multiplier); i++) {
                                    var luck = Math.floor((Math.random() * 100000) + 1);
                                    var chance = 100000 * 0.0800 * dropRate; // 8.00%
                                    if (luck <= chance) {
                                        var itemObtained = generateEquip(zerostar[Math.floor(Math.random() * zerostar.length)]);
                                        masterData["userHunt"][player].equips.push(itemObtained);
                                        itemsEarned += ", " + masterData["items"][itemObtained].name;
                                    }
                                }

                                for (let i = 0; i < Math.floor(rewardLevel * multiplier); i++) {
                                    var luck = Math.floor((Math.random() * 100000) + 1);
                                    var chance = 100000 * 0.1500 * dropRate; // 15.00%
                                    if (luck <= chance) {
                                        var scrollobtained = scrolldrop[Math.floor(Math.random() * scrolldrop.length)];
                                        masterData["userHunt"][player].scrolls.push(scrollobtained);
                                        itemsEarned += ", " + masterStorage["scrolls"][scrollobtained].name;
                                    }
                                }

                                masterData["userData"][player].points += goldEarned;
                                updateStats(player);

                                if (!masterData["userHunt"][player].monsterdex.includes(masterData["currHunt"]["active"].id)) {
                                    masterData["userHunt"][player].monsterdex.push(masterData["currHunt"]["active"].id);
                                    masterData["userHunt"][player].monsterdex.sort((firstEl, secondEl) => { 
                                        if (Number(firstEl) < Number(secondEl)) {
                                            return -1;
                                        }
                                        if (Number(firstEl) > Number(secondEl)) {
                                            return 1;
                                        }
                                        return 0;
                                    });
                                }
                                
                                reward += masterData["userData"][player].name + " has been awarded with: " + goldEarned.toLocaleString() + " points" + itemsEarned + "! " + mostDamage + lastHit + "\n\n";
                            }

                            const rewardMsg = new MessageEmbed();
                            rewardMsg.setTitle("Congrats!");
                            rewardMsg.setDescription(reward);
                            rewardMsg.setColor("FFF000");
                            rewardMsg.setFooter("Hooray!");
                            
                            let channels = masterData["currHunt"]["active"].channels;
                            for (let i = 0; i < channels.length; i++) {
                                channels[i].send({ embeds: [embedMsg] }).then(msg => 
                                    {
                                    setTimeout(() => {
                                        channels[i].send({ embeds: [rewardMsg] });
                                    }, 3000);
                                })
                            }
                            delete masterData["currHunt"]["active"];
                        }
                        else {
                            embedMsg.setTitle("Attack!");
                            if (isCrit) {
                                embedMsg.setDescription(masterData["userData"][userid].name + " lands a critical hit, dealing " + damageDealt.toLocaleString() + " (" + critDmg.toFixed(2) + "x)" + " damage to " + masterData["currHunt"]["active"].name + "!");
                            }
                            else {
                                embedMsg.setDescription(masterData["userData"][userid].name + " deals " + damageDealt.toLocaleString() + " damage to " + masterData["currHunt"]["active"].name + "!");
                            }
                            embedMsg.setImage(randomAttackGifs[Math.floor(Math.random() * randomAttackGifs.length)]);
                            embedMsg.setColor("00FF00");
                            embedMsg.setFooter('HP: ' + masterData["currHunt"]["active"].currentHP.toLocaleString() + "/" + masterData["currHunt"]["active"].maxHP.toLocaleString() + "\n\nDeaths: " + masterData["currHunt"]["active"].deathCount + "/" + masterData["currHunt"]["active"].deathLimit);
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
                    var timeDiff = newtime.getTime() - masterData["currHunt"].lastSpawn;
                    var nextSpawn = masterData["currHunt"].nextSpawn;
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
                embedMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: target.displayAvatarURL() });
                embedMsg.setTitle('Hunting Inventory');
                embedMsg.setColor('FFF000');
                if (masterData["userHunt"][userid].equips.length == 0) {
                    embedMsg.setDescription('No equips :(');
                    message.channel.send({ embeds: [embedMsg] });
                }
                else if (args.length >= 2 && args[1] == "sort") {
                    masterData["userHunt"][userid].equips.sort((firstEl, secondEl) => { 
                        if (masterStorage["equips"][masterData["items"][firstEl].name].rarity > masterStorage["equips"][masterData["items"][secondEl].name].rarity) {
                            return -1;
                        }
                        if (masterStorage["equips"][masterData["items"][firstEl].name].rarity < masterStorage["equips"][masterData["items"][secondEl].name].rarity) {
                            return 1;
                        }
                        if (masterStorage["equips"][masterData["items"][firstEl].name].type < masterStorage["equips"][masterData["items"][secondEl].name].type) {
                            return -1;
                        }
                        if (masterStorage["equips"][masterData["items"][firstEl].name].type > masterStorage["equips"][masterData["items"][secondEl].name].type) {
                            return 1;
                        }
                        if (masterData["items"][firstEl].slots < masterData["items"][secondEl].slots) {
                            return -1;
                        }
                        if (masterData["items"][firstEl].slots > masterData["items"][secondEl].slots) {
                            return 1;
                        }
                        if (masterData["items"][firstEl].name < masterData["items"][secondEl].name) {
                            return -1;
                        }
                        if (masterData["items"][firstEl].name > masterData["items"][secondEl].name) {
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
                    masterData["userHunt"][userid].equips.forEach((element) => {
                        if (count >= 4) {
                            equipment[index] += "\n";
                            index++;
                            count = 0;
                            equipment.push("");
                        }
                        var standard = masterStorage["equips"][masterData["items"][element].name];
                        var equipType = "";

                        switch (masterData["items"][element].type) {
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

                        equipment[index] += "**__" + (masterData["userHunt"][userid].equips.indexOf(element) + 1) + ". " + masterData["items"][element].name + "__**⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀"
                        + "\nRarity: " + standard.rarity
                        + "\nType: " + equipType;
                        if (masterData["items"][element].maxHP + standard.maxHP != 0) {
                            if (masterData["items"][element].maxHP < 0) {
                                equipment[index] += "\nMaxHP: " + (masterData["items"][element].maxHP + standard.maxHP) + " (" + masterData["items"][element].maxHP + ")";
                            }
                            else {
                                equipment[index] += "\nMaxHP: " + (masterData["items"][element].maxHP + standard.maxHP) + " (+" + masterData["items"][element].maxHP + ")";
                            }
                        }
                        if (masterData["items"][element].attack + standard.attack != 0) {
                            if (masterData["items"][element].attack < 0) {
                                equipment[index] += "\nAttack: " + (masterData["items"][element].attack + standard.attack) + " (" + masterData["items"][element].attack + ")";
                            }
                            else {
                                equipment[index] += "\nAttack: " + (masterData["items"][element].attack + standard.attack) + " (+" + masterData["items"][element].attack + ")";
                            }
                        }
                        if (masterData["items"][element].magic + standard.magic != 0) {
                            if (masterData["items"][element].magic < 0) {
                                equipment[index] += "\nMagic: " + (masterData["items"][element].magic + standard.magic) + " (" + masterData["items"][element].magic + ")";
                            }
                            else {
                                equipment[index] += "\nMagic: " + (masterData["items"][element].magic + standard.magic) + " (+" + masterData["items"][element].magic + ")";
                            }
                        }
                        if (masterData["items"][element].defense + standard.defense != 0) {
                            if (masterData["items"][element].defense < 0) {
                                equipment[index] += "\nDefense: " + (masterData["items"][element].defense + standard.defense) + " (" + masterData["items"][element].defense + ")";
                            }
                            else {
                                equipment[index] += "\nDefense: " + (masterData["items"][element].defense + standard.defense) + " (+" + masterData["items"][element].defense + ")";
                            }
                        }
                        if (masterData["items"][element].speed + standard.speed != 0) {
                            if (masterData["items"][element].speed < 0) {
                                equipment[index] += "\nSpeed: " + (masterData["items"][element].speed + standard.speed) + " (" + masterData["items"][element].speed + ")";
                            }
                            else {
                                equipment[index] += "\nSpeed: " + (masterData["items"][element].speed + standard.speed) + " (+" + masterData["items"][element].speed + ")";
                            }
                        }
                        equipment[index] += "\nSlots: " + masterData["items"][element].slots;
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
                        .setAuthor({ name: masterData["userData"][userid].name, iconURL: target.displayAvatarURL() })
                        .setTitle('Hunting Inventory')
                        .setColor('FFF000');

                    message.channel.send({ embeds: [embedMsg] }).then(msg => {
                        msg.react("◀️").then(r => {
                            msg.react("▶️")

                            const filter = (reaction, user) => ["◀️", "▶️"].includes(reaction.emoji.name) && user.id === userid;
                            const collector = msg.createReactionCollector({ filter, time: 1000 * 120 });

                            collector.on('collect', r => {
                                embedMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: target.displayAvatarURL() });
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
                        if (target > masterData["userHunt"][userid].equips.length || target <= 0) {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription('Please select a valid equipment # from equipments!');
                            embedMsg.setFooter("Look at !tp hunt inv and select a number!");
                            message.channel.send({ embeds: [embedMsg] });
                        }
                        else {
                            var selected = masterData["userHunt"][userid].equips[target-1];
                            masterData["userHunt"][userid].equips.splice(target-1, 1);
                            switch(masterData["items"][selected].type) {
                                case 0:
                                    if (masterData["userHunt"][userid].weapon != "000000") {
                                        masterData["userHunt"][userid].equips.push(masterData["userHunt"][userid].weapon);
                                    }
                                    masterData["userHunt"][userid].weapon = selected;
                                    break;
                                case 1:
                                    if (masterData["userHunt"][userid].armor != "000000") {
                                        masterData["userHunt"][userid].equips.push(masterData["userHunt"][userid].armor);
                                    }
                                    masterData["userHunt"][userid].armor = selected;
                                    break;
                                case 2:
                                    if (masterData["userHunt"][userid].accessory != "000000") {
                                        masterData["userHunt"][userid].equips.push(masterData["userHunt"][userid].accessory);
                                    }
                                    masterData["userHunt"][userid].accessory = selected;
                                    break;
                            }
                            updateStats(userid);
                            embedMsg.setTitle('Equiped!');
                            embedMsg.setColor('00FF00');
                            embedMsg.setDescription(masterData["userData"][userid].name + ' equiped ' + masterData["items"][selected].name);
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
                            if (masterData["userHunt"][userid].weapon != "000000") {
                                masterData["userHunt"][userid].equips.push(masterData["userHunt"][userid].weapon);
                                masterData["userHunt"][userid].weapon = "000000";
                                updateStats(userid);
                                embedMsg.setTitle('Unequiped!');
                                embedMsg.setColor('00FF00');
                                embedMsg.setDescription('Successfully unequiped weapon!');
                                message.channel.send({ embeds: [embedMsg] });
                            }
                            else {
                                embedMsg.setTitle('Error!');
                                embedMsg.setColor('FF0000');
                                embedMsg.setDescription(masterData["userData"][userid].name + ' don\'t have anything equiped!');
                                message.channel.send({ embeds: [embedMsg] });
                            }
                            break;
                        case "armor":
                            if (masterData["userHunt"][userid].armor != "000000") {
                                masterData["userHunt"][userid].equips.push(masterData["userHunt"][userid].armor);
                                masterData["userHunt"][userid].armor = "000000";
                                updateStats(userid);
                                embedMsg.setTitle('Unequiped!');
                                embedMsg.setColor('00FF00');
                                embedMsg.setDescription('Successfully unequiped armor!');
                                message.channel.send({ embeds: [embedMsg] });
                            }
                            else {
                                embedMsg.setTitle('Error!');
                                embedMsg.setColor('FF0000');
                                embedMsg.setDescription(masterData["userData"][userid].name + ' don\'t have anything equiped!');
                                message.channel.send({ embeds: [embedMsg] });
                            }
                            break;
                        case "accessory":
                        case "acc":
                            if (masterData["userHunt"][userid].accessory != "000000") {
                                masterData["userHunt"][userid].equips.push(masterData["userHunt"][userid].accessory);
                                masterData["userHunt"][userid].accessory = "000000";
                                updateStats(userid);
                                embedMsg.setTitle('Unequiped!');
                                embedMsg.setColor('00FF00');
                                embedMsg.setDescription('Successfully unequiped accessory!');
                                message.channel.send({ embeds: [embedMsg] });
                            }
                            else {
                                embedMsg.setTitle('Error!');
                                embedMsg.setColor('FF0000');
                                embedMsg.setDescription(masterData["userData"][userid].name + ' don\'t have anything equiped!');
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
                    embedMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: target.displayAvatarURL() });
                    embedMsg.setTitle('Scroll Inventory');
                    embedMsg.setColor('FFF000');
                    if (masterData["userHunt"][userid].scrolls.length == 0) {
                        embedMsg.setDescription('No scrolls :(');
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else {
                        var allscrolls = [""];
                        var index = 0;
                        var count = 0;

                        for (let i = 0; i < masterData["userHunt"][userid].scrolls.length; i++) {
                            if (count >= 6) {
                                allscrolls[index] += "\n";
                                index++;
                                count = 0;
                                allscrolls.push("");
                            }
                            var element = masterData["userHunt"][userid].scrolls[i];
                            allscrolls[index] += "**__" + (i + 1) + ". " + masterStorage["scrolls"][element].name + "__**⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀";
                            if (masterStorage["scrolls"][element].maxHP != 0) {
                                allscrolls[index] += "\nMaxHP: " + (masterStorage["scrolls"][element].maxHP);
                            }
                            if (masterStorage["scrolls"][element].attack != 0) {
                                allscrolls[index] += "\nAttack: " + (masterStorage["scrolls"][element].attack);
                            }
                            if (masterStorage["scrolls"][element].magic != 0) {
                                allscrolls[index] += "\nMagic: " + (masterStorage["scrolls"][element].magic);
                            }
                            if (masterStorage["scrolls"][element].defense != 0) {
                                allscrolls[index] += "\nDefense: " + (masterStorage["scrolls"][element].defense);
                            }
                            if (masterStorage["scrolls"][element].speed != 0) {
                                allscrolls[index] += "\nSpeed: " + (masterStorage["scrolls"][element].speed);
                            }
                            if (masterStorage["scrolls"][element].chaos) {
                                var rangeMin = (0 - masterStorage["scrolls"][element].badLuck) * masterStorage["scrolls"][element].chaos;
                                var rangeMax = (3 * 2 * masterStorage["scrolls"][element].chaos) + rangeMin;

                                allscrolls[index] += "\nMin Range: " + rangeMin;
                                allscrolls[index] += "\nMax Range: " + rangeMax;
                                allscrolls[index] += "\nChaotic energy infuses into your equipment, affecting all stats.";
                            }
                            if (masterStorage["scrolls"][element].purity) {
                                if (masterStorage["scrolls"][element].purity == 1)
                                {
                                    allscrolls[index] += "\nPurifies your equipment from the good and the bad.";
                                }
                                else if (masterStorage["scrolls"][element].purity == 2)
                                {
                                    allscrolls[index] += "\nPurifies your equipment from the last scroll used.";
                                }
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
                            .setAuthor({ name: masterData["userData"][userid].name, iconURL: target.displayAvatarURL() })
                            .setTitle('Scroll Inventory')
                            .setColor('FFF000');

                        message.channel.send({ embeds: [embedMsg] }).then(msg => {
                            msg.react("◀️").then(r => {
                                msg.react("▶️")

                                const filter = (reaction, user) => ["◀️", "▶️"].includes(reaction.emoji.name) && user.id === userid;
                                const collector = msg.createReactionCollector({ filter, time: 1000 * 120 });

                                collector.on('collect', r => {
                                    embedMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: target.displayAvatarURL() });
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
                                masterData["userHunt"][userid].scrolls.sort((firstEl, secondEl) => { 
                                    if (masterStorage["scrolls"][firstEl].maxHP > masterStorage["scrolls"][secondEl].maxHP) {
                                        return -1;
                                    }
                                    if (masterStorage["scrolls"][firstEl].maxHP < masterStorage["scrolls"][secondEl].maxHP) {
                                        return 1;
                                    }
                                    if (masterStorage["scrolls"][firstEl].name < masterStorage["scrolls"][secondEl].name) {
                                        return -1;
                                    }
                                    if (masterStorage["scrolls"][firstEl].name > masterStorage["scrolls"][secondEl].name) {
                                        return 1;
                                    }
                                    return 0;
                                });
                                embedMsg.setDescription('Scrolls sorted by HP!');
                                break;
                            case "atk":
                            case "attack":
                                masterData["userHunt"][userid].scrolls.sort((firstEl, secondEl) => { 
                                    if (masterStorage["scrolls"][firstEl].attack > masterStorage["scrolls"][secondEl].attack) {
                                        return -1;
                                    }
                                    if (masterStorage["scrolls"][firstEl].attack < masterStorage["scrolls"][secondEl].attack) {
                                        return 1;
                                    }
                                    if (masterStorage["scrolls"][firstEl].name < masterStorage["scrolls"][secondEl].name) {
                                        return -1;
                                    }
                                    if (masterStorage["scrolls"][firstEl].name > masterStorage["scrolls"][secondEl].name) {
                                        return 1;
                                    }
                                    return 0;
                                });
                                embedMsg.setDescription('Scrolls sorted by attack!');
                                break;
                            case "mag":
                            case "matk":
                            case "magic":
                                masterData["userHunt"][userid].scrolls.sort((firstEl, secondEl) => { 
                                    if (masterStorage["scrolls"][firstEl].magic > masterStorage["scrolls"][secondEl].magic) {
                                        return -1;
                                    }
                                    if (masterStorage["scrolls"][firstEl].magic < masterStorage["scrolls"][secondEl].magic) {
                                        return 1;
                                    }
                                    if (masterStorage["scrolls"][firstEl].name < masterStorage["scrolls"][secondEl].name) {
                                        return -1;
                                    }
                                    if (masterStorage["scrolls"][firstEl].name > masterStorage["scrolls"][secondEl].name) {
                                        return 1;
                                    }
                                    return 0;
                                });
                                embedMsg.setDescription('Scrolls sorted by magic!');
                                break;
                            case "mix":
                                masterData["userHunt"][userid].scrolls.sort((firstEl, secondEl) => { 
                                    if (masterStorage["scrolls"][firstEl].attack == masterStorage["scrolls"][firstEl].magic 
                                        && masterStorage["scrolls"][firstEl].attack != 0) {
                                        return -1;
                                    }
                                    if (masterStorage["scrolls"][secondEl].attack == masterStorage["scrolls"][secondEl].magic 
                                        && masterStorage["scrolls"][secondEl].attack != 0) {
                                        return 1;
                                    }
                                    if (masterStorage["scrolls"][firstEl].name < masterStorage["scrolls"][secondEl].name) {
                                        return -1;
                                    }
                                    if (masterStorage["scrolls"][firstEl].name > masterStorage["scrolls"][secondEl].name) {
                                        return 1;
                                    }
                                    return 0;
                                });
                                masterData["userHunt"][userid].scrolls.sort((firstEl, secondEl) => { 
                                    if (masterStorage["scrolls"][firstEl].attack > masterStorage["scrolls"][secondEl].attack && masterStorage["scrolls"][firstEl].magic > masterStorage["scrolls"][secondEl].magic) {
                                        return -1;
                                    }
                                    if (masterStorage["scrolls"][firstEl].attack < masterStorage["scrolls"][secondEl].attack && masterStorage["scrolls"][firstEl].magic < masterStorage["scrolls"][secondEl].magic) {
                                        return 1;
                                    }
                                    return 0;
                                });
                                embedMsg.setDescription('Scrolls sorted by mixed damage!');
                                break;
                            case "def":
                            case "defense":
                                masterData["userHunt"][userid].scrolls.sort((firstEl, secondEl) => { 
                                    if (masterStorage["scrolls"][firstEl].defense > masterStorage["scrolls"][secondEl].defense) {
                                        return -1;
                                    }
                                    if (masterStorage["scrolls"][firstEl].defense < masterStorage["scrolls"][secondEl].defense) {
                                        return 1;
                                    }
                                    if (masterStorage["scrolls"][firstEl].name < masterStorage["scrolls"][secondEl].name) {
                                        return -1;
                                    }
                                    if (masterStorage["scrolls"][firstEl].name > masterStorage["scrolls"][secondEl].name) {
                                        return 1;
                                    }
                                    return 0;
                                });
                                embedMsg.setDescription('Scrolls sorted by defense!');
                                break;
                            case "spd":
                            case "speed":
                                masterData["userHunt"][userid].scrolls.sort((firstEl, secondEl) => { 
                                    if (masterStorage["scrolls"][firstEl].speed > masterStorage["scrolls"][secondEl].speed) {
                                        return -1;
                                    }
                                    if (masterStorage["scrolls"][firstEl].speed < masterStorage["scrolls"][secondEl].speed) {
                                        return 1;
                                    }
                                    if (masterStorage["scrolls"][firstEl].name < masterStorage["scrolls"][secondEl].name) {
                                        return -1;
                                    }
                                    if (masterStorage["scrolls"][firstEl].name > masterStorage["scrolls"][secondEl].name) {
                                        return 1;
                                    }
                                    return 0;
                                });
                                embedMsg.setDescription('Scrolls sorted by speed!');
                                break;
                            case "chaos":
                                masterData["userHunt"][userid].scrolls.sort((firstEl, secondEl) => { 
                                    if (masterStorage["scrolls"][firstEl].chaos && masterStorage["scrolls"][secondEl].chaos && masterStorage["scrolls"][firstEl].chaos > masterStorage["scrolls"][secondEl].chaos) {
                                        return -1;
                                    }
                                    if (masterStorage["scrolls"][firstEl].chaos && masterStorage["scrolls"][secondEl].chaos && masterStorage["scrolls"][firstEl].chaos < masterStorage["scrolls"][secondEl].chaos) {
                                        return 1;
                                    }
                                    if (masterStorage["scrolls"][firstEl].chaos && !masterStorage["scrolls"][secondEl].chaos) {
                                        return -1;
                                    }
                                    if (!masterStorage["scrolls"][firstEl].chaos && masterStorage["scrolls"][secondEl].chaos) {
                                        return 1;
                                    }
                                    if (masterStorage["scrolls"][firstEl].name < masterStorage["scrolls"][secondEl].name) {
                                        return -1;
                                    }
                                    if (masterStorage["scrolls"][firstEl].name > masterStorage["scrolls"][secondEl].name) {
                                        return 1;
                                    }
                                    return 0;
                                });
                                embedMsg.setDescription('Scrolls sorted by chaos!');
                                break;
                            case "ascending":
                            case "ascend":
                            case "low":
                                masterData["userHunt"][userid].scrolls.sort((firstEl, secondEl) => { 
                                    if (masterStorage["scrolls"][firstEl].rarity < masterStorage["scrolls"][secondEl].rarity) {
                                        return -1;
                                    }
                                    if (masterStorage["scrolls"][firstEl].rarity > masterStorage["scrolls"][secondEl].rarity) {
                                        return 1;
                                    }
                                    if (masterStorage["scrolls"][firstEl].name < masterStorage["scrolls"][secondEl].name) {
                                        return -1;
                                    }
                                    if (masterStorage["scrolls"][firstEl].name > masterStorage["scrolls"][secondEl].name) {
                                        return 1;
                                    }
                                    return 0;
                                });
                                embedMsg.setDescription('Scrolls sorted by ascending rarity!');
                                break;
                            case "descending":
                            case "descend":
                            case "high":
                                masterData["userHunt"][userid].scrolls.sort((firstEl, secondEl) => { 
                                    if (masterStorage["scrolls"][firstEl].rarity > masterStorage["scrolls"][secondEl].rarity) {
                                        return -1;
                                    }
                                    if (masterStorage["scrolls"][firstEl].rarity < masterStorage["scrolls"][secondEl].rarity) {
                                        return 1;
                                    }
                                    if (masterStorage["scrolls"][firstEl].name < masterStorage["scrolls"][secondEl].name) {
                                        return -1;
                                    }
                                    if (masterStorage["scrolls"][firstEl].name > masterStorage["scrolls"][secondEl].name) {
                                        return 1;
                                    }
                                    return 0;
                                });
                                embedMsg.setDescription('Scrolls sorted by descending rarity!');
                                break;
                            case 'purity':
                                masterData["userHunt"][userid].scrolls.sort((firstEl, secondEl) => { 
                                    if (masterStorage["scrolls"][firstEl].purity && masterStorage["scrolls"][secondEl].purity && masterStorage["scrolls"][firstEl].purity < masterStorage["scrolls"][secondEl].purity) {
                                        return -1;
                                    }
                                    if (masterStorage["scrolls"][firstEl].purity && masterStorage["scrolls"][secondEl].purity && masterStorage["scrolls"][firstEl].purity > masterStorage["scrolls"][secondEl].purity) {
                                        return 1;
                                    }
                                    if (masterStorage["scrolls"][firstEl].purity && !masterStorage["scrolls"][secondEl].purity) {
                                        return -1;
                                    }
                                    if (!masterStorage["scrolls"][firstEl].purity && masterStorage["scrolls"][secondEl].purity) {
                                        return 1;
                                    }
                                    if (masterStorage["scrolls"][firstEl].name < masterStorage["scrolls"][secondEl].name) {
                                        return -1;
                                    }
                                    if (masterStorage["scrolls"][firstEl].name > masterStorage["scrolls"][secondEl].name) {
                                        return 1;
                                    }
                                    return 0;
                                });
                                embedMsg.setDescription('Scrolls sorted by purity!');
                                break;
                            default:
                                masterData["userHunt"][userid].scrolls.sort((firstEl, secondEl) => { 
                                    if (masterStorage["scrolls"][firstEl].name < masterStorage["scrolls"][secondEl].name) {
                                        return -1;
                                    }
                                    if (masterStorage["scrolls"][firstEl].name > masterStorage["scrolls"][secondEl].name) {
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
                    else if (!isNaN(selectedindex) && selectedindex >= 0 && selectedindex < masterData["userHunt"][userid].scrolls.length) {
                        theScroll = masterStorage["scrolls"][masterData["userHunt"][userid].scrolls[selectedindex]];

                        let scrollGear = (gear) => {
                            if (gear != "000000" && (masterData["items"][gear].slots > 0 || theScroll.purity)) 
                            {
                                var luck = Math.floor((Math.random() * 100) + 1);
                                var chance = 100 * theScroll.rate;

                                var luckyLuck = Math.floor((Math.random() * 100) + 1);
                                var luckyChance = 100 * 0.01;

                                if (luckyLuck <= luckyChance)
                                {
                                    luck = 0;
                                }

                                if (theScroll.purity) 
                                {
                                    let original = [...masterData["userHunt"][userid].scrolls];

                                    const proposalMsg = new MessageEmbed();
                                    proposalMsg.setTitle('Use ' + theScroll.name +  '?');
                                    proposalMsg.setColor('FFF000');

                                    if (theScroll.purity == 1)
                                    {
                                        proposalMsg.setDescription("Would " + masterData["userData"][userid].name + " like to purify " + masterData["items"][gear].name + "?");
                                    }
                                    else if (theScroll.purity == 2 && masterData["items"][gear].lastScroll)
                                    {
                                        proposalMsg.setDescription("Would " + masterData["userData"][userid].name + " like to revert the last scroll used on " + masterData["items"][gear].name + "?");
                                        proposalMsg.setFooter("Stats Gained Back: (" + masterData["items"][gear].lastScroll[0] + "/" + masterData["items"][gear].lastScroll[1] + "/" + masterData["items"][gear].lastScroll[2] + "/"+ masterData["items"][gear].lastScroll[3] + "/" + masterData["items"][gear].lastScroll[4] + ") + 1 Slot");
                                    }
                                    else if (theScroll.purity == 2 && !masterData["items"][gear].lastScroll)
                                    {
                                        embedMsg.setTitle('Error!');
                                        embedMsg.setColor('FF0000');
                                        embedMsg.setDescription(masterData["items"][gear].name + " cannot revert last scroll!");
                                        message.channel.send({ embeds: [embedMsg] });
                                        return;
                                    }
                    
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
                                                if (reaction.emoji.name === '👍' && JSON.stringify(masterData["userHunt"][userid].scrolls) == JSON.stringify(original)) {
                                                    if (luck <= chance) {

                                                        if (theScroll.purity == 1)
                                                        {
                                                            masterData["items"][gear].maxHP = 0;
                                                            masterData["items"][gear].attack = 0;
                                                            masterData["items"][gear].magic = 0;
                                                            masterData["items"][gear].defense = 0;
                                                            masterData["items"][gear].speed = 0;
                                                            masterData["items"][gear].slots = (masterStorage["equips"][masterData["items"][gear].name].rarity * 10) + 5;
                                                        }
                                                        else if (theScroll.purity == 2)
                                                        {
                                                            masterData["items"][gear].maxHP += masterData["items"][gear].lastScroll[0];
                                                            masterData["items"][gear].attack += masterData["items"][gear].lastScroll[1];
                                                            masterData["items"][gear].magic += masterData["items"][gear].lastScroll[2];
                                                            masterData["items"][gear].defense += masterData["items"][gear].lastScroll[3];
                                                            masterData["items"][gear].speed += masterData["items"][gear].lastScroll[4];
                                                            masterData["items"][gear].slots += 1;
                                                        }

                                                        updateStats(userid);
                                                        if (luck == 0)
                                                        {
                                                            if (theScroll.purity == 2)
                                                            {
                                                                embedMsg.setTitle('Super Success! - ' + theScroll.name + " - (" + masterData["items"][gear].lastScroll[0] + "/" + masterData["items"][gear].lastScroll[1] + "/" + masterData["items"][gear].lastScroll[2] + "/"+ masterData["items"][gear].lastScroll[3] + "/" + masterData["items"][gear].lastScroll[4] + ") + 1 Slot");
                                                                embedMsg.setColor('FFF000');
                                                            }
                                                            else 
                                                            {
                                                                embedMsg.setTitle('Super Success! - ' + theScroll.name);
                                                                embedMsg.setColor('FFF000');
                                                            }
                                                        }
                                                        else
                                                        {
                                                            if (theScroll.purity == 2)
                                                            {
                                                                embedMsg.setTitle('Success! - ' + theScroll.name  + " - (" + masterData["items"][gear].lastScroll[0] + "/" + masterData["items"][gear].lastScroll[1] + "/" + masterData["items"][gear].lastScroll[2] + "/"+ masterData["items"][gear].lastScroll[3] + "/" + masterData["items"][gear].lastScroll[4] + ") + 1 Slot");
                                                                embedMsg.setColor('00FF00');
                                                            }
                                                            else 
                                                            {
                                                                embedMsg.setTitle('Success! - ' + theScroll.name);
                                                                embedMsg.setColor('00FF00');
                                                            }
                                                        }
                                                        
                                                        embedMsg.setImage('https://i.imgur.com/dHbQVgC.gif');
                                                        embedMsg.setDescription('The scroll lights up, and then its mysterious power has been transferred to the item.');
                                                        embedMsg.setFooter(masterData["userData"][userid].name + " rolled " + luck + "/100 and needed equal to or less than " + chance.toFixed(0) + " to pass!");
                                                        message.channel.send({ embeds: [embedMsg] });
                                                        masterData["userHunt"][userid].scrolls.splice(selectedindex, 1);
                                                        if (masterData["items"][gear].lastScroll)
                                                        {
                                                            delete masterData["items"][gear].lastScroll;
                                                        }
                                                    }
                                                    else {
                                                        embedMsg.setTitle('Fail! - ' + theScroll.name);
                                                        embedMsg.setColor('FF0000');
                                                        embedMsg.setImage('https://i.imgur.com/Bi2LNzQ.gif');
                                                        embedMsg.setDescription('The scroll lights up, but the item winds up as if nothing happened.');
                                                        embedMsg.setFooter(masterData["userData"][userid].name + " rolled " + luck + "/100 and needed equal to or less than " + chance.toFixed(0) + " to pass!");
                                                        message.channel.send({ embeds: [embedMsg] });
                                                        masterData["userHunt"][userid].scrolls.splice(selectedindex, 1);
                                                    }
                                                } 
                                                else if (reaction.emoji.name === '👎')
                                                {
                                                    embedMsg.setTitle('Error!');
                                                    embedMsg.setColor('FF0000');
                                                    embedMsg.setDescription(masterData["userData"][userid].name + " declined!");
                                                    message.channel.send({ embeds: [embedMsg] });
                                                }
                                                else {
                                                    embedMsg.setTitle('Fail!');
                                                    embedMsg.setColor('FF0000');
                                                    embedMsg.setDescription(masterData["userData"][userid].name + " inventory changed!");
                                                    message.channel.send({ embeds: [embedMsg] });
                                                }
                                            })
                                            .catch(collected => {
                                                embedMsg.setTitle('Error!');
                                                embedMsg.setColor('FF0000');
                                                embedMsg.setDescription(masterData["userData"][userid].name + " took too long to decide!");
                                                message.channel.send({ embeds: [embedMsg] });
                                            });
                                        }
                                    );
                                }
                                else 
                                {
                                    if (luck <= chance) 
                                    {
                                        if (theScroll.chaos) {
                                            var range = []
                                            var rangeMin = (0 - theScroll.badLuck) * theScroll.chaos;
                                            var rangeMax = (3 * 2 * theScroll.chaos) + 1 + rangeMin;
                                            for (let i = rangeMin; i < rangeMax; i++)
                                                range.push(i);
                                            
                                            var hpgain = range[Math.floor(Math.random() * range.length)] * 5;
                                            var atkgain = range[Math.floor(Math.random() * range.length)];
                                            var maggain = range[Math.floor(Math.random() * range.length)];
                                            var defgain = range[Math.floor(Math.random() * range.length)];
                                            var spdgain = range[Math.floor(Math.random() * range.length)];

                                            masterData["items"][gear].maxHP += hpgain;
                                            masterData["items"][gear].attack += atkgain;
                                            masterData["items"][gear].magic += maggain;
                                            masterData["items"][gear].defense += defgain;
                                            masterData["items"][gear].speed += spdgain;
                                            masterData["items"][gear].slots--;

                                            masterData["items"][gear].lastScroll = [-hpgain, -atkgain, -maggain, -defgain, -spdgain];

                                            if (luck == 0)
                                            {
                                                embedMsg.setTitle('Super Success! - ' + theScroll.name + " - (" + hpgain + "/" + atkgain + "/" + maggain + "/"+ defgain + "/" + spdgain + ")");
                                                embedMsg.setColor('FFF000');
                                            }
                                            else
                                            {
                                                embedMsg.setTitle('Success! - ' + theScroll.name + " - (" + hpgain + "/" + atkgain + "/" + maggain + "/"+ defgain + "/" + spdgain + ")");
                                                embedMsg.setColor('00FF00');
                                            }

                                        }
                                        else {
                                            masterData["items"][gear].maxHP += theScroll.maxHP;
                                            masterData["items"][gear].attack += theScroll.attack;
                                            masterData["items"][gear].magic += theScroll.magic;
                                            masterData["items"][gear].defense += theScroll.defense;
                                            masterData["items"][gear].speed += theScroll.speed;
                                            masterData["items"][gear].slots--;
                                            
                                            masterData["items"][gear].lastScroll = [-theScroll.maxHP, -theScroll.attack, -theScroll.magic, -theScroll.defense, -theScroll.speed]

                                            if (luck == 0)
                                            {
                                                embedMsg.setTitle('Super Success! - ' + theScroll.name);
                                                embedMsg.setColor('FFF000');
                                            }
                                            else
                                            {
                                                embedMsg.setTitle('Success! - ' + theScroll.name);
                                                embedMsg.setColor('00FF00');
                                            }
                                        }
                                        updateStats(userid);
                                        embedMsg.setImage('https://i.imgur.com/dHbQVgC.gif');
                                        embedMsg.setDescription('The scroll lights up, and then its mysterious power has been transferred to the item.');
                                        embedMsg.setFooter(masterData["userData"][userid].name + " rolled " + luck + "/100 and needed equal to or less than " + chance.toFixed(0) + " to pass!");
                                        message.channel.send({ embeds: [embedMsg] });
                                        masterData["userHunt"][userid].scrolls.splice(selectedindex, 1);
                                    }
                                    else { 
                                        embedMsg.setTitle('Fail! - ' + theScroll.name);
                                        embedMsg.setColor('FF0000');
                                        embedMsg.setImage('https://i.imgur.com/Bi2LNzQ.gif');
                                        embedMsg.setDescription('The scroll lights up, but the item winds up as if nothing happened.');
                                        embedMsg.setFooter(masterData["userData"][userid].name + " rolled " + luck + "/100 and needed equal to or less than " + chance.toFixed(0) + " to pass!");
                                        message.channel.send({ embeds: [embedMsg] });
                                        masterData["userHunt"][userid].scrolls.splice(selectedindex, 1);
                                    }
                                }
                            }
                            else {
                                embedMsg.setTitle('Error!');
                                embedMsg.setColor('FF0000');
                                embedMsg.setDescription(masterData["userData"][userid].name + ' don\'t have anything equiped or your equip ran out of slots!');
                                embedMsg.setFooter("!tp hunt scroll weapon/armor/acc #");
                                message.channel.send({ embeds: [embedMsg] });
                            }
                        }
                        
                        switch (choice) {
                            case "weapon":
                                scrollGear(masterData["userHunt"][userid].weapon);
                                break;
                            case "armor":
                                scrollGear(masterData["userHunt"][userid].armor);
                                break;
                            case "accessory":
                            case "acc":
                                scrollGear(masterData["userHunt"][userid].accessory);
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
                
                        if (!masterData["userData"][mention]) {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription('User does not exist!');
                            message.channel.send({ embeds: [embedMsg] });
                            return;
                        }
                        if (masterData["userData"][mention] == masterData["userData"][userid]) {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription(masterData["userData"][userid].name + ' can\'t give to yourself!');
                            message.channel.send({ embeds: [embedMsg] });
                            return;
                        }
                        
                        if (!isNaN(index)) {
                            switch(choice) {
                                case "inv":
                                case "equip":
                                    if (index >= masterData["userHunt"][userid].equips.length || index < 0) {
                                        embedMsg.setTitle('Error!');
                                        embedMsg.setColor('FF0000');
                                        embedMsg.setDescription('Please select a valid equipment # from equipments!');
                                        embedMsg.setFooter("Look at !tp hunt inv and select a number!")
                                        message.channel.send({ embeds: [embedMsg] });
                                    }
                                    else {

                                        let original = [...masterData["userHunt"][userid].equips];

                                        const proposalMsg = new MessageEmbed();
                                        proposalMsg.setTitle('Give Item!');
                                        proposalMsg.setColor('FFF000');
                                        proposalMsg.setDescription("Would " + masterData["userData"][userid].name + " like to give " + masterData["items"][masterData["userHunt"][userid].equips[index]].name + " to " + masterData["userData"][mention].name + "?");
                        
                                        
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
                                                    if (reaction.emoji.name === '👍' && JSON.stringify(masterData["userHunt"][userid].equips) == JSON.stringify(original)) {
                                                        var selected = masterData["userHunt"][userid].equips[index];
                                                        masterData["userHunt"][mention].equips.push(masterData["userHunt"][userid].equips[index]);
                                                        masterData["userHunt"][userid].equips.splice(index, 1);

                                                        embedMsg.setTitle('Success!');
                                                        embedMsg.setColor('00FF00');
                                                        embedMsg.setDescription(masterData["userData"][userid].name + " gave " + masterData["userData"][mention].name + " " + masterData["items"][selected].name + "!");
                                                        message.channel.send({ embeds: [embedMsg] });
                                                    } 
                                                    else if (reaction.emoji.name === '👎')
                                                    {
                                                        embedMsg.setTitle('Error!');
                                                        embedMsg.setColor('FF0000');
                                                        embedMsg.setDescription(masterData["userData"][userid].name + " declined!");
                                                        message.channel.send({ embeds: [embedMsg] });
                                                    }
                                                    else {
                                                        embedMsg.setTitle('Fail!');
                                                        embedMsg.setColor('FF0000');
                                                        embedMsg.setDescription(masterData["userData"][userid].name + " inventory changed!");
                                                        message.channel.send({ embeds: [embedMsg] });
                                                    }
                                                })
                                                .catch(collected => {
                                                    embedMsg.setTitle('Error!');
                                                    embedMsg.setColor('FF0000');
                                                    embedMsg.setDescription(masterData["userData"][userid].name + " took too long to decide!");
                                                    message.channel.send({ embeds: [embedMsg] });
                                                });
                                            }
                                        );
                                    }
                                    break;
                                case "scroll":
                                    if (index >= masterData["userHunt"][userid].scrolls.length || index < 0) {
                                        embedMsg.setTitle('Error!');
                                        embedMsg.setColor('FF0000');
                                        embedMsg.setDescription('Please select a valid scroll # from scroll!');
                                        embedMsg.setFooter("Look at !tp hunt scroll and select a number!")
                                        message.channel.send({ embeds: [embedMsg] });
                                    }
                                    else {

                                        let original = [...masterData["userHunt"][userid].scrolls];

                                        const proposalMsg = new MessageEmbed();
                                        proposalMsg.setTitle('Give Item!');
                                        proposalMsg.setColor('FFF000');
                                        proposalMsg.setDescription("Would " + masterData["userData"][userid].name + " like to give " + masterStorage["scrolls"][masterData["userHunt"][userid].scrolls[index]].name + " to " + masterData["userData"][mention].name + "?");
                        
                                        
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
                                                    if (reaction.emoji.name === '👍' && JSON.stringify(masterData["userHunt"][userid].scrolls) == JSON.stringify(original)) {
                                                        var selected = masterData["userHunt"][userid].scrolls[index];
                                                        masterData["userHunt"][mention].scrolls.push(masterData["userHunt"][userid].scrolls[index]);
                                                        masterData["userHunt"][userid].scrolls.splice(index, 1);

                                                        embedMsg.setTitle('Success!');
                                                        embedMsg.setColor('00FF00');
                                                        embedMsg.setDescription(masterData["userData"][userid].name + " gave " + masterData["userData"][mention].name + " " + masterStorage["scrolls"][selected].name + "!");
                                                        message.channel.send({ embeds: [embedMsg] });
                                                    } 
                                                    else if (reaction.emoji.name === '👎') {
                                                        embedMsg.setTitle('Error!');
                                                        embedMsg.setColor('FF0000');
                                                        embedMsg.setDescription(masterData["userData"][userid].name + " declined!");
                                                        message.channel.send({ embeds: [embedMsg] });
                                                    }
                                                    else {
                                                        embedMsg.setTitle('Fail!');
                                                        embedMsg.setColor('FF0000');
                                                        embedMsg.setDescription(masterData["userData"][userid].name + " inventory changed!");
                                                        message.channel.send({ embeds: [embedMsg] });
                                                    }
                                                })
                                                .catch(collected => {
                                                    embedMsg.setTitle('Error!');
                                                    embedMsg.setColor('FF0000');
                                                    embedMsg.setDescription(masterData["userData"][userid].name + " took too long to decide!");
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
                    var all = args[3];
                    if (!isNaN(target)) {
                        switch(type) {
                            case "inv":
                            case "equip":
                                if (target < 0 || target >= masterData["userHunt"][userid].equips.length) {
                                    embedMsg.setTitle('Error!');
                                    embedMsg.setColor('FF0000');
                                    embedMsg.setDescription('Weapon does not exist!');
                                    embedMsg.setFooter("!tp hunt sell equip/scroll #");
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                else if (all == "all") {
                                    let original = [...masterData["userHunt"][userid].equips];
                                    var price = 0;
                                    var total_items = 0;
                                    for (let i = target; i < masterData["userHunt"][userid].equips.length; i++) {
                                        var selectedWeapon = masterStorage["equips"][masterData["items"][masterData["userHunt"][userid].equips[target]].name];
                                        if (selectedWeapon.rarity != 0) {
                                            price += selectedWeapon.rarity * 500;
                                        }
                                        else {
                                            price += 100;
                                        }
                                        total_items++;
                                    }
                                    
                                    const proposalMsg = new MessageEmbed();
                                    proposalMsg.setTitle('Selling!');
                                    proposalMsg.setColor('FFF000');
                                    proposalMsg.setDescription("Would " + masterData["userData"][userid].name + " like to sell " + selectedWeapon.name + 
                                                                " and the " + (total_items - 1) + " above item(s) for " + price.toLocaleString() + " points?");

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
                                                if (reaction.emoji.name === '👍' && JSON.stringify(masterData["userHunt"][userid].equips) == JSON.stringify(original)) {
                                                    masterData["userData"][userid].points += price;

                                                    for (let i = target; i < masterData["userHunt"][userid].equips.length; i++) {
                                                        var itemToDelete = masterData["userHunt"][userid].equips[target];
                                                        delete masterData["items"][itemToDelete];
                                                    }

                                                    masterData["userHunt"][userid].equips.splice(target, masterData["userHunt"][userid].equips.length - target);

                                                    embedMsg.setTitle('Sold!');
                                                    embedMsg.setColor('00FF00');
                                                    embedMsg.setDescription(masterData["userData"][userid].name + " sold " + total_items + " equips for " + price.toLocaleString() + " points!");
                                                    message.channel.send({ embeds: [embedMsg] });
                                                } 
                                                else if (reaction.emoji.name === '👎') {
                                                    embedMsg.setTitle('Declined!');
                                                    embedMsg.setColor('FF0000');
                                                    embedMsg.setDescription(masterData["userData"][userid].name + " declined!");
                                                    message.channel.send({ embeds: [embedMsg] });
                                                }
                                                else {
                                                    embedMsg.setTitle('Fail!');
                                                    embedMsg.setColor('FF0000');
                                                    embedMsg.setDescription(masterData["userData"][userid].name + " inventory changed!");
                                                    message.channel.send({ embeds: [embedMsg] });
                                                }
                                            })
                                            .catch(collected => {
                                                embedMsg.setTitle('Fail!');
                                                embedMsg.setColor('FF0000');
                                                embedMsg.setDescription(masterData["userData"][userid].name + " took too long to respond!");
                                                message.channel.send({ embeds: [embedMsg] });
                                            });
                                        }
                                    );
                                }
                                else {
                                    let original = [...masterData["userHunt"][userid].equips];

                                    var selectedWeapon = masterStorage["equips"][masterData["items"][masterData["userHunt"][userid].equips[target]].name];
                                    if (selectedWeapon.rarity != 0) {
                                        var price = selectedWeapon.rarity * 500;
                                    }
                                    else {
                                        var price = 100;
                                    }
                                    const proposalMsg = new MessageEmbed();
                                    proposalMsg.setTitle('Selling!');
                                    proposalMsg.setColor('FFF000');
                                    proposalMsg.setDescription("Would " + masterData["userData"][userid].name + " like to sell " + selectedWeapon.name + " for " + price.toLocaleString() + " points?");
        
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
                                                if (reaction.emoji.name === '👍' && JSON.stringify(masterData["userHunt"][userid].equips) == JSON.stringify(original)) {
                                                    masterData["userData"][userid].points += price;
                                                    var itemToDelete = masterData["userHunt"][userid].equips[target];
                                                    masterData["userHunt"][userid].equips.splice(target, 1);
                                                    delete masterData["items"][itemToDelete];
                                                    embedMsg.setTitle('Sold!');
                                                    embedMsg.setColor('00FF00');
                                                    embedMsg.setDescription(masterData["userData"][userid].name + " sold " + selectedWeapon.name + " for " + price.toLocaleString() + " points!");
                                                    message.channel.send({ embeds: [embedMsg] });
                                                } 
                                                else if (reaction.emoji.name === '👎') {
                                                    embedMsg.setTitle('Declined!');
                                                    embedMsg.setColor('FF0000');
                                                    embedMsg.setDescription(masterData["userData"][userid].name + " declined!");
                                                    message.channel.send({ embeds: [embedMsg] });
                                                }
                                                else {
                                                    embedMsg.setTitle('Fail!');
                                                    embedMsg.setColor('FF0000');
                                                    embedMsg.setDescription(masterData["userData"][userid].name + " inventory changed!");
                                                    message.channel.send({ embeds: [embedMsg] });
                                                }
                                            })
                                            .catch(collected => {
                                                embedMsg.setTitle('Fail!');
                                                embedMsg.setColor('FF0000');
                                                embedMsg.setDescription(masterData["userData"][userid].name + " took too long to respond!");
                                                message.channel.send({ embeds: [embedMsg] });
                                            });
                                        }
                                    );
                                }
                                break;
                            case "scroll":
                                if (target < 0 || target >= masterData["userHunt"][userid].scrolls.length) {
                                    embedMsg.setTitle('Error!');
                                    embedMsg.setColor('FF0000');
                                    embedMsg.setDescription('Scroll does not exist!');
                                    embedMsg.setFooter("!tp hunt sell equip/scroll #");
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                else {
                                    let original = [...masterData["userHunt"][userid].scrolls];
                                    var selectedScroll = masterStorage["scrolls"][masterData["userHunt"][userid].scrolls[target]];
                                    var price = 100;
                                    const proposalMsg = new MessageEmbed();
                                    proposalMsg.setTitle('Selling!');
                                    proposalMsg.setColor('FFF000');
                                    proposalMsg.setDescription("Would " + masterData["userData"][userid].name + " like to sell " + selectedScroll.name + " for " + price.toLocaleString() + " points?");
        
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
                                                if (reaction.emoji.name === '👍' && JSON.stringify(masterData["userHunt"][userid].scrolls) == JSON.stringify(original)) {
                                                    masterData["userData"][userid].points += price;
                                                    masterData["userHunt"][userid].scrolls.splice(target, 1)
                                                    embedMsg.setTitle('Sold!');
                                                    embedMsg.setColor('00FF00');
                                                    embedMsg.setDescription(masterData["userData"][userid].name + " sold " + selectedScroll.name + " for " + price.toLocaleString() + " points!");
                                                    message.channel.send({ embeds: [embedMsg] });
                                                } 
                                                else if (reaction.emoji.name === '👎') {
                                                    embedMsg.setTitle('Declined!');
                                                    embedMsg.setColor('FF0000');
                                                    embedMsg.setDescription(masterData["userData"][userid].name + " declined!");
                                                    message.channel.send({ embeds: [embedMsg] });
                                                }
                                                else {
                                                    embedMsg.setTitle('Fail!');
                                                    embedMsg.setColor('FF0000');
                                                    embedMsg.setDescription(masterData["userData"][userid].name + " inventory changed!");
                                                    message.channel.send({ embeds: [embedMsg] });
                                                }
                                            })
                                            .catch(collected => {
                                                embedMsg.setTitle('Fail!');
                                                embedMsg.setColor('FF0000');
                                                embedMsg.setDescription(masterData["userData"][userid].name + " took too long to respond!");
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
                embedMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: target.displayAvatarURL() });
                embedMsg.setTitle('Monsterdex');
                embedMsg.setThumbnail('https://i.imgur.com/EJA4Vzn.png');
                embedMsg.setColor('FFF000');
                if (args.length > 1) {
                    var selected = args[1];
                    if (!isNaN(Number(selected)) && masterStorage["monsterdex"][selected] && masterData["userHunt"][userid].monsterdex.includes(selected)) {
                        var stars = " (";
                        for (let i = 0; i < masterStorage["monsterdex"][selected].difficulty; i++) {
                            stars += "★";
                        }
                        stars += ")"
                        embedMsg.setDescription("#" + masterStorage["monsterdex"][selected].id + ". " + masterStorage["monsterdex"][selected].name + stars + "\n");
                        embedMsg.setImage(masterStorage["monsterdex"][selected].image);
                        embedMsg.addField('Monsterdex Entry', "" + masterStorage["monsterdex"][selected].info);
                        embedMsg.addField('MaxHP', "" + masterStorage["monsterdex"][selected].maxHP.toLocaleString(), true);
                        embedMsg.addField('Attack', "" + masterStorage["monsterdex"][selected].attack.toLocaleString(), true);
                        embedMsg.addField('Defense', "" + masterStorage["monsterdex"][selected].defense.toLocaleString(), true);
                        embedMsg.addField('Magic Defense', "" + masterStorage["monsterdex"][selected].magicdefense.toLocaleString(), true);
                        embedMsg.addField('Speed', "" + (masterStorage["monsterdex"][selected].attackCD / 1000) + "s", true);
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else {
                        embedMsg.setDescription(masterData["userData"][userid].name + ' never encountered this monster or it does not exist!');
                        message.channel.send({ embeds: [embedMsg] }); 
                    }
                }
                else {
                    var monsters = [""];
                    var index = 0;
                    var count = 0;
                    var keys = [];
                    for (var k in masterStorage["monsterdex"]) {
                        keys.push(k);
                    }
                    for (let i = 1; i < keys.length + 1; i++) {
                        if (count >= 10) {
                            index++;
                            count = 0;
                            monsters[index] = "";
                        }
                        if (masterData["userHunt"][userid].monsterdex.includes(i.toString())) {
                            monsters[index] += "#" + masterStorage["monsterdex"][i].id + ". " + masterStorage["monsterdex"][i].name + "\n";
                        }
                        else {
                            monsters[index] += "#" + masterStorage["monsterdex"][i].id + ". ???\n";
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
                        .setAuthor({ name: masterData["userData"][userid].name, iconURL: target.displayAvatarURL() })
                        .setTitle('Monsterdex')
                        .setThumbnail('https://i.imgur.com/EJA4Vzn.png')
                        .setColor('FFF000');

                    message.channel.send({ embeds: [embedMsg] }).then(msg => {
                        msg.react("◀️").then(r => {
                            msg.react("▶️")

                            const filter = (reaction, user) => ["◀️", "▶️"].includes(reaction.emoji.name) && user.id === userid;
                            const collector = msg.createReactionCollector({ filter, time: 1000 * 120 });

                            collector.on('collect', r => {
                                embedMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: target.displayAvatarURL() });
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
            case 'tribute':
                if (args.length < 4) {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription('Please select 3 masterStorage["scrolls"] to consume!');
                    embedMsg.setFooter("!tp hunt tribute # # #");
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    var scroll_one = Math.floor(Number(args[1]) - 1);
                    var scroll_two = Math.floor(Number(args[2]) - 1);
                    var scroll_three = Math.floor(Number(args[3]) - 1);
                    var cost = 10000;

                    if ((scroll_one >= masterData["userHunt"][userid].scrolls.length || scroll_one < 0 || isNaN(scroll_one)) ||
                            (scroll_two >= masterData["userHunt"][userid].scrolls.length || scroll_two < 0 || isNaN(scroll_two)) ||
                                (scroll_three >= masterData["userHunt"][userid].scrolls.length || scroll_three < 0 || isNaN(scroll_three))) {
                        embedMsg.setTitle('Error!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription('Please select a valid scroll # from scroll!');
                        embedMsg.setFooter("!tp hunt tribute # # #");
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else if (scroll_one == scroll_two || scroll_one == scroll_three || scroll_two == scroll_three)
                    {
                        embedMsg.setTitle('Error!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription('You cannot tribute the same scroll!');
                        embedMsg.setFooter("!tp hunt tribute # # #");
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else if (masterData["userData"][userid].points < cost) 
                    {
                        embedMsg.setTitle('Error!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription('You do not have enough points!');
                        embedMsg.setFooter("Tribute costs " + cost.toLocaleString() + " points!");
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else 
                    {
                        let original = [...masterData["userHunt"][userid].scrolls];
                        const proposalMsg = new MessageEmbed();
                        proposalMsg.setTitle('Tribute Summon!');
                        proposalMsg.setColor('FFF000');
                        proposalMsg.setDescription("Would " + masterData["userData"][userid].name + " like to spend " + cost.toLocaleString() + " points to sacrifice: \n" + masterStorage["scrolls"][masterData["userHunt"][userid].scrolls[scroll_one]].name + "\n" +
                                                    masterStorage["scrolls"][masterData["userHunt"][userid].scrolls[scroll_two]].name + "\n" + masterStorage["scrolls"][masterData["userHunt"][userid].scrolls[scroll_three]].name +
                                                    "\n\nTo summon a random scroll?");

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
                                    if (reaction.emoji.name === '👍' && JSON.stringify(masterData["userHunt"][userid].scrolls) == JSON.stringify(original)) {
                                        masterData["userData"][userid].points -= cost;
                                        var target = client.users.cache.get(userid);
                                        var scrollsTributed = [masterData["userHunt"][userid].scrolls[scroll_one], masterData["userHunt"][userid].scrolls[scroll_two], masterData["userHunt"][userid].scrolls[scroll_three]];
                                        getDrops();
                                        var scrollobtained = scrolldrop[Math.floor(Math.random() * scrolldrop.length)];
                                        while (scrollsTributed.includes(scrollobtained))
                                        {
                                            scrollobtained = scrolldrop[Math.floor(Math.random() * scrolldrop.length)];
                                        }
                                        embedMsg.setDescription(masterData["userData"][userid].name + " sacrifices \n" + masterStorage["scrolls"][masterData["userHunt"][userid].scrolls[scroll_one]].name + ", \n" +
                                        masterStorage["scrolls"][masterData["userHunt"][userid].scrolls[scroll_two]].name + ", \nand " + masterStorage["scrolls"][masterData["userHunt"][userid].scrolls[scroll_three]].name +
                                                " to summon... \n\n" + masterStorage["scrolls"][scrollobtained].name + "!");
                
                                        var scrollsToDel = [scroll_one, scroll_two, scroll_three];
                                        scrollsToDel.sort(
                                            function(a, b) { return a - b }
                                        );
                                        scrollsToDel.reverse();
                                        for (let i = 0; i < 3; i++)
                                        {
                                            masterData["userHunt"][userid].scrolls.splice(scrollsToDel[i], 1);
                                        }
                                        masterData["userHunt"][userid].scrolls.push(scrollobtained);
                                        embedMsg.setTitle('Success!');
                                        embedMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: target.displayAvatarURL() });
                                        embedMsg.setColor('00FF00');
                                        embedMsg.setImage('https://i.pinimg.com/originals/ff/ab/3a/ffab3adc05afc03cf59c2114095a320b.gif');
                                        message.channel.send({ embeds: [embedMsg] });
                                    } 
                                    else if (reaction.emoji.name === '👎') {
                                        embedMsg.setTitle('Declined!');
                                        embedMsg.setColor('FF0000');
                                        embedMsg.setDescription(masterData["userData"][userid].name + " declined!");
                                        message.channel.send({ embeds: [embedMsg] });
                                    }
                                    else {
                                        embedMsg.setTitle('Fail!');
                                        embedMsg.setColor('FF0000');
                                        embedMsg.setDescription(masterData["userData"][userid].name + " inventory changed!");
                                        message.channel.send({ embeds: [embedMsg] });
                                    }
                                })
                                .catch(collected => {
                                    embedMsg.setTitle('Fail!');
                                    embedMsg.setColor('FF0000');
                                    embedMsg.setDescription(masterData["userData"][userid].name + " took too long to respond!");
                                    message.channel.send({ embeds: [embedMsg] });
                                });
                            }
                        );
                    }
                }
                break;
            case 'pray':
                embedMsg.setTitle('Praying!');
                embedMsg.setColor('FFF000');
                embedMsg.setDescription(masterData["userData"][userid].name + ' recieved +1 Luck :sparkles:!');
                embedMsg.setImage("http://66.media.tumblr.com/ec4a1d29ba12ddce8e7cd5050b72df9d/tumblr_occdrflyTm1vuwk4so1_400.gif");
                embedMsg.setFooter("Oh my god so lucky!");
                message.channel.send({ embeds: [embedMsg] });
                break;
            case 'alert':
                let role = message.guild.roles.cache.find(role => role.name === "guild");
                var player = JSON.parse(message.guild.members.fetch());
                
                console.log(player);
                console.log(role);

                var choice = args[1];
                if (args.length < 2 || (choice != "on" && choice != "off"))
                {
                    embedMsg.setTitle('Error');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription('Tell the bot you want it turned on or off!');
                    embedMsg.setFooter('!tp alert on/off')
                    message.channel.send({ embeds: [embedMsg] });
                }
                else
                {
                    if (choice == "on")
                    {
                        if (!player.roles.includes(role.id))
                        {
                            player.roles.add(role)
                            embedMsg.setTitle('Success');
                            embedMsg.setColor('00FF00');
                            embedMsg.setDescription(masterData["userData"][userid].name + ' will be alerted for bosses!');
                            message.channel.send({ embeds: [embedMsg] });
                        }
                        else
                        {
                            embedMsg.setTitle('Error');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription(masterData["userData"][userid].name + ' is already signed up for boss alerts!');
                            message.channel.send({ embeds: [embedMsg] });
                        }
                    }
                    else if (choice == "off")
                    {
                        if (player.roles.includes(role.id))
                        {
                            player.remove(role.id);
                            embedMsg.setTitle('Success');
                            embedMsg.setColor('00FF00');
                            embedMsg.setDescription(masterData["userData"][userid].name + ' will not be alerted for bosses!');
                            message.channel.send({ embeds: [embedMsg] });
                        }
                        else
                        {
                            embedMsg.setTitle('Error');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription(masterData["userData"][userid].name + ' is not signed up for boss alerts!');
                            message.channel.send({ embeds: [embedMsg] });
                        }
                    }
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
const Discord = require("discord.js");
const AWS = require("aws-sdk");

const { MessageEmbed } = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"] }); 

const prefix = '!tp ';

const fs = require('fs');
const { send } = require("process");

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.gmcommands = new Discord.Collection();
const gmCommandFiles = fs.readdirSync('./gmcommands/').filter(file => file.endsWith('.js'));
for (const file of gmCommandFiles) {
    const gmcommand = require(`./gmcommands/${file}`);
    client.gmcommands.set(gmcommand.name, gmcommand);
}

var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
var savefile = JSON.parse("{}");
var blackjack = JSON.parse("{}");
var fishdex = JSON.parse(fs.readFileSync('storage/fishdex.json', 'utf8'));
var gardendex = JSON.parse(fs.readFileSync('storage/gardendex.json', 'utf8'));

var monsterdex = JSON.parse(fs.readFileSync('storage/monsterdex.json', 'utf8'));
var currHunt = JSON.parse("{}");
var equips = JSON.parse(fs.readFileSync('storage/equips.json', 'utf8'));
var scrolls = JSON.parse(fs.readFileSync('storage/scrolls.json', 'utf8'));

var pets = JSON.parse(fs.readFileSync('storage/pets.json', 'utf8'));

const userDataParams = {
    Bucket: process.env.BUCKET,
    Key: "storage/userData.json"
};

const userFishParams = {
    Bucket: process.env.BUCKET,
    Key: "storage/userFish.json"
};

const userGardenParams = {
    Bucket: process.env.BUCKET,
    Key: "storage/userGarden.json"
};

const userHuntParams = {
    Bucket: process.env.BUCKET,
    Key: "storage/userHunt.json"
};

const itemsParams = {
    Bucket: process.env.BUCKET,
    Key: "storage/items.json"
};

const userPetParams = {
    Bucket: process.env.BUCKET,
    Key: "storage/userPet.json"
};

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    Bucket: process.env.BUCKET
});

async function getObject(params) {
    try {  
      const data = await s3.getObject(params).promise();
      return data.Body.toString('utf8');
    } 
    catch (e) {
      throw new Error(`Could not retrieve file from S3: ${e.message}`)
    }
}


let dataPromise;
getObject(userDataParams).then(
    function(result) {
        dataPromise = result;
    },
    function(err) {
        console.log(err);
    }
)

let fishPromise;
getObject(userFishParams).then(
    function(result) {
        fishPromise = result;
    },
    function(err) {
        console.log(err);
    }
)

let gardenPromise;
getObject(userGardenParams).then(
    function(result) {
        gardenPromise = result;
    },
    function(err) {
        console.log(err);
    }
)

let huntPromise;
getObject(userHuntParams).then(
    function(result) {
        huntPromise = result;
    },
    function(err) {
        console.log(err);
    }
)

let itemsPromise;
getObject(itemsParams).then(
    function(result) {
        itemsPromise = result;
    },
    function(err) {
        console.log(err);
    }
)

let petPromise;
getObject(userPetParams).then(
    function(result) {
        petPromise = result;
    },
    function(err) {
        console.log(err);
    }
)

var userData = "";
var userFish = "";
var userGarden = "";
var userHunt = "";
var items = "";
var userPet = "";

/* Local Host Save Files */
// userData = JSON.parse(fs.readFileSync('storage/userData.json', 'utf8'));
// userFish = JSON.parse(fs.readFileSync('storage/userFish.json', 'utf8'));
// userGarden = JSON.parse(fs.readFileSync('storage/userGarden.json', 'utf8'));
// userHunt = JSON.parse(fs.readFileSync('storage/userHunt.json', 'utf8'));
// items = JSON.parse(fs.readFileSync('storage/items.json', 'utf8'));
// userPet = JSON.parse(fs.readFileSync('storage/userPet.json', 'utf8'));

var startTime = new Date();
savefile.startTime = startTime;
savefile.lastSave = startTime;

currHunt.lastSpawn = savefile.startTime.getTime();
currHunt.nextSpawn = (1000 * 60 * 30) + (1000 * 60 * 45 * Math.random());
currHunt.lastDifficulty = [];

let saveBeforeReset = () => {
    var resetTime = (1000 * 60 * 60 * 23) + (1000 * 60 * 55);
    setTimeout(
        function() {
            if (userData != "") {
                client.gmcommands.get('save').execute(userData, userFish, userGarden, userHunt, items, userPet, config, savefile, s3, userDataParams, userFishParams, userGardenParams, userHuntParams, itemsParams, userPetParams, fs);
            }
            saveBeforeReset();
        }, resetTime
    );
}

client.once('ready', () => {
    console.log(savefile.startTime.toLocaleString());
    console.log("TummyBot is online!");
    saveBeforeReset();
});

const helpMsg = new MessageEmbed();
helpMsg.setTitle('Invalid command!');
helpMsg.setColor('FF0000');
helpMsg.setThumbnail("https://4.bp.blogspot.com/-DV8zj3oNPO8/XZKl8Y1_KkI/AAAAAAAMsvI/HEq47t0TPmYhX0b2igMkkxbcPQPbUXR2gCLcBGAsYHQ/s1600/AS0005827_02.gif");
helpMsg.setDescription('Use __!tp help__ for list of commands!');

let spawnMonster = (newTime) => {
    var timeDiff = newTime.getTime() - currHunt.lastSpawn;
    var nextSpawn = currHunt.nextSpawn;
    if (!currHunt["active"] && timeDiff >= nextSpawn) {
        var diffOne = [];
        var diffTwo = [];
        var diffThree = [];
        var diffFour = [];
        var diffFive = [];
        var diffSix = [];
        for (var k in monsterdex) {
            switch(monsterdex[k].difficulty) {
                case 1:
                    diffOne.push(k);
                    break;
                case 2:
                    diffTwo.push(k);
                    break;
                case 3:
                    diffThree.push(k);
                    break;
                case 4:
                    diffFour.push(k);
                    break;
                case 5:
                    diffFive.push(k);
                    break;
                case 6:
                    diffSix.push(k);
                    break;
            }
        }
        var selectedMonster;

        if (currHunt.lastDifficulty.length == 3) {
            currHunt.lastDifficulty = [];
        }

        while (!selectedMonster || currHunt.lastDifficulty.includes(selectedMonster.difficulty)) {
            var luck = Math.random() * 101;
            if (luck <= 3) {
                selectedMonster = monsterdex[diffSix[Math.floor(Math.random() * diffSix.length)]];
            }
            else if (luck <= 15) {
                selectedMonster = monsterdex[diffFive[Math.floor(Math.random() * diffFive.length)]];
            }
            else if (luck <= 30) {
                selectedMonster = monsterdex[diffFour[Math.floor(Math.random() * diffFour.length)]];
            }
            else if (luck <= 50) {
                selectedMonster = monsterdex[diffThree[Math.floor(Math.random() * diffThree.length)]];
            }
            else if (luck <= 70) {
                selectedMonster = monsterdex[diffTwo[Math.floor(Math.random() * diffTwo.length)]];
            }
            else {
                selectedMonster = monsterdex[diffOne[Math.floor(Math.random() * diffOne.length)]];
            }
        }

        currHunt["active"] = {
            id: selectedMonster.id,
            name: selectedMonster.name,
            info: selectedMonster.info,
            entry: selectedMonster.entry,
            shoutout: selectedMonster.shoutout,
            death: selectedMonster.death,
            image: selectedMonster.image,
            attackImage: selectedMonster.attackImage,
            maxHP: selectedMonster.maxHP,
            attack: selectedMonster.attack,
            defense: selectedMonster.defense,
            magicdefense: selectedMonster.magicdefense,
            attackCD: selectedMonster.attackCD,
            difficulty: selectedMonster.difficulty,
            loot: selectedMonster.loot,
            currentHP: selectedMonster.maxHP,
            lastAttack: selectedMonster.attackCD + newTime.getTime(),
            targets: [],
            playerDamage: [],
            channels: [],
            lastPlayerAttack: newTime.getTime(),
            deathCount: 0,
            deathLimit: 20,
            retreated: false
        }

        return true;
    }
    return false;
}

let attackAll = (newTime) => {
    var attackCD = currHunt["active"].attackCD;
    var alivePlayers = 0;

    for (let i = 0; i < currHunt["active"].targets.length; i++) {
        var target = currHunt["active"].targets[i];
        if (userHunt[target].currentHP > 0) {
            alivePlayers++;
        }
    }

    if (alivePlayers == 1) {
        attackCD = Math.floor(attackCD / 1.5);
    }
    if (currHunt["active"] && currHunt["active"].currentHP > 0 && newTime.getTime() - currHunt["active"].lastAttack >= attackCD) {
        var count = 0;
        var playersHit = "";
        var faints = "";

        for (let i = 0; i < currHunt["active"].targets.length; i++) {
            var target = currHunt["active"].targets[i];

            if (userHunt[target].currentHP > 0) {
                var weapon = items[userHunt[target].weapon];
                var armor = items[userHunt[target].armor];
                var accessory = items[userHunt[target].accessory];

                var defense = userHunt[target].defense;

                if (weapon.name != "Nothing") {
                    defense += weapon.defense + equips[weapon.name].defense;
                }
                if (armor.name != "Nothing") {
                    defense += armor.defense + equips[armor.name].defense;
                }
                if (accessory.name != "Nothing") {
                    defense += accessory.defense + equips[accessory.name].defense;
                }

                if (defense < 0)
                {
                    defense = 0;
                }

                var multiplier;
                var resistance
                if ((currHunt["active"].attack + (defense * 2)) == 0)
                {
                    multiplier = 1;
                }
                else
                {
                    multiplier = (currHunt["active"].attack / (currHunt["active"].attack + (defense * 2)));
                }
                resistance = 1 - multiplier;
                
                var damageDealt = Math.floor(currHunt["active"].attack * multiplier);
                var reflectDmg = 0;
                if (alivePlayers == 1) {
                    damageDealt = Math.floor(1.5 * damageDealt);
                }
                if (damageDealt <= 0) {
                    damageDealt = 1;
                }
                
                var luck = Math.floor((Math.random() * 100) + 1);
                var chance = Math.floor(100 * resistance / 2.22);
                if (luck <= chance) {
                    reflectDmg = Math.floor(currHunt["active"].attack * (100 * (resistance / 20)));
                    if (currHunt["active"].currentHP <= reflectDmg) 
                    {
                        reflectDmg = currHunt["active"].currentHP - 1;
                    }
                    currHunt["active"].currentHP -= reflectDmg;
                    damageDealt = 0;
                    
                    currHunt["active"].playerDamage[currHunt["active"].targets.indexOf(target)] += reflectDmg;
                }

                userHunt[target].currentHP -= damageDealt;
                if (userHunt[target].currentHP <= 0) {
                    userHunt[target].deathTime = newTime.getTime();
                    playersHit += userData[target].name + " takes " + damageDealt + " damage!\n";
                    faints += userData[target].name + " has fainted!\n";
                    currHunt["active"].deathCount++
                }
                else if (damageDealt == 0) {
                    playersHit += userData[target].name + " counters the attack, dealing " + reflectDmg + " damage!\n";
                }
                else {
                    playersHit += userData[target].name + " takes " + damageDealt + " damage!\n";
                }
                count++;
            }
        }
        currHunt["active"].lastAttack = newTime.getTime();

        if (count > 0) {
            const embedMsg = new MessageEmbed();
            var stars = " (";
            for (let i = 0; i < currHunt["active"].difficulty; i++) {
                stars += "★";
            }
            stars += ")"
            embedMsg.setTitle(currHunt["active"].name + stars + " - Attacks!");
            embedMsg.setDescription(currHunt["active"].shoutout + "\n\n" + playersHit + "\n" + faints);
            embedMsg.setImage(currHunt["active"].attackImage);
            embedMsg.setFooter("HP: " + currHunt["active"].currentHP + "/" + currHunt["active"].maxHP + "\n\nDeaths: " + currHunt["active"].deathCount + "/" + currHunt["active"].deathLimit);
            embedMsg.setColor("49000F");
            for (let i = 0; i < currHunt["active"].channels.length; i++) {
                currHunt["active"].channels[i].send({ embeds: [embedMsg] });
            }
        }

        if (currHunt["active"].deathCount >= currHunt["active"].deathLimit && !currHunt["active"].retreated) {
            const retreatMsg = new MessageEmbed();
            
            currHunt["active"].retreated = true;
            currHunt.lastSpawn = newTime.getTime();
            currHunt.nextSpawn = 1000 * 60 * 15;
            currHunt.lastDifficulty.push(currHunt["active"].difficulty);

            var stars = " (";
            for (let i = 0; i < currHunt["active"].difficulty; i++) {
                stars += "★";
            }
            stars += ")"
            retreatMsg.setTitle(currHunt["active"].name + stars + " - Retreats!");
            retreatMsg.setDescription("After defeating " + currHunt["active"].deathCount + " players, " + currHunt["active"].name + " left the battlegrounds.");
            retreatMsg.setFooter("HP: " + currHunt["active"].currentHP + "/" + currHunt["active"].maxHP);
            retreatMsg.setColor("FF0000");

            let channels = currHunt["active"].channels;
            for (let i = 0; i < channels.length; i++) {
                channels[i].send({ embeds: [retreatMsg] });
            }
            delete currHunt["active"];
        }
    }
}

client.on('messageCreate', message => {
    var newTime = new Date();
    var sender = message.author;

    try {
        if (userData == "") {
            if (dataPromise)
                userData = JSON.parse(dataPromise);
            else
                return;
        }
        if (userFish == "") {
            if (fishPromise)
                userFish = JSON.parse(fishPromise);
            else
                return;
        }
        if (userGarden == "") {
            if (gardenPromise)
                userGarden = JSON.parse(gardenPromise);
            else
                return;
        }
        if (userHunt == "") {
            if (huntPromise)
                userHunt = JSON.parse(huntPromise);
            else
                return;
        }
        if (items == "") {
            if (itemsPromise)
                items = JSON.parse(itemsPromise);
            else
                return;
        }
        if (userPet == "") {
            if (petPromise)
                userPet = JSON.parse(petPromise);
            else
                return;
        }

        if (!message.content.startsWith(prefix) || message.author.bot) {
            return;
        }

        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

        if (userData[sender.id]) {
            var timeDiff = newTime.getTime() - userData[sender.id].incomeTime;
            var incomeCD = 1000 * 60; // 1min
            var income = 1;
            switch (userData[sender.id].income) {
                case 1:
                    income = 1;
                    break;
                case 2:
                    income = 3;
                    break;
                case 3:
                    income = 10;
                    break;
                case 4:
                    income = 50;
                    break;
                case 5:
                    income = 500;
                    break;
                case 6:
                    income = 5000;
                    break;
            }
            if (timeDiff >= incomeCD) {
                userData[sender.id].points += Math.floor(timeDiff / incomeCD) * income;
                userData[sender.id].incomeTime = newTime.getTime() - (timeDiff % incomeCD);
            }
        }

        switch(command) {
            // Base Commands
            case 'help':
                client.commands.get('help').execute(message, args, sender.id, userData, client);
                break;
            case 'register':
                client.commands.get('register').execute(message, args, sender.id, userData, userFish, userGarden, userHunt, userPet, client);
                break;
            case 'uptime':
                client.commands.get('uptime').execute(message, args, savefile);
                break;
            case 'leaderboard':
                if (userData[sender.id])
                    client.commands.get('leaderboard').execute(message, args, sender.id, userData, client);
                break;
            case 'b':
            case 'bal':
            case 'info':
            case 'profile':
            case 'balance':
                if (userData[sender.id])
                    client.commands.get('balance').execute(message, args, sender.id, userData, userFish, userGarden, client);
                break;
            case 'give':
                if (userData[sender.id])
                    client.commands.get('give').execute(message, args, sender.id, userData, client);
                break;
            case 'marry':
                if (userData[sender.id])
                    client.commands.get('marry').execute(message, args, sender.id, userData, client);
                break;
            case 'divorce':
                if (userData[sender.id])
                    client.commands.get('divorce').execute(message, args, sender.id, userData, client);
                break;
            case 'scratch':
                if (userData[sender.id])
                    client.commands.get('scratch').execute(message, args, sender.id, userData, client);
                break;
            case 'beg':
                if (userData[sender.id])
                    client.commands.get('beg').execute(message, args, sender.id, userData, client);
                break;
            case 'jamal':
                if (userData[sender.id])
                    client.commands.get('jamal').execute(message, args, sender.id, userData, client);
                break;
            case 'level':
                if (userData[sender.id])
                    client.commands.get('level').execute(message, args, sender.id, userData, client);
                break;
            case 'f':
            case 'fish':
                if (userData[sender.id])
                    client.commands.get('fish').execute(message, args, sender.id, userData, userFish, fishdex, client);
                break;
            case 'g':
            case 'garden':
                if (userData[sender.id])
                    client.commands.get('garden').execute(message, args, sender.id, userData, userGarden, gardendex, client);
                break;
            case 'bank':
                if (userData[sender.id])
                    client.commands.get('bank').execute(message, args, sender.id, userData, client);
                break;
            case 'bj':
                if (userData[sender.id])
                    client.commands.get('bj').execute(message, args, sender.id, userData, blackjack, client);
                break;
            case 'fame':
                if (userData[sender.id])
                    client.commands.get('fame').execute(message, args, sender.id, userData, client);
                break;
            case 'h':
            case 'hunt':
                if (userData[sender.id])
                    client.commands.get('hunt').execute(message, args, sender.id, userData, userHunt, monsterdex, currHunt, items, equips, scrolls, client);
                break;
            case 'p':
            case 'pet':
                if (userData[sender.id])
                    client.commands.get('pet').execute(message, args, sender.id, userData, userPet, pets, client);
                break;
            // GM Commands
            case 'reward':
                if (userData[sender.id])
                    client.gmcommands.get('reward').execute(message, args, sender.id, userData, client);
                break;
            case 'rewardall':
                if (userData[sender.id])
                    client.gmcommands.get('rewardall').execute(message, args, sender.id, userData, client);
                break;
            case 'spawntime':
                if (userData[sender.id] && currHunt.lastSpawn)
                    client.gmcommands.get('spawntime').execute(message, args, sender.id, userData, currHunt, client);
                break;
            case 'spawnboss':
                if (userData[sender.id] && currHunt.lastSpawn)
                    client.gmcommands.get('spawnboss').execute(message, args, sender.id, userData, currHunt, monsterdex, client);
                break;
            case 'spawnequip':
                if (userData[sender.id])
                    client.gmcommands.get('spawnequip').execute(message, args, sender.id, userData, userHunt, items, equips, client);
                break;
            case 'spawnscroll':
                if (userData[sender.id])
                    client.gmcommands.get('spawnscroll').execute(message, args, sender.id, userData, userHunt, scrolls, client);
                break;
            case 'killboss':
                if (userData[sender.id])
                    client.gmcommands.get('killboss').execute(message, args, sender.id, userData, currHunt, monsterdex, client);
                break;
            case 'banish':
                if (userData[sender.id])
                    client.gmcommands.get('reset').execute(message, args, sender.id, userData, userFish, userGarden, userHunt, items, client);
                break;
            case 'registerall':
                if (userData[sender.id]) {
                    client.gmcommands.get('registerall').execute(message, args, sender.id, userData, userFish, userGarden, userHunt, userPet, client);
                }
                break;
            case 'gm':
                if (userData[sender.id])
                    client.gmcommands.get('gm').execute(message, args, sender.id, userData, client);
                break;
            case 'save':
                if (userData[sender.id] && userData[sender.id].gm > 0) {
                    client.gmcommands.get('save').execute(userData, userFish, userGarden, userHunt, items, userPet, config, savefile, s3, userDataParams, userFishParams, userGardenParams, userHuntParams, itemsParams, userPetParams, fs);
                    const embedMsg = new MessageEmbed();
                    embedMsg.setTitle('Saved!');
                    embedMsg.setColor('B5EAFF');
                    embedMsg.setImage("https://c.tenor.com/TgPXdDAfIeIAAAAM/gawr-gura-gura.gif");
                    embedMsg.setDescription('Files have been saved!');
                    message.channel.send({ embeds: [embedMsg] });
                }
                break;
            case 'iv':
                if (userData[sender.id] && userData[sender.id].gm > 0) {
                    const embedMsg = new MessageEmbed();
                    embedMsg.setTitle('Mint and Scarlet!');
                    embedMsg.setColor('00FF00');
                    embedMsg.setThumbnail("https://i.imgur.com/2hWPL7A.png");
                    embedMsg.setDescription('Drawing of Mint and Scarlet!');
                    message.channel.send({ embeds: [embedMsg] });
                }
            break;
            default:
                message.channel.send({ embeds: [helpMsg] }).then(msg=> {setTimeout(() => msg.delete(), 5000)});
                break;
        }

        if (!userData[sender.id]) {
            const embedMsg = new MessageEmbed();
            embedMsg.setTitle('New User!');
            embedMsg.setColor('FF0000');
            embedMsg.setDescription('Register with the !tp register command!')
            message.channel.send({ embeds: [embedMsg] });
        }

        if (spawnMonster(newTime) && !currHunt["active"].channels.includes(message.channel)) {
            currHunt["active"].channels.push(message.channel);
            const embedMsg = new MessageEmbed();
            var stars = " (";
            for (let i = 0; i < currHunt["active"].difficulty; i++) {
                stars += "★";
            }
            stars += ")"
            embedMsg.setTitle(currHunt["active"].name + stars);
            embedMsg.setDescription(currHunt["active"].entry);
            embedMsg.setImage(currHunt["active"].image);
            embedMsg.setFooter("HP: " + currHunt["active"].currentHP + "/" + currHunt["active"].maxHP);
            embedMsg.setColor("49000F");
            currHunt["active"].channels[0].send({ embeds: [embedMsg] });
        }

        if (currHunt["active"] && newTime.getTime() - currHunt["active"].lastPlayerAttack >= 1000 * 60 * 10 && !currHunt["active"].retreated && currHunt["active"].currentHP > 0) {
            const embedMsg = new MessageEmbed();
            currHunt["active"].retreated = true;
            currHunt.lastSpawn = newTime.getTime();
            currHunt.nextSpawn = 1000 * 60 * 15;
            currHunt.lastDifficulty.push(currHunt["active"].difficulty);

            var stars = " (";
            for (let i = 0; i < currHunt["active"].difficulty; i++) {
                stars += "★";
            }
            stars += ")"
            embedMsg.setTitle(currHunt["active"].name + stars + " - Retreats!");
            embedMsg.setDescription(currHunt["active"].name + " got bored and left the battlegrounds.");
            embedMsg.setFooter("HP: " + currHunt["active"].currentHP + "/" + currHunt["active"].maxHP);
            embedMsg.setColor("FF0000");

            let channels = currHunt["active"].channels;
            for (let i = 0; i < channels.length; i++) {
                channels[i].send({ embeds: [embedMsg] });
            }
            delete currHunt["active"];
        }

        if (currHunt["active"] && !currHunt["active"].retreated) {
            attackAll(newTime);
        }

    }
    catch (err) {
        const embedMsg = new MessageEmbed();
        embedMsg.setTitle('Error!');
        embedMsg.setColor('FF0000');
        embedMsg.setDescription('Oh no! Something went wrong with the bot!');
        embedMsg.setFooter('Try not to use that same command again!');
        message.channel.send({ embeds: [embedMsg] });
        console.log(err);
    }

    if (newTime.getTime() - savefile.lastSave.getTime() >= (1000 * 60 * 60)) {
        client.gmcommands.get('save').execute(userData, userFish, userGarden, userHunt, items, userPet, config, savefile, s3, userDataParams, userFishParams, userGardenParams, userHuntParams, itemsParams, userPetParams);
    }
});

process.on('unhandledRejection', (reason, promise) => {
    console.log(reason);
});

client.login(process.env.DISCORD_TOKEN); // Last Line in File

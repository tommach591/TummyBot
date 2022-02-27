
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
    Bucket: config.bucket,
    Key: "storage/userData.json"
};

const userFishParams = {
    Bucket: config.bucket,
    Key: "storage/userFish.json"
};

const userGardenParams = {
    Bucket: config.bucket,
    Key: "storage/userGarden.json"
};

const userHuntParams = {
    Bucket: config.bucket,
    Key: "storage/userHunt.json"
};

const itemsParams = {
    Bucket: config.bucket,
    Key: "storage/items.json"
};

const userPetParams = {
    Bucket: config.bucket,
    Key: "storage/userPet.json"
};

const s3 = new AWS.S3({
    accessKeyId: config.accessKeyID,
    secretAccessKey: config.secretAccessKey,
    Bucket: config.bucket
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


//var userData = JSON.parse(fs.readFileSync('storage/userData.json', 'utf8'));
//var userFish = JSON.parse(fs.readFileSync('storage/userFish.json', 'utf8'));
//var userGarden = JSON.parse(fs.readFileSync('storage/userGarden.json', 'utf8'));

var userData = "";
var userFish = "";
var userGarden = "";
var userHunt = "";
var items = "";
var userPet = "";

const currentDate = new Date();

client.once('ready', () => {
    console.log(currentDate.toLocaleString());
    console.log("TummyBot is online!");
});

const helpMsg = new MessageEmbed();
helpMsg.setTitle('Invalid command!');
helpMsg.setColor('FF0000');
helpMsg.setThumbnail("https://4.bp.blogspot.com/-DV8zj3oNPO8/XZKl8Y1_KkI/AAAAAAAMsvI/HEq47t0TPmYhX0b2igMkkxbcPQPbUXR2gCLcBGAsYHQ/s1600/AS0005827_02.gif");
helpMsg.setDescription('Use __!tp help__ for list of commands!');

const admin = "<@!189892642627125248>";

const errorMsg = new MessageEmbed();
errorMsg.setTitle('CRITICAL ERROR!');
errorMsg.setColor('FF0000');
errorMsg.setDescription('The bot is at risk of crashing!!!');
errorMsg.setImage("https://c.tenor.com/i51CEmR_1x4AAAAC/ame-gura.gif")
errorMsg.setFooter("Don't type that command again!!!");

let spawnMonster = (newTime) => {
    if (!currHunt.lastSpawn) {
        currHunt.lastSpawn = newTime.getTime();
        currHunt.nextSpawn = (1000 * 60 * 45) + (1000 * 60 * 45 * Math.random());
        currHunt.lastDifficulty = [];
    }
    var timeDiff = newTime.getTime() - currHunt.lastSpawn;
    var nextSpawn = currHunt.nextSpawn;
    if (!currHunt["active"] && timeDiff >= nextSpawn) {
        var diffOne = [];
        var diffTwo = [];
        var diffThree = [];
        var diffFour = [];
        var diffFive = [];
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
            }
        }
        var selectedMonster;

        if (currHunt.lastDifficulty.length == 3) {
            currHunt.lastDifficulty = [];
        }

        while (!selectedMonster || currHunt.lastDifficulty.includes(selectedMonster.difficulty)) {
            var luck = Math.random() * 101;
            if (luck <= 5) {
                selectedMonster = monsterdex[diffFive[Math.floor(Math.random() * diffFive.length)]];
            }
            else if (luck <= 15) {
                selectedMonster = monsterdex[diffFour[Math.floor(Math.random() * diffFour.length)]];
            }
            else if (luck <= 35) {
                selectedMonster = monsterdex[diffThree[Math.floor(Math.random() * diffThree.length)]];
            }
            else if (luck <= 65) {
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
    if (currHunt["active"] && currHunt["active"].currentHP > 0 && newTime.getTime() - currHunt["active"].lastAttack >= currHunt["active"].attackCD) {
        var count = 0;
        var playersHit = "";
        var faints = "";
        var alivePlayers = 0;

        for (let i = 0; i < currHunt["active"].targets.length; i++) {
            var target = currHunt["active"].targets[i];
            if (userHunt[target].currentHP > 0) {
                alivePlayers++;
            }
        }

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

                var damageDealt = Math.floor(currHunt["active"].attack * (currHunt["active"].attack / (currHunt["active"].attack + (defense * 1))));
                if (alivePlayers == 1) {
                    damageDealt = Math.floor(1.5 * damageDealt);
                }
                if (damageDealt <= 0) {
                    damageDealt = 1;
                }

                userHunt[target].currentHP -= damageDealt;
                if (userHunt[target].currentHP <= 0) {
                    userHunt[target].deathTime = newTime.getTime();
                    playersHit += userData[target].name + " takes " + damageDealt + " damage!\n";
                    faints += userData[target].name + " has fainted!\n";
                    currHunt["active"].deathCount++
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
            currHunt.nextSpawn = 1000 * 60 * 20;
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

            for (let i = 0; i < currHunt["active"].channels.length; i++) {
                currHunt["active"].channels[i].send({ embeds: [retreatMsg] }).then(() => 
                {
                    setTimeout(() => {
                        delete currHunt["active"];
                    }, 600000);
                });
            }
        }
    }
}

let msg;
client.on('messageCreate', message => {
    var newTime = new Date();
    var sender = message.author;

    msg = message;

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

        if (!message.content.startsWith(prefix) || message.author.bot || userData == "" || userFish == "" || userGarden == "") {
            return;
        }

        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

        if (userData[sender.id]) {
            var timeDiff = newTime.getTime() - userData[sender.id].incomeTime;
            var incomeCD = 1000 * 60; // 1min
            if (timeDiff >= incomeCD) {
                userData[sender.id].points += Math.floor(timeDiff / incomeCD) * userData[sender.id].income;
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
                if (userData[sender.id])
                    client.gmcommands.get('spawntime').execute(message, args, sender.id, userData, currHunt, client);
                break;
            case 'spawnboss':
                if (userData[sender.id])
                    client.gmcommands.get('spawnboss').execute(message, args, sender.id, userData, currHunt, monsterdex, client);
                break;
            case 'spawnequip':
                if (userData[sender.id])
                    client.gmcommands.get('spawnequip').execute(message, args, sender.id, userData, userHunt, items, equips, client);
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
                if (userData[sender.id] && userData[sender.id].gm > 0)
                    client.gmcommands.get('save').execute(message, userData, userFish, userGarden, userHunt, items, userPet, config, s3, userDataParams, userFishParams, userGardenParams, userHuntParams, itemsParams, userPetParams);
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
            currHunt.nextSpawn = 1000 * 60 * 20;
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

            for (let i = 0; i < currHunt["active"].channels.length; i++) {
                currHunt["active"].channels[i].send({ embeds: [embedMsg] }).then(() => 
                {
                    setTimeout(() => {
                        delete currHunt["active"];
                    }, 600000);
                });
            }
        }

        if (currHunt["active"] && !currHunt["active"].retreated) {
            attackAll(newTime);
        }

    }
    catch (err) {
        //client.gmcommands.get('save').execute(message, userData, userFish, userGarden, userHunt, items, userPet, config, s3, userDataParams, userFishParams, userGardenParams, userHuntParams, itemsParams, userPetParams);
        const embedMsg = new MessageEmbed();
        embedMsg.setTitle('Error!');
        embedMsg.setColor('FF0000');
        embedMsg.setDescription('Oh no! Something went wrong with the bot!');
        embedMsg.setFooter('Try not to use that same command again!');
        message.channel.send({ embeds: [embedMsg] });
        console.log(err);
    }

    if (!savefile.lastSave) {
        savefile.lastSave = newTime.getTime();
    }
    else if (newTime.getTime() - savefile.lastSave >= (1000 * 60 * 15)) {
        client.gmcommands.get('save').execute(message, userData, userFish, userGarden, userHunt, items, userPet, config, s3, userDataParams, userFishParams, userGardenParams, userHuntParams, itemsParams, userPetParams);
        savefile.lastSave = newTime.getTime();
    }

    /*
    fs.writeFile('storage/userData.json', JSON.stringify(userData, null, 4), (err) => {
        if (err) console.error(err);
    });
    fs.writeFile('storage/userFish.json', JSON.stringify(userFish, null, 4), (err) => {
        if (err) console.error(err);
    });
    fs.writeFile('storage/userGarden.json', JSON.stringify(userGarden, null, 4), (err) => {
        if (err) console.error(err);
    });
    */
});

process.on('unhandledRejection', (reason, promise) => {
    var newDate = new Date();
    console.log(reason);
    /*
    msg.channel.send({ embeds: [errorMsg] }).then(
        msg => { 
            msg.reply(admin + "\n\nError Date: " + newDate);
        });
    */
    //client.gmcommands.get('save').execute(message, userData, userFish, userGarden, userHunt, items, userPet, config, s3, userDataParams, userFishParams, userGardenParams, userHuntParams, itemsParams, userPetParams);
});
 
client.login('OTI0OTM2Njk1NTY3MjIwODE2.Ycl0bA.GD_-9lJp3_koJa8Y1y_ucDjbK34'); // Last Line in File

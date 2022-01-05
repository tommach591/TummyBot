
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
var savefile = JSON.parse(fs.readFileSync('storage/savefile.json', 'utf8'));
var blackjack = JSON.parse(fs.readFileSync('storage/blackjack.json', 'utf8'));
var fishdex = JSON.parse(fs.readFileSync('storage/fishdex.json', 'utf8'));
var gardendex = JSON.parse(fs.readFileSync('storage/gardendex.json', 'utf8'));

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


let x;
getObject(userDataParams).then(
    function(result) {
        x = result;
    },
    function(err) {
        console.log(err);
    }
)

let y;
getObject(userFishParams).then(
    function(result) {
        y = result;
    },
    function(err) {
        console.log(err);
    }
)

let z;
getObject(userGardenParams).then(
    function(result) {
        z = result;
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

const currentDate = new Date();

client.once('ready', () => {
    console.log(currentDate.toLocaleString());
    console.log("TummyBot is online!");
});

const helpMsg = new MessageEmbed();
helpMsg.setTitle('Invalid command!');
helpMsg.setColor('FF0000');
helpMsg.setDescription('Use *__!tp help__* for list of commands!');

const admin = "<@!189892642627125248>";

const errorMsg = new MessageEmbed();
errorMsg.setTitle('CRITICAL ERROR!');
errorMsg.setColor('FF0000');
errorMsg.setDescription('The bot is at risk of crashing!!!');
errorMsg.setImage("https://c.tenor.com/i51CEmR_1x4AAAAC/ame-gura.gif")
errorMsg.setFooter("Don't type that command again!!!");

let msg;
client.on('messageCreate', message => {
    var newTime = new Date();
    var sender = message.author;

    msg = message;

    try {
        if (userData == "") {
            if (x)
                userData = JSON.parse(x);
            else
                return;
        }
        if (userFish == "") {
            if (y)
                userFish = JSON.parse(y);
            else
                return;
        }
        if (userGarden == "") {
            if (z)
                userGarden = JSON.parse(z);
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
                client.commands.get('register').execute(message, args, sender.id, userData, userFish, userGarden, client);
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
            // GM Commands
            case 'reward':
                if (userData[sender.id])
                    client.gmcommands.get('reward').execute(message, args, sender.id, userData, client);
                break;
            case 'rewardall':
                if (userData[sender.id])
                    client.gmcommands.get('rewardall').execute(message, args, sender.id, userData, client);
                break;
            case 'banish':
                if (userData[sender.id])
                    client.gmcommands.get('reset').execute(message, args, sender.id, userData, userFish, userGarden, client);
                break;
            case 'registerall':
                if (userData[sender.id])
                    client.gmcommands.get('registerall').execute(message, args, sender.id, userData, userFish, userGarden, client);
                break;
            case 'gm':
                if (userData[sender.id])
                    client.gmcommands.get('gm').execute(message, args, sender.id, userData, client);
                break;
            case 'save':
                if (userData[sender.id] && userData[sender.id].gm > 0)
                    client.gmcommands.get('save').execute(message, userData, userFish, userGarden, config, s3, userDataParams, userFishParams, userGardenParams);
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
    }
    catch (err) {
        client.gmcommands.get('save').execute(message, userData, userFish, userGarden, config, s3, userDataParams, userFishParams, userGardenParams);
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
    else if (newTime.getTime() - savefile.lastSave >= (1000 * 60 * 60)) {
        client.gmcommands.get('save').execute(message, userData, userFish, userGarden, config, s3, userDataParams, userFishParams, userGardenParams);
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
    msg.channel.send({ embeds: [errorMsg] }).then(
        msg => { 
            msg.reply(admin + "\n\nError Date: " + newDate);
        });
    client.gmcommands.get('save').execute(message, userData, userFish, userGarden, config, s3, userDataParams, userFishParams, userGardenParams);
});
 
client.login('OTI0OTM2Njk1NTY3MjIwODE2.Ycl0bA.GD_-9lJp3_koJa8Y1y_ucDjbK34'); // Last Line in File

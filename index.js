
const Discord = require("discord.js");
const AWS = require("aws-sdk");

const { MessageEmbed } = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] }); 

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
helpMsg.setTitle('Error!');
helpMsg.setColor('FF0000');
helpMsg.setDescription('Invalid command!');
helpMsg.setFooter('Use !tp help for list of commands!');

client.on('messageCreate', message => {
    var newTime = new Date();
    var sender = message.author;

    try {
        if (userData == "") {
            userData = JSON.parse(x);
        }
        if (userFish == "") {
            userFish = JSON.parse(y);
        }
        if (userGarden == "") {
            userGarden = JSON.parse(z);
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
                userData[sender.id].incomeTime = newTime.getTime();
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
                    client.gmcommands.get('reset').execute(message, args, sender.id, userData, client);
                break;
            case 'registerall':
                if (userData[sender.id])
                    client.gmcommands.get('registerall').execute(message, args, sender.id, userData, userFish, userGarden, client);
                break;
            case 'gm':
                if (userData[sender.id])
                    client.gmcommands.get('gm').execute(message, args, sender.id, userData, client);
                break;
            default:
                message.channel.send({ embeds: [helpMsg] }).then(msg=> {setTimeout(() => msg.delete(), 5000)});
                break;
        }

        message.react('👍').then(() => message.react('👎'));

        const filter = (reaction, user) => {
            return ['👍', '👎'].includes(reaction.emoji.name) && user.id === userid;
        };
        
        message.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] })
            .then(collected => {
                const reaction = collected.first();
        
                if (reaction.emoji.name === '👍') {
                    message.reply('You reacted with a thumbs up.');
                } else {
                    message.reply('You reacted with a thumbs down.');
                }
            })
            .catch(collected => {
                message.reply('You reacted with neither a thumbs up, nor a thumbs down.');
            });


        if (!userData[sender.id]) {
            const embedMsg = new MessageEmbed();
            embedMsg.setTitle('New User!');
            embedMsg.setColor('FF0000');
            embedMsg.setDescription('Register with the !tp register command!')
            message.channel.send({ embeds: [embedMsg] });
        }

        s3.putObject({
            Bucket: config.bucket,
            Key: userDataParams.Key,
            Body: JSON.stringify(userData),
            ContentType: "application/json"},
            function (err, data) {
                if (err) {
                    console.log(JSON.stringify(err));
                }
            }
        );
        s3.putObject({
            Bucket: config.bucket,
            Key: userFishParams.Key,
            Body: JSON.stringify(userFish),
            ContentType: "application/json"},
            function (err, data) {
                if (err) {
                    console.log(JSON.stringify(err));
                }
            }
        );
        s3.putObject({
            Bucket: config.bucket,
            Key: userGardenParams.Key,
            Body: JSON.stringify(userGarden),
            ContentType: "application/json"},
            function (err, data) {
                if (err) {
                    console.log(JSON.stringify(err));
                }
            }
        );
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
})
 
client.login('OTI0OTM2Njk1NTY3MjIwODE2.Ycl0bA.GD_-9lJp3_koJa8Y1y_ucDjbK34'); // Last Line in File

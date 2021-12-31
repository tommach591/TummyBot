
const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] }); 

const prefix = '!tp ';

const fs = require('fs');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

var userData = JSON.parse(fs.readFileSync('storage/userData.json', 'utf8'));
var userFish = JSON.parse(fs.readFileSync('storage/userFish.json', 'utf8'));
var fishdex = JSON.parse(fs.readFileSync('storage/fishdex.json', 'utf8'));
var userGarden = JSON.parse(fs.readFileSync('storage/userGarden.json', 'utf8'));
var gardendex = JSON.parse(fs.readFileSync('storage/gardendex.json', 'utf8'));

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

    if (!message.content.startsWith(prefix) || message.author.bot) {
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
        case 'help':
            client.commands.get('help').execute(message, args, sender.id, userData, client);
            break;
        case 'register':
            client.commands.get('register').execute(message, args, sender.id, userData, userFish, userGarden, client);
            break;
        case 'b':
        case 'bal':
        case 'info':
        case 'balance':
            if (userData[sender.id])
                client.commands.get('balance').execute(message, args, sender.id, userData, client, fs);
            break;
        case 'give':
            if (userData[sender.id])
                client.commands.get('give').execute(message, args, sender.id, userData, client, fs);
            break;
        case 'scratch':
            if (userData[sender.id])
                client.commands.get('scratch').execute(message, args, sender.id, userData, client, fs);
            break;
        case 'beg':
            if (userData[sender.id])
                client.commands.get('beg').execute(message, args, sender.id, userData, client, fs);
            break;
        case 'jamal':
            if (userData[sender.id])
                client.commands.get('jamal').execute(message, args, sender.id, userData, client, fs);
            break;
        case 'level':
            if (userData[sender.id])
                client.commands.get('level').execute(message, args, sender.id, userData, client, fs);
            break;
        case 'f':
        case 'fish':
            if (userData[sender.id])
                client.commands.get('fish').execute(message, args, sender.id, userData, userFish, fishdex, client, fs);
            break;
        case 'g':
        case 'garden':
            if (userData[sender.id])
                client.commands.get('garden').execute(message, args, sender.id, userData, userGarden, gardendex, client, fs);
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

    fs.writeFile('Storage/userData.json', JSON.stringify(userData, null, 4), (err) => {
        if (err) console.error(err);
    });
    fs.writeFile('Storage/userFish.json', JSON.stringify(userFish, null, 4), (err) => {
        if (err) console.error(err);
    });
    fs.writeFile('Storage/userGarden.json', JSON.stringify(userGarden, null, 4), (err) => {
        if (err) console.error(err);
    });
})
 
client.login('OTI0OTM2Njk1NTY3MjIwODE2.Ycl0bA.GD_-9lJp3_koJa8Y1y_ucDjbK34'); // Last Line in File

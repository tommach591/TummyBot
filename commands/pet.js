module.exports = {
    name: 'pet',
    description: "Raise a pet.",

    execute(message, args, userid, userData, userGarden, gardendex, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        var command = args[0];
        switch(command) {
            case 'help':
                const petCommands = new Map();
                petCommands.set('help', 'Displays list of pet commands.');
                petCommands.set('buy', 'Buy a random pet.');
                petCommands.set('abandon', 'Horribly abandon your pet.');
                petCommands.set('food', 'Buy pet food.');
                petCommands.set('feed', 'Feed your pet.');
                petCommands.set('water', 'Hydrate your pet.');
                petCommands.set('groom', 'Groom your pet.');
                petCommands.set('play', 'Play with your pet.');
                petCommands.set('leaderboard', 'Leaderboard of pets.');

                embedMsg.setTitle('List of Pet Commands');
                embedMsg.setColor('FFF000');

                petCommands.forEach((values, keys)=> {
                    embedMsg.addField("!tp pet " + keys, values);
                });

                message.channel.send({ embeds: [embedMsg] });
                break;
            case 'plant':
                break;
            case 'harvest':
                break;
            case 'upgrade':
                break;
            case 'dex':
            case 'gardendex':
                break;
            default:
                embedMsg.setTitle('Invalid pet command!');
                embedMsg.setColor('FF0000');
                embedMsg.setDescription('Use __!tp pet help__ for list of pet commands!');
                embedMsg.setThumbnail("https://4.bp.blogspot.com/-DV8zj3oNPO8/XZKl8Y1_KkI/AAAAAAAMsvI/HEq47t0TPmYhX0b2igMkkxbcPQPbUXR2gCLcBGAsYHQ/s1600/AS0005827_02.gif");
                message.channel.send({ embeds: [embedMsg] });
                break;
        }
    }
}
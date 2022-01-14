module.exports = {
    name: 'pet',
    description: "Raise a pet.",

    execute(message, args, userid, userData, userGarden, gardendex, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        var command = args[0];
        switch(command) {
            case 'help':
                const gardeningCommands = new Map();
                gardeningCommands.set('help', 'Displays list of pet commands.');
                gardeningCommands.set('buy', 'Plant a random seed.');
                gardeningCommands.set('harvest', 'Harvest fully grown plants.');
                gardeningCommands.set('upgrade', 'Upgrade field, allowing you to plant more.');
                gardeningCommands.set('dex', 'Shows unique plants you have grown.');

                embedMsg.setTitle('List of Gardening Commands');
                embedMsg.setColor('FFF000');

                gardeningCommands.forEach((values, keys)=> {
                    embedMsg.addField("!tp garden " + keys, values);
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
                embedMsg.setTitle('Invalid gardening command!');
                embedMsg.setColor('FF0000');
                embedMsg.setDescription('Use __!tp garden help__ for list of gardening commands!');
                embedMsg.setThumbnail("https://4.bp.blogspot.com/-DV8zj3oNPO8/XZKl8Y1_KkI/AAAAAAAMsvI/HEq47t0TPmYhX0b2igMkkxbcPQPbUXR2gCLcBGAsYHQ/s1600/AS0005827_02.gif");
                message.channel.send({ embeds: [embedMsg] });
                break;
        }
    }
}
module.exports = {
    name: 'help',
    description: "Displays commands.",
    
    execute(message, args, userid, userData, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        embedMsg.setTitle('List of Commands');
        embedMsg.setColor('FFF000');

        client.commands.forEach((values, keys)=> {
            embedMsg.addField("!tp " + values.name, values.description);
        });

        message.channel.send({ embeds: [embedMsg] });
    }
}
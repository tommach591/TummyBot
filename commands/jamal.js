module.exports = {
    name: 'jamal',
    description: "Get an AK47.",

    execute(message, args, userid, userData, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        embedMsg.setTitle('You aquired an AK47!');
        embedMsg.setImage('https://c.tenor.com/6_4QHa_N9mgAAAAM/shooting-leg-shooting-foot.gif');
        message.channel.send({ embeds: [embedMsg] });
    }
}
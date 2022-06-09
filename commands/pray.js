module.exports = {
    name: 'pray',
    description: "Pray for bonus luck!",

    execute(message, userid, masterData) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        embedMsg.setTitle('Praying!');
        embedMsg.setColor('FFF000');
        embedMsg.setDescription(masterData["userData"][userid].name + ' recieved +1 Luck :sparkles:!');
        embedMsg.setImage("http://66.media.tumblr.com/ec4a1d29ba12ddce8e7cd5050b72df9d/tumblr_occdrflyTm1vuwk4so1_400.gif");
        embedMsg.setFooter("Wow much luck!");
        message.channel.send({ embeds: [embedMsg] });
    }
}
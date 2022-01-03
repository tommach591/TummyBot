module.exports = {
    name: 'reset',
    description: "Basically delete an account.",

    execute(message, args, userid, userData, userFish, userGarden, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        if (userData[userid].gm >= 1) {
            if (args.length == 0) {
                embedMsg.setTitle('Error!');
                embedMsg.setColor('FF0000');
                embedMsg.setDescription('Please @ the user!');
                message.channel.send({ embeds: [embedMsg] });
                return;
            }
            var mention = args[0];

            if (mention.startsWith('<@') && mention.endsWith('>')) {
                mention = mention.slice(2, -1);
        
                if (mention.startsWith('!')) {
                    mention = mention.slice(1);
                }
        
                if (!userData[mention]) {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription('User does not exist!');
                    message.channel.send({ embeds: [embedMsg] });
                    return;
                }
                var username = userData[mention].name;

                if (userFish[mention])
                    delete userFish[mention];
                if (userGarden[mention])
                    delete userGarden[mention];
                    
                delete userData[mention];
                
                embedMsg.setTitle('Success!');
                embedMsg.setColor('00FF00');
                embedMsg.setThumbnail('https://c.tenor.com/AdaSVzqCxLIAAAAC/yugioh-anime.gif');
                embedMsg.setDescription(username + " has been banished to the Shadow Realm!");
                message.channel.send({ embeds: [embedMsg] });
            }
            else {
                embedMsg.setTitle('Error!');
                embedMsg.setColor('FF0000');
                embedMsg.setDescription('User does not exist!');
                message.channel.send({ embeds: [embedMsg] });
            }
        }
        else {
            embedMsg.setTitle('Error!');
            embedMsg.setColor('FF0000');
            embedMsg.setDescription('You do not have permission to use this command!');
            message.channel.send({ embeds: [embedMsg] });
        }
    }
}
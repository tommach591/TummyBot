module.exports = {
    name: 'banish',
    description: "Basically delete an account.",

    execute(message, args, userid, masterData) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        if (masterData["userData"][userid].gm >= 1) {
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
        
                if (!masterData["userData"][mention]) {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription('User does not exist!');
                    message.channel.send({ embeds: [embedMsg] });
                    return;
                }
                var username = masterData["userData"][mention].name;

                if (masterData["userFish"][mention])
                    delete masterData["userFish"][mention];
                if (masterData["userGarden"][mention])
                    delete masterData["userGarden"][mention];
                if (masterData["userPet"][mention])
                    delete masterData["userPet"][mention];
                    
                if (masterData["userHunt"][mention]) {
                    for (let i = 0 ; i < masterData["userHunt"][mention].equips.length; i++) {
                        delete masterData["items"][masterData["userHunt"][mention].equips[i]];
                    }
                    delete masterData["userHunt"][mention];
                }
                if (masterData["userData"][mention].married != "") 
                {
                    masterData["userData"][masterData["userData"][mention].married] = "";
                    masterData["userData"][mention].married = "";
                }
                    
                delete masterData["userData"][mention];
                
                embedMsg.setTitle('Success!');
                embedMsg.setColor('00FF00');
                embedMsg.setImage('https://c.tenor.com/AdaSVzqCxLIAAAAC/yugioh-anime.gif');
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
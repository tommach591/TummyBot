module.exports = {
    name: 'balance',
    description: "Displays your or somebody's balance.",
    
    execute(message, args, userid, userData, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        if (args.length > 0) {
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
                var target = client.users.cache.get(mention);
                embedMsg.setTitle(userData[mention].name);
                embedMsg.setThumbnail(target.displayAvatarURL());
                embedMsg.setColor('FFF000');
                embedMsg.setFields(
                    {name: "Points: ", value: "" + userData[mention].points, inline: false},
                    {name: "Income: ", value: "" + userData[mention].income, inline: false}
                );
                message.channel.send({ embeds: [embedMsg] });
            }
            else {
                embedMsg.setTitle('Error!');
                embedMsg.setColor('FF0000');
                embedMsg.setDescription('User does not exist!');
                message.channel.send({ embeds: [embedMsg] });
                return;
            }
        }
        else {
            embedMsg.setTitle(userData[userid].name);
            var target = client.users.cache.get(userid);
            embedMsg.setThumbnail(target.displayAvatarURL());
            embedMsg.setColor('FFF000');
            embedMsg.setFields(
                {name: "Points: ", value: "" + userData[userid].points, inline: false},
                {name: "Income: ", value: "" + userData[userid].income, inline: false}
            );
            message.channel.send({ embeds: [embedMsg] });
        }
    }
}
module.exports = {
    name: 'balance',
    description: "Displays your or somebody's balance.",
    
    execute(message, args, userid, userData, userFish, userGarden, client) {
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
                    {name: "__Points:__", value: "" + userData[mention].points, inline: true},
                    {name: "__Income:__", value: "" + userData[mention].income, inline: true},
                    {name: "__Fishdex Entries:__", value: "" + userFish[mention].fishdex.length, inline: true},
                    {name: "__Gardendex Entries:__", value: "" + userGarden[mention].gardendex.length, inline: true}
                );

                if (!userData[userid].married && userData[mention].married != "") {
                    embedMsg.addField("__Married To:__", userData[userData[mention].married].name, true);
                }
                else {
                    embedMsg.addField("__Married To:__", "Nobody", true);
                }

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
                {name: "Points: ", value: "" + userData[userid].points, inline: true},
                {name: "Income: ", value: "" + userData[userid].income, inline: true},
                {name: "__Fishdex Entries:__", value: "" + userFish[userid].fishdex.length, inline: true},
                {name: "__Gardendex Entries:__", value: "" + userGarden[userid].gardendex.length, inline: true}
            );

            if (!userData[userid].married && userData[userid].married != "") {
                embedMsg.addField("__Married To:__", userData[userData[userid].married].name, true);
            }
            else {
                embedMsg.addField("__Married To:__", "Nobody", true);
            }

            message.channel.send({ embeds: [embedMsg] });
        }
    }
}
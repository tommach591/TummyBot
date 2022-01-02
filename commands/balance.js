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
                    {name: "__Points:__  :moneybag: ⠀⠀⠀⠀⠀⠀⠀", value: "" + userData[mention].points + "⠀⠀⠀⠀⠀⠀⠀\n", inline: true},
                    {name: "__Income:__  :money_with_wings: ⠀⠀⠀⠀⠀⠀⠀", value: "" + userData[mention].income + "⠀⠀⠀⠀⠀⠀⠀\n", inline: true},
                    {name: "__Fame:__  :sparkles: ⠀⠀⠀⠀⠀⠀⠀", value: "" + userData[mention].fame + "⠀⠀⠀⠀⠀⠀⠀\n", inline: true},
                    {name: "__Fishdex Entries:__  :fishing_pole_and_fish: ⠀⠀⠀⠀⠀⠀⠀", value: "" + userFish[mention].fishdex.length + "\n", inline: false},
                    {name: "__Gardendex Entries:__  :sunflower: ⠀⠀⠀⠀⠀⠀⠀", value: "" + userGarden[mention].gardendex.length + "\n", inline: false}
                );

            if (userData[mention].married != "" && userData[userData[mention].married]) {
                embedMsg.addField("__Married To:__  :ring: ⠀⠀⠀⠀⠀⠀⠀", userData[userData[mention].married].name + "\n", false);
            }
            else {
                embedMsg.addField("__Married To:__  :ring: ⠀⠀⠀⠀⠀⠀⠀", "Nobody\n", false);
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
                {name: "__Points:__  :moneybag: ⠀⠀⠀⠀⠀⠀⠀", value: "" + userData[userid].points + "⠀⠀⠀⠀⠀⠀⠀\n", inline: true},
                {name: "__Income:__  :money_with_wings: ⠀⠀⠀⠀⠀⠀⠀", value: "" + userData[userid].income + "⠀⠀⠀⠀⠀⠀⠀\n", inline: true},
                {name: "__Fame:__  :sparkles: ⠀⠀⠀⠀⠀⠀⠀", value: "" + userData[userid].fame + "⠀⠀⠀⠀⠀⠀⠀\n", inline: true},
                {name: "__Fishdex Entries:__  :fishing_pole_and_fish: ⠀⠀⠀⠀⠀⠀⠀", value: "" + userFish[userid].fishdex.length + "\n", inline: false},
                {name: "__Gardendex Entries:__  :sunflower: ⠀⠀⠀⠀⠀⠀⠀", value: "" + userGarden[userid].gardendex.length + "\n", inline: false}
            );

            if (userData[userid].married != "" && userData[userData[userid].married]) {
                embedMsg.addField("__Married To:__  :ring: ⠀⠀⠀⠀⠀⠀⠀", userData[userData[userid].married].name + "\n", false);
            }
            else {
                embedMsg.addField("__Married To:__  :ring: ⠀⠀⠀⠀⠀⠀⠀", "Nobody\n", false);
            }

            message.channel.send({ embeds: [embedMsg] });
        }
    }
}
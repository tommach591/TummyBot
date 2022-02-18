module.exports = {
    name: 'spawnequip',
    description: "Generate an equip for a user!",

    execute(message, args, userid, userData, userHunt, items, equips, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        let generateEquip = (itemName) => {
            if (!equips[itemName]) {
                return;
            }
            var id = "";
            while (items[id]) {
                id = "";
                for (var i = 0; i < 6; i++) {
                    id += (Math.floor(Math.random() * 10)).toString();
                }
            }
            items[id] = {
                name: equips[itemName].name,
                type: equips[itemName].type,
                maxHP: 0,
                attack: 0,
                magic: 0,
                defense: 0,
                speed: 0,
                slots: (equips[itemName].rarity * 10) + 5
            }
            return id;
        }


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
                const target = client.users.cache.get(mention);

                var itemName = "";
                for (let i = 1; i < args.length; i++) {
                    if (i != 1) {
                        itemName += " ";
                    }
                    itemName += args[i];
                }

                if (equips[itemName]) {
                    var itemObtained = generateEquip(itemName);
                    userHunt[mention].equips.push(itemObtained);
                    embedMsg.setTitle('Success!');
                    embedMsg.setColor('00FF00');
                    embedMsg.setDescription(userData[mention].name + ' was gifted a ' + itemName + '!');
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription('Please enter a valid item name!');
                    message.channel.send({ embeds: [embedMsg] });
                }
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
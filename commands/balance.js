module.exports = {
    name: 'balance',
    description: "Displays your or @somebody's balance.",
    
    execute(message, args, userid, masterData, masterStorage, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        let sendMsg = (id) => {
            var target = client.users.cache.get(id);
            embedMsg.setTitle(masterData["userData"][id].name);
            embedMsg.setThumbnail(target.displayAvatarURL());
            var tier = "";
            switch (masterData["userData"][id].income) {
                case 1:
                    tier = "Bronze";
                    embedMsg.setColor('CD7F32');
                    break;
                case 2:
                    tier = "Silver";
                    embedMsg.setColor('C0C0C0');
                    break;
                case 3:
                    tier = "Gold";
                    embedMsg.setColor('FFD700');
                    break;
                case 4:
                    tier = "Platinum";
                    embedMsg.setColor('3BF2A0');
                    break;
                case 5:
                    tier = "Diamond";
                    embedMsg.setColor('2EFAFF');
                    break;
                case 6:
                    tier = "Red Diamond";
                    embedMsg.setColor('F7333F');
                    break; 
            }
            var fishKeys = [];
            for (var k in masterStorage["fishdex"]) {
                fishKeys.push(k);
            }

            var gardenKeys = [];
            for (var k in masterStorage["gardendex"]) {
                gardenKeys.push(k);
            }

            var fishtext = "" + masterData["userFish"][id].fishdex.length + "/" + fishKeys.length + " ";
            if (masterData["userFish"][id].fishdex.length == fishKeys.length) {
                fishtext += ":trophy:";
            }
            fishtext += "\n";
            
            var gardentext = "" + masterData["userGarden"][id].gardendex.length + "/" + gardenKeys.length + " ";
            if (masterData["userGarden"][id].gardendex.length == gardenKeys.length) {
                gardentext += ":trophy:";
            }
            gardentext += "\n";

            embedMsg.setFields(
                {name: "__Points:__  :moneybag: ⠀⠀⠀⠀", value: "" + masterData["userData"][id].points.toLocaleString() + "\n", inline: true},
                {name: "__Income:__  :money_with_wings: ⠀⠀⠀⠀⠀", value: "" + tier + "\n", inline: true},
                {name: "__Fame:__  :sparkles: ⠀⠀⠀⠀", value: "" + masterData["userData"][id].fame + "\n", inline: true},
                {name: "__Fishdex Entries:__  :fish: ⠀⠀⠀⠀⠀⠀⠀", value: fishtext, inline: false},
                {name: "__Gardendex Entries:__  :sunflower: ⠀⠀⠀⠀⠀⠀⠀", value: gardentext, inline: false}
            );

            if (masterData["userData"][id].married != "" && masterData["userData"][masterData["userData"][id].married]) {
                embedMsg.addField("__Married To:__  :ring: ⠀⠀⠀⠀⠀⠀⠀", masterData["userData"][masterData["userData"][id].married].name + "\n", false);
            }
            else {
                embedMsg.addField("__Married To:__  :ring: ⠀⠀⠀⠀⠀⠀⠀", "Nobody\n", false);
            }

            message.channel.send({ embeds: [embedMsg] });
        }

        let updateBalance = (id) =>
        {
            if (masterData["userData"][id]) {
                var newTime = new Date();
                var timeDiff = newTime.getTime() - masterData["userData"][id].incomeTime;
                var incomeCD = 1000 * 60; // 1min
                var income = 1;
                switch (masterData["userData"][id].income) {
                    case 1:
                        income = 1;
                        break;
                    case 2:
                        income = 2;
                        break;
                    case 3:
                        income = 3;
                        break;
                    case 4:
                        income = 25;
                        break;
                    case 5:
                        income = 250;
                        break;
                    case 6:
                        income = 500000;
                        break;
                }
                if (timeDiff >= incomeCD) {
                    masterData["userData"][id].points += Math.floor(timeDiff / incomeCD) * income;
                    masterData["userData"][id].incomeTime = newTime.getTime() - (timeDiff % incomeCD);
                }
            }
        }

        if (args.length > 0) {
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

                updateBalance(mention);
                sendMsg(mention);
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
            sendMsg(userid);
        }
    }
}
module.exports = {
    name: 'balance',
    description: "Displays your or somebody's balance.",
    
    execute(message, args, userid, userData, userFish, userGarden, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        let sendMsg = (id) => {
            var target = client.users.cache.get(id);
            embedMsg.setTitle(userData[id].name);
            embedMsg.setThumbnail(target.displayAvatarURL());
            var tier = "";
            switch (userData[id].income) {
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
                    tier = "Onyx";
                    embedMsg.setColor('353935');
                    break; 
            }
            var fishtext = "" + userFish[id].fishdex.length + "/" + "105 ";
            if (userFish[id].fishdex.length == 105) {
                fishtext += ":trophy:";
            }
            fishtext += "\n";
            
            var gardentext = "" + userGarden[id].gardendex.length + "/" + "25 ";
            if (userGarden[id].gardendex.length == 25) {
                gardentext += ":trophy:";
            }
            gardentext += "\n";

            embedMsg.setFields(
                {name: "__Points:__  :moneybag: ⠀⠀⠀⠀", value: "" + userData[id].points.toLocaleString() + "\n", inline: true},
                {name: "__Income:__  :money_with_wings: ⠀⠀⠀⠀⠀", value: "" + tier + "\n", inline: true},
                {name: "__Fame:__  :sparkles: ⠀⠀⠀⠀", value: "" + userData[id].fame + "\n", inline: true},
                {name: "__Fishdex Entries:__  :fish: ⠀⠀⠀⠀⠀⠀⠀", value: fishtext, inline: false},
                {name: "__Gardendex Entries:__  :sunflower: ⠀⠀⠀⠀⠀⠀⠀", value: gardentext, inline: false}
            );

            if (userData[id].married != "" && userData[userData[id].married]) {
                embedMsg.addField("__Married To:__  :ring: ⠀⠀⠀⠀⠀⠀⠀", userData[userData[id].married].name + "\n", false);
            }
            else {
                embedMsg.addField("__Married To:__  :ring: ⠀⠀⠀⠀⠀⠀⠀", "Nobody\n", false);
            }

            message.channel.send({ embeds: [embedMsg] });
        }

        let updateBalance = (id) =>
        {
            if (userData[id]) {
                var newTime = new Date();
                var timeDiff = newTime.getTime() - userData[id].incomeTime;
                var incomeCD = 1000 * 60; // 1min
                var income = 1;
                switch (userData[id].income) {
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
                    userData[id].points += Math.floor(timeDiff / incomeCD) * income;
                    userData[id].incomeTime = newTime.getTime() - (timeDiff % incomeCD);
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
            
                if (!userData[mention]) {
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
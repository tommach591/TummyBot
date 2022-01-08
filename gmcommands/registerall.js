module.exports = {
    name: 'registerall',
    description: "Register all accounts.",

    execute(message, args, userid, userData, userFish, userGarden, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        if (userData[userid].gm >= 1) {

            var keys = [];
            for (var k in userData) {
                keys.push(k);
            }

            var newTime = new Date();

            for (var i = 0; i < keys.length; i++) {

                /*
                    Below this is to add to userData
                */


                /*
                    Erase after done ^
                */

                if (!userFish[keys[i]]) {
                    userFish[keys[i]] = {
                        name: userData[keys[i]].name,
                        id: keys[i],
                        fishingRod: 'Bare Hand',
                        fishBait: 0,
                        fishTime: 0,
                        fishdex: [],
                        fishInventory: []
                    }
                }
                if (!userGarden[keys[i]]) {
                    userGarden[keys[i]] = {
                        id: keys[i],
                        name: userData[keys[i]].name,
                        pots: ["0", "-1", "-1"],
                        potTime: [0, 0, 0],
                        gardendex: []
                    }
                }

                if (!userHunt[keys[i]]) {
                    userHunt[keys[i]] = {
                        id: keys[i],
                        name: userData[keys[i]].name,
                        maxHP: 100,
                        attack: 3,
                        magic: 3,
                        defense: 0,
                        speed: 0,
                        currentHP: 100,
                        lastAttack: 0,
                        deathTime: 0,
                        weapon: "000000",
                        armor: "000000",
                        accessory: "000000",
                        equips: [],
                        scrolls: [],
                        monsterdex: []
                    }
                }
            }

            embedMsg.setTitle('Finished!');
            embedMsg.setColor('00FF00');
            embedMsg.setDescription("Registered all users!");
            message.channel.send({ embeds: [embedMsg] });

        }
        else {
            embedMsg.setTitle('Error!');
            embedMsg.setColor('FF0000');
            embedMsg.setDescription('You do not have permission to use this command!');
            message.channel.send({ embeds: [embedMsg] });
        }

    }
}
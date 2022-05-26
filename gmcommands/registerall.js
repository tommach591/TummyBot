module.exports = {
    name: 'registerall',
    description: "Register all accounts.",

    execute(message, userid, masterData) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        if (masterData["userData"][userid].gm >= 1) {

            var keys = [];
            for (var k in masterData["userData"]) {
                keys.push(k);
            }

            var newTime = new Date();

            for (var i = 0; i < keys.length; i++) {

                /*
                    Below this is to add to masterData["userData"]
                */


                /*
                    Erase after done ^
                */

                if (!masterData["userFish"][keys[i]]) {
                    masterData["userFish"][keys[i]] = {
                        name: masterData["userData"][keys[i]].name,
                        id: keys[i],
                        fishingRod: 'Bare Hand',
                        fishBait: 0,
                        fishTime: 0,
                        fishdex: [],
                        fishInventory: []
                    }
                }
                if (!masterData["userGarden"][keys[i]]) {
                    masterData["userGarden"][keys[i]] = {
                        id: keys[i],
                        name: masterData["userData"][keys[i]].name,
                        pots: ["0", "-1", "-1"],
                        potTime: [0, 0, 0],
                        gardendex: []
                    }
                }

                if (!masterData["userHunt"][keys[i]]) {
                    masterData["userHunt"][keys[i]] = {
                        id: keys[i],
                        name: masterData["userData"][keys[i]].name,
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

                if (!masterData["userPet"][keys[i]]) {
                    masterData["userPet"][keys[i]] = {
                        id: keys[i],
                        name: masterData["userData"][keys[i]].name,
                        pet: "0",
                        petName: "",
                        type: 0,
                        image: "",
                        food: 0,
                        hunger: 0,
                        hydration: 0,
                        cleanliness: 0,
                        happiness: 0,
                        level: 0,
                        hungerTimer: 0,
                        hydrationTimer: 0,
                        cleanlinessTimer: 0,
                        happinessTimer: 0,
                        deathTimer: 0,
                        dead: false
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
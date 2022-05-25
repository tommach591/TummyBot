module.exports = {
    name: 'register',
    description: "Register an account.",

    execute(message, args, userid, masterData) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        if (!masterData["userData"][userid]) {
            var newTime = new Date();
            masterData["userData"][userid] = {
                name: message.author.username,
                id: userid,
                gm: 0,
                points: 100,
                incomeTime: newTime.getTime(),
                income: 1,
                begTime: 0,
                fame: 0,
                fameTime: 0,
                married: "",
                bank: 0,
                bankTick: newTime.getTime()
            }
            if (!masterData["userFish"][userid]) {
                masterData["userFish"][userid] = {
                    name: masterData["userData"][userid].name,
                    id: userid,
                    fishingRod: 'Bare Hand',
                    fishBait: 0,
                    fishTime: 0,
                    fishdex: [],
                    fishInventory: []
                }
            }
            if (!masterData["userGarden"][userid]) {
                masterData["userGarden"][userid] = {
                    id: userid,
                    name: masterData["userData"][userid].name,
                    pots: ["0", "-1", "-1"],
                    potTime: [0, 0, 0],
                    gardendex: []
                }
            }
            if (!masterData["userHunt"][userid]) {
                masterData["userHunt"][userid] = {
                    id: userid,
                    name: masterData["userData"][userid].name,
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
            if (!masterData["userPet"][userid]) {
                masterData["userPet"][userid] = {
                    id: userid,
                    name: masterData["userData"][userid].name,
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

            embedMsg.setTitle('Welcome!');
            embedMsg.setColor('00FF00');
            embedMsg.setDescription(masterData["userData"][userid].name + " has joined Fishy Boot!");
            embedMsg.setFooter('Use !tp help for list of commands!');
            message.channel.send({ embeds: [embedMsg] });

        }
        else {
            embedMsg.setTitle('Error!');
            embedMsg.setColor('FF0000');
            embedMsg.setDescription("You already registered!");
            message.channel.send({ embeds: [embedMsg] });
        }
    }
}
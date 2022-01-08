module.exports = {
    name: 'register',
    description: "Register an account.",

    execute(message, args, userid, userData, userFish, userGarden, userHunt, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        if (!userData[userid]) {
            var newTime = new Date();
            userData[userid] = {
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
            if (!userFish[userid]) {
                userFish[userid] = {
                    name: userData[userid].name,
                    id: userid,
                    fishingRod: 'Bare Hand',
                    fishBait: 0,
                    fishTime: 0,
                    fishdex: [],
                    fishInventory: []
                }
            }
            if (!userGarden[userid]) {
                userGarden[userid] = {
                    id: userid,
                    name: userData[userid].name,
                    pots: ["0", "-1", "-1"],
                    potTime: [0, 0, 0],
                    gardendex: []
                }
            }
            if (!userHunt[userid]) {
                userHunt[userid] = {
                    id: userid,
                    name: userData[userid].name,
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

            embedMsg.setTitle('Welcome!');
            embedMsg.setColor('00FF00');
            embedMsg.setDescription(userData[userid].name + " has joined Fishy Boot!");
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
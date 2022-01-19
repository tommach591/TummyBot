module.exports = {
    name: 'spawnboss',
    description: "Spawn a specific boss.",

    execute(message, args, userid, userData, currHunt, monsterdex, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        if (userData[userid].gm >= 1) {
            if (args.length == 0) {
                embedMsg.setTitle('Error!');
                embedMsg.setColor('FF0000');
                embedMsg.setDescription('Please enter a boss to spawn!');
                message.channel.send({ embeds: [embedMsg] });
                return;
            }
            var boss = Math.floor(Number(args[0]));
            var newTime = new Date();

            if (currHunt["active"]) {
                embedMsg.setTitle('Error!');
                embedMsg.setColor('FF0000');
                embedMsg.setDescription('Boss is already active!');
                message.channel.send({ embeds: [embedMsg] });
            }
            else if (!isNaN(boss) && monsterdex[boss]) {

                var selectedMonster = monsterdex[boss];

                currHunt["active"] = {
                    id: selectedMonster.id,
                    name: selectedMonster.name,
                    info: selectedMonster.info,
                    entry: selectedMonster.entry,
                    shoutout: selectedMonster.shoutout,
                    death: selectedMonster.death,
                    image: selectedMonster.image,
                    attackImage: selectedMonster.attackImage,
                    maxHP: selectedMonster.maxHP,
                    attack: selectedMonster.attack,
                    defense: selectedMonster.defense,
                    magicdefense: selectedMonster.magicdefense,
                    attackCD: selectedMonster.attackCD,
                    difficulty: selectedMonster.difficulty,
                    loot: selectedMonster.loot,
                    currentHP: selectedMonster.maxHP,
                    lastAttack: selectedMonster.attackCD + newTime.getTime(),
                    targets: [],
                    playerDamage: [],
                    channels: [],
                    lastPlayerAttack: newTime.getTime(),
                    deathCount: 0,
                    deathLimit: 20,
                    retreated: false
                }

                currHunt["active"].channels.push(message.channel);
                const embedMsg = new MessageEmbed();
                var stars = " (";
                for (let i = 0; i < currHunt["active"].difficulty; i++) {
                    stars += "★";
                }
                stars += ")"
                embedMsg.setTitle(currHunt["active"].name + stars);
                embedMsg.setDescription(currHunt["active"].entry);
                embedMsg.setImage(currHunt["active"].image);
                embedMsg.setFooter("HP: " + currHunt["active"].currentHP + "/" + currHunt["active"].maxHP);
                embedMsg.setColor("49000F");
                currHunt["active"].channels[0].send({ embeds: [embedMsg] });
            }
            else {
                embedMsg.setTitle('Error!');
                embedMsg.setColor('FF0000');
                embedMsg.setDescription('Not a number!');
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
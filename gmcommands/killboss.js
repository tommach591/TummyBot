module.exports = {
    name: 'killboss',
    description: "Kills current boss.",

    execute(message, args, userid, userData, userHunt, currHunt, monsterdex, items, equips, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        let updateStats = (id) => {
            weapon = items[userHunt[id].weapon];
            armor = items[userHunt[id].armor];
            accessory = items[userHunt[id].accessory];
    
            maxHP = userHunt[id].maxHP;
            attack = userHunt[id].attack;
            magic = userHunt[id].magic;
            defense = userHunt[id].defense;
            speed = userHunt[id].speed;
    
            if (weapon.name != "Nothing") {
                maxHP += weapon.maxHP + equips[weapon.name].maxHP;
                attack += weapon.attack + equips[weapon.name].attack;
                magic += weapon.magic + equips[weapon.name].magic;
                defense += weapon.defense + equips[weapon.name].defense;
                speed += weapon.speed + equips[weapon.name].speed;
            }
    
            if (armor.name != "Nothing") {
                maxHP += armor.maxHP + equips[armor.name].maxHP;
                attack += armor.attack + equips[armor.name].attack;
                magic += armor.magic + equips[armor.name].magic;
                defense += armor.defense + equips[armor.name].defense;
                speed += armor.speed + equips[armor.name].speed;
            }
    
            if (accessory.name != "Nothing") {
                maxHP += accessory.maxHP + equips[accessory.name].maxHP;
                attack += accessory.attack + equips[accessory.name].attack;
                magic += accessory.magic + equips[accessory.name].magic;
                defense += accessory.defense + equips[accessory.name].defense;
                speed += accessory.speed + equips[accessory.name].speed;
            }

            if (maxHP < 1) {
                maxHP = 1;
            }
            if (attack < 0) {
                attack = 0;
            }
            if (magic < 0) {
                magic = 0;
            }
            if (defense < 0) {
                defense = 0;
            }
            if (speed < 0) {
                speed = 0;
            }

            critChance = 0 + (100 * (speed * 0.5 / 100));
            if (critChance > 100) {
                critChance = 100;
                critDmg = 5 + ((speed - 200) * 0.02);
            }
            else
            {
                critDmg = 3 + (speed * 0.01);
            }

            if (!currHunt["active"] || currHunt["active"].currentHP <= 0 || currHunt["active"].retreated) {
                userHunt[id].currentHP = maxHP;
            }
            
        }

        if (userData[userid].gm >= 1) {
            if (currHunt["active"]) {
                var players = currHunt["active"].targets;
                delete currHunt["active"];
                for (let i = 0; i < players.length; i++)
                {
                    updateStats(players[i])
                }
                embedMsg.setTitle('Success!');
                embedMsg.setColor('FF0000');
                embedMsg.setDescription('Boss is banished to the Shadow Realm!');
                message.channel.send({ embeds: [embedMsg] });
            }
            else {
                embedMsg.setTitle('Error!');
                embedMsg.setColor('FF0000');
                embedMsg.setDescription('Boss is not active!');
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
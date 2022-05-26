module.exports = {
    name: 'killboss',
    description: "Kills current boss.",

    execute(message, userid, masterData, masterStorage) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        let updateStats = (id) => {
            weapon = masterData["items"][masterData["userHunt"][id].weapon];
            armor = masterData["items"][masterData["userHunt"][id].armor];
            accessory = masterData["items"][masterData["userHunt"][id].accessory];
    
            maxHP = masterData["userHunt"][id].maxHP;
            attack = masterData["userHunt"][id].attack;
            magic = masterData["userHunt"][id].magic;
            defense = masterData["userHunt"][id].defense;
            speed = masterData["userHunt"][id].speed;
    
            if (weapon.name != "Nothing") {
                maxHP += weapon.maxHP + masterStorage["equips"][weapon.name].maxHP;
                attack += weapon.attack + masterStorage["equips"][weapon.name].attack;
                magic += weapon.magic + masterStorage["equips"][weapon.name].magic;
                defense += weapon.defense + masterStorage["equips"][weapon.name].defense;
                speed += weapon.speed + masterStorage["equips"][weapon.name].speed;
            }
    
            if (armor.name != "Nothing") {
                maxHP += armor.maxHP + masterStorage["equips"][armor.name].maxHP;
                attack += armor.attack + masterStorage["equips"][armor.name].attack;
                magic += armor.magic + masterStorage["equips"][armor.name].magic;
                defense += armor.defense + masterStorage["equips"][armor.name].defense;
                speed += armor.speed + masterStorage["equips"][armor.name].speed;
            }
    
            if (accessory.name != "Nothing") {
                maxHP += accessory.maxHP + masterStorage["equips"][accessory.name].maxHP;
                attack += accessory.attack + masterStorage["equips"][accessory.name].attack;
                magic += accessory.magic + masterStorage["equips"][accessory.name].magic;
                defense += accessory.defense + masterStorage["equips"][accessory.name].defense;
                speed += accessory.speed + masterStorage["equips"][accessory.name].speed;
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

            if (!masterData["currHunt"]["active"] || masterData["currHunt"]["active"].currentHP <= 0 || masterData["currHunt"]["active"].retreated) {
                masterData["userHunt"][id].currentHP = maxHP;
            }
            
        }

        if (masterData["userData"][userid].gm >= 1) {
            if (masterData["currHunt"]["active"]) {
                var players = masterData["currHunt"]["active"].targets;
                delete masterData["currHunt"]["active"];
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
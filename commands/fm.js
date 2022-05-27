module.exports = {
    name: 'fm',
    description: "Buy and sell from other players at the Free Market!",

    execute(message, args, userid, masterData, masterStorage, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        let generateFM = (itemType, itemID, price) => {
            var id = "";
            while (masterData["fm"][id]) {
                id = "";
                for (var i = 0; i < 6; i++) {
                    id += (Math.floor(Math.random() * 10)).toString();
                }
            }
            var itemName = "";
            if (itemType == "equip")
            {
                itemName = masterData["items"][itemID].name;
            }
            else if (itemType == "scroll")
            {
                itemName = masterStorage["scrolls"][itemID].name;
            }
            masterData["fm"][id] = {
                id: id,
                ownerID: userid,
                itemType: itemType,
                itemID: itemID,
                itemName: itemName,
                price: price
            }
            return id;
        }

        var keys = [];
        for (var k in masterData["fm"]) {
            keys.push(k);
        }
        keys.sort((firstEl, secondEl) => { 
            if (masterData["fm"][firstEl].price < masterData["fm"][secondEl].price) {
                return -1;
            }
            if (masterData["fm"][firstEl].price > masterData["fm"][secondEl].price) {
                return 1;
            }
            return 0;
        });
        var person = client.users.cache.get(userid);

        var command = args[0];
        switch(command) {
            case 'help':
                const fmCommands = new Map();
                fmCommands.set('help', 'Displays list of FM commands.');
                fmCommands.set('sell', 'List an item to sell.');
                fmCommands.set('buy', 'Purchase an item from the FM.');
                fmCommands.set('withdraw', 'Retrieve an item back from the FM.');
                fmCommands.set('search', 'Search for an item in the FM.');
                fmCommands.set('listings', 'Display all your items in the FM.');

                embedMsg.setTitle('List of FM Commands');
                embedMsg.setColor('FFF000');

                fmCommands.forEach((values, keys)=> {
                    embedMsg.addField("!tp fm " + keys, values);
                });

                message.channel.send({ embeds: [embedMsg] });
                break;
            case 'sell':
                if (args.length <= 4)
                {
                    var type = args[1];
                    var target = Math.floor(Number(args[2]) - 1);
                    var price = Math.floor(Number(args[3]));

                    if (isNaN(Number(price)) || price < 0)
                    {
                        embedMsg.setTitle('Error!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription('Invalid Price!');
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else
                    {
                        if (type == "equip" || type == "inv")
                        {
                            type = "equip";
                            if (target < 0 || target >= masterData["userHunt"][userid].equips.length || isNaN(Number(target))) {
                                embedMsg.setTitle('Error!');
                                embedMsg.setColor('FF0000');
                                embedMsg.setDescription('Weapon does not exist!');
                                message.channel.send({ embeds: [embedMsg] });
                            }
                            else 
                            {
                                let original = [...masterData["userHunt"][userid].equips];
                                var itemToSell = masterData["userHunt"][userid].equips[target];
                                const proposalMsg = new MessageEmbed();
                                proposalMsg.setTitle('Selling!');
                                proposalMsg.setColor('FFF000');
                                proposalMsg.setDescription("Would " + masterData["userData"][userid].name + " like to list " + masterData["items"][itemToSell].name + 
                                                            " for " + price.toLocaleString() + " point(s)?");
                                proposalMsg.setFooter("There will be a 15% tax when sold!");
                                proposalMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: person.displayAvatarURL() });

                                let proposal; 
                                message.channel.send({ embeds: [proposalMsg] }).then(
                                    sent => { proposal = sent } 
                                ).then(
                                    () => {
                                        proposal.react('👍').then(() => proposal.react('👎'));
                                        const filter = (reaction, user) => {
                                            return ['👍', '👎'].includes(reaction.emoji.name) && user.id === userid;
                                        };
                                        proposal.awaitReactions({ filter, max: 1, time: 30000, errors: ['time'] })
                                        .then(
                                            collected => {
                                            const reaction = collected.first();
                                            if (reaction.emoji.name === '👍' && JSON.stringify(masterData["userHunt"][userid].equips) == JSON.stringify(original)) {
                                                generateFM(type, itemToSell, price);
                                                masterData["userHunt"][userid].equips.splice(target, 1);
                                                
                                                embedMsg.setTitle('Success!');
                                                embedMsg.setColor('00FF00');
                                                embedMsg.setDescription(masterData["items"][itemToSell].name + " listed for " + price.toLocaleString() + " point(s)!");
                                                embedMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: person.displayAvatarURL() });
                                                message.channel.send({ embeds: [embedMsg] });
                                            } 
                                            else if (reaction.emoji.name === '👎') {
                                                embedMsg.setTitle('Declined!');
                                                embedMsg.setColor('FF0000');
                                                embedMsg.setDescription(masterData["userData"][userid].name + " declined!");
                                                embedMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: person.displayAvatarURL() });
                                                message.channel.send({ embeds: [embedMsg] });
                                            }
                                            else {
                                                embedMsg.setTitle('Fail!');
                                                embedMsg.setColor('FF0000');
                                                embedMsg.setDescription(masterData["userData"][userid].name + " inventory changed!");
                                                embedMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: person.displayAvatarURL() });
                                                message.channel.send({ embeds: [embedMsg] });
                                            }
                                        })
                                        .catch(collected => {
                                            embedMsg.setTitle('Fail!');
                                            embedMsg.setColor('FF0000');
                                            embedMsg.setDescription(masterData["userData"][userid].name + " took too long to respond!");
                                            embedMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: person.displayAvatarURL() });
                                            message.channel.send({ embeds: [embedMsg] });
                                        });
                                    }
                                );
                            }
                        }
                        else if (type == "scroll")
                        {
                            if (target < 0 || target >= masterData["userHunt"][userid].scrolls.length || isNaN(Number(target))) {
                                embedMsg.setTitle('Error!');
                                embedMsg.setColor('FF0000');
                                embedMsg.setDescription('Scroll does not exist!');
                                message.channel.send({ embeds: [embedMsg] });
                            }
                            else 
                            {
                                let original = [...masterData["userHunt"][userid].scrolls];
                                var itemToSell = masterData["userHunt"][userid].scrolls[target];
                                const proposalMsg = new MessageEmbed();
                                proposalMsg.setTitle('Selling!');
                                proposalMsg.setColor('FFF000');
                                proposalMsg.setDescription("Would " + masterData["userData"][userid].name + " like to list " + masterStorage["scrolls"][itemToSell].name + 
                                                            " for " + price.toLocaleString() + " point(s)?");
                                proposalMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: person.displayAvatarURL() });

                                let proposal; 
                                message.channel.send({ embeds: [proposalMsg] }).then(
                                    sent => { proposal = sent } 
                                ).then(
                                    () => {
                                        proposal.react('👍').then(() => proposal.react('👎'));
                                        const filter = (reaction, user) => {
                                            return ['👍', '👎'].includes(reaction.emoji.name) && user.id === userid;
                                        };
                                        proposal.awaitReactions({ filter, max: 1, time: 30000, errors: ['time'] })
                                        .then(
                                            collected => {
                                            const reaction = collected.first();
                                            if (reaction.emoji.name === '👍' && JSON.stringify(masterData["userHunt"][userid].scrolls) == JSON.stringify(original)) {
                                                generateFM(type, itemToSell, price);
                                                masterData["userHunt"][userid].scrolls.splice(target, 1);
                                                
                                                embedMsg.setTitle('Success!');
                                                embedMsg.setColor('00FF00');
                                                embedMsg.setDescription(masterStorage["scrolls"][itemToSell].name + " listed for " + price.toLocaleString() + " points!");
                                                embedMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: person.displayAvatarURL() });
                                                message.channel.send({ embeds: [embedMsg] });
                                            } 
                                            else if (reaction.emoji.name === '👎') {
                                                embedMsg.setTitle('Declined!');
                                                embedMsg.setColor('FF0000');
                                                embedMsg.setDescription(masterData["userData"][userid].name + " declined!");
                                                embedMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: person.displayAvatarURL() });
                                                message.channel.send({ embeds: [embedMsg] });
                                            }
                                            else {
                                                embedMsg.setTitle('Fail!');
                                                embedMsg.setColor('FF0000');
                                                embedMsg.setDescription(masterData["userData"][userid].name + " inventory changed!");
                                                embedMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: person.displayAvatarURL() });
                                                message.channel.send({ embeds: [embedMsg] });
                                            }
                                        })
                                        .catch(collected => {
                                            embedMsg.setTitle('Fail!');
                                            embedMsg.setColor('FF0000');
                                            embedMsg.setDescription(masterData["userData"][userid].name + " took too long to respond!");
                                            embedMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: person.displayAvatarURL() });
                                            message.channel.send({ embeds: [embedMsg] });
                                        });
                                    }
                                );
                            }
                        }
                        else 
                        {
                            embedMsg.setTitle("Error!");
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription("Not a valid type!");
                            message.channel.send({ embeds: [embedMsg] });
                        }
                    }
                }
                else
                {
                    embedMsg.setTitle("Error!");
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription("Not enough parameters!");
                    embedMsg.setFooter("!tp fm sell equip/scroll #index #price!");
                    message.channel.send({ embeds: [embedMsg] });
                }
                break;
            case 'buy':
                if (args.length < 2)
                {
                    embedMsg.setTitle("Error!");
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription("Not enough parameters!");
                    embedMsg.setFooter("!tp fm buy #!");
                    message.channel.send({ embeds: [embedMsg] });
                }
                else
                {
                    var target = Math.floor(Number(args[1]) - 1);
                    if (isNaN(target) || target < 0 || target >= keys.length)
                    {
                        embedMsg.setTitle("Error!");
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription("Invalid index!");
                        embedMsg.setFooter("Find the index you want to withdraw!");
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else
                    {
                        if (masterData["fm"][keys[target]].ownerID == userid)
                        {
                            embedMsg.setTitle("Error!");
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription("This item is yours!");
                            message.channel.send({ embeds: [embedMsg] });
                        }
                        else if (masterData["userData"][userid].points < masterData["fm"][keys[target]].price)
                        {
                            embedMsg.setTitle("Error!");
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription("Not enough points!");
                            message.channel.send({ embeds: [embedMsg] });
                        }
                        else 
                        {
                            const proposalMsg = new MessageEmbed();
                            proposalMsg.setTitle('Buying!');
                            proposalMsg.setColor('FFF000');
                            proposalMsg.setDescription("Would " + masterData["userData"][userid].name + " like to purchase " + masterData["fm"][keys[target]].itemName + 
                                                        " from " + masterData["userData"][masterData["fm"][keys[target]].ownerID].name +
                                                        " for " + masterData["fm"][keys[target]].price.toLocaleString() + " point(s)?");
                            proposalMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: person.displayAvatarURL() });

                            let proposal; 
                            message.channel.send({ embeds: [proposalMsg] }).then(
                                sent => { proposal = sent } 
                            ).then(
                                () => {
                                    proposal.react('👍').then(() => proposal.react('👎'));
                                    const filter = (reaction, user) => {
                                        return ['👍', '👎'].includes(reaction.emoji.name) && user.id === userid;
                                    };
                                    proposal.awaitReactions({ filter, max: 1, time: 30000, errors: ['time'] })
                                    .then(
                                        collected => {
                                        const reaction = collected.first();
                                        if (reaction.emoji.name === '👍') {
                                            if (masterData["fm"][keys[target]].itemType == "equip")
                                            {
                                                masterData["userHunt"][userid].equips.push(masterData["fm"][keys[target]].itemID);
                                            }
                                            else if (masterData["fm"][keys[target]].itemType == "scroll")
                                            {
                                                masterData["userHunt"][userid].scrolls.push(masterData["fm"][keys[target]].itemID);
                                            }
                                            masterData["userData"][userid].points -= masterData["fm"][keys[target]].price;
                                            var profit = Math.floor(masterData["fm"][keys[target]].price * 0.85);
                                            if (profit <= 0)
                                            {
                                                profit = 1;
                                            }
                                            masterData["userData"][masterData["fm"][keys[target]].ownerID].points += profit;
                                            embedMsg.setTitle('Success!');
                                            embedMsg.setColor('00FF00');
                                            embedMsg.setDescription(masterData["fm"][keys[target]].itemName + " purchased!");
                                            embedMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: person.displayAvatarURL() });
                                            message.channel.send({ embeds: [embedMsg] });
                                            message.channel.send("<@!" + masterData["fm"][keys[target]].ownerID + "> sold an item!");
                                            
                                            delete masterData["fm"][keys[target]];
                                        } 
                                        else if (reaction.emoji.name === '👎') {
                                            embedMsg.setTitle('Declined!');
                                            embedMsg.setColor('FF0000');
                                            embedMsg.setDescription(masterData["userData"][userid].name + " declined!");
                                            embedMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: person.displayAvatarURL() });
                                            message.channel.send({ embeds: [embedMsg] });
                                        }
                                        else {
                                            embedMsg.setTitle('Fail!');
                                            embedMsg.setColor('FF0000');
                                            embedMsg.setDescription(masterData["userData"][userid].name + " inventory changed!");
                                            embedMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: person.displayAvatarURL() });
                                            message.channel.send({ embeds: [embedMsg] });
                                        }
                                    })
                                    .catch(collected => {
                                        embedMsg.setTitle('Fail!');
                                        embedMsg.setColor('FF0000');
                                        embedMsg.setDescription(masterData["userData"][userid].name + " took too long to respond!");
                                        embedMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: person.displayAvatarURL() });
                                        message.channel.send({ embeds: [embedMsg] });
                                    });
                                }
                            );
                        }
                    }
                }
                break;
            case 'withdraw':
                if (args.length < 2)
                {
                    embedMsg.setTitle("Error!");
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription("Not enough parameters!");
                    embedMsg.setFooter("!tp fm withdraw #!");
                    message.channel.send({ embeds: [embedMsg] });
                }
                else
                {
                    var target = Math.floor(Number(args[1]) - 1);
                    if (isNaN(target) || target < 0 || target >= keys.length)
                    {
                        embedMsg.setTitle("Error!");
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription("Invalid index!");
                        embedMsg.setFooter("Find the index you want to withdraw!");
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else
                    {
                        if (masterData["fm"][keys[target]].ownerID != userid)
                        {
                            embedMsg.setTitle("Error!");
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription("This item is not yours!");
                            message.channel.send({ embeds: [embedMsg] });
                        }
                        else 
                        {
                            const proposalMsg = new MessageEmbed();
                            proposalMsg.setTitle('Withdraw!');
                            proposalMsg.setColor('FFF000');
                            proposalMsg.setDescription("Would " + masterData["userData"][userid].name + " like to withdraw " + masterData["fm"][keys[target]].itemName + 
                                                        " from the FM?");
                            proposalMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: person.displayAvatarURL() });

                            let proposal; 
                            message.channel.send({ embeds: [proposalMsg] }).then(
                                sent => { proposal = sent } 
                            ).then(
                                () => {
                                    proposal.react('👍').then(() => proposal.react('👎'));
                                    const filter = (reaction, user) => {
                                        return ['👍', '👎'].includes(reaction.emoji.name) && user.id === userid;
                                    };
                                    proposal.awaitReactions({ filter, max: 1, time: 30000, errors: ['time'] })
                                    .then(
                                        collected => {
                                        const reaction = collected.first();
                                        if (reaction.emoji.name === '👍') {
                                            if (masterData["fm"][keys[target]].itemType == "equip")
                                            {
                                                masterData["userHunt"][userid].equips.push(masterData["fm"][keys[target]].itemID);
                                            }
                                            else if (masterData["fm"][keys[target]].itemType == "scroll")
                                            {
                                                masterData["userHunt"][userid].scrolls.push(masterData["fm"][keys[target]].itemID);
                                            }
                                            embedMsg.setTitle('Success!');
                                            embedMsg.setColor('00FF00');
                                            embedMsg.setDescription(masterData["fm"][keys[target]].itemName + " withdrawed!");
                                            embedMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: person.displayAvatarURL() });
                                            message.channel.send({ embeds: [embedMsg] });
                                            
                                            delete masterData["fm"][keys[target]];
                                        } 
                                        else if (reaction.emoji.name === '👎') {
                                            embedMsg.setTitle('Declined!');
                                            embedMsg.setColor('FF0000');
                                            embedMsg.setDescription(masterData["userData"][userid].name + " declined!");
                                            message.channel.send({ embeds: [embedMsg] });
                                        }
                                        else {
                                            embedMsg.setTitle('Fail!');
                                            embedMsg.setColor('FF0000');
                                            embedMsg.setDescription(masterData["userData"][userid].name + " inventory changed!");
                                            message.channel.send({ embeds: [embedMsg] });
                                        }
                                    })
                                    .catch(collected => {
                                        embedMsg.setTitle('Fail!');
                                        embedMsg.setColor('FF0000');
                                        embedMsg.setDescription(masterData["userData"][userid].name + " took too long to respond!");
                                        embedMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: person.displayAvatarURL() });
                                        message.channel.send({ embeds: [embedMsg] });
                                    });
                                }
                            );
                        }
                    }
                }
                break;
            case 'search':
                if (args.length < 2)
                {
                    embedMsg.setTitle("Error!");
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription("Not enough parameters!");
                    embedMsg.setFooter("!tp fm search name!");
                    message.channel.send({ embeds: [embedMsg] });
                }
                else
                {
                    var searchCondition = "";
                    for (let i = 1; i < args.length; i++)
                    {
                        if (i != 1)
                        {
                            searchCondition += " ";
                        }
                        searchCondition += args[i];
                    }
                    var fmItems = [""];
                    var index = 0;
                    var count = 0;
                    if (keys.length == 0)
                    {
                        embedMsg.setTitle('Free Market');
                        embedMsg.setColor('FFF000');
                        embedMsg.setDescription('Nothing for sale :(');
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else
                    {
                        for (let i = 0; i < keys.length; i++) {
                            if (count >= 5) {
                                index++;
                                count = 0;
                                fmItems[index] = "";
                            }
                            if (masterData["fm"][keys[i]].itemName.includes(searchCondition))
                            {
                                if (masterData["fm"][keys[i]].itemType == "equip") 
                                {
                                    var element = masterData["fm"][keys[i]].itemID;
                                    var standard = masterStorage["equips"][masterData["items"][element].name];
                                    var equipType = "";

                                    switch (masterData["items"][element].type) {
                                        case 0:
                                            equipType = "Weapon";
                                            break;
                                        case 1:
                                            equipType = "Armor";
                                            break;
                                        case 2:
                                            equipType = "Accessory";
                                            break;
                                    }

                                    fmItems[index] += "**__" + (i + 1) + ". " + masterData["items"][element].name + "__**⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀"
                                    + "\nRarity: " + standard.rarity
                                    + "\nType: " + equipType;
                                    if (masterData["items"][element].maxHP + standard.maxHP != 0) {
                                        if (masterData["items"][element].maxHP < 0) {
                                            fmItems[index] += "\nMaxHP: " + (masterData["items"][element].maxHP + standard.maxHP) + " (" + masterData["items"][element].maxHP + ")";
                                        }
                                        else {
                                            fmItems[index] += "\nMaxHP: " + (masterData["items"][element].maxHP + standard.maxHP) + " (+" + masterData["items"][element].maxHP + ")";
                                        }
                                    }
                                    if (masterData["items"][element].attack + standard.attack != 0) {
                                        if (masterData["items"][element].attack < 0) {
                                            fmItems[index] += "\nAttack: " + (masterData["items"][element].attack + standard.attack) + " (" + masterData["items"][element].attack + ")";
                                        }
                                        else {
                                            fmItems[index] += "\nAttack: " + (masterData["items"][element].attack + standard.attack) + " (+" + masterData["items"][element].attack + ")";
                                        }
                                    }
                                    if (masterData["items"][element].magic + standard.magic != 0) {
                                        if (masterData["items"][element].magic < 0) {
                                            fmItems[index] += "\nMagic: " + (masterData["items"][element].magic + standard.magic) + " (" + masterData["items"][element].magic + ")";
                                        }
                                        else {
                                            fmItems[index] += "\nMagic: " + (masterData["items"][element].magic + standard.magic) + " (+" + masterData["items"][element].magic + ")";
                                        }
                                    }
                                    if (masterData["items"][element].defense + standard.defense != 0) {
                                        if (masterData["items"][element].defense < 0) {
                                            fmItems[index] += "\nDefense: " + (masterData["items"][element].defense + standard.defense) + " (" + masterData["items"][element].defense + ")";
                                        }
                                        else {
                                            fmItems[index] += "\nDefense: " + (masterData["items"][element].defense + standard.defense) + " (+" + masterData["items"][element].defense + ")";
                                        }
                                    }
                                    if (masterData["items"][element].speed + standard.speed != 0) {
                                        if (masterData["items"][element].speed < 0) {
                                            fmItems[index] += "\nSpeed: " + (masterData["items"][element].speed + standard.speed) + " (" + masterData["items"][element].speed + ")";
                                        }
                                        else {
                                            fmItems[index] += "\nSpeed: " + (masterData["items"][element].speed + standard.speed) + " (+" + masterData["items"][element].speed + ")";
                                        }
                                    }
                                    fmItems[index] += "\nSlots: " + masterData["items"][element].slots;
                                }
                                else if (masterData["fm"][keys[i]].itemType == "scroll") {
                                    var element = masterData["fm"][keys[i]].itemID;
                                    fmItems[index] += "**__" + (i + 1) + ". " + masterStorage["scrolls"][element].name + "__**⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀";
                                    if (masterStorage["scrolls"][element].maxHP != 0) {
                                        fmItems[index] += "\nMaxHP: " + (masterStorage["scrolls"][element].maxHP);
                                    }
                                    if (masterStorage["scrolls"][element].attack != 0) {
                                        fmItems[index] += "\nAttack: " + (masterStorage["scrolls"][element].attack);
                                    }
                                    if (masterStorage["scrolls"][element].magic != 0) {
                                        fmItems[index] += "\nMagic: " + (masterStorage["scrolls"][element].magic);
                                    }
                                    if (masterStorage["scrolls"][element].defense != 0) {
                                        fmItems[index] += "\nDefense: " + (masterStorage["scrolls"][element].defense);
                                    }
                                    if (masterStorage["scrolls"][element].speed != 0) {
                                        fmItems[index] += "\nSpeed: " + (masterStorage["scrolls"][element].speed);
                                    }
                                    if (masterStorage["scrolls"][element].chaos) {
                                        var rangeMin = (0 - masterStorage["scrolls"][element].badLuck) * masterStorage["scrolls"][element].chaos;
                                        var rangeMax = (3 * 2 * masterStorage["scrolls"][element].chaos) + rangeMin;

                                        fmItems[index] += "\nMin Range: " + rangeMin;
                                        fmItems[index] += "\nMax Range: " + rangeMax;
                                        fmItems[index] += "\nChaotic energy infuses into your equipment, affecting all stats.";
                                    }
                                    if (masterStorage["scrolls"][element].purity) {
                                        if (masterStorage["scrolls"][element].purity == 1)
                                        {
                                            fmItems[index] += "\nPurifies your equipment from the good and the bad.";
                                        }
                                        else if (masterStorage["scrolls"][element].purity == 2)
                                        {
                                            fmItems[index] += "\nPurifies your equipment from the last scroll used.";
                                        }
                                    }
                                }
                                fmItems[index] += "\n\nSeller: " + masterData["userData"][masterData["fm"][keys[i]].ownerID].name;
                                fmItems[index] += "\nPrice: " + masterData["fm"][keys[i]].price.toLocaleString() + " :coin:";
                                fmItems[index] += "\n\n";
                                count++;
                                matches++;
                            }
                        }

                        if (matches == 0)
                        {
                            embedMsg.setTitle('Free Market');
                            embedMsg.setColor('FFF000');
                            embedMsg.setDescription('Nothing found :(');
                            message.channel.send({ embeds: [embedMsg] });
                        }
                        else 
                        {
                            let pages = [];
                            for (let i = 0; i < fmItems.length; i++) {
                                pages.push(fmItems[i]);
                            }

                            let page = 1;
                            embedMsg
                                .setFooter(`Page ${page} of ${pages.length}`)
                                .setDescription(pages[page-1])
                                .setTitle('Free Market')
                                .setColor('FFF000')
                                .setThumbnail("https://www.wikihow.com/images/thumb/b/b2/Be-a-Successful-Merchant-in-Maplestory-Step-8-Version-2.jpg/v4-460px-Be-a-Successful-Merchant-in-Maplestory-Step-8-Version-2.jpg")
                                .setAuthor({ name: masterData["userData"][userid].name, iconURL: person.displayAvatarURL() });

                            message.channel.send({ embeds: [embedMsg] }).then(msg => {
                                msg.react("◀️").then(r => {
                                    msg.react("▶️")

                                    const filter = (reaction, user) => ["◀️", "▶️"].includes(reaction.emoji.name) && user.id === userid;
                                    const collector = msg.createReactionCollector({ filter, time: 1000 * 60 * 120 });

                                    collector.on('collect', r => {
                                        embedMsg.setTitle('Free Market');
                                        embedMsg.setColor('FFF000');
                                        embedMsg.setThumbnail("https://www.wikihow.com/images/thumb/b/b2/Be-a-Successful-Merchant-in-Maplestory-Step-8-Version-2.jpg/v4-460px-Be-a-Successful-Merchant-in-Maplestory-Step-8-Version-2.jpg");
                                        embedMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: person.displayAvatarURL() });
                                        
                                        if (r.emoji.name === "◀️") {
                                            if (page === 1) {
                                                r.users.remove(userid);
                                                return;
                                            }
                                            page--;
                                            embedMsg.setDescription(pages[page-1]);
                                            embedMsg.setFooter(`Page ${page} of ${pages.length}`);
                                            msg.edit({ embeds: [embedMsg] });
                                        }
                                        else if (r.emoji.name === "▶️") {
                                            if (page === pages.length) {
                                                r.users.remove(userid);
                                                return;
                                            }
                                            page++;
                                            embedMsg.setDescription(pages[page-1]);
                                            embedMsg.setFooter(`Page ${page} of ${pages.length}`);
                                            msg.edit({ embeds: [embedMsg] });
                                        }
                                        r.users.remove(userid);
                                    })

                                })
                            });
                        }
                    }
                }
                break;
            case 'listings':
                var fmItems = [""];
                var index = 0;
                var count = 0;
                var matches = 0;
                if (keys.length == 0)
                {
                    embedMsg.setTitle('Free Market');
                    embedMsg.setColor('FFF000');
                    embedMsg.setDescription('Nothing for sale :(');
                    message.channel.send({ embeds: [embedMsg] });
                }
                else
                {
                    for (let i = 0; i < keys.length; i++) {
                        if (count >= 5) {
                            index++;
                            count = 0;
                            fmItems[index] = "";
                        }
                        if (masterData["fm"][keys[i]].ownerID == userid)
                        {
                            if (masterData["fm"][keys[i]].itemType == "equip") 
                            {
                                var element = masterData["fm"][keys[i]].itemID;
                                var standard = masterStorage["equips"][masterData["items"][element].name];
                                var equipType = "";

                                switch (masterData["items"][element].type) {
                                    case 0:
                                        equipType = "Weapon";
                                        break;
                                    case 1:
                                        equipType = "Armor";
                                        break;
                                    case 2:
                                        equipType = "Accessory";
                                        break;
                                }

                                fmItems[index] += "**__" + (i + 1) + ". " + masterData["items"][element].name + "__**⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀"
                                + "\nRarity: " + standard.rarity
                                + "\nType: " + equipType;
                                if (masterData["items"][element].maxHP + standard.maxHP != 0) {
                                    if (masterData["items"][element].maxHP < 0) {
                                        fmItems[index] += "\nMaxHP: " + (masterData["items"][element].maxHP + standard.maxHP) + " (" + masterData["items"][element].maxHP + ")";
                                    }
                                    else {
                                        fmItems[index] += "\nMaxHP: " + (masterData["items"][element].maxHP + standard.maxHP) + " (+" + masterData["items"][element].maxHP + ")";
                                    }
                                }
                                if (masterData["items"][element].attack + standard.attack != 0) {
                                    if (masterData["items"][element].attack < 0) {
                                        fmItems[index] += "\nAttack: " + (masterData["items"][element].attack + standard.attack) + " (" + masterData["items"][element].attack + ")";
                                    }
                                    else {
                                        fmItems[index] += "\nAttack: " + (masterData["items"][element].attack + standard.attack) + " (+" + masterData["items"][element].attack + ")";
                                    }
                                }
                                if (masterData["items"][element].magic + standard.magic != 0) {
                                    if (masterData["items"][element].magic < 0) {
                                        fmItems[index] += "\nMagic: " + (masterData["items"][element].magic + standard.magic) + " (" + masterData["items"][element].magic + ")";
                                    }
                                    else {
                                        fmItems[index] += "\nMagic: " + (masterData["items"][element].magic + standard.magic) + " (+" + masterData["items"][element].magic + ")";
                                    }
                                }
                                if (masterData["items"][element].defense + standard.defense != 0) {
                                    if (masterData["items"][element].defense < 0) {
                                        fmItems[index] += "\nDefense: " + (masterData["items"][element].defense + standard.defense) + " (" + masterData["items"][element].defense + ")";
                                    }
                                    else {
                                        fmItems[index] += "\nDefense: " + (masterData["items"][element].defense + standard.defense) + " (+" + masterData["items"][element].defense + ")";
                                    }
                                }
                                if (masterData["items"][element].speed + standard.speed != 0) {
                                    if (masterData["items"][element].speed < 0) {
                                        fmItems[index] += "\nSpeed: " + (masterData["items"][element].speed + standard.speed) + " (" + masterData["items"][element].speed + ")";
                                    }
                                    else {
                                        fmItems[index] += "\nSpeed: " + (masterData["items"][element].speed + standard.speed) + " (+" + masterData["items"][element].speed + ")";
                                    }
                                }
                                fmItems[index] += "\nSlots: " + masterData["items"][element].slots;
                            }
                            else if (masterData["fm"][keys[i]].itemType == "scroll") {
                                var element = masterData["fm"][keys[i]].itemID;
                                fmItems[index] += "**__" + (i + 1) + ". " + masterStorage["scrolls"][element].name + "__**⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀";
                                if (masterStorage["scrolls"][element].maxHP != 0) {
                                    fmItems[index] += "\nMaxHP: " + (masterStorage["scrolls"][element].maxHP);
                                }
                                if (masterStorage["scrolls"][element].attack != 0) {
                                    fmItems[index] += "\nAttack: " + (masterStorage["scrolls"][element].attack);
                                }
                                if (masterStorage["scrolls"][element].magic != 0) {
                                    fmItems[index] += "\nMagic: " + (masterStorage["scrolls"][element].magic);
                                }
                                if (masterStorage["scrolls"][element].defense != 0) {
                                    fmItems[index] += "\nDefense: " + (masterStorage["scrolls"][element].defense);
                                }
                                if (masterStorage["scrolls"][element].speed != 0) {
                                    fmItems[index] += "\nSpeed: " + (masterStorage["scrolls"][element].speed);
                                }
                                if (masterStorage["scrolls"][element].chaos) {
                                    var rangeMin = (0 - masterStorage["scrolls"][element].badLuck) * masterStorage["scrolls"][element].chaos;
                                    var rangeMax = (3 * 2 * masterStorage["scrolls"][element].chaos) + rangeMin;

                                    fmItems[index] += "\nMin Range: " + rangeMin;
                                    fmItems[index] += "\nMax Range: " + rangeMax;
                                    fmItems[index] += "\nChaotic energy infuses into your equipment, affecting all stats.";
                                }
                                if (masterStorage["scrolls"][element].purity) {
                                    if (masterStorage["scrolls"][element].purity == 1)
                                    {
                                        fmItems[index] += "\nPurifies your equipment from the good and the bad.";
                                    }
                                    else if (masterStorage["scrolls"][element].purity == 2)
                                    {
                                        fmItems[index] += "\nPurifies your equipment from the last scroll used.";
                                    }
                                }
                            }
                            fmItems[index] += "\n\nSeller: " + masterData["userData"][masterData["fm"][keys[i]].ownerID].name;
                            fmItems[index] += "\nPrice: " + masterData["fm"][keys[i]].price.toLocaleString() + " :coin:";
                            fmItems[index] += "\n\n";
                            count++;
                            matches++;
                        }
                    }

                    if (matches == 0)
                    {
                        embedMsg.setTitle('Free Market');
                        embedMsg.setColor('FFF000');
                        embedMsg.setDescription('Nothing found :(');
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else 
                    {
                        let pages = [];
                        for (let i = 0; i < fmItems.length; i++) {
                            pages.push(fmItems[i]);
                        }

                        let page = 1;
                        embedMsg
                            .setFooter(`Page ${page} of ${pages.length}`)
                            .setDescription(pages[page-1])
                            .setTitle('Free Market')
                            .setColor('FFF000')
                            .setThumbnail("https://www.wikihow.com/images/thumb/b/b2/Be-a-Successful-Merchant-in-Maplestory-Step-8-Version-2.jpg/v4-460px-Be-a-Successful-Merchant-in-Maplestory-Step-8-Version-2.jpg")
                            .setAuthor({ name: masterData["userData"][userid].name, iconURL: person.displayAvatarURL() });

                        message.channel.send({ embeds: [embedMsg] }).then(msg => {
                            msg.react("◀️").then(r => {
                                msg.react("▶️")

                                const filter = (reaction, user) => ["◀️", "▶️"].includes(reaction.emoji.name) && user.id === userid;
                                const collector = msg.createReactionCollector({ filter, time: 1000 * 60 * 120 });

                                collector.on('collect', r => {
                                    embedMsg.setTitle('Free Market');
                                    embedMsg.setColor('FFF000');
                                    embedMsg.setThumbnail("https://www.wikihow.com/images/thumb/b/b2/Be-a-Successful-Merchant-in-Maplestory-Step-8-Version-2.jpg/v4-460px-Be-a-Successful-Merchant-in-Maplestory-Step-8-Version-2.jpg");
                                    embedMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: person.displayAvatarURL() });
                                    
                                    if (r.emoji.name === "◀️") {
                                        if (page === 1) {
                                            r.users.remove(userid);
                                            return;
                                        }
                                        page--;
                                        embedMsg.setDescription(pages[page-1]);
                                        embedMsg.setFooter(`Page ${page} of ${pages.length}`);
                                        msg.edit({ embeds: [embedMsg] });
                                    }
                                    else if (r.emoji.name === "▶️") {
                                        if (page === pages.length) {
                                            r.users.remove(userid);
                                            return;
                                        }
                                        page++;
                                        embedMsg.setDescription(pages[page-1]);
                                        embedMsg.setFooter(`Page ${page} of ${pages.length}`);
                                        msg.edit({ embeds: [embedMsg] });
                                    }
                                    r.users.remove(userid);
                                })

                            })
                        });
                    }
                }
                break;
            default:
                var fmItems = [""];
                var index = 0;
                var count = 0;
                if (keys.length == 0)
                {
                    embedMsg.setTitle('Free Market');
                    embedMsg.setColor('FFF000');
                    embedMsg.setDescription('Nothing for sale :(');
                    message.channel.send({ embeds: [embedMsg] });
                }
                else
                {
                    for (let i = 0; i < keys.length; i++) {
                        if (count >= 5) {
                            index++;
                            count = 0;
                            fmItems[index] = "";
                        }
                        if (masterData["fm"][keys[i]].itemType == "equip") 
                        {
                            var element = masterData["fm"][keys[i]].itemID;
                            var standard = masterStorage["equips"][masterData["items"][element].name];
                            var equipType = "";

                            switch (masterData["items"][element].type) {
                                case 0:
                                    equipType = "Weapon";
                                    break;
                                case 1:
                                    equipType = "Armor";
                                    break;
                                case 2:
                                    equipType = "Accessory";
                                    break;
                            }

                            fmItems[index] += "**__" + (i + 1) + ". " + masterData["items"][element].name + "__**⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀"
                            + "\nRarity: " + standard.rarity
                            + "\nType: " + equipType;
                            if (masterData["items"][element].maxHP + standard.maxHP != 0) {
                                if (masterData["items"][element].maxHP < 0) {
                                    fmItems[index] += "\nMaxHP: " + (masterData["items"][element].maxHP + standard.maxHP) + " (" + masterData["items"][element].maxHP + ")";
                                }
                                else {
                                    fmItems[index] += "\nMaxHP: " + (masterData["items"][element].maxHP + standard.maxHP) + " (+" + masterData["items"][element].maxHP + ")";
                                }
                            }
                            if (masterData["items"][element].attack + standard.attack != 0) {
                                if (masterData["items"][element].attack < 0) {
                                    fmItems[index] += "\nAttack: " + (masterData["items"][element].attack + standard.attack) + " (" + masterData["items"][element].attack + ")";
                                }
                                else {
                                    fmItems[index] += "\nAttack: " + (masterData["items"][element].attack + standard.attack) + " (+" + masterData["items"][element].attack + ")";
                                }
                            }
                            if (masterData["items"][element].magic + standard.magic != 0) {
                                if (masterData["items"][element].magic < 0) {
                                    fmItems[index] += "\nMagic: " + (masterData["items"][element].magic + standard.magic) + " (" + masterData["items"][element].magic + ")";
                                }
                                else {
                                    fmItems[index] += "\nMagic: " + (masterData["items"][element].magic + standard.magic) + " (+" + masterData["items"][element].magic + ")";
                                }
                            }
                            if (masterData["items"][element].defense + standard.defense != 0) {
                                if (masterData["items"][element].defense < 0) {
                                    fmItems[index] += "\nDefense: " + (masterData["items"][element].defense + standard.defense) + " (" + masterData["items"][element].defense + ")";
                                }
                                else {
                                    fmItems[index] += "\nDefense: " + (masterData["items"][element].defense + standard.defense) + " (+" + masterData["items"][element].defense + ")";
                                }
                            }
                            if (masterData["items"][element].speed + standard.speed != 0) {
                                if (masterData["items"][element].speed < 0) {
                                    fmItems[index] += "\nSpeed: " + (masterData["items"][element].speed + standard.speed) + " (" + masterData["items"][element].speed + ")";
                                }
                                else {
                                    fmItems[index] += "\nSpeed: " + (masterData["items"][element].speed + standard.speed) + " (+" + masterData["items"][element].speed + ")";
                                }
                            }
                            fmItems[index] += "\nSlots: " + masterData["items"][element].slots;
                        }
                        else if (masterData["fm"][keys[i]].itemType == "scroll") {
                            var element = masterData["fm"][keys[i]].itemID;
                            fmItems[index] += "**__" + (i + 1) + ". " + masterStorage["scrolls"][element].name + "__**⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀";
                            if (masterStorage["scrolls"][element].maxHP != 0) {
                                fmItems[index] += "\nMaxHP: " + (masterStorage["scrolls"][element].maxHP);
                            }
                            if (masterStorage["scrolls"][element].attack != 0) {
                                fmItems[index] += "\nAttack: " + (masterStorage["scrolls"][element].attack);
                            }
                            if (masterStorage["scrolls"][element].magic != 0) {
                                fmItems[index] += "\nMagic: " + (masterStorage["scrolls"][element].magic);
                            }
                            if (masterStorage["scrolls"][element].defense != 0) {
                                fmItems[index] += "\nDefense: " + (masterStorage["scrolls"][element].defense);
                            }
                            if (masterStorage["scrolls"][element].speed != 0) {
                                fmItems[index] += "\nSpeed: " + (masterStorage["scrolls"][element].speed);
                            }
                            if (masterStorage["scrolls"][element].chaos) {
                                var rangeMin = (0 - masterStorage["scrolls"][element].badLuck) * masterStorage["scrolls"][element].chaos;
                                var rangeMax = (3 * 2 * masterStorage["scrolls"][element].chaos) + rangeMin;

                                fmItems[index] += "\nMin Range: " + rangeMin;
                                fmItems[index] += "\nMax Range: " + rangeMax;
                                fmItems[index] += "\nChaotic energy infuses into your equipment, affecting all stats.";
                            }
                            if (masterStorage["scrolls"][element].purity) {
                                if (masterStorage["scrolls"][element].purity == 1)
                                {
                                    fmItems[index] += "\nPurifies your equipment from the good and the bad.";
                                }
                                else if (masterStorage["scrolls"][element].purity == 2)
                                {
                                    fmItems[index] += "\nPurifies your equipment from the last scroll used.";
                                }
                            }
                        }
                        fmItems[index] += "\n\nSeller: " + masterData["userData"][masterData["fm"][keys[i]].ownerID].name;
                        fmItems[index] += "\nPrice: " + masterData["fm"][keys[i]].price.toLocaleString() + " :coin:";
                        fmItems[index] += "\n\n";
                        count++;
                    }

                    let pages = [];
                    for (let i = 0; i < fmItems.length; i++) {
                        pages.push(fmItems[i]);
                    }

                    let page = 1;

                    embedMsg
                        .setFooter(`Page ${page} of ${pages.length}`)
                        .setDescription(pages[page-1])
                        .setTitle('Free Market')
                        .setColor('FFF000')
                        .setThumbnail("https://www.wikihow.com/images/thumb/b/b2/Be-a-Successful-Merchant-in-Maplestory-Step-8-Version-2.jpg/v4-460px-Be-a-Successful-Merchant-in-Maplestory-Step-8-Version-2.jpg")
                        .setAuthor({ name: masterData["userData"][userid].name, iconURL: person.displayAvatarURL() });

                    message.channel.send({ embeds: [embedMsg] }).then(msg => {
                        msg.react("◀️").then(r => {
                            msg.react("▶️")

                            const filter = (reaction, user) => ["◀️", "▶️"].includes(reaction.emoji.name) && user.id === userid;
                            const collector = msg.createReactionCollector({ filter, time: 1000 * 60 * 120 });

                            collector.on('collect', r => {
                                embedMsg.setTitle('Free Market');
                                embedMsg.setColor('FFF000');
                                embedMsg.setThumbnail("https://www.wikihow.com/images/thumb/b/b2/Be-a-Successful-Merchant-in-Maplestory-Step-8-Version-2.jpg/v4-460px-Be-a-Successful-Merchant-in-Maplestory-Step-8-Version-2.jpg");
                                embedMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: person.displayAvatarURL() });
                                
                                if (r.emoji.name === "◀️") {
                                    if (page === 1) {
                                        r.users.remove(userid);
                                        return;
                                    }
                                    page--;
                                    embedMsg.setDescription(pages[page-1]);
                                    embedMsg.setFooter(`Page ${page} of ${pages.length}`);
                                    msg.edit({ embeds: [embedMsg] });
                                }
                                else if (r.emoji.name === "▶️") {
                                    if (page === pages.length) {
                                        r.users.remove(userid);
                                        return;
                                    }
                                    page++;
                                    embedMsg.setDescription(pages[page-1]);
                                    embedMsg.setFooter(`Page ${page} of ${pages.length}`);
                                    msg.edit({ embeds: [embedMsg] });
                                }
                                r.users.remove(userid);
                            })

                        })
                    });
                }
                break;
        }
    }
}
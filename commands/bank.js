module.exports = {
    name: 'bank',
    description: "A way to prevent you guys from losing all your money from gambling. Start with **__!tp bank help__**.",

    execute(message, args, userid, masterData, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        var command = args[0];

        let updateBank = (id) => {
            var newDate = new Date();
            var timeDiff = newDate.getTime() - masterData["userData"][id].bankTick;
            var tickTime = 1000 * 60 * 60;

            if (timeDiff >= tickTime) {
                var totalTicks = Math.floor(timeDiff / tickTime);
                for (let i = 0; i < totalTicks; i++) {
                    var addBalance = 0;
                    var currentBalance = 0;
                    if (masterData["userData"][id].married != "" && masterData["userData"][masterData["userData"][id].married]) {
                        currentBalance = masterData["userData"][id].bank + Math.floor(masterData["userData"][masterData["userData"][id].married].bank / 2);
                    }
                    else {
                        currentBalance = masterData["userData"][id].bank;
                    }
    
                    addBalance = Math.floor(currentBalance * 0.005 * Math.random() * Math.random() * Math.random());

                    masterData["userData"][id].bank += addBalance;
                }

                masterData["userData"][id].bankTick = newDate.getTime() - (timeDiff % tickTime);
            }

            if (masterData["userData"][id].married != "" && masterData["userData"][masterData["userData"][id].married]) {
                var spouseTimeDiff = newDate.getTime() - masterData["userData"][masterData["userData"][id].married].bankTick
                if (spouseTimeDiff >= tickTime) {
                    var totalTicks = Math.floor(timeDiff / tickTime);
                    for (let i = 0; i < totalTicks; i++) {
                        var addBalance = 0;
                        var currentBalance = masterData["userData"][id].bank + Math.floor(masterData["userData"][masterData["userData"][id].married].bank / 2);
        
                        addBalance = Math.floor(currentBalance * 0.005 * Math.random() * Math.random() * Math.random());

                        masterData["userData"][masterData["userData"][id].married].bank += addBalance;
                    }

                    masterData["userData"][masterData["userData"][id].married].bankTick = newDate.getTime() - (timeDiff % tickTime);
                }
            }
        }

        updateBank(userid);

        switch(command) {
            case 'help':
                const bankCommands = new Map();
                bankCommands.set('help', 'Displays list of bank commands.');
                bankCommands.set('deposit #', 'Store # amount of points into bank.');
                bankCommands.set('deposit all', 'Store all of your points into bank.');
                bankCommands.set('withdraw #', 'Withdraw # amount of points from bank.');
                bankCommands.set('withdraw all', 'Withdraw all of your points from bank.');

                embedMsg.setTitle('List of Bank Commands');
                embedMsg.setColor('FFF000');

                bankCommands.forEach((values, keys)=> {
                    embedMsg.addField("!tp bank " + keys, values);
                });

                message.channel.send({ embeds: [embedMsg] });
                break;
            case 'deposit':
                if (args.length < 2) {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription('Please enter amount to deposit!');
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    var target = client.users.cache.get(userid);
                    embedMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: target.displayAvatarURL() });
                    embedMsg.setThumbnail("https://i.imgur.com/jxuwNmo.png");

                    var amount;
                    if (args[1] == "all")
                    {
                        amount = masterData["userData"][userid].points;
                    }
                    else
                    {
                        amount = Math.floor(Number(args[1]));
                    }
                    
                    if (!isNaN(amount)) {
                        if (masterData["userData"][userid].points >= amount && amount > 0) {

                            var newDate = new Date();

                            masterData["userData"][userid].points -= amount;
                            masterData["userData"][userid].bank += amount;
                            
                            masterData["userData"][userid].bankTick = newDate.getTime();

                            if (masterData["userData"][userid].married != "" && masterData["userData"][masterData["userData"][userid].married]) {
                                masterData["userData"][masterData["userData"][userid].married].bankTick = newDate.getTime();
                            }

                            embedMsg.setTitle('Success!');
                            embedMsg.setColor('00FF00');
                            embedMsg.setDescription(masterData["userData"][userid].name + " deposited " + amount.toLocaleString() + " point(s) into the bank!");
                            message.channel.send({ embeds: [embedMsg] });
                        }
                        else {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription(masterData["userData"][userid].name + " does not have " + amount.toLocaleString() + " point(s)!");
                            embedMsg.setFooter("Maybe you would have enough if you stopped spamming blackjack.");
                            message.channel.send({ embeds: [embedMsg] });
                        }
                    }
                    else {
                        embedMsg.setTitle('Error!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription('Please enter a valid amount!');
                        message.channel.send({ embeds: [embedMsg] });
                    }
                }
                break;
            case 'withdraw':
                if (args.length < 2) {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription('Please enter amount to withdraw!');
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    var target = client.users.cache.get(userid);
                    embedMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: target.displayAvatarURL() });
                    embedMsg.setThumbnail("https://i.imgur.com/jxuwNmo.png");

                    var amount;
                    if (args[1] == "all")
                    {
                        amount = masterData["userData"][userid].bank;
                    }
                    else
                    {
                        amount = Math.floor(Number(args[1]));
                    }

                    if (!isNaN(amount)) {
                        if (masterData["userData"][userid].bank >= amount && amount > 0) {

                            var newDate = new Date();

                            masterData["userData"][userid].bank -= amount;
                            masterData["userData"][userid].points += amount;
                            masterData["userData"][userid].bankTick = newDate.getTime();

                            if (masterData["userData"][userid].married != "" && masterData["userData"][masterData["userData"][userid].married]) {
                                masterData["userData"][masterData["userData"][userid].married].bankTick = newDate.getTime();
                            }

                            embedMsg.setTitle('Success!');
                            embedMsg.setColor('00FF00');
                            embedMsg.setDescription(masterData["userData"][userid].name + " withdrew " + amount.toLocaleString() + " point(s) from the bank!");
                            message.channel.send({ embeds: [embedMsg] });
                        }
                        else {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription(masterData["userData"][userid].name + " does not have " + amount.toLocaleString() + " point(s) in the bank!");
                            embedMsg.setFooter("Maybe you would have enough if you stopped spamming blackjack.");
                            message.channel.send({ embeds: [embedMsg] });
                        }
                    }
                    else {
                        embedMsg.setTitle('Error!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription('Please enter a valid amount!');
                        message.channel.send({ embeds: [embedMsg] });
                    }
                }
                break;
            default:
                var target = client.users.cache.get(userid);
                embedMsg.setAuthor({ name: masterData["userData"][userid].name, iconURL: target.displayAvatarURL() });
                embedMsg.setThumbnail("https://i.imgur.com/jxuwNmo.png");
                embedMsg.setColor('FFF000');
                embedMsg.setFooter('Bank tick resets on withdraw and deposit from either you or your spouse.');

                embedMsg.addField("__Bank:__  :coin: ⠀⠀⠀⠀", "" + masterData["userData"][userid].bank.toLocaleString() + "\n", true);

                if (masterData["userData"][userid].married != "" && masterData["userData"][masterData["userData"][userid].married]) {
                    embedMsg.addField("__Spouse's Bank:__  :couple: ⠀⠀", masterData["userData"][masterData["userData"][userid].married].bank.toLocaleString() + "\n", true);
                }
                else {
                    embedMsg.addField("__Spouse's Bank:__  :couple: ⠀⠀",  "*Not Married*\n", true);
                }

                var newDate = new Date();
                var timeDiff = newDate.getTime() - masterData["userData"][userid].bankTick;
                var tickTime = 1000 * 60 * 60;

                if (timeDiff < tickTime && ((masterData["userData"][userid].bank != 0) || (masterData["userData"][userid].married != "" && masterData["userData"][masterData["userData"][userid].married] && (masterData["userData"][masterData["userData"][userid].married].bank != 0)))) {
                    var hours = Math.floor((tickTime - timeDiff) / (1000 * 60 * 60));
                    var min = Math.floor(((tickTime - timeDiff) % (1000 * 60 * 60)) / (1000 * 60));
                    var sec = Math.floor(((tickTime - timeDiff) % (1000 * 60 * 60)) % (1000 * 60) / (1000));
                    if (hours < 10) {
                        hours = "0" + hours.toString();
                    }
                    if (min < 10) {
                        min = "0" + min.toString();
                    }
                    if (sec < 10) {
                        sec = "0" + sec.toString();
                    }
                    embedMsg.addField("__Next Tick:__  :alarm_clock: ⠀⠀⠀⠀⠀", hours + ":" + min + ":" + sec, false);
                }
                else {
                    embedMsg.addField("__Next Tick:__  :alarm_clock: ⠀⠀⠀⠀⠀", "00:00:00", false);
                }

                message.channel.send({ embeds: [embedMsg] });
                break;
        }
    }
}
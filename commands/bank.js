module.exports = {
    name: 'bank',
    description: "A way to prevent you guys from losing all your money from gambling.",

    execute(message, args, userid, userData, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        var command = args[0];

        let updateBank = () => {
            var newDate = new Date();
            var timeDiff = newDate.getTime() - userData[userid].bankTick;
            var tickTime = 1000 * 60 * 30;

            if (timeDiff >= tickTime) {
                var totalTicks = Math.floor(timeDiff / tickTime);
                for (let i = 0; i < totalTicks; i++) {
                    var addBalance = 0;
                    var currentBalance = 0;
                    if (userData[userid].married != "" && userData[userData[userid].married]) {
                        currentBalance = userData[userid].bank + userData[userData[userid].married].bank;
                    }
                    else {
                        currentBalance = userData[userid].bank;
                    }
    
                    for (let j = 0; j < currentBalance; j++) {
                        var luck = Math.floor((Math.random() * 1000) + 1);
                        var chance = 100 * 0.01;
                        if (luck <= chance) {
                            addBalance++;
                        }
                    }

                    userData[userid].bank += addBalance;
                }

                userData[userid].bankTick = newDate.getTime() - (timeDiff % tickTime);
            }
        }

        updateBank();

        switch(command) {
            case 'help':
                const bankCommands = new Map();
                bankCommands.set('help', 'Displays list of bank commands.');
                bankCommands.set('info', 'Displays bank info.');
                bankCommands.set('deposit', 'Store into bank.');
                bankCommands.set('withdraw', 'Withdraw from bank.');

                embedMsg.setTitle('List of Bank Commands');
                embedMsg.setColor('FFF000');

                bankCommands.forEach((values, keys)=> {
                    embedMsg.addField("!tp bank " + keys, values);
                });

                message.channel.send({ embeds: [embedMsg] });
                break;
            case 'info':
                var target = client.users.cache.get(userid);
                embedMsg.setAuthor({ name: userData[userid].name, iconURL: target.displayAvatarURL() });
                embedMsg.setThumbnail("https://i.imgur.com/jxuwNmo.png");
                embedMsg.setColor('FFF000');
                embedMsg.setFooter('Bank tick resets on withdraw and deposit from either you or your spouse.');

                embedMsg.addField("__Bank:__  :coin: ⠀⠀⠀⠀", "" + userData[userid].bank + "\n", true);

                if (userData[userid].married != "" && userData[userData[userid].married]) {
                    embedMsg.addField("__Spouse's Bank:__  :couple: ⠀⠀", userData[userData[userid].married].bank + "\n", true);
                }
                else {
                    embedMsg.addField("__Spouse's Bank:__  :couple: ⠀⠀",  "*Not Married*\n", true);
                }

                var newDate = new Date();
                var timeDiff = newDate.getTime() - userData[userid].bankTick;
                var tickTime = 1000 * 60 * 30;

                if (timeDiff < tickTime && ((userData[userid].bank != 0) || (userData[userid].married != "" && userData[userData[userid].married] && (userData[userData[userid].married].bank != 0)))) {
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
            case 'deposit':
                if (args.length < 2) {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription('Please enter amount to deposit!');
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    var target = client.users.cache.get(userid);
                    embedMsg.setAuthor({ name: userData[userid].name, iconURL: target.displayAvatarURL() });
                    embedMsg.setThumbnail("https://i.imgur.com/jxuwNmo.png");

                    var amount = Math.floor(Number(args[1]));
                    if (!isNaN(amount)) {
                        if (userData[userid].points >= amount && amount > 0) {

                            var newDate = new Date();

                            userData[userid].points -= amount;
                            userData[userid].bank += amount;
                            
                            userData[userid].bankTick = newDate.getTime();

                            if (userData[userid].married != "" && userData[userData[userid].married]) {
                                userData[userData[userid].married].bankTick = newDate.getTime();
                            }

                            embedMsg.setTitle('Success!');
                            embedMsg.setColor('00FF00');
                            embedMsg.setDescription(userData[userid].name + " deposited " + amount + " point(s) into the bank!");
                            message.channel.send({ embeds: [embedMsg] });
                        }
                        else {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription(userData[userid].name + " does not have " + amount + " point(s)!");
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
                    embedMsg.setAuthor({ name: userData[userid].name, iconURL: target.displayAvatarURL() });
                    embedMsg.setThumbnail("https://i.imgur.com/jxuwNmo.png");

                    var amount = Math.floor(Number(args[1]));
                    if (!isNaN(amount)) {
                        if (userData[userid].bank >= amount && amount > 0) {

                            var newDate = new Date();

                            userData[userid].bank -= amount;
                            userData[userid].points += amount;
                            userData[userid].bankTick = newDate.getTime();

                            if (userData[userid].married != "" && userData[userData[userid].married]) {
                                userData[userData[userid].married].bankTick = newDate.getTime();
                            }

                            embedMsg.setTitle('Success!');
                            embedMsg.setColor('00FF00');
                            embedMsg.setDescription(userData[userid].name + " withdrew " + amount + " point(s) from the bank!");
                            message.channel.send({ embeds: [embedMsg] });
                        }
                        else {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription(userData[userid].name + " does not have " + amount + " point(s) in the bank!");
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
                embedMsg.setTitle("Invalid bank command!");
                embedMsg.setColor('FF0000');
                embedMsg.setDescription('Use __!tp bank help__ for list of bank commands!');
                embedMsg.setThumbnail("https://4.bp.blogspot.com/-DV8zj3oNPO8/XZKl8Y1_KkI/AAAAAAAMsvI/HEq47t0TPmYhX0b2igMkkxbcPQPbUXR2gCLcBGAsYHQ/s1600/AS0005827_02.gif");
                message.channel.send({ embeds: [embedMsg] });
                break;
        }
    }
}
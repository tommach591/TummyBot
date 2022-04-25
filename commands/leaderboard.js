module.exports = {
    name: 'leaderboard',
    description: "Display the rankings.",

    execute(message, args, userid, userData, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        let updateBalance = (id) =>
        {
            var newTime = new Date();
            if (userData[id]) {
                var timeDiff = newTime.getTime() - userData[id].incomeTime;
                var incomeCD = 1000 * 60; // 1min
                var income = 1;
                switch (userData[id].income) {
                    case 1:
                        income = 1;
                        break;
                    case 2:
                        income = 2;
                        break;
                    case 3:
                        income = 3;
                        break;
                    case 4:
                        income = 25;
                        break;
                    case 5:
                        income = 250;
                        break;
                    case 6:
                        income = 500000;
                        break;
                }
                if (timeDiff >= incomeCD) {
                    userData[id].points += Math.floor(timeDiff / incomeCD) * income;
                    userData[id].incomeTime = newTime.getTime() - (timeDiff % incomeCD);
                }
            }
        }

        let updateBank = (id) => {
            var newDate = new Date();
            var timeDiff = newDate.getTime() - userData[id].bankTick;
            var tickTime = 1000 * 60 * 60;

            if (timeDiff >= tickTime) {
                var totalTicks = Math.floor(timeDiff / tickTime);
                for (let i = 0; i < totalTicks; i++) {
                    var addBalance = 0;
                    var currentBalance = 0;
                    if (userData[id].married != "" && userData[userData[id].married]) {
                        currentBalance = userData[id].bank + Math.floor(userData[userData[id].married].bank / 2);
                    }
                    else {
                        currentBalance = userData[id].bank;
                    }
    
                    addBalance = Math.floor(currentBalance * 0.01 * Math.random() * Math.random() * Math.random());

                    userData[id].bank += addBalance;
                }

                userData[id].bankTick = newDate.getTime() - (timeDiff % tickTime);
            }

            if (userData[id].married != "" && userData[userData[id].married]) {
                var spouseTimeDiff = newDate.getTime() - userData[userData[id].married].bankTick
                if (spouseTimeDiff >= tickTime) {
                    var totalTicks = Math.floor(timeDiff / tickTime);
                    for (let i = 0; i < totalTicks; i++) {
                        var addBalance = 0;
                        var currentBalance = userData[id].bank + Math.floor(userData[userData[id].married].bank / 2);
        
                        addBalance = Math.floor(currentBalance * 0.01 * Math.random() * Math.random() * Math.random());

                        userData[userData[id].married].bank += addBalance;
                    }

                    userData[userData[id].married].bankTick = newDate.getTime() - (timeDiff % tickTime);
                }
            }
        }

        var keys = [];
        for (var k in userData) {
            updateBalance(k);
            updateBank(k);
            keys.push(k);
        }

        keys.sort((firstEl, secondEl) => { 
            if (userData[firstEl].points + userData[firstEl].bank > userData[secondEl].points + userData[secondEl].bank) {
                return -1;
            }
            if (userData[firstEl].points + userData[firstEl].bank < userData[secondEl].points + userData[secondEl].bank) {
                return 1;
            }
            return 0;
        });

        var names = [""];
        var points = [""];
        var ranks = [""];

        var index = 0;
        var count = 0;

        for (var i = 0; i < keys.length; i++) {
            if (count >= 20) {
                count = 0;
                index++;
                names[index] = "";
                points[index] = "";
                ranks[index] = "";
            }

            names[index] += userData[keys[i]].name + "⠀⠀⠀\n";
            points[index] += (userData[keys[i]].points + userData[keys[i]].bank).toLocaleString() + "⠀⠀⠀\n";
            ranks[index] += "" + (i + 1) + ".⠀⠀⠀\n";
            count++;
        }

        let page = 1;

        embedMsg
        .setTitle("**__The Leaderboard__**")
        .setThumbnail('https://media3.giphy.com/media/LAWN8PxCVRPqBAW8D4/giphy.gif')
        .setColor('FFF000')
        .setFooter(`Page ${page} of ${ranks.length}`)
        .setFields(
            {name: "**__Rank__**⠀⠀⠀⠀", value: ranks[page-1], inline: true},
            {name: "**__Player__**⠀⠀⠀⠀⠀", value: names[page-1], inline: true},
            {name: "**__Points__**⠀⠀⠀⠀", value: points[page-1], inline: true}
        )

        message.channel.send({ embeds: [embedMsg] }).then(msg => {
            msg.react("◀️").then(r => {
                msg.react("▶️")

                const filter = (reaction, user) => ["◀️", "▶️"].includes(reaction.emoji.name) && user.id === userid;
                const collector = msg.createReactionCollector({ filter, time: 1000 * 60 * 5 });

                collector.on('collect', r => {
                    embedMsg.setTitle("**__The Leaderboard__**")
                    embedMsg.setThumbnail('https://media3.giphy.com/media/LAWN8PxCVRPqBAW8D4/giphy.gif')
                    embedMsg.setColor('FFF000')
                    
                    if (r.emoji.name === "◀️") {
                        if (page === 1) {
                            r.users.remove(userid);
                            return;
                        }
                        page--;
                        embedMsg.setFooter(`Page ${page} of ${ranks.length}`);
                        embedMsg.setFields(
                            {name: "**__Rank__**", value: ranks[page-1], inline: true},
                            {name: "**__Player__**", value: names[page-1], inline: true},
                            {name: "**__Points__**", value: points[page-1], inline: true}
                        )
                        msg.edit({ embeds: [embedMsg] });
                    }
                    else if (r.emoji.name === "▶️") {
                        if (page === ranks.length) {
                            r.users.remove(userid);
                            return;
                        }
                        page++;
                        embedMsg.setFooter(`Page ${page} of ${ranks.length}`);
                        embedMsg.setFields(
                            {name: "**__Rank__**", value: ranks[page-1], inline: true},
                            {name: "**__Player__**", value: names[page-1], inline: true},
                            {name: "**__Points__**", value: points[page-1], inline: true}
                        )
                        msg.edit({ embeds: [embedMsg] });
                    }
                    r.users.remove(userid);
                })

            })
        });
    }
}
module.exports = {
    name: 'leaderboard',
    description: "Display the point rankings of all players.",

    execute(message, userid, masterData) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        let updateBalance = (id) =>
        {
            var newTime = new Date();
            if (masterData["userData"][id]) {
                var timeDiff = newTime.getTime() - masterData["userData"][id].incomeTime;
                var incomeCD = 1000 * 60; // 1min
                var income = 1;
                switch (masterData["userData"][id].income) {
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
                    masterData["userData"][id].points += Math.floor(timeDiff / incomeCD) * income;
                    masterData["userData"][id].incomeTime = newTime.getTime() - (timeDiff % incomeCD);
                }
            }
        }

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

        var keys = [];
        for (var k in masterData["userData"]) {
            updateBalance(k);
            updateBank(k);
            keys.push(k);
        }

        keys.sort((firstEl, secondEl) => { 
            if (masterData["userData"][firstEl].points + masterData["userData"][firstEl].bank > masterData["userData"][secondEl].points + masterData["userData"][secondEl].bank) {
                return -1;
            }
            if (masterData["userData"][firstEl].points + masterData["userData"][firstEl].bank < masterData["userData"][secondEl].points + masterData["userData"][secondEl].bank) {
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

            names[index] += masterData["userData"][keys[i]].name + "⠀⠀⠀\n";
            points[index] += (masterData["userData"][keys[i]].points + masterData["userData"][keys[i]].bank).toLocaleString() + "⠀⠀⠀\n";
            ranks[index] += "" + (i + 1) + ".⠀⠀⠀\n";
            count++;
        }

        let page = 1;

        embedMsg
        .setTitle("**__The Leaderboard__**")
        .setThumbnail('https://media0.giphy.com/media/TNb3Ihssb6T5FpcdOY/giphy.gif')
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
                    embedMsg.setThumbnail('https://media0.giphy.com/media/TNb3Ihssb6T5FpcdOY/giphy.gif')
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
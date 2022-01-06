module.exports = {
    name: 'leaderboard',
    description: "Display the rankings.",

    execute(message, args, userid, userData, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        var keys = [];
        for (var k in userData) {
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

            names[index] += userData[keys[i]].name + "\n";
            points[index] += (userData[keys[i]].points + userData[keys[i]].bank) + "⠀⠀⠀\n";
            ranks[index] += "" + (i + 1) + ".\n";
            count++;
        }

        let page = 1;

        embedMsg
        .setTitle("**__The Leaderboard__**")
        .setThumbnail('https://media3.giphy.com/media/LAWN8PxCVRPqBAW8D4/giphy.gif')
        .setColor('FFF000')
        .setFooter(`Page ${page} of ${ranks.length}`)
        .setFields(
            {name: "**__Rank__**", value: ranks[page-1], inline: true},
            {name: "**__Player__**", value: names[page-1], inline: true},
            {name: "**__Points__**", value: points[page-1], inline: true}
        )

        message.channel.send({ embeds: [embedMsg] }).then(msg => {
            msg.react("◀️").then(r => {
                msg.react("▶️")

                const filter = (reaction, user) => ["◀️", "▶️"].includes(reaction.emoji.name) && user.id === userid;
                const collector = msg.createReactionCollector({ filter, time: 1000 * 30 });

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
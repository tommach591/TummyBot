module.exports = {
    name: 'level',
    description: "Spend points to increase income.",

    execute(message, args, userid, userData, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        var curr = userData[userid].income;
        
        switch(curr) {
            case 1:
                if (userData[userid].points < 10000) {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription("Next level costs 10000 points!");
                    embedMsg.setThumbnail('https://c.tenor.com/E05L3qlURd0AAAAd/no-money-broke.gif');
                    embedMsg.setFooter('Try grinding at Pig Beach!');
                }
                else {
                    userData[userid].points -= 10000;
                    userData[userid].income = 2;
                    embedMsg.setTitle('Congratz!');
                    embedMsg.setColor('00FF00');
                    embedMsg.setDescription(userData[userid].name + " leveled up to 2!");
                    embedMsg.setThumbnail('https://i.imgur.com/OKCWdNy.png');
                    embedMsg.setFooter('Next level: 100000 points');
                }
                message.channel.send({ embeds: [embedMsg] });
                break;
            case 2:
                if (userData[userid].points < 100000) {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription("Next level costs 100000 points!");
                    embedMsg.setThumbnail('https://c.tenor.com/E05L3qlURd0AAAAd/no-money-broke.gif');
                    embedMsg.setFooter('Try grinding at Pig Beach!');
                }
                else {
                    userData[userid].points -= 100000;
                    userData[userid].income = 3;
                    embedMsg.setTitle('Congratz!');
                    embedMsg.setColor('00FF00');
                    embedMsg.setDescription(userData[userid].name + " leveled up to 3!");
                    embedMsg.setThumbnail('https://i.imgur.com/OKCWdNy.png');
                    embedMsg.setFooter('Next level: 1000000 points');
                }
                message.channel.send({ embeds: [embedMsg] });
                break;
            case 3:
                if (userData[userid].points < 1000000) {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription("Next level costs 1000000 points!");
                    embedMsg.setThumbnail('https://c.tenor.com/E05L3qlURd0AAAAd/no-money-broke.gif');
                    embedMsg.setFooter('Try grinding at Pig Beach!');
                }
                else {
                    userData[userid].points -= 1000000;
                    userData[userid].income = 4;
                    embedMsg.setTitle('Congratz!');
                    embedMsg.setColor('00FF00');
                    embedMsg.setDescription(userData[userid].name + " leveled up to 4!");
                    embedMsg.setThumbnail('https://i.imgur.com/OKCWdNy.png');
                    embedMsg.setFooter('Next level: 10000000 points');
                }
                message.channel.send({ embeds: [embedMsg] });
                break;
            case 4:
                if (userData[userid].points < 10000000) {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription("Next level costs 10000000 points!");
                    embedMsg.setThumbnail('https://c.tenor.com/E05L3qlURd0AAAAd/no-money-broke.gif');
                    embedMsg.setFooter('Try grinding at Pig Beach!');
                }
                else {
                    userData[userid].points -= 10000000;
                    userData[userid].income = 5;
                    embedMsg.setTitle('Congratz!');
                    embedMsg.setColor('00FF00');
                    embedMsg.setDescription(userData[userid].name + " leveled up to 5! You are now maxed level!");
                    embedMsg.setThumbnail('https://i.imgur.com/OKCWdNy.png');
                    embedMsg.setFooter('Next level: Infinite points');
                }
                message.channel.send({ embeds: [embedMsg] });
                break;
            default:
                embedMsg.setTitle('Congratz!');
                embedMsg.setColor('00FF00');
                embedMsg.setDescription(userData[userid].name + " you are already maxed level!");
                embedMsg.setThumbnail('https://media2.giphy.com/media/xT9IgC2RzpbE7vBZ6M/giphy.gif');
                embedMsg.setFooter('Next level: Infinite points');
                break;
        }
    }
}

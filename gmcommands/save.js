module.exports = {
    name: 'save',
    description: "Save files.",

    execute(message, args, userid, userData, userFish, userGarden, client, s3, userDataParams, userFishParams, userGardenParams) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        s3.putObject({
            Bucket: config.bucket,
            Key: userDataParams.Key,
            Body: JSON.stringify(userData),
            ContentType: "application/json"},
            function (err, data) {
                if (err) {
                    console.log(JSON.stringify(err));
                }
            }
        );
        s3.putObject({
            Bucket: config.bucket,
            Key: userFishParams.Key,
            Body: JSON.stringify(userFish),
            ContentType: "application/json"},
            function (err, data) {
                if (err) {
                    console.log(JSON.stringify(err));
                }
            }
        );
        s3.putObject({
            Bucket: config.bucket,
            Key: userGardenParams.Key,
            Body: JSON.stringify(userGarden),
            ContentType: "application/json"},
            function (err, data) {
                if (err) {
                    console.log(JSON.stringify(err));
                }
            }
        );

        embedMsg.setTitle('Saved!');
        embedMsg.setColor('FF0000');
        embedMsg.setDescription('Files have been saved!');
        message.channel.send({ embeds: [embedMsg] });
    }
}
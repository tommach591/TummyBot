module.exports = {
    name: 'save',
    description: "Save files.",

    execute(userData, userFish, userGarden, userHunt, items, userPet, config, savefile, s3, userDataParams, userFishParams, userGardenParams, userHuntParams, itemsParams, userPetParams, fs) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        let localSave = () => {
            fs.writeFile("storage/userData.json", JSON.stringify(userData, null, 2), function(err) {
                if (err) {
                    console.log(err);
                }
            });
            fs.writeFile("storage/userFish.json", JSON.stringify(userFish, null, 2), function(err) {
                if (err) {
                    console.log(err);
                }
            });
            fs.writeFile("storage/userGarden.json", JSON.stringify(userGarden, null, 2), function(err) {
                if (err) {
                    console.log(err);
                }
            });
            fs.writeFile("storage/userHunt.json", JSON.stringify(userHunt, null, 2), function(err) {
                if (err) {
                    console.log(err);
                }
            });
            fs.writeFile("storage/items.json", JSON.stringify(items, null, 2), function(err) {
                if (err) {
                    console.log(err);
                }
            });
            fs.writeFile("storage/userPet.json", JSON.stringify(userPet, null, 2), function(err) {
                if (err) {
                    console.log(err);
                }
            });
        }

        let onlineSave = () => {
            s3.putObject({
                Bucket: process.env.BUCKET,
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
                Bucket: process.env.BUCKET,
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
                Bucket: process.env.BUCKET,
                Key: userGardenParams.Key,
                Body: JSON.stringify(userGarden),
                ContentType: "application/json"},
                function (err, data) {
                    if (err) {
                        console.log(JSON.stringify(err));
                    }
                }
            );
            s3.putObject({
                Bucket: process.env.BUCKET,
                Key: userHuntParams.Key,
                Body: JSON.stringify(userHunt),
                ContentType: "application/json"},
                function (err, data) {
                    if (err) {
                        console.log(JSON.stringify(err));
                    }
                }
            );
            s3.putObject({
                Bucket: process.env.BUCKET,
                Key: itemsParams.Key,
                Body: JSON.stringify(items),
                ContentType: "application/json"},
                function (err, data) {
                    if (err) {
                        console.log(JSON.stringify(err));
                    }
                }
            );
            s3.putObject({
                Bucket: process.env.BUCKET,
                Key: userPetParams.Key,
                Body: JSON.stringify(userPet),
                ContentType: "application/json"},
                function (err, data) {
                    if (err) {
                        console.log(JSON.stringify(err));
                    }
                }
            );
        }

        // localSave();
        onlineSave();
        var time = new Date();
        savefile.lastSave = time;

        console.log("Saved on " + time.toLocaleString());
    }
}
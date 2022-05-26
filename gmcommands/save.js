module.exports = {
    name: 'save',
    description: "Save files.",

    execute(masterData, masterStorage, fs) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        let localSave = () => {
            fs.writeFile("storage/userData.json", JSON.stringify(masterData["userData"], null, 2), function(err) {
                if (err) {
                    console.log(err);
                }
            });
            fs.writeFile("storage/userFish.json", JSON.stringify(masterData["userFish"], null, 2), function(err) {
                if (err) {
                    console.log(err);
                }
            });
            fs.writeFile("storage/userGarden.json", JSON.stringify(masterData["userGarden"], null, 2), function(err) {
                if (err) {
                    console.log(err);
                }
            });
            fs.writeFile("storage/userHunt.json", JSON.stringify(masterData["userHunt"], null, 2), function(err) {
                if (err) {
                    console.log(err);
                }
            });
            fs.writeFile("storage/items.json", JSON.stringify(masterData["items"], null, 2), function(err) {
                if (err) {
                    console.log(err);
                }
            });
            fs.writeFile("storage/userPet.json", JSON.stringify(masterData["userPet"], null, 2), function(err) {
                if (err) {
                    console.log(err);
                }
            });
        }

        let onlineSave = () => {
            masterStorage["s3"].putObject({
                Bucket: process.env.BUCKET,
                Key: masterStorage["userDataParams"].Key,
                Body: JSON.stringify(masterData["userData"]),
                ContentType: "application/json"},
                function (err, data) {
                    if (err) {
                        console.log(JSON.stringify(err));
                    }
                }
            );
            masterStorage["s3"].putObject({
                Bucket: process.env.BUCKET,
                Key: masterStorage["userFishParams"].Key,
                Body: JSON.stringify(masterData["userFish"]),
                ContentType: "application/json"},
                function (err, data) {
                    if (err) {
                        console.log(JSON.stringify(err));
                    }
                }
            );
            masterStorage["s3"].putObject({
                Bucket: process.env.BUCKET,
                Key: masterStorage["userGardenParams"].Key,
                Body: JSON.stringify(masterData["userGarden"]),
                ContentType: "application/json"},
                function (err, data) {
                    if (err) {
                        console.log(JSON.stringify(err));
                    }
                }
            );
            masterStorage["s3"].putObject({
                Bucket: process.env.BUCKET,
                Key: masterStorage["userHuntParams"].Key,
                Body: JSON.stringify(masterData["userHunt"]),
                ContentType: "application/json"},
                function (err, data) {
                    if (err) {
                        console.log(JSON.stringify(err));
                    }
                }
            );
            masterStorage["s3"].putObject({
                Bucket: process.env.BUCKET,
                Key: masterStorage["itemsParams"].Key,
                Body: JSON.stringify(masterData["items"]),
                ContentType: "application/json"},
                function (err, data) {
                    if (err) {
                        console.log(JSON.stringify(err));
                    }
                }
            );
            masterStorage["s3"].putObject({
                Bucket: process.env.BUCKET,
                Key: masterStorage["userPetParams"].Key,
                Body: JSON.stringify(masterData["userPet"]),
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
        masterData["savefile"].lastSave = time;

        console.log("Saved on " + time.toLocaleString());
    }
}
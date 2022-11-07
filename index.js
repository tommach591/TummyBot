const Discord = require("discord.js");
const AWS = require("aws-sdk");

const { MessageEmbed } = require("discord.js");
const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"],
});

const prefix = "!tp ";

const fs = require("fs");

client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.gmcommands = new Discord.Collection();
const gmCommandFiles = fs
  .readdirSync("./gmcommands/")
  .filter((file) => file.endsWith(".js"));
for (const file of gmCommandFiles) {
  const gmcommand = require(`./gmcommands/${file}`);
  client.gmcommands.set(gmcommand.name, gmcommand);
}

var masterData = JSON.parse("{}");
var masterStorage = JSON.parse("{}");

masterStorage["config"] = JSON.parse(fs.readFileSync("config.json", "utf8"));
masterData["savefile"] = JSON.parse("{}");
masterData["blackjack"] = JSON.parse("{}");
masterStorage["fishdex"] = JSON.parse(
  fs.readFileSync("storage/fishdex.json", "utf8")
);
masterStorage["gardendex"] = JSON.parse(
  fs.readFileSync("storage/gardendex.json", "utf8")
);

masterStorage["monsterdex"] = JSON.parse(
  fs.readFileSync("storage/monsterdex.json", "utf8")
);
masterData["currHunt"] = JSON.parse("{}");
masterStorage["equips"] = JSON.parse(
  fs.readFileSync("storage/equips.json", "utf8")
);
masterStorage["scrolls"] = JSON.parse(
  fs.readFileSync("storage/scrolls.json", "utf8")
);

masterStorage["pets"] = JSON.parse(
  fs.readFileSync("storage/pets.json", "utf8")
);

masterStorage["userDataParams"] = {
  Bucket: process.env.BUCKET,
  Key: "storage/userData.json",
};

masterStorage["userFishParams"] = {
  Bucket: process.env.BUCKET,
  Key: "storage/userFish.json",
};

masterStorage["userGardenParams"] = {
  Bucket: process.env.BUCKET,
  Key: "storage/userGarden.json",
};

masterStorage["userHuntParams"] = {
  Bucket: process.env.BUCKET,
  Key: "storage/userHunt.json",
};

masterStorage["itemsParams"] = {
  Bucket: process.env.BUCKET,
  Key: "storage/items.json",
};

masterStorage["userPetParams"] = {
  Bucket: process.env.BUCKET,
  Key: "storage/userPet.json",
};

masterStorage["freeMarketParams"] = {
  Bucket: process.env.BUCKET,
  Key: "storage/freeMarket.json",
};

masterStorage["s3"] = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  Bucket: process.env.BUCKET,
});

async function getObject(params) {
  try {
    const data = await masterStorage["s3"].getObject(params).promise();
    return data.Body.toString("utf8");
  } catch (e) {
    throw new Error(
      `Could not retrieve file from masterStorage["s3"]: ${e.message}`
    );
  }
}

let dataPromise;
getObject(masterStorage["userDataParams"]).then(
  function (result) {
    dataPromise = result;
  },
  function (err) {
    console.log(err);
  }
);

let fishPromise;
getObject(masterStorage["userFishParams"]).then(
  function (result) {
    fishPromise = result;
  },
  function (err) {
    console.log(err);
  }
);

let gardenPromise;
getObject(masterStorage["userGardenParams"]).then(
  function (result) {
    gardenPromise = result;
  },
  function (err) {
    console.log(err);
  }
);

let huntPromise;
getObject(masterStorage["userHuntParams"]).then(
  function (result) {
    huntPromise = result;
  },
  function (err) {
    console.log(err);
  }
);

let itemsPromise;
getObject(masterStorage["itemsParams"]).then(
  function (result) {
    itemsPromise = result;
  },
  function (err) {
    console.log(err);
  }
);

let petPromise;
getObject(masterStorage["userPetParams"]).then(
  function (result) {
    petPromise = result;
  },
  function (err) {
    console.log(err);
  }
);

let freeMarketPromise;
getObject(masterStorage["freeMarketParams"]).then(
  function (result) {
    freeMarketPromise = result;
  },
  function (err) {
    console.log(err);
  }
);

masterData["userData"] = "";
masterData["userFish"] = "";
masterData["userGarden"] = "";
masterData["userHunt"] = "";
masterData["items"] = "";
masterData["userPet"] = "";
masterData["fm"] = "";

/* Local Host Save Files */
// masterData["userData"] = JSON.parse(fs.readFileSync('storage/userData.json', 'utf8'));
// masterData["userFish"] = JSON.parse(fs.readFileSync('storage/userFish.json', 'utf8'));
// masterData["userGarden"] = JSON.parse(fs.readFileSync('storage/userGarden.json', 'utf8'));
// masterData["userHunt"] = JSON.parse(fs.readFileSync('storage/userHunt.json', 'utf8'));
// masterData["items"] = JSON.parse(fs.readFileSync('storage/items.json', 'utf8'));
// masterData["userPet"] = JSON.parse(fs.readFileSync('storage/userPet.json', 'utf8'));
// masterData["fm"] = JSON.parse(fs.readFileSync('storage/freeMarket.json', 'utf8'));

var startTime = new Date();
masterData["savefile"].startTime = startTime;
masterData["savefile"].lastSave = startTime;
masterData["savefile"].autoSave = true;

masterData["currHunt"].lastDifficulty = [];
masterData["currHunt"].baseTime = 1000 * 60 * 30;
masterData["currHunt"].extraTime = 1000 * 60 * 30;
masterData["currHunt"].retreatTime = 1000 * 60 * 10;
masterData["currHunt"].lastSpawn = masterData["savefile"].startTime.getTime();
masterData["currHunt"].nextSpawn =
  masterData["currHunt"].baseTime +
  masterData["currHunt"].extraTime * Math.random();
masterData["currHunt"].baseDropRate = 1;
masterData["currHunt"].dropRate = masterData["currHunt"].baseDropRate;
masterData["currHunt"].dropDuration = 0;
masterData["currHunt"].dropRateStart = 0;
masterData["currHunt"].alertChannels = [
  "927637770145525820",
  "980663698798542858",
];

let saveBeforeReset = () => {
  var resetTime = 1000 * 60 * 60 * 23 + 1000 * 60 * 55;
  setTimeout(function () {
    if (masterData["userData"] != "") {
      client.gmcommands.get("save").execute(masterData, masterStorage, fs);
    }
    saveBeforeReset();
  }, resetTime);
};

let loadUserData = () => {
  masterData["userData"] = "";
  masterData["userFish"] = "";
  masterData["muserGarden"] = "";
  masterData["userHunt"] = "";
  masterData["items"] = "";
  masterData["userPet"] = "";

  dataPromise = null;
  getObject(masterStorage["userDataParams"]).then(
    function (result) {
      dataPromise = result;
    },
    function (err) {
      console.log(err);
    }
  );

  fishPromise = null;
  getObject(masterStorage["userFishParams"]).then(
    function (result) {
      fishPromise = result;
    },
    function (err) {
      console.log(err);
    }
  );

  gardenPromise = null;
  getObject(masterStorage["userGardenParams"]).then(
    function (result) {
      gardenPromise = result;
    },
    function (err) {
      console.log(err);
    }
  );

  huntPromise = null;
  getObject(masterStorage["userHuntParams"]).then(
    function (result) {
      huntPromise = result;
    },
    function (err) {
      console.log(err);
    }
  );

  itemsPromise = null;
  getObject(masterStorage["itemsParams"]).then(
    function (result) {
      itemsPromise = result;
    },
    function (err) {
      console.log(err);
    }
  );

  petPromise = null;
  getObject(masterStorage["userPetParams"]).then(
    function (result) {
      petPromise = result;
    },
    function (err) {
      console.log(err);
    }
  );

  freeMarketPromise = null;
  getObject(masterStorage["freeMarketParams"]).then(
    function (result) {
      freeMarketPromise = result;
    },
    function (err) {
      console.log(err);
    }
  );
};

let updateBalance = (id) => {
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
      masterData["userData"][id].points +=
        Math.floor(timeDiff / incomeCD) * income;
      masterData["userData"][id].incomeTime =
        newTime.getTime() - (timeDiff % incomeCD);
    }
  }
};

let updateStats = (id) => {
  weapon = masterData["items"][masterData["userHunt"][id].weapon];
  armor = masterData["items"][masterData["userHunt"][id].armor];
  accessory = masterData["items"][masterData["userHunt"][id].accessory];

  maxHP = masterData["userHunt"][id].maxHP;
  attack = masterData["userHunt"][id].attack;
  magic = masterData["userHunt"][id].magic;
  defense = masterData["userHunt"][id].defense;
  speed = masterData["userHunt"][id].speed;

  if (weapon.name != "Nothing") {
    maxHP += weapon.maxHP + masterStorage["equips"][weapon.name].maxHP;
    attack += weapon.attack + masterStorage["equips"][weapon.name].attack;
    magic += weapon.magic + masterStorage["equips"][weapon.name].magic;
    defense += weapon.defense + masterStorage["equips"][weapon.name].defense;
    speed += weapon.speed + masterStorage["equips"][weapon.name].speed;
  }

  if (armor.name != "Nothing") {
    maxHP += armor.maxHP + masterStorage["equips"][armor.name].maxHP;
    attack += armor.attack + masterStorage["equips"][armor.name].attack;
    magic += armor.magic + masterStorage["equips"][armor.name].magic;
    defense += armor.defense + masterStorage["equips"][armor.name].defense;
    speed += armor.speed + masterStorage["equips"][armor.name].speed;
  }

  if (accessory.name != "Nothing") {
    maxHP += accessory.maxHP + masterStorage["equips"][accessory.name].maxHP;
    attack += accessory.attack + masterStorage["equips"][accessory.name].attack;
    magic += accessory.magic + masterStorage["equips"][accessory.name].magic;
    defense +=
      accessory.defense + masterStorage["equips"][accessory.name].defense;
    speed += accessory.speed + masterStorage["equips"][accessory.name].speed;
  }

  if (maxHP < 1) {
    maxHP = 1;
  }
  if (attack < 0) {
    attack = 0;
  }
  if (magic < 0) {
    magic = 0;
  }
  if (defense < 0) {
    defense = 0;
  }
  if (speed < 0) {
    speed = 0;
  }

  critChance = 0 + 100 * ((speed * 0.5) / 100);
  if (critChance > 100) {
    critChance = 100;
    critDmg = 5 + (speed - 200) * 0.02;
  } else {
    critDmg = 3 + speed * 0.01;
  }

  if (
    !masterData["currHunt"]["active"] ||
    masterData["currHunt"]["active"].currentHP <= 0 ||
    masterData["currHunt"]["active"].retreated
  ) {
    masterData["userHunt"][id].currentHP = maxHP;
  }
};

let spawnMonster = (newTime) => {
  var timeDiff = newTime.getTime() - masterData["currHunt"].lastSpawn;
  var nextSpawn = masterData["currHunt"].nextSpawn;
  if (!masterData["currHunt"]["active"] && timeDiff >= nextSpawn) {
    var diffOne = [];
    var diffTwo = [];
    var diffThree = [];
    var diffFour = [];
    var diffFive = [];
    var diffSix = [];
    for (var k in masterStorage["monsterdex"]) {
      switch (masterStorage["monsterdex"][k].difficulty) {
        case 1:
          diffOne.push(k);
          break;
        case 2:
          diffTwo.push(k);
          break;
        case 3:
          diffThree.push(k);
          break;
        case 4:
          diffFour.push(k);
          break;
        case 5:
          diffFive.push(k);
          break;
        case 6:
          diffSix.push(k);
          break;
      }
    }
    var selectedMonster;

    if (masterData["currHunt"].lastDifficulty.length == 3) {
      masterData["currHunt"].lastDifficulty = [];
    }

    while (
      !selectedMonster ||
      masterData["currHunt"].lastDifficulty.includes(selectedMonster.difficulty)
    ) {
      var luck = Math.random() * 101;
      if (luck <= 3) {
        // 3%
        selectedMonster =
          masterStorage["monsterdex"][
            diffSix[Math.floor(Math.random() * diffSix.length)]
          ];
      } else if (luck <= 13) {
        // 10%
        selectedMonster =
          masterStorage["monsterdex"][
            diffFive[Math.floor(Math.random() * diffFive.length)]
          ];
      } else if (luck <= 28) {
        // 15%
        selectedMonster =
          masterStorage["monsterdex"][
            diffFour[Math.floor(Math.random() * diffFour.length)]
          ];
      } else if (luck <= 48) {
        // 20%
        selectedMonster =
          masterStorage["monsterdex"][
            diffThree[Math.floor(Math.random() * diffThree.length)]
          ];
      } else if (luck <= 70) {
        // 22%
        selectedMonster =
          masterStorage["monsterdex"][
            diffTwo[Math.floor(Math.random() * diffTwo.length)]
          ];
      } // 30%
      else {
        selectedMonster =
          masterStorage["monsterdex"][
            diffOne[Math.floor(Math.random() * diffOne.length)]
          ];
      }
    }

    masterData["currHunt"]["active"] = {
      id: selectedMonster.id,
      name: selectedMonster.name,
      info: selectedMonster.info,
      entry: selectedMonster.entry,
      shoutout: selectedMonster.shoutout,
      death: selectedMonster.death,
      image: selectedMonster.image,
      attackImage: selectedMonster.attackImage,
      maxHP: selectedMonster.maxHP,
      attack: selectedMonster.attack,
      defense: selectedMonster.defense,
      magicdefense: selectedMonster.magicdefense,
      attackCD: selectedMonster.attackCD,
      difficulty: selectedMonster.difficulty,
      loot: selectedMonster.loot,
      currentHP: selectedMonster.maxHP,
      lastAttack: selectedMonster.attackCD + newTime.getTime(),
      targets: [],
      playerDamage: [],
      channels: [],
      activeChannels: [],
      lastPlayerAttack: newTime.getTime(),
      lastBossCheck: newTime.getTime(),
      deathCount: 0,
      deathLimit: 20,
      retreated: false,
    };

    return true;
  }
  return false;
};

let attackAll = (newTime) => {
  var attackCD = masterData["currHunt"]["active"].attackCD;
  var alivePlayers = 0;

  for (let i = 0; i < masterData["currHunt"]["active"].targets.length; i++) {
    var target = masterData["currHunt"]["active"].targets[i];
    if (masterData["userHunt"][target].currentHP > 0) {
      alivePlayers++;
    }
  }

  if (alivePlayers == 1) {
    attackCD = Math.floor(attackCD / 1.5);
  }
  if (
    masterData["currHunt"]["active"] &&
    masterData["currHunt"]["active"].currentHP > 0 &&
    newTime.getTime() - masterData["currHunt"]["active"].lastAttack >= attackCD
  ) {
    var count = 0;
    var playersHit = "";
    var faints = "";

    for (let i = 0; i < masterData["currHunt"]["active"].targets.length; i++) {
      var target = masterData["currHunt"]["active"].targets[i];

      if (masterData["userHunt"][target].currentHP > 0) {
        var weapon = masterData["items"][masterData["userHunt"][target].weapon];
        var armor = masterData["items"][masterData["userHunt"][target].armor];
        var accessory =
          masterData["items"][masterData["userHunt"][target].accessory];

        var defense = masterData["userHunt"][target].defense;

        if (weapon.name != "Nothing") {
          defense +=
            weapon.defense + masterStorage["equips"][weapon.name].defense;
        }
        if (armor.name != "Nothing") {
          defense +=
            armor.defense + masterStorage["equips"][armor.name].defense;
        }
        if (accessory.name != "Nothing") {
          defense +=
            accessory.defense + masterStorage["equips"][accessory.name].defense;
        }

        if (defense < 0) {
          defense = 0;
        }

        var multiplier;
        var resistance;
        if (masterData["currHunt"]["active"].attack + defense * 2 == 0) {
          multiplier = 1;
        } else {
          multiplier =
            masterData["currHunt"]["active"].attack /
            (masterData["currHunt"]["active"].attack + defense * 2);
        }
        resistance = 1 - multiplier;

        var damageDealt = Math.floor(
          masterData["currHunt"]["active"].attack * multiplier
        );
        var reflectDmg = 0;
        if (alivePlayers == 1) {
          damageDealt = Math.floor(1.5 * damageDealt);
        }
        if (damageDealt <= 0) {
          damageDealt = 1;
        }

        var luck = Math.floor(Math.random() * 100 + 1);
        var chance = Math.floor((100 * resistance) / 3);
        if (luck <= chance) {
          reflectDmg = Math.floor(
            masterData["currHunt"]["active"].attack * (100 * (resistance / 10))
          );
          if (masterData["currHunt"]["active"].currentHP <= reflectDmg) {
            reflectDmg = masterData["currHunt"]["active"].currentHP - 1;
          }
          masterData["currHunt"]["active"].currentHP -= reflectDmg;
          damageDealt = 0;

          masterData["currHunt"]["active"].playerDamage[
            masterData["currHunt"]["active"].targets.indexOf(target)
          ] += reflectDmg;
        }

        masterData["userHunt"][target].currentHP -= damageDealt;
        if (masterData["userHunt"][target].currentHP <= 0) {
          masterData["userHunt"][target].deathTime = newTime.getTime();
          playersHit +=
            masterData["userData"][target].name +
            " takes " +
            damageDealt +
            " damage!\n";
          faints += masterData["userData"][target].name + " has fainted!\n";
          masterData["currHunt"]["active"].deathCount++;
        } else if (damageDealt == 0) {
          playersHit +=
            masterData["userData"][target].name +
            " counters the attack, dealing " +
            reflectDmg.toLocaleString() +
            " damage!\n";
        } else {
          playersHit +=
            masterData["userData"][target].name +
            " takes " +
            damageDealt.toLocaleString() +
            " damage!\n";
        }
        count++;
      }
    }
    masterData["currHunt"]["active"].lastAttack = newTime.getTime();

    if (count > 0) {
      const embedMsg = new MessageEmbed();
      var stars = " (";
      for (let i = 0; i < masterData["currHunt"]["active"].difficulty; i++) {
        stars += "★";
      }
      stars += ")";
      embedMsg.setTitle(
        masterData["currHunt"]["active"].name + stars + " - Attacks!"
      );
      embedMsg.setDescription(
        masterData["currHunt"]["active"].shoutout +
          "\n\n" +
          playersHit +
          "\n" +
          faints
      );
      embedMsg.setImage(masterData["currHunt"]["active"].attackImage);
      embedMsg.setFooter(
        "HP: " +
          masterData["currHunt"]["active"].currentHP.toLocaleString() +
          "/" +
          masterData["currHunt"]["active"].maxHP.toLocaleString() +
          "\n\nDeaths: " +
          masterData["currHunt"]["active"].deathCount +
          "/" +
          masterData["currHunt"]["active"].deathLimit
      );
      embedMsg.setColor("49000F");
      for (
        let i = 0;
        i < masterData["currHunt"]["active"].channels.length;
        i++
      ) {
        if (
          newTime.getTime() -
            masterData["currHunt"]["active"].activeChannels[i] <
            1000 * 15 ||
          faints != ""
        )
          masterData["currHunt"]["active"].channels[i].send({
            embeds: [embedMsg],
          });
      }
    }

    if (
      masterData["currHunt"]["active"].deathCount >=
        masterData["currHunt"]["active"].deathLimit &&
      !masterData["currHunt"]["active"].retreated
    ) {
      const retreatMsg = new MessageEmbed();

      masterData["currHunt"]["active"].retreated = true;
      masterData["currHunt"].lastSpawn = newTime.getTime();
      masterData["currHunt"].nextSpawn = masterData["currHunt"].retreatTime;
      masterData["currHunt"].lastDifficulty.push(
        masterData["currHunt"]["active"].difficulty
      );

      var stars = " (";
      for (let i = 0; i < masterData["currHunt"]["active"].difficulty; i++) {
        stars += "★";
      }
      stars += ")";
      retreatMsg.setTitle(
        masterData["currHunt"]["active"].name + stars + " - Retreats!"
      );
      retreatMsg.setDescription(
        "After defeating " +
          masterData["currHunt"]["active"].deathCount +
          " players, " +
          masterData["currHunt"]["active"].name +
          " left the battlegrounds."
      );
      retreatMsg.setFooter(
        "HP: " +
          masterData["currHunt"]["active"].currentHP +
          "/" +
          masterData["currHunt"]["active"].maxHP
      );
      retreatMsg.setColor("FF0000");

      let channels = masterData["currHunt"]["active"].channels;
      for (let i = 0; i < channels.length; i++) {
        channels[i].send({ embeds: [retreatMsg] });
      }
      var players = masterData["currHunt"]["active"].targets;
      delete masterData["currHunt"]["active"];
      for (let i = 0; i < players.length; i++) {
        updateStats(players[i]);
      }
    }
  }
};

const helpMsg = new MessageEmbed();
helpMsg.setTitle("Invalid command!");
helpMsg.setColor("FF0000");
helpMsg.setThumbnail(
  "https://4.bp.blogspot.com/-DV8zj3oNPO8/XZKl8Y1_KkI/AAAAAAAMsvI/HEq47t0TPmYhX0b2igMkkxbcPQPbUXR2gCLcBGAsYHQ/s1600/AS0005827_02.gif"
);
helpMsg.setDescription("Use __!tp help__ for list of commands!");

client.once("ready", () => {
  console.log(masterData["savefile"].startTime.toLocaleString());
  console.log("TummyBot is online!");
  saveBeforeReset();
});

var guilds = [];

var pokemon = JSON.parse("{}");

client.on("messageCreate", (message) => {
  var newTime = new Date();
  var sender = message.author;

  try {
    if (masterData["userData"] == "") {
      if (dataPromise) masterData["userData"] = JSON.parse(dataPromise);
      else return;
    }
    if (masterData["userFish"] == "") {
      if (fishPromise) masterData["userFish"] = JSON.parse(fishPromise);
      else return;
    }
    if (masterData["userGarden"] == "") {
      if (gardenPromise) masterData["userGarden"] = JSON.parse(gardenPromise);
      else return;
    }
    if (masterData["userHunt"] == "") {
      if (huntPromise) masterData["userHunt"] = JSON.parse(huntPromise);
      else return;
    }
    if (masterData["items"] == "") {
      if (itemsPromise) masterData["items"] = JSON.parse(itemsPromise);
      else return;
    }
    if (masterData["userPet"] == "") {
      if (petPromise) masterData["userPet"] = JSON.parse(petPromise);
      else return;
    }
    if (masterData["fm"] == "") {
      if (petPromise) masterData["fm"] = JSON.parse(freeMarketPromise);
      else return;
    }

    if (!message.content.startsWith(prefix) || message.author.bot) {
      if (message.content.startsWith(";p") && !pokemon[sender.id]) {
        pokemon[sender.id] = "on";
        setTimeout(() => {
          delete pokemon[sender.id];
          message.channel.send(`<@!${sender.id}> next Pokemon is ready!`);
        }, 10500);
      }
      return;
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    updateBalance(sender.id);

    let role = message.guild.roles.cache.find((role) => role.name === "guild");
    if (!role) {
      message.guild.roles.create({ name: "guild" });
    }

    if (!guilds.includes(message.guild)) {
      guilds.push(message.guild);
    }

    var validCommand = false;
    switch (command) {
      // Base Commands
      case "help":
        client.commands.get("help").execute(message, client);
        validCommand = true;
        break;
      case "register":
        client.commands.get("register").execute(message, sender.id, masterData);
        break;
      case "uptime":
        client.commands.get("uptime").execute(message, masterData);
        validCommand = true;
        break;
      case "leaderboard":
        if (masterData["userData"][sender.id])
          client.commands
            .get("leaderboard")
            .execute(message, sender.id, masterData);
        break;
      case "b":
      case "bal":
      case "info":
      case "profile":
      case "balance":
        if (masterData["userData"][sender.id])
          client.commands
            .get("balance")
            .execute(
              message,
              args,
              sender.id,
              masterData,
              masterStorage,
              client
            );
        break;
      case "give":
        if (masterData["userData"][sender.id])
          client.commands
            .get("give")
            .execute(message, args, sender.id, masterData, client);
        break;
      case "marry":
        if (masterData["userData"][sender.id])
          client.commands
            .get("marry")
            .execute(message, args, sender.id, masterData, client);
        break;
      case "divorce":
        if (masterData["userData"][sender.id])
          client.commands
            .get("divorce")
            .execute(message, sender.id, masterData);
        break;
      case "scratch":
        if (masterData["userData"][sender.id])
          client.commands
            .get("scratch")
            .execute(message, args, sender.id, masterData);
        break;
      case "beg":
        if (masterData["userData"][sender.id])
          client.commands.get("beg").execute(message, sender.id, masterData);
        break;
      case "level":
        if (masterData["userData"][sender.id])
          client.commands
            .get("level")
            .execute(message, sender.id, masterData, masterStorage);
        break;
      case "f":
      case "fish":
        if (masterData["userData"][sender.id])
          client.commands
            .get("fish")
            .execute(
              message,
              args,
              sender.id,
              masterData,
              masterStorage,
              client
            );
        break;
      case "g":
      case "garden":
        if (masterData["userData"][sender.id])
          client.commands
            .get("garden")
            .execute(
              message,
              args,
              sender.id,
              masterData,
              masterStorage,
              client
            );
        break;
      case "bank":
        if (masterData["userData"][sender.id])
          client.commands
            .get("bank")
            .execute(message, args, sender.id, masterData, client);
        break;
      case "bj":
        if (masterData["userData"][sender.id])
          client.commands
            .get("bj")
            .execute(message, args, sender.id, masterData, client);
        break;
      case "fame":
        if (masterData["userData"][sender.id])
          client.commands
            .get("fame")
            .execute(message, args, sender.id, masterData, client);
        break;
      case "h":
      case "hunt":
        if (masterData["userData"][sender.id])
          client.commands
            .get("hunt")
            .execute(
              message,
              args,
              sender.id,
              masterData,
              masterStorage,
              client,
              fs
            );
        break;
      case "p":
      case "pet":
        if (masterData["userData"][sender.id])
          client.commands
            .get("pet")
            .execute(
              message,
              args,
              sender.id,
              masterData,
              masterStorage,
              client
            );
        break;
      case "fm":
        if (masterData["userData"][sender.id])
          client.commands
            .get("fm")
            .execute(
              message,
              args,
              sender.id,
              masterData,
              masterStorage,
              client
            );
        break;
      case "pray":
        if (masterData["userData"][sender.id])
          client.commands.get("pray").execute(message, sender.id, masterData);
        break;
      // GM Commands ****************************************************************************************************************************
      case "reload":
        if (masterData["userData"][sender.id]) {
          if (masterData["userData"][sender.id].gm >= 1) {
            loadUserData();
            const embedMsg = new MessageEmbed();
            embedMsg.setTitle("Reloading Data!");
            embedMsg.setColor("00FF00");
            embedMsg.setDescription("Data reloaded to last save!");
            message.channel.send({ embeds: [embedMsg] });
          } else {
            const embedMsg = new MessageEmbed();
            embedMsg.setTitle("Reloading Data!");
            embedMsg.setColor("FF0000");
            embedMsg.setDescription("You are not GM!");
            message.channel.send({ embeds: [embedMsg] });
          }
          validCommand = true;
        }
        break;
      case "reward":
        if (masterData["userData"][sender.id])
          client.gmcommands
            .get("reward")
            .execute(message, args, sender.id, masterData, client);
        break;
      case "rewardall":
        if (masterData["userData"][sender.id])
          client.gmcommands
            .get("rewardall")
            .execute(message, args, sender.id, masterData);
        break;
      case "spawntime":
        if (
          masterData["userData"][sender.id] &&
          masterData["currHunt"].lastSpawn
        )
          client.gmcommands
            .get("spawntime")
            .execute(message, args, sender.id, masterData);
        break;
      case "spawnboss":
        if (
          masterData["userData"][sender.id] &&
          masterData["currHunt"].lastSpawn
        )
          client.gmcommands
            .get("spawnboss")
            .execute(message, args, sender.id, masterData, masterStorage);
        break;
      case "spawnequip":
        if (masterData["userData"][sender.id])
          client.gmcommands
            .get("spawnequip")
            .execute(
              message,
              args,
              sender.id,
              masterData,
              masterStorage,
              client
            );
        break;
      case "spawnscroll":
        if (masterData["userData"][sender.id])
          client.gmcommands
            .get("spawnscroll")
            .execute(
              message,
              args,
              sender.id,
              masterData,
              masterStorage,
              client
            );
        break;
      case "droprate":
        if (masterData["userData"][sender.id])
          client.gmcommands
            .get("droprate")
            .execute(message, args, sender.id, masterData);
        break;
      case "killboss":
        if (masterData["userData"][sender.id])
          client.gmcommands
            .get("killboss")
            .execute(message, sender.id, masterData, masterStorage);
        break;
      case "banish":
        if (masterData["userData"][sender.id])
          client.gmcommands
            .get("banish")
            .execute(message, args, sender.id, masterData);
        break;
      case "registerall":
        if (masterData["userData"][sender.id]) {
          client.gmcommands
            .get("registerall")
            .execute(message, sender.id, masterData);
        }
        break;
      case "gm":
        if (masterData["userData"][sender.id])
          client.gmcommands
            .get("gm")
            .execute(message, args, sender.id, masterData, client);
        break;
      case "save":
        if (
          masterData["userData"][sender.id] &&
          masterData["userData"][sender.id].gm > 0
        ) {
          client.gmcommands.get("save").execute(masterData, masterStorage, fs);
          const embedMsg = new MessageEmbed();
          embedMsg.setTitle("Saved!");
          embedMsg.setColor("B5EAFF");
          embedMsg.setImage(
            "https://c.tenor.com/TgPXdDAfIeIAAAAM/gawr-gura-gura.gif"
          );
          embedMsg.setDescription("Files have been saved!");
          message.channel.send({ embeds: [embedMsg] });
        }
        break;
      case "autosave":
        if (
          masterData["userData"][sender.id] &&
          masterData["userData"][sender.id].gm > 0
        ) {
          masterData["savefile"].autoSave = !masterData["savefile"].autoSave;

          const embedMsg = new MessageEmbed();
          embedMsg.setTitle("Auto Save!");
          embedMsg.setColor("00FF00");
          embedMsg.setDescription(
            "Auto save after bosses now " +
              masterData["savefile"].autoSave +
              "!"
          );
          message.channel.send({ embeds: [embedMsg] });
        }
        break;
      case "wipe":
        if (
          masterData["userData"][sender.id] &&
          masterData["userData"][sender.id].gm > 0
        ) {
          masterData["userData"] = JSON.parse("{}");
          masterData["userFish"] = JSON.parse("{}");
          masterData["userGarden"] = JSON.parse("{}");
          masterData["userHunt"] = JSON.parse("{}");
          masterData["items"] = JSON.parse(
            '{"000000":{"name":"Nothing","maxHP":0,"attack":0,"magic":0,"defense":0,"speed":0,"slots":0}}'
          );
          masterData["userPet"] = JSON.parse("{}");
          masterData["fm"] = JSON.parse("{}");

          const embedMsg = new MessageEmbed();
          embedMsg.setTitle("Wipe!");
          embedMsg.setColor("00FF00");
          embedMsg.setDescription("All save data was wiped!");
          message.channel.send({ embeds: [embedMsg] });
          validCommand = true;
        }
        break;
      default:
        message.channel.send({ embeds: [helpMsg] }).then((msg) => {
          setTimeout(() => msg.delete(), 5000);
        });
        break;
    }

    if (!masterData["userData"][sender.id] && !validCommand) {
      const embedMsg = new MessageEmbed();
      embedMsg.setTitle("New User!");
      embedMsg.setColor("FF0000");
      embedMsg.setDescription("Register with the !tp register command!");
      message.channel.send({ embeds: [embedMsg] });
    }

    if (
      spawnMonster(newTime) &&
      !masterData["currHunt"]["active"].channels.includes(message.channel)
    ) {
      masterData["currHunt"]["active"].channels.push(message.channel);
      masterData["currHunt"]["active"].activeChannels.push(newTime.getTime());

      var ping = "";
      const embedMsg = new MessageEmbed();
      var stars = " (";
      for (let i = 0; i < masterData["currHunt"]["active"].difficulty; i++) {
        stars += "★";
      }
      stars += ")";
      embedMsg.setTitle(masterData["currHunt"]["active"].name + stars);
      embedMsg.setDescription(
        masterData["currHunt"]["active"].entry +
          "\n\nType **__!tp h attack__** to fight!"
      );
      embedMsg.setImage(masterData["currHunt"]["active"].image);
      embedMsg.setFooter(
        "HP: " +
          masterData["currHunt"]["active"].currentHP.toLocaleString() +
          "/" +
          masterData["currHunt"]["active"].maxHP.toLocaleString()
      );
      embedMsg.setColor("49000F");
      masterData["currHunt"]["active"].channels[0].send({ embeds: [embedMsg] });

      for (let i = 0; i < guilds.length; i++) {
        for (let j = 0; j < masterData["currHunt"].alertChannels.length; j++) {
          let channel = guilds[i].channels.cache.get(
            masterData["currHunt"].alertChannels[j]
          );
          let role = guilds[i].roles.cache.find(
            (role) => role.name === "guild"
          );
          if (channel) {
            if (channel != message.channel) {
              channel.send({ embeds: [embedMsg] });
              if (
                !masterData["currHunt"]["active"].channels.includes(channel)
              ) {
                masterData["currHunt"]["active"].channels.push(channel);
                masterData["currHunt"]["active"].activeChannels.push(
                  newTime.getTime()
                );
              }
            }

            if (role) {
              ping = "<@&" + role + ">";
              channel.send(ping);
            }
          }
        }
      }
    }

    if (
      masterData["currHunt"]["active"] &&
      newTime.getTime() - masterData["currHunt"]["active"].lastPlayerAttack >=
        1000 * 60 * 10 &&
      newTime.getTime() - masterData["currHunt"]["active"].lastBossCheck >=
        1000 * 15 &&
      !masterData["currHunt"]["active"].retreated &&
      masterData["currHunt"]["active"].currentHP > 0
    ) {
      const embedMsg = new MessageEmbed();
      masterData["currHunt"]["active"].retreated = true;
      masterData["currHunt"].lastSpawn = newTime.getTime();
      masterData["currHunt"].nextSpawn = masterData["currHunt"].retreatTime;
      masterData["currHunt"].lastDifficulty.push(
        masterData["currHunt"]["active"].difficulty
      );

      var stars = " (";
      for (let i = 0; i < masterData["currHunt"]["active"].difficulty; i++) {
        stars += "★";
      }
      stars += ")";
      embedMsg.setTitle(
        masterData["currHunt"]["active"].name + stars + " - Retreats!"
      );
      embedMsg.setDescription(
        masterData["currHunt"]["active"].name +
          " got bored and left the battlegrounds."
      );
      embedMsg.setFooter(
        "HP: " +
          masterData["currHunt"]["active"].currentHP.toLocaleString() +
          "/" +
          masterData["currHunt"]["active"].maxHP.toLocaleString()
      );
      embedMsg.setColor("FF0000");

      let channels = masterData["currHunt"]["active"].channels;
      for (let i = 0; i < channels.length; i++) {
        channels[i].send({ embeds: [embedMsg] });
      }
      var players = masterData["currHunt"]["active"].targets;
      delete masterData["currHunt"]["active"];
      for (let i = 0; i < players.length; i++) {
        updateStats(players[i]);
      }
    }

    if (
      masterData["currHunt"]["active"] &&
      !masterData["currHunt"]["active"].retreated
    ) {
      attackAll(newTime);
    }
  } catch (err) {
    const embedMsg = new MessageEmbed();
    embedMsg.setTitle("Error!");
    embedMsg.setColor("FF0000");
    embedMsg.setDescription("Oh no! Something went wrong with the bot!");
    embedMsg.setFooter("Try not to use that same command again!");
    message.channel.send({ embeds: [embedMsg] });
    console.log(err);
  }

  if (
    newTime.getTime() - masterData["savefile"].lastSave.getTime() >=
    1000 * 60 * 60
  ) {
    client.gmcommands.get("save").execute(masterData, masterStorage, fs);
  }
});

process.on("unhandledRejection", (reason, promise) => {
  console.log(reason);
});

client.login(process.env.DISCORD_TOKEN); // Last Line in File

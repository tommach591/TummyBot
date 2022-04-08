module.exports = {
    name: 'pet',
    description: "Take care of your pet.",

    execute(message, args, userid, userData, userPet, pets, client) {
        const { MessageEmbed } = require('discord.js');
        const embedMsg = new MessageEmbed();

        function updateTime() {
            if (userPet[userid].pet != "0") {
                var newTime = new Date();
                var hungerTimeDiff = newTime.getTime() - userPet[userid].hungerTimer;
                var hydrationTimeDiff = newTime.getTime() - userPet[userid].hydrationTimer;
                var cleanlinessTimeDiff = newTime.getTime() - userPet[userid].cleanlinessTimer;
                var deathTimeDiff = 0;

                var hungerTick = 1000 * 60 * 7;
                var hydrationTick = 1000 * 60 * 5;
                var cleanlinessTick = 1000 * 60 * 60 * 3;
                var deathTick = 1000 * 60 * 60 * 24 * 2;

                if (hungerTimeDiff >= hungerTick && userPet[userid].hunger > 0) {
                    var totalTicks = Math.floor(hungerTimeDiff / hungerTick);
                    for (let i = 0; i < totalTicks; i++) {
                        if (userPet[userid].hunger > 0) {
                            userPet[userid].hunger--;
                        }
                        else if (userPet[userid].hydration == 0) {
                            userPet[userid].deathTimer = newTime.getTime() - ((totalTicks - i) * hungerTick) - (hungerTimeDiff % hungerTick);
                            break;
                        }
                    }
    
                    userPet[userid].hungerTimer = newTime.getTime() - (hungerTimeDiff % hungerTick);
                }

                if (hydrationTimeDiff >= hydrationTick && userPet[userid].hydration > 0) {
                    var totalTicks = Math.floor(hydrationTimeDiff / hydrationTick);
                    for (let i = 0; i < totalTicks; i++) {
                        if (userPet[userid].hydration > 0) {
                            userPet[userid].hydration--;
                        }
                        else if (userPet[userid].hunger == 0) {
                            userPet[userid].deathTimer = newTime.getTime() - ((totalTicks - i) * hydrationTick) - (hydrationTimeDiff % hydrationTick);
                            break;
                        }
                    }
                    userPet[userid].hydrationTimer = newTime.getTime() - (hydrationTimeDiff % hydrationTick);
                }

                if (cleanlinessTimeDiff >= cleanlinessTick && userPet[userid].cleanliness > 0) {
                    var totalTicks = Math.floor(cleanlinessTimeDiff / cleanlinessTick);
                    for (let i = 0; i < totalTicks; i++) {
                        if (userPet[userid].cleanliness > 0) {
                            userPet[userid].cleanliness--;
                        }
                        else {
                            break;
                        }
                    }
                    userPet[userid].cleanlinessTimer = newTime.getTime() - (cleanlinessTimeDiff % cleanlinessTick);
                }      

                if (userPet[userid].hunger == 0 && userPet[userid].hydration == 0 && !userPet[userid].dead) {
                    deathTimeDiff = newTime.getTime() - userPet[userid].deathTimer;
                }

                if (userPet[userid].deathTimer != 0 && deathTimeDiff >= deathTick && !userPet[userid].dead) {
                    userPet[userid].dead = true;
                }
            }
        }

        updateTime();

        var command = args[0];
        switch(command) {
            case 'help':
                const petCommands = new Map();
                petCommands.set('help', 'Displays list of pet commands.');
                petCommands.set('adopt', 'Adopt a random pet.');
                petCommands.set('abandon', 'Horribly abandon your pet.');
                petCommands.set('rename', 'Rename your pet.');
                petCommands.set('buy', 'Buy pet food.');
                petCommands.set('feed', 'Feed your pet.');
                petCommands.set('water', 'Hydrate your pet.');
                petCommands.set('clean', 'Clean your pet.');
                petCommands.set('play', 'Play with your pet.');
                petCommands.set('revive', 'Revive your pet.');
                petCommands.set('leaderboard', 'Leaderboard of pets.');

                embedMsg.setTitle('List of Pet Commands');
                embedMsg.setColor('FFF000');

                petCommands.forEach((values, keys)=> {
                    embedMsg.addField("!tp pet " + keys, values);
                });

                message.channel.send({ embeds: [embedMsg] });
                break;
            case 'adopt':
                if (userPet[userid].pet == "0") {
                    var cost = 10000;
                    if (userData[userid].points >= cost) {
                        const proposalMsg = new MessageEmbed();
                        proposalMsg.setTitle('Adopting a Pet!');
                        proposalMsg.setColor('FFF000');
                        proposalMsg.setThumbnail('https://c.tenor.com/_4xCiEhhoZsAAAAM/dog-smile.gif');
                        proposalMsg.setDescription("Would " + userData[userid].name + " like to buy a new pet for " + cost + " points?");
    
                        let proposal; 
                        message.channel.send({ embeds: [proposalMsg] }).then(
                            sent => { proposal = sent } 
                        ).then(
                            () => {
                                proposal.react('👍').then(() => proposal.react('👎'));
                                const filter = (reaction, user) => {
                                    return ['👍', '👎'].includes(reaction.emoji.name) && user.id === userid;
                                };
                                proposal.awaitReactions({ filter, max: 1, time: 30000, errors: ['time'] })
                                .then(
                                    collected => {
                                    const reaction = collected.first();
                                    if (reaction.emoji.name === '👍') {
                                        userData[userid].points -= cost;

                                        var keys = [];
                                        for (var k in pets) {
                                            keys.push(k);
                                        }
                                        var selectedPet = keys[Math.floor(Math.random() * keys.length)];
                                        userPet[userid].pet = selectedPet;

                                        var luck = Math.floor((Math.random() * 100) + 1);
                                        if (luck <= 4) {
                                            userPet[userid].type = 3;
                                        }
                                        else if (luck <= 20) {
                                            userPet[userid].type = 2;
                                        }
                                        else if (luck <= 60) {
                                            userPet[userid].type = 1;
                                        }
                                        else {
                                            userPet[userid].type = 0;
                                        }

                                        userPet[userid].petName = pets[selectedPet].names[userPet[userid].type];
                                        userPet[userid].image = pets[selectedPet].images[userPet[userid].type];
                                        userPet[userid].level = 1;
                                        userPet[userid].hunger = 25;
                                        userPet[userid].hydration = 25;

                                        var newTime = new Date();
                                        userPet[userid].hungerTimer = newTime.getTime();
                                        userPet[userid].hydrationTimer = newTime.getTime();
                                        userPet[userid].cleanlinessTimer = newTime.getTime();
                                        
                                        embedMsg.setTitle('Congratz!');
                                        embedMsg.setColor('00FF00');
                                        embedMsg.setDescription(userData[userid].name + " bought a " + userPet[userid].petName + "!");
                                        embedMsg.setThumbnail(userPet[userid].image);
                                        embedMsg.setFooter("Rates: 40%/40%/16%/4%");
                                        message.channel.send({ embeds: [embedMsg] });
                                    } 
                                    else {
                                        embedMsg.setTitle('Declined!');
                                        embedMsg.setColor('FF0000');
                                        embedMsg.setThumbnail('https://media3.giphy.com/media/qUIm5wu6LAAog/200.gif');
                                        embedMsg.setDescription(userData[userid].name + " declined!");
                                        message.channel.send({ embeds: [embedMsg] });
                                    }
                                })
                                .catch(collected => {
                                    embedMsg.setTitle('Fail!');
                                    embedMsg.setColor('FF0000');
                                    embedMsg.setDescription(userData[userid].name + " took too long to respond!");
                                    embedMsg.setThumbnail('https://media3.giphy.com/media/qUIm5wu6LAAog/200.gif');
                                    message.channel.send({ embeds: [embedMsg] });
                                });
                            }
                        );
                    }
                    else {
                        embedMsg.setTitle('Error!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription("A new pet costs 10000 points!");
                        embedMsg.setThumbnail('https://c.tenor.com/E05L3qlURd0AAAAd/no-money-broke.gif');
                        embedMsg.setFooter('Raising a pet comes with responsibilities!');
                        message.channel.send({ embeds: [embedMsg] });
                    }
                }
                else {
                    embedMsg.setTitle('You already own a pet!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription("Disown your current pet if you want another one!");
                    message.channel.send({ embeds: [embedMsg] });
                }
                break;
            case 'abandon':
                if (userPet[userid].pet != "0") {
                    var oldpet = userPet[userid].petName;

                    const proposalMsg = new MessageEmbed();
                    proposalMsg.setTitle('Abandon Pet!');
                    proposalMsg.setColor('FFF000');
                    proposalMsg.setThumbnail(userPet[userid].image);
                    proposalMsg.setDescription("Would " + userData[userid].name + " like to abandon " + oldpet + "?");

                    let proposal; 
                    message.channel.send({ embeds: [proposalMsg] }).then(
                        sent => { proposal = sent } 
                    ).then(
                        () => {
                            proposal.react('👍').then(() => proposal.react('👎'));
                            const filter = (reaction, user) => {
                                return ['👍', '👎'].includes(reaction.emoji.name) && user.id === userid;
                            };
                            proposal.awaitReactions({ filter, max: 1, time: 30000, errors: ['time'] })
                            .then(
                                collected => {
                                const reaction = collected.first();
                                if (reaction.emoji.name === '👍') {
                                    userPet[userid].pet = "0";
                                    userPet[userid].petName = "";
                                    userPet[userid].type = 0;
                                    userPet[userid].image = "";
                                    userPet[userid].level = 0;
                                    userPet[userid].hunger = 0;
                                    userPet[userid].hydration = 0;
                                    userPet[userid].cleanliness = 0;
                                    userPet[userid].happiness = 0;

                                    userPet[userid].hungerTimer = 0;
                                    userPet[userid].hydrationTimer = 0;
                                    userPet[userid].cleanlinessTimer = 0;
                                    userPet[userid].happinessTimer = 0;
                                    userPet[userid].deathTimer = 0;
                                    
                                    embedMsg.setTitle('Abandoned!');
                                    embedMsg.setColor('00FF00');
                                    embedMsg.setDescription(userData[userid].name + " successfully abandoned " + oldpet + "!");
                                    embedMsg.setImage("https://c.tenor.com/57kKrag-yvoAAAAC/demon-slayer-tanjiro.gif");
                                    embedMsg.setFooter("Wow...");
                                    message.channel.send({ embeds: [embedMsg] });
                                } 
                                else {
                                    embedMsg.setTitle('Declined!');
                                    embedMsg.setColor('FF0000');
                                    embedMsg.setThumbnail(userPet[userid].image);
                                    embedMsg.setDescription(userData[userid].name + " decided to keep" + oldpet + "!");
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                            })
                            .catch(collected => {
                                embedMsg.setTitle('Fail!');
                                embedMsg.setColor('FF0000');
                                embedMsg.setDescription(userData[userid].name + " couldn't decide!");
                                embedMsg.setThumbnail(userPet[userid].image);
                                message.channel.send({ embeds: [embedMsg] });
                            });
                        }
                    );
                }
                else {
                    embedMsg.setTitle('You don\'t own a pet!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription("Get a pet before you disown it!");
                    message.channel.send({ embeds: [embedMsg] });
                }
                break;
            case 'rename':
                if (args.length < 2) {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription('Please enter a name!');
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    var newName = args[1].replace(/[^a-zA-Z0-9]/gi,'');
                    var cost = 50000;
                    var maxSize = 16;
                    const badnames = ["4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker",
                    "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard",
                    "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin",
                    "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs",
                    "booooobs", "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck",
                    "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker",
                    "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks",
                    "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot",
                    "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc",
                    "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dildo", "dildos",
                    "dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated",
                    "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggitt", "faggot",
                    "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching",
                    "fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked",
                    "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers",
                    "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer",
                    "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs",
                    "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "hell", "heshe", "hoar", "hoare", "hoer",
                    "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead",
                    "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch",
                    "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*",
                    "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz",
                    "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked",
                    "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker",
                    "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead",
                    "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck",
                    "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin",
                    "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum",
                    "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag",
                    "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings",
                    "shits", "shitted", "shitter", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk",
                    "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck",
                    "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang",
                    "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx", "nig", "nigg"];

                    if (userPet[userid].pet == "0") {
                        embedMsg.setTitle('You don\'t own a pet!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription("Get a pet first!");
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else if (userPet[userid].dead) {
                        embedMsg.setTitle('Your pet is dead!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription("Revive your pet first!");
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else if (userData[userid].points < cost) {
                        embedMsg.setTitle('Error!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription(userData[userid].name + " does not have " + cost + " points!");
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else if (badnames.includes(newName) || newName.length > maxSize) {
                        embedMsg.setTitle('Error!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription(userData[userid].name + " cannot use that name!");
                        embedMsg.setFooter('Haha, you thought!');
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else {
                        const proposalMsg = new MessageEmbed();
                        proposalMsg.setTitle('Renaming Pet!');
                        proposalMsg.setColor('FFF000');
                        proposalMsg.setThumbnail(userPet[userid].image);
                        proposalMsg.setDescription("Would " + userData[userid].name + " like to rename " + userPet[userid].petName + " to " + newName + " for "+ cost + " points?");

                        let proposal; 
                        message.channel.send({ embeds: [proposalMsg] }).then(
                            sent => { proposal = sent } 
                        ).then(
                            () => {
                                proposal.react('👍').then(() => proposal.react('👎'));
                                const filter = (reaction, user) => {
                                    return ['👍', '👎'].includes(reaction.emoji.name) && user.id === userid;
                                };
                                proposal.awaitReactions({ filter, max: 1, time: 30000, errors: ['time'] })
                                .then(
                                    collected => {
                                    const reaction = collected.first();
                                    if (reaction.emoji.name === '👍') {
                                        userData[userid].points -= cost;
                                        userPet[userid].petName = newName;

                                        embedMsg.setTitle('Success!');
                                        embedMsg.setColor('00FF00');
                                        embedMsg.setThumbnail(userPet[userid].image);
                                        embedMsg.setDescription(userData[userid].name + " names their pet " + userPet[userid].petName + "!");
                                        message.channel.send({ embeds: [embedMsg] });
                                    } 
                                    else {
                                        embedMsg.setTitle('Declined!');
                                        embedMsg.setColor('FF0000');
                                        embedMsg.setThumbnail(userPet[userid].image);
                                        embedMsg.setDescription(userData[userid].name + " declined!");
                                        message.channel.send({ embeds: [embedMsg] });
                                    }
                                })
                                .catch(collected => {
                                    embedMsg.setTitle('Fail!');
                                    embedMsg.setColor('FF0000');
                                    embedMsg.setThumbnail(userPet[userid].image);
                                    embedMsg.setDescription(userData[userid].name + " took too long to respond!");
                                    message.channel.send({ embeds: [embedMsg] });
                                });
                            }
                        );
                    }
                }
                break;
            case 'buy':
                if (args.length < 2) {
                    embedMsg.setTitle('Error!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription('Please enter amount of pet food to buy!');
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    var amount = Math.floor(Number(args[1]));
                    var cost = 250;
                    if (!isNaN(amount)) {
                        if (userData[userid].points >= amount * cost && amount > 0) {

                            const proposalMsg = new MessageEmbed();
                            proposalMsg.setTitle('Buying Pet Food!');
                            proposalMsg.setColor('FFF000');
                            proposalMsg.setThumbnail('https://i.imgur.com/ActIoIR.png');
                            proposalMsg.setDescription("Would " + userData[userid].name + " like to buy " + amount + " pet food for " + (amount * cost) + " points?");
                            proposalMsg.setFooter("Pet food costs " + cost + " points each!");

                            let proposal; 
                            message.channel.send({ embeds: [proposalMsg] }).then(
                                sent => { proposal = sent } 
                            ).then(
                                () => {
                                    proposal.react('👍').then(() => proposal.react('👎'));
                                    const filter = (reaction, user) => {
                                        return ['👍', '👎'].includes(reaction.emoji.name) && user.id === userid;
                                    };
                                    proposal.awaitReactions({ filter, max: 1, time: 30000, errors: ['time'] })
                                    .then(
                                        collected => {
                                        const reaction = collected.first();
                                        if (reaction.emoji.name === '👍') {
                                            userData[userid].points -= amount * cost;
                                            userPet[userid].food += amount;
                                            embedMsg.setTitle('Success!');
                                            embedMsg.setColor('00FF00');
                                            embedMsg.setThumbnail('https://i.imgur.com/ActIoIR.png');
                                            embedMsg.setDescription(userData[userid].name + " buys " + amount + " pet food for " + amount * cost + " points!");
                                            message.channel.send({ embeds: [embedMsg] });
                                        } 
                                        else {
                                            embedMsg.setTitle('Declined!');
                                            embedMsg.setColor('FF0000');
                                            embedMsg.setThumbnail('https://i.imgur.com/ActIoIR.png');
                                            embedMsg.setDescription(userData[userid].name + " declined!");
                                            message.channel.send({ embeds: [embedMsg] });
                                        }
                                    })
                                    .catch(collected => {
                                        embedMsg.setTitle('Fail!');
                                        embedMsg.setColor('FF0000');
                                        embedMsg.setThumbnail('https://i.imgur.com/ActIoIR.png');
                                        embedMsg.setDescription(userData[userid].name + " took too long to respond!");
                                        message.channel.send({ embeds: [embedMsg] });
                                    });
                                }
                            );
                        }
                        else {
                            embedMsg.setTitle('Error!');
                            embedMsg.setColor('FF0000');
                            embedMsg.setDescription(userData[userid].name + " does not have " + (amount * cost) + " point(s)!");
                            embedMsg.setFooter("Pet food costs " + cost + " points each!");
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
            case 'feed':
                if (userPet[userid].pet == "0") {
                    embedMsg.setTitle('You don\'t own a pet!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription("Get a pet first!");
                    message.channel.send({ embeds: [embedMsg] });
                }
                else if (userPet[userid].dead) {
                    embedMsg.setTitle('Your pet is dead!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription("Revive your pet first!");
                    message.channel.send({ embeds: [embedMsg] });
                }
                else if (userPet[userid].hunger == 100) {
                    embedMsg.setTitle('Too Full!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription(userPet[userid].petName + " is full!");
                    embedMsg.setThumbnail(userPet[userid].image);
                    message.channel.send({ embeds: [embedMsg] });
                }
                else if (userPet[userid].food == 0) {
                    embedMsg.setTitle('No Food!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription(userData[userid].name + " is does not have food!");
                    embedMsg.setThumbnail(userPet[userid].image);
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    userPet[userid].food--;
                    userPet[userid].hunger += 25;
                    if (userPet[userid].hunger > 100) {
                        userPet[userid].hunger = 100;
                    }
                    var newTime = new Date();
                    userPet[userid].hungerTimer = newTime.getTime();
                    if (userPet[userid].deathTimer != 0) {
                        userPet[userid].deathTimer = 0;
                    }

                    embedMsg.setTitle('Fed!');
                    embedMsg.setColor('00FF00');
                    embedMsg.setDescription(userData[userid].name + " fed " + userPet[userid].petName + "!");
                    embedMsg.setThumbnail(userPet[userid].image);
                    embedMsg.setFooter("Current Hunger: " + userPet[userid].hunger + "%");
                    message.channel.send({ embeds: [embedMsg] });
                }
                break;
            case 'water':
                if (userPet[userid].pet == "0") {
                    embedMsg.setTitle('You don\'t own a pet!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription("Get a pet first!");
                    message.channel.send({ embeds: [embedMsg] });
                }
                else if (userPet[userid].dead) {
                    embedMsg.setTitle('Your pet is dead!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription("Revive your pet first!");
                    message.channel.send({ embeds: [embedMsg] });
                }
                else if (userPet[userid].hydration == 100) {
                    embedMsg.setTitle('Too Hydrated!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription(userPet[userid].petName + " is not thirsty!");
                    embedMsg.setThumbnail(userPet[userid].image);
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    userPet[userid].hydration += 25;

                    if (userPet[userid].hydration > 100) {
                        userPet[userid].hydration = 100;
                    }
                    var newTime = new Date();
                    userPet[userid].hydrationTimer = newTime.getTime();
                    if (userPet[userid].deathTimer != 0) {
                        userPet[userid].deathTimer = 0;
                    }

                    embedMsg.setTitle('Hydrated!');
                    embedMsg.setColor('00FF00');
                    embedMsg.setDescription(userData[userid].name + " gave water to " + userPet[userid].petName + "!");
                    embedMsg.setThumbnail(userPet[userid].image);
                    embedMsg.setFooter("Current Hydration: " + userPet[userid].hydration + "%");
                    message.channel.send({ embeds: [embedMsg] });
                }
                break;
            case 'clean':
                if (userPet[userid].pet == "0") {
                    embedMsg.setTitle('You don\'t own a pet!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription("Get a pet first!");
                    message.channel.send({ embeds: [embedMsg] });
                }
                else if (userPet[userid].dead) {
                    embedMsg.setTitle('Your pet is dead!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription("Revive your pet first!");
                    message.channel.send({ embeds: [embedMsg] });
                }
                else if (userPet[userid].cleanliness == 100) {
                    embedMsg.setTitle('Too Clean!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription(userPet[userid].petName + " is already clean!");
                    embedMsg.setThumbnail(userPet[userid].image);
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    userPet[userid].cleanliness += 5;
                    if (userPet[userid].cleanliness > 100) {
                        userPet[userid].cleanliness = 100;
                    }
                    var newTime = new Date();
                    userPet[userid].cleanlinessTimer = newTime.getTime();
                    embedMsg.setTitle('All Cleaned Up!');
                    embedMsg.setColor('00FF00');
                    embedMsg.setDescription(userData[userid].name + " cleaned " + userPet[userid].petName + "!");
                    embedMsg.setThumbnail(userPet[userid].image);
                    embedMsg.setFooter("Current Cleanliness: " + userPet[userid].cleanliness + "%");
                    message.channel.send({ embeds: [embedMsg] });
                }
                break;
            case 'play':
                var newTime = new Date();
                var playTime = 1000 * 60 * 5;
                if (userPet[userid].pet == "0") {
                    embedMsg.setTitle('You don\'t own a pet!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription("Get a pet first!");
                    message.channel.send({ embeds: [embedMsg] });
                }
                else if (newTime.getTime() - userPet[userid].happinessTimer < playTime) {
                    embedMsg.setTitle('Tired!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription(userPet[userid].petName + " is tired!");
                    embedMsg.setFooter("Why not wait " + Math.floor((playTime - (newTime.getTime() - userPet[userid].happinessTimer)) / 1000) + ' seconds?');
                    embedMsg.setThumbnail(userPet[userid].image);
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    var happy = 1;
                    if (userPet[userid].hunger > 20) {
                        happy += 2;
                    }
                    if (userPet[userid].hydration > 20) {
                        happy += 1;
                    }
                    if (userPet[userid].cleanliness > 20) {
                        happy += 1;
                    }

                    var levelupMsg = "";
                    var currentHappy = userPet[userid].happiness;

                    const proposalMsg = new MessageEmbed();
                    proposalMsg.setTitle('Play Time!');
                    proposalMsg.setColor('FFF000');
                    proposalMsg.setThumbnail(userPet[userid].image);
                    proposalMsg.setDescription("How would " + userData[userid].name + " like to play with " + userPet[userid].petName + "?");

                    let proposal; 
                    message.channel.send({ embeds: [proposalMsg] }).then(
                        sent => { proposal = sent } 
                    ).then(
                        () => {
                            proposal.react('👋').then(() => proposal.react('😚')).then(() => proposal.react('🎾'));
                            const filter = (reaction, user) => {
                                return ['👋', '😚', '🎾'].includes(reaction.emoji.name) && user.id === userid;
                            };
                            proposal.awaitReactions({ filter, max: 1, time: 30000, errors: ['time'] })
                            .then(
                                collected => {
                                const reaction = collected.first();
                                if (reaction.emoji.name === '👋' && userPet[userid].happiness == currentHappy) {
                                    userPet[userid].happiness += happy;
                                    if (userPet[userid].happiness >= 100) {
                                        if (userPet[userid].level != 100) {
                                            userPet[userid].level++;
                                            userPet[userid].happiness %= 100;
                                            levelupMsg = userPet[userid].petName + " leveled to level " + userPet[userid].level + "!\n\n";
                                        }
                                        else {
                                            userPet[userid].happiness = 100;
                                        }
                                    }
                
                                    userPet[userid].happinessTimer = newTime.getTime();

                                    var goodluck = ""
                                    var luck = (Math.random() * 100) + 1;
                                    if (luck <= 20) {
                                        if (luck <= 1.001) {
                                            userData[userid].points += 100000;
                                            goodluck = "\n\n" + userPet[userid].petName + " found 100000 point while playing!\n\n";
                                        }
                                        else {
                                            userData[userid].points++;
                                            goodluck = "\n\n" + userPet[userid].petName + " found 1 point while playing!\n\n";
                                        }
                                    }
                
                                    embedMsg.setTitle('Pet!');
                                    embedMsg.setColor('00FF00');
                                    embedMsg.setDescription(userData[userid].name + " pets " + userPet[userid].petName + "!\n\n" + levelupMsg 
                                     + userPet[userid].petName + ": " + pets[userPet[userid].pet].quotes[Math.floor(Math.random() * pets[userPet[userid].pet].quotes.length)] + goodluck);
                                    embedMsg.setThumbnail(userPet[userid].image);
                                    embedMsg.setFooter("Current Happiness: " + userPet[userid].happiness + "%");
                                    message.channel.send({ embeds: [embedMsg] });
                                } 
                                else if (reaction.emoji.name === '😚' && userPet[userid].happiness == currentHappy) {
                                    userPet[userid].happiness += happy;
                                    if (userPet[userid].happiness >= 100) {
                                        if (userPet[userid].level != 100) {
                                            userPet[userid].level++;
                                            userPet[userid].happiness %= 100;
                                            levelupMsg = userPet[userid].petName + " leveled to level " + userPet[userid].level + "!\n\n";
                                        }
                                        else {
                                            userPet[userid].happiness = 100;
                                        }
                                    }
                
                                    userPet[userid].happinessTimer = newTime.getTime();

                                    var goodluck = ""
                                    var luck = Math.floor(Math.random() * 101);
                                    if (luck <= 20) {
                                        userData[userid].points++;
                                        goodluck = "\n\n" + userPet[userid].petName + " found 1 point while playing!\n\n";
                                    }
                
                                    embedMsg.setTitle('Kiss!');
                                    embedMsg.setColor('00FF00');
                                    embedMsg.setDescription(userData[userid].name + " kissed " + userPet[userid].petName + "!\n\n" + levelupMsg 
                                     + userPet[userid].petName + ": " + pets[userPet[userid].pet].quotes[Math.floor(Math.random() * pets[userPet[userid].pet].quotes.length)] + goodluck);
                                    embedMsg.setThumbnail(userPet[userid].image);
                                    embedMsg.setFooter("Current Happiness: " + userPet[userid].happiness + "%");
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                else if (reaction.emoji.name === '🎾' && userPet[userid].happiness == currentHappy) {
                                    userPet[userid].happiness += happy;
                                    if (userPet[userid].happiness >= 100) {
                                        if (userPet[userid].level != 100) {
                                            userPet[userid].level++;
                                            userPet[userid].happiness %= 100;
                                            levelupMsg = userPet[userid].petName + " leveled to level " + userPet[userid].level + "!\n\n";
                                        }
                                        else {
                                            userPet[userid].happiness = 100;
                                        }
                                    }
                
                                    userPet[userid].happinessTimer = newTime.getTime();

                                    var goodluck = ""
                                    var luck = Math.floor(Math.random() * 101);
                                    if (luck <= 20) {
                                        userData[userid].points++;
                                        goodluck = "\n\n" + userPet[userid].petName + " found 1 point while playing!\n\n";
                                    }
                
                                    embedMsg.setTitle('Fetch!');
                                    embedMsg.setColor('00FF00');
                                    embedMsg.setDescription(userData[userid].name + " played fetch with " + userPet[userid].petName + "!\n\n" + levelupMsg 
                                     + userPet[userid].petName + ": " + pets[userPet[userid].pet].quotes[Math.floor(Math.random() * pets[userPet[userid].pet].quotes.length)] + goodluck);
                                    embedMsg.setThumbnail(userPet[userid].image);
                                    embedMsg.setFooter("Current Happiness: " + userPet[userid].happiness + "%");
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                                else {
                                    embedMsg.setTitle('Tired!');
                                    embedMsg.setColor('FF0000');
                                    embedMsg.setDescription(userPet[userid].petName + " is tired!");
                                    embedMsg.setFooter("Why not wait " + Math.floor((playTime - (newTime.getTime() - userPet[userid].happinessTimer)) / 1000) + ' seconds?');
                                    embedMsg.setThumbnail(userPet[userid].image);
                                    message.channel.send({ embeds: [embedMsg] });
                                }
                            })
                            .catch(collected => {
                                embedMsg.setTitle('Oh nyo!');
                                embedMsg.setColor('FF0000');
                                embedMsg.setDescription(userPet[userid].petName + " got distracted with something more fun than you!");
                                embedMsg.setThumbnail(userPet[userid].image);
                                embedMsg.setFooter("Or the dev can't find what went wrong.");
                                message.channel.send({ embeds: [embedMsg] });
                            });
                        }
                    );
                }
                break;
            case 'revive':
                if (userPet[userid].pet != "0") {
                    var cost = 100000;
                    if (!userPet[userid].dead) {
                        embedMsg.setTitle('Chill!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription(userData[userid].name + "'s pet is not dead!");
                        embedMsg.setThumbnail(userPet[userid].image);
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else if (userData[userid].points >= cost) {
                        const proposalMsg = new MessageEmbed();
                        proposalMsg.setTitle('Reviving a Pet!');
                        proposalMsg.setColor('FFF000');
                        proposalMsg.setThumbnail(userPet[userid].image);
                        proposalMsg.setDescription("Would " + userData[userid].name + " like to revive their pet for " + cost + " points?");
    
                        let proposal; 
                        message.channel.send({ embeds: [proposalMsg] }).then(
                            sent => { proposal = sent } 
                        ).then(
                            () => {
                                proposal.react('👍').then(() => proposal.react('👎'));
                                const filter = (reaction, user) => {
                                    return ['👍', '👎'].includes(reaction.emoji.name) && user.id === userid;
                                };
                                proposal.awaitReactions({ filter, max: 1, time: 30000, errors: ['time'] })
                                .then(
                                    collected => {
                                    const reaction = collected.first();
                                    if (reaction.emoji.name === '👍') {
                                        userData[userid].points -= cost;

                                        userPet[userid].dead = false;
                                        userPet[userid].deathTimer = 0;
                                        userPet[userid].happinessTimer = 0;
                                        userPet[userid].level = 1;
                                        userPet[userid].hunger = 25;
                                        userPet[userid].hydration = 25;
                                        userPet[userid].cleanliness = 0;
                                        userPet[userid].happiness = 0;

                                        var newTime = new Date();
                                        userPet[userid].hungerTimer = newTime.getTime();
                                        userPet[userid].hydrationTimer = newTime.getTime();
                                        userPet[userid].cleanlinessTimer = newTime.getTime();
                                        
                                        embedMsg.setTitle('Congratz!');
                                        embedMsg.setColor('00FF00');
                                        embedMsg.setDescription(userData[userid].name + " revived " + userPet[userid].petName + "!");
                                        embedMsg.setThumbnail(userPet[userid].image);
                                        embedMsg.setFooter("Don't let it happen again!");
                                        message.channel.send({ embeds: [embedMsg] });
                                    } 
                                    else {
                                        embedMsg.setTitle('Declined!');
                                        embedMsg.setColor('FF0000');
                                        embedMsg.setThumbnail(userPet[userid].image);
                                        embedMsg.setDescription(userData[userid].name + " declined!");
                                        message.channel.send({ embeds: [embedMsg] });
                                    }
                                })
                                .catch(collected => {
                                    embedMsg.setTitle('Fail!');
                                    embedMsg.setColor('FF0000');
                                    embedMsg.setDescription(userData[userid].name + " took too long to respond!");
                                    embedMsg.setThumbnail(userPet[userid].image);
                                    message.channel.send({ embeds: [embedMsg] });
                                });
                            }
                        );
                    }
                    else {
                        embedMsg.setTitle('Error!');
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription("Reviving a pet costs 50000 points!");
                        embedMsg.setThumbnail(userPet[userid].image);
                        embedMsg.setFooter('Wow, you can\'t even afford to revive your pet!');
                        message.channel.send({ embeds: [embedMsg] });
                    }
                }
                else {
                    embedMsg.setTitle('You don\'t own a pet!');
                    embedMsg.setColor('FF0000');
                    embedMsg.setDescription("Get a pet first!");
                    message.channel.send({ embeds: [embedMsg] });
                }
                break;
            case 'dex':
            case 'gacha':
                var target = client.users.cache.get(userid);
                embedMsg.setAuthor({ name: userData[userid].name, iconURL: target.displayAvatarURL() });
                embedMsg.setTitle('Pets!');
                embedMsg.setColor('FFF000');
                if (args.length > 1) {
                    var selected = args[1] - 1;
                    if (!isNaN(Number(selected)) && pets[Math.floor(selected / 4) + 1]) {
                        embedMsg.setDescription("#" + (selected + 1) + ". " + pets[Math.floor(selected / 4) + 1].names[selected % 4] + "\n");
                        embedMsg.setThumbnail(pets[Math.floor(selected / 4) + 1].images[selected % 4]);
                        embedMsg.addField('Species: ', "" + pets[Math.floor(selected / 4) + 1].species);
                        embedMsg.addField('Type: ', "" + ((selected % 4) + 1));

                        var chance = "";
                        switch((selected % 4) + 1) {
                            case 4:
                                chance = "4%"
                                break;
                            case 3:
                                chance = "16%"
                                break;
                            default:
                                chance = "40%"
                                break;
                        }

                        embedMsg.addField('Chance: ', "" + chance);
                        message.channel.send({ embeds: [embedMsg] });
                    }
                    else {
                        embedMsg.setColor('FF0000');
                        embedMsg.setDescription('This pet does not exist!');
                        message.channel.send({ embeds: [embedMsg] }); 
                    }
                }
                else {
                    var petDisplay = [""];
                    var index = 0;
                    var count = 0;
                    var keys = [];
                    for (var k in pets) {
                        keys.push(k);
                    }
                    for (let i = 0; i < (keys.length * 4); i++) {
                        if (count >= 10) {
                            index++;
                            count = 0;
                            petDisplay[index] = "";
                        }
                        petDisplay[index] += "#" + (i + 1) + ". " + pets[Math.floor(i / 4) + 1].names[i % 4] + "\n";
                        count++;
                    }

                    let pages = [];
                    for (let i = 0; i < petDisplay.length; i++) {
                        pages.push("```" + petDisplay[i] + "```");
                    }

                    let page = 1;
                    embedMsg
                        .setFooter(`Page ${page} of ${pages.length}`)
                        .setDescription(pages[page-1])
                        .setAuthor({ name: userData[userid].name, iconURL: target.displayAvatarURL() })
                        .setTitle('Pets')
                        .setThumbnail('https://i.imgur.com/k6sloj8.png')
                        .setColor('FFF000');

                    message.channel.send({ embeds: [embedMsg] }).then(msg => {
                        msg.react("◀️").then(r => {
                            msg.react("▶️")

                            const filter = (reaction, user) => ["◀️", "▶️"].includes(reaction.emoji.name) && user.id === userid;
                            const collector = msg.createReactionCollector({ filter, time: 1000 * 120 });

                            collector.on('collect', r => {
                                embedMsg.setAuthor({ name: userData[userid].name, iconURL: target.displayAvatarURL() });
                                embedMsg.setTitle('Pets');
                                embedMsg.setColor('FFF000');
                                
                                if (r.emoji.name === "◀️") {
                                    if (page === 1) {
                                        r.users.remove(userid);
                                        return;
                                    }
                                    page--;
                                    embedMsg.setDescription(pages[page-1]);
                                    embedMsg.setFooter(`Page ${page} of ${pages.length}`);
                                    msg.edit({ embeds: [embedMsg] });
                                }
                                else if (r.emoji.name === "▶️") {
                                    if (page === pages.length) {
                                        r.users.remove(userid);
                                        return;
                                    }
                                    page++;
                                    embedMsg.setDescription(pages[page-1]);
                                    embedMsg.setFooter(`Page ${page} of ${pages.length}`);
                                    msg.edit({ embeds: [embedMsg] });
                                }
                                r.users.remove(userid);
                            })

                        })
                    });
                }
                break;
            case 'leaderboard':
                var keys = [];
                for (var k in userPet) {
                    keys.push(k);
                }
        
                keys.sort((firstEl, secondEl) => { 
                    if (userPet[firstEl].level > userPet[secondEl].level) {
                        return -1;
                    }
                    if (userPet[firstEl].level < userPet[secondEl].level) {
                        return 1;
                    }
                    return 0;
                });
        
                var names = [""];
                var levels = [""];
                var ranks = [""];
        
                var index = 0;
                var count = 0;
        
                for (var i = 0; i < keys.length; i++) {
                    if (count >= 20) {
                        count = 0;
                        index++;
                        names[index] = "";
                        levels[index] = "";
                        ranks[index] = "";
                    }
                    if (userPet[keys[i]].pet != 0) {
                        names[index] += userData[keys[i]].name + " - " + userPet[keys[i]].petName + " (" + pets[userPet[keys[i]].pet].names[userPet[keys[i]].type] + ")\n";
                        levels[index] += userPet[keys[i]].level + "⠀⠀⠀\n";
                        ranks[index] += "" + (i + 1) + ".\n";
                        count++;
                    }
                    else {
                        names[index] += userData[keys[i]].name + " - N/A\n";
                        levels[index] += userPet[keys[i]].level + "⠀⠀⠀\n";
                        ranks[index] += "" + (i + 1) + ".\n";
                        count++;
                    }
                }
        
                let page = 1;
        
                embedMsg
                .setTitle("**__The Pet Leaderboard__**")
                .setThumbnail('https://media3.giphy.com/media/LAWN8PxCVRPqBAW8D4/giphy.gif')
                .setColor('FFF000')
                .setFooter(`Page ${page} of ${ranks.length}`)
                .setFields(
                    {name: "**__Rank__**", value: ranks[page-1], inline: true},
                    {name: "**__Player__**", value: names[page-1], inline: true},
                    {name: "**__Level__**", value: levels[page-1], inline: true}
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
                                    {name: "**__Level__**", value: levels[page-1], inline: true}
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
                                    {name: "**__Level__**", value: levels[page-1], inline: true}
                                )
                                msg.edit({ embeds: [embedMsg] });
                            }
                            r.users.remove(userid);
                        })
        
                    })
                });
                break;
            default:
                var target = client.users.cache.get(userid);
                embedMsg.setAuthor({ name: userData[userid].name, iconURL: target.displayAvatarURL() });
                embedMsg.setTitle('Pet Info');
                embedMsg.setColor('FFF000');

                var max = 20;
                var each = 5;
                var hunger = "";
                var hydration = "";
                var cleanliness = "";
                var happiness = "";

                for (let i = 0; i < Math.floor(userPet[userid].hunger / each); i++) {
                    hunger += "█";
                }
                for (let i = Math.floor(userPet[userid].hunger / each); i < max; i++) {
                    hunger += " ";
                }
                hunger = "``" + hunger + "``";

                for (let i = 0; i < Math.floor(userPet[userid].hydration / each); i++) {
                    hydration += "█";
                }
                for (let i = Math.floor(userPet[userid].hydration / each); i < max; i++) {
                    hydration += " ";
                }
                hydration = "``" + hydration + "``";

                for (let i = 0; i < Math.floor(userPet[userid].cleanliness / each); i++) {
                    cleanliness += "█";
                }
                for (let i = Math.floor(userPet[userid].cleanliness / each); i < max; i++) {
                    cleanliness += " ";
                }
                cleanliness = "``" + cleanliness + "``";

                for (let i = 0; i < Math.floor(userPet[userid].happiness / each); i++) {
                    happiness += "█";
                }
                for (let i = Math.floor(userPet[userid].happiness / each); i < max; i++) {
                    happiness += " ";
                }
                happiness = "``" + happiness + "``";

                var status = "Healthy";
                if (userPet[userid].dead) {
                    status = "Dead";
                }
                else if (userPet[userid].hunger <= 20 && userPet[userid].hydration <= 20) {
                    var newTime = new Date();
                    status = "Dying";
                }
                else if (userPet[userid].hunger <= 20) {
                    status = "Hungry";
                }
                else if (userPet[userid].hydration <= 20) {
                    status = "Thirsty";
                }
                
                if (userPet[userid].pet != "0") {
                    embedMsg.setThumbnail(userPet[userid].image);
                    embedMsg.addFields(
                        { name: "__Pet__ :feet:", value: "" + userPet[userid].petName, inline: false },
                        { name: "__Type__ :rainbow:", value: "" + (userPet[userid].type + 1), inline: true },
                        { name: "__Level__ :rocket:", value: "" + userPet[userid].level, inline: true },
                        { name: "__Food__ :hamburger:", value: "" + userPet[userid].food, inline: true },
                        { name: "__Hunger__: " + userPet[userid].hunger + "% :meat_on_bone:", value: "" + hunger, inline: false },
                        { name: "__Hydration__: " + userPet[userid].hydration + "% :droplet:", value: "" + hydration, inline: false },
                        { name: "__Cleanliness__: " + userPet[userid].cleanliness + "% :soap:", value: "" + cleanliness, inline: false },
                        { name: "__Happiness__: " + userPet[userid].happiness + "% :smile:", value: "" + happiness, inline: false },
                        { name: "__Status__ :heart:", value: "" + status, inline: false }
                    );
                    message.channel.send({ embeds: [embedMsg] });
                }
                else {
                    embedMsg.setDescription("No pet :(");
                    message.channel.send({ embeds: [embedMsg] });
                }
                break;
        }
    }
}
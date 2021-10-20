const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: 'setup',
    aliases: ['musicsetup'],
    cooldown: 10,
    usage: "setup",
    description: "Creates an unique Music Setup for Requesting Songs!",
    memberpermissions: ["ADMINISTRATOR"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        // code here
        message.guild.channels.create("Muzică pe sărăcie", {
            type: 'category',
            permissionOverwrites: [{
                id: message.guild.id,
                allow: ['VIEW_CHANNEL'],
            },],
        }).then((channel1) => {
            //set the maximumbitrate limit
            let maxbitrate = 96000;
            //get the boosts amount
            let boosts = message.guild.premiumSubscriptionCount;
            if (boosts >= 2) maxbitrate = 128000;
            if (boosts >= 15) maxbitrate = 256000;
            if (boosts >= 30) maxbitrate = 384000;
            message.guild.channels.create(`🎧｜POVERTY KING LOBBY`, {
                type: 'voice', //voice Channel
                bitrate: maxbitrate, //set the bitrate to the maximum possible
                userLimit: 30, //set the limit for voice users
                parent: channel1.id, //ADMINISTRATOR
                permissionOverwrites: [{
                    id: message.guild.id,
                    allow: ['VIEW_CHANNEL', "CONNECT"],
                },],
            }).then((channel2) => {
                message.guild.channels.create(`aici-se-nasc-hiturile`, {
                    type: 'text', // text channel
                    rateLimitPerUser: 6, //set chat delay
                    topic: `Made by chindruș`,
                    parent: channel1.id,
                    permissionOverwrites: [{
                        id: message.guild.id,
                        allow: ['VIEW_CHANNEL', "SEND_MESSAGES", "ADD_REACTIONS"],
                    },
                    { //giving the Bot himself permissions
                        id: client.user.id,
                        allow: ["MANAGE_MESSAGES", "MANAGE_CHANNELS", "ADD_REACTIONS", "SEND_MESSAGES", "MANAGE_ROLES"]
                    }
                    ],
                }).then((channel3) => {
                    message.reply(`Setting up in <#${channel3.id}>`)
                    let pehla = new MessageEmbed()
                        .setColor(config.colors.yes)
                        .setThumbnail(client.user.displayAvatarURL())
                        .setAuthor(message.author.username)
                        .setTitle("Poverty KING Music | Request | Guide")
                        .setDescription(`Enter the song name or URL to play a song\n\n For Example ${config.prefix}play \`Arde și seduce \``)
                        .setFooter("Made By chindruș")

                    let dusra = new MessageEmbed()
                        .setColor(config.colors.yes)
                        .setThumbnail(client.user.displayAvatarURL())
                        .setAuthor(message.author.username)
                        .setTitle("Poverty King-Cel mai bun bot de muzică")
                        .setDescription(`Join a voice channel and enter a song name or url to play.\n[Invite Poverty King](https://discord.com/oauth2/authorize?client_id=884519699612831765&scope=bot) • [Intră pe server](https://discord.gg/c7FpYVxMYm) • [Abonează-te acum ](https://www.youtube.com/channel/UC4tt25Zkp99YPBl2JOoJuZg)`)
                        .setImage('https://i.postimg.cc/ZqqQg1ng/desc-rcare.png')
                        .setFooter("Made By chindrușツ#4965")

                    //send a temp message
                    channel3.send(new MessageEmbed().setColor(config.colors.yes).setDescription("Setting Up..")).then(msg => {
                        //edit the message again
                        msg.edit(pehla)
                        //save it in the database
                        // client.setups.set(message.guild.id, msg.id, "message_queue_info");

                    })


                    //send a temp message
                    channel3.send(new MessageEmbed().setColor(config.colors.yes).setDescription("Setting Up..")).then(msg => {
                        //edit the message again
                        msg.edit(dusra)
                        //save it in the database
                        // client.setups.set(message.guild.id, msg.id, "message_queue_info");

                        // // send a reaction message 
                        // channel3.send(new MessageEmbed().setColor(config.colors.yes).setDescription("Setting Up..")).then( async msg => {
                        //     msg.edit(dusra)
                        //     //react with all reactions
                        //     await msg.react("⏭") // skip song
                        //     await msg.react("⏹") // stop song
                        //     await msg.react("🔉") // down volume
                        //     await msg.react("🔊") // up volume
                        //     await msg.react("⬅️") // forward 10s 
                        //     await msg.react("➡️") // backward 10s
                        //     await msg.react("♾") // loop all songs
                       // })

            
                    })
                })
            })
        })
    }
}
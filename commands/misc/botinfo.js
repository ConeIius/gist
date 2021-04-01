const discord = require("discord.js")
const moment = require("moment")
const db = require("quick.db")
require("moment-duration-format");

module.exports.run = async (bot, message, args) => {
  
  let prefix = db.fetch(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = bot.config.prefix
  let inline = true
    let bicon = bot.user.displayAvatarURL();
    let usersize = bot.users.cache.size
    let chansize = bot.channels.cache.size
    let uptimxd = bot.uptime 
    let servsize = bot.guilds.cache.size
    var ping = Date.now() - message.createdTimestamp + " ms";
  const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    let botembed = new discord.MessageEmbed()
    .setColor(bot.config.blue)
    .setThumbnail(bicon)
    .addField("Bot Name", ` ${bot.user.username}`, inline)
    .addField("Bot Owner", "<@!402490971041824768>", inline )
    .addField("Servers", ` ${servsize}`, inline)
    .addField("Users", ` ${usersize}`, inline)
    .addField("Prefix" , prefix)
    .addField("Bot Library", "Discord.js", inline)
    .addField("Created On", bot.user.createdAt, inline)
    .addField("Prefix" , prefix)
    .addField("Bots Ping" , ping, inline)
    .addField("Bots Uptime" , duration, inline)
    .addField("Links" , "[Invite The Bot](https://discordapp.com/oauth2/authorize?client_id=763017877481062411&scope=bot&permissions=1345441014) - [Support Server](https://discord.gg/)", inline)
    .setFooter(`Requested By: ${message.author.tag}`)
    .setTimestamp()
    
    message.channel.send(botembed);
}

module.exports.help = {
  name: "botinfo",
  aliases: [],
  description: "Check information about the bot",
  usage: " ",
  category: "misc"
}
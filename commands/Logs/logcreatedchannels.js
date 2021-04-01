const discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async(client, message, args) => {
  const embed10 = new discord.MessageEmbed()
  .setColor(client.config.red) 
  .setTitle("You need the 'Administrator' permission to execute this command")
 let perms = message.member.hasPermission("ADMINISTRATOR")
 if(!perms) return message.channel.send(embed10)
 
 let prefix = db.fetch(`prefix_${message.guild.id}`)
if(prefix === null) prefix = client.config.prefix
 
  let logchannel = db.fetch(`logchannel_${message.guild.id}`)
  if(logchannel === null) {
    const embed = new discord.MessageEmbed()
    .setColor(client.config.red)
    .setDescription(`You did not setup the ${prefix}logchannel\nTo set it up: ${prefix}setlogchannel <#channel>`)
    return message.channel.send(embed)
  }
  let log = db.fetch(`createdchannels_${message.guild.id}`)
  
  const embed = new discord.MessageEmbed()
  .setColor(client.config.red)
  .setTitle(`To use it:\n${prefix}logcreatedchannels on - Turns it on\n${prefix}logcreatedchannels off - Turns it off`)
  if(!args[0]) return message.channel.send(embed)
  //if(!args[0] === "on") return message.channel.send(embed)
  //if (!args[0] === "off") return message.channel.send(embed)
  
 /* if(!args[0]=== "on" || !args[0] === "off") return message.channel.send(new discord.MessageEmbed().setColor("RED").setTitle("Please specify between 'On' or 'Off'"))*/
 if(!["on","off"].includes(args[0])) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("Please specify between On and Off"))
  
  if(args[0] === "on") {
    let embed = new discord.MessageEmbed()
    .setColor(client.config.red)
    .setTitle("It is already on, you cannot turn it on again.")
    if(log === 1) return message.channel.send(embed)
    
    let embed2 = new discord.MessageEmbed()
    .setColor(client.config.red)
    .setTitle("All created channels will be now logged")
    db.add(`createdchannels_${message.guild.id}`, 1)
    return message.channel.send(embed2)
  }
  if(args[0] === "off") {
    let embed = new discord.MessageEmbed()
        .setColor(client.config.red)
    .setTitle("It is already off, you cannot turn it off again.")
    if(log === null || log === 0) return message.channel.send(embed)
    
    let embed2 = new discord.MessageEmbed()
    .setColor(client.config.green)
    .setTitle("All created channels will no longer be logged")
    db.delete(`createdchannels_${message.guild.id}`)
    return message.channel.send(embed2)
  }
}

module.exports.help = {
  name: "logcreatedchannels",
  aliases: ["createdchannels"],
  description: "Log all created channels if it is on, if off it wont be logging anything",
  usage: "<on | off>",
  category: "Logs"
}
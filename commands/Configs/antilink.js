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
 
  let log = db.fetch(`antilink_${message.guild.id}`)
  
  const embed = new discord.MessageEmbed()
  .setColor(client.config.red)
  .setTitle(`To use it:\n${prefix}antilink on - Turns it on\n${prefix}antilink off - Turns it off`)
  if(!args[0]) return message.channel.send(embed)
  
 if(!["on","off"].includes(args[0])) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("Please specify between On and Off"))
  
  if(args[0] === "on") {
    let embed = new discord.MessageEmbed()
    .setColor(client.config.red)
    .setTitle("It is already on, you cannot turn it on again.")
    if(log === 1) return message.channel.send(embed)
    
    let embed2 = new discord.MessageEmbed()
    .setColor(client.config.red)
    .setTitle("All invites will be now deleted")
    db.add(`antilink_${message.guild.id}`, 1)
    return message.channel.send(embed2)
  }
  if(args[0] === "off") {
    let embed = new discord.MessageEmbed()
        .setColor(client.config.red)
    .setTitle("It is already off, you cannot turn it off again.")
    if(log === null || log === 0) return message.channel.send(embed)
    
    let embed2 = new discord.MessageEmbed()
    .setColor(client.config.green)
    .setTitle("All links will no longer be deleted")
    db.delete(`antilink_${message.guild.id}`)
    return message.channel.send(embed2)
  }
}

module.exports.help = {
  name: "antilink",
  aliases: [],
  description: "Logs and deletes all links if it is on, if off it wont be logging and deleting anything",
  usage: "<on | off",
  category: "Configs"
}
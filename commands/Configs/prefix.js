const discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new discord.MessageEmbed().setColor("RED").setTitle("You need the 'Administrator' permission to use this command"))
  let prefix = db.fetch(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = client.config.prefix
  
  let newprefix = args[0]
  
    if(!newprefix) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You need to tell me the prefix"))

  if(newprefix === "remove"){
    if(prefix === client.config.prefix){
      return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle(`My default prefix is already **${prefix}**`))
    }
    db.delete(`prefix_${message.guild.id}`)
    return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle(`I have reset my prefix to **${prefix}**`))
  }
  
  if(prefix === newprefix) {
    return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle(`My prefix is already **${newprefix}**`))
  }
  
  
  if(newprefix === client.config.prefix){
    db.delete(`prefix_${message.guild.id}`)
    return message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle("I've reset my prefix back to default which is **" + client.config.prefix + "**"))
  }
  
  
    if(newprefix.length > 5) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("The prefix cant be more than 5 characters"))
  
  db.set(`prefix_${message.guild.id}`, newprefix)
  message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle(`Changed the server prefix to **${newprefix}**`))
}
module.exports.help = {
  name: "prefix",
  aliases: ["setprefix"],
  description: "Change the servers prefix",
  usage: "<prefix>",
  category: "Configs"
}
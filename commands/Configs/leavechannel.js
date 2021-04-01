const discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setDescription("You need the 'Administrator' permission to be able to use this command"))
  
  
  let prefix = db.fetch(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = client.config.prefix
  let logchannel = db.fetch(`leave_${message.guild.id}`)
  
  let channel = message.mentions.channels.first()
  if(!channel) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You forgot to mention a channel").setFooter("To remove the leave channel type " + `${prefix}leave remove`))
  if(channel.id === logchannel) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("This channel is already my welcome channel"))
  
  
  if(channel === args[0]){
    if(!["remove"].includes(channel)) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle(`You forgot to specify a channel to set as the leave channel. If you would like to remove it type ${prefix}leave remove`))
    
  if(channel === "remove") {
    db.delete(`leave_${message.guild.id}`)
   return message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle("Leave channel has been successfully removed"))
  }
}
 
  
  /*if(channel === "remove") {
    db.delete(`leave_${message.guild.id}`)
   return message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle("Leave channel has been successfully removed"))
  }*/
  
  
  db.set(`leave_${message.guild.id}`, channel.id)
  
  message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle(`Leave channel has been set to #${channel.name}`).setFooter("To remove the logchannel type " + `${prefix}Leave remove`))
}
module.exports.help = {
  name: "leave",
  aliases: ["leavechannel"],
  description: "Set a Leave channel for when a user leave",
  usage: "<#channel>",
  category: "Configs"
}
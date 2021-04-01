const discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You need the 'Administrator' permission to be able to use this command"))
  
  let prefix = db.fetch(`prefix_${message.guild.id}`)
if(prefix === null) prefix = client.config.prefix
  
  let logchannel = db.fetch(`logchannel_${message.guild.id}`)
  
  let channel = message.mentions.channels.first() || args[0]
  if(!channel) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You forgot to mention a channel").setFooter("To remove the logchannel type " + `${prefix}logchannel remove`))
  if(channel.id === logchannel) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("This channel is already my logchannel"))
 /* if(channel === "remove") {
    db.delete(`logchannel_${message.guild.id}`)
   return message.channel.send(new discord.MessageEmbed().setColor(clien.config.green).setTitle("Logchannel has been successfully removed"))
  }*/
  if(channel === args[0]){
    if(!["remove"].includes(channel)) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle(`You forgot to specify a channel to set as the logchannel channel. If you would like to remove it type ${client.config.prefix}logchannel remove`))
    
  if(channel === "remove") {
    db.delete(`logchannel_${message.guild.id}`)
   return message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle("Logchannel channel has been successfully removed"))
}
}
  
  db.set(`logchannel_${message.guild.id}`, channel.id)
  
  message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle(`Log channel has been set to #${channel.name}`).setFooter("To remove the logchannel type " + `${prefix}logchannel remove`))
}
module.exports.help = {
  name: "logchannel",
  aliases: ["logs", "auditlogs"],
  description: "Set an audit log for moderation commands",
  usage: "<#channel>",
  category: "Logs"
}
const discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setDescription("You need the 'Administrator' permission to be able to use this command"))
  
  let prefix = db.fetch(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = client.config.prefix
  
  let logchannel = db.fetch(`welcome_${message.guild.id}`)
  
  //let autorole = db.fetch(``)
  
  let channel = message.mentions.channels.first() || args[0]
  if(!channel) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You forgot to mention a channel").setFooter("To remove the welcome channel type " + `${client.config.prefix}welcome remove - Remove the channel`))
  
  if(channel.id === logchannel) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("This channel is already my welcome channel"))
  
if(channel === args[0]){
    if(!["remove"].includes(channel)) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle(`You forgot to specify a channel to set as the welcome channel. If you would like to remove it type ${prefix}welcome remove`))
    
  if(channel === "remove") {
    db.delete(`welcome_${message.guild.id}`)
   return message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle("Welcome channel has been successfully removed"))
  }
}
  
  db.set(`welcome_${message.guild.id}`, channel.id)
  
  message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle(`Welcome channel has been set to #${channel.name}`).setFooter("To remove the logchannel type " + `${prefix}welcome remove`))
}
module.exports.help = {
  name: "welcome",
  aliases: ["welcomechannel"],
  description: "Set an audit log for moderation commands",
  usage: "<#channel>",
  category: "Configs"
}
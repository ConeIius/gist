const discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setDescription("You need the 'Administrator' permission to be able to use this command"))
  
  let prefix = db.fetch(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = client.config.prefix
  
  let logchannel = db.fetch(`suggestion_${message.guild.id}`)
  
  //let autorole = db.fetch(``)
  
  let channel = message.mentions.channels.first() || args[0]
  if(!channel) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You forgot to mention a channel").setFooter("To remove the suggestion channel type " + `${prefix}suggestionchannel remove - Remove the channel`))
  
  if(channel.id === logchannel) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("This channel is already my suggestion channel"))
  
if(channel === args[0]){
    if(!["remove"].includes(channel)) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle(`You forgot to specify a channel to set as the suggestion channel. If you would like to remove it type ${prefix}suggestionchannel remove`))
    
  if(channel === "remove") {
    db.delete(`suggestion_${message.guild.id}`)
   return message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle("Suggestion channel has been successfully removed"))
  }
}
  
  db.set(`suggestion_${message.guild.id}`, channel.id)
  
  message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle(`Suggestion channel has been set to #${channel.name}`).setFooter("To remove the suggestion type " + `${prefix}suggestionchannel remove`))
}
module.exports.help = {
  name: "suggestionchannel",
  aliases: ["setsuggestionchannel", "suggestionchannels", "setsuggestionchannels"],
  description: "Set a custom suggestion channe for new suggestions",
  usage: "<#channel>",
  category: "Configs"
}
const discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
  let logchannel = db.fetch(`logchannel_${message.guild.id}`)
  let prefix = db.fetch(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = client.config.prefix
  
  if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You need the 'Manage Channels' permission to use this command"))
  
 // let channel = message.mentions.channels.first() || message.channel
  
  if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("I need the 'Manage Channels' permission to use this command"))
  
  if(message.channel.id === logchannel) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You cannot nuke my audit log\nIf you would like to nuke this channel please run " + `${prefix}logchannel remove then run ${prefix}nuke`))
  
  let position = message.channel.position
  
  message.channel.clone()
  message.channel.delete()
  
  message.channel.setPosition(position)
  
  if(!logchannel) return
  let lchan = message.guild.channels.cache.get(logchannel)
  if(!lchan) return
  lchan.send(new discord.MessageEmbed().setColor(client.config.GREEN).setTitle("Channel Nuked").addField("Staff" , `${message.author} (${message.author.id})`, true).addField("Channel" , `#${message.channel.name} (${message.channel.id})`))
  
}

module.exports.help = {
  name: "nuke",
  aliases: ["nukechannel"],
  description: "Delete / Nuke all messages in a specific channel",
  usage: " ",
  category: "Moderation"
}
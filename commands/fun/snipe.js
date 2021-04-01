const db = require("quick.db")
const discord = require("discord.js")

module.exports.run = async (client, message, args) => {
  let udel = db.fetch(`lastdeleteuser_${message.guild.id}_${message.channel.id}`)
  if(udel === null) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("No recent message deleted in this channel"))
  let mdel = db.fetch(`lastdelete_${message.guild.id}_${message.channel.id}`)
  
  let user = message.guild.members.cache.get(udel)
  if(!user) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("No recent snipe in this channel"))
  
  let text;
  
  if(udel === null || mdel === null){
    let text = `No recent snipe in this channel`
    const embed = new discord.MessageEmbed()
    .setColor(client.config.red)
    .setTitle(`${text}`)
    return message.channel.send(embed)
  }

const embed = new discord.MessageEmbed()
    .setColor(client.config.green)
    .setTitle(`${user.user.username}'s latest message deleted:`)
    .setDescription(`**${mdel}**`)
    message.channel.send(embed)
}

module.exports.help = {
  name: "snipe",
  aliases: ["lastmessage"],
  description: "Get the latest message deleted in a certain channel",
  usage: " ",
  category: "Fun"
}
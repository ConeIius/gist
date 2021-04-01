const discord = require("discord.js")

module.exports.run = async (client, message, args) => {
  let text = args[0]
  if(!text) return message.channel.send(
  new discord.MessageEmbed()
  .setColor(client.config.red)
  .setTitle("You forgot to specify between `welcome` and `leave`")
  )
  
  if(!["welcome", "leave"]) return message.channel.send(
  new discord.MessageEmbed()
  .setColor(client.config.red)
  .setTitle("You didnt specify between `welcome` and `leave`")
  )
  
  if(text.toLowerCase() === "welcome"){
    message.channel.send(
    new discord.MessageEmbed()
    .setColor(client.config.blue)
    .setTitle("Welcome Variables\n\n{user} - Mentions the user\n{guild} - Says the guild name\n{count} - The member count\n\nExample: {user} just joined {guild}. This server now has {count} members")
      )
  }
  
    if(text.toLowerCase() === "leave"){
    message.channel.send(
    new discord.MessageEmbed()
    .setColor(client.config.blue)
    .setTitle("Welcome Variables\n\n{user} - Mentions the user\n{guild} - Says the guild name\n{count} - The member count\n\nExample: {user} just left {guild}. This server now has {count} members")
      )
  }

  
}

module.exports.help = {
  name: "variable",
  aliases: ["variables", "vars"],
  description: "Check variables for the welcome and leave messages",
  usage: "<welcome | leave>",
  category: "misc"
}
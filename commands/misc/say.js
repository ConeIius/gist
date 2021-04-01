const discord = require("discord.js")

module.exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You need the 'Manage Messages' permission to use this command"))
  
  if(!args.slice(0).join(" ")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You did not tell me what to say"))
  
  message.delete().catch(err => {console.log(err)})
  message.channel.send(args.slice(0).join(" "))
  
}

module.exports.help = {
  name: "say",
  aliases: ["talk"],
  description: "Make the bot say something",
  usage: "<text>",
  category: "Misc"
}
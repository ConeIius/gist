const discord = require("discord.js")

module.exports.run = async (client, message, args) => {
  
  message.channel.send(new discord.MessageEmbed().setColor(client.config.blue).setTitle(`This server has ${message                                                                             .guild.memberCount} members`))
  
}

module.exports.help = {
  name: "membercount",
  aliases: [],
  description: "Check how many members the server has",
  usage: "",
  category: "Misc"
}
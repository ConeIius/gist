const discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You need the 'Administrator' permission to use this command"))
  let dbembed = db.fetch(`ccembed_${message.guild.id}`)
  
  if(dbembed === false || dbembed === null){
    db.set(`ccembed_${message.guild.id}`, true)
    message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle("All custom commands will now be embeds"))
  }
  
  if(dbembed === true){
    db.set(`ccembed_${message.guild.id}`, false)
    message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("All custom commands will no longer be embeds"))
  }
}

module.exports.help = {
  name: "ccembed",
  aliases: ["customcommandembed", "customcembed", "ccommandembed", "cce"],
  description: "Enable or disable if custom commands are in embeds or not",
  usage: " ",
  category: "Configs"
}
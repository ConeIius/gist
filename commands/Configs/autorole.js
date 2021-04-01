const discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setDescription("You need the 'Administrator' permission to be able to use this command"))
  let prefix = db.fetch(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = client.config.prefix
  
  let welcome = db.fetch(`welcome_${message.guild.id}`)
  let wchan = message.guild.channels.cache.get(welcome)
  if(!wchan || welcome === null) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You need to have a welome channel set to use this command\n Do " + `${prefix}welcomechannel <#channel> to setuo a welcome channel`))
  
  let role = message.mentions.roles.first() || args[0]
  if(!role) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You forgot to mention the role. If you would lie to remove the autorole please type " + `${client.config.prefix}autrole remove to remove the autorole`))
  
  if(role === args[0]){
    if(!["remove"].includes(channel)) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle(`You forgot to specify a role to set as the auto role. If you would like to remove it type ${client.config.prefix}autorole remove`))
    
  if(role === "remove") {
    db.delete(`welcome_${message.guild.id}`)
   return message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle("Auto role has been successfully removed"))
  }
}
 
  
 /* if(role === "remove"){
    db.delete(`autorole_${message.guild.id}`)
    return message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle("I have sucessfully removed the autorole"))
  }*/
  
  db.set(`autorole_${message.guild.id}`, role.id)
  
  message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle(`Auto Role has been set as @${role.name}\nIf you would like to remove the role please type ${client.config.prefix}autorole remove`))
}

module.exports.help = {
  name: "autorole",
  aliases: ["setupautorole"],
  description: "Set a role for when someone joins the server",
  usage: "<@role>",
  category: "Configs"
}
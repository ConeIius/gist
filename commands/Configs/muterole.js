const discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setDescription("You need the 'Administrator' permission to be able to use this command"))
  
  let prefix = db.fetch(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = client.config.prefix
  
  let role = message.mentions.roles.first() || args[0]
  if(!role) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You forgot to mention the role").setFooter(`To remove the role use ${prefix}muterole remove`))
  
  if(role === args[0]){
    if(!["remove"].includes(channel)) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle(`You forgot to specify a role to set as the muterole. If you would like to remove it type ${prefix}muterole remove`))
    
  if(role === "remove") {
    db.delete(`muterole_${message.guild.id}`)
   return message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle("Mute Role has been successfully removed"))
  }
}
 
  
  db.set(`muterole_${message.guild.id}`, role.id)
  
  message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle(`Mute Role has been set as @${role.name}`))
}

module.exports.help = {
  name: "muterole",
  aliases: ["setupmuterole"],
  description: "Set a specific mute role, default role is 'Muted'",
  usage: "<@role>",
  category: "Configs"
}

const discord = require("discord.js")
const db = require("quick.db")
module.exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You need the 'Ban Membes' permission to use this command"))
  
  if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("I need the 'Ban Members' permission to use this command"))
  
  //message.delete()

let logchannel = db.get(`logchannel_${message.guild.id}`)   
  
    let user = await client.users.fetch(args[0])
    const embed5 = new discord.MessageEmbed()
    .setColor("RED")
    .setDescription("You did not specify a user")
    if(!user) return message.channel.send(embed5)
  if(user.id === message.author.id) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You aren't banned you know?"))
  
    
    let reason = args.slice(1).join(" ")
    if(!reason) reason = "Not Specified"
    
    message.delete().catch(err => console.log(err))

    
  await message.guild.members.unban(user)
  const embed7 = new discord.MessageEmbed()
  .setColor(client.config.green)
  .setTitle(`${user} has been succesfully unbanned\nReason: ${reason}`)
  
  if(!logchannel) return
    let logembed = new discord.MessageEmbed()
    .setColor(client.config.green)
    .setTitle("Staff" + `${message.author} (${message.author.id})`)
    .addField("User" , `${user} (${user.id}`)
    .addField("Reason" , reason)
 
   let lchan = message.guild.channels.cache.get(logchannel)
    if(!lchan) return
    lchan.send(logembed)
}

module.exports.help = {
name: "unban" ,
  aliases: [],
  description: "Unban a user from a specific server",
  usage: "<user ID>",
  category: "Moderation"
}
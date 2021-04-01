const discord = require("discord.js")
const fs = require("fs")
const db = require("quick.db")
const randostrings = require("randostrings")
const random = new randostrings()

module.exports.run = async (client, message, args) => {
  let logchannel = db.fetch(`logchannel_${message.guild.id}`)
 
  if(!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send(new discord.MessageEmbed().setColor("RED").setTitle("You need the permission 'Manage nicknames' to be able to use this command"))
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!user) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You forgot to specify a user\nUsage: " + `${client.config.prefix}warn <@user / ID> (reason)`))
  if(user.id === message.author.id) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You cannot warn your self"))
  if(user.bot) return message.channel.send(new discord.MessageEmbed().setColor("RED").setTitle("You cannot warn a bot"))
  if(user.hasPermission("MANAGE_NICKNAMES")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You cannot warn a staff member"))
  
//  message.delete()
  
  let reason = args.slice(1).join(" ")
  if(!reason) reason = "Unspecified"
  
  message.delete().catch(err => console.log(err))

  message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle(`${user.user.tag} has been warned\nReason: ${reason}`))
  try{
    user.send(new discord.MessageEmbed().setColor(client.config.red).setDescription(`You have been warned in ${message.guild.name} by ${message.author}\nReason: ${reason}`))
  } catch(err) {
    console.log(err)
  }
  
   let wid = random.captcha()
   
  var d = new Date(Date.now())
  let data = {
    warnid: wid,
    staff: `Action: Warning\nStaff: <@${message.author.id}>\nDate: ${d}\nReason: ${reason}\nWarnID: ${wid}`,
  }
  
  db.push(`warnings_${message.guild.id}_${user.id}`, data)
  db.add(`warn_${message.guild.id}_${user.id}`, 1)

  if(!logchannel) return
  let lchan = message.guild.channels.cache.get(logchannel)
  if(!lchan) return
  lchan.send(new discord.MessageEmbed().setColor(client.config.green).setTitle("User Warned").addField("Staff", `${message.author} (${message.author.id})`, true).addField("User", `${user} (${user.id})`, true).addField("Reason" , reason))
  
  function randomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min +1)) + min
  }
  
  
}

module.exports.help = {
  name: "warn",
  aliases: [],
  description: "Warn a user in the server",
  usage: "<user> (reason)",
  category: "Moderation"
}
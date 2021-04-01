const discord = require("discord.js")
const ms = require("ms")
const db = require("quick.db")
module.exports.run = async (client, message, args) => {
  let logchannel = db.fetch(`logchannel_${message.guild.id}`)
  let muterole = db.fetch(`muterole_${message.guild.id}`)
  if(muterole === null){
    muterole = message.guild.roles.cache.find(rl => rl.name === "Muted")
    if(!muterole) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle(`I couldn't find a role called Muted\nTo setup a muted role: ${client.config.prefix}muterole <@role>`))
  }
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You need the 'Manage Roles' permission to use this command"))
  
  if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("I need the 'Manage Roles' permission to use this command"))
  
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!user) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You need to specify a user to mute"))
  if(user.id === message.author.id) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You cannot mute your self"))
  if(user.hasPermission("MANAGE_ROLES")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You cannot mute a staff member"))
  if(user.roles.cache.has(muterole.id)) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("This user is already muted"))
  


  let time = args[1]  
  
    if(!isNaN(time)) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("The time must be a number"))

  
  if(!time.endsWith("s") && !time.endsWith("h") && !time.endsWith("d"))return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("Please specify the time\nS for seconds | H for hours | D for days"))
  
  
  if(ms(time)){
  let reason = args.slice(2).join(" ")
  if(!reason) reason = "Unspecified"
  
  let wid = randomInteger(100000, 999999)
  var d = new Date(Date.now())
let data = {
    warnid: wid,
staff: `Action: Temp Mute\nStaff <@${message.author.id}>\nTime: ${d}\nMute Time: ${time}\nReason: ${reason}\nWarnID: ${wid}`
}

db.push(`warnings_${message.guild.id}_${user.id}`, data)
  
  message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle(`${user.user.tag} has been muted for ${time}\nReason: ${reason}`))
  user.roles.add(muterole)

function randomInteger(min, max) {
min = Math.ceil(min)
max = Math.floor(max)
return Math.floor(Math.random() * (max - min + 1)) + min
}
  setTimeout(() => {
    user.roles.remove(muterole)
  }, ms(time))
  
    message.delete()

  
  if(!logchannel) return
  let lchan = message.guild.channels.cache.get(logchannel)
  if(!lchan) return
  lchan.send(new discord.MessageEmbed().setColor(client.config.green).setTitle("User TempMuted").addField("Staff", `${message.author} (${message.author.id}`, true).addField(`User`, `${user} (${user.id})`, true).addField("Time", time, true).addField("Reason", reason, true))
}
}

module.exports.help = {
  name: "tempmute",
  aliases: [],
  description: "Tempmute a specific user in the server",
  usage: "<@user | ID> <time s | m | d> (reason)",
  category: "Moderation"
}
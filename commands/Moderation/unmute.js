const discord = require("discord.js")
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
  if(user.id === message.author.id) return message.channel.send(new discord.MessageEmbed().setColor("RED").setTitle("You cannot unmute your self"))
  if(user.hasPermission("MANAGE_ROLES")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You cannot unmute a staff member"))
  if(/*user.roles.cache.has(muterole.id) ||*/ !user.roles.cache.has(muterole)) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("This user is not muted"))

//message.delete()

  
  let reason = args.slice(1).join(" ")
  if(!reason) reason = "Unspecified"
  message.delete().catch(err => console.log(err))
let wid = randomInteger(100000, 999999)
var d = new Date(Date.now())
let data = {
    warnid: wid,
staff: `Action: Unmute\nStaff <@${message.author.id}>\nDate: ${d}\nReason: ${reason}\nWarnID: ${wid}`
}

db.push(`warnings_${message.guild.id}_${user.id}`, data)

function randomInteger(min, max) {
min = Math.ceil(min)
max = Math.floor(max)
return Math.floor(Math.random() * (max - min + 1)) + min
}
  message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle(`${user.user.tag} has been unmuted\nReason: ${reason}`))
  
  user.roles.remove(muterole)
  
  if(!logchannel) return
  let lchan = message.guild.channels.cache.get(logchannel)
  if(!lchan) return
  lchan.send(new discord.MessageEmbed().setColor(client.config.green).setTitle("User Unmuted").addField("Staff", `${message.author} (${message.author.id})`, true).addField("User", `${user} (${user.id})`, true).addField("Reason" , reason))
  
  /*function randomInteger(min, max) {
min = Math.ceil(min)
max = Math.floor(max)
return Math.floor(Math.random() * (max - min + 1)) + min*/
}

module.exports.help = {
  name: "unmute",
  aliases: [],
  description: "Unmute a user from the server",
  usage: "<@user | ID> (reason)",
  category: "Moderation"
}
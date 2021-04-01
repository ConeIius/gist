const db = require("quick.db")
const discord = require("discord.js")
const moment = require("moment")

module.exports = (bot, member) => {
  let text;
  
  let wmsg = db.fetch(`welcomemsg_${member.guild.id}`)
  if(wmsg === null) text = `Welcome {user} to {guild}. Enjoy your stay!`
  if(wmsg !== null) text = wmsg
  let rtxt = text
		.replace('{user}', `${member}`)
		.replace('{guild}', `${member.guild.name}`)
		.replace('{count}' , `${member.guild.memberCount}`)
    //.catch(err => console.log(err))

	let tosend = rtxt
  //text = rtxt
  
  let welcome = db.fetch(`welcome_${member.guild.id}`)
  if(welcome === null) return
  
  let logchannel = db.fetch(`logchannel_${member.guild.id}`)
  let role = db.fetch(`autorole_${member.guild.id}`)
  
  const embed1 = new discord.MessageEmbed()
  .setColor("GREEN")
  .setTitle("Member Joined")
  .addField("User" , `${member} (${member.id})`)
  .addField("Account Created On", `${moment.utc(member.createdAt).format("dddd, MMMM Do YYYY")}`, true)
  
  let wchan = member.guild.channels.cache.get(welcome)
  if(!wchan) return
  wchan.send(tosend)  .catch(err => console.log(err))

  
  
    if(!member.guild.me.hasPermission("MANAGE_ROLES")) return
  let autorole = member.guild.roles.cache.get(role)
  if(!autorole) return
  member.roles.add(autorole)  .catch(err => console.log(err))

  
   let lchan = member.guild.channels.cache.get(logchannel)
  if(!lchan) return
  lchan.send(embed1)  .catch(err => console.log(err))

   
}
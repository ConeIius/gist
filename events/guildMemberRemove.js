const db = require("quick.db")
const discord = require("discord.js")
const moment = require("moment")

module.exports = (bot, member) => {
  db.delete(`moneyy_${member.guild.id}_${member.id}`)
  
  let text;
    let wmsg = db.fetch(`leavemsg_${member.guild.id}`)
  if(wmsg === null) text = `{user} just left the server.`
  if(wmsg !== null) text = wmsg
  let rtxt = text
		.replace('{user}', `${member}`)
		.replace('{guild}', `${member.guild.name}`)
		.replace('{count}' , `${member.guild.memberCount}`)
	  //.catch(err => console.log(err))

	let tosend = rtxt
	
  
  let welcome = db.fetch(`leave_${member.guild.id}`)
  if(welcome === null) return
  
  let logchannel = db.fetch(`logchannel_${member.guild.id}`)
  
  const embed1 = new discord.MessageEmbed()
  .setColor("GREEN")
  .setTitle("Member Left")
  .addField("User" , `${member} (${member.id})`)
  .addField("Account Created On", `${moment.utc(member.createdAt).format("dddd, MMMM Do YYYY")}`, true)
  
  let wchan = member.guild.channels.cache.get(welcome)
  if(!wchan) return
  wchan.send(rtxt)  .catch(err => console.log(err))

  
  if(!logchannel) return
 let lchan = member.guild.channels.cache.get(logchannel)
  if(!lchan) return
  lchan.send(embed1)  .catch(err => console.log(err))

  
}
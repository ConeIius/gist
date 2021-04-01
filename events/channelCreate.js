const discord = require("discord.js")
const db = require("quick.db")

module.exports = async (bot, message, channel) => {
  if(!message.guild) return
  
  let logchannel = db.fetch(`logchannel_${message.guild.id}`)
  if(logchannel === null) return
  
  let createdChannel = db.fetch(`createdchannels_${message.guild.id}`)
  if(createdChannel === null) return
  
  let chan
  if(message.type === "text") chan = "Text Channel"
  if(message.type === "voice") chan = "Voice Channel"
  if(message.type === "category") chan = "Category"
  
  const embed = new discord.MessageEmbed()
  .setColor("GREEN")
  .setTitle("Channel Created")
  .addField("Channel Name" , "**" + message.name + "**")
  .addField("Channel Type" , chan)
  
  let lchan = message.guild.channels.cache.get(logchannel)
  if(!lchan) return
  lchan.send(embed)
  .catch(err => console.log(err))
}
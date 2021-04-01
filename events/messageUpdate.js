const db = require("quick.db")
const discord = require("discord.js")

module.exports = async (bot, message, oldMessage, newMessage) => {
  if(message.author.bot || !message.guild) return

  let logchannel = db.fetch(`logchannel_${message.guild.id}`);
  if (logchannel === null) return;

  let log = db.fetch(`messageupdate_${message.guild.id}`);
  if (log === null) log = 0 
   if (log === 0) return;

  
  const embed = new discord.MessageEmbed()
  .setColor(bot.config.orange)
    .setTitle("Message Edited")
    .addField("User" , `${oldMessage.author} (${oldMessage.author.id})`)
    .addField("Message Before Edited", `${message}`)
    .addField("Message After Edited", `${oldMessage}`)
    .addField("In channel", `${message.channel}` + " (" +message.channel.id + ")");

  let lchan = bot.channels.cache.get(logchannel)
  if(!lchan) return
  lchan.send(embed).catch(err => console.log(err))
}
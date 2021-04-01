const db = require("quick.db")
const discord = require("discord.js")
module.exports = async (bot, message) => {
    if(message.author.bot || !message.guild) return

db.set(`lastdeleteuser_${message.guild.id}_${message.channel.id}`, message.author.id)
db.set(`lastdelete_${message.guild.id}_${message.channel.id}`, message.content)

  let logchannel = db.fetch(`logchannel_${message.guild.id}`);
  if (logchannel === null) return;

  let log = db.fetch(`messagedelete_${message.guild.id}`);
  if (log === null) log = 0
  if(log === 0) return

  let embed = new discord.MessageEmbed()
    .setColor("RED")
    .setTitle("Message Deleted")
    .addField("User", `${message.author} (${message.author.id})`)
    .addField("Message Deleted", message)
  .addField("Channel", `${message.channel}` + " (" +message.channel.id + ")")

  let lchan= bot.channels.cache.get(logchannel)
  if(!lchan) return
  lchan.send(embed).catch(err => console.log(err))
}
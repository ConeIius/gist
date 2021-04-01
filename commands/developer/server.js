const discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
if(!bot.config.owners.includes(message.author.id)) return
message.delete()
const guilds = bot.guilds.cache.array()


const generateEmbed = start => {
  const current = guilds.slice(start, start + 5)




  const embed = new discord.MessageEmbed()
    .setTitle(`Showing guilds ${start + 1}-${start + current.length} out of ${guilds.length}`)
  current.forEach(g => 
  /*let channel = g.channels.cache.last()
    let invite = channel.createInvite({
        maxAge: 0, // 0 = infinite expiration
        maxUses: 0 // 0 = infinite uses
    }).catch(console.error);*/
  embed.addField(g.name, `**ID:** ${g.id}\n**Owner:** ${g.owner.user.tag}\n**Member count**: ${g.memberCount}\n`))
  return embed
}

const author = message.author

message.channel.send(generateEmbed(0)).then(message => {
  if (guilds.length <= 5) return
  message.react('➡️')
  message.react("🗑")
  const collector = message.createReactionCollector(
    // only collect left and right arrow reactions from the message author
    (reaction, user) => ['⬅️', '➡️', '🗑'].includes(reaction.emoji.name) && user.id === author.id,
    {time: 60000}
  )

  let currentIndex = 0
  collector.on('collect', reaction => {
    message.reactions.removeAll().then(async () => {
      if(reaction.emoji.name === '🗑') return message.delete()
      reaction.emoji.name === '⬅️' ? currentIndex -= 10 : currentIndex += 10
      message.edit(generateEmbed(currentIndex))
      if (currentIndex !== 0){ 
        await message.react('⬅️') 
        await message.react('🗑')
      }
      if (currentIndex + 5 < guilds.length) { 
        message.react('➡️') 
        message.react('🗑')

      }
    })
  })
})
}

module.exports.help = {
  name: "server",
  aliases: ["servers"],
  description: "Check what servers the bot is in",
  usage: " ",
  category: "Developer"
}
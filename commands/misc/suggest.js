const discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
  let prefix = db.fetch(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = client.config.prefix
  
  let suggestion = db.fetch(`suggestion_${message.guild.id}`)
  if(suggestion === null) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("The suggestion channel is not set up\n" + `To set it up use ${prefix}suggestionchannel <#channel>`))


let channel = message.guild.channels.cache.get(suggestion)
if(!channel) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("It seems like my suggestion channel was deleted"))
  
  let sugg = args.slice(0).join(" ")
  if(!sugg) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You didn't tell me your suggestion"))
  
  let embed = new discord.MessageEmbed()
  .setColor(client.config.blue)
  .setTitle("New suggestion")
  .setDescription(sugg)
  .setFooter(`Suggested by: ${message.author.tag}`)
  
message.delete()

  channel.send(embed).catch(err => {return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("I do not have permission to talk in the suggestion channel, please check my permissions."))})
  .then(m => {
    m.react("✅")
    m.react("❌")
  })
  message.channel.send(new discord.MessageEmbed().setColor(client.config.blue).setTite("I have sent out your suggestion"))
}

module.exports.help = {
  name: "suggest",
  aliases: ["suggestion"],
  description: "Send a suggestion in the server",
  usage: "<suggestion>",
  category: "misc"
}
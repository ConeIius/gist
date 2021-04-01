const discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
  let bio = args.slice(0).join(" ")
  if(!bio) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You forgot to specify your bio"))
  if(bio.length > 100) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("Your bio cannot have more than 100 characters!"))
  
  db.set(`bio_${message.author.id}`, bio)
  message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle("Set your bio as\n"  + bio))
}

module.exports.help = {
  name: "setbio",
  aliases: ["mybio"],
  description: "Let people know more about you!",
  usage: "<bio>",
  category: "Configs"
}
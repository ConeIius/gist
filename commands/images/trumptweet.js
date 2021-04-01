const discord = require("discord.js")
const fetch = require("node-fetch")

module.exports.run = async (client, message, args) => {
  let text = args.slice(0).join(" ")
  if(!text) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You need to tell me some text"))
  
    if(text.length > 100) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You cannot have more than 100 characters"))

  
  let msg = await message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle("Generating Photo..."))
  
  
  const data = await fetch(
      `https://nekobot.xyz/api/imagegen?type=trumptweet&text=${text}`
    ).then((res) => res.json());
    msg.delete({timeout: 500})
    message.channel.send(new discord.MessageEmbed().setColor(client.config.orange).setImage(data.message))
}

module.exports.help = {
  name: "trumptweet",
  aliases: ["tweet"],
  description: "Make trump tweet something off your chocie",
  usage: "<text>",
  category: "Images"
}
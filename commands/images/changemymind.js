const discord = require("discord.js")
const fetch = require("node-fetch")

module.exports.run = async (client, message, args) => {
  let text = args.slice(0).join(" ")
  if(!text) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You need to tell me some text"))
  
   
  if(text.length > 85) return message.channel.send(new discord.MessageEmbed().setColor("RED").setTitle("You cannot have more than 85 characters"))
  let msg = await message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle("Generating Photo..."))
 
  const data = await fetch(
      `https://nekobot.xyz/api/imagegen?type=changemymind&text=${text}`
    ).then((res) => res.json());
    msg.delete({timeout: 500})
    message.channel.send(new discord.MessageEmbed().setColor(client.config.orange).setImage(data.message))
}

module.exports.help = {
  name: "changemymind",
  aliases: ["cmm"],
  description: "Change my mind photo, but with the text you choose",
  usage: "<text>",
  category: "Images"
}
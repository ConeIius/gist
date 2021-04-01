const discord = require("discord.js")
const { Canvas } = require("canvacord")

module.exports.run = async (client, message, args) => {

let msg = args.slice(0).join(" ")
if(!msg) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You did not specify the text"))
if(msg.length > 50) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("Your text cannot have more than 50 characters."))

Canvas.phub({ username: message.author.username, message: msg, image: message.author.displayAvatarURL({ format: "png" }) })
.then(attachment => message.channel.send({ files: [{attachment, name: "img.png"}] }))
}

module.exports.help = {
  name: "phubcomment",
  aliases: ["pornhubcomment", "pornhub" , "phub"],
  description: "Create a phub comment with the text of your choice",
  usage: "<text>",
  category: "Images"
}
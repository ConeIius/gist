const discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
  if(!client.config.owners.includes(message.author.id)) return
  
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!user) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("Where the user at"))
  
  let choose = ["bank" , "money", "succeed"]
  if(!args[1]) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You forgot the first argument"))
  if(!choose.includes(args[1].toLowerCase())) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("Please specify between: " + choose.join(", ")))
  
  let amount = args[2]
  if(!amount) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You forgot the amount"))
  if(isNaN(amount)) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("It must be a number ya know"))
  
  if(args[1].toLowerCase() === "bank"){
    let bspace = db.fetch(`bspace_${user.id}`)
    let bmoney = db.fetch(`bmoney_${user.id}`)
    
    let am = bspace - bmoney
    
    if(amount > am) amount = am
    
    db.add(`bmoney_${user.id}`, amount)
    message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle(`I have added **${amount}$** to ${user.user.tag}'s bank`))
  }
  
  if(args[1].toLowerCase() === "money"){
    db.add(`money_${user.id}`, amount)
    message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle(`I have added **${amount}$** to ${user.user.tag}'s wallet`))
  }
  
  if(args[1].toLowerCase() === "succeed"){
    db.add(`jsucceed_${message.author.id}`, amount)
    message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle(`I have added ${amount} job succeed to ${user.user.tag}`))
  }
}

module.exports.help = {
  name: "add",
  aliases: [],
  description: "Add the money or bank money",
  usage: "<bank | money> <amount>",
  category: "Developer"
}
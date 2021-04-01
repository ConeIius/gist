const discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
  if(!client.config.owners.includes(message.author.id)) return
  
  /*let user = message.mentions.members.first()
  if(!user) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You forgot to specify a user"))*/
  let userID = args[0];
    let reason = args.slice(1).join(" ");

    if (!userID) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("Please insert a valid user ID."));
    if (isNaN(userID)) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("User ID must be a number."));
    if (userID === message.author.id) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You can't blacklist yourself."));
    if (userID === client.user.id) return message.channel.send(new discord.MessageEmbed().setColor(cliet.config.red).setTitle("You can't blacklist me. Why?"));

    if (!reason) reason = "No reason specified"

    client.users.fetch(userID).then(async user => {
  let blacklisted = db.fetch(`blacklist_${user.id}`)
  
  if(blacklisted === true) {
    db.set(`blacklist_${user.id}`, false)
    return message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle(`I have removed the blacklist from ${user.tag}`))
  }
  
  db.set(`blacklist_${user.id}`, true)
  message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle(`I have blacklisted ${user.tag} and he can no longer use the bot\nReason: ${reason}`))
  db.set(`blacklistreason_${user.id}`, {reason: reason})
  
    }).catch(err => {
       return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle(`An error has ccured: ${err}`))
    })
}

module.exports.help = {
  name: "blacklist",
  aliases: [],
  description: "Black list a specific user to stop using the bot",
  category: "Developer",
  usage: "<user>"
}
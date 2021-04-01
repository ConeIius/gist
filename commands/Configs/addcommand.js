const discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You need `ADMINISTRATOR` perms to use this command"))
let prefix = db.fetch(`prefix_${message.guild.id}`)
if(prefix === null) prefix = client.config.prefix
    let cmdname = args[0]

    if(!cmdname) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle(`You did not tell me te command name\n Usage: ${prefix}addcmd <name> <response>`))

    let cmdresponce = args.slice(1).join(" ")

    if(!cmdresponce) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle(`You did not tell me what it will respond with\nUsage: ${prefix}addcmd <name> <response>\``))

    let database = db.get(`cmd_${message.guild.id}`)

    if(database && database.find(x => x.name === cmdname.toLowerCase())) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("This is already a custom command"))

    let data = {
      name: cmdname.toLowerCase(),
      responce: cmdresponce
    }

    db.push(`cmd_${message.guild.id}`, data)

    return message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle("Added **" + cmdname.toLowerCase() + "** as a custom command in the server."))
}

module.exports.help = {
  name: "addcommand",
  aliases: ["addcmd", "addcommands", "addcmds"],
  description: "Add a custom command for your server",
  usage: "<cmd name> <cmd response>",
  category: "Configs"
}
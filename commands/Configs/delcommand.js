const discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new discord.MessageEmbed().setColor("RED").setTitle("You need the 'ADMINISTRATOR' permissions to use this command"))
  
  let prefix = db.fetch(`prefix_${message.guild.id}`)
if(prefix === null) prefix = client.config.prefix

  let cmdname = args[0]

    if(!cmdname) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle(`You did not specify the command name\nUsage: ${prefix}delcmd <cmd name>`))

    let database = db.get(`cmd_${message.guild.id}`)

    if(database) {
      let data = database.find(x => x.name === cmdname.toLowerCase())

      if(!data) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("I was not able to delete this command since it's not a command"))

      let value = database.indexOf(data)
      delete database[value]

      var filter = database.filter(x => {
        return x != null && x != ''
      })

      db.set(`cmd_${message.guild.id}`, filter)
      return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle(`Deleted the **${cmdname}** command!`))


    } else {
      return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("There was an error deleting the command, if this keeps on occuring please ask in the support server"))
  }
}

module.exports.help = {
  name: "delcommand",
  aliases: ["remcommand", "delcommands", "deletecommand", "deletecommands", "removecommands", "removecommand", "delcommand"],
  description: "Delete a custom command in this server",
  usage: "<cmd name>",
  category: "Configs"
}
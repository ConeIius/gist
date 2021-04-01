const discord = require("discord.js")
const db = require("quick.db")
module.exports.run = async (client, message, args) => {
  let prefix = db.fetch(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = client.config.prefix
  let database = db.get(`cmd_${message.guild.id}`)
 
      if(database ) {
        let array =[]
        database.forEach(m => {
          array.push(prefix + m.name)
        })
        
        let embed = new discord.MessageEmbed()
        .setColor(client.config.green)
        .setTitle("Custom Commands")
        .setDescription(array.join(", "))
        .setFooter("See nothing? Means this server has no custom commands")
        message.channel.send(embed)
      }
}

module.exports.help = {
  name:"customcommand",
  aliases: ["customcommands"],
  description: "Check the servers custom commands",
  usage: " ",
  category: "misc"
}
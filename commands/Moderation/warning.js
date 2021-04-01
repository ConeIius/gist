const discord = require("discord.js")
const db = require("quick.db")


module.exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You need the 'Kick Members' permission to use this command"))
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
  if(!user) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You forgot to mention a user"))
  
  let database = db.fetch(`warnings_${message.guild.id}_${user.id}`)
  if(database === null) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle(`${user.user.tag} does not have any warnings`))
  if(database) {
        let array =[]
        database.forEach(m => {
          array.push(m.staff)
        })
       const embed = new discord.MessageEmbed()
       .setColor(client.config.orange)
       .setTitle(`${user.user.tag}'s Warnings`)
       .setDescription(array)
       
       message.channel.send(embed)
       
       
/*const splitMessageArray = discord.splitMessage(embed, {
      maxLength: 2048,
      char: "\n",
      prepend: "",
      append: ""
    });
    
    for(const item of splitMessageArray){
        embed.setDescription(item)
message.channel.send(embed)
    }
       
       //var str = array
       
       /*for(let i = 0; i < str.length; i += 2000) {
    const toSend = str.substring(i, Math.min(str.length, i + 2000));
    message.channel.send(toSend);
}*/
  }
}

module.exports.help = {
  name: "warning",
  aliases: ["warnings"],
  description: "Check a users warnings",
  usage: "<user>",
  category: "Moderation"
}
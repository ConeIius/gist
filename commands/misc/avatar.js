const discord = require("discord.js")

module.exports.run = async (client, message, args) => {
const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
  
  
    const avatarEmbed = new discord.MessageEmbed()
        .setColor(client.config.blue)
        .setAuthor(user.user.tag)
        .setImage(user.user.displayAvatarURL({dynamic: true , size: 2048}))
        .setTimestamp()
    message.channel.send(avatarEmbed);
}

module.exports.help = {
name: "avatar",
  aliases: ["useravatar"],
  description: "Check a users avatar",
  usage: "<member>",
  category: "misc"
}
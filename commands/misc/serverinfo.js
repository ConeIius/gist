const discord = require("discord.js")

module.exports.run = async (client, message, args) => {
const embed = new discord.MessageEmbed()
.setColor(client.config.blue)
.setAuthor(message.guild.name, message.guild.iconURL())
        .addField("Name", message.guild.name, true)
        .addField("ID", message.guild.id, true)
        .addField("Owner", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
        .addField("Total Members | Humans | Bots", `${message.guild.memberCount} | ${message.guild.members.cache.filter(member => !member.user.bot).size} | ${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
        .addField("Text Channels", message.guild.channels.cache.filter(c => c.type === "text").size, true)
.addField("Voice Channels", message.guild.channels.cache.filter(c => c.type === "voice").size, true)
        .addField("Roles", message.guild.roles.cache.size, true)
        .setThumbnail(message.guild.iconURL())
.setFooter(`Requested By: ${message.author.tag}`)
.setTimestamp()
    message.channel.send({embed})
}
module.exports.help = {
name: "serverinfo",
  aliases: ["guildinfo"],
  description: "Check information about the server",
  usage: " ",
  category: "misc"
}
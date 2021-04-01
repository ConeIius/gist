const { MessageEmbed } = require('discord.js')
const db = require("quick.db")

module.exports = {
    name : 'afk',
    run : async(client, message, args) => {
        const content = args.join(" ")
        await db.set(`afk-${message.author.id}+${message.guild.id}`, content)
        const embed = new MessageEmbed()
        .setDescription(`You have been set to afk\n**Reason :** ${content}`)
        .setColor("GREEN")
        message.channel.send(embed)         
        message.member.setNickname(`[AFK] ${message.member.displayName}`)

    }
}
module.exports.help = {
  name: "afk",
  aliases: [],
  description: "Check someones user information",
  usage: "(@user | ID)",
  category: "Info"
}
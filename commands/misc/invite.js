const discord = require("discord.js")

module.exports.run = async (client, message, args) => {
  message.channel.send(new discord.MessageEmbed().setColor(client.config.blue).addField("My invite link: " , "[Click Here](https://discord.com/api/oauth2/authorize?client_id=773576538146340874&permissions=8&scope=bot)"))
}

module.exports.help = {
  name: "invite",
  aliases: ["invitebot"],
  description: "Get a link to invite the bot",
  usage: " ",
  category: "misc"
}
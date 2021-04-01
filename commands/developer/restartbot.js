const discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    if(!client.config.owners.includes(message.author.id)) return
    
    if(args[0] === "b") return message.channel.send("b")
    
    message.channel.send('Restarted.').then(() => {
  process.exit(1);
})
}

module.exports.help = {
    name: "restartbot",
    aliases: [],
    description: "Restart the bot",
    usage: " ",
    category: "Developer"
}
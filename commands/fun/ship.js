const discord = require("discord.js")

module.exports.run = async (client, message, args) => {
        if (!args[0]) return message.channel.send("You forgot to mention someone!")
        if (!args[1]) return message.channel.send("You need to mention someone else!")
 
        if (args[0] || args[1]) {
            var FirstUser = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            var SecondUser = message.mentions.members.first(-1) || message.guild.members.cache.get(args[1])
 
            if (!FirstUser) return message.channel.send(`I couldn't find someone named **${args[0]}**!`)
            if (!SecondUser) return message.channel.send(`I couldn't find someone named **${args[1]}**!`)
 
            if (FirstUser || SecondUser) {
                const FirstUserSliced = FirstUser.user.username.slice(0, FirstUser.user.username.length / 2)
                const SecondUserSliced = SecondUser.map(user => { return user.user.username.slice(user.user.username.length / 2) })
                const SecondUserName = SecondUser.map(user => { return user.user.username })
 
        const love = Math.random() * 100;
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "<:cool:826562356162199592>".repeat(loveIndex) + "<:sh:826563418642972713>".repeat(10 - loveIndex);
  
  let embed = new discord.MessageEmbed()
  .setColor("#fdb0bf")
  .setTitle(`<:he:826569150641471518> Ship <:he:826569150641471518>`)
                  .setDescription(`:twisted_rightwards_arrows: **${FirstUserSliced}${SecondUserSliced}**\n${FirstUser.user.username} and ${SecondUserName} are a **${Math.floor(love)}%** match <3\n${loveLevel}`)
       
  message.channel.send(embed)
}  
        }
}


module.exports.help = {
name: "ship",
  aliases: ["love"],
  description: "Answer me a question and I will answer it",
  usage: "<question>",
  category: "Misc"
}
const discord = require("discord.js")
const fetch = require("node-fetch")

module.exports.run = async (client, message, args) => {
  
  let msg = await message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle("Generating Photo..."))
  
  let user = message.mentions.users.first() ? message.mentions.users.first().displayAvatarURL({format: 'png', size: 512}) :message.author.displayAvatarURL({format: 'png', size: 512});
  let numb = Math.ceil(Math.random() * 10)
  const data = await fetch(
      `https://nekobot.xyz/api/imagegen?type=magik&image=${user}&intensity=${numb}`
    ).then((res) => res.json());
    msg.delete({timeout: 500})
    message.channel.send(new discord.MessageEmbed().setColor(client.config.orange).setImage(data.message))
}

function match(msg, i) {
  if (!msg) return undefined;
  if (!i) return undefined;
  let user = i.members.cache.find(
    m =>
      m.user.username.toLowerCase().startsWith(msg) ||
      m.user.username.toLowerCase() === msg ||
      m.user.username.toLowerCase().includes(msg) ||
      m.displayName.toLowerCase().startsWith(msg) ||
      m.displayName.toLowerCase() === msg ||
      m.displayName.toLowerCase().includes(msg)
  );
  if (!user) return undefined;
  return user.user;
}

module.exports.help = {
  name: "magik",
  aliases: [],
  description: "Magik your pfp or someone elses pfp",
  usage: "(@user)",
  category: "Images"
}
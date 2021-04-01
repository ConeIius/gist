const Discord = require("discord.js");
const discord = require("discord.js")
const db = require("quick.db")
//const db = require('quick.db');

module.exports.run = async (client, message, args) => {
  //if(message.author.id !== "402490971041824768") return
  if(!client.config.owners.includes(message.author.id)) return
  let process = args.join(" ");
  if (!process) {
    return message.channel.send("Please give a code to evaluate!");
  }
  
  message.delete()
  
  let e;
  let color
  try {
    e = eval(process);
    color = client.config.green
  } catch (err) {
    e = err;
    color = client.config.red
  }
  let embed = new Discord.MessageEmbed()
    .setColor(color)
    .addField("Input", "```" + process + "```")
    .addField("Output", "```" + e + "```")
    .addField("Type Of", `\`\`\`${typeof(e)}\`\`\``);
  let m = await message.channel.send(embed);
  
  m.react("🗑")
  
  const filter = (reaction, user) => {
	return reaction.emoji.name === '🗑' && user.id === message.author.id;
};

m.awaitReactions(filter, { max: 1 })
	.then(collected => m.delete())
};

module.exports.help = {
  name: "eval",
  aliases: [],
  description: "Get an output from some JS code",
  usage: "<JS Code>",
  category: "developer"
};
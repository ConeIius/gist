const discord = require("discord.js");
const db = require("quick.db")
module.exports.run = async (client, message, args) => {
  let logchannel = db.fetch(`logchannel_${message.guild.id}`)
  
  const amount = parseInt(args[0]);
  if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setDescription("You need the 'Manage Channel' permission to use this command")) 
  
  if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("I need the 'Manage Channels' permission to use this command"))
  
  if(!args[0]) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setDescription(`You did not specify a time!\n${client.config.prefix}slowmode <time><s | m | h>`))
  if (isNaN(amount)) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setDescription("This is not a valid number"));
  if(!args[0].endsWith("s") && !args[0].endsWith("m") && !args[0].endsWith("h")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setDescription("Please specify if it's in seconds (s) or minutes (m) or hours (h)"))
  
  if (args[0] === amount + "s") {
    
    if(amount > 21600) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You cannot do more than 6 hours!"))
    if (amount > 1) {
      message.delete()
      message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setDescription("Slowmode is now **" + amount + "** seconds"));
      message.channel.setRateLimitPerUser(amount);
    } else {
      message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle("Slowmode is now **" + amount + "** second"));
    }
  }
  if (args[0] === amount + "m") {
    
    if(amount > 360){
      return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You cannot do more than 6 hours!"))
    }
    if (amount > 1) {
      message.delete()

      message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle("Slowmode is now **" + amount + "** minutes"));
      message.channel.setRateLimitPerUser(amount * 60);
    } else {
      message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle("Slowmode is now **" + amount + "** minutes"));
    }
  }
  if (args[0] === amount + "h") {
    
    if(amount > 6){
      return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You cannot do more than 6 hours!"))
    }
    if (amount > 1) {
      message.delete()

      message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle("Slowmode is now **" + amount + "** hours"));
      message.channel.setRateLimitPerUser(amount * 60 * 60);
    } else {
      message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle("Slowmode is now **" + amount + "** hours"));
    }
  }
  
  if(!logchannel) return
  let lchan = message.guild.channels.cache.get(logchannel)
  if(!lchan) return
  lchan.send(new discord.MessageEmbed().setColor(client.config.green).setTitle("Slowmode Changes").addField("Staff", `${message.author} (${message.author.id})`, true).addField("In Channel", `${message.channel} (${message.channel.id})`, true).addField("Time", args[0]))
};

module.exports.help = {
  name: "slowmode",
  aliases: ["slow"],
  description: "Add slowmode to a specific channel",
  usage: "<time><s | m | h>",
  category: "Moderation"
}
const discord = require("discord.js")
const weather = require("weather-js")

module.exports.run = async (client, message, args) => {
  if(!args.slice(0).join(" ")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("Please specify the country to search the weather"))
  weather.find({search: args.slice(0).join(" "), degreeType: "C" }, function (error, result) {
      //C is celicius
      if(error) return console.log(error)
      if(!args[0]) return message.channel.send(new discord.MessageEmbed().setColor("RED").setTitle("You forgot to specify the country"))
      
      if(result === undefined || result.length === 0) return message.channel.send(new discord.MessageEmbed().setColor("RED").setTitle("This is not a valid location"))
      
      const current = result[0].current;
      const location = result[0].location;
      
      let weatherembed = new discord.MessageEmbed()
      .setColor(client.config.blue)
      .setDescription(`The sky is ${current.skytext}`)
      .setTitle(`Weather for ${current.observationpoint}`)
      .addField(`Observation Time` , `${current.observationtime}`)
      .addField(`Degree Type` , `Celcius`)
      .addField(`Temperature` , `${current.temperature}`)
      .addField(`TimeZone` , `UTC ${location.timezone}`) 
      .addField(`Wind` , current.winddisplay)
      .addField(`Humidity` , `${current.humidity}%`)
      .addField(`Feels Like` , `${current.feelslike}°`)
      
      message.channel.send(weatherembed)
    })
}

module.exports.help = {
  name: "weather",
  aliases: [],
  description: "Check the weather in a specific country",
  usage: "<country>",
  category: "misc"
}
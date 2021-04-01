const discord = require("discord.js");
//const { NovelCovid } = require("novelcovid")
const track = require("novelcovid");

module.exports.run = async (client, message, args) => {
  const corona1 = await track.all();
  const corona = await track.countries({country: args.slice(0).join(" ")});

  if (!args[0]) {
    const embed1 = new discord.MessageEmbed()
      .setColor(client.config.red)
      .setTitle(`Info On COVID-19 Cases`)
      .addField("Total Confirmed", corona1.cases, true)
      .addField("Total Deaths", corona1.deaths, true)
      .addField("Total Recovered", corona1.recovered, true)
      .addField("Today's cases", corona1.todayCases, true)
      .addField("Today's deaths", corona1.todayDeaths, true)
      .addField("Active cases", corona1.active, true)
      .addField("Critical cases", corona1.critical, true);

    return message.channel.send(embed1);
  }
  if(corona.cases === undefined) return message.channel.send(new discord.MessageEmbed().setColor("RED").setTitle("This is not a valid location"))
  const embed = new discord.MessageEmbed()
    .setColor("RED")
    .setTitle(`Info on COVID-19 in ${corona.country}`)
    .addField("Total Confirmed", corona.cases, true)
    .addField("Total Deaths", corona.deaths, true)
    .addField("Total Recovered", corona.recovered, true)
    .addField("Today's cases", corona.todayCases, true)
    .addField("Today's deaths", corona.todayDeaths, true)
    .addField("Active cases", corona.active, true)
    .addField("Critical cases", corona.critical, true)

  message.channel.send(embed);
};

module.exports.help = {
  name: "covid",
  aliases: ["covid19"],
  description: "Check the global COVID-19 cases",
  usage: "(country)",
  category: "misc"
};
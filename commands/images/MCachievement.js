const discord = require("discord.js")

module.exports.run = async (client, message, args) => {
try {
       const text = args.join(" ");
        //if (text === null) return message.channel.send("You need to provide text for the achievement");
        if(!text) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You forgot the text"))
            if (text.length > 25) return message.reply(new discord.MessageEmbed().setColor(client.config.red).setTitle('Your text must be under 25 characters'));
            
            let numb = Math.ceil(Math.random() * 39)
            console.log(numb)
        const superagent = require('superagent')
        const { body } = await superagent
            .get('https://www.minecraftskinstealer.com/achievement/a.php')
            .query({
                i: numb,
                h: 'Achievement Got!',
                t: text
            });
        message.channel.send({ files: [{ attachment: body, name: 'achievement.png' }] 
      });
    } catch (err) {
            console.log(err)
    }
}

module.exports.help = {
  name: "mcachievement",
  aliases: ["minecraftachievement"],
  description: "Get a custom minecraft achievement",
  usage: "<text>",
  category: "Images"
}
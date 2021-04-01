const discord = require("discord.js")
const got = require("got")

module.exports.run = async (client, message, args) => {
got('https://www.reddit.com/r/animememes/random/.json').then(response => {
        let content = JSON.parse(response.body);
        let permalink = content[0].data.children[0].data.permalink;
        let memeUrl = `https://reddit.com${permalink}`;
        let memeImage = content[0].data.children[0].data.url;
        let memeTitle = content[0].data.children[0].data.title;
        let memeUpvotes = content[0].data.children[0].data.ups;
        let memeDownvotes = content[0].data.children[0].data.downs;
        let memeNumComments = content[0].data.children[0].data.num_comments;
       const MemeEmbed = new discord.MessageEmbed()
        .setColor(client.config.orange)
        .setTitle(`${memeTitle}`)
        .setImage(memeImage)
        .setFooter(`⬆️ ${memeUpvotes} | 💬 ${memeNumComments}`)
        
        message.channel.send(MemeEmbed)
            //.then(sent => console.log(`Sent a reply to ${sent.author.username}`))
        //console.log('Bot responded with: ' + memeImage);
    }).catch(console.error);
}

module.exports.help = {
name: "animememe",
  aliases: ["animeme"],
  description: "Sends a random anime meme",
  usage: " ",
  category: "Fun"
}
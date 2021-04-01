const discord = require("discord.js");
const pagination = require('discord.js-pagination');

module.exports.run = (bot, message, args) => {
  return;

    const page1 = new discord.MessageEmbed()
    .setTitle('Anibot help page!')
    .setDescription('Anibot is a multipurpose, anime themed bot. Use the emojis to change the pages.\n**Help pages**\nPage 2: Fun\nPage 3: Images\nPage 4: Info\nPage 5: Moderation.')

    const page2 = new discord.MessageEmbed()
    .setTitle('Fun - Page 2')
    .setDescription('!8ball <question> - Have you question answered\n!anime <anime> search for an anime\n!ship <mention1> <mention2> ship two users!')

    const page3 = new discord.MessageEmbed()
    .setTitle('Images - Page 3')
    .setFooter('Note: These images are pulled from reddit, so we cant moderate them!')
    .setDescription('!animememes - Get some fresh anime memes')
    const page4 = new discord.MessageEmbed()
    .setTitle('Info - Page 4')
    .setDescription('!avatar - View your or a mentioned users avatar')
   
    const page5 = new discord.MessageEmbed()
    .setTitle('Moderation - Page 5')
    .setDescription('Coming soon, maybe never! teehee')

    const pages = [
        page1,
        page2,
        page3,
        page4,
        page5
    ]

    const emoji = ["⏪", "⏩"]
pagination(message, pages, emoji)

    }




module.exports.help = {
  name: "help",
  aliases: [" "],
  description: "Help command to show the commands",
  usage: "(command name)",
  category: "misc"
};
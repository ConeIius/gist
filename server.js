const express = require("express")
const app = express()
const port = 3000


app.get("/", (req, res) => res.send("Hello World"))

app.listen(port, () => 
console.log(`My app is listening at http://localhost:${port}`)
)



const { Client, Collection } = require("discord.js");
const discord = require("discord.js")
const { readdirSync } = require("fs");
const fs = require("fs");
const { sep } = require("path");
const { success, error, warning } = require("log-symbols");
const config = require("./config");
const bot = new Client();
const db = require("quick.db")
bot.config = config;



["commands", "aliases"].forEach(x => (bot[x] = new Collection()));

const load = (dir = "./commands/") => {
  readdirSync(dir).forEach(dirs => {
    const commands = readdirSync(`${dir}${sep}${dirs}${sep}`).filter(files =>
      files.endsWith(".js")
    );

    for (const file of commands) {
      const pull = require(`${dir}/${dirs}/${file}`);
      if (
        pull.help &&
        typeof pull.help.name === "string" &&
        typeof pull.help.category === "string"
      ) {
        if (bot.commands.get(pull.help.name))
          return console.warn(
            `${warning} Two or more commands have the same name ${pull.help.name}.`
          );
        bot.commands.set(pull.help.name, pull);
        console.log(`${success} Loaded command ${pull.help.name}.`);
      } else {
        console.log(
          `${error} Error loading command in ${dir}${dirs}. you have a missing help.name or help.name is not a string. or you have a missing help.category or help.category is not a string`
        );
        continue;
      }
      if (pull.help.aliases && typeof pull.help.aliases === "object") {
        pull.help.aliases.forEach(alias => {
          if (bot.aliases.get(alias))
            return console.warn(
              `${warning} Two commands or more commands have the same aliases ${alias}`
            );
          bot.aliases.set(alias, pull.help.name);
        });
      }
    }
  });
};

load();

bot.on("ready", () => {
  console.log("I am online");
  console.log(Math.floor(Math.random() * 3))
});

bot.on("message", async message => {
  if(message.author.bot || !message.guild) return
  	
	  
	


       
  
  let antilink = db.fetch(`antilink_${message.guild.id}`)
  if(antilink === 1){
   // if(message.member.hasPermission("MANAGE_NICKNAMES")) return
    if(message.content.toLowerCase().includes("https://") || message.content.toLowerCase().includes("http://") || message.content.toLowerCase().includes(".com")) {
        if(message.member.hasPermission("MANAGE_NICKNAMES")) return
  message.delete()
  message.channel.send(new discord.MessageEmbed().setColor(bot.config.red).setTitle(`${message.author.tag} random links are not allowed here`))

    let logchannel = db.fetch(`logchannel_${message.guild.id}`)
    let channel = message.guild.channels.cache.get(logchannel)
    if(!channel) return
    channel.send(new discord.MessageEmbed().setColor(bot.config.orange).setTitle("Random Link").addField("User" , message.author).addField("Content", message.content))
  }
  }
  
  let antiinv = db.fetch(`antiinvite_${message.guild.id}`)
  if(antiinv === 1){
//if(message.member.hasPermission("MANAGE_NICKNAMES")) return
if(message.content.toLowerCase().includes("discord.gg") || message.content.toLowerCase().includes("discord.io")){
    if(message.member.hasPermission("MANAGE_NICKNAMES")) return
  message.delete()
  message.channel.send(new discord.MessageEmbed().setColor(bot.config.red).setTitle(`${message.author.tag} invite links are not allowed here`))

    let logchannel = db.fetch(`logchannel_${message.guild.id}`)
    let channel = message.guild.channels.cache.get(logchannel)
    if(!channel) return
    channel.send(new discord.MessageEmbed().setColor(bot.config.orange).setTitle("Invite Link").addField("User" , message.author).addField("Content", message.content))
  }
  }
  
  let wmsg = db.fetch(`leavemsg_${message.guild.id}`)
  let lmsg = db.fetch(`welcomemsg_${message.guild.id}`)
  if(wmsg === null){
  db.set(`leavemsg_${message.guild.id}`,`{user} just left the server.`)
  }
  if(lmsg === null){
  db.set(`welcomemsg_${message.guild.id}`, `Welcome {user} to {guild}. Enjoy your stay!`)
  }
  

  
  if(message.content.startsWith(bot.config.prefix)){
  let blacklistreason = db.fetch(`blacklistreason_${message.author.id}`)
  let blacklisted = db.fetch(`blacklist_${message.author.id}`)
  if(blacklisted === true) return message.channel.send(new discord.MessageEmbed().setColor(bot.config.red).setTitle("You are blacklisted and cannot use the bot.\n" + `Reason: ${blacklistreason.reason}`))
  }
  let sprefix = db.fetch(`prefix_${message.guild.id}`)
  let prefix;
  if(sprefix === null){
    prefix = bot.config.prefix
  } else {
    prefix = sprefix 
  }
  
     let wordx = db.fetch(`cuss_${message.guild.id}`)
  if(wordx){
    if(!message.member.hasPermission("ADMINISTRATOR")) {
    let array =[]
        wordx.forEach(m => {
          array.push(m.name)
      const blocked = array.filter(word => message.content.toLowerCase().includes(word));
      if (blocked.length > 0) {
      message.delete().catch(err => {console.log(err)})
      message.channel.send(new discord.MessageEmbed().setColor(bot.config.red).setTitle("You are not allowed to say this word in the server"))
        let logchannel = db.fetch(`logchannel_${message.guild.id}`)
    let channel = message.guild.channels.cache.get(logchannel)
    if(!channel) return
    channel.send(new discord.MessageEmbed().setColor(bot.config.orange).setTitle("Cuss Word").addField("User" , message.author).addField("Content", message.content))
      }
  })
 }
}
  
  if(message.content.includes("<@" + bot.user.id + ">") || message.content.includes(`<@!${bot.user.id}>`)){
    message.channel.send(`${message.author}`, new discord.MessageEmbed().setColor(bot.config.blue).setTitle(`My prefix for this server is **${prefix}**`)).then(m => m.delete({timeout: 5000}))
  }
  
  let amc = db.fetch(`cmdam_${message.author.id}`)
  if(amc === 5){
    db.add(`blvl_${message.author.id}`, 1)
    db.delete(`cmdam_${message.author.id}`)
    
  let blvl = db.fetch(`blvl_${message.author.id}`)
  if(blvl === null) blvl = 1
  db.add(`bspace_${message.author.id}`, (200*blvl))


message.channel.send(new discord.MessageEmbed().setColor(bot.config.green).setTitle(`Hey ${message.author.tag}, you are now level \`${blvl}\` and you now have \`${200 * blvl}\` extra space in your bank`))
  }
  
  if(!message.content.startsWith(prefix)) return

if(!message.guild.me.hasPermission("SEND_MESSAGES")) return
  if(!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("I need to be able to send embeds to be able to use me")
  

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  let command;

  if (!message.member)
    message.member = await message.guild.fetchMember(message.author);

  if (!message.content.startsWith(prefix)) return;

  if (cmd.length === 0) return;
  if (bot.commands.has(cmd)) command = bot.commands.get(cmd);
  else if (bot.aliases.has(cmd))
    command = bot.commands.get(bot.aliases.get(cmd));
    
let ccembed = db.fetch(`ccembed_${message.guild.id}`)
  if (command) command.run(bot, message, args);
  let cmdx = db.get(`cmd_${message.guild.id}`)
if(cmdx) {
  let cmdy = cmdx.find(x => x.name === cmd)
  if(ccembed === false || ccembed === null){
  if(cmdy) message.channel.send(cmdy.responce)
  }
  if(ccembed === true) {
    if(cmdy) message.channel.send(new discord.MessageEmbed().setColor(bot.config.blue).setDescription(`${cmdy.responce}`)).catch(new discord.MessageEmbed().setColor(bot.config.red).setTitle("Your message is too long for an embed" + ` please run ${bot.config.prefix}ccembed to turn off the embed or delete the command\nIf you think its a mistake please contact the bot developers`))
  }
}

});

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Loaded Event: ${file}`);
    bot.on(eventName, event.bind(null, bot));
  });
});

bot.login(process.env.TOKEN).catch(console.error());
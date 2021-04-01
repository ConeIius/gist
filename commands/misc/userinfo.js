const discord = require("discord.js")
const db = require("quick.db")
const moment = require("moment")
module.exports.run = async (client, message, args) => {
  const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
};
  
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
  if(!user) return message.channel.send(new discord.MessageEmbed().setColor("RED").setTitle("You forgot to specify a user"))
  let bio = db.fetch(`bio_${user.id}`)
  if(bio === null) bio = "This user does not have a bio. To add a bio type " + `${client.config.prefix}setbio <bio>`
  
  const userFlags = user.user.flags.toArray();
  
  const embed = new discord.MessageEmbed()
  .setColor(client.config.blue)
  .setTitle("User Info")
  .setThumbnail(user.user.displayAvatarURL())
  .addField("Basic Information" , `Name & Tag: ${user.user.tag}\nID: ${user.user.id}\nUsername: ${user.user.username}\nDiscriminator: ${user.user.discriminator}`)
  .addField("Badges", ` ${userFlags.length ? userFlags.map(flag => flags[flag]): 'None'}`,)
      .addField("Joined The Server On", `${moment.utc(user.user.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
    .addField("Account Created On", `${moment.utc(user.user.createdAt).format("dddd, MMMM Do YYYY")}`, true) 
    .addField("Roles:", user.roles.cache.map(roles => `${roles}`).join(', '), true)
  .addField("Bio" , bio)
  
  message.channel.send(embed)
}

module.exports.help = {
  name: "userinfo",
  aliases: [],
  description: "Check someones user information",
  usage: "(@user | ID)",
  category: "misc"
}
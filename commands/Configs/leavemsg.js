const discord = require('discord.js');
const db = require('quick.db');

module.exports.run = async (client, message, args) => {
	if (!message.member.hasPermission('ADMINISTRATOR'))
		return message.channel.send(
			new discord.MessageEmbed()
				.setColor(client.config.red)
				.setTitle('You need `ADMINISTRATOR` perms to use this command')
		);

let prefix = db.fetch(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = client.config.prefix

	let text = args.slice(0).join(' ');

	if (!text)
		return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle('You forgot to tell me what will the new custom leave message is'));

  let member = message

	let rtxt = text
		.replace('{user}', `${member.author}`)
		.replace('{guild}', `${member.guild.name}`)
		.replace('{count}' , `${member.guild.memberCount}`)
		
		message.channel.send(new discord.MessageEmbed().setColor(client.config.green).setTitle("I have successfully set the custom leave message").setDescription( `Example: ${rtxt}`).setFooter("Check " + `${prefix}variables for a list of how to mention the user or put the server name, etc`))
		db.set(`leavemsg_${message.guild.id}`, `${text}`)
		//message.channel.send(rtxt)
};

module.exports.help = {
	name: 'leavemsg',
	aliases: ['setleavemessage', 'leavemessage', 'setleavemsg'],
	description: 'Set a custom leave message',
	usage: '<Custom leave message>',
	category: 'Configs'
};
const { readdirSync } = require("fs");
const { join } = require("path");
const discord = require("discord.js")
module.exports.run = (bot, message, args) => {
const embed1 = new discord.MessageEmbed()
.setColor("RED")
.setDescription("Only W-Legit can execute the command")
	if (!bot.config.owners.includes(message.author.id)) return 

	if (!args[0]) return message.channel.send(new discord.MessageEmbed().setColor(bot.config.red).setTitle("Please provide a command to reload!")).then(m => m.delete({timeout: 5000}))
	const commandName = args[0].toLowerCase();
	const command = bot.commands.get(commandName) || bot.commands.get(bot.aliases.get(commandName));
	if (!command) return message.channel.send(new discord.MessageEmbed().setColor(bot.config.red).setTitle("That command doesn't exist. Try again.")).then(m => m.delete({timeout: 5000}))
	readdirSync(join(__dirname, "..")).forEach(f => {
		const files = readdirSync(join(__dirname, "..", f));
		if (files.includes(`${commandName}.js`)) {
			const file = `../${f}/${commandName}.js`;
			try {
				delete require.cache[require.resolve(file)];
				bot.commands.delete(commandName);
				const pull = require(file);
				bot.commands.set(commandName, pull);
				return message.channel.send(new discord.MessageEmbed().setColor(bot.config.green).setTitle(`Successfully reloaded ${commandName}.js!`)).then(m => m.delete({ timeout: 5000 }))
			}
			catch (err) {
				message.channel.send(new discord.MessageEmbed().setColor(bot.config.red).setTitle(`Could not reload: ${args[0].toUpperCase()}\``)).then(m => m.delete( {timeout: 5000} ))
				return console.log(err.stack || err);
			}
		}
	});
};

module.exports.help = {
	name: "reload",
	aliases: [""],
	description: "Reload a command",
	usage: "<command name>",
	category: "developer",
};
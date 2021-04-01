module.exports = async bot => {
  await console.log(
    `____________________\nClient: ${bot.user.tag}\nClient ID: ${bot.user.id}\nGuild Count: ${bot.guilds.cache.size}\nUser Count: ${bot.users.cache.size}\n____________________`
  );
  let activities = [
      `Im in ${bot.guilds.cache.size} servers!`,
      `!help`,
      `Work in progress!`
    ],
    i = 0;
  setInterval(() => {
    bot.user.setActivity(`${activities[i++ % activities.length]}`, {
      type: "PLAYING"
    });
  }, 200000);
  bot.user.setPresence({
    status: "online"
  });
};

const discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new discord.MessageEmbed().setColor(client.config.red).setTitle("You need the administator permission to use this command"))
  
  let atext
  let atoggle
  
  const autorole = db.fetch(`autorole_${message.guild.id}`)
  if(autorole === null) {
    atext = "No current role assigned for autorole"
    atoggle = "Off"
  }
  if(autorole !== null) {
    atext = `Role for autorole: <@&${autorole}>`
    atoggle = "On"
  }
  
  let wtext
  let wtoggle
  let wchan = db.fetch(`welcome_${message.guild.id}`)
  if(wchan === null) {
    wtext = "No current channel assigned for welcoming"
    wtoggle = "Off"
  }
   if(wchan !== null) {
    wtext = `Channel for welcoming <#${wchan}>`
    wtoggle = "On"
  }
  
    let ltext
  let ltoggle
  let lchan = db.fetch(`leave_${message.guild.id}`)
  if(lchan === null) {
    ltext = "No current channel assigned for leavinging"
    ltoggle = "Off"
  }
   if(lchan !== null) {
    ltext = `Channel for leavinging <#${lchan}>`
    ltoggle = "On"
   }
   
     let mrtext
  let mrtoggle
  let muterole = db.fetch(`muterole_${message.guild.id}`)
  if(muterole === null) {
    mrtext = "No current role assigned for muting"
    mrtoggle = "Off"
  }
   if(muterole !== null) {
    mrtext = `Role for muting <@&${muterole}>`
    mrtoggle = "On"
   }
   
     let lotext
  let lotoggle
  let logchannel = db.fetch(`logchannel_${message.guild.id}`)
  if(logchannel === null) {
    lotext = "No current channel assigned as the logchannel"
    lotoggle = "Off"
  }
   if(logchannel !== null) {
    lotext = `The logchannel is <#${wchan}>`
    lotoggle = "On"
   }
 
  
  
  if(!args[0] || args[0] === "1") {
    const embed = new discord.MessageEmbed()
    .setColor(client.config.blue)
    .setTitle("Settings")
    .addField("1. Autorole is " + atoggle , atext)
    .addField("2. Mute role is " + mrtoggle, mrtext)
    .addField("3. Welcome Channel is " + wtoggle, wtext)
    .addField("4. Leave Channel is " + ltoggle, ltext)
    .addField("5. Log channel is " + lotoggle, lotext)
    .setFooter("Page 1/3")
    message.channel.send(embed)
  }
  
  let ctext
  let ctoggle
  
    let cchan = db.fetch(`createdchannels_${message.guild.id}`)
    if(cchan === 0 || cchan=== null){
      ctext = "Created channels aren't being logged"
      ctoggle = "Off"
    }
    if(cchan === 1){
      ctext = "Created channels are being logged"
      ctoggle = "On"
    }


let dtext
let dtoggle
  let dchan = db.fetch(`deletedchannels_${message.guild.id}`)
     if(dchan === 0 || dchan=== null){
      dtext = "Deleted channels aren't being logged"
      dtoggle = "Off"
    }
    if(cchan === 1){
      dtext = "Deleted channels are being logged"
      dtoggle = "On"
    }
    
    
let mdtext
let mdtoggle
  let mdchan = db.fetch(`messagedelete_${message.guild.id}`)
     if(mdchan === 0 || mdchan=== null){
      mdtext = "Deleted messagess aren't being logged"
      mdtoggle = "Off"
    }
    if(mdchan === 1){
      mdtext = "Deleted messages are being logged"
      mdtoggle = "On"
    }
    
    
let mutext
let mutoggle
  let muchan = db.fetch(`messageupdate_${message.guild.id}`)
     if(muchan === 0 || muchan=== null){
      mutext = "Deleted channels aren't being logged"
      mutoggle = "Off"
    }
    if(cchan === 1){
      mutext = "Edited messages are being logged"
      mutoggle = "On"
    }
    
    let sstext
    let sstoggle
    let suggestion = db.fetch(`suggestion_${message.guild.id}`)
    if(suggestion === null){
        sstext = "No currect channels assigned for suggestions"
        sstoggle = "Off"
    }
    if(suggestion !== null) {
        sstext = `The suggestion channel is <#${suggestion}>`
        sstoggle = `On`
    }

let antiltext
let antiltoggle 
let antilink = db.fetch(`antilink_${message.guild.id}`)
  if(antilink === null || antilink === 0){
      antiltext = `Anti link is not deleting and logging links`
      antiltoggle = `Off`
  }
  if(antilink === 1){
      antiltext = `Anti link is deleting and logging links`
      antiltoggle = `On`
  }
  if(args[0] === "2"){
    const embed = new discord.MessageEmbed()
    .setColor(client.config.blue)
    .setTitle("Settings")
    .addField("6. Suggestion channel is " + sstoggle , sstext)
    .addField("7. Logging created channels is " + ctoggle, ctext)
    .addField("8. Logging deleted channel is " + dtoggle, dtext)
    .addField("9. Logging deleted messages is " + mdtoggle, mdtext)
    .addField("10. Logging edited messages is " + mutoggle, mutext)
    .setFooter("Page 2/3")
    message.channel.send(embed)
  }
  
  let antidtoggle
  let antidtext
  let antiinv = db.fetch(`antiinvite_${message.guild.id}`)
  if(antiinv === null || antiinv === 0){
      antidtoggle = "Off"
      antidtext = "Discord invite links aren't being deleted and logged"
  }
  if(antiinv === 1){
      antidtoggle = "On"
      antidtext = "Discord invite links are being deleted and logged"
  }
  
  if(args[0] === "3"){
      const embed = new discord.MessageEmbed()
      .setColor(cleint.config.blue)
      .setTitle("Settings")
      .addField("11. Anti Links is " + antiltoggle, antiltext)
      .addField("12. Anti Discord Invite Links is " + antidtoggle, antidtext)
      .setFooter("Page 3/3")
      
      message.channel.send(embed)
  }
}

module.exports.help = {
  name: "setting",
  aliases: ["settings"],
  description: "Check all settings for the server",
  category: "misc"
}
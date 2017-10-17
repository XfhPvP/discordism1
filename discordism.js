const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = ">";

var fortunes = [
  "It is decidedly so",
  "Without a doubt",
  "Yes, definitely",
  "You may rely on it",
  "As I see it, yes",
  "Most likely",
  "Outlook good",
  "Yes",
  "Signs point to yes",
  "Reply hazy, try again",
  "Ask again later",
  "Better not tell you now",
  "Cannot predict now",
  "Concentrate and ask again",
  "Don't count on it",
  "My reply is no",
  "My sources say no",
  "Outlook not so good",
];

client.on('ready', () => {
  client.user.setGame(">help");
  client.user.setStatus("dnd");
  console.log('This bot is ready to go.');
});

client.on("guildMemberAdd", function(member) {
     member.guild.channels.find("name", "welcome").send("Welcome " + member.toString() + " to the ***Discordism Server!***");
     member.addRole(member.guild.roles.find("name", "Members"));

});


client.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;



  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
  let args = message.content.split(" ").slice(1);

  if (command === "hi") {
      message.channel.send("Hello " + message.author.toString() + " 👋");
  }

  if (command == "whatisthis") {
    message.channel.send("Discordism is a Discord server founded and managed by ~bluebird~, HitDelay, and a few others");
  message.channel.send("``For a command list, use >commands``");

  }

  if (command === "help") {
  message.channel.send("Discordism is a Discord server founded and managed by ~bluebird~, HitDelay, and a few others");
  message.channel.send("``For a command list, use >commands``");
  }
  if (command === "forcepurge") {

    let foundersRole = message.guild.roles.find("name", "Operators");
     if(!message.member.roles.has(foundersRole.id)) {
     return message.reply("**You do not have the correct role to execute this command.**");

   }

    let messagecount = parseInt(100);
    message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
    return message.channel.send("**100** messages were forcefully removed by an Operator.")

}

  if (command === "ping") {
  var embed = new Discord.RichEmbed()
  .setColor(0x0000a0)
  .setDescription('⏰  |  **Ping:** `' + `${Date.now() - message.createdTimestamp}` + ' ms`')
  message.channel.send(embed);


  }

  if (command === "invite") {
  var embed = new Discord.RichEmbed()
  .setColor(0x0000a0)
  .setDescription("[Discord Link](https://discord.gg/fsChvZe)  |  **Right click** to copy")
  message.channel.send(embed);
  }
  if (command === "commands") {
    message.channel.send("**The command list has been sent to your PMs!**");
     var embed = new Discord.RichEmbed()
    .addField("Discordism | Help", "Below are the commands that are currently available.")
    .addField(">help", "Displays the info of the bot.")
    .addField(">invite", "Displays an invite link to the discord.")
    .addField(">hi", "Replies with a friendly hello.")
    .addField(">whatisthis", "Another command that displays the bot info.")
    .setColor(0x0000a0)
    .setFooter("These commands are still in development and may not work correctly.")
    message.author.send(embed);
  }

  if(command === "8ball") {
  if (args[1]) {
    message.channel.send("🎱  |  **" + fortunes[Math.floor(Math.random() * fortunes.length)] + "**")
  } else {
    message.channel.send("🎱  |  **Usage: >8ball <question>**");
  }
}
});

client.login(process.env.BOT_TOKEN);

const {MessageEmbed} = require('discord.js')

module.exports = {
    async canModifyQueue(member) {
       //define the EMBED
       let resultsEmbed = new MessageEmbed()
         .setTitle("❗️ | Trebuie să intri pe un canal de voice pentru a folosi bot-ul!")
         .setColor("#F0EAD6")
       //wenn memberchannel nicht der botchannel ist
       if (member.voice.channel !== member.guild.me.voice.channel) {
       //Send the message to the MEMBER
         member.send(resultsEmbed);
         //return false that it ends the command
         return false;
       }
       //return true that it continues the command
       return true;
     }
   };
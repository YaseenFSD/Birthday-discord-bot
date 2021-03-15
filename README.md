# **Simple Discord Birthday Bot**

### Purpose
Have users input their birthday and recieve a message from this bot on their special day!

---

### **Commands**

`!activate -h`  OR  `!activate --help`: Sends back a description of the `activate` command

`!activate`: Activates the bot in the channel in with the command was sent. The activated channel will be the channel in which the bot sends birthday messages. 
To change the activated channel, simply use this command again in the 
desired channel.

*Note: This command is only accessible by the server owner*

---

`!bday MM/DD/YYYY`: Stores the birthday in the database with the user that used this command. Bot will then ping the user in the activated channel on the related date. 

*Year argument is optional*

---


`!version`: Sends back the current version of the bot


const Discord = require('discord.js')
const bot = new Discord.Client()
const token = 'NzUzNzU2MjM4ODM5NTQ1OTI2.X1q0Mw.8bjCkjnkPTWihD7pyyNBrNPOgnA'
bot.login(token)

bot.on('ready', _ => {
    console.log('Estou online')
})

responda = msg => {
    msg.reply('Deu certo')
}

bot.on('message', msg => {
    if(msg.content === '10k2'){
        responda(msg)
    }
})
const Discord = require('discord.js')
const {token} = require('./.env')
const bot = new Discord.Client()
const Dices = require('./Dices')
const Out = require('./Out')

bot.login(token)

bot.on('ready', _ => {
    console.log('[Bot online]')
    bot.user.setActivity(
        '.tutorial (Forjado por Akilis Wokai)',
        {type:'LISTENING'}
    )
})

validate = content => {
    if(content === '.tutorial'){
        return Out.tutorial()
    }
    const s1 = content.split(' ')
    if(s1.length > 2){
        return null
    }
    if(s1.length === 1){
        const at = parseInt(s1[0])
        if(isNaN(at)){
            return null
        }
        return Dices.simpleTest(at, content)
    }
    else if(s1.length === 2){
        const at = parseInt(s1[0])
        const dif = parseInt(s1[1])
        if(isNaN(at) || isNaN(dif)){
            return null
        }
        let masterpiece = false
        if(content.includes('o')){
            masterpiece = true
        }

        if(content.includes('.')){
            return Dices.throwNDices(at, dif, masterpiece)
        }
        else{
            const stats = Dices.getStats(at, dif, masterpiece)
            return Out.showStats(stats)
        }
    }
}

bot.on('message', msg => {
    const resp = validate(msg.content)
    if(resp !== null){
        msg.reply(resp)
    }
})
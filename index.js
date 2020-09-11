const Discord = require('discord.js')
const bot = new Discord.Client()
const token = 'NzUzNzU2MjM4ODM5NTQ1OTI2.X1q0Mw.GFJLLkYq8iCc_vBRUaUZLsbriBk'
bot.login(token)

bot.on('ready', _ => {
    console.log('Estou online')
})

processKeepRollPlus = (roll, keep, plus) => {
    changed = false
    roll = parseInt(roll)
    keep = parseInt(keep)
    plus = parseInt(plus) 
    if(isNaN(roll) || isNaN(keep) || isNaN(plus)){
        return null
    }
    if(roll > 10 && keep > 10){
        changed = true
        const rollAbove = roll - 10
        const keepAbove = keep - 10
        plus += (rollAbove+keepAbove)*2
        roll = 10
        keep = 10
    }
    else{
        if(roll > 10){
            changed = true
            const rollAbove = roll - 10
            if(rollAbove%2 == 0){
                keep += (rollAbove/2)
            }
            else{
                keep += parseInt(rollAbove/2)
                plus += 2
            }
            roll = 10
        }
        if(keep > 10){
            changed = true
            const keepAbove = keep - 10
            plus += (keepAbove*2)
            keep = 10
        }
    }
    return [roll, keep, plus, changed]
}

throwDices = (roll, keep, plus) => {
    let values = []
    for(let i=0; i<roll; i++){
        let value = Math.floor(Math.random() * 10) + 1
        let dice = value
        while(value === 10){
            value = Math.floor(Math.random() * 10) + 1
            dice += value
        }
        values.push(dice)
    }
    values.sort((a, b) => {
        return b - a;
    })
    let result = 0
    for(let i=0; i<keep; i++){
        result += values[i]
    }
    result += plus
    return [values, result]
}

validate = content => {
    console.log(content)
    const s1 = content.split('k')
    if(s1.length === 1){
        return null
    }
    const s2 = (s1[1]).split('+')
    let numbers = null
    if(s2.length === 1){
        numbers = processKeepRollPlus(s1[0], s1[1], 0)
    }
    else{
        numbers = processKeepRollPlus(s1[0], s2[0], s2[1])
    }
    if(numbers === null){
        return null
    }
    let resp = ''
    if(numbers[3]){
        resp +='Se torna: '
        if(numbers[2] === 0){
            resp += numbers[0] + 'k' + numbers[1] + '\n'
        }
        else{
            resp += numbers[0] + 'k' + numbers[1] + '+' + numbers[2] + '\n'
        }
    }
    [values, result] = throwDices(numbers[0], numbers[1], numbers[2])
    resp += values + '\n'
    resp += 'Resultado: '+ result
    return resp
}

bot.on('message', msg => {
    const resp = validate(msg.content)
    if(resp === null){
        return
    }
    msg.reply(resp)
})
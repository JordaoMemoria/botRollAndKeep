const Discord = require('discord.js')
const token = 'NzUzNzU2MjM4ODM5NTQ1OTI2.X1q0Mw.U9fEZ7KweuiSIF9wD_Q-BKBNj-s'

processKeepRollPlus = (roll, keep, plus) => {
    changed = false
    roll = parseInt(roll)
    keep = parseInt(keep)
    plus = parseInt(plus) 
    if(isNaN(roll) || isNaN(keep) || isNaN(plus)){
        return null
    }
    if(roll >= 10 && keep >= 10){
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

rollSimpleDice = _ => {
    const value = Math.floor(Math.random() * 10) + 1
    // console.log(value)
    return value
}

throwDices = (roll, keep, plus, hasEmphasis, explodeOn9, withoutSkill) => {
    let values = []
    for(let i=0; i<roll; i++){
        let value = rollSimpleDice()
        let dice = value

        if(hasEmphasis && dice === 1){
            // console.log('Entrou na ênfase')
            value = rollSimpleDice()
            dice = value
        }

        if(explodeOn9){
            while(value === 10 || value === 9){
                // if(value === 9){
                //     console.log('Explodiu no 9')
                // }
                // if(value === 10){
                //     console.log('Explodiu no 10')
                // }
                value = rollSimpleDice()
                dice += value
            }
        }
        else if(!withoutSkill){
            while(value === 10){
                // if(value === 10){
                //     console.log('Explodiu no 10')
                // }
                value = rollSimpleDice()
                dice += value
            }
        }
        // if(value === 10){
        //     console.log('Sem perícia para explodir')
        // }
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
    
    let hasEmphasis = false
    if(content.includes('e')){
        hasEmphasis = true
    }
    let explodeOn9 = false
    if(content.includes('x')){
        explodeOn9 = true
    }
    let withoutSkill = false
    if(content.includes('s')){
        withoutSkill = true
    }

    [values, result] = throwDices(
        numbers[0], 
        numbers[1], 
        numbers[2], 
        hasEmphasis,
        explodeOn9,
        withoutSkill
    )

    resp += values + '\n'
    resp += 'Resultado: '+ result
    return resp
}

const bot = new Discord.Client()
bot.login(token)
bot.on('ready', _ => {
    console.log('[ Online ]')
})
bot.on('message', msg => {
    const resp = validate(msg.content)
    if(resp !== null){
        // console.log('Fim do teste')
        msg.reply(resp)
    }
})


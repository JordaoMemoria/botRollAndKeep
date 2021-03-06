const math = require('mathjs')
const Out = require('./Out')

class Dices{

    static lastResult = 0

    static throwDice = (attribute, masterpiece) => {
        const matrix = [
            [0,1,1],
            [1,1,2],
            [2,1,4],
            [3,1,6],
            [4,1,8],
            [5,1,10],
            [6,1,12],
            [7,2,6],
            [8,2,8],
            [9,3,6],
            [10,2,10],
            [11,2,12],
            [12,3,8],
            [13,4,6],
            [14,3,10],
            [15,5,6],
            [16,4,8],
            [17,3,12],
            [18,6,6],
            [19,4,10],
            [20,7,6],
            [21,4,12],
            [22,6,8],
            [23,8,6],
            [24,5,10],
            [25,7,8],
            [26,5,12],
            [27,6,10],
            [28,8,8],
            [29,7,10],
            [30,6,12],
            [31,8,10],
            [32,7,12],
            [33,9,10],
            [34,8,12],
            [35,10,10],
            [36,9,12],
            [37,11,10],
            [38,10,12],
            [39,12,10],
        ]
        const number = matrix[attribute][1]
        const dice = matrix[attribute][2]
        let result = []
        let sum = 0
        for(let i=0; i<number; i++){
            let value = Math.floor(Math.random() * dice) + 1
            if(value === 1 && masterpiece){
                value = Math.floor(Math.random() * dice) + 1
            }
            sum += value
            result.push(value)
        }
        return [number, dice, result, sum]
    }

    static simpleTest = (at, content) => {
        let masterpiece = false
        if(content.includes('o')){
            masterpiece = true
        }
        const [number, dice, result, sum] = Dices.throwDice(at, masterpiece)
        this.lastResult = sum
        if(content.includes('p') || content.includes('b')){
            const [number2, dice2, result2, sum2] = Dices.throwDice(at, masterpiece)
            return Out.showSimple2(
                number, dice, result, sum,
                number2, dice2, result2, sum2
            )
        }
        return Out.showSimple(number, dice, result, sum)
    }

    static throwNDices = (at, dif, masterpiece) => {
        let allResults = []
        for(let i=0; i<dif; i++){
            const result = Dices.throwDice(at, masterpiece)
            allResults.push(result)
        }
        let msg = ''
        allResults.forEach(row => {
            msg += Out.showSimple(row[0], row[1], row[2], row[3])
        })
        return msg
    }
    
    static getStats = (at, dif, masterpiece) => {
        let results = []
        let lastResult = 0
        let penalties = []
        let bonuses = []
        let success = 0
        let successBonus = 0
        let successPenalty = 0
    
        const times = 1000000
    
        for(let i=0; i<times; i++){
            const sum = Dices.throwDice(at, masterpiece)[3]
            if(sum >= dif){
                success++
            }
            if(i%2 !== 0){
                if(sum > lastResult){
                    bonuses.push(sum)
                    penalties.push(lastResult)
                    if(sum >= dif){
                        successBonus++
                    }
                    if(lastResult >= dif){
                        successPenalty++
                    }
                }
                else{
                    bonuses.push(lastResult)
                    penalties.push(sum)
                    if(lastResult >= dif){
                        successBonus++
                    }
                    if(sum >= dif){
                        successPenalty++
                    }
                }
            }
            lastResult = sum
            results.push(sum)
        }
        return [
            (successPenalty/(times/2)*100).toFixed(2), 
                math.mean(penalties).toFixed(2), 
                math.std(penalties).toFixed(2),
            (success/times * 100).toFixed(2), 
                math.mean(results).toFixed(2), 
                math.std(results).toFixed(2),
            (successBonus/(times/2)*100).toFixed(2), 
                math.mean(bonuses).toFixed(2), 
                math.std(bonuses).toFixed(2)
        ]
    }
}

module.exports = Dices
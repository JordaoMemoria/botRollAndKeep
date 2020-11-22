class Out{
    static showSimple = (number, dice, result, sum) => {
        return '\n'+number+'d'+dice+' - '+result+'\nResultado: **'+sum+'**\n'
    }
    
    static showSimple2 = (
        number, dice, result, sum,
        number2, dice2, result2, sum2    
    ) => {
        return '\n'+number+'d'+dice+' - '+result+'\nResultado: **'+sum+'**\n'+number2+'d'+dice2+' - '+result2+'\nResultado: **'+sum2+'**'
    }

    static showStats = stats => {
        let resp = '\nChances de sucesso\n'
        resp+= 'Pen: '+stats[0]+'% Méd: '+stats[1]+' Var: '+stats[2]+'\n'
        resp+= 'Nor: '+stats[3]+'% Méd: '+stats[4]+' Var: '+stats[5]+'\n'
        resp+= 'Bon: '+stats[6]+'% Méd: '+stats[7]+' Var: '+stats[8]+'\n'
        return resp    
    }

    static tutorial = _ => {
        let tutorial = ''
        tutorial += '\nBem vindo ao tutorial!\n\n'
    
        tutorial += '>> Para fazer um teste digite o valor do atributo.\n'
        tutorial += 'Exemplo: "12" "15" "9"\n\n'
    
        tutorial += '>> Para fazer um teste com bônus ou penalidade digite o atributo mais "p" ou "b".\n'
        tutorial += 'Exemplo: "8b" "10p"\n\n'
    
        tutorial += '>> Para fazer um teste com uma arma obra-prima digite o atributo mais "o".\n'
        tutorial += 'Exemplo: "11o" "13o"\n\n'
    
        tutorial += '>> É possível combinar uma arma obra-prima com penalidade ou bônus.\n'
        tutorial += 'Exemplo: "14op" "16ob" "17po" "18bo"\n\n'
    
        tutorial += '>> Para testar múltiplas vezes digite o atributo, número de vezes seguido de "."\n'
        tutorial += 'Exemplo: "14 3." "15 4." "14 5." "15 6."\n\n'
    
        tutorial += '>> É possível também calcular a probabilidade de um atributo A ter sucesso em uma dificuldade D, podendo incluir ou não uma arma obra-prima. Os resultados são calculados com Penalidade, Normal, e com Bônus. A Média e o Desvio Padrão também são mostrados.\n'
        tutorial += 'Exemplo: "9 9" "10 12" "15 17" "12o 13"\n\n'
    
        return tutorial
    }
}

module.exports = Out
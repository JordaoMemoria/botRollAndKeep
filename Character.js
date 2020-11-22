const Dices = require('./Dices')

class Character{
    nome = ''
    sigla = ''
    ataque = ''
    dano = 0
    tipo = ''
    defesa = 0
    limiar = 0
    vitalidade = 0
    resistencia = 0
    esquiva = -1
    bloqueia = null
    apara = null
    aparaProjeteis = null
    tolera = null
    rolamento = null
    corpo = 0

    conseguencias = 0
    vitalidadeAtual = 0
    resistenciaAtual = 0

    constructor(obj){

        if(obj === undefined) return

        this.nome = obj.nome
        this.sigla = obj.sigla
        this.ataque = obj.ataque
        this.dano = obj.dano
        this.tipo = obj.tipo
        this.defesa = obj.defesa
        this.limiar = obj.limiar
        this.vitalidade = obj.vitalidade
        this.vitalidadeAtual = obj.vitalidade
        this.resistencia = obj.resistencia
        this.resistenciaAtual = obj.resistencia
        this.esquiva = obj.esquiva
        this.bloqueia = obj.bloqueia
        this.apara = obj.apara
        this.aparaProjeteis = obj.aparaProjeteis
        this.tolera = obj.tolera
        this.rolamento = obj.rolamento
        this.corpo = obj.corpo
    }

    setName = name => {
        this.nome = name
        return 'Digite a sigla de 2 ou 3 letras para se referir ao personagem futuramente:'
    }

    setSigla = sigla => {
        this.sigla = sigla.toLowerCase()
        return 'Digite o dado-base de ataque considerando atributo, pericia, itens e outros. Acrescente "o" caso esteja utilizando arma obra prima:'
    }

    setAtaque = ataque => {
        this.ataque = ataque
        return 'Digite o dano da arma, tecnica ou magia mais usada:'
    }

    setDano = dano => {
        this.dano = parseInt(dano)
        return 'Escolha 1 dentre os tipos de dano (Perto, Longe, Magia):'
    }

    setTipo = tipo => {
        this.tipo = tipo
        return 'Digite a defesa:'
    }

    setDefesa = defesa => {
        this.defesa = parseInt(defesa)
        return 'Digite o limiar:'
    }

    setLimiar = limiar => {
        this.limiar = parseInt(limiar)
        return 'Digite a vitalidade:'
    }

    setVitalidade = vitalidade => {
        this.vitalidade = parseInt(vitalidade)
        this.vitalidadeAtual = parseInt(vitalidade)
        return 'Digite a resistência:'
    }

    setResistencia = resistencia => {
        this.resistencia = parseInt(resistencia)
        this.resistenciaAtual = parseInt(resistencia)
        return 'Digite a esquiva. Digite 0 caso não possua:'
    }

    setEsquiva = esquiva => {
        this.esquiva = parseInt(esquiva)
        return 'O personagem tem escudo para bloquear todo tipo dano (Perto, Longe, Magia)? Responda com "S" ou "N":'
    }

    setBloqueia = bloqueia => {
        if(bloqueia === 'N' ||bloqueia === 'n'){
            this.bloqueia = false
            return 'O personagem consegue aparar ataques de Perto? Responda com "S" ou "N":'
        }
        else if(bloqueia === 'S' || bloqueia === 's'){
            this.bloqueia = true
            this.apara = false
            this.aparaProjeteis = false
            this.tolera = false
            return 'O personagem sabe executar um rolamento? Responda com "S" ou "N":'
        }
        return 'Você respondeu incorretamente. Comece de novo.'
    }

    setApara = apara => {
        if(apara === 'N' ||apara === 'n'){
            this.apara = false
            this.aparaProjeteis = false
            return 'O personagem consegue tolerar dano? Responda com "S" ou "N":'
        }
        else if(apara === 'S' || apara === 's'){
            this.apara = true
            return 'O personagem consegue aparar ataques de Longe? Responda com "S" ou "N":'
        }
        return 'Você respondeu incorretamente. Comece de novo.'
    }

    setAparaPro = aparaProjeteis => {
        if(aparaProjeteis === 'N' ||aparaProjeteis === 'n'){
            this.aparaProjeteis = false
            return 'O personagem consegue tolerar dano? Responda com "S" ou "N":'
        }
        else if(aparaProjeteis === 'S' || aparaProjeteis === 's'){
            this.aparaProjeteis = true
            return 'O personagem consegue tolerar dano? Responda com "S" ou "N":'
        }
        return 'Você respondeu incorretamente. Comece de novo.'
    }

    setTolera = tolera => {
        if(tolera === 'N' || tolera === 'n'){
            this.tolera = false
            return 'O personagem sabe executar um rolamento? Responda com "S" ou "N":'
        }
        else if(tolera === 'S' || tolera === 's'){
            this.tolera = true
            return 'O personagem sabe executar um rolamento? Responda com "S" ou "N":'
        }
        return 'Você respondeu incorretamente. Comece de novo.'
    }

    setRolamento = rolamento => {
        if(rolamento === 'N' ||rolamento === 'n'){
            this.rolamento = false
            return 'Digite o atributo corpo:'
        }
        else if(rolamento === 'S' || rolamento === 's'){
            this.rolamento = true
            return 'Digite o atributo corpo:'
        }
        return 'Você respondeu incorretamente. Comece de novo.'
    }

    setCorpo = corpo => {
        this.corpo = parseInt(corpo)
        return 'Ficha pronta. Para ver digite "Ver '+this.sigla+'"'
    }

    convertBoolean(bool){
        if(bool){
            return 'S'
        }
        return 'N'
    }

    show = _ => {
        let ficha = 'Ficha de '+this.nome+'\n'
        ficha += '1 - Ataque: '+this.ataque+'\n'
        ficha += '2 - Dano: '+this.dano+'\n'
        ficha += '3 - Tipo: '+this.tipo+'\n'
        ficha += '4 - Defesa: '+this.defesa+'\n'
        ficha += '5 - Limiar: '+this.limiar+'\n'
        ficha += '6/7 - Vitalidade: '+this.vitalidade+'/'+this.vitalidadeAtual+' (max/atual)\n'
        ficha += '8/9 - Resistência: '+this.resistencia+'/'+this.resistenciaAtual+' (max/atual)\n'
        ficha += '10 - Esquiva: '+this.esquiva+'\n'
        ficha += '11 - Bloqueia: '+this.convertBoolean(this.bloqueia)+'\n'
        ficha += '12 - Apara: '+this.convertBoolean(this.apara)+'\n'
        ficha += '13 - Apara projéteis: '+this.convertBoolean(this.aparaProjeteis)+'\n'
        ficha += '14 - Tolera: '+this.convertBoolean(this.tolera)+'\n'
        ficha += '15 - Rolamento: '+this.convertBoolean(this.rolamento)+'\n'
        ficha += '16 - Corpo: '+this.corpo+'\n'
        ficha += '17 - Consequências: '+this.conseguencias+'\n'
        ficha += 'Para editar: E '+this.sigla+' [número] [novo valor]\n'

        return ficha
    }

    edit = (at, v) => {
        const op = parseInt(at)
        if(op === 1){
            this.ataque = v
        }
        if(op === 2){
            this.dano = parseInt(v)
        } 
        if(op === 3){
            this.tipo = v
        } 
        if(op === 4){
            this.defesa = parseInt(v)
        } 
        if(op === 5){
            this.limiar = parseInt(v)
        } 
        if(op === 6){
            this.vitalidade = parseInt(v)
        } 
        if(op === 7){
            this.vitalidadeAtual = parseInt(v)
        } 
        if(op === 8){
            this.resistencia = parseInt(v)
        } 
        if(op === 9){
            this.resistenciaAtual = parseInt(v)
        } 
        if(op === 10){
            this.esquiva = parseInt(v)
        } 
        if(op === 11){
            if(v === 'N' || v === 'n'){
                this.bloqueia = false
            }
            else{
                this.bloqueia = true
            }
        } 
        if(op === 12){
            if(v === 'N' || v === 'n'){
                this.apara = false
            }
            else{
                this.apara = true
            }
        } 
        if(op === 13){
            if(v === 'N' || v === 'n'){
                this.aparaProjeteis = false
            }
            else{
                this.aparaProjeteis = true
            }
        } 
        if(op === 14){
            if(v === 'N' || v === 'n'){
                this.tolera = false
            }
            else{
                this.tolera = true
            }
        } 
        if(op === 15){
            if(v === 'N' || v === 'n'){
                this.rolamento = false
            }
            else{
                this.rolamento = true
            }
        } 
        if(op === 16){
            this.corpo = parseInt(v)
        }
        if(op === 17){
            this.conseguencias = parseInt(v)
        }
        return this.show()
    }

    novoAtaque = (enemy, condition) => {
        let msg = this.nome+' ataca '+enemy.nome
        if(condition === 'b'){
            msg += ' com bônus\n'
        }
        else if(condition === 'p'){
            msg += ' com penalidade\n'
        }
        else{
            msg += '\n'
        }
        msg += Dices.simpleTest(
            parseInt(this.ataque),
            this.ataque
        )
        msg += 'Defesa de '+enemy.nome+': **'+enemy.defesa+'**\n'

        if(Dices.lastResult < enemy.defesa){
            msg += '**Errou**\n'
            return msg
        }
        msg += '**Acertou**\n'
        msg += 'Dano de '+this.nome+': **'+this.dano+'**\n'
        msg += 'Limiar de '+enemy.nome+': **'+enemy.limiar+'**\n\n'
        msg += 'Esquiva de '+enemy.nome+': **'+enemy.esquiva+'**\n\n'

        msg += '*Situação sem reação*\n'
        if(this.tipo === 'Magia'){
            msg += this.situacao(this.dano, enemy, false)
        }
        else{
            msg += this.situacao(this.dano + Dices.lastResult - enemy.defesa, enemy, false)
        }

        if(enemy.esquiva > 0){
            msg += '*Caso esquive*\n'
            if(enemy.defesa + enemy.esquiva >= Dices.lastResult){
                msg += 'Dano: **0**\n\n'
            }
            else{
                msg += this.situacao(this.dano + Dices.lastResult - enemy.defesa - enemy.esquiva, enemy, false)
            }
        }

        if(enemy.bloqueia){
            msg += '*Caso bloquei*\n'
            msg += this.situacao(Math.floor((this.dano + Dices.lastResult - enemy.defesa)/2), enemy, false)
        }
        else if(enemy.apara && this.tipo === 'Perto'){
            msg += '*Caso apare*\n'
            msg += this.situacao(Math.floor((this.dano + Dices.lastResult - enemy.defesa)/2), enemy, false)
        }
        else if(enemy.aparaProjeteis && this.tipo === 'Longe'){
            msg += '*Caso apare*\n'
            msg += this.situacao(Math.floor((this.dano + Dices.lastResult - enemy.defesa)/2), enemy, false)
        }

        if(enemy.tolera){
            msg += '*Caso tolere o dano*\n'
            msg += this.situacao(this.dano + Dices.lastResult - enemy.defesa, enemy, true)
        }

        if(enemy.rolamento){
            msg += '*Caso execute um rolamento*\n'
            if(enemy.defesa + (enemy.esquiva*2) >= Dices.lastResult){
                msg += 'Dano: **0**\n\n'
            }
            else{
                msg += this.situacao(this.dano + Dices.lastResult - enemy.defesa - (enemy.esquiva*2), enemy, false)
            }
        }

        msg += 'Vai reagir?\n'

        msg += '0 - Ignorar ataque\n'
        msg += '1 - Sem reação\n'
        if(enemy.esquiva > 0){
            msg += '2 - Esquivar\n'
        }
        if(enemy.bloqueia){
            msg += '3 - Bloquear\n'
        }
        else if(enemy.apara && this.tipo === 'Perto'){
            msg += '4 - Aparar\n'
        }
        else if(enemy.aparaProjeteis && this.tipo === 'Longe'){
            msg += '4 - Aparar\n'
        }
        if(enemy.tolera){
            msg += '5 - Tolerar\n'
        }
        if(enemy.rolamento){
            msg += '6 - Rolamento\n'
        }


        return msg
    }

    situacao(currentDano, enemy, tolera){
        let msg = 'Dano: **'+currentDano+'**\n'

        let r = enemy.resistenciaAtual
        let v = enemy.vitalidadeAtual

        let c = null
        if(tolera){
            c = enemy.conseguencias + Math.floor(currentDano/(enemy.limiar*2))
        }
        else{
            c = enemy.conseguencias + Math.floor(currentDano/enemy.limiar)
        }

        r -= currentDano
        if(r < 0){
            v -= r*-1
            r = 0
            msg += 'Resistência: '+enemy.resistencia+'/**'+r+'**\n'
            if(v < 0){
                msg += 'Vitalidade: '+enemy.vitalidade+'/**'+v+'**\n'
                msg += '**Provável MORTE**\n'
            }
            else{
                msg += 'Vitalidade: '+enemy.vitalidade+'/**'+v+'**\n'
                msg += '**Possível desmaio**\n'
            }
        }
        else{
            msg += 'Resistência: '+enemy.resistencia+'/**'+r+'**\n'
            msg += 'Vitalidade: '+enemy.vitalidade+'/**'+v+'**\n'
        }
        msg += 'Consequências: **'+c+'**\n'
        if(c-enemy.conseguencias > 1){
            msg += '**Atordoado**\n'
        }
        if(c-enemy.conseguencias > 2){
            msg += '**Possível desmaio**\n'
        }
        if(c === 6){
            msg += '**Morrendo**\n'
        }
        if(c > 6){
            msg += '**Provável MORTE**\n'
        }

        return msg+'\n'
    }
}

module.exports = Character
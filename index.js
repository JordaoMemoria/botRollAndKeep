const Discord = require('discord.js')
const {token} = require('./.env')
const bot = new Discord.Client()
const Character = require('./Character')
const Dices = require('./Dices')
const Out = require('./Out')

let c = null
let characters = {
    'ak':new Character({
        nome:'Aklis',
        sigla:'ak',
        ataque:'15',
        dano:15,
        tipo:'Perto',
        defesa:18,
        limiar:16,
        vitalidade:15,
        resistencia:68,
        esquiva:3,
        bloqueia:false,
        apara:true,
        aparaProjeteis:true,
        tolera:true,
        rolamento:true,
        corpo:14
    }),
    'az':new Character({
        nome:'Azuiu',
        sigla:'az',
        ataque:'17',
        dano:21,
        tipo:'Longe',
        defesa:15,
        limiar:9,
        vitalidade:15,
        resistencia:53,
        esquiva:6,
        bloqueia:false,
        apara:false,
        aparaProjeteis:false,
        tolera:false,
        rolamento:false,
        corpo:14
    }),
    'za':new Character({
        nome:'Zarask',
        sigla:'za',
        ataque:'14',
        dano:6,
        tipo:'Perto',
        defesa:20,
        limiar:13,
        vitalidade:15,
        resistencia:68,
        esquiva:0,
        bloqueia:true,
        apara:false,
        aparaProjeteis:false,
        tolera:false,
        rolamento:false,
        corpo:13
    })
}

bot.login(token)

bot.on('ready', _ => {
    console.log('[Bot online]')
    bot.user.setActivity(
        '.tutorial (Forjado por Akilis Wokai)',
        {type:'LISTENING'}
    )
})

newCharacter = _ => {
    c = new Character()
    return 'Digite o nome do personagem:'
}

ignoreOwnMessages = content => {
    if(
        content === 'Digite o nome do personagem:' ||
        content === 'Digite a sigla de 2 ou 3 letras para se referir ao personagem futuramente:' ||
        content === 'Digite o dado-base de ataque considerando atributo, pericia, itens e outros. Acrescente "o" caso esteja utilizando arma obra prima:' ||
        content === 'Digite o dano da arma, tecnica ou magia mais usada:' ||
        content === 'Escolha 1 dentre os tipos de dano (Perto, Longe, Magia):' ||
        content === 'Digite a defesa:' ||
        content === 'Digite o limiar:' ||
        content === 'Digite a vitalidade:' ||
        content === 'Digite a resistência:' ||
        content === 'Digite a esquiva. Digite 0 caso não possua:' ||
        content === 'O personagem tem escudo para bloquear todo tipo dano (Perto, Longe, Magia)? Responda com "S" ou "N":' ||
        content === 'O personagem consegue aparar ataques de Perto? Responda com "S" ou "N":' ||
        content === 'O personagem sabe executar um rolamento? Responda com "S" ou "N":' ||
        content === 'Digite o atributo corpo:' ||
        content === 'O personagem consegue aparar ataques de Longe? Responda com "S" ou "N":' ||
        content === 'O personagem consegue tolerar dano? Responda com "S" ou "N":' ||
        content === 'Você respondeu incorretamente. Comece de novo.' ){
        return true
    }
    return false
}

newClone = (c, sigla) => {
    characters[sigla] = new Character({
        nome:c.nome,
        sigla,
        ataque:c.ataque,
        dano:c.dano,
        tipo:c.tipo,
        defesa:c.defesa,
        limiar:c.limiar,
        vitalidade:c.vitalidade,
        resistencia:c.resistencia,
        esquiva:c.esquiva,
        bloqueia:c.bloqueia,
        apara:c.apara,
        aparaProjeteis:c.aparaProjeteis,
        tolera:c.tolera,
        rolamento:c.rolamento,
        corpo:c.corpo
    })
    return 'Personagem clonado com a sigla '+sigla
}

validate = content => {
    if(ignoreOwnMessages(content)){
        return null
    }
    if(c !== null){
        if(c.nome === ''){
            return c.setName(content)
        }
        if(c.sigla === ''){
            return c.setSigla(content)
        }
        if(c.ataque === ''){
            return c.setAtaque(content)
        }
        if(c.dano === 0){
            return c.setDano(content)
        }
        if(c.tipo === ''){
            return c.setTipo(content)
        }
        if(c.defesa === 0){
            return c.setDefesa(content)
        }
        if(c.limiar === 0){
            return c.setLimiar(content)
        }
        if(c.vitalidade === 0){
            return c.setVitalidade(content)
        }
        if(c.resistencia === 0){
            return c.setResistencia(content)
        }
        if(c.esquiva === -1){
            return c.setEsquiva(content)
        }
        if(c.bloqueia === null){
            return c.setBloqueia(content)
        }
        if(c.apara === null){
            return c.setApara(content)
        }
        if(c.aparaProjeteis === null){
            return c.setAparaPro(content)
        }
        if(c.tolera === null){
            return c.setTolera(content)
        }
        if(c.rolamento === null){
            return c.setRolamento(content)
        }
        if(c.corpo === 0){
            const msg = c.setCorpo(content)
            characters[c.sigla] = c
            return msg
        }
    }
    if(content === '.tutorial'){
        return Out.tutorial()
    }
    if(content === 'Nova ficha' || content === 'Ficha nova'){
        return newCharacter()
    }
    const s1 = content.split(' ')
    if(s1.length === 4 && s1[0] === 'E'){
        if(s1[1] in characters){
            return characters[s1[1]].edit(s1[2], s1[3])
        }
        else{
            return 'Ficha não encontrada'
        }
    }
    if(s1.length === 3){
        if(s1[0].toLowerCase() in characters && s1[1] in characters && s1[2] === 'b'){
            return characters[s1[0].toLowerCase()].novoAtaque(characters[s1[1]], 'b')
        }
        if(s1[0].toLowerCase() in characters && s1[1] in characters && s1[2] === 'p'){
            return characters[s1[0].toLowerCase()].novoAtaque(characters[s1[1]], 'p')
        }
        if(s1[0].toLowerCase() === 'clone' && s1[1] in characters){
            return newClone(characters[s1[1]], s1[2])
        }
        if(s1[0].toLowerCase() === 'clone' && !(s1[1]  in characters)){
            return 'Ficha não encontrada'
        }
    }
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
        if(s1[0].toLowerCase() in characters && s1[1] in characters){
            return characters[s1[0].toLowerCase()].novoAtaque(characters[s1[1]], 'Normal')
        }
        if(s1[0] === 'Ver'){
            if(s1[1] in characters){
                return characters[s1[1]].show()
            }
            else{
                return 'Ficha não encontrada'
            }
        }
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
        // msg.reply(resp)
        msg.channel.send(resp)
        //msg.send(resp)
    }
})
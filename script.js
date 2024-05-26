const input_text = document.querySelector('input#input_tex')
const btn_adicionar_tarefas = document.querySelector('input#btn_adicionar')
const ul_list = document.querySelector('ul#ul_list')

let list_tarefas = []


//retorna informações em objetos
function addlocalStorage(){
    return localStorage.setItem('list_tarefas', JSON.stringify(list_tarefas))
}
//salvando informações no navegador
function permanenciaDados(input_value, done = false){
     //................criando elemento li
    const li = document.createElement('li') 
    ul_list.appendChild(li) // adicionando a tag li dentro da ul
    
     // .................criando o input radio checkbox
    const input_radios = document.createElement('input')
    input_radios.setAttribute('type', 'checkbox') //definindo o tipo do input
    li.appendChild(input_radios) //adicionando input dentro da li
    
    input_radios.checked = done
    input_radios.addEventListener('change', (evento) =>{
        const itemConcluido = evento.target.parentElement //o pai do item removido --> li
        const itemConcluidoSpan = itemConcluido.querySelector('span') //pegando o item span
        
        const done = evento.target.checked // done marcado
        //marcando no item 
        if (done){
            itemConcluidoSpan.style.textDecoration = 'line-through'
        } else{
            itemConcluidoSpan.style.textDecoration = 'none'
        }


        //alterando o status do done na lista
        list_tarefas= list_tarefas.map(t => {
            if (t.title === itemConcluidoSpan.textContent){
                return{
                    title: t.title,
                    done: !t.done
                }
            }
            return t
        })
        console.log(list_tarefas)
        addlocalStorage()
    })

    //..................criando a tag span
    const span = document.createElement('span')
    span.textContent = input_value
    if (done){ //riscando a tarefa mesmo atualizando a pagina
        span.style.textDecoration = 'line-through'
    }
    li.appendChild(span) //adicionando span dentro da li
    // console.log(list_tarefas)
    //....................criando o botao remover
    const botao_remover = document.createElement('button')
    botao_remover.textContent = 'remover'
    li.appendChild(botao_remover) //adicionando botao remover dentro da li

    //  removendo item da ul
    botao_remover.addEventListener('click', (evento) => {
        const itemRemovido = evento.target.parentElement //o pai do item removido --> li
        ul_list.removeChild(itemRemovido) //removendo item na ul
        const itemRemovidoSpan = itemRemovido.querySelector('span').textContent //pegando o valor do item removido --> <span> tarefa 1 </span>
        // removendo item da lista
        list_tarefas = list_tarefas.filter(t => t.title !== itemRemovidoSpan)
        console.log(list_tarefas)
        addlocalStorage()


        

    })


 

}





//click do botao
btn_adicionar_tarefas.addEventListener('click', () => {
    const input_value = input_text.value // texto no input
   
    // list_tarefas.push(input_value) //adicionando o texto na lista
    list_tarefas.push({ //a lista vai ser um objeto no qual recebi o titulo
        title: input_value,
        done: false
        
    })
 
    
    
    
    permanenciaDados(input_value)
    
    addlocalStorage()
    console.log(list_tarefas)
})

//pegando informação salvas no navegador
window.onload = () => {
    const inforLocalStorage = localStorage.getItem('list_tarefas')
    if (!inforLocalStorage) return //se nao tem dados salvos no navegador returna
    list_tarefas = JSON.parse(inforLocalStorage) //pega as informações salvo no navegador, converte de string para objetos
    list_tarefas.forEach(t => {  //percorrendo os titulos e a marcação da lista e imprimindo na tela
        permanenciaDados(t.title, t.done)
    }) 

    console.log(inforLocalStorage)
}
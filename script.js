const input_text = document.querySelector('input#input_tex');
const btn_adicionar_tarefas = document.querySelector('input#btn_adicionar');
const ul_list = document.querySelector('ul#ul_list');

let list_tarefas = [];

// Retorna informações em objetos
function addlocalStorage() {
    return localStorage.setItem('list_tarefas', JSON.stringify(list_tarefas));
}

// Salvando informações no navegador
function permanenciaDados(input_value, done = false, insertAtTop = false) {
    // Criando elemento li
    const li = document.createElement('li');
    
    // Criando o input radio checkbox
    const input_radios = document.createElement('input');
    input_radios.setAttribute('type', 'checkbox'); // Definindo o tipo do input
    li.appendChild(input_radios); // Adicionando input dentro da li
    
    input_radios.checked = done;
    input_radios.addEventListener('change', (evento) => {
        const itemConcluido = evento.target.parentElement; // O pai do item removido --> li
        const itemConcluidoSpan = itemConcluido.querySelector('span'); // Pegando o item span
        
        const done = evento.target.checked; // done marcado
        // Marcando no item 
        if (done) {
            itemConcluidoSpan.style.textDecoration = 'line-through';
        } else {
            itemConcluidoSpan.style.textDecoration = 'none';
        }

        // Alterando o status do done na lista
        list_tarefas = list_tarefas.map(t => {
            if (t.title === itemConcluidoSpan.textContent) {
                return {
                    title: t.title,
                    done: done
                };
            }
            return t;
        });
        console.log(list_tarefas);
        addlocalStorage();
    });

    // Criando a tag span
    const span = document.createElement('span');
    span.textContent = input_value;
    if (done) { // Riscando a tarefa mesmo atualizando a página
        span.style.textDecoration = 'line-through';
    }
    li.appendChild(span); // Adicionando span dentro da li

    // Criando o botão remover
    const botao_remover = document.createElement('button');
    botao_remover.textContent = 'remover';
    li.appendChild(botao_remover); // Adicionando botão remover dentro da li

    // Removendo item da ul
    botao_remover.addEventListener('click', (evento) => {
        const itemRemovido = evento.target.parentElement; // O pai do item removido --> li
        ul_list.removeChild(itemRemovido); // Removendo item na ul
        const itemRemovidoSpan = itemRemovido.querySelector('span').textContent; // Pegando o valor do item removido --> <span> tarefa 1 </span>
        // Removendo item da lista
        list_tarefas = list_tarefas.filter(t => t.title !== itemRemovidoSpan);
        console.log(list_tarefas);
        addlocalStorage();
    });

    // Adicionando a nova tarefa no topo ou no final da lista
    if (insertAtTop) {
        ul_list.insertBefore(li, ul_list.firstChild);
    } else {
        ul_list.appendChild(li);
    }
}

// Click do botão
btn_adicionar_tarefas.addEventListener('click', () => {
    const input_value = input_text.value; // Texto no input
    if (input_value.trim() === '') return; // Impede a adição de tarefas vazias

    list_tarefas.push({ // A lista vai ser um objeto no qual recebe o título
        title: input_value,
        done: false
    });
    
    permanenciaDados(input_value, false, true);
    addlocalStorage();
    console.log(list_tarefas);

    input_text.value = ''; // Limpa o campo de entrada após adicionar a tarefa
});

// Pegando informações salvas no navegador
window.onload = () => {
    const inforLocalStorage = localStorage.getItem('list_tarefas');
    if (!inforLocalStorage) return; // Se não tem dados salvos no navegador retorna
    list_tarefas = JSON.parse(inforLocalStorage); // Pega as informações salvas no navegador, converte de string para objetos
    list_tarefas.forEach(t => { // Percorrendo os títulos e a marcação da lista e imprimindo na tela
        permanenciaDados(t.title, t.done, false);
    });
    console.log(inforLocalStorage);
};

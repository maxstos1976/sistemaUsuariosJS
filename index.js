// Array para armazenar os usuários
let users = [];

// Elementos do DOM
const userInput = document.getElementById('userInput');
const messageElement = document.getElementById('message');
const userListElement = document.getElementById('userList');

// Função para exibir mensagens
function showMessage(text, isError = false) {
    if (messageElement) {
        messageElement.textContent = text;
        messageElement.style.color = isError ? '#d32f2f' : '#388e3c';
    } else {
        console.error('Elemento de mensagem não encontrado');
    }
}

// Função para atualizar a lista de usuários na interface
function updateUserList() {
    if (userListElement) {
        if (users.length === 0) {
            userListElement.innerHTML = '<li>Nenhum usuário cadastrado</li>';
        } else {
            userListElement.innerHTML = users
                .map((user, index) => `
                    <li data-index="${index}">
                        ${user}
                        <button onclick="deleteUserByIndex(${index})">×</button>
                    </li>
                `)
                .join('');
        }
    }
}

// Função para adicionar usuário
function addUser() {
    if (!userInput) {
        showMessage('Erro: Campo de entrada não encontrado', true);
        return;
    }

    const userName = userInput.value.trim();

    if (!userName) {
        showMessage('Por favor, digite um nome válido', true);
        return;
    }

    if (users.includes(userName)) {
        showMessage(`Usuário "${userName}" já existe!`, true);
        return;
    }

    users.push(userName);
    userInput.value = '';
    updateUserList();
    showMessage(`Usuário "${userName}" adicionado com sucesso!`);
}

// Função para buscar usuário
function findUser() {
    if (!userInput) {
        showMessage('Erro: Campo de entrada não encontrado', true);
        return;
    }

    const userName = userInput.value.trim();

    if (!userName) {
        showMessage('Por favor, digite um nome para buscar', true);
        return;
    }

    if (users.includes(userName)) {
        showMessage(`Usuário "${userName}" encontrado!`);
    } else {
        showMessage(`Usuário "${userName}" não encontrado`, true);
    }
}

// Função para deletar usuário pelo nome
function deleteUser() {
    if (!userInput) {
        showMessage('Erro: Campo de entrada não encontrado', true);
        return;
    }

    const userName = userInput.value.trim();

    if (!userName) {
        showMessage('Por favor, digite um nome para remover', true);
        return;
    }

    const index = users.indexOf(userName);
    if (index !== -1) {
        users.splice(index, 1);
        updateUserList();
        showMessage(`Usuário "${userName}" removido com sucesso!`);
        userInput.value = '';
    } else {
        showMessage(`Usuário "${userName}" não encontrado`, true);
    }
}

// Função para deletar usuário pelo índice (usado pelos botões na lista)
function deleteUserByIndex(index) {
    if (index >= 0 && index < users.length) {
        const deletedUser = users[index];
        users.splice(index, 1);
        updateUserList();
        showMessage(`Usuário "${deletedUser}" removido com sucesso!`);
    }
}

// Inicializa a lista quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    updateUserList();
});

// Adiciona suporte para pressionar Enter no campo de input
if (userInput) {
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addUser();
        }
    });
}
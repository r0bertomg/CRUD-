let usuario = JSON.parse(localStorage.getItem('usuario'));

if (usuario === null || usuario.perfil !== 'admin') {
    alert('Acesso permitido apenas para administrador!');
    window.location.href = '/public/index.html';
}

let idEditando = 0;
let perfilEditando = '';

function mostrar(pessoas) {
    let linhas = '';

    for (let i = 0; i < pessoas.length; i++) {
        linhas = linhas + '<tr>' +
            '<td>' + pessoas[i].nome + '</td>' +
            '<td>' + pessoas[i].sobrenome + '</td>' +
            '<td>' + pessoas[i].cpf + '</td>' +
            '<td>' + pessoas[i].email + '</td>' +
            '<td>' + pessoas[i].telefone + '</td>' +
            '<td>' + pessoas[i].cidade + '</td>' +
            '<td>' +
                '<button onclick="editar(' + pessoas[i].id + ')">Editar</button>' +
                '<button onclick="apagar(' + pessoas[i].id + ')">Apagar</button>' +
            '</td>' +
            '</tr>';
    }

    document.getElementById('lista').innerHTML = linhas;
}

function listar() {
    fetch('http://localhost:3000/pessoas')
        .then(resposta => resposta.json())
        .then(pessoas => {
            mostrar(pessoas);
        });
}

function buscar() {
    let cpf = document.getElementById('busca').value.replace(/\D/g, '');

    if (cpf === '') {
        listar();
        return;
    }

    fetch('http://localhost:3000/pessoas')
        .then(resposta => resposta.json())
        .then(pessoas => {
            let encontrados = [];

            for (let i = 0; i < pessoas.length; i++) {
                if (String(pessoas[i].cpf).replace(/\D/g, '').includes(cpf)) {
                    encontrados.push(pessoas[i]);
                }
            }

            if (encontrados.length === 0) {
                alert('Nenhum usuário encontrado!');
            }
            mostrar(encontrados);
        });
}

function editar(id) {
    fetch('http://localhost:3000/pessoas/' + id)
        .then(resposta => resposta.json())
        .then(pessoa => {
            idEditando = pessoa.id;
            perfilEditando = pessoa.perfil;

            document.getElementById('nome').value = pessoa.nome;
            document.getElementById('sobrenome').value = pessoa.sobrenome;
            document.getElementById('cpf').value = pessoa.cpf;
            document.getElementById('email').value = pessoa.email;
            document.getElementById('senha').value = pessoa.senha;
            document.getElementById('rua').value = pessoa.rua;
            document.getElementById('cep').value = pessoa.cep;
            document.getElementById('cidade').value = pessoa.cidade;
            document.getElementById('estado').value = pessoa.estado;
            document.getElementById('telefone').value = pessoa.telefone;

            document.getElementById('edicao').style.display = 'block';
        });
}

function salvar() {
    let pessoaEditada = {
        nome: document.getElementById('nome').value,
        sobrenome: document.getElementById('sobrenome').value,
        cpf: document.getElementById('cpf').value.replace(/\D/g, ''),
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value,
        rua: document.getElementById('rua').value,
        cep: document.getElementById('cep').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        telefone: document.getElementById('telefone').value,
        perfil: perfilEditando
    };

    fetch('http://localhost:3000/pessoas/' + idEditando, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pessoaEditada)
    })
    .then(() => {
        alert('Usuário atualizado!');
        cancelar();
        listar();
    });
}

function cancelar() {
    document.getElementById('edicao').style.display = 'none';
}

function apagar(id) {
    if (confirm('Deseja apagar este usuário?')) {
        fetch('http://localhost:3000/pessoas/' + id, {
            method: 'DELETE'
        })
        .then(() => {
            alert('Usuário apagado!');
            listar();
        });
    }
}

listar();

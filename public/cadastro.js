function enviarDados() {
    let nome = document.getElementById('nome').value;
    let sobrenome = document.getElementById('sobrenome').value;
    let cpf = document.getElementById('cpf').value.replace(/\D/g, '');
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;
    let rua = document.getElementById('rua').value;
    let cep = document.getElementById('cep').value;
    let cidade = document.getElementById('cidade').value;
    let estado = document.getElementById('estado').value;
    let telefone = document.getElementById('telefone').value;

    if (nome === '' || sobrenome === '' || cpf === '' || email === '' || senha === '' ||
        rua === '' || cep === '' || cidade === '' || estado === '' || telefone === '') {
        alert('Preencha todos os campos!');
        return;
    }

    let novaPessoa = {
        nome: nome,
        sobrenome: sobrenome,
        cpf: cpf,
        email: email,
        senha: senha,
        rua: rua,
        cep: cep,
        cidade: cidade,
        estado: estado,
        telefone: telefone,
        perfil: 'cliente'
    };

    fetch('http://localhost:3000/pessoas')
        .then(resposta => resposta.json())
        .then(lista => {
            for (let i = 0; i < lista.length; i++) {
                if (String(lista[i].cpf).replace(/\D/g, '') === cpf) {
                    alert('CPF já cadastrado!');
                    return;
                }
            }

            fetch('http://localhost:3000/pessoas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novaPessoa)
            })
            .then(() => {
                alert('Cadastrado com sucesso!');
                window.location.href = '/public/index.html';
            });
        });
}

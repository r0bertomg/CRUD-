function enviarDados() {
    let cpfInput = document.getElementById('cpf').value.replace(/\D/g, '');
    let senhaInput = document.getElementById('senha').value;

    fetch('http://localhost:3000/pessoas')
        .then(resposta => resposta.json())
        .then(pessoas => {
            let achou = null;

            for (let i = 0; i < pessoas.length; i++) {
                let cpfPessoa = String(pessoas[i].cpf).replace(/\D/g, '');

                if (cpfPessoa === cpfInput && pessoas[i].senha === senhaInput) {
                    achou = pessoas[i];
                    break;
                }
            }

            if (achou !== null) {
                localStorage.setItem('usuario', JSON.stringify(achou));
                alert('Login correto!');
                window.location.href = 'BemVindo.html';
            } else {
                alert('CPF ou senha errados!');
            }
        });
}

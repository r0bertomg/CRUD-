let usuario = JSON.parse(localStorage.getItem('usuario'));

if (usuario === null) {
    window.location.href = 'index.html';
} else {
    document.getElementById('nome').innerHTML = usuario.nome + ' ' + usuario.sobrenome;

    if (usuario.perfil === 'admin') {
        document.getElementById('linkAdmin').innerHTML = '<a href="/public/admin.html">Administração de usuários</a>';
    }
}

function sair() {
    localStorage.removeItem('usuario');
    window.location.href = 'index.html';
}

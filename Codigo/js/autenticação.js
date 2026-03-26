function toggleForm(target) {
    // Esconde todas as seções
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('register-screen').classList.add('hidden');
    document.getElementById('forgot-screen').classList.add('hidden');

    // Mostra apenas a selecionada
    if (target === 'login') {
        document.getElementById('login-screen').classList.remove('hidden');
    } else if (target === 'register') {
        document.getElementById('register-screen').classList.remove('hidden');
    } else if (target === 'forgot') {
        document.getElementById('forgot-screen').classList.remove('hidden');
    }
}
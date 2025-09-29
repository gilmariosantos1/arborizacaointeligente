document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o recarregamento da página

        // Coleta os dados do formulário
        const nome = document.getElementById('nome').value;
        const sobrenome = document.getElementById('sobrenome').value;
        const email = document.getElementById('email').value;
        const mensagem = document.getElementById('mensagem').value;

        // Exibe os dados no console (simulando um envio)
        console.log('--- Dados do Formulário ---');
        console.log('Nome:', nome);
        console.log('Sobrenome:', sobrenome);
        console.log('Email:', email);
        console.log('Mensagem:', mensagem);
        
        alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
        
        // Limpa o formulário após o envio
        contactForm.reset();
    });
});

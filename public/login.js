document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Simula um login bem-sucedido (independente de credenciais)
    window.location.href = 'https://brainbase-deploy.vercel.app/menu-inicial'; // Redireciona sempre para o menu inicial
});

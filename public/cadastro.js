document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Simula um cadastro bem-sucedido (independente dos dados inseridos)
    window.location.href = 'https://brainbase-deploy.vercel.app/login'; // Redireciona sempre para a página de login
});


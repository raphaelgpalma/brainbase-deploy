document.querySelector('form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `email=${email}&password=${password}`
    });

    if (response.redirected) {
        window.location.href = response.url; // Redireciona para o menu inicial
    } else {
        const result = await response.text();
        document.body.innerHTML = result;
    }
});

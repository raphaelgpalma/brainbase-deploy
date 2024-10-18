document.querySelector('form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirm-password').value;

    const response = await fetch('/cadastro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `name=${name}&email=${email}&password=${password}&confirm_password=${confirmPassword}`
    });

    if (response.redirected) {
        window.location.href = response.url; // Redireciona para a página de login
    } else {
        const result = await response.text();
        document.body.innerHTML = result;
    }
});

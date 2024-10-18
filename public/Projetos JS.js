document.getElementById('novo-projeto-btn').addEventListener('click', function() {
    document.getElementById('modal').classList.remove('hidden');
});

document.getElementById('salvar-nota-btn').addEventListener('click', function() {
    const tituloProjeto = document.getElementById('titulo-projeto').value.trim();
    const notaTextarea = document.getElementById('nota-textarea').value.trim();

    if (tituloProjeto !== "" && notaTextarea !== "") {
        const notaElement = document.createElement('div');
        notaElement.classList.add('nota');

        const tituloElement = document.createElement('h3');
        tituloElement.textContent = tituloProjeto;
        notaElement.appendChild(tituloElement);

        const conteudoElement = document.createElement('p');
        conteudoElement.textContent = notaTextarea;
        notaElement.appendChild(conteudoElement);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.addEventListener('click', function() {
            notaElement.remove();
        });
        notaElement.appendChild(deleteBtn);

        document.getElementById('notas-container').appendChild(notaElement);

        // Limpa os campos e esconde o modal
        document.getElementById('titulo-projeto').value = "";
        document.getElementById('nota-textarea').value = "";
        document.getElementById('modal').classList.add('hidden');
    } else {
        alert('Por favor, preencha o título e o conteúdo do projeto.');
    }
});

document.getElementById('cancelar-btn').addEventListener('click', function() {
    document.getElementById('titulo-projeto').value = "";
    document.getElementById('nota-textarea').value = "";
    document.getElementById('modal').classList.add('hidden');
});

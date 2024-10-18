document.getElementById('novo-projeto-btn').addEventListener('click', function() {
    document.getElementById('modal').classList.remove('hidden');
});

document.getElementById('salvar-projeto-btn').addEventListener('click', function() {
    const titulo = document.getElementById('titulo').value.trim();
    const integrantes = document.getElementById('integrantes').value.trim();
    const descricao = document.getElementById('descricao').value.trim();

    if (titulo !== "" && integrantes !== "" && descricao !== "") {
        const tabelaProjetos = document.getElementById('projetos-container');
        const novaLinha = tabelaProjetos.insertRow();

        novaLinha.insertCell(0).textContent = titulo;
        novaLinha.insertCell(1).textContent = integrantes;
        novaLinha.insertCell(2).textContent = descricao;

        const acaoCell = novaLinha.insertCell(3);
        
        // Botão de editar
        const editBtn = document.createElement('button');
        editBtn.classList.add('edit-btn');
        editBtn.innerHTML = '✏️';
        editBtn.addEventListener('click', function() {
            document.getElementById('editar-titulo').value = titulo;
            document.getElementById('editar-integrantes').value = integrantes;
            document.getElementById('editar-descricao').value = descricao;
            document.getElementById('editar-modal').classList.remove('hidden');

            document.getElementById('salvar-edicao-btn').onclick = function() {
                novaLinha.cells[0].textContent = document.getElementById('editar-titulo').value;
                novaLinha.cells[1].textContent = document.getElementById('editar-integrantes').value;
                novaLinha.cells[2].textContent = document.getElementById('editar-descricao').value;
                document.getElementById('editar-modal').classList.add('hidden');
            };
        });
        acaoCell.appendChild(editBtn);

        // Botão de deletar
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.addEventListener('click', function() {
            novaLinha.remove();
        });
        acaoCell.appendChild(deleteBtn);

        // Limpa os campos e esconde o modal
        document.getElementById('titulo').value = "";
        document.getElementById('integrantes').value = "";
        document.getElementById('descricao').value = "";
        document.getElementById('modal').classList.add('hidden');
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

document.getElementById('cancelar-btn').addEventListener('click', function() {
    document.getElementById('titulo').value = "";
    document.getElementById('integrantes').value = "";
    document.getElementById('descricao').value = "";
    document.getElementById('modal').classList.add('hidden');
});

document.getElementById('cancelar-edicao-btn').addEventListener('click', function() {
    document.getElementById('editar-modal').classList.add('hidden');
});
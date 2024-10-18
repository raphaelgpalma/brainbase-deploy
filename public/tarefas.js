document.getElementById('nova-tarefa-btn').addEventListener('click', function() {
    document.getElementById('modal').classList.remove('hidden');
});

document.getElementById('salvar-tarefa-btn').addEventListener('click', function() {
    const professor = document.getElementById('professor').value.trim();
    const materia = document.getElementById('materia').value.trim();
    const dataEntrega = document.getElementById('data-entrega').value.trim();
    const descricao = document.getElementById('descricao').value.trim();

    if (professor !== "" && materia !== "" && dataEntrega !== "" && descricao !== "") {
        const tabelaFazer = document.getElementById('tarefas-fazer-container');
        const novaLinha = tabelaFazer.insertRow();

        novaLinha.insertCell(0).textContent = professor;
        novaLinha.insertCell(1).textContent = materia;
        novaLinha.insertCell(2).textContent = dataEntrega;
        novaLinha.insertCell(3).textContent = descricao;

        const acaoCell = novaLinha.insertCell(4);
        
        // Botão de concluir
        const concluirBtn = document.createElement('button');
        concluirBtn.classList.add('concluir-btn');
        concluirBtn.innerHTML = '✅';
        concluirBtn.addEventListener('click', function() {
            const tabelaConcluidas = document.getElementById('tarefas-concluidas-container');
            tabelaConcluidas.appendChild(novaLinha);
            concluirBtn.remove(); // Remove o botão de concluir
        });
        acaoCell.appendChild(concluirBtn);

        // Botão de deletar
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.addEventListener('click', function() {
            novaLinha.remove();
        });
        acaoCell.appendChild(deleteBtn);

        // Limpa os campos e esconde o modal
        document.getElementById('professor').value = "";
        document.getElementById('materia').value = "";
        document.getElementById('data-entrega').value = "";
        document.getElementById('descricao').value = "";
        document.getElementById('modal').classList.add('hidden');
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

document.getElementById('cancelar-btn').addEventListener('click', function() {
    document.getElementById('professor').value = "";
    document.getElementById('materia').value = "";
    document.getElementById('data-entrega').value = "";
    document.getElementById('descricao').value = "";
    document.getElementById('modal').classList.add('hidden');
});
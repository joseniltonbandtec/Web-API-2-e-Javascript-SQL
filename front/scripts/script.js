var tbody = document.querySelector('table tbody');
var aluno = {};

function Cadastrar() {
    aluno.nome = document.querySelector('#nome').value;
    aluno.sobrenome = document.querySelector('#sobrenome').value;
    aluno.telefone = document.querySelector('#telefone').value;
    aluno.ra = document.querySelector('#ra').value;

    console.log(aluno);

    if (aluno.id === undefined || aluno.id === 0) {
        salvarEstudantes('POST', 0, aluno);
    }
    else {
        salvarEstudantes('PUT', aluno.id, aluno);
    }

    carregaEstudantes();

    $('#myModal').modal('hide');
}

function NovoAluno() {
    var btnSalvar = document.querySelector('#btnSalvar');

    document.querySelector('#nome').value = '';
    document.querySelector('#sobrenome').value = '';
    document.querySelector('#telefone').value = '';
    document.querySelector('#ra').value = '';

    aluno = {};

    btnSalvar.textContent = 'Cadastrar';

    tituloModal.textContent = 'Cadastrar Aluno';

    $('#myModal').modal('show');
}

function Cancelar() {
    var btnSalvar = document.querySelector('#btnSalvar');

    document.querySelector('#nome').value = '';
    document.querySelector('#sobrenome').value = '';
    document.querySelector('#telefone').value = '';
    document.querySelector('#ra').value = '';

    aluno = {};

    btnSalvar.textContent = 'Cadastrar';

    tituloModal.textContent = 'Cadastrar Aluno';

    $('#myModal').modal('hide');
}

function carregaEstudantes(metodo, id, corpo) {
    tbody.innerHTML = '';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:50221/api/Aluno/Recuperar`, true);
    xhr.setRequestHeader('Authorization', sessionStorage.getItem('token'));

    xhr.onerror = function () {
        console.log('ERRO', xhr.readyState)
    }

    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var estudantes = JSON.parse(this.responseText);
                for (var indice in estudantes) {
                    adicionaLinha(estudantes[indice]);
                }
            }
            else if(this.status == 500){
                var erro =  JSON.parse(this.responseText);
                consol.log(erro.Message);
                consol.log(erro.ExceptionMessage);
            }
        }
    }

    xhr.send();
}

function salvarEstudantes(metodo, id, corpo) {
    tbody.innerHTML = '';

    var xhr = new XMLHttpRequest();

    if (id === undefined || id === 0)
        id = '';

    xhr.open(metodo, `http://localhost:50221/api/Aluno/${id}`, false);

    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(corpo));
}

function excluirEstudantes(id) {
    var xhr = new XMLHttpRequest();

    xhr.open('Delete', `http://localhost:50221/api/Aluno/${id}`, false);

    xhr.send();
}

function excluir(estudante) {
    bootbox.confirm({
        message: `Tem certeza que deseja excluir o estudante ${estudante.nome}?`,
        buttons: {
            confirm: {
                label: 'Sim',
                className: 'btn-success'
            },
            cancel: {
                label: 'Não',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                excluirEstudantes(estudante.id);
                carregaEstudantes();
            }
        }
    });
}

carregaEstudantes();

function editarEstudante(estudante) {
    var btnSalvar = document.querySelector('#btnSalvar');

    document.querySelector('#nome').value = estudante.nome;
    document.querySelector('#sobrenome').value = estudante.sobrenome;
    document.querySelector('#telefone').value = estudante.telefone;
    document.querySelector('#ra').value = estudante.ra;

    btnSalvar.textContent = 'Salvar';

    tituloModal.textContent = `Editar Aluno ${estudante.nome}`;

    aluno = estudante;

    console.log(aluno);
}

function adicionaLinha(estudante) {
    var trow = `<tr> 
							<td>${estudante.nome}</td>
							<td>${estudante.sobrenome}</td>
							<td>${estudante.telefone}</td>
							<td>${estudante.ra}</td>
							<td><button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick='editarEstudante(${JSON.stringify(estudante)})'s>Editar</button>
								<button class="btn btn-danger" onclick='excluir(${JSON.stringify(estudante)})'>Excluir</button>	
							</td>
						</tr>
						`

    tbody.innerHTML += trow;
}
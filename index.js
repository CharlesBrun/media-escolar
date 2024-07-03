const prompt = require("prompt-sync")();

function cadastrarAluno(alunos, quantidade){
    quantidade = parseInt(prompt("Digite quantos alunos gostaria de cadastrar? "));

    //Validar entrada
    if(isNaN(quantidade) || quantidade < 0){
        console.log("Valor invalido!");
        return
    }

    for (let index = 0; index < quantidade; index++) {
        const nome = prompt(`Escreva o nome do aluno ${index+1}: `);
        const aluno = {
            nome: nome,
            materias: [],
        }
        alunos.push(aluno);
    }
    quantidade = 0;
}

function listarAlunos(alunos){
    for (let index = 0; index < alunos.length; index++) {
        console.log(`- ${alunos[index].nome}`);
    }
}

function cadastrarDados(alunos){
    let chaveMaterias = true;
    if(alunos.length > 0){
        for (let index = 0; index < alunos.length; index++) {
            console.log(`${index + 1}-${alunos[index].nome}.`)
        }
        
        const alunoIndexStr = prompt(`Digite o numero do aluno que deseja cadastrar a matéria? `);
        const alunoIndex = parseInt(alunoIndexStr) - 1;

        if (isNaN(alunoIndex) || alunoIndex < 0 || alunoIndex >= alunos.length){
            console.log("Aluno nao encontrado.")
        }else{
            let numeroDeMaterias = 0;
            console.log("Escreva o nome da matéria ou digite 'sair' para voltar ao menu principal. ")
            
            while (numeroDeMaterias < 3 || chaveMaterias) {
                const nomeMateria = prompt("");
                //Verifica se o usuario digitou sair ou se o numero de materias e maior que 3
                if (nomeMateria.toLowerCase() === "sair" && numeroDeMaterias >= 3) {
                    chaveMaterias = false;
                } else if (nomeMateria.toLowerCase() === "sair" && numeroDeMaterias < 3) {
                    console.log("Você deve cadastrar no mínimo 3 matérias!");
                    console.log("Escreva o nome da matéria: ")
                } else {
                    const materia = {
                        nome: nomeMateria,
                        notas: [],
                        faltas: 0
                    }

                    let faltas;
                    do {
                        faltas = parseInt(prompt(`Quantas faltas ${alunos[alunoIndex].nome} teve? `));
                        if (isNaN(faltas) || faltas < 0) {
                            console.log("Valor inválido! Digite um valor valido.");
                        }
                    } while (isNaN(faltas) || faltas < 0);
                    materia.faltas = faltas;

                    //Verifica e cadastra as notas
                    console.log("Faça o cadastro das 3 notas!")
                    for (let index = 0; index < 3; index++) {
                        let nota;
                        do {
                            nota = parseFloat(prompt(`Digite a ${index + 1} nota (0 a 10): `));
                            if (isNaN(nota) || nota < 0 || nota > 10) {
                                console.log("Nota inválida! Digite uma nota entre 0 e 10.");
                            }
                        } while (isNaN(nota) || nota < 0 || nota > 10);
                        materia.notas.push(nota);
                    }

                    alunos[alunoIndex].materias.push(materia);
                    numeroDeMaterias++;
                    console.log(`Matéria '${nomeMateria}' cadastrada para o aluno '${alunos[alunoIndex].nome}'.`);

                    console.log("Escreva o nome da matéria ou digite 'sair' para voltar ao menu principal. ")
                }
            }
        }
    }else{
        console.log("Nenhum aluno cadastrado.")
    }
}

function resultados(alunos){
    if(alunos.length > 0){
        for (let index = 0; index < alunos.length; index++) {
            console.log(`Aluno: ${alunos[index].nome}`);
            for (let indexMat = 0; indexMat < alunos[index].materias.length; indexMat++) {
                let materia = alunos[index].materias[indexMat];
                let somaNotas = 0;
                if (materia.faltas > 5){
                    console.log(
`Matéria: ${materia.nome}, 
Resultado: Reprovado por falta!
`
                );
                }else{
                    for (let i = 0; i < materia.notas.length; i++) {
                        somaNotas += materia.notas[i];
                    }
                    let media = somaNotas / materia.notas.length;
                    console.log(
`Matéria: ${materia.nome}, 
Média: ${media.toFixed(2)}, 
Resultado: ${media.toFixed(2)>=7?'Aprovado, acima da media!':'Reprovado, abaixo da media!'}
`
                    );
                }
            }
        }
    }else{
        console.log("Nenhum aluno cadastrado.")
    }
}

function main(){
    let alunos = [];
    let quantidade = 0;
    let chave = true;
    while (chave){

        console.log(
`
Selecione o menu desejado:
1 - Cadastro de aluno.
2 - Listagem de alunos.
3 - Cadastro de materia.
4 - Conferencia de resultados.
0 - Encerrar aplicacao.
`)
        let menu = prompt("");
    
        if (menu == 1){
            cadastrarAluno(alunos, quantidade);
        }else if(menu == 2){
            listarAlunos(alunos);
        }else if(menu == 3){
            cadastrarDados(alunos);
        }if(menu == 4){
            resultados(alunos);
        }else if(menu == 0){
            chave = false;
        }
    }
}


main();
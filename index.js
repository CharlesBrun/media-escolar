const prompt = require("prompt-sync")();

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
4 - Cadastro de notas.
5 - Conferencia de media.
0 - Encerrar aplicacao.
`)
        let menu = prompt("");
    
        if (menu == 1){
            quantidade = prompt("Quantos alunos gostaria de cadastrar? ");
            for (let index = 0; index < quantidade; index++) {
                const nome = prompt(`Escreva o nome do aluno ${index+1}: `);
                const aluno = {
                    nome: nome,
                    materias:[],
                }
                alunos.push(aluno);
            }
            quantidade = 0;
            
        }else if(menu == 2){
            for (let index = 0; index < alunos.length; index++) {
                console.log(`- ${JSON.stringify(alunos[index])};`)
            }
        }else if(menu == 3){
            let chaveMaterias = true;
            if(alunos.length>0){
                for (let index = 0; index < alunos.length; index++) {
                    console.log(`1-${alunos[index].nome}.`)
                }
                
                const alunoIndexStr = prompt(`Qual aluno deseja cadastrar materia? `);
                const alunoIndex = parseInt(alunoIndexStr) - 1;

                if (isNaN(alunoIndex) || alunoIndex < 0 || alunoIndex >= alunos.length){
                    console.log("Aluno nao encontrado.")
                }else{
                    console.log("Escreva o nome da materia ou digite 'sair' para voltar ao menu principal. ")
                    
                    while(chaveMaterias){
                        const nomeMateria = prompt("");
                        if (nomeMateria.toLowerCase() === "sair"){
                            chaveMaterias = false;
                        } else {
                            const materia = {
                                nome: nomeMateria,
                                notas: []
                            }
                            alunos[alunoIndex].materias.push(materia);
                            console.log(`Matéria '${nomeMateria}' cadastrada para o aluno '${alunos[alunoIndex].nome}'.`);
                            console.log("Escreva o nome da materia ou digite 'sair' para voltar ao menu principal. ")
                        }
                    }
                }
            }else{
                console.log("Nenhum aluno cadastrado.")
            }
        }else if(menu == 0){
            chave = false;
        }
    }
}


main();
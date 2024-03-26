const axios = require('axios');// Instalei o pacote Axios para me auxiliar na chamada do CEP
const readline = require('readline');// chamei o readline pra rodar no terminal

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function cadastrarPessoa() {
  rl.question('Digite o nome da pessoa: ', (nome) => {
    rl.question('Digite o CEP do endereço: ', (cep) => {
      buscarEndereco(cep, (endereco) => {
        if (endereco) {
          salvarNoBanco(nome, endereco);
        } else {
          console.log('Endereço não encontrado!');
        }
        rl.close();
      });
    });
  });
}

function buscarEndereco(cep, callback) {
  axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => {
      const { data } = response;
      if (!data.erro) {
        const endereco = `${data.logradouro}, ${data.localidade} - ${data.uf}`;
        callback(endereco);
      } else {
        callback(null);
      }
    })
    .catch(error => {
      console.log('Erro ao buscar endereço:', error.message);
      callback(null);
    });
}

function salvarNoBanco(nome, endereco) {
  // Lógica para salvar no banco aqui
  console.log(`Pessoa ${nome} cadastrada com sucesso!`);
  console.log(`Endereço: ${endereco}`);
}

cadastrarPessoa();

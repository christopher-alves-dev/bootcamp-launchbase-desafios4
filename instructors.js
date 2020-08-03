//requerer fs(file system) que é quem trabalha com arquivos do sistema. 
const fs = require('fs');

//Para que os dados antigos não sejam apagados pelos novos preenchidos, chamaremos o data.json. 
const data = require("./data.json");
//Necessário instalar o Intl pelo npm para substituir o do node, pois sem ele a data do created_at fica em formato AAAA-MM-DD 
const Intl = require('intl');
const { age, date, graduation, gender } = require("./utils");

//Função para mostrar a página do instrutor selecionado através do ID. 
exports.show = function(req, res) {
  //retirar o ID e colocá-lo como req.params
  const { id } = req.params;

  //se data.instructors achar
  const foundInstructor = data.instructors.find(function(instructor) {
    //retornar verdadeiro se o id do instrutor for o mesmo id do adicionado na barra de navegação. 
    return instructor.id == id
  })

  if (!foundInstructor) return res.send('instructor not found!');



  const instructor = {
    //tudo que tem dentro do objeto foundInstructor, spread operator
    ...foundInstructor,
    //formataremos a apresentação apenas destes dados. 
    birth: age(foundInstructor.birth),
    gender: gender(foundInstructor.gender),
    services: foundInstructor.services.split(','),
    graduation: graduation(foundInstructor.graduation),
    created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),
  }

  return res.render('instructors/show', { instructor });
}

//Função para editar os dados. 
exports.edit = function(req, res) {
  const { id } = req.params;

  const foundInstructor = data.instructors.find(function(instructor) {
    return instructor.id == id
  })

  if (!foundInstructor) return res.send('instructor not found!');

  const instructor = {
    ...foundInstructor,
    birth: date(foundInstructor.birth)
  }

  return res.render('instructors/edit', { instructor })
}


//Função para create
//exports.nomeDaFunção - Como é para capturar os dados que foram enviados pelo POST, chamamos de POST. 
exports.post = function(req, res) {
  //Para capturar os dados pelo method GET, utilizamos req.query, já pelo method POST utilizamos o req.body
  //Retorna apenas os valores preenchidos no formulário HTML. 
  const keys = Object.keys(req.body)

  //VALIDAÇÃO - Loop para que percorra todos os campos preenchidos e verificar se algum está vazio, se estiver, retornar uma mensagem para preencher, antes de enviar os dados para o banco de dados.
  for(key of keys) {
    //Mesma coisa que escrever req.body.avatar_url / req.body.name / ... 
    if(req.body[key] == '') {
      return res.send('Plz, fill all fields!')
    }
  }

  // === DESESTRUTURAÇÃO ===
  //Desestruturamos as nossas chaves para que sejam utilizados apenas os dados que queremos. created_at e id não irão aqui pois estão sendo adicionados individualmente mais abaixo. 
  let { avatar_url, birth, name, gender, graduation, services } = req.body


  //=== TRATAMENTO DOS DADOS ===
  //Transformaremos a data de nascimento em formato de milisegundos, da mesma forma que o Date.now. 
  birth = Date.parse(req.body.birth)

  //Irá criar uma chave no req.body chamado created_at e passando o constructor Date com método now, ele irá adicionar a data de hoje no formato de milisegundos desde o dia 01-01-1970. 
  const created_at = Date.now()

  //Cria um Id como sendo um número único, algo que não se repetirá
  const id = Number(data.instructors.length + 1)


  
  //data.instructors pois data é a variável que recebe o arquivo data.json e instructors pois é a chave que colocamos no data.json. Push pois estamos adicionando os dados que queremos no Array do instructors no data.json. Desta forma toda vez que preenchermos os dados no formulário, ele irá ficar adicionando os dados e não apenas escrevendo em cima do outro. 
  data.instructors.push({
    id,
    name, 
    avatar_url,
    birth,
    gender,
    services,
    graduation,
    created_at
  })

    /*Salvando os dados escritos no formulário HTML em um arquivo .JSON, criado automaticamente pelo NodeJS. writeFile é responsável por escrever no arquivo.
    -> 1º Parâmetro é o path (caminho) será na raiz do projeto no arquivo data.json
    -> 2º parâmetro é o objeto mas não colocamos apenas req.body pois precisamos que os arquivos sejam escritos em formato de objeto notação json, então usamos um constructor json (JSON.stringify(oQueSeraTransformadoEmJson)) os outros parâmetros do stringify é para a formatação, então JSON.stringify(oQueSeraTransformadoEmJson, null, 2) Null porque queremos que pule a linha e 2 que é a quantidade de espaços. 
    -> 3º Parâmetro é uma função Callback que é para o aplicativo continuar funcionando enquanto o arquivo está sendo escrito, buscando dado e etc. Sem esta função o aplicativo é bloqueado até que o arquivo finalize a escrita. Então a função Callback é executada depois de um tempo. 
    */
  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    //Então primeiro ele irá escrever o arquivo, em forma de objeto json para que então execute a função callback. Neste caso uma função que irá nos retornar uma mensagem de erro, caso apresente algum erro na escrita do arquivo. Se não der erro, nos redirecionar para a página /instructors.
    if (err) return res.send('Write file error!');


    return res.redirect('/instructors');
  } )

  // return res.send(req.body);
}



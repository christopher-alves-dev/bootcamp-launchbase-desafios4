module.exports = {
  age: function age(timestamp) {
    //estamos iniciando um novo objeto de data. 
  const today = new Date();
  const birthDate = new Date(timestamp);

  //2020 - 1992 = 28
  let age = today.getFullYear() - birthDate.getFullYear();

  const month = today.getMonth() - birthDate.getMonth();
  /*
  === MÊS ===
  Não fiz aniversário ainda quando:
  - Não chegou no mês - mês atual (06) - mês niver (05) = 1;
  - Está no mês - mês atual (06) - mês niver (06) = 0;

  * Fiz niver se - mês atual (06) - mês niver (07) = -1;
  === MÊS ===
  */

  today.getDate();
  birthDate.getDate();
  /*
  === DIA ===
  - Não chegou no dia - dia atual (06) - dia niver (05) = 1;
  - Está no dia - dia atual (06) - dia niver (06) = 0;

  * Fiz niver se - dia atual (06) - dia niver (07) = -1;
  */
    if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
      age = age -1;
    }

  return age
  
  },
  date: function(timestamp) {
    const date = new Date(timestamp);
    
    //Necessário adicionar UTC depois de get, para que o tempo não seja trabalhado de modo Local mas sim Universal. Sem o UTC dependendo aonde você estiver ao adicionar o dia 02, ele irá interpretar esse dado de acordo com a sua localização, se for no Brasil ele receberá como dia 01.  
    const year = date.getUTCFullYear();
    //Como queremos que retorne o mês de 01 à 12, precisamos adicionar + 1 no getMonth, pois ele vai de 00 à 11. 
    const month = `0${date.getUTCMonth() + 1}`.slice(-2);
    const day = `0${date.getUTCDate()}`.slice(-2);

    return `${year}-${month}-${day}`
  },
  graduation: function graduation(value) {
    switch (value) {
      case 'medio': return "Ensino Médio Completo";
      case 'graduated': return  "Ensino Superior Completo";
      case 'masters': return  "Mestrado";
      case 'doctorate': return  "Doutorado";
    }
  },
  gender: function gender(gender) {
    if (gender == 'F') {
      return 'Feminino';
    } else {
      return 'Masculino';
    }
  }
}
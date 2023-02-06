const horario = document.querySelector("#horario"),
containerDespertador = document.querySelector("#container__despertador"),
menuOpcao = document.querySelectorAll("#despertador__lista"),
botaoAlarme = document.querySelector("#btn");

// (horarioDoAlarme) variável criada para armazenar o horario definido em uma função e criar uma condição com esse horário em outra função.
// (horarioDoAlarmeDefinido) variável criada para desativar o despertador.
// (audio) variável que guarda o audio que irá tocar quando for o horário definido para despertar.
let horarioDoAlarme, horarioDoAlarmeDefinido = false,
audio = new Audio ("assets/audio/ringtone.mp3");

// Estrutura de repetição para que vá de 1 a 12 horas na lista.
for (let i = 12; i > 0; i--) {
    // Condição ternária para que seja adicionado um 0 na frente do número menor que 10.
    i = i < 10 ? "0" + i : i;

    // Variável que armazena a marcação responsável pela lista e números de horas.
    let opcao = `<option value="${i}">${i}</option>`;

    // Aqui é pego o indice 0, ou seja, a lista de horas, armazenada na variável opção e adicionada depois das tag que já estão dentro do menuOpcao.
    menuOpcao[0].firstElementChild.insertAdjacentHTML("afterend", opcao);
}

// Estrutura de repetição para que vá de 0 a 59 minutos na lista.
for (let i = 59; i >= 0; i--) {
    // Condição ternária para que seja adicionado um 0 na frente do número menor que 10.
    i = i < 10 ? "0" + i : i;

    // Variável que armazena a marcação responsável pela lista e números de minutos.
    let opcao = `<option value="${i}">${i}</option>`;

    // Aqui é pego o indice 1, ou seja, a lista de minutos, armazenada na variável opção e adicionada depois das tag que já estão dentro do menuOpcao.
    menuOpcao[1].firstElementChild.insertAdjacentHTML("afterend", opcao);
}

for (let i = 2; i > 0; i--) {
    // Condição ternária para que 1 seja AM e 2 seja PM.
    let amPm = i == 1 ? "AM" : "PM"

    // Variável que armazena a marcação responsável pela lista e períodos.
    let opcao = `<option value="${amPm}">${amPm}</option>`;

    // Aqui é pego o indice 2, ou seja, a lista de períodos, armazenada na variável opção e adicionada depois das tag que já estão dentro do menuOpcao.
    menuOpcao[2].firstElementChild.insertAdjacentHTML("afterend", opcao);
}

// Criando relógio com setInterval pois o tempo será atualizado a cada segundo (1000)
setInterval(() => {
    // variável que ir armazenar horas, minutos e segundos em conformidade com a data em tempo real.
    let data = new Date(),
    h = data.getHours(),
    m = data.getMinutes(),
    s = data.getSeconds(),
    amPm = "AM";

    // Aqui é feito uma condição para que ao chegar em 12, em vez de ir para 13, volte para 1. E o que antes era AM, irá virar PM.
    if (h >= 12) {
        h = h - 12;
        amPm = "PM";
    }

    // Aqui é feito uma condição para que, ao invés de ser apontado 0, seja apontado 12.
    h = h == 0 ? h = 12 : h;

    // Aqui irá adicionar um 0 na frente dos números menores que 10.
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    // Aqui pegamos o elemento html "h1" e "substituimos" o texto que tem nele, pelo texto do código abaixo.
    horario.innerText = `${h}:${m}:${s} ${amPm}`;

    // Condição que compara o horario definido para o alarme com o horário do relógio e dispara o som do alarme em loop.
    if(horarioDoAlarme == `${h}:${m} ${amPm}`) {
        audio.play();
        audio.loop = true;
    }

}, 1000);

//Função responsável por definir o horário e período que o alarme será dispertado.
function definirHorarioDoAlarme () {
    // condição para que ao clicar no botão quando estiver tocando o alarme o despertador desative.
    if(horarioDoAlarmeDefinido) {
        // Essa variável que antes armazenava o horário do alarme para comparar com o horario do relógio e despertar passa a ficar vázio.
        horarioDoAlarme = "";
        // O audio que estará tocando (play) será pausado (pause).
        audio.pause();
        // A classe disable que foi adicionada ao definir o despertador é removida ao desativar.
        containerDespertador.classList.remove("disable");
        // O botão que mudou para "desativar alarme" quando foi definido, ao desativar volta a ser "ativar alarme"
        botaoAlarme.innerText = "Ativar alarme";

        // A variável inicia armazenando o valor false, ao ser clicado "ativar alarme" passa a ser true, ao "desativar alarme" volta a ser false.
        return horarioDoAlarmeDefinido = false;
    }

    // Está variável irá guardar a hora, minuto e período escolhido
    let horarioDefinido = `${menuOpcao[0].value}:${menuOpcao[1].value} ${menuOpcao[2].value}`;
    
    // Essa condição exibirá uma mensagem se a pessoa não escolher um horaráio/periodo e tentar definir o alarme.
    if(horarioDefinido.includes("horas") || horarioDefinido.includes("minutos") || horarioDefinido.includes("am/pm")) {
        return alert("Por favor, escolha um horário válido para definir o alarme!");
    }

    horarioDoAlarmeDefinido = true;
    // Aqui a variável horarioDoAlarme, irá armazenar o horario definido para alarme que está armazenado na variável horarioDefinido.
    horarioDoAlarme = horarioDefinido;
    // Aqui vai ser adicionado a classe disable que podemos estilizar no css para mudar a opacidade do menu opção e bloquear o clique.
    containerDespertador.classList.add("disable");
    // Aqui, ao definir o horário de alarme clicando no botão, o texto do botão muda para "desativar o alarme".
    botaoAlarme.innerText = "Desativar alarme";

    console.log(horarioDefinido);
}

// Aqui é adicionado um evento de click ao botão de alarme em que executa a função definirHorarioDoAlarme.
botaoAlarme.addEventListener("click", definirHorarioDoAlarme);
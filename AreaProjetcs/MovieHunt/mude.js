const imagem = document.getElementById('imgExpo');
const div = document.getElementById('imginf');
const soloLevel = document.getElementById('soloLevel');
const Dg = document.getElementById('dragonBall');
const narutoShippuden = document.getElementById('narutoShippuden');
const blackCover = document.getElementById('blackCover');
const Attack = document.getElementById('Attack');
const Nanatsu = document.getElementById('Nanatsu');
const HxH = document.getElementById('HxH');

// Adicionando um evento de clique
soloLevel.addEventListener('click', function () {
    imagem.src = "../../Assets/SoloLeveling.jfif";
    div.textContent = 'Há mais de uma década, surgiu uma misteriosa passagem chamada “portal”, que conecta este mundo a uma dimensão diferente, o que fez com que pessoas despertassem poderes únicos… e essas pessoas são chamadas de “caçadores”. Os caçadores usam seus poderes sobre-humanos para conquistar masmorras dentro dos portais e assim ganhar a vida. Sung Jinwoo, um caçador de nível baixo, é considerado o caçador mais fraco de toda a humanidade. Certo dia, ele se depara com uma “masmorra dupla”, que tem uma masmorra de nível alto escondida dentro de uma masmorra de nível baixo. Diante de um Jinwoo gravemente ferido, surge uma misteriosa missão! À beira da morte, Jinwoo decide aceitar essa missão, tornando-se assim a única pessoa capaz de subir de nível!';
});
Dg.addEventListener('click', function () {
    imagem.src = "../../Assets/DragonDaima.jfif";
    div.textContent = 'Devido a uma conspiração, Goku e seus amigos ficam pequenos! Que tipo de aventuras aguardam Goku, Supremo Kai e os novos personagens Glorio e Panzy, neste novo mundo desconhecido, o “Reino Demoníaco”?';
});
narutoShippuden.addEventListener('click', function () {
    imagem.src = "../../Assets/Naruto.jpg";
    div.textContent = "Naruto Shippuuden ocorre 2 anos e meio após Naruto ter ficado para treinar com Jiraiya. Após seu retorno, Naruto descobre que seus amigos shinobi’s o superaram na classificação, e ele caiu para trás. No entanto, com apenas 6 meses para resgatar Sasuke, Naruto tem de enfrentar inimigos ainda mais perigosos. O plano da Akatsuki se revela lentamente e os perigos surgem mais do que nunca!";
});
blackCover.addEventListener('click', function () {
    imagem.src = "../../Assets/Black.jpg";
    div.textContent = 'Black Clover Todos os Episodios Online, Assistir Black Clover Anime Completo, Assistir Black Clover Dublado e Legendado Online.Num mundo onde magia é tudo, Asta e Yuno são abandonados em uma igreja no mesmo dia. Enquanto Yuno possui poderes mágicos excepcionais, Asta é a única pessoa do mundo todo desprovida desse dom. Aos quinze anos, ambos recebem grimórios – livros mágicos que amplificam os poderes do detentor. Asta recebe um raro grimório de anti-magia, capaz de negar e repelir os feitiços do oponente. Dois opostos que nutrem uma rivalidade amigável, Yuno e Asta estão prontos para encarar os mais difíceis desafios para conquistar seu sonho em comum: tornar-se o Rei dos Feiticeiros. Desistir não é opção!';
});
Attack.addEventListener('click', function () {
    imagem.src = "../../Assets/Attack.jpg";
    div.textContent = 'Shingeki No Kyojin Todos os Episodios Online, Assistir Shingeki No Kyojin Anime Completo, Assistir Shingeki No Kyojin Online.A história de Ataque dos Titãs gira em torno de uma humanidade que vem sendo exterminada por titãs. Porém alguns seres humanos estão dispostos a mudar história e formar um exército de ataque aos seres assassinos. É assim que entra Eren, nosso protagonista, que após ver sua mãe ser devorada por um titã, decide que não deixará nenhum deles vivo e buscará sua vingança completa.';
});
Nanatsu.addEventListener('click', function () {
    imagem.src = "../../Assets/Nanatsu.jpg";
    div.textContent = 'Nanatsu no Taizai Dublado Todos os Episodios Online, Assistir Nanatsu no Taizai Anime Completo, Assistir Nanatsu no Taizai Online.A história segue os “Sete Pecados Capitais”, um grupo maligno de cavaleiros que conspiraram para derrubar o reino de Britânia, supostamente foram erradicados pelos Cavaleiros Divinos, embora ainda existam rumores de que eles estão vivos.';
});
HxH.addEventListener('click', function () {
    imagem.src = "../../Assets/HxH.jpg";
    div.textContent = 'Hunter x Hunter 2011 Todos os Episodios Online, Assistir Hunter x Hunter 2011 Anime Completo.Gon Freecss, um garoto de doze anos, um dia descobre que seu pai, que supostamente estava morto, estava vivo e bem. Seu Pai, Ging, é um Hunter, um membro de elite da sociedade com uma licença para ir a qualquer lugar ou fazer qualquer coisa.';
});


const btnAnimes = document.getElementById('btnAnimes');
const btnDesenhos = document.getElementById('btnDesenhos');
const btnFilmes = document.getElementById('btnFilmes');
const divanimes = document.getElementById('animes');
const divdesenhos = document.getElementById('desenhos');
const divfilmes = document.getElementById('filmes');

btnAnimes.addEventListener('click', function () {
    divanimes.style.display = 'flex';  // Esconde a Div 1
    divdesenhos.style.display = 'none'; // Exibe a Div 2
    divfilmes.style.display = 'none';  // Esconde a Div 3
});
btnDesenhos.addEventListener('click', function () {
    divanimes.style.display = 'none';  // Esconde a Div 1
    divdesenhos.style.display = 'flex'; // Exibe a Div 2
    divfilmes.style.display = 'none';  // Esconde a Div 3
});
btnFilmes.addEventListener('click', function () {
    divanimes.style.display = 'none';  // Esconde a Div 1
    divdesenhos.style.display = 'none'; // Exibe a Div 2
    divfilmes.style.display = 'flex';  // Esconde a Div 3
});

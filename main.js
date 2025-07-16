const GAME_VERSION = "0.3.0"; // Mude manualmente a cada atualização

// ====================
// CONFIGURAÇÃO PRINCIPAL DO JOGO (RESPONSIVO)
// ====================

// Tamanho base (proporção 9:16, mobile first)
const BASE_WIDTH = 540;
const BASE_HEIGHT = 960;

const config = {
  type: Phaser.AUTO,
  width: BASE_WIDTH,
  height: BASE_HEIGHT,
  backgroundColor: '#222',
  physics: {
    default: 'arcade',
    arcade: {
      debug: true // mostra hitboxes
    }
  },
  scene: {    // Define os três métodos principais da cena do jogo
    preload,  // Carrega assets (imagens, sons, etc).
    create,   // Cria e inicializa objetos do jogo.
    update    // Executa a lógica do jogo a cada quadro (frame).
  }
};

// Cria uma nova instância do jogo Phaser usando a configuração acima.
const game = new Phaser.Game(config);

// ====================
// FUNÇÃO DE REDIMENSIONAMENTO RESPONSIVO
// ====================

// Essa função faz o canvas ocupar a maior área possível da tela do usuário, SEM distorcer
function resizeGame() {
  const canvas = document.querySelector('canvas');
  if (!canvas) return;
  // Calcula proporção da janela e do jogo
  const windowRatio = window.innerWidth / window.innerHeight;
  const gameRatio = BASE_WIDTH / BASE_HEIGHT;
  let width, height;
  if (windowRatio < gameRatio) {
    // Janela mais "alta" (ou mais estreita) que o jogo
    width = window.innerWidth;
    height = width / gameRatio;
  } else {
    // Janela mais "larga" que o jogo
    height = window.innerHeight;
    width = height * gameRatio;
  }
  // Aplica o tamanho visualmente, mantendo as coordenadas base no jogo
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  // Centralização vertical extra: ajusta margin-top para centrar mesmo em browsers mobile bugados
  canvas.style.position = "absolute";
  canvas.style.left = `calc(50% - ${width / 2}px)`;
  canvas.style.top = `calc(50% - ${height / 2}px)`;
}

window.addEventListener('resize', resizeGame);
window.addEventListener('orientationchange', resizeGame);
window.addEventListener('load', resizeGame);
setTimeout(resizeGame, 100); // Extra para garantir após carregamento

// ====================
// VARIÁVEIS GLOBAIS
// ====================

// Referências aos principais objetos do jogo
let player;
let cursors;
let obstacles;
let bonus;
let speed = 200; // velocidade do jogador

// Flags de movimento via botão
let moveLeft = false;
let moveRight = false;

// ====================
// FUNÇÕES DE CICLO DO JOGO
// ====================

function preload() {
  // Nada para carregar por enquanto
}

function create() {
  // ====================
  // CRIAÇÃO DO PERSONAGEM
  // ====================

  // Cria o personagem centralizado horizontalmente, próximo ao fundo da tela
  player = this.add.rectangle(BASE_WIDTH / 2, BASE_HEIGHT - 150, 40, 40, 0x3498db);
  this.physics.add.existing(player);
  player.body.setCollideWorldBounds(true); // Não deixa sair da tela

  // ====================
  // BOTÕES DE CONTROLE VIRTUAIS (ESQUERDA E DIREITA)
  // ====================

  // Parâmetros dos botões, posicionados de forma proporcional ao tamanho base
  const btnSize = 90;
  const yBtn = BASE_HEIGHT - btnSize * 0.8;

  // Botão Esquerda
  const btnLeft = this.add.rectangle(btnSize * 0.7, yBtn, btnSize, btnSize, 0xaaaaaa)
    .setOrigin(0.5)
    .setInteractive();
  this.add.text(btnSize * 0.7, yBtn, "←", { font: "40px Arial", color: "#222" }).setOrigin(0.5);

  // Botão Direita
  const btnRight = this.add.rectangle(BASE_WIDTH - btnSize * 0.7, yBtn, btnSize, btnSize, 0xaaaaaa)
    .setOrigin(0.5)
    .setInteractive();
  this.add.text(BASE_WIDTH - btnSize * 0.7, yBtn, "→", { font: "40px Arial", color: "#222" }).setOrigin(0.5);

  // Listeners para os botões (touch/click)
  btnLeft.on('pointerdown', () => { moveLeft = true; });
  btnLeft.on('pointerup', () => { moveLeft = false; });
  btnLeft.on('pointerout', () => { moveLeft = false; }); // Caso o dedo/cursor saia do botão

  btnRight.on('pointerdown', () => { moveRight = true; });
  btnRight.on('pointerup', () => { moveRight = false; });
  btnRight.on('pointerout', () => { moveRight = false; });

  // ====================
  // CRIAÇÃO DE GRUPOS DE OBSTÁCULOS E BÔNUS
  // ====================

  // Grupo de obstáculos
  obstacles = this.physics.add.group();
  // Grupo de bônus
  bonus = this.physics.add.group();

  // Adiciona alguns obstáculos iniciais
  for (let i = 0; i < 5; i++) {
    addObstacle(this);
  }

  // Cria novos obstáculos a cada 800ms
  this.time.addEvent({
    delay: 800,               // tempo em ms (0.8s)
    callback: () => addObstacle(this),
    loop: true
  });
  // Gera bônus a cada X segundos (exemplo: a cada 2 segundos)
  this.time.addEvent({
    delay: 2000,
    callback: () => addBonus(this),
    loop: true
  });

  // ====================
  // COLISÕES
  // ====================

  // Colisão entre jogador e obstáculos
  this.physics.add.overlap(player, obstacles, hitObstacle, null, this);
  // Colisão entre jogador e bônus
  this.physics.add.overlap(player, bonus, hitBonus, null, this);

  // ====================
  // CONTROLES DO TECLADO
  // ====================

  cursors = this.input.keyboard.createCursorKeys();

  // Exibe o número da versão no canto inferior direito
  this.add.text(BASE_WIDTH - 10, BASE_HEIGHT - 10, "v" + GAME_VERSION, {
    font: "16px Arial",
    fill: "#fff"
  }).setOrigin(1, 1); // Origem no canto inferior direito

  // Redimensiona ao criar a cena (garante ajuste ao abrir o jogo)
  resizeGame();
}

// ====================
// LOOP PRINCIPAL DO JOGO
// ====================

function update() {
  // Movimento do jogador
  player.body.setVelocity(0);

  // Aceita tanto teclado quanto botões virtuais
  if (cursors.left.isDown || moveLeft) player.body.setVelocityX(-speed);
  if (cursors.right.isDown || moveRight) player.body.setVelocityX(speed);
  if (cursors.up.isDown) player.body.setVelocityY(-speed);
  if (cursors.down.isDown) player.body.setVelocityY(speed);

  // ====================
  // MOVIMENTO E REMOÇÃO DE OBSTÁCULOS
  // ====================
  let toRemove = [];
  obstacles.children.iterate((obs) => {
    obs.y += 6; // Aumenta ou diminui para ajustar a dificuldade
    if (obs.y > BASE_HEIGHT + 40) {
      toRemove.push(obs);
    }
  });
  toRemove.forEach((obs) => {
    obs.destroy();
  });

  // ====================
  // MOVIMENTO E REMOÇÃO DE BÔNUS
  // ====================
  let bonusToRemove = [];
  bonus.children.iterate((b) => {
    b.y += 6; // Mesma velocidade dos obstáculos
    if (b.label) b.label.y = b.y; // texto acompanha o retângulo
    if (b.y > BASE_HEIGHT + 40) {
      bonusToRemove.push(b);
    }
  });
  bonusToRemove.forEach((b) => {
    if (b.label) b.label.destroy();
    b.destroy();
  });
}

// ====================
// FUNÇÃO: ADICIONAR OBSTÁCULO
// ====================

function addObstacle(scene) {
  // Obstáculo é um retângulo vermelho, posição aleatória no topo (proporcional ao canvas base)
  const margin = 50;
  const x = Phaser.Math.Between(margin, BASE_WIDTH - margin);
  const obs = scene.add.rectangle(x, -30, 70, 38, 0xff3333);
  scene.physics.add.existing(obs);
  obs.body.setImmovable(true);
  obstacles.add(obs);
}

// ====================
// FUNÇÃO: COLISÃO COM OBSTÁCULO
// ====================

function hitObstacle(player, obs) {
  player.setFillStyle(0xff0000); // Fica vermelho ao colidir
  // Você pode pausar o jogo, mostrar mensagem, etc.
  // Exemplo: this.scene.pause();
}

// ====================
// FUNÇÃO: ADICIONAR BÔNUS
// ====================

function addBonus(scene) {
  // Escolhe tipo aleatório de bônus
  const tipos = [
    { cor: 0x2ecc40, texto: "paciência" },
    { cor: 0xfff700, texto: "humor" }
  ];
  const tipo = Phaser.Utils.Array.GetRandom(tipos);

  // Posição aleatória no topo (proporcional ao canvas base)
  const margin = 50;
  const x = Phaser.Math.Between(margin, BASE_WIDTH - margin);
  const newBonus = scene.add.rectangle(x, -30, 90, 36, tipo.cor);
  scene.physics.add.existing(newBonus);
  newBonus.body.setImmovable(true);
  bonus.add(newBonus);

  // Adiciona texto em cima do bônus
  const label = scene.add.text(x, -30, tipo.texto, {
    font: "20px Arial",
    fill: "#222",
    align: "center"
  }).setOrigin(0.5);

  // Vincula o texto ao bônus para que ele desça junto
  newBonus.label = label;
}

// ====================
// FUNÇÃO: COLISÃO COM BÔNUS
// ====================

function hitBonus(player, bonus) {
  player.setFillStyle(0x00ff00); // Fica verde ao pegar bônus
  if (bonus.label) bonus.label.destroy();
  bonus.destroy();
  // Você pode incrementar a pontuação ou efeito especial aqui!
}

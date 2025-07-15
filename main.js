const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#222',
  physics: {
    default: 'arcade',
    arcade: {
      debug: true          // mostra hitboxes
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

// Declara variáveis globais para guardar referências ao personagem, aos controles e ao chão.
let player;
let cursors;
let obstacles;
let speed = 200; // velocidade do jogador

function preload() {
  // Nada para carregar por enquanto
}

function create() {
  // Criar jogador (círculo azul)
  player = this.add.rectangle(400, 500, 40, 40, 0x3498db);
  this.physics.add.existing(player);
  player.body.setCollideWorldBounds(true); // Não deixa sair da tela

  // Criar grupo de obstáculos
  obstacles = this.physics.add.group();

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

  // Colisão entre jogador e obstáculos
  this.physics.add.overlap(player, obstacles, hitObstacle, null, this);

  // Controles do teclado
  cursors = this.input.keyboard.createCursorKeys();
}

// LOOP PRINCIPAL
// Função chamada toda vez que um novo quadro (frame) do jogo é desenhado (~60 vezes por segundo)
function update() {
  // Movimento do jogador
  player.body.setVelocity(0);

  if (cursors.left.isDown) player.body.setVelocityX(-speed);
  if (cursors.right.isDown) player.body.setVelocityX(speed);
  if (cursors.up.isDown) player.body.setVelocityY(-speed);
  if (cursors.down.isDown) player.body.setVelocityY(speed);

  // 1. Array para obstáculos que saíram da tela
  let toRemove = [];

  // Move obstáculos para baixo
  obstacles.children.iterate((obs) => {
    obs.y += 4;
    if (obs.y > 650) {
      toRemove.push(obs);
    }
  });

  // 2. Remover/adicionar obstáculos FORA do loop de iteração
  toRemove.forEach((obs) => {
    obs.destroy();
  });
}

function addObstacle(scene) {
  // Obstáculo é um retângulo vermelho, posição aleatória no topo
  const x = Phaser.Math.Between(50, 750);
  const obs = scene.add.rectangle(x, -30, 60, 30, 0xff3333);
  scene.physics.add.existing(obs);
  obs.body.setImmovable(true);
  obstacles.add(obs);
}

function hitObstacle(player, obs) {
  player.setFillStyle(0xff0000); // Fica vermelho ao colidir
  // Você pode pausar o jogo, mostrar mensagem, etc.
  // Exemplo: this.scene.pause();
}

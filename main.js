const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#222',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 600 }, // gravidade
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
let ground;

function preload() {
  // Nada para carregar por enquanto
}

function create() {
  // Criando o chão (um retângulo largo)
  ground = this.add.rectangle(400, 580, 800, 40, 0x006400);
  this.physics.add.existing(ground, true); // true = estático

  // Criando o personagem (retângulo pequeno)
  player = this.add.rectangle(100, 500, 40, 60, 0x3498db);
  this.physics.add.existing(player);

  player.body.setCollideWorldBounds(true); // Não deixa sair da tela

  // Colisão entre personagem e chão
  this.physics.add.collider(player, ground);

  // Controles do teclado
  cursors = this.input.keyboard.createCursorKeys();
}

// LOOP PRINCIPAL
// Função chamada toda vez que um novo quadro (frame) do jogo é desenhado (~60 vezes por segundo)
function update() {
  // Movimentação lateral
  if (cursors.left.isDown) {
    player.body.setVelocityX(-200);
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(200);
  } else {
    player.body.setVelocityX(0);
  }

  // Pulo (só se estiver tocando o chão)
  if (cursors.up.isDown && player.body.touching.down) {
    player.body.setVelocityY(-350);   // velocidade negativa para cima
  }
}

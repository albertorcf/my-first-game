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
  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);

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
    player.body.setVelocityY(-350);
  }
}

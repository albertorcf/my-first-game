// main.js

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#222',
  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);

function preload() {
  // Aqui você carrega imagens, sons, etc.
  // this.load.image('player', 'assets/player.png');
}

function create() {
  // Aqui você cria os objetos do jogo (personagem, inimigos, etc)
  // this.player = this.add.sprite(100, 300, 'player');
}

function update() {
  // Aqui você atualiza a lógica do jogo a cada frame
  // ex: movimentação, colisões, etc.
}

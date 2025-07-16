# my-first-game
Meu primeiro game!

- [ToDo](#todo)
- [Links](#links)
- [Notas](#notas)
  - [Branches Git](#branches-git)
  - [Responsividade](#responsividade)


# ToDo

📌 Pendências
- Implementar sistema de pontuação
- Adicionar sistema de vidas
- Criar níveis de dificuldade (ex: aumentar velocidade dos obstáculos com o tempo)
- Adicionar “power-ups” e armas especiais (bazuca, lançador de plasma, etc)
- Implementar sprites e/ou animações no lugar dos retângulos
- Adicionar sons de efeitos e música de fundo
- Adicionar tela de início e tela de game over
- Publicar versão jogável online (GitHub Pages ou similar)
- Refatorar código para facilitar adição de novos obstáculos e bônus
- Organizar o projeto em múltiplos arquivos/módulos para facilitar manutenção

🚧 **Lista de obstáculos (urbanos caóticos 😁)**
- Buracos na calçada
- Motos trafegando na calçada na contra-mão
- Motos surgindo do nada e vindo pra cima de você
- Cocô de cachorro
- Pedestres ocupando quase toda a calçada com um, dois ou até três cachorros
- Motos e carros estacionados na calçada

🎁 **Lista de bônus**
- Dose extra de paciência (retângulo escrito "paciência")
- Dose extra de bom humor (retângulo escrito "humor")

💡 **Regras e ideias extras**
- Ao colidir com obstáculos, personagem fica vermelho (e pode perder ponto/vida)
- Ao colidir com bônus, personagem fica verde (e pode ganhar pontos ou “força extra”)
- Obstáculos e bônus aparecem de forma aleatória
- Possibilidade de ganhar bônus consecutivos para combos


# Links

- [Phaser - HTML5 Game Framework - GitHub](https://github.com/phaserjs/phaser)
- [Phaser - HTML5 Game Framework - npm](https://www.npmjs.com/package/phaser)


# Notas

O Phaser é bem leve e pode ser rodado direto em um HTML simples com um `<script>`, ou você pode usar ferramentas modernas (como `Vite`, `Webpack`, etc.) para projetos maiores.

**Visão/Formatos comuns em jogos 2D**
- **Side-scroller (plataforma tradicional):**  
  Visão de lado (`Mario`, `Sonic`), o personagem anda e pula por plataformas, obstáculos e inimigos.
- **Top-down (visão de cima):**  
  Visão de cima (`Zelda clássico`, `Hotline Miami`), o personagem anda em todas direções num plano "visto de cima".
- **Run & Gun (tiro lateral, tipo Metal Slug/Contra):**  
  Parecido com side-scroller, mas com foco em ação e armas.
- **Endless runner:**  
  O cenário anda para esquerda/direita e o personagem tem que evitar obstáculos (tipo `Subway` `Surfers`, `Canabalt`).

## Branches Git
- Crie branches separados no Git para cada protótipo (ex: `top-down`, `side-scroller`, `endless-runner`).
- Vantagens: mantém o histórico limpo, fácil voltar para versões anteriores.
- Recomendo criar uma branch principal chamada `main` (ou `dev`), e para cada ideia/protótipo, criar uma branch a partir dela:  
  ```sh
  git checkout main
  git pull
  git checkout -b prototipo-topdown
  # Faz as alterações e commits nessa branch
  ```
  
  Mesclar as alterações do branch de protótipo de volta para o main
  ```sh
  git checkout main           # Volte para o main.
  git pull                    # Atualize o main (opcional, caso trabalhe em time).
  git merge prototipo-topdown # Faça o merge do protótipo. Aplica as mudanças do seu protótipo no branch main.
  ```

  Se usar `GitHub`  
  Você pode criar um `Pull Request` do branch prototipo-topdown para o main e aceitar pelo site, se quiser manter tudo registrado (bom para projetos maiores ou colaborativos).

  ```sh
  # Se tudo estiver OK, você pode deletar o branch de protótipo
  git branch -d prototipo-topdown
  # (Opcional, remove também do remoto)
  git push origin --delete prototipo-topdown
  ```

Tags e Releases
- Tags e releases são boas para marcar versões que você gostou e quer guardar para voltar fácil.
- Exemplo: depois que gostar de um protótipo, faz um `git tag v0.1-topdown` e continua explorando novas ideias.
- Uma tag é só um marcador de commit (não depende do branch).
- Use nomes diferentes para branch e tag sempre que possível!
```sh
git tag v0.1-side-scroller
git push --tags   # Enviar todas as tags que criou localmente

git tag   # Ver as tags
git checkout v0.1-topdown   # Voltar para uma tag específica
```
(Lembrando: isso coloca o repo em modo “detached HEAD”, ou seja, você não está em nenhum branch ativo. Só para referência/análise.)


## Responsividade

**2️⃣ Controles para Mobile (toque na tela)**

Opções mais comuns:
- **Botões virtuais:** Desenhar “setas” e “botão de tiro” na tela (overlay) e capturar toques.
- **Gestos:** Arrastar o dedo (swipe) ou tocar para mover.
- **Arrastar personagem diretamente:** Personagem segue o dedo.

Exemplo mais simples:
- Adicionar dois botões retangulares no canto inferior esquerdo/direito: ← e →
- Quando o usuário toca, o personagem move para aquela direção.

**Com Phaser:**  
Você pode criar os botões com `this.add.rectangle` ou `this.add.image` e adicionar eventos de pointer/touch.


**Como testar no mobile**

**Opção 1: Deploy no GitHub Pages**
- Super fácil:
  1. Faça push do seu código para o GitHub.
  2. Vá em `Settings > Pages` no seu repositório.
  3. Selecione a branch (`main` ou outra) e a pasta raiz (`/root`).
  4. O GitHub gera um link do tipo:  
  https://albertorcf.github.io/my-first-game/
  5. Acesse esse link no navegador do seu celular!

**Opção 2: Usar o IP do seu computador na LAN**
- Rode um server local (ex: com `Live Server` no VS Code).
- Instale a extensão `Live Server` no marketplace do VS Code (desenvolvedor: Ritwick Dey).
- No **Explorer** (barra lateral esquerda), localize o index.html e clique com o botão direito: `Open with Live Server (Alt+L Alt+O)`
- Descubra o IP do seu PC (ex: 192.168.1.181).
- No celular, acesse: `http://192.168.1.181:5500` (ajustar ip e porta).

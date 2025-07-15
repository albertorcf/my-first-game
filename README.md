# my-first-game
Meu primeiro game!

- [Links](#links)
- [Notas](#notas)
  - [Branches Git](#branches-git)


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
```sh
git tag v0.1-side-scroller
git push --tags   # Enviar todas as tags que criou localmente

git tag   # Ver as tags
git checkout v0.1-topdown   # Voltar para uma tag específica
```
(Lembrando: isso coloca o repo em modo “detached HEAD”, ou seja, você não está em nenhum branch ativo. Só para referência/análise.)
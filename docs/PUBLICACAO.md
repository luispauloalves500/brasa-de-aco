# Publicação — v0.3.0

- Jogo: https://luispauloalves500.github.io/brasa-de-aco/
- Repositório: https://github.com/luispauloalves500/brasa-de-aco
- Fonte Pages: `main`, raiz, HTTPS; push normal, sem força.
- Verificado em 10/11/2026 18:17, America/Sao_Paulo (UTC-3).
- Código efetivamente testado: `e8a5a36018848b73b212090014efb4426753167f`. O commit seguinte registra evidência/documentação, sem alterar lógica ou bundle.

## Resultado remoto

1. Raiz **HTTPS 200**, HTML usa `game-v0.3.0.js` e CSS versionado.
2. Bundle remoto idêntico ao local: SHA-256 `1fd0283146d22ece763367779ebca2ca17246615d5da8eba2ef3691dfc9fbab8`.
3. [CI](https://github.com/luispauloalves500/brasa-de-aco/actions/runs/42903141556) e [Pages](https://github.com/luispauloalves500/brasa-de-aco/actions/runs/42903140697) concluídos com sucesso para esse código.
4. **Onze cenários funcionais Chromium na URL pública:** cinco M1, cinco M2 e um harness de polimento. Zero erros runtime/rejeições/console/HTTP detectados pelos harnesses; boot/API também verificados. Os mesmos cenários passaram localmente.
5. **65 testes Node aprovados**, incluindo vitória nas duas rotas de ambas as missões por inputs normais, sem alteração de HP/teleporte/dano artificial nos bots. Recruta com escudo assistido: não certifica todas as dificuldades.
6. Benchmark público separado, **sem tempo virtual**: 120 submissões Canvas aquecidas por missão, 260 partículas e dez explosões. M1: média 3.74 ms, P95 6.90 ms; M2: média 3.79 ms, P95 7.40 ms. Isto mede CPU de submissão, não GPU/vsync/FPS real do jogador.

Evidência: `polish/QA-M1-PUBLICO.json`, `QA-M2-PUBLICO.json`, `QA-POLISH-PUBLICO.json`, `QA-PERF-PUBLICO.json` e `QA-LOGIC.txt`. Capturas da publicação em `docs/polish/` e `/workspace/brasa-shots/polish/published/`; comparação com v0.2 em `/workspace/brasa-shots/polish/comparacao-antes-depois.png`.

## Cache, preservação e limites

Bundle/CSS versionados e assets locais, sem CDN. O bundle já está commitado; nenhum build é necessário para jogar. **Ctrl+F5** se uma aba anterior estiver aberta. Checkpoints/progresso antigos continuam legíveis; backups válidos podem recuperar checkpoint corrompido, preservando o arquivo original.

Esta revisão melhora apenas M1/M2; não adiciona missões, coop ou finais. Gamepads físicos, leitores de tela reais, áudio/mix ouvido, outros navegadores/mobile e FPS/P99 em hardware real continuam sem certificação. Trem usa referencial relativo. O objetivo de engenharia registra 1/4 do futuro Final B, não um final completo. Histórico em `archive/PUBLICACAO-v0.2.md`.

# Publicação — v0.2.0

- Jogo: https://luispauloalves500.github.io/brasa-de-aco/
- Repositório: https://github.com/luispauloalves500/brasa-de-aco
- Fonte Pages: `main`, raiz, HTTPS. Push normal, sem força.
- Verificação: 10/11/2026 17:46, America/Sao_Paulo (UTC-3).
- Código da missão: `9bb73560ece9629e252fe02e1d90ec46ec15ba72`.
- Código/bundle efetivamente verificado na URL: `9cb715aab476c60d7f39d311595949d7481555b2`. Commits posteriores de evidência não alteram a lógica do jogo.

## Verificação remota real

1. HTTPS **200** na raiz; HTML aponta para `game-v0.2.0.js`.
2. Bundle remoto idêntico ao local: SHA-256 `81d815dbbd54faa64e5b385510bcb5dcde9c23374fdf3fd30b89f54a2785368c`.
3. [Static game checks](https://github.com/luispauloalves500/brasa-de-aco/actions/runs/42898329456) e [Pages build/deployment](https://github.com/luispauloalves500/brasa-de-aco/actions/runs/42898328832) concluídos com sucesso para o bundle.
4. **Dez cenários Chromium headless executados diretamente na URL pública**, não só em localhost: cinco M1 + cinco M2; zero erros runtime/rejeições/HTTP detectados pelos harnesses.
5. M2: desbloqueio após vitória real por bot em M1, próxima missão, briefing, seleção, PT/EN, vila, telhados, Mula/Baldo, Moloch, vitória, epílogo, persistência do regulador e Continue. As duas rotas de M1 e M2 também chegam à vitória nos **47 testes Node**, com comandos normais de jogador.

Evidências: [M2 publicado](m2/QA-PUBLICADO.json), [regressão M1 publicada](m2/QA-PUBLICADO-M1.json), [testes de lógica](m2/QA-LOGIC.txt), capturas reais em `docs/m2/` e `/workspace/brasa-shots/m2/published/`.

## Cache e reprodução

O bundle único é local e já está commitado; esbuild é apenas ferramenta de desenvolvimento. Não há dependência de CDN em runtime nem servidor de build necessário para jogar. O nome versionado evita combinar módulos de releases diferentes no cache. Uma aba antiga pode precisar de **Ctrl+F5**.

## Limites

Duas missões compactas, solo. Não se afirma duração humana de 5–7 minutos, coop, missões 3–8, Final B concluído, compatibilidade física de gamepads, áudio/mix ouvido em hardware ou FPS/P99 certificados. O trem usa referencial relativo com cenário em movimento. Engenharia registra o primeiro de quatro requisitos futuros, não libera um final ainda inexistente. A evidência histórica inicial fica em `archive/PUBLICACAO-v0.1.md`.

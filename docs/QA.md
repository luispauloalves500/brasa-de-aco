# QA atual — v0.2.0

10/11/2026, America/Sao_Paulo (UTC-3).

## Executado
- **47 testes Node aprovados.** Incluem as 30 verificações anteriores, duas execuções M1, duas execuções M2 e testes de engenharia/ordem das ações/score, save/continue, migração de progresso, minas, válvulas, passarela móvel, paraquedistas, fases/canhões/colapso de Moloch, desembarque da Mula e prevenção de ataques fora da câmera.
- Bots M2 usam apenas comandos de jogador: não teleportam, não alteram HP, não chamam dano artificial. Conservam foguetes e reagem a projéteis/avisos. Ambas as rotas chegaram à vitória; rota A também recuperou o regulador. Recruta, Bento, escudo assistido: cenário de teste, não certificação de todas as dificuldades.
- **Dez cenários Chromium headless em localhost e repetidos na URL pública:** cinco de regressão M1, cinco de M2. Nos cinco M2, um bot primeiro conclui M1 normalmente, verifica desbloqueio, segue Próxima → briefing ilustrado → jogo M2 e testa seleção de capítulos/idiomas. Há capturas de vila, telhados, Mula/Baldo e Moloch. O cenário final completa M2, verifica epílogo ilustrado, registra engenharia e reabre Continue com missão/flags corretas.
- Sem erros runtime/rejeições/HTTP detectados pelos harnesses após o boot; boot/API/menu são também verificados. Capturas do Canvas foram inspecionadas para legibilidade. Prompts de válvula foram reposicionados para não cobrir personagens.
- Publicação: evidência específica em PUBLICACAO.md e arquivos `m2/QA-PUBLICADO*.json`, com os dez cenários aprovados também após o deploy.

## Evidências
- `m2/QA-LOGIC.txt`, `m2/QA-BROWSER.json` e `m2/QA-M1-REGRESSION.json`.
- Perfis temporários de Chromium, sem sessão do desktop nem contas.
- Código dos bots/harnesses incluído em `tests/` e `tools/`.

## Não alegado
Playtest humano, gamepads físicos, áudio ouvido/mix validado em hardware real, Firefox/Safari/mobile, execução coop, campanha de oito missões, final B completo, tempo de fase homologado ou 60 FPS/P99 certificados. Tempo virtual do Chromium não mede FPS real. A evidência histórica v0.1 foi preservada em `archive/`.

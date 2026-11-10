# QA atual — v0.3.0

10/11/2026, America/Sao_Paulo (UTC-3).

- 65 testes Node aprovados; quatro percursos integrais até a vitória, duas rotas por missão. Bots usam comandos normais em Recruta/escudo assistido.
- Dez cenários Chromium de campanha, mais um harness de polimento: estados/ângulos com pixels distintos, retratos, detalhes de efeitos, remapeamento conflitante/válido, gamepad esparso, hitstop/movimento reduzido, caches/efeitos limitados e expiração.
- Zero erros runtime/rejeições/console/HTTP detectados pelos harnesses. Boot e API são verificados; capturas foram inspecionadas visualmente.
- Benchmark com relógio real, separado de testes de tempo virtual: 120 submissões Canvas por missão em cena de boss com 260 partículas e dez explosões. Não mede FPS de apresentação.
- Evidências locais: `polish/QA-LOGIC.txt`, `QA-M1-LOCAL.json`, `QA-M2-LOCAL.json`, `QA-POLISH-LOCAL.json`, `QA-PERF-LOCAL.json`. Capturas antes/depois em `/workspace/brasa-shots/polish/`.
- Os onze cenários passaram também na URL pública, assim como o benchmark real separado. Evidência pós-deploy em PUBLICACAO.md e `polish/QA-*-PUBLICO.json`.

Nenhuma alegação de certificação de 60 FPS, áudio ouvido, hardware/gamepad físico, playtest humano, coop ou campanha completa. Revisão detalhada em POLIMENTO.md; evidência histórica v0.1/v0.2 em `archive/`.

# QA — vertical slice 0.1.0

Data: 10/11/2026, America/Sao_Paulo (UTC-3).

## Executado
- **30 testes Node aprovados**: RNG, colisão swept, movimento a 30/60/120 Hz de render, salto variável/buffer/coyote, cadência, oito direções, munição/fallback, slots, granada, melee/escudo, duas rotas, score sem duplicação, morte/continue, veículo/ejeção/Bento, spawn/aviso de IA, minichefe, fases e vitória do chefe, pausa, save/checksum e paridade de localização.
- **Duas execuções simuladas completas** da praia aos resultados (Recruta + escudo assistido), uma em cada rota. Bot determinístico, sem teleporte, sem matar por API, com granadas, mortes e continues reais. Isso prova alcançabilidade automatizada nesse cenário, não domínio humano ou vitória sem dano.
- **Cinco cenas de QA em Chromium headless isolado**, sem sessão pessoal: hangar, mangue, canais, chefe e encerramento. Harness passou boot/menu, personagem/briefing/jogo, pausa/objetivos/retorno, rota/save, PT/EN e verificação de erros/recursos. Cenário final também passou chefe → resultados → epílogo → créditos → epílogo.
- Screenshots reais do Canvas e da UI: `01-hangar.png`, `02-mangue.png`, `03-canais.png`, `04-chefe.png` em `/workspace/brasa-shots/` no ambiente de produção.
- Análise visual dos screenshots realizada; correção de enquadramento, legibilidade de escudos, direção da torre e proteção durante introduções.
- Shell headless usa perfil temporário e não se conecta ao desktop/navegador de ninguém.

## Evidência e limites
O harness usa hooks explicitamente ativados por `?qa=1`, inclusive para testar transições isoladas e posicionar o teste de escolha de rota. Em seguida reinicia a simulação para os percursos de captura. As campanhas de lógica e o percurso do harness até a vitória usam inputs automáticos e regras normais, não atestam playtest manual. A verificação de erros do harness cobre o período posterior ao boot e os recursos registrados; a existência da API e do menu também é testada para detectar falha de inicialização.

Métricas de RAF coletadas com tempo virtual têm amostra insuficiente e **não são evidência de 60 FPS real**. Meta de desempenho permanece alvo; física desacoplada de render foi validada em testes determinísticos.

## Não certificado / próximo QA
- Gamepads físicos Xbox/PlayStation/genéricos, reconexão e áudio ouvido em hardware real.
- Browsers Firefox/Safari, mobile e acessibilidade com tecnologias assistivas.
- Medição de frame time P99, memória prolongada e hardware de referência.
- Cinco execuções humanas solo por missão, duas rotas com arma básica e perda de veículo, todas as dificuldades e todos os checkpoints.
- Coop não implementado: nenhuma execução coop foi alegada.
- Missões 2–8/finais da campanha não implementados: gates Alpha/Beta/RC do GDD não foram alcançados.

## Publicação
Verificação pós-deploy e identificação do commit são registradas em `docs/PUBLICACAO.md` quando executadas. Nenhum item acima deve ser interpretado como certificação integral do GDD.

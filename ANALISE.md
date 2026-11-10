# Análise de pré-produção — Brasa de Aço: Operação Horizonte

## Base e status
Leitura integral do GDD v1.0, linhas 1–1758 de `/workspace/brasa-gdd.md`. Este relatório descreve um plano: não declara funcionalidades implementadas ou testes executados. O GDD não fornece assets; é uma especificação de produção, não um jogo existente.

## Identidade e experiência
Run-and-gun horizontal 2D arcade original, PT-BR/EN, Web primeiro. Em Aurora Sul, Brigada Brasa combate a Vértice e o sistema climático Horizonte. A campanha evolui de ocupação para cerco e confronto com um protocolo automatizado. O prazer central está no tiro legível e satisfatório, animação expressiva, destruição, resgates, veículos e chefes mecânicos. Inspiração em princípios de Metal Slug, nunca em assets, personagens, melodias, falas gravadas ou interfaces copiadas.

## Sistemas essenciais
- Simulação fixa em 60 Hz; render desacoplado; coyote time 90 ms e buffer de salto 100 ms; salto variável, agachar, mira em oito direções, melee contextual.
- Pistola infinita como fallback; dois slots especiais limitados; granadas em arco; pickups, cobertura destrutível, resgates seguros e score/Ímpeto.
- IA por estados e encontros autorais por setor; projéteis hostis destacados, aviso antes de ataque, limite de pressão simultânea.
- Veículo com entrada/saída contextual, integridade, avaria, janela de ejeção de dois segundos e alternativa a pé.
- Câmera com dead-zone/look-ahead, paralaxe, enquadramento de chefe e tremor configurável.
- Estados explícitos de UI e retorno ao overlay pai; pausa por perda de foco; save de checkpoint sem duplicação de recompensa.
- Áudio original desbloqueado por gesto; relógio próprio, limites de vozes, volume por bus e retomada sem acelerar.
- Localização separada dos sprites; teclado/gamepad; acessibilidade sem depender apenas de cor.

## O que o próprio GDD prioriza
O capítulo 19 define P0 como vertical slice, não oito fases abreviadas: W00/W01/W02/W03; seis inimigos E01/E02/E03/E06/E13/E15; tiro, salto, granada, melee; destruição/pickup/resgate/score; Besouro-9 completo; Missão 1 com ambas as rotas, Balde de Ferro e Dragão-Guindaste; HUD, menu, pausa, briefing, resultado e opções; quatro cues originais (menu, fase, chefe, vitória); checkpoint e QA de física/performance.

A matriz MVP do capítulo 20 pede dois personagens e solo, enquanto o capítulo 17.11 chama coop local de MVP. O roadmap põe coop no marco 5, após núcleo e UI. Interpretação de produção: dois heróis selecionáveis no slice; coop somente após estabilidade solo, sem alegar conformidade integral antes de implementá-lo. Também há diferença entre duas armas especiais no Gate A e três no P0; usar o requisito mais completo: W01, W02 e W03 além da pistola.

## Escopo concreto recomendado para a primeira versão Web
**Entrega principal: vertical slice de Fogo no Mangue, polido e rotulado como tal.** É preferível ao falso lançamento 1.0 com oito mapas repetidos. Canvas2D e módulos JavaScript locais são suficientes para 426×240, sem CDN ou servidor de execução. Dados de arma/inimigo/setor e lógica pura ficam separados de desenho, input, áudio e storage.

Conteúdo: Lia e Bento; percurso praia → passarelas → escolha palafitas/canais → oficina e minichefe → Besouro-9 e cais → Dragão-Guindaste → resultados. Oito resgates, três segredos, dois checkpoints Veterano, armas garantidas e vitória possível a pé com pistola. Paleta de mangue/água/madeira/aço, inimigos animados em partes, guindaste modular com ataques e peças próprias. Briefing e encerramento curtos, legendados e puláveis.

Chefes: contêiner com sombra, rajada anunciada e gancho com vapor/movimento antecipatório; fases por integridade, núcleo exposto, recuperação real, explosão que preserve leitura e ausência de dano na introdução. Testar separadamente a utilidade de painéis e corrente, sem mecanismos obrigatórios ocultos.

Menus: título com hangar animado, nova campanha, continuar válido, personagem/dificuldade, controles, opções, créditos. Três dificuldades alteram cadência/avisos/projéteis, não apenas HP. Opções mínimas: mestre/música/SFX, tremor, flashes/movimento reduzidos, escudo assistido, idioma e remapeamento. Recordes locais separados por dificuldade/assistência. Coop local entra depois de câmera e serialização comprovadas.

**Expansão condicionada à qualidade:** somente após Gate A e correção de P0/P1, produzir missões 2–8 como capítulos autorais, não apenas trocar cor/nome do chefe. Prototipar voo/plataformas móveis cedo. Implementar objetivos persistentes de engenharia em 2/4/6/7, Celina e consoles finais para Final B; Final A sempre disponível. Oito missões seriam alpha até cumprir a certificação do GDD. A duração de 49–66 minutos é meta, não promessa.

## Fora da primeira entrega
Não incluir nem anunciar de início: campanha de oito missões certificada, 12 armas, seis explosivos, sete veículos, 22 inimigos, 34 faixas masterizadas, dublagem humana, coop online, servidor/ranking global, port nativo, editor e PWA. O áudio sintetizado pode cumprir função musical/SFX original, mas não equivale ao catálogo final com stems/WAV e atores. Treino, desafios diários, galeria/jukebox e conquistas são extensões posteriores ao slice, não substitutos de qualidade de combate.

## Riscos e mitigação
1. **Volume de conteúdo:** oito missões com duas rotas, chefes distintos e sete veículos excedem um protótipo; fechar P0 antes de ampliar.
2. **Arte procedural:** risco de silhuetas genéricas e animação rígida; produzir biblioteca modular com poses/antecipação e validar screenshot na escala real, sem usar retângulos de debug como arte final.
3. **Fairness:** testar primeira aparição, linha de visão, pontos seguros de spawn/ejeção e ataques evitáveis; partículas atrás de projéteis.
4. **Save/continue:** transação de checkpoint e IDs únicos de resgates; serializar rota, veículo, inventário, RNG e flags; validar importação e preservar backup.
5. **Coop:** câmera tether e spawn seguro, inputs independentes, desconexão pausada; não presumir que duplicar player resolve coop.
6. **Som:** limitar vozes, reservar prioridade a alertas e respeitar política de autoplay; teste de pausa/foco.
7. **Desempenho:** pools/culling/limites e partículas degradáveis; não prometer 60 FPS sem medição e hardware identificado.
8. **Pages:** caminhos relativos em subpasta, nenhum CDN necessário, teste de cache e requests após deploy.
9. **Direitos:** autoria/licenças rastreáveis; nenhum conteúdo extraído da SNK, incluindo música e fontes.

## Plano de execução e aceitação
1. Estrutura estática, dados separados, testes Node e validação de IDs. Publicação só de build utilizável, não projeto vazio.
2. Núcleo cinza: física, colisão contínua de tiros, salto e input. Comparar resultados em 30/60/120 Hz de render com mesmos ticks.
3. Quatro armas e seis inimigos, telegráficos, pools e feedback audiovisual. Testar dano, munição, cadência e vida máxima de projéteis.
4. Resgate/destruição/segredo/checkpoint; restaurar repetidamente sem score duplicado, colisão fantasma ou spawn conflitante.
5. Besouro-9: entrar, sair, avaria e ejeção; garantir conclusão sem veículo.
6. Dragão-Guindaste: três padrões, fases, morte, resultado; verificar dano legítimo, intro segura, ausência de projéteis órfãos e vitória com pistola.
7. Arte final do slice, quatro cues musicais, menus/localização/acessibilidade. Fechar overlays retorna ao pai; blur limpa input e pausa.
8. Duas rotas e coop quando estáveis; testes manuais com gamepad físico continuam necessários mesmo com automação.
9. Browser headless: boot, início, movimento/tiro, pausa/retorno, checkpoint, minichefe, chefe e resultado; registrar erros de console, requests falhos e screenshots reais. Testes com hooks não substituem execução normal.
10. Certificar a missão conforme capítulo 18: cinco execuções solo e três coop; ambas as rotas, perda de veículo, arma básica, dificuldades e morte em cada checkpoint, com commit/seed/navegador/evidência. Se não executado, marcar pendente.
11. Criar repositório público novo, push sem força e Pages main/root; verificar HTTPS 200 e fluxo no endereço final em subpasta. Incluir README PT-BR, GDD, análise, changelog e relatório QA com resultados reais.

## Situação desta análise
Leitura e planejamento concluídos. Nenhuma implementação, certificação, medição de FPS, captura de tela, criação de repositório ou publicação foi realizada por este relatório.

## Decisão executada — versão 0.1.0
A análise acima foi escrita antes da implementação. Depois da autorização explícita para desenvolvimento local, foi construído o slice da Missão 1, não uma suposta campanha de oito missões. O estado atual, limites e testes realmente executados estão em README.md, docs/RELEASE_NOTES.md e docs/QA.md. Foram aprovados 30 testes de lógica (incluindo as duas rotas até os resultados) e cinco cenários Chromium headless. Coop, missões adicionais, dublagem e certificação de performance/hardware continuam pendentes.

## Expansão autorizada — Missão 2 / v0.2.0
Foi analisado o capítulo 10.2 e seus catálogos relacionados antes da expansão. O novo capítulo foi construído como cenário próprio: ferrovia, depósito, manutenção/telhados, Mula, Baldo, vagões e Moloch, com objetivos de engenharia persistentes. O detalhamento e as adaptações (percurso compacto, trem em referencial relativo, sem coop) estão em docs/MISSAO-02.md. M1 continua disponível e foi submetida novamente à regressão.

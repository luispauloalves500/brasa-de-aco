# v0.3.0 — direção de arte e funções existentes

## Decisão de escopo
Nenhuma missão nova. Preservar os dois capítulos, personagens selecionáveis, quatro armas, veículos, rotas, resgates, segredos, chefes e progressão. Melhorar qualidade visual e funções existentes sem rebatizar mapas como conteúdo novo. Inspiração de gênero, nunca sprites, personagens, fontes ou música extraídos de Metal Slug/SNK.

## Arte original
- Biblioteca `sprites.js`: desenhos por partes com sombras de quatro tons, contorno escuro, luz de borda, tecido, cabelo, equipamento, dedos/luvas, cintos e armas próprias. Lia tem cabelo preso, óculos e cores quentes; Bento é mais largo, barbado e azul-petróleo.
- Oito frames de corrida, respiração idle, salto ascendente/descendente, agachamento, oito ângulos de mira, flash de tiro, arremesso, melee, dano, morte e vitória. Os dez estados e oito ângulos foram comparados por hash de pixels; corrida tem sete imagens distintas em oito fases (duas passagens pela pose neutra).
- Soldado, escudeiro, granadeiro, rádio, sniper, elite e civis com materiais próprios; flinch, reação cômica sem gore, capacete desprendido e corpo em queda. Elite mostra proteção durante o aviso. Torre remodelada.
- Besouro/Mula com parafusos, vidros, motor, suspensão, canhão, rodas/esteiras ligadas ao deslocamento, fuligem, amassados e fumaça. Mula tem aceleração/frenagem próprias. HUD mostra contagem de ejeção.
- Chefes com rebites, pistões, janelas, piloto, grelhas, caldeira e peças móveis. Moloch tem rodas/bielas e vapor; Dragão tem hidráulica, cabine e estrutura detalhada.
- M1: pôr do sol roxo/âmbar, água, mangue, raízes, roupa no varal, palafitas e cais. M2: azul industrial/bronze, vila de tijolos, tanques de combustível, oficinas de telhado serrilhado, túnel iluminado, estação e paisagem passando durante o trem.
- Múltiplas velocidades de paralaxe, aves, glints da água, névoa e vapor. Props não alteram colisões. Ataques e avisos de perigo ficam acima dos efeitos cosméticos.
- Explosões multilobadas/quentes com fumaça, partículas, cápsulas e destroços. Fonte bitmap/TTF **Brasa Circuit**, HUD, retratos e painéis inteiramente locais. O estudo PNG está em `polish/personagens.png`; a comparação está em `polish/comparacao.png`.

## Revisão dos sistemas
| Sistema | Mudança / decisão |
|---|---|
| Movimento | Preservados coyote 90 ms, buffer 100 ms, salto variável e aceleração a pé; testes repetidos. |
| Mira | Atualiza a cada tick, mesmo sem tiro; oito direções normalizadas; não usa uma pose velha ao mudar direção. |
| Game feel | Recoil visual; hitstop de 22–60 ms em impactos importantes, limitado por frequência e desativado em movimento reduzido; efeitos de aterrissagem. Input fica enfileirado durante hitstop. |
| Armas | Dano, munição e cadência preservados; pistola, carabina, escopeta, foguete e metralhadora agora têm cues distintas. Pickups possuem miniaturas. |
| IA | No máximo dois inimigos anunciando ataques simultaneamente; sniper dispara no alvo anunciado, não acompanha o salto no último instante; escudo só reduz dano pela frente. |
| Veículos | Aceleração 700 / frenagem 1050; esteiras/rodas param quando o veículo para; integridade e tempo de ejeção claros. Minas/obus e saída permanecem funcionais. |
| Chefes | Padrões/fases preservados e testados; avisos desenhados acima de cosméticos; redução de flashes respeitada; vitória tem pose visível, sem piscar por invulnerabilidade. |
| Câmera | Antecipação horizontal até 22 px, suavizada e limitada à arena; não altera física. |
| Áudio | Bass/hi-hat/percussão e contracanto ajustados; música abaixa sob explosões, alertas têm reserva de vozes; SFX ficam silenciosos na pausa; falha de AudioContext não derruba o jogo. |
| Menus | Fonte local, retratos, contraste/foco, detalhes de efeitos; aliases reservados não podem criar remapeamentos contraditórios. |
| Input | Primeiro gamepad conectado, mesmo em slot não zero; Shift direito; botões de toque usam as teclas remapeadas. Teclado/gamepad continuam disponíveis. |
| Resgates/pickups | Recompensas flutuantes, brilho e ícones sem duplicar placar. |
| Save/Continue | Recupera o primeiro backup válido e preserva o primário inválido; storage bloqueado/quota gera aviso, sem interromper partida; engenharia e desbloqueio permanecem. |
| Performance | Frames e cenário rasterizados/cached; até 384 frames / 44 superfícies; limites de 260 partículas, dez explosões, 12 corpos e 12 textos. Opção de detalhe reduz efeitos cosméticos. |
| Acessibilidade | Preferência de movimento reduzido do sistema respeitada se não houver escolha salva; remove hitstop, tremor, piscada do jogador e flashes fortes; foco no Canvas e anúncios `aria-live` para eventos. |

## Testes e honestidade
- **65 testes Node aprovados.** As duas rotas das duas missões chegam à vitória com comandos normais; sem teleporte, alteração de HP ou dano artificial nos bots. Cenário Recruta com escudo assistido, não certificação de todas as dificuldades.
- O bot M1 foi atualizado para reagir aos projéteis/avisos e conservar foguetes, em vez de repetir saltos cegamente. Os critérios de vitória continuam exigindo minichefe, chefe e resultados.
- Dez cenários Chromium de campanha + um harness de polimento, com pixels distintos, UI, acessibilidade, remapeamento, cache e orçamentos. Corrigida corrida de `iframe.onload` nos harnesses, que podia deixar `WAITING` com bundle rápido.
- Benchmark separado **sem tempo virtual**: 120 submissões Canvas aquecidas por missão, 260 partículas + dez explosões. Na rodada local: média ~3,8 ms; P95 ~6,8–7,9 ms. Mede CPU de submissão, não GPU, tela/vsync ou FPS real. Registros em `polish/QA-PERF-LOCAL.json`.
- Publicação é verificada separadamente em `PUBLICACAO.md`; não confundir testes em localhost com testes na URL pública.

Ainda pendentes: playtest humano longo, áudio/mix ouvido, gamepads físicos, leitores de tela reais, Safari/Firefox/mobile e FPS/P99 em hardware identificado. Não se promete arte/animação do volume de uma produção comercial grande. Continuam fora coop, missões 3–8 e Final B completo.

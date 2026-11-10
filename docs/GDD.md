# BRASA DE AÇO: OPERAÇÃO HORIZONTE
## Game Design Document (GDD) completo — Versão 1.0

> **Situação:** documento de pré-produção; sistemas, valores, história, missões, arte e áudio aqui descritos são **especificações propostas**, não funcionalidades já implementadas.
>
> **Referência principal:** *Metal Slug: Super Vehicle-001* (SNK/Nazca, 1996). Referências secundárias: *Metal Slug 2*, *X*, *3*, *4*, *5*, *6* e *XX*. O objetivo é capturar **princípios de qualidade e ritmo**, não copiar personagens, fases, sprites, músicas, sons, falas, marcas, nomes de armas icônicas ou cenários identificáveis de terceiros.
>
> **Título de trabalho:** BRASA DE AÇO: OPERAÇÃO HORIZONTE. **Gênero:** run-and-gun 2D horizontal arcade. **Plataforma primária:** PC/Web, com arquitetura portável para PC nativo. **Idiomas:** português brasileiro e inglês. **Jogadores:** 1–2 local; coop online somente em fase posterior se a arquitetura permitir.

---

## Índice de capítulos

0. Visão executiva
1. Estudo da referência Metal Slug (1996 e evolução da série)
2. Identidade, universo, narrativa, heróis e finais
3. Modos, dificuldade e loop
4. Controles, câmera e movimentação
5. Combate e física
6. Armas, explosivos, power-ups e resgates
7. Veículos pilotáveis
8. Inimigos, IA e encontros
9. Chefes e padrões
10. Campanha completa: **oito missões detalhadas**
11. Progressão, checkpoints e pontuação
12. HUD solo, coop, veículo e chefe
13. Menus, telas, opções, pausa e acessibilidade
14. Trilha musical original, efeitos, dublagem e mix
15. Arte, sprite sheets e animações
16. Cutscenes, diálogos e humor
17. Arquitetura técnica Web e PC nativo futuro
18. Testes, playtests e certificação
19. Backlog P0–P3
20. Escopo e riscos
21. Critérios de lançamento
22. Marcos de desenvolvimento
23. Documentos derivados
24. Fontes e direitos
25. Resumo de produção

---

# 0. VISÃO EXECUTIVA

**Elevator pitch:** Em uma federação de ilhas industriais assolada por um consórcio militar, dois operativos da Brigada Brasa atravessam vilarejos, fábricas, montanhas, portos e fortalezas móveis, improvisando armas e pilotando máquinas roubadas para impedir a ativação de um sistema de controle climático bélico. A ação é rápida, exagerada, legível, com humor visual e chefes mecânicos gigantescos.

**Promessa ao jogador:** “Em segundos, entenda onde atirar; em minutos, domine o combate; a cada fase, descubra um espetáculo novo.”

**Pilares obrigatórios:**
1. **Tiro satisfatório:** leitura imediata de impacto, cadência, recuo, som e destruição.
2. **Arte em pixel art viva:** personagens muito animados, materiais distintos, cenários cheios de detalhes e humor visual.
3. **Variedade de 90 em 90 segundos:** nova combinação de inimigos, terreno, risco, veículo ou evento.
4. **Chefes memoráveis:** máquinas gigantes com silhueta própria, peças destrutíveis, telegráficos e fases de combate.
5. **Alta rejogabilidade:** duas rotas por missão, segredos, resgates, desafios e ranking sem exigir grind.
6. **Arcade justo:** perigo alto, regras consistentes, sem mortes causadas por informação oculta.
7. **Música e SFX reativos:** trilha por camadas e mix que preserva a compreensão do combate.

**Escopo da versão 1.0 planejada:** 8 missões, 4 personagens com 2 disponíveis inicialmente, 12 armas (incluída a arma básica), 6 tipos de granada/consumível, 7 veículos, 22 arquétipos de inimigos, 8 chefes principais, 6 minichefes, ~49–66 minutos na primeira passagem e ~35–45 minutos em passagem experiente; ~2–4 horas para explorar variações, sem contar pontuações e desafios. Todos esses números são *metas*, sujeitos a revisão em playtest.

**Diferenciação em relação à referência:** cenário insular retrofuturista original, manipulação ambiental limitada (válvulas, cobertura, condutores elétricos, clima dinâmico por missão), escolha de rotas com consequências leves, resgate de engenheiros que modifica o equipamento de fases seguintes e trilha em stems que responde à ação.

---

# 1. ESTUDO DA REFERÊNCIA: METAL SLUG

## 1.1 Escopo e método da análise

Análise documental de mecanismos, estrutura, audiovisual e evolução da série, apoiada em informações públicas da SNK, catálogo oficial da trilha de 1996 e material de referência de gameplay. **Não equivale a uma captura de vídeo quadro a quadro nem a playtest instrumental executado neste projeto.** Dados específicos do jogo original são separados das propostas para *Brasa de Aço*.

## 1.2 Base de 1996 — o que torna o jogo reconhecível

- Arcade MVS de **1996**, combate 2D em rolagem horizontal, um ou dois jogadores; controle com movimento, tiro, pulo e granadas.
- Protagonistas originais da referência: Marco e Tarma; veículo emblemático: pequeno tanque de combate; antagonista militar: General Morden.
- **Seis missões** fechadas por confrontos grandes; a exploração é linear no eixo principal, mas inclui descobertas fora da trajetória óbvia.
- **Armas secundárias de munição limitada** como metralhadora, lança-foguetes, espingarda e lança-chamas; arma básica serve de fallback.
- **Resgate de prisioneiros** que concedem armas, itens ou pontos e geram bonificação de fim de missão.
- **Combate corpo a corpo contextual**, objetos de cenário atingíveis, explosões elaboradas e soldados com reações caricaturais.
- **Veículo com vantagens e fragilidades:** armamento pesado, proteção, dano visual e possibilidade de abandono antes de explodir.
- **Tela de missão concluída**, créditos/vidas, tempo, pontuação e tela de continuação reforçam o ciclo arcade.

## 1.3 Mapa da campanha do primeiro Metal Slug (referência histórica)

A campanha original possui **6 missões**. Os nomes de fase a seguir seguem a denominação compilada em catálogos comunitários e podem variar conforme a edição/localização; o nome de música segue a publicação licenciada de 1996. O importante para o novo projeto é entender a **função da progressão** e não reproduzir cada mapa.

| Missão | Nome de referência / ambiente predominante | Música no álbum de 1996 | Chefe do original | O que estudar no design |
|---|---|---|---|---|
| 1 | **Absolute Thick Forest** — floresta tropical, água e fortificações | `Main Theme from Metal Slug` | Tetsuyuki | Início acessível, introdução de armas, terreno e primeiro espetáculo. |
| 2 | **A Wish For a Morning Glow** — ferrovia e cidade industrial | `Inner Station` | Hairbuster Riberts; Mini-Bata como encontro intermediário | Plataformas, estruturas e ameaça aérea grande. |
| 3 | **Iron Cavalrymen in Hell** — colinas, instalações e artilharia | `Assault Theme` | Tani Oh; Allen O'Neil como minichefe | Escalada de densidade, armadura e padrões de tiro pesado. |
| 4 | **Death Valley** — terreno árido e cavernas/fortificações | `Ridge 256` | Shoe & Karn | Pressão combinada de duas máquinas e coordenação espacial. |
| 5 | **The City Under Despotism** — zona urbana ocupada | `Gerhardt City` | Iron Nokana | Cenário vertical e máquina terrestre multifuncional. |
| 6 | **The Memorial Sea** — campanha marítima e fortaleza final | `Final Attack` | Hi-Do | Encerramento de larga escala com combate aéreo e fechamento narrativo. |

**Análise do ritmo por missão:** a primeira ensina rapidamente as regras e a importância dos veículos; a segunda introduz composições mais complexas e ameaças do alto; a terceira aumenta o número de decisões sob fogo; a quarta trabalha sincronização entre armas pesadas; a quinta usa cenários comprimidos para intensificar a sensação de conflito; a sexta culmina em um confronto de espetáculo. Essa leitura é uma abstração de design e não um guia de localização de cada inimigo.

**Padrão comum dos confrontos originais:** aviso visual por peças móveis, ataque com trajetória reconhecível, recuperação curta, dano em camadas e explosão final prolongada. **Padrão comum de recompensas:** suprimentos e prisioneiros escondidos recompensam observação, com bônus por resgate ao final. Na nossa proposta, ambos os princípios são preservados em conteúdo original.

*Fontes secundárias para a nomenclatura das missões:* https://metalslug.fandom.com/wiki/List_of_Missions e https://shmup.fandom.com/wiki/Metal_Slug . *Chefes:* https://metalslug.fandom.com/wiki/Bosses . *Associação das músicas com as missões:* https://data-discs.com/collections/records/products/data013-metal-slug .

## 1.4 Evolução da série a aproveitar como princípios

| Título | Evolução relevante | Decisão para o projeto |
|---|---|---|
| Metal Slug (1996) | Controle instantâneo, tanque, resgate, humor e explosões animadas | Núcleo do MVP: tiro, salto, granada, resgate e 1 veículo. |
| Metal Slug 2 | Ampliação de personagens, veículos e alterações temporárias do personagem | Quatro heróis diferenciados de forma moderada; status temporários controlados. |
| Metal Slug X | Reorganização de encontros e maior variedade de armas/ameaças | Diretor de encontros roteirizado por trechos, evitando repetição. |
| Metal Slug 3 | Caminhos alternativos e forte diversidade de cenários | Bifurcações curtas, recompensa e convergência antes do chefe. |
| Metal Slug 4 | Camadas extras de pontuação e medalhas | Combo opcional sem penalizar quem só deseja concluir. |
| Metal Slug 5 | Veículo e adversários mecânicos adicionais | Veículos de funções únicas, sem recolorações vazias. |
| Metal Slug 6 | Estoque de armas e sistemas mais acessíveis | Slots de armas e opção de dificuldade amigável. |
| Metal Slug 7/XX | Treino e desafios para domínio | Campo de treinamento e missões de pontuação após MVP. |

## 1.5 Análise audiovisual do jogo de 1996

A trilha oficial de 1996 é creditada a **Takushi Hiyamuta**. O catálogo licenciado apresenta as seguintes faixas/contextos (nomes conservados apenas para identificação histórica):

| Uso no original | Faixa publicada no álbum do original |
|---|---|
| Abertura | `Intro` |
| Explicação da operação / ranking | `The Military System` |
| Missão 1 | `Main Theme from Metal Slug` |
| Missão 2 | `Inner Station` |
| Missão 3 | `Assault Theme` |
| Chefes | `Steel Beast 5Beats` |
| Missão concluída | `Carry Out` |
| Missão 4 | `Ridge 256` |
| Missão 5 | `Gerhardt City` |
| Missão 6 | `Final Attack` |
| Encerramentos 1P / 2P | `End Title` / `Hold You Still!` |
| Game over | `Gravestone` |

**Leitura de composição:** andamento forte, sensação militar aventureira, melodias lembráveis, contrastes dramáticos e frases musicais que se encaixam em cenários diferentes. **Regra para nosso projeto:** compor peças novas, evitar melodias, arranjos, gravações e amostras reconhecíveis do catálogo da SNK.

**Leitura de efeitos sonoros:** tiros distinguíveis pelo timbre; explosão grande com ataque, corpo e cauda; interface com feedback curto; dublagem/narrador para início de missão e aquisição de armamento; motores, esteiras e chapa metálica como linguagem mecânica. Em *Brasa de Aço*, tudo será gravado, sintetizado ou licenciado de maneira independente.

## 1.6 Análise de legibilidade de Metal Slug: o que copiar como regra, não como conteúdo

1. O jogador aparece como contraste nítido contra o cenário.
2. A animação de disparo é imediatamente ligada a um som e um flash.
3. A trajetória hostil é lida pelo brilho e cor, não por textos.
4. O inimigo reage ao impacto em 1–2 quadros perceptíveis.
5. A destruição tem várias camadas: impacto, faísca, fragmento, fumaça, fogo.
6. Detalhes cômicos ocorrem longe do centro de mira e não escondem perigos.
7. Chefes têm peças móveis que antecipam ataques.
8. A tela não precisa de minimapa: a leitura é pela câmera, terreno e inimigos.
9. Recompensas e segredos incentivam repetir a missão sem bloquear o avanço.
10. O ritmo alterna enxames leves, veículos pesados, respiros e espetáculo.

## 1.7 Limitações da referência que vale modernizar

- Mortes inesperadas por projéteis encobertos → camadas de contraste e prioridade de renderização.
- Informação de dano de chefe pouco explícita → dano visual por peças e indicador opcional.
- Continuação arcadista punitiva → modos Arcade e Campanha separados.
- Poucas opções de acessibilidade → remapeamento, flashes reduzidos, legendas e assistência.
- Coop pode poluir a leitura → cor de personagem, marcadores e limite adaptativo de partículas.
- Fases lineares pouco reativas → pequenos elementos sistêmicos, sem perder o design autoral.

**Fontes consultadas:**
- Site oficial SNK, história dos 30 anos: https://www.snk-corp.co.jp/us/anniversary/metalslug30th/history/
- Página oficial do jogo original: https://www.snk-corp.co.jp/us/games/acaneogeo/metalslug/
- Trilha original licenciada / catálogo: https://data-discs.com/collections/records/products/data013-metal-slug
- Catálogo de chefes da série (referência secundária de comunidade): https://metalslug.fandom.com/wiki/Bosses
- Referências de mecânicas: https://en.wikipedia.org/wiki/Metal_Slug_(1996_video_game)

---

# 2. IDENTIDADE DO JOGO NOVO

## 2.1 Universo

Ano fictício **1987-A**. O arquipélago de **Aurora Sul** é uma cadeia de ilhas que abastece continentes com ligas metálicas e energia geotérmica. A corporação **Vértice Industrial** financiou um programa de contenção de tempestades, o **Projeto Horizonte**. Após um golpe, sua diretoria militar comandada por **General Varga** passa a modular o clima para bloquear portos, deslocar populações e controlar rotas comerciais. O governo local colapsa. A **Brigada Brasa**, pequena unidade de pilotos e mecânicos rebeldes, inicia uma ofensiva de sabotagem.

**Tom:** aventura bélica caricatural, personagens heroicos com falhas, antagonistas visualmente exagerados, humor de cenário, seriedade crescente no terceiro ato. Evitar propaganda política atual, referência direta a guerras reais, estereótipos étnicos e violência gratuita contra civis.

## 2.2 Estrutura narrativa de três atos

- **Ato I — Ocupação (missões 1–3):** roubo de mapa de comboios, primeiro contato com laboratórios climáticos, descoberta de que vilarejos estão sendo deslocados pela seca artificial.
- **Ato II — Cerco (missões 4–6):** corte da logística do Consórcio, confronto com um cientista arrependido e revelação de que Varga não controla inteiramente a máquina climática.
- **Ato III — Horizonte (missões 7–8):** avanço até uma fortaleza aerotransportada, decisão sobre destruir ou estabilizar o núcleo, consequência baseada em missões secundárias e resgates.

## 2.3 Personagens controláveis

| Nome | Perfil e silhueta | Vantagem pequena | Limitação equilibrada | Personalidade |
|---|---|---|---|---|
| **Lia Torv** | Macacão terracota, luvas grandes, lenço amarelo | Troca de arma 12% mais rápida | Granada arremessada em arco padrão | Piloto audaciosa, impulsiva. |
| **Bento Arcos** | Jaqueta azul-petróleo, faixa de ferramentas | Veículos recebem 10% menos dano | Troca de arma padrão | Mecânico metódico, humor seco. |
| **Nara Vale** | Uniforme oliva, óculos redondos | Tempo de aterrissagem após salto reduzido 8% | Dano de armas igual ao elenco | Exploradora silenciosa, observadora. |
| **Rui Faísca** | Jaqueta bege, botas largas, cabelo preso | Granadas recuperadas com mais frequência em caixas raras | Raio de explosão igual ao elenco | Ex-operador da Vértice, culpa e redenção. |

**Regra:** vantagens não permitem ultrapassar desafios inacessíveis aos demais. Duas cores/variações de traje desbloqueáveis por herói; nenhuma alteração de hitbox conforme traje.

## 2.4 Personagens coadjuvantes

- **Comandante Mara:** rádio e missões; voz concisa, sem falas longas durante combate.
- **Dra. Celina:** criadora do regulador Horizonte, ajuda na mudança de rota do final.
- **Téo do Porto:** vendedor mecânico oportunista, humor visual, tutorial de veículos.
- **Sargento Baldo:** recorrente, tenta emboscar o esquadrão, mas retorna com máquinas progressivamente absurdas; alívio cômico.
- **General Varga:** antagonista visível nos painéis e comunicações, confrontado no clímax.
- **Diretora Ária Nox:** idealizadora do núcleo automatizado; sua motivação contradiz os planos de Varga no terceiro ato.

## 2.5 Finais

- **Final A — Mar Livre:** concluir a missão 8; a máquina é destruída e as rotas marítimas reabrem, mas o arquipélago perde parte da infraestrutura.
- **Final B — Novo Horizonte:** cumprir quatro tarefas de engenharia opcionais nas missões 2, 4, 6 e 7; resgatar Celina; na missão 8, estabilizar reatores antes do chefe final. Energia preservada, Varga é capturado.
- **Epílogo cooperativo:** montagem adicional de pequenas cenas com os dois heróis usados; não é um terceiro final canônico.

---

# 3. MODOS DE JOGO, DIFICULDADE E LOOP

## 3.1 Modos

| Modo | Regras | Saves | Objetivo |
|---|---|---|---|
| **Campanha** | Missões desbloqueadas, 3 vidas por missão, checkpoints por setores | Auto-save entre missões | Concluir história. |
| **Arcade Clássico** | Campanha em sequência, créditos limitados, pontos e tempo | Apenas ranking final | Desafio e recordes. |
| **Livre / Seleção de Fases** | Escolher fases já concluídas e rotas descobertas | Recordes locais | Treinar e coletar segredos. |
| **Desafio do Dia** | Modificador e fase selecionada de uma lista local | Recorde por data local; sem rankings globais no MVP | Objetivo diário offline. |
| **Treinamento** | Alvos, pulo, granadas, veículos e dano telegráfico | Não afeta campanha | Dominar controles. |
| **Coop Local** | Dois controles simultâneos; entrada na seleção ou checkpoints | Histórico por perfil | Jogar a campanha em dupla. |
| **Contra o Relógio** | Tempo registrado por missão com rota fixa | Recorde | Speedrun. |

## 3.2 Loop básico

`Escolher perfil → Menu → Campanha/Arcade → Briefing de 10–20 s (pulável) → Trecho de combate → Exploração curta / resgate → Arma / veículo / risco novo → Minichefe ou evento → Chefe → Tela de resultados → Próxima missão / seleção`.

**Cadência alvo por fase:** início de leitura (15–25 s) → ação constante (70–120 s) → variação (60–90 s) → respiro curto (10–20 s) → subida de tensão (60–120 s) → chefe (90–150 s). Duração efetiva muda por rota e habilidade.

## 3.3 Dificuldades

| Parâmetro | Recruta | Veterano (padrão) | Lenda |
|---|---|---|---|
| Vidas iniciais | 5 | 3 | 2 |
| Velocidade de projéteis | 0,85× | 1× | 1,12× |
| Frequência de ataques inimigos | 0,8× | 1× | 1,2× |
| Janela de aviso de chefes | 1,25× | 1× | 0,9× |
| Assistência de mira | Opcional, leve | Desligada | Desligada |
| Checkpoints por missão | 3 | 2 | 1 |
| Ranking global local de pontuação | Separado | Separado | Separado |

**Nunca** aumentar dificuldade apenas multiplicando HP por 5. Elevar complexidade de ondas, tempo de reação e sobreposição controlada de padrões. Validar que uma vitória sem dano seja sempre teoricamente possível.

## 3.4 Continues, falha e recuperação

- Personagem sem escudo recebe dano letal em modo Arcade; em Campanha, usar a mesma regra básica, com opção de acessibilidade de **escudo inicial de 1 impacto** (desativa ranking competitivo).
- Ao morrer, perde arma especial equipada, granadas retornam a quantidade inicial definida; mantém o score da missão em modo Campanha, perde multiplicador e contagem de resgates **do trecho**, não de toda a fase.
- Respawn após 1,2 s e invulnerabilidade de 1,8 s; controle de dano visível por oscilação do sprite e halo legível.
- Continue reinicia no checkpoint do setor e reduz o bônus final de Arcade.
- Cooperativo: aliado pode gastar uma reserva compartilhada para reviver o parceiro no próximo checkpoint. Não criar botão confuso em meio à ação.

---

# 4. CONTROLES, CÂMERA E MOVIMENTAÇÃO

## 4.1 Mapeamento padrão

| Ação | Teclado | Controle Xbox/PC | Comportamento |
|---|---|---|---|
| Andar | A / D ou setas | Analógico esquerdo / direcional | Movimento com aceleração curta. |
| Agachar | S / baixo | Direcional baixo | Hitbox reduzida. |
| Mirar para cima | W / cima | Direcional cima | Inclui diagonais ao mover. |
| Atirar | J | X | Segurar para automático quando aplicável. |
| Pular | K / espaço | A | Altura variável na borda do salto. |
| Granada / secundário | L | B | Projétil em arco. |
| Trocar arma | Q | Y | Cicla entre 2 slots. |
| Interagir / entrar / sair | E | RB | Veículos, válvulas, painéis, resgates especiais. |
| Esquiva curta (recurso restrito) | Shift | RT | Apenas no chão e com cooldown. |
| Pausar | Esc / P | Menu | Congela simulação em solo. |
| Mapa de operação / objetivos | Tab | View | Informações breves, não minimapa obrigatório. |

**Compatibilidade:** controles Xbox, PlayStation e genéricos por Gamepad API; prompts dinâmicos; troca de controle sem perder input; remapeamento de teclado e gamepad; modo de botões alternativos para acessibilidade.

## 4.2 Modelo cinemático inicial (tudo ajustável por playtest)

- Mundo de referência: **pixels de gameplay**; herói com cerca de 42 px de altura na resolução interna de 426×240.
- Caminhada: 96 px/s; velocidade máxima alcançada em 0,09 s; desaceleração em 0,08 s.
- Salto: altura de referência 80 px; alcance horizontal ~122 px; coyote time 90 ms; jump buffer 100 ms.
- Se o botão é solto cedo, gravidade de subida aumenta; plataformas são sólidas apenas se declaradas.
- Agachado: 55% da altura de hitbox de pé; sem avanço enquanto agachado por padrão.
- Não adicionar sprint padrão: foco em precisão arcade; esquiva avançada disponível somente em situações específicas.
- Escalada por escadas, bordas de baixo risco e elevadores roteirizados; nada de parkour autônomo que prejudique mira.
- Mirada de **8 direções** em pé; tiro horizontal e diagonal para baixo durante salto; suavização apenas visual, sem delay de disparo.
- Corpo a corpo contextual a até 24 px de inimigo terrestre e na direção de face: golpe curto que substitui o disparo básico, com prioridade explicitamente ajustável nas opções.
- Ações de veículo usam estado separado; sair da máquina nunca deve teleportar para dentro de parede.

## 4.3 Prioridade de comando e buffering

1. Morte/cena não interativa bloqueia inputs de combate.
2. Pausa abre somente via input de pausa com *debounce*; fechar documentos, briefing ou inventário **não** deve invocar a pausa.
3. Interação contextual tem prioridade **apenas** quando pressionada, nunca por movimento de proximidade.
4. Troca de arma não cancela invulnerabilidade nem bloqueia pulo.
5. Atirar pode continuar durante pulo; granada tem animação curta com cancelamento após disparo.
6. Pulo armazenado até 100 ms evita comando perdido ao aterrissar.
7. Se jogador mantiver tiro, preservar cadência e timestamp contínuo, sem acelerar com FPS.

## 4.4 Câmera

- Side-scroll com *dead-zone* horizontal: jogador permanece entre 35% e 45% da tela em avanço normal.
- Look-ahead de 50–85 px na direção de deslocamento; reduzido quando há risco de projetar herói fora da tela.
- Travamento suave em chefes; tela mostra corpo inteiro ou armas relevantes; câmera pode recuar até 10% quando necessário.
- Sem zoom que estique sprites; escala inteira preferencial: 2×, 3×, 4×, 5×, com letterbox.
- Tremor: impactos pequenos 1–2 px/60 ms; grande explosão até 4 px/140 ms; opção 0%, 50%, 100%.
- Coop: câmera única, *tether* suave; máximo 70% de largura de tela entre jogadores; se alguém ficar para trás, mostrar seta e reposicionar em checkpoint seguro.
- Fundo em 4–6 planos com paralaxe, sem mover collision layer.

---

# 5. SISTEMA DE COMBATE E FÍSICA

## 5.1 Tipos de dano

`BALÍSTICO`, `EXPLOSIVO`, `FOGO`, `ELÉTRICO`, `IMPACTO`, `AMBIENTAL`. O jogador não precisa conhecer multiplicadores; feedback deve comunicá-los. Inimigos e peças de chefe podem ter fraqueza moderada de 1,25×, resistência de 0,75× ou imunidade justificada visualmente.

## 5.2 Hitboxes e fairness

- **Hitbox de dano** do jogador aproximadamente 70% da largura visível e 80% da altura útil, exceto áreas de pose explicitamente ativas.
- **Hurtbox** por animação: em pé, agachado, salto, queda, veículo. Tiros nunca colidem com sprites puramente decorativos.
- Física por fixed timestep 1/60 s; *continuous collision detection* para foguetes, projéteis rápidos e objetos finos.
- Projéteis de inimigos sempre em camada legível; primeiro projétil de novo tipo possui telegráfico mínimo de 0,45 s no Veterano.
- Granadas têm arco previsível, quique limitado, contato com cenário e explosão em raio definido.
- Nenhum inimigo surge diretamente sobre a hitbox do jogador. Spawn fora da visão ou com entrada animada avisada.
- Sem dano por encostar em soldado comum parado; contato com veículo, lâmina ou perigo ambiental ativado causa dano quando visível.

## 5.3 Destruição ambiental

**Três classes:**
- **Decorativa:** quebra em sprites/partículas, sem efeito de navegação; ex.: placas, lanternas, vidros.
- **Funcional:** altera combate; ex.: barricada, saco de areia, torre, poste, passarela, barril pressurizado.
- **Estrutural roteirizada:** mudanças de rota e set piece; ex.: ponte abatida, trem descarrilado, comporta aberta.

**Pipeline de uma explosão:** quadros de clarão → onda de choque → detritos sólidos com física limitada → fumaça → fuligem → persistência reduzida. Partículas são cosméticas e não devem ocultar alvo em combate.

## 5.4 Combo e estilo

- Medidor **ÍMPETO** de 0–5 níveis ganha carga por sequências sem dano, destruições criativas e resgates, mas não dá dano extra obrigatório.
- 1,0× até 2,5× na pontuação; decai quando jogador fica sem ação por 8 s; receber dano zera o multiplicador.
- Concessões por variedade (`TIRO PRECISO`, `DEMOLIÇÃO`, `RESGATE RELÂMPAGO`, `SEM DANO`, `ACROBACIA`), cooldown de medalhas para evitar spam.
- Em campanha, multiplicador é visual secundário; em Arcade, vira foco de recorde.

---

# 6. ARMAS, ITENS E MUNIÇÃO

**Todos os valores abaixo são de prototipação e exigem balanceamento em teste.** Dano em pontos abstratos para um soldado padrão com 100 HP; os números **não** vêm de Metal Slug.

## 6.1 Arsenal

| ID | Arma original | Dano/tiro | Cadência | Capacidade total | Função e efeito visual |
|---|---|---:|---:|---:|---|
| W00 | Pistola M-7 | 25 | 4/s | Infinita | Fallback preciso; cartucho e flash curto. |
| W01 | Carabina Cascata | 16 | 12/s | 240 | Rajada horizontal, traço amarelo-branco. |
| W02 | Espingarda Cobalto | 14×7 pellets | 1,5/s | 35 | Cone curto, knockback e fumaça robusta. |
| W03 | Lança-foguetes Faísca | 140 + área | 1,1/s | 24 | Foguete lento, fumaça segmentada, impacto forte. |
| W04 | Lança-chamas Vulcão | 9/tick | 10/s | 150 ticks | Cone persistente, excelente contra coberturas leves. |
| W05 | Rifle Perfura | 95 | 1,9/s | 45 | Penetra até 2 inimigos leves alinhados. |
| W06 | Metralhadora Tambor | 12 | 18/s | 280 | Alto controle de multidão e aquecimento cosmético. |
| W07 | Arco elétrico Íon | 26 + salto 13 | 5/s | 90 | Conduz para 2 alvos próximos em piso molhado. |
| W08 | Granada lançadora Trovão | 80 + área | 1,3/s | 30 | Ricochete curto para derrubar plataformas frágeis. |
| W09 | Lança-disco Serra | 55×2 | 2/s | 40 | Ida/retorno visual, ricochete 1 vez em superfícies. |
| W10 | Canhão criogênico Névoa | 20 + lentidão | 5/s | 80 | Congela mecanismo quente e reduz velocidade de inimigo. |
| W11 | Fuzil solar Prisma | 10/tick | contínua | 100 carga | Feixe curto sustentado; consome carga, recarga em pickups. |

**Regras:** 2 slots especiais + pistola infinita; carregar arma idêntica adiciona munição até limite; trocar W01↔W02 instantaneamente salvo animação de 180 ms; player nunca fica sem arma. Balancear para que cada arma tenha pelo menos duas situações ideais e alguma desvantagem.

## 6.2 Explosivos e consumíveis

| ID | Nome | Quantidade base | Ação |
|---|---|---:|---|
| G01 | Granada de estilhaços | 5 | Explosão circular clássica. |
| G02 | Granada ímã | 3 | Gruda em blindagem/metal. |
| G03 | Bomba de pulso | 2 | Interrompe torre/escudo por 3 s. |
| G04 | Incendiária | 3 | Campo de fogo no solo por 2,5 s. |
| G05 | Carga perfurante | 2 | Quebra parede funcional demarcada. |
| G06 | Sinalizador | 2 | Revela região escura e interrompe sensores. |

Apenas **um** explosivo equipado por vez; troca de tipo em pausa rápida de armamento ou por pickup; não usar inventário extenso. O estoque máximo muda por modo, com limite indicado na HUD.

## 6.3 Power-ups e recompensas

- **Caixa de munição:** repõe 30% do slot atual.
- **Kit de granadas:** +3 da categoria atual.
- **Colete de impacto:** 1 acerto protegido (Campanha; extremamente raro em Arcade).
- **Lata de óleo:** recupera 25% de integridade do veículo.
- **Peça de motor:** restaura turbo de veículo e aumenta pontuação.
- **Insígnia antiga:** colecionável de lore e score, não obrigatória.
- **Mapa da Vértice:** revela uma bifurcação opcional.
- **Chave de engenheiro:** abre objetivo secundário e influencia final B.

## 6.4 Resgate de civis e engenheiros

- Prisioneiro comum: libertar com 1 interação/tiro em cadeado; caminha até local seguro; recompensa após sair de perigo.
- Engenheiro: exige pequeno desafio ambiental de até 20 s, nunca *escort mission* longa.
- Refém reage visualmente ao fogo ao redor, se abaixa e corre para a saída quando liberado.
- Sem punição grotesca: aliados não sofrem dano por arma do jogador; quando um evento ambiental fecha a área, são capturados de novo fora da tela com indicação clara.
- **Contagem por fase:** 6–10 resgates planejados; o registro de objetivos opcionais persiste na Campanha.

---

# 7. VEÍCULOS PILOTÁVEIS

## 7.1 Regras universais

- Entrar/sair via botão de interação próximo; *prompt* com 1 ícone.
- Veículos possuem vida, aceleração, velocidade, arma primária, secundária e pelo menos 1 animação de avaria.
- Ao alcançar 20% de HP, fumaça intermitente e alarme claro; a 0%, janela de 2 s para ejetar, não explosão instantânea inevitável.
- Ejeção mantém velocidade plausível e procura ponto seguro por *sweep collision*; se obstruído, aparece do lado livre.
- Personagem visível parcialmente dentro de cockpits quando coerente com silhueta.
- Em coop, veículo com vaga única fica com um jogador; o outro recebe rota de combate segura em terra ou torre aliada. Veículo com duas vagas especifica função de cada um.
- Som de motor muda com aceleração, piso e dano; fumaça não encobre mais que 15% da área crítica de leitura.

## 7.2 Catálogo

| ID | Nome | Contexto | Primária / secundária | Característica especial |
|---|---|---|---|---|
| V01 | **Besouro-9** | Missões 1, 4 | Metralhadora / obus leve | Tanque compacto que salta baixo. |
| V02 | **Mula de Aço** | Missões 2, 5 | Metralhadora frontal / minas | Caminhonete blindada de duas vagas. |
| V03 | **Gaivota-2** | Missão 3 | Canhão rotativo / foguetes | Hidroavião leve, seções de voo curtas. |
| V04 | **Toupeira-4** | Missões 4, 6 | Perfurador / pulso | Máquina de escavação que abre passagens marcadas. |
| V05 | **Salamandra** | Missão 5 | Lança-chamas / aríete | Carro anfíbio, troca de flutuação. |
| V06 | **Vaga-Lume** | Missão 7 | Laser contínuo / EMP | Planador antigravidade experimental com limite de carga. |
| V07 | **Titã de Resgate** | Missão 8 | Punhos hidráulicos / lança-carga | Exoesqueleto lento com proteção e combos simples. |

## 7.3 Veículo V01 — implementação detalhada inicial

**Movimentação:** horizontal, pulo por pistão e pequena inclinação ao passar por desníveis. **Torre:** gira por 8 direções limitadas sem rotacionar casco. **HP:** 300 em Veterano. **Obus:** 90 de dano em área, recarga de 1,5 s. **Metralhadora:** 10 por tiro a 12 tiros/s; capacidade infinita com pequenos intervalos de resfriamento. **Estados:** vazio → entrar → ativo → dano leve → dano severo → eject → explosão/desativado. **Câmera:** não mudar zoom bruscamente ao entrar. **Falha:** se veículo cair em abismo, ejetar para plataforma segura pré-validada somente se ponto existir; senão tratar como morte ambiental consistente.

---

# 8. INIMIGOS, IA E DIRETOR DE ENCONTROS

## 8.1 Estados de IA

`DORMANT → ENTER → IDLE/PATROL → NOTICE → AIM/WINDUP → ATTACK → RECOVER → REPOSITION → RETREAT/DEFEAT`.

- AI deterministicamente roteirizada por arquétipo com pequenas variações de timing.
- Linha de visão, plataforma, campo de tiro e cobertura são verificados antes do disparo.
- Inimigo nunca atira instantaneamente ao aparecer; começa com *spawn animation*.
- Cooldown global de ataques perigosos restringe simultaneidade (ex.: no máximo 2 ataques explosivos sobrepostos no Veterano, fora de chefes declarados).
- Em Recruta, inimigos mostram o vetor da ameaça antes de atacar; em Lenda, reduz a janela, **não** remove a indicação.

## 8.2 Catálogo de 22 arquétipos

| ID | Inimigo | Papel | Ataque / sinal | Contra-jogo |
|---|---|---|---|---|
| E01 | Recruta da Vértice | Básico | Rajada curta após levantar arma | Pular/agachar. |
| E02 | Escudeiro | Linha de frente | Escudo e golpe com coronha | Atirar por trás/alto. |
| E03 | Granadeiro | Zona | Arco de granada marcado no solo | Mover-se antes da explosão. |
| E04 | Atirador de torre | Distância | Mira visível por 0,7 s | Cobertura/destruir apoio. |
| E05 | Corredor de lâminas | Pressão de perto | Corrida com impulso inicial | Saltar/corpo a corpo no tempo. |
| E06 | Operador de rádio | Suporte | Pede reforço após 3 s | Interromper. |
| E07 | Mecânico de campo | Suporte de veículo | Repara torre estacionária | Priorização de alvo. |
| E08 | Soldado paraquedista | Aéreo | Desce lentamente e dispara lateral | Abater durante descida. |
| E09 | Drone Vespa | Aéreo leve | Tiro simples e mergulho | Projétil de mira alta. |
| E10 | Drone Martelo | Aéreo pesado | Disparo triplo em leque | Ataque na pausa. |
| E11 | Robô rastejante | Chão rápido | Investida, faísca na partida | Salto. |
| E12 | Mina ambulante | Armadilha | Pisca 0,9 s e explode | Destruir à distância. |
| E13 | Torre sentinela | Fixo | Rajadas em 3 arcos | Explosivo ou flanquear. |
| E14 | Artilheiro de morteiro | Vertical | Impactos marcados por sombra | Sair da marcação. |
| E15 | Blindado leve Chacal | Máquina | Canhão frontal + rodas vulneráveis | Atacar atrás. |
| E16 | Tanque Caranguejo | Máquina | Torre giratória e salto curto | Atacar núcleo no pouso. |
| E17 | Escavadeira hostil | Máquina | Investida derrubando paredes | Subir plataforma. |
| E18 | Mergulhador armado | Aquático | Salta da água com arpão | Mirar salto antecipado. |
| E19 | Barco lança-minas | Aquático | Minas boiando a favor da corrente | Destruir minas. |
| E20 | Operador elétrico | Ambiental | Ativa cabos no chão | Cortar disjuntor. |
| E21 | Guarda de elite Cinza | Avançado | Combina escudo e disparo com recuo | Ler 2 telegráficos. |
| E22 | Exotraje pesado Muralha | Pesado | Pisada, metralhadora e míssil | Expor juntas em recuperação. |

## 8.3 Organização por famílias de telegráficos

- **Luz amarela:** atirador prepara arma.
- **Luz laranja piscando:** explosivo prestes a detonar.
- **Luz azul:** sistema elétrico ou pulso EMP.
- **Faixa vermelha pulsante:** área de chefe perigosa.
- **Vapor branco:** movimento mecânico/pressão que antecede esmagamento.

Não usar **somente cor**: cada perigo possui formato, movimento e som específicos.

## 8.4 Pontos de nascimento e limites

- Spawner por setor tem `budget`, `enemyPool`, `telegraphMs`, `offscreenGate`, `maxActive` e `cooldownMs`.
- Máximo em tela recomendado: 7 inimigos comuns + 2 perigos de suporte para um jogador, ajustando conforme desempenho e design.
- Não realizar spawn dentro de câmera salvo entradas diegéticas (porta, veículo, helicóptero) com aviso.
- Ajustar coop com +20–30% de pressão e +10% de HP de inimigos pesados, não dobrar todas as entidades.
- Inimigos evitam fogo em amigo se o ataque impedir passagem do jogador de forma injusta.

---

# 9. CHEFES: REGRAS E CATÁLOGO

## 9.1 Contrato de design de chefes

Cada chefe deve conter: **silhueta exclusiva; introdução curta pulável; 3 padrões claros; 2 fases de evolução; 2 pontos de interação ambiental opcionais; 1 fraqueza sutil; 1 morte espetacular; versão para Recruta/Veterano/Lenda; áudio próprio; testes de segurança**.

**Regras globais:** primeiro uso de ataque avisa ≥0,9 s no padrão Veterano, alternância de ataque/recuperação, sem projétil invisível em explosão, tempo-alvo de derrota 90–150 s com arsenal de fase, sem *softlock* ao destruir peça antes da hora. No coop, não mirar sempre em um jogador.

## 9.2 Chefes principais (8)

| Missão | Chefe | Descrição original | Fases e mecânica principal |
|---|---|---|---|
| 1 | **Dragão-Guindaste** | Guindaste de estaleiro blindado sobre esteiras | Arremessa contêiner; perde braço; revela núcleo. |
| 2 | **Locomotiva Moloch** | Trem de cerco com locomotiva artilhada | Canhões laterais; troca trilhos; caldeira exposta. |
| 3 | **Albatroz de Ferro** | Aeronave anfíbia de patrulha gigantesca | Bombas em padrão; voo baixo; motores destruíveis. |
| 4 | **Gêmeos Basalto** | Duas perfuratrizes interligadas por cabo de força | Ataques alternados; cabo ativo; fusão em máquina única. |
| 5 | **Leviatã do Porto** | Plataforma naval industrial com garras e torres | Inundação gradual; combate em cais; turbina exposta. |
| 6 | **Coração da Fornalha** | Forno de mineração automatizado com braços | Piso aquecido; martelos; resfriar ventilação. |
| 7 | **O Colosso Atmosférico** | Fortaleza flutuante modular | Partes em sequência, zona de vento, escudos. |
| 8 | **HORIZONTE-0 / Coroa da Tempestade** | Núcleo climático montado sobre torre articulada | Raios / plataformas móveis / sabotagem de reatores. |

## 9.3 Mini-bosses (6)

- MB01 **Balde de Ferro**, tanque de carga improvisado; missão 1.
- MB02 **Sargento Baldo e a Plataforma**, artilharia giratória cômica; missão 2.
- MB03 **Arraia Mecânica**, submersível aéreo/água; missão 3.
- MB04 **Cortador de Rocha**, perfuratriz menor em galeria; missão 4.
- MB05 **Cegonha de Guerra**, cargueiro que lança containers; missão 5.
- MB06 **Guardião da Caldeira**, exotraje de calor; missão 6.

## 9.4 Chefe 1 — script detalhado para protótipo

**Dragão-Guindaste**

- **Arena:** cais com 2 plataformas baixas, 1 contêiner destrutível, linha d’água visual; largura mínima de 2 telas para combate e entrada.
- **Intro (4 s, pulável):** luzes do porto se apagam; guindaste recolhe cabo; câmera faz tilt suave; nome aparece por 1,2 s.
- **Fase A (100–65% HP):** ataque 1, lança contêiner com sombra da queda; ataque 2, rajada lateral da cabine; ataque 3, gancho varre chão em arco alto. Intervalos de 1–1,8 s entre ações.
- **Fase B (65–25%):** após destruir braço, anda por 1/3 da arena e ativa tiro duplo; gancho cai e vira obstáculo temporário; partes da blindagem soltam placas.
- **Fase C (25–0%):** núcleo exposto; cabo entra em curto e faíscas assinalam áreas eletrificadas; padrão alterna direita/esquerda e inclui janela clara de 1 s após cada ciclo.
- **Contrajogo ambiental:** explodir painel lateral faz o braço travar por 3 s; destruir corrente libera munição extra.
- **Derrota (5 s):** garras soltam, luz interna estoura, queda progressiva de peças e grande explosão; heróis preservam controle e invulnerabilidade de cutscene.
- **Trilha:** `BOSS_01_DRAGAO` inicia com *stinger* de 1 s; camada extra ao entrar em 35% HP.
- **Testes:** possível esquivar sem dano; chefe não atinge player durante intro; pausa conserva animação; projétil não fica órfão após morte; coop viável sem encurralamento.

---
# 10. CAMPANHA COMPLETA — FASE POR FASE

## 10.0 Padrão de produção de missão

Cada missão deve registrar:
- **Narrativa:** motivação, mudança na história, rádio opcional e consequência.
- **Fluxo principal:** entrada, escalada de perigo, primeiro descanso, evento, minichefe (se houver), chefe.
- **Fluxo alternativo:** caminho B que oferece cenário/mecânica distinta, com início e fim explícitos.
- **Recursos:** armas garantidas para vencer o chefe mesmo ao morrer, granadas, 2 checkpoints em Veterano, 6–10 resgates, 2–4 segredos.
- **Pacing:** no máximo 35 s sem tiro, interação ou descoberta; picos de combate separados por respiro.
- **Pontos de teste:** progresso, retorno do checkpoint, câmera, coop, FPS e prevenção de softlocks.

### Visão geral das 8 missões

| # | Missão | Ambiente | Dia/noite | Veículo(s) | Tempo alvo | Chefe |
|---|---|---|---|---|---|---|
| 1 | **Fogo no Mangue** | Vilarejo de palafitas / estaleiro | Amanhecer | Besouro-9 | 5–7 min | Dragão-Guindaste |
| 2 | **Trilho Partido** | Interior / ferrovia / cidade operária | Meio-dia | Mula de Aço | 5–7 min | Locomotiva Moloch |
| 3 | **Céu de Sal** | Deserto salino / lagoa / aeródromo | Pôr do sol | Gaivota-2 | 6–8 min | Albatroz de Ferro |
| 4 | **Pedra e Gelo** | Serra nevada / túneis / pedreira | Noite | Besouro-9 e Toupeira-4 | 6–8 min | Gêmeos Basalto |
| 5 | **Maré de Ferrugem** | Porto / navios / plataforma marítima | Tarde chuvosa | Mula de Aço e Salamandra | 6–8 min | Leviatã do Porto |
| 6 | **Fornalha Zero** | Usina geotérmica / mina / fundição | Interior vermelho industrial | Toupeira-4 | 6–8 min | Coração da Fornalha |
| 7 | **A Cidade Suspensa** | Arranha-céus / cabos / fortaleza no céu | Crepúsculo | Vaga-Lume | 7–9 min | Colosso Atmosférico |
| 8 | **Horizonte Quebrado** | Torre atmosférica / tempestade / núcleo | Noite → amanhecer | Titã de Resgate | 8–11 min | HORIZONTE-0 |

**Duração de campanha:** a soma das durações-alvo é de aproximadamente 49–66 min na primeira passagem. Uma execução experiente poderá chegar a 35–45 min, hipótese que precisará ser validada. A versão de produção fixará as faixas após testes reais.

## 10.1 MISSÃO 1 — FOGO NO MANGUE

**Briefing:** O estaleiro da Baía Cobre está fabricando cápsulas meteorológicas armadas. Lia e Bento precisam destruir um carregamento e obter uma tabela de fretes antes que o Consórcio elimine a rota de fuga.

**Identidade visual:** água verde-escura com espuma e reflexos simples, madeira molhada, cabanas sobre estacas, árvores inclinadas, pássaros fugindo com explosões, pequenas embarcações, aço alaranjado. Cenário claro o suficiente para distinguir projéteis.

**Setores e scripts:**
1. **M1-S1 — Praia da Ferrugem (45–75 s):** andar, agachar, tiro e granada por introdução contextual sem tela modal; soldados E01/E02; uma ponte quebra somente após o jogador saltar para uma plataforma segura. Segredo: acertar sino da vila revela medalha.
2. **M1-S2 — Passarelas (65–100 s):** barris pressurizados e granadeiros E03; resgate de 2 pescadores; plataformas de altura mista para ensinar tiro diagonal. Tutorial curto de interação com cadeado.
3. **M1-S3 — Bifurcação (60–100 s):** **Rota A** por casas de palafita com civis para salvar, mais inimigos leves e munição; **Rota B** por canais rasos, inimigos aquáticos E18, 1 segredo mecânico e reforço de granadas. Reencontro em comporta de estaleiro.
4. **M1-S4 — Oficina abandonada (60–90 s):** encontro MB01 Balde de Ferro. Após derrota, encontra **Besouro-9**; tutorial de entrada/saída e alarme de dano. Primeiro checkpoint.
5. **M1-S5 — Cais militar (45–75 s):** trecho de tanque, torres e containers que podem bloquear parcialmente o caminho, mas nunca totalmente; uma arma alternativa disponível para pedestres.
6. **Arena M1-B — Dragão-Guindaste (90–150 s):** três padrões e destruição da máquina.

**Inimigos:** E01, E02, E03, E06, E13, E18, E15; MB01. **Armas garantidas:** W01, W02, granadas G01; W03 é prêmio de rota B. **Resgates:** 8. **Segredos:** sino, árvore com compartimento, cofre de oficina. **Música:** `MUS_M01_MANGUE` e `MUS_BOSS_DRAGAO`. **Narrativa de encerramento:** rádio captura frequência do trem de carga que parte ao amanhecer seguinte.

**Critérios de conclusão:** o jogador aprende as ações essenciais sem ler manual; consegue completar com pistola e granadas; tanque pode ser abandonado e chefe continua vencível; checkpoint não duplica resgates.

## 10.2 MISSÃO 2 — TRILHO PARTIDO

**Briefing:** A Brigada deve interceptar a locomotiva que transporta códigos de navegação do Projeto Horizonte.

**Identidade visual:** campo seco, subúrbios industriais, trens iluminados por janelas, placas de perigo, maquinário amarelo, fumaça preta, trilhos com brilho, poças de óleo.

**Setores:**
1. **M2-S1 — Vila ferroviária:** combate em dois níveis sobre postes, vagões e plataformas. Inimigos E01/E04/E06; um operador de rádio chama reforços se ignorado.
2. **M2-S2 — Depósito de combustível:** containers empilhados, válvulas que liberam vapor, explosões em cadeia com prévia de direção; resgate de 2 funcionários.
3. **M2-S3 — Bifurcação:** **Rota A: túnel de manutenção** com inimigos escudeiros, salas estreitas e chave de engenheiro; **Rota B: telhados das oficinas** com paraquedistas, colecionáveis e passarela móvel. As duas voltam à mesma estação.
4. **M2-S4 — Cruzamento:** combate em **Mula de Aço**, coop com atirador na carroceria, cruzamentos temporizados com aviso visual/sonoro; encontro MB02 Sargento Baldo e a Plataforma.
5. **M2-S5 — Trem em movimento:** corrida por 3 vagões com avanço de câmera travado; plataformas não podem passar sob o jogador sem tempo suficiente para reagir. Pré-chefe entrega W03.
6. **Arena:** **Locomotiva Moloch** — 100–70%: 2 canhões sobre rodas; 70–30%: força destruição de plataformas laterais em ordem previsível; 30–0%: caldeira exposta, jatos de vapor com piso seguro sempre disponível.

**Inimigos:** E01, E02, E04, E06, E08, E13, E15, E21. **Resgates:** 7. **Segredos:** cabine de sinalização, vagão postal, cofre atrás de relógio. **Objetivo Final B #1:** salvar engenheira ferroviária e recuperar componente de controle. **Música:** `MUS_M02_TRILHOS`, `MUS_M02_TREM`, `MUS_BOSS_MOLOCH`. **Encerramento:** os documentos apontam para depósito de drones no Mar de Sal.

**QA:** vagão não vibra por descompasso entre física e posição visual; colisões não se perdem em plataformas móveis; câmera não atravessa trem; prompt de saída de veículo não abre menu de pausa.

## 10.3 MISSÃO 3 — CÉU DE SAL

**Briefing:** A Vértice desenvolveu aeronaves anfíbias alimentadas por tempestades artificiais. O esquadrão deve cruzar planícies salinas e destruir seu centro de testes.

**Arte:** horizonte azul-cinza, espelhos d’água, sal branco, poeira vermelha, aeródromo com radar, nuvens longas, reflexos simples e poeira de pneus.

**Setores:**
1. **M3-S1 — Salinas:** tiro de longa distância, mineradores explorados, torre sentinela; tutorial opcional da arma de precisão W05.
2. **M3-S2 — Lagoa evaporada:** inimigos de chão E11 e minas E12; destruição de guindastes para formar ponte, mas sempre com percurso alternativo de emergência.
3. **M3-S3 — Bifurcação:** **Rota A: dutos de refrigeração**, plataforma interna com armadilhas elétricas E20; **Rota B: ferrovia costeira**, assédio de drones E09 e franco-atirador E04; convergência em hangar.
4. **M3-S4 — Hangar:** roubar **Gaivota-2** após enfrentar MB03 Arraia Mecânica. Controle aéreo simplificado com limites verticais e câmera preparada.
5. **M3-S5 — Voo sobre o sal:** seção curta de 70–90 s; torres aéreas e obstáculos anunciados, duas alturas de rota e pickups; coop mantém 1 jogador na torre e outro pilota quando duas vagas disponíveis; se só houver uma vaga, incluir torreta defensiva portátil na fase.
6. **Arena:** **Albatroz de Ferro**; 100–60%: solta bombas em fileiras com lacunas; 60–25%: motores danificados e mudança para voo baixo; 25–0%: ataque de mergulho e abertura de central mecânica.

**Resgates:** 6. **Armas:** W05, W07, W03. **Segredos:** sal cristalizado atrás do radar, satélite caído, hangar lacrado. **Música:** `MUS_M03_SAL`, `MUS_M03_VOO`, `MUS_BOSS_ALBATROZ`. **Revelação:** clima extremo é produzido e não natural; o sinal vem das serras.

**QA:** controle aéreo segue input em 60 Hz sem aceleração por FPS; queda do avião não causa cenário sem saída; tiro em diagonal não some na borda da câmera.

## 10.4 MISSÃO 4 — PEDRA E GELO

**Briefing:** Destruir as perfuratrizes que alimentam o reator climático com minérios raros; descobrir se a Dra. Celina ainda está viva.

**Arte:** rocha escura, neve cinza, refletores de mina, estalactites, máquinas de esteira, luz amarela quente no interior e azul frio no exterior. Flocos em plano traseiro não escondem projéteis.

**Setores:**
1. **M4-S1 — Trilha do cume:** encostas, gelo com fricção moderada e previsível, E08/E09/E14; passar por túnel de neve que desmorona com aviso de rachadura.
2. **M4-S2 — Pátio da extração:** operar **Besouro-9** contra torres; se tanque for perdido, há armas suficientes para concluir o trecho a pé.
3. **M4-S3 — Bifurcação:** **Rota A: elevadores da pedreira** com plataforma vertical e engenheiro a salvar; **Rota B: fenda glacial** com terreno escorregadio e minas; retorno em entrada da escavação.
4. **M4-S4 — Túneis:** **Toupeira-4** abre rocha fissurada (indicada com textura específica), MB04 Cortador de Rocha bloqueia uma galeria.
5. **M4-S5 — Sonda profunda:** cenário aprende propagação elétrica por trilhos; pistas de que a Vértice descarrega energia no mar.
6. **Arena:** **Gêmeos Basalto**. Chefe A corta o solo, B dispara de cima; destruir cabo de sincronização abre janelas. Em 35% de HP combinado, unem os dois chassis e passam a atacar em um ritmo único.

**Resgates:** 9. **Armas:** W08 e W10; W02 em caixa garantida. **Objetivo Final B #2:** recuperar dados de frequência e salvar técnico de refrigeração. **Segredos:** fósseis no gelo, bilhete de Celina, túnel estreito acessível a pé. **Música:** `MUS_M04_GELO`, `MUS_M04_MINA`, `MUS_BOSS_BASALTO`. **Encerramento:** a mineração era uma distração; a energia está sendo enviada a um porto militar.

**QA:** gelo não altera velocidades entre PCs; partículas não provocam queda de FPS, sem bloqueio de corredor após perfuração; plataforma vertical segura para dois jogadores.

## 10.5 MISSÃO 5 — MARÉ DE FERRUGEM

**Briefing:** Infiltrar porto de transferência, tomar o cargueiro de comunicação e interromper envios do núcleo climático.

**Arte:** cais industrial, mar revolto, navios cargueiros, guindastes, cabo de aço, janelas iluminadas, nuvens de tempestade e chuva. Sprites de água leves e colisões independentes da arte.

**Setores:**
1. **M5-S1 — Entrada portuária:** motocicletas inimigas (variante de E15), operários E07 e marcos de cobertura destruível.
2. **M5-S2 — Armazéns:** usar **Mula de Aço** por corredor largo, cooperativo com dois papéis; destruir alarme impede uma onda de reforços.
3. **M5-S3 — Bifurcação:** **Rota A: cobertura das gruas**, combate vertical contra E08/E10; **Rota B: porões dos navios**, luta apertada com E02/E21 e resgate extra.
4. **M5-S4 — Doca inundada:** entra na **Salamandra**; alterna rodagem e flutuação com animação clara; MB05 Cegonha de Guerra lança containers.
5. **M5-S5 — Plataforma do radar:** chuva aumenta por evento roteirizado, sem interferir na taxa de quadros; utilizar válvulas para elevar piso.
6. **Arena:** **Leviatã do Porto**: 100–65% torre/míssil; 65–30% garras/água subindo; 30–0% turbina ventral exposta e zonas secas que aparecem por ciclos.

**Resgates:** 10. **Armas:** W03, W04, W07. **Segredos:** bote salva-vidas, guindaste com caixa, rádio de pescador, navio mercante. **Música:** `MUS_M05_PORTO`, `MUS_M05_TEMPESTADE`, `MUS_BOSS_LEVIATA`. **Revelação:** a Diretora Ária pretende manter o clima em modo de emergência mesmo que Varga seja derrotado.

**QA:** colisão da água separada de superfície visual; troca anfíbio-terrestre sem animação travada; nenhuma rota vira inalcançável se o veículo explodir.

## 10.6 MISSÃO 6 — FORNALHA ZERO

**Briefing:** Sabotar a usina geotérmica que sustenta a estação atmosférica e reunir a última informação de engenharia necessária para salvá-la.

**Arte:** aço negro, minério incandescente, rios de metal em calhas, maquinário gigantesco, fumaça, painéis de segurança e cabos com pulsos de luz. Não confundir luz vermelha decorativa com área letal (perigo tem contorno listrado e animação).

**Setores:**
1. **M6-S1 — Pátio da usina:** E01/E20/E22; primeira apresentação de piso que aquece antes de causar dano, com sinal sonoro distinto.
2. **M6-S2 — Turbinas:** elevadores grandes, inimigos protegidos e controle de ventiladores por válvula simples (apertar uma vez, sem jogo de botão repetido).
3. **M6-S3 — Bifurcação:** **Rota A: linha de resfriamento**, exige interromper vapor e salva técnico; **Rota B: forja auxiliar**, combate pesado com recompensas de armamento; ambas convergem no reator.
4. **M6-S4 — Trilho profundo:** piloto usa **Toupeira-4**; destruição de paredes marcadas; minichefe MB06 Guardião da Caldeira.
5. **M6-S5 — Reator externo:** Celina é encontrada por rádio e revela que pode estabilizar a estação se os quatro módulos de controle forem preservados.
6. **Arena:** **Coração da Fornalha**: padrão de braços alternados; solo aquecido, depois válvulas de resfriamento; no terço final precisa acertar engrenagem vulnerável sem entrar em área injusta.

**Resgates:** 8. **Armas:** W04, W10, W11. **Objetivo Final B #3:** salvar Celina e isolar válvula de controle. **Segredos:** máquina de venda automática, túnel de manutenção, registro histórico do projeto. **Música:** `MUS_M06_FORNALHA`, `MUS_M06_REATOR`, `MUS_BOSS_CORACAO`. **Encerramento:** a estação atmosférica já se elevou sobre a capital.

**QA:** nenhum efeito de calor muda hitbox sem telegráfico; engenheira não desaparece após checkpoint; ativar válvulas em outra ordem não prende personagem.

## 10.7 MISSÃO 7 — A CIDADE SUSPENSA

**Briefing:** Escalar a capital ocupada e infiltrar a fortaleza voadora antes que o céu seja fechado por uma tempestade permanente.

**Arte:** prédios art déco-industriais originais, bondes elétricos, letreiros de neon, cartazes de evacuação, cabos e pontes aéreas, nuvens de profundidade, janelas com civis. Escala monumental, mas fundo não compete com projéteis.

**Setores:**
1. **M7-S1 — Avenida evacuada:** E06/E13/E21; cobertura temporária e aliados não combatentes em locais protegidos.
2. **M7-S2 — Bondes aéreos:** plataformas móveis com regras claras, tubulações que expelem vapor, variedade de altura.
3. **M7-S3 — Bifurcação:** **Rota A: centro de comunicações**, engenheiro com quarta chave de estabilização; **Rota B: telhado da estação de energia**, recompensa de veículo/munição e tempo mais curto. Ambas chegam à torre.
4. **M7-S4 — Plataforma de voo:** introdução do **Vaga-Lume**, combate vertical curto contra E09/E10 e tempestades com correntes de vento animadas antes de aplicar força.
5. **M7-S5 — Perímetro da fortaleza:** defesa de 60 s para abrir hangar. O jogador pode destruir rádios para reduzir onda; o cronômetro termina mesmo com poucos inimigos restantes, evitando grind.
6. **Arena:** **Colosso Atmosférico**: destruir duas estruturas de escudo em sequência; ventos movem pequenas plataformas; plataforma central fica sempre utilizável; armadura cai e revela núcleo.

**Resgates:** 7. **Armas:** W07, W09, W11. **Objetivo Final B #4:** recuperar chave atmosférica e manter transmissão com Celina. **Segredos:** teleférico antigo, caixa de luz, transmissão de rádio. **Música:** `MUS_M07_CIDADE`, `MUS_M07_ASCENSAO`, `MUS_BOSS_COLOSSO`. **Revelação:** Varga tentou parar a IA do Horizonte, mas o próprio protocolo de defesa agora trata toda aproximação como ameaça.

**QA:** correntes de vento não jogam jogador em projétil inevitável; plataformas sobrepostas possuem bordas claras; missão reinicia corretamente após morrer no voo.

## 10.8 MISSÃO 8 — HORIZONTE QUEBRADO

**Briefing:** Desligar a máquina de controle climático. Varga está no centro de comando; a Diretora Ária mantém o protocolo automático ativo. O jogador decide destruir a estação ou estabilizá-la caso tenha reunido condições.

**Arte:** cabine de comando panorâmica, torres de antenas, atmosfera roxa sob descarga elétrica, motores flutuantes, plataformas rotativas, oceano distante. No final, amanhecer dourado revela a dimensão do arquipélago.

**Setores:**
1. **M8-S1 — Casco externo:** combate contra E21/E22, turrets e sensores E20; narrativa por placas do projeto, sem interromper ação.
2. **M8-S2 — Baía dos mecanismos:** obter **Titã de Resgate** e abrir portas hidráulicas; dois braços operam por comando de ataque/ secundário, sem 15 botões novos.
3. **M8-S3 — Câmara de Varga:** encontro narrativo de 20–30 s com escolha de fala *sem impacto no combate*, breve sequência de batalha contra segurança robotizada; Varga deixa de ser o último vilão.
4. **M8-S4 — Bifurcação final:** **Rota de destruição**, disponível sempre, coloca cargas em 3 pontos; **Rota de estabilização**, disponível se objetivos de engenharia 2/4/6/7 concluídos, reorienta 3 condutores e preserva a máquina. Rota B mais difícil, não necessária para terminar jogo.
5. **M8-S5 — Câmara da tempestade:** plataformas em pulso, raios marcados no piso, trechos de combate contra E09/E20/E22; último checkpoint antes do chefe.
6. **Arena final:** **HORIZONTE-0 / Coroa da Tempestade** — **Fase 1:** 3 torres emissoras, ciclos em 4 quadrantes; **Fase 2:** pedestal sobe, plataformas laterais e feixes; **Fase 3:** núcleo no centro, ondas com lacunas claras. Se rota estabilização, enfraquecer núcleo sem destruí-lo e acionar dois consoles após barra de controle. Caso contrário, destruir núcleo.
7. **Epílogo jogável curto (30–45 s):** fuga da estrutura colapsando ou descida controlada. Não usar armadilhas letais inéditas após vencer o chefe; objetivo é fechamento cinemático interativo.

**Resgates:** 8, incluindo ex-funcionários e operadores aprisionados. **Armas:** W11, W03, W07, com munição garantida antes do chefe. **Segredos:** sala de gravação, amostras do clima original, placa memorial da Brigada. **Música:** `MUS_M08_HORIZONTE`, `MUS_M08_NUCLEO`, `MUS_BOSS_FINAL_3PH`, `MUS_END_A`, `MUS_END_B`. **Encerramento:** cutscene com estados do mapa e cenas dos NPCs resgatados, créditos, estatística final e ranking.

**QA:** finais A e B realmente alcançáveis; nenhum boss sem vulnerabilidade por ordem de eventos; reset de partes após continue; música final toca corretamente; créditos acessíveis por menu independentemente da vitória.

---

# 11. PROGRESSÃO, CHECKPOINTS, SEGREDOS E ECONOMIA

## 11.1 Progressão justa

- A campanha libera a próxima fase por vitória; não exige comprar upgrades.
- O jogador ganha **insígnias** pela exploração para liberar cores de roupa, arte conceitual, rádio do mundo e desafios alternativos.
- Melhorias mecânicas permanentes ficam fora da campanha principal ou restritas a modo customizado, para que o balanceamento de Arcade não dependa de farm.
- No modo história, **oficina da Brigada** permite escolher apenas configurações laterais: cor do veículo, ênfase do som, tipo de indicador de mira, animação alternativa de vitória.

## 11.2 Checkpoints por setor

Armazenar: `missionId`, `checkpointId`, `characterId`, `route`, `lives`, `score`, `rescuedIds`, `destructibleFlags`, `vehicleState`, `weaponSlots`, `grenadeCount`, `bossPhase`, `objectives`, `randomSeed`.

- Nunca reviver inimigos em posição conflitante com o spawn do jogador.
- Um resgate contado não reaparece como pontuação duplicada após continue.
- Em Campanha, saves gravados **apenas** após confirmação de checkpoint e resultado da missão; em Arcade, salvar apenas configurações e ranking.
- Missões podem ser reexecutadas sem rebaixar progresso de campanha.

## 11.3 Padrão de segredos

Cada fase deve incluir ao menos 3 categorias:
1. **Ambiental:** acertar objeto suspeito com linguagem visual consistente (placa de metal corroída, poste com símbolo).
2. **Rota:** alcançar plataforma opcional ou entrar em porta aberta por válvula.
3. **Desafio:** destruir mecanismo antes do contador ou vencer minichefe sem perder veículo.

Segredos não podem depender de tiro aleatório em todos os pixels do fundo; um detalhe visual/som sugere a solução.

## 11.4 Score (valores propostos, diferentes da referência)

| Evento | Pontos base |
|---|---:|
| Inimigo comum | 100 |
| Inimigo especial | 350 |
| Blindado leve | 800 |
| Minichefe | 5.000 |
| Chefe | 15.000 |
| Resgate seguro | 1.000 |
| Medalha de exploração | 750 |
| Objetivo secundário | 3.000 |
| Fase sem dano | 12.000 |
| Veículo preservado | 4.000 |
| Finalizar sem continue | 8.000 |

**Fórmula:** `pontuação final = soma(eventos × multiplicador vigente) + bônus de conclusão`. Multiplicador acumula apenas em eventos elegíveis, com *cap* 2,5. Salvar ranking separado por modo, dificuldade, coop e modificadores de acessibilidade que alterem gameplay.

## 11.5 Conquistas planejadas

- **Primeira Faísca:** concluir missão 1.
- **Maré Livre:** concluir missão 5.
- **Sem Derrapar:** completar missão 2 sem cair do trem.
- **Aço Intacto:** terminar um chefe em veículo sem perder HP dele.
- **Mãos ao Alto:** resgatar todos os civis de uma fase.
- **Engenharia Salvadora:** desbloquear final B.
- **Dois Contra a Tempestade:** concluir missão 8 em coop local.
- **Pés no Chão:** concluir missão 4 sem usar veículo.
- **Último Cartucho:** derrotar um chefe com pistola básica.
- **Ferro e Fogo:** concluir modo Arcade sem continue.

---
# 12. HUD COMPLETO E FEEDBACK DE COMBATE

## 12.1 Objetivo

A interface deve manter o centro visual livre, informar decisões urgentes em menos de 250 ms de percepção e parecer um painel militar artesanal, sem imitar diretamente a tipografia, ícones ou composição exata do HUD de Metal Slug. **Não criar minimapa fixo** no gameplay principal: o fluxo é horizontal; ícones de objetivos aparecem quando necessários.

## 12.2 Wireframe de gameplay — um jogador

```text
┌─────────────────────────────────────────────────────────────────────────┐
│ [LIA ▣]  ♥♥♥   ◉ 02        M01: FOGO NO MANGUE       TEMPO  06:31     │
│ PONTOS  018250       ÍMPETO  [■■■□□] ×1.6          RESGATES  4/8      │
│                                                                         │
│   [detalhes de cenário / elementos de fundo em planos de paralaxe]      │
│                                                                         │
│               [inimigos]    [projéteis com silhueta legível]            │
│                            [personagem + retícula discreta]            │
│                                                                         │
│                                                                         │
│ W01 CARABINA  086    G01  ×04          [OBJ: CHEGAR AO ESTALEIRO]      │
└─────────────────────────────────────────────────────────────────────────┘
```

**Posicionamento:** parte superior esquerda (avatar, vidas, escudo); superior central (nome de missão apenas durante entrada); superior direita (cronômetro, resgates, pontuação conforme modo). Armas e granadas no rodapé à esquerda; objetivo de 2–4 palavras no rodapé direito somente durante atualização. HUD não ocupa mais que ~13% da altura em operação normal.

## 12.3 Wireframe de coop — dois jogadores

```text
┌─────────────────────────────────────────────────────────────────────────┐
│ P1 LIA  ♥♥  W01:080  G:04   RESGATES 07/10   P2 BENTO ♥♥ W03:12 G:03│
│    [linha de ÍMPETO P1]                          [ÍMPETO P2]           │
│                                                                         │
│        (P1 indicador amarelo)             (P2 indicador azul)          │
│                       CÂMERA ÚNICA, SEM SPLIT                          │
│                                                                         │
│           OBJETIVO EVENTUAL: DESTRUIR TRANSMISSOR  [1/2]              │
└─────────────────────────────────────────────────────────────────────────┘
```

Quando há dois jogadores, o HUD reduz texto, usa compactação de valores e separa lados pela posição dos controles. A cor de P1/P2 é complementada por **número e forma** para daltônicos.

## 12.4 Estado de veículo

Ao entrar no veículo, substitui parte inferior da interface por `VEÍCULO [BESOURO-9]`, barra de blindagem em 3 estágios, munição secundária/recarga, velocímetro só quando a velocidade for mecânica importante (missões 2 e 5) e aviso de ejeção.

```text
VEÍCULO BESOURO-9  [██████░░░░] 60%   OBUS  03/05   [E] SAIR
```

Em 20%: barra pisca com ícone de avaria e som metálico, sem flash estroboscópico. Em estado crítico: `EJETE-SE` com pictograma e contagem visual de ~2 s.

## 12.5 HUD de chefes

- Nome surge por 1 s, com barra de integridade abaixo do topo, sem cobrir o corpo do chefe.
- Barra principal com marcações em 65% e 25% quando há transição de fase; não mostrar número de HP no padrão Arcade.
- Componentes destrutíveis identificados por alteração no sprite; setas apenas no tutorial ou Recruta.
- O nome da fase do chefe (`BRAÇO QUEBRADO`, `NÚCLEO EXPOSTO`) aparece por até 0,8 s.
- Alertas `METAL AQUECIDO`, `VENTO FORTE`, `INUNDAÇÃO` só quando uma regra muda, nunca spam constante.

## 12.6 HUD contextual e prioridades

| Prioridade | Evento | Elemento | Tempo |
|---|---|---|---|
| P0 | Vida em risco | Aviso de míssil, perigo e ejeção | Até resolver. |
| P0 | Checkpoint / continuação | Confirmação pequena + ícone | 1,5 s. |
| P1 | Arma adquirida | Nome curto, ícone e munição | 1,2 s. |
| P1 | Resgate | `RESGATE +1` + progressão | 0,9 s. |
| P1 | Objetivo alterado | Texto breve e seta contextual | 2 s. |
| P2 | Ímpeto/pontuação | Animação discreta no canto | 0,5 s. |
| P3 | Lore/diálogo | Legenda com alto contraste | Até terminar áudio; ocultável. |

**Regras:** não sobrepor P0 com um anúncio de P1; fila de eventos com descarte de repetidos. A UI deve respeitar *safe area* de 5% em todas as direções para telas com overscan/TV.

## 12.7 Efeitos de feedback

- Acerto em blindagem: faíscas brancas/amarelas e som de ricochete.
- Acerto vulnerável: pequeno flash de quadro e hit-stop de 35–55 ms apenas para golpes fortes; nunca congelar o relógio de áudio sem transição.
- Tiro aliado: traço central claro; inimigo: contorno vermelho/laranja e silhueta distinta.
- Munição acabando: último quinto recebe marca `!` discreta; não emitir alerta vocal a cada tiro.
- Sem dano e conquistas: não usar pop-up no centro durante projétil ativo.

---

# 13. ARQUITETURA DOS MENUS E TODAS AS TELAS

## 13.1 Identidade do menu principal

**Cena:** hangar da Brigada Brasa à noite. No fundo, o veículo Besouro-9 recebe manutenção; uma ventoinha gira lentamente, chuva escorre em janelas e um rádio recebe transmissão. Os personagens aparecem em 3–5 poses *idle*. Parallax leve e opção `REDUZIR MOVIMENTO`.

**Logo:** tipografia original inspirada em letras mecânicas soldadas, título `BRASA DE AÇO` com subtítulo `OPERAÇÃO HORIZONTE`. **Sem** copiar o logotipo de Metal Slug. Trilha do menu tem marcha aventureira com baixo elétrico e metais sintetizados, distinta do áudio de gameplay.

```text
┌──────────────────────────────────────────────────────────┐
│                       BRASA DE AÇO                       │
│                    OPERAÇÃO HORIZONTE                    │
│                                                          │
│                [pátio de manutenção vivo]               │
│                                                          │
│                 ▶ CONTINUAR                              │
│                   NOVA CAMPANHA                         │
│                   ARCADE CLÁSSICO                       │
│                   JOGAR EM DUPLA                        │
│                   SELEÇÃO DE MISSÕES                    │
│                   TREINAMENTO                           │
│                   EXTRAS / RECORDES                     │
│                   OPÇÕES                                │
│                   SAIR                                  │
│                                                          │
│            v1.0    [CONTROLE CONECTADO]    PT-BR         │
└──────────────────────────────────────────────────────────┘
```

**Comportamento:** `CONTINUAR` desativado com explicação se não houver save; navegação por teclado ou controle; menu mantém último item selecionado após retornar; botões têm estado normal, foco, pressionado e desativado com som/feedback apropriado.

## 13.2 Mapa completo de navegação

```text
BOOT
  ├─ Splash (pular)
  ├─ Selecionar perfil / perfil convidado
  └─ Menu principal
      ├─ Continuar → Campanha salva → Briefing / Jogar
      ├─ Nova Campanha → Dificuldade → Personagem → Prólogo → Missão 1
      ├─ Arcade Clássico → Regras → Personagem(s) → Missão 1
      ├─ Jogar em Dupla → Detectar gamepads → Seleção P1/P2 → Campanha/Arcade
      ├─ Seleção de Missões → Mapa do arquipélago → Missão/rota → Jogar
      ├─ Treinamento → Tiro | Movimento | Veículos | Perigos
      ├─ Extras
      │   ├─ Recordes (por dificuldade/modo)
      │   ├─ Insígnias e conquistas
      │   ├─ Galeria de sprites
      │   ├─ Bestiário/veículos
      │   ├─ Jukebox (músicas originais desbloqueadas)
      │   ├─ Arquivo de rádio / lore
      │   ├─ Créditos
      │   └─ Estatísticas
      ├─ Opções
      │   ├─ Vídeo
      │   ├─ Áudio
      │   ├─ Controles
      │   ├─ Jogabilidade
      │   ├─ Acessibilidade
      │   ├─ Idioma
      │   └─ Dados / saves
      └─ Sair → Confirmação apenas se em sessão não salva
```

## 13.3 Seleção de personagem

- Quatro fichas (duas desbloqueadas de início); retratos animados com arma característica, nome, benefício pequeno e 1 frase original.
- Em dupla, P1 e P2 não podem escolher exatamente a mesma paleta, mas podem escolher o mesmo personagem com cor alternativa.
- Exibir mapeamento atual de controle na borda inferior; botão `PRONTO` e `VOLTAR`.
- Não iniciar coop se só existe 1 controle mapeado e o teclado não foi atribuído explicitamente.

## 13.4 Seleção de missão

**Interface:** mapa ilustrado de Aurora Sul com pinos das oito regiões, estrela de conclusão e ícones de rota descobertos. Ao focar uma missão, mostrar nome, melhor tempo, resgates, rotas e recorde. `INICIAR`, `VER BRIEFING`, `ALTERAR DIFICULDADE` (se aplicável), `VOLTAR`.

**Regras:** não revelar rota secreta não descoberta como descrição detalhada; missões bloqueadas têm legenda clara. Em Arcade Clássico, seleção de missão não é permitida, para proteger rankings.

## 13.5 Tela de briefing

- Ilustração de mapa e 3 fotos/silhuetas originais, 1–2 falas de comandante, objetivo principal e opcional.
- Duração 10–20 s; `SEGURAR PARA PULAR` 0,5 s para evitar acidental.
- Briefing pode ser reaberto pelo menu Pausa **sem pausar duas vezes**.
- Barra de carregamento de assets só aparece se precisar, com texto específico caso falhe algum recurso.

## 13.6 Pause — fluxo robusto

```text
┌──────────────────────── PAUSADO ─────────────────────────┐
│                    ▶ RETOMAR                            │
│                      REINICIAR CHECKPOINT               │
│                      OBJETIVOS / BRIEFING               │
│                      CONTROLES                          │
│                      OPÇÕES                             │
│                      SAIR PARA MENU                     │
│                      [CONFIRMAR SAÍDA?]                 │
└──────────────────────────────────────────────────────────┘
```

**Máquina de estados da UI:** `GAMEPLAY`, `PAUSE`, `BRIEFING_OVERLAY`, `DOCUMENT_OVERLAY`, `OPTIONS_FROM_PAUSE`, `CONFIRM_EXIT`, `RESULTS`, `CUTSCENE`, `MAIN_MENU`. A tecla de fechar um overlay retorna **ao seu pai**, nunca invoca pausa por engano. Um evento de input é consumido por apenas uma transição. `Esc` em gameplay pausa; `Esc` em documento fecha documento e volta ao estado anterior; `Esc` em Pause retoma; `Esc` em opções volta ao menu pai. Ao voltar de documento, cursor de jogo e estado anterior são restaurados sem segundo fechamento.

## 13.7 Tela de resultados (após cada fase)

```text
                 MISSÃO 03 CONCLUÍDA
     TEMPO        05:42           NOTA        A
     PONTOS       124.350         ÍMPETO MAX  2.2×
     RESGATADOS   6/6             SEGREDOS    2/3
     MORTES       1               CONTINUES   0
     CONQUISTA    [ÍCONE] ATIRADOR DO SAL

     [PRÓXIMA MISSÃO]  [REPETIR]  [MENU]
```

**Nota:** S/A/B/C baseada em pontuação, tempo, resgates e morte com pesos declarados em configuração; não usar nota como trava de história. Animação de resgates entrando na contagem é encurtável em 0,3 s por input.

## 13.8 Tela de continue/game over

- Arcade: contagem regressiva de 10 s, `CONTINUAR (créditos restantes N)` ou `ENCERRAR`; contador para apenas quando tela perde foco? Definir: em browser fora de foco, **pausar contador**, não queimar créditos.
- Campanha: `REINICIAR CHECKPOINT`, `REINICIAR MISSÃO`, `VOLTAR AO MENU`.
- Em coop, decisões em pausa devem pedir confirmação dos dois jogadores para encerrar sessão; game over por falta de reservas tem modal compartilhado.

## 13.9 Opções — Vídeo

- Resolução interna: 426×240 (padrão), 320×180 (desempenho), 640×360 (arte de maior densidade, se existir).
- Janela: tela cheia, janela, sem borda (dependendo de suporte da plataforma).
- Escala: pixels inteiros, ajustar à janela mantendo proporção, suavização opcional.
- Proporção: 16:9 (padrão), 4:3 com câmera ajustada **sem cortar ação importante**.
- VSync: ligado/desligado quando API nativa permitir; em web, respeitar `requestAnimationFrame`.
- Resolução de partículas: alta/média/baixa.
- Intensidade de tremor: 0/50/100%.
- Flash de explosões: reduzido/padrão.
- Filtro visual: nenhum, CRT suave, scanlines leves, pixel-perfect. **Nunca** exigir CRT para boa leitura.
- Motion blur: desligado por padrão. Sem esticar sprites.

## 13.10 Opções — Áudio

- Volume mestre: 0–100%.
- Música: 0–100%; efeitos: 0–100%; vozes: 0–100%; interface: 0–100%; ambiente: 0–100%.
- Saída: estéreo; mono para acessibilidade; dinâmica `NOITE`, `PADRÃO` e `ARCADE`.
- Legendas de todas as vozes e chamadas de rádio.
- Permissão de áudio na web: iniciar música **após interação do usuário** e mostrar ícone de áudio bloqueado com botão `ATIVAR SOM`, conforme políticas do navegador.
- Troca dinâmica de faixa sem estalos, *crossfade* por 0,4–1,2 s dependendo da situação.

## 13.11 Opções — Controles e acessibilidade

- Remapear toda ação, detectar conflitos e oferecer restaurar padrões.
- Alternar `segurar para atirar`/`pressionar repetidamente`, granada em botão dedicado, assistência de mira opcional.
- Inverter vertical **somente** em segmentos de voo onde fizer sentido.
- Legendas com tamanho P/M/G, opacidade de fundo e nome do falante.
- Modo daltônico sem depender de paleta única; marcadores em forma e contorno.
- Redução de flashes, tremor, paralaxe e vibração do controle.
- Feedback de dano com som + marca visual, não depender apenas de vibração.
- Assistência de tempo de reação e escudo opcional (ranking separado).
- Modo monocromático para testar legibilidade de projéteis e HUD.
- Preferência de UI persistida por perfil, inclusive se reiniciar o jogo.

## 13.12 Confirmações e estados especiais

- Se o jogo perdeu foco: pausar simulação automaticamente em single-player; em coop local pausar ambos.
- Se desconectar um gamepad: mostrar overlay simples `CONTROLE 2 DESCONECTADO — CONECTE OU REMAPEIE`; não perder progresso.
- Se falhar carregamento de fase: mensagem de erro específica e `TENTAR NOVAMENTE`, sem iniciar mundo vazio.
- Se save corromper: manter backup rotativo de 2 gerações, criar perfil temporário e não sobrescrever o arquivo original sem confirmação.

---

# 14. DIREÇÃO MUSICAL ORIGINAL — DOCUMENTO DE PRODUÇÃO

## 14.1 Conceito de trilha

**Identidade:** *rock de ação militar retrofuturista com groove brasileiro discreto e fanfarras industriais*. Misturar baixo elétrico articulado, bateria acústica agressiva, percussão metálica, guitarra saturada com riffs curtos, metais sintetizados, órgão e sintetizadores analógicos. Em fases específicas usar elementos regionais **de forma original e contextual**, evitando estereótipos ou citações melódicas.

**Arco musical:** aventureiro no começo → nervoso e mecânico no meio → imponente e distópico perto do final → catártico/esperançoso no encerramento.

**Restrições:** nenhum sample de Metal Slug/SNK, nenhuma melodia copiada, nenhum *soundalike* deliberado de faixa identificável, nenhuma voz/narrador extraída do jogo original. Todas as composições terão licença e autoria registradas no projeto.

## 14.2 Lista completa de faixas originais propostas

| ID de música | Título original | Uso | BPM alvo | Tom / instrumentação / estrutura |
|---|---|---|---:|---|
| MUS_TITLE | **Aço em Movimento** | Tela de título | 116 | Groove de guitarra, baixo, fanfarra de 3 notas **original**, loop de 52 s. |
| MUS_MENU | **Oficina da Madrugada** | Menu principal | 92 | Percussão em chapa, baixo leve, guitarra limpa, 72 s. |
| MUS_PROFILE | **Brigada de Improviso** | Seleção de personagem | 108 | Sintetizador saltitante, bateria leve, 35 s. |
| MUS_BRIEF | **Na Frequência Certa** | Briefing | 84 | Rádio filtrado, pads, ruído de teletipo, 28 s. |
| MUS_M01_MANGUE | **Maré de Aço** | Missão 1, setores abertos | 142 | Rock heroico com percussão tropical sutil, loop A/B. |
| MUS_BOSS_DRAGAO | **Cabo de Guerra** | Chefe 1 | 156 | Bateria pesada, metais em golpes e contrabaixo. |
| MUS_M02_TRILHOS | **Rodas em Brasa** | Missão 2, vilarejo | 148 | Ritmo quase ferroviário, guitarra e prato seco. |
| MUS_M02_TREM | **Sem Freios** | Trem em movimento | 168 | Ostinato de baixo, snare, aumento de camadas. |
| MUS_BOSS_MOLOCH | **Última Estação** | Chefe 2 | 154 | Metais graves e baterias industriais. |
| MUS_M03_SAL | **Areia Condutora** | Missão 3 terrestre | 134 | Guitarra desértica abstrata, sintetizador espacial. |
| MUS_M03_VOO | **Asas de Ferrugem** | Voo da missão 3 | 160 | Linhas rápidas de baixo, bateria quebrada. |
| MUS_BOSS_ALBATROZ | **Altitude de Colisão** | Chefe 3 | 164 | Pedal grave e violão elétrico processado. |
| MUS_M04_GELO | **Neve Sobre Engrenagens** | Serra nevada | 128 | Arpejos frios, toms, sino metálico. |
| MUS_M04_MINA | **Abaixo de Zero** | Túneis | 136 | Pulsos industriais, ruído percussivo, riff grave. |
| MUS_BOSS_BASALTO | **Dupla Pressão** | Chefe 4 | 154 | Dois padrões rítmicos que se unem na fase final. |
| MUS_M05_PORTO | **Cais em Chamas** | Porto | 146 | Riff seco, baixo com síncope, metais ásperos. |
| MUS_M05_TEMPESTADE | **Ferro Contra Maré** | Doca/chuva | 152 | Bateria com camada de chuva sincronizada sem dominar mix. |
| MUS_BOSS_LEVIATA | **Mar de Máquinas** | Chefe 5 | 158 | Baixo distorcido, hits orquestrais sintéticos. |
| MUS_M06_FORNALHA | **A Cidade Sob a Terra** | Usina | 132 | Ostinato mecânico, gongos discretos. |
| MUS_M06_REATOR | **Temperatura Crítica** | Reator | 162 | Polirritmia moderada, sirenes afinadas originais. |
| MUS_BOSS_CORACAO | **Coração de Metal** | Chefe 6 | 164 | Camadas de percussão grave, riff em semicolcheias. |
| MUS_M07_CIDADE | **Vertical de Concreto** | Cidade | 150 | Synthwave industrial original + guitarra. |
| MUS_M07_ASCENSAO | **Acima da Tormenta** | Voo/fortaleza | 158 | Metais aventureiros, bateria veloz. |
| MUS_BOSS_COLOSSO | **Peso do Céu** | Chefe 7 | 164 | Coro sintético sem texto, graves intensos. |
| MUS_M08_HORIZONTE | **Último Sinal** | Última missão | 154 | Recapitulação de motivo original MUS_TITLE em modo menor. |
| MUS_M08_NUCLEO | **Protocolo Infinito** | Núcleo | 176 | Pulsos rápidos e efeitos de máquina afinados. |
| MUS_BOSS_FINAL_3PH | **Tempestade de Dentro** | Chefe final | 170 | Três stems e transições correspondendo a 3 fases. |
| MUS_VICTORY | **Trabalho Feito** | Missão concluída | 120 | Vinheta original de 4–6 s, 1 vez. |
| MUS_FAILURE | **Último Rádio** | Game over | 68 | Vinheta descendente curta, sem copiar `Gravestone`. |
| MUS_END_A | **Amanhecer Sem Torres** | Final A | 96 | Atmosfera com guitarra limpa e metais contidos. |
| MUS_END_B | **Faróis Acesos** | Final B | 104 | Versão expansiva do tema próprio da Brigada. |
| MUS_CREDITS | **A Estrada de Volta** | Créditos | 118 | Faixa integral 3–4 min, temas originais recorrentes. |
| MUS_TRAINING | **Ciclo de Teste** | Treino | 112 | Groove leve para suportar repetição. |
| MUS_GALLERY | **Arquivo de Campanha** | Extras | 88 | Melodia econômica em sintetizador e vibrafone. |

**Total de faixas propostas: 34** (incluindo variantes de fase e vinhetas). Contagem auditar pelo catálogo de IDs no pipeline antes da produção.

## 14.3 Música adaptativa por camadas

Cada música de missão pode ter os seguintes stems alinhados em grade:
- `BASE`: bateria + baixo, tocando sempre.
- `MELODY`: guitarra/metais/synth principal, quando não há voz relevante.
- `COMBAT`: camada rítmica acionada com inimigos ativos.
- `DANGER`: ostinato de pressão quando vida do veículo está baixa, chefe muda de fase ou temporizador entra em estado crítico.
- `AMBIENCE`: drone, vento ou ruídos tonais suaves somente onde não mascaram SFX.

**Transições:** atualizar estado a cada 250 ms, mas efetivar entrada/saída de stems no próximo tempo musical; *crossfade* 300–900 ms; mudanças abruptas só com *stinger* de chefe ou vitória. Não reiniciar o tema toda vez que o narrador fala. Se áudio não suportar stems, usar faixas completas pré-mixadas e *crossfade* simples.

**Mix alvo:** música abaixo de tiros intensos por ducking de 2–4 dB com ataque 40 ms e release 400 ms; chamada narrativa prioritária abaixa música 3–6 dB; ambiente nunca mascara alerta fatal. Limitador no master e mix de dinâmica reduzida acessível.

## 14.4 Brief de produção para cada música

Cada compositor deve entregar: WAV 48 kHz / 24-bit, master estéreo, stems com mesmo ponto inicial, `BPM`, tonalidade, duração do loop, ponto de entrada, cauda, versão sem melodia para diálogo, 1 stinger de introdução, 1 camada de perigo. Formato de distribuição preferencial: OGG/Opus na web e OGG/WAV conforme build nativo.

## 14.5 Sons e dublagem — identidade

**Slogan de voz original:** `BRIGADA, AVANÇAR!` no início de campanha; `OPERAÇÃO CONCLUÍDA!` após missão. **Não** imitar timbre específico do locutor de Metal Slug, nem reutilizar suas falas em inglês como gravação. Vozes PT-BR como primeira língua; inglês por atores ou dublagem própria opcional.

- **Lia:** entusiasmo contido, risada quando encontra item raro, reação em explosão.
- **Bento:** comentários mecânicos breves, “Isso não era pra soltar!” em avaria.
- **Nara:** confirma rotas, comunicação ágil.
- **Rui:** ironia e conhecimento do inimigo.
- **Mara:** briefings com dicção firme, não comanda cada tiro.
- **Baldo:** falas cômicas curtas após falhas de seu equipamento.
- **Ária:** voz filtrada apenas em telas de comando, sem perder inteligibilidade.

## 14.6 Banco de efeitos sonoros — nomes e design

### Armas, impactos e corpos

| Evento | IDs de assets previstos | Camadas de áudio / variação |
|---|---|---|
| Pistola | `sfx_w00_fire_01..04`, `sfx_w00_shell_01..03` | Ataque seco + estalo + estojo, sem sobrecarregar. |
| Carabina | `sfx_w01_loop_start/hold/end` | Três estágios sincronizados com cadência. |
| Espingarda | `sfx_w02_fire_01..03`, `sfx_w02_pump` | Corpo grave, espalhamento curto e recarga. |
| Foguete | `sfx_w03_ignite`, `sfx_w03_fly`, `sfx_w03_boom_01..04` | Ignição + assobio + explosão de 3 camadas. |
| Lança-chamas | `sfx_w04_ignite/loop/stop`, `sfx_fire_crackle` | Gás, chama, cortes suaves. |
| Rifle perfurante | `sfx_w05_fire`, `sfx_w05_pierce` | Estalo forte, impacto metálico estendido. |
| Tambor | `sfx_w06_spinup/loop/spindown` | Motor do tambor separado dos tiros. |
| Arco elétrico | `sfx_w07_fire`, `sfx_w07_jump`, `sfx_w07_hum` | Crepitação e salto para outro inimigo. |
| Granada lançadora | `sfx_w08_launch`, `sfx_w08_bounce`, `sfx_w08_pop` | Estouro com som de metal e ar. |
| Disco | `sfx_w09_throw/air/impact/return` | Serra tonal com variação de pitch moderada. |
| Criogênico | `sfx_w10_emit`, `sfx_w10_freeze`, `sfx_w10_shatter` | Ar comprimido e cristal sem agudos dolorosos. |
| Prisma | `sfx_w11_charge/loop/hit/end` | Oscilador afinado, sem frequências excessivas. |
| Golpe corpo a corpo | `sfx_melee_swing/hit_soft/hit_armor` | Distinção entre tecido e metal. |
| Projétil ricochete | `sfx_hit_metal_01..06` | 6 microvariações para evitar repetição. |
| Projétil em madeira/terra | `sfx_hit_wood_01..04`, `sfx_hit_dirt_01..04` | Dependência do material. |

### Explosões, destruição e ambientes

| Evento | IDs | Camadas |
|---|---|---|
| Granada pequena | `sfx_expl_small_01..05` | Ataque de ar + cauda metálica curta. |
| Explosão média | `sfx_expl_med_01..04` | Grave + destroço + reverberação de cenário. |
| Explosão gigante | `sfx_expl_big_01..03` | Impacto + corpo + detrito + onda distante; limiter. |
| Peça de veículo quebrando | `sfx_machine_break_01..06` | Engrenagem + chapa + pressão. |
| Vidro/placas | `sfx_glass_01..03`, `sfx_sign_01..03` | Brilho agudo curto. |
| Madeira/ponte | `sfx_wood_crack_01..04`, `sfx_bridge_fall` | Rachadura progressiva; queda grave. |
| Água | `sfx_water_splash_01..05`, `sfx_water_wake` | Dinâmico com profundidade, sem loops altos. |
| Neve/vento | `amb_snow_wind_loop`, `foley_snowstep_01..04` | Camadas discretas. |
| Fábrica | `amb_factory_01..04`, `sfx_piston`, `sfx_valve` | Ritmo próprio e posição estéreo. |
| Ferrovia | `amb_train_track_loop`, `sfx_train_horn`, `sfx_switch_rail` | Balanço rítmico, apito não contínuo. |
| Porto | `amb_port_waves`, `amb_seagulls`, `amb_rain`, `sfx_chain` | Condicionado à distância/câmera. |
| Eletricidade | `sfx_electric_warn`, `sfx_electric_arc_01..04` | Telegráfico com prioridade alta. |
| Reator | `amb_reactor_hum`, `sfx_reactor_pulse`, `sfx_reactor_trip` | Automação por fase. |

### Personagens, interface e veículos

- Passos: 4 superfícies × 4 variações; pisada em metal, madeira, terra e neve.
- Heróis: pulo, pouso, dor, morte, vitória, surpresa, entrada em veículo e reação ao resgate (4 vozes por personagem ao menos).
- Inimigos: alerta, atirar, golpe, dor, derrota, comando e pânico; usar variações e distanciação.
- Resgatados: agradecimento breve, corrida, entrada em segurança, presente obtido.
- UI: foco, confirmar, negar, página, aba, abrir/fechar pause, desbloqueio, resgate, objetivo, conquista, vitória e falha.
- Veículos: motor idle/baixa/alta, freio, esteira, rodas em madeira/pedra, torre, disparo pesado, impacto leve/pesado, alarme, eject, explosão.
- Chefes: `boss_intro`, `boss_attack_a/b/c`, `boss_phase`, `boss_weakpoint`, `boss_death_start`, `boss_death_end` próprios para cada um dos oito.

**Meta de produção:** ~180–260 arquivos de SFX brutos, reduzidos a ~100–160 eventos lógicos no runtime; **não** significam 260 tipos únicos de ação. Cada evento sonoro tem limites de simultaneidade e variação.

## 14.7 Regras de runtime de áudio

- Limite de 6 tiros leves concorrentes da mesma classe; quando muitos disparam, combinar vozes e reduzir camadas.
- Distância e panorâmica 2D suaves sem “teleportar” som entre canais.
- Nunca cortar música por causa de splash ou áudio bloqueado; retomar por transição da sessão.
- Pausa congela SFX que dependem de gameplay e baixa música 12 dB; opção de manter fundo musical do pause.
- Ao retomar, realinhar stems com o relógio musical, sem reprodução acelerada.
- Auditar artefatos de *click*, *clipping*, duplicação de voz, atraso perceptível e aceleramento de áudio.

---
# 15. DIREÇÃO DE ARTE, CENÁRIOS, SPRITES E EFEITOS

## 15.1 Estilo visual

- **2D pixel art de alta densidade**, desenho original, com linhas claras, humor em pequenos personagens e superfícies mecânicas ricas.
- Base de composição: 426×240 em proporção 16:9, 60 FPS; recursos exportados em escala lógica padronizada. Se for necessário emular aparência retrô mais compacta, oferecer preset 320×180 sem perder elementos de leitura.
- Sprites de personagem em aproximadamente 40–48 px de altura útil; inimigos e objetos proporcionais; chefes podem ocupar 35–65% da largura de uma arena com enquadramento próprio.
- Contornos de heróis têm saturação e contraste suficientemente distintos de soldados e fundos.
- Paleta por bioma com 3 cores dominantes, 2 acentos e 1 cor de perigo; ainda permitir gradientes pintados no fundo, mantendo textura do pixel art.
- Cada sprite importante terá **sombra de contato**, material reconhecível e pelo menos um movimento secundário: lenço, corrente, antena, fumaça, lona ou reflexo.
- Não usar foto real, sprites ripados nem filtros gerativos que transformem involuntariamente pixel art em borrão.

## 15.2 Paletas de identidade (conceituais)

| Local | Base | Contraste | Alerta dominante | Materiais chave |
|---|---|---|---|---|
| Mangue | verde musgo / cinza azulado | madeira laranja | vermelho coral | água, madeira molhada, aço oxidado |
| Trilhos | terra ocre / azul industrial | amarelo manutenção | laranja quente | trilho, aço, tijolo |
| Sal | cinza pálido / lavanda | vermelho ferrugem | magenta/luz elétrica | cristal, areia, aeronave |
| Serra | azul petróleo / branco | amarelo lâmpada | laranja fogo | neve, rocha, metal frio |
| Porto | azul profundo / verde ardósia | amarelo cais | vermelho alarme | chuva, tinta, água, cabos |
| Fornalha | carvão / marrom-escuro | amarelo incandescente | laranja delimitado | metal quente, vapor |
| Cidade | azul noturno / violeta | rosa neon contido | amarelo pulso | concreto, vidro, cobre |
| Horizonte | azul-negro / roxo tempestade | branco elétrico | vermelho pulsante | plasma abstrato, antena |

## 15.3 Planos de fundo e composição

**Plano P0:** céu e montanhas (scroll 0,08–0,15×). **P1:** arquitetura longínqua (0,25×). **P2:** prédios e árvores de meia distância (0,45×). **P3:** cenário logo atrás do gameplay (0,7×). **P4:** área jogável (1×), colisões e inimigos. **P5:** partículas / fachadas de frente (1,1×) restritas a regiões que não escondem perigo. Todos os planos possuem orçamento de memória e textura.

**Regra:** água e fumaça no primeiro plano podem passar em frente de 15% dos pixels de um inimigo, **nunca** cobrir a origem/destino de projéteis fatais. Chefes têm *mask* de partículas para preservar leitura.

## 15.4 Catálogo de tiles e módulos

- Terreno: chão plano, rampa, borda, plataforma unidirecional, ponte quebrável, elevador, escada, quina, parede destrutível.
- Cobertura: barril, caixa, container, saco de areia, posto de guarda, porta reforçada, árvore, caminhão estacionado, painel.
- Interativos: alavanca, válvula, disjuntor, console, cadeado, botão, mecanismo de roldana, comporta.
- Decorativos: postes, lâmpadas, rádios, placa de rua, bonde de fundo, pescador, bicicleta, boneco propaganda, ferramenta, bandeirola não política.
- Perigos: mina, cabo elétrico, jato de vapor, queda de caixa, piso aquecido, gelo, corrente de água, raio atmosférico.
- Biomas não compartilham só recolor: cada um precisa de família própria de 5–10 objetos visualmente marcantes.

## 15.5 Animações dos personagens — matriz mínima

| Estado | Quadros alvo | Observação |
|---|---:|---|
| Idle | 6–8 | Respiração, arma com pequeno balanço. |
| Idle longo | 10–14 | Ação cômica rara, não ativa durante perigo. |
| Correr | 10–12 | Ciclo fluido, pés plantados sem patinar. |
| Partir / parar | 3–5 cada | Antecipação e recuperação, sem atrasar input. |
| Virar | 2–4 | Torso e arma acompanham direção. |
| Pular subir | 4–6 | Arma continua ativa. |
| Ápice / cair | 3–5 cada | Silhueta de queda clara. |
| Aterrissar | 3–4 | Squash discreto sem bloquear comando. |
| Agachar / levantar | 3–4 cada | Hitbox muda no frame correto. |
| Disparar por direção | 3–4 para 8 dir. | Braços e arma em camadas, evitar 8 sprites inteiros por arma se possível. |
| Granada | 5–7 | Antecipação, liberação no frame explícito. |
| Corpo a corpo | 6–8 | Alcance e janela de hit reproduzíveis. |
| Trocar arma | 4–6 | Arma antiga sai e nova aparece. |
| Receber dano / imunidade | 3–5 | Não perder input mais que o projetado. |
| Morte | 8–14 | Caricata e respeitosa, sem gore extremo. |
| Entrar / sair veículo | 5–8 cada | Alinhamento de posição e câmera. |
| Celebrar missão | 8–12 | 2 variações por personagem. |
| Nadar / emergir (se necessário) | 8–10 | Só onde houver água jogável; não inventar fase subaquática complexa. |

**Regra crítica:** direção de tiro pode ser obtida por *rig* 2D/partes de braço sem duplicar todas as animações; preservar pixel-grid e não interpolar pixel art com borrões. A animação de corrida nunca altera física por deslocamento visual (*root motion* desativado para gameplay 2D).

## 15.6 Animação de inimigos e chefes

- Inimigo comum: idle 4–6 quadros, correr 6–10, mirar 3–5, atirar 2–4, reação 3–5, derrota 6–12.
- Máquinas: corpo principal, torre, rodas/esteiras, exaustor, peças de dano e braços separados; deformações localizadas em peças destruídas.
- Chefes gigantes: sprites em módulos com 20–40 peças relevantes, não sprite sheet gigantesco para cada combinação de dano.
- Explosões: 4 classes (`micro`, `pequena`, `média`, `gigante`) com 6–20 quadros por classe e detritos adicionais; grande explosão combina 2–4 explosões menores defasadas com clarão central.
- Terreno destruído preserva estado visual e colisão em todos os caminhos de checkpoint.

## 15.7 VFX e iluminação

- Flash de disparo dura 1–3 frames (16–50 ms) e é colorido pela arma.
- Fumaça usa folhas de sprite com tempo de vida 0,4–1,5 s, sem simulação volumétrica cara.
- Sparks com física curta; detritos do chefe podem ter trajetória sem colisão depois de afastados da arena.
- Iluminação 2D de área limitada, já pintada nos fundos quando possível; luz dinâmica só para explosões, fogos e holofotes essenciais.
- Chuva e neve usam emissores por região de câmera com culling e versão baixa densidade.
- Sombras de personagens e veículos seguem o terreno com elipse deformada, não textura gigante de shadow map 3D.
- CRT e *bloom* são pós-processamento opcional, com fallback desligado.

## 15.8 Regras de nomenclatura de assets

- Heróis: `chr_lia_idle_01.png`, `chr_lia_run_01.png` etc.
- Inimigos: `en_e01_aim_03.png`.
- Chefes: `boss_01_arm_left_damage_02.png`.
- Veículos: `veh_besouro9_tread_loop.png`.
- Fases: `m01_bg_far_01.png`, `m01_tile_collision.json`.
- Interface: `ui_hud_life_01.png`, `ui_menu_focus.png`.
- Áudio: `mus_m01_mangue_base.ogg`, `sfx_w03_boom_01.ogg`.
- Fontes e licenças devem ser registradas; não redistribuir fonte proprietária sem direito.

---

# 16. CUTSCENES, DIÁLOGOS, HUMOR E NARRATIVA EM GAMEPLAY

## 16.1 Filosofia

A história acompanha a ação; **não** cortar o controle a cada 30 segundos para diálogo. Usar falas de rádio curtas em momentos de deslocamento, quadros de retrato opcionais e *set pieces* com câmera controlável quando seguro.

## 16.2 Cenas essenciais

| ID | Quando | Duração alvo | Conteúdo | Pulável |
|---|---|---:|---|---|
| CS00 | Novo jogo | 35–50 s | Consórcio toma o arquipélago; Brigada recebe ordem. | Sim |
| CS01 | Final da missão 1 | 8–12 s | Recompensa de mapas de carga. | Sim |
| CS02 | Entre 2 e 3 | 15–20 s | Projeto de tempestade é mostrado em transmissão. | Sim |
| CS03 | Final da missão 4 | 12–20 s | Pista sobre Celina. | Sim |
| CS04 | Final da missão 5 | 18–25 s | Ária reinterpreta missão da máquina. | Sim |
| CS05 | Final da missão 6 | 20–30 s | Celina explica os módulos de estabilização. | Sim |
| CS06 | Antes do chefe 7 | 10–16 s | Fortaleza passa diante de prédios. | Sim |
| CS07 | Câmara de Varga | 20–30 s | Varga revela que perdeu controle. | Sim |
| CS08 | Final A | 40–55 s | Núcleo cai, mundo livre e danificado. | Sim |
| CS09 | Final B | 45–60 s | Horizonte é convertido para uso civil. | Sim |

**Falas de amostra originais:**
- Mara: “Brigada, o porto está acordado. Não por muito tempo.”
- Bento: “Aquela peça custou mais que o caminhão inteiro.”
- Lia: “Perfeito. Vamos devolver desmontada.”
- Celina: “Não destruam os quatro reguladores. Eles também podem salvar as ilhas.”
- Varga: “Eu ordenei um bloqueio. A máquina entendeu uma guerra.”

## 16.3 Humor em cenário

Soldado tentando ligar motor que cai, caranguejo roubando parafuso, operário dormindo atrás da barricada, vendedor com placa giratória, robô de limpeza limpando fuligem durante batalha. Eventos com *cooldown* longo e completamente opcionais; não criar humor em cena de tragédia.

---

# 17. PLATAFORMAS, MOTOR E ARQUITETURA DE CÓDIGO

## 17.1 Estratégia recomendada

**Web primeiro, com núcleo portátil e dados desacoplados.** Para um run-and-gun 2D, a web permite iterar combate, pixel art e ritmo rapidamente e publicar no GitHub Pages. Depois, portar ou reimplementar somente a camada de plataforma e renderização para PC nativo sem reescrever design, IA e conteúdo. **A versão WebGL/browser não é executável nativo por si só**; empacotá-la em Electron/Tauri não a torna engine gráfica nativa. Um port nativo real demanda camada de runtime/render/audio/input apropriada e testes de paridade.

**Opção base Web:** TypeScript + PixiJS (renderização 2D via WebGL/WebGPU conforme compatibilidade) ou Phaser 3/4 conforme decisão técnica no início. Não usar Three.js 3D se não houver vantagem concreta para pixel art 2D. Alternativa: Canvas2D no protótipo de colisão para máxima simplicidade, migrando a WebGL quando necessário. Motor selecionado deve ter licença compatível e versão fixada em `package-lock.json`.

**Opção nativa futura:** Rust com wgpu (render Vulkan/Direct3D/Metal via backend disponível), entrada por biblioteca multiplataforma, áudio com mixer dedicado e núcleo de simulação reutilizado via código compartilhado ou porte de lógica. **Não** prometer DirectX e Vulkan simultaneamente sem implementação testada; wgpu faz seleção de backend conforme máquina.

## 17.2 Arquitetura de sistemas

```text
┌────────────────────────────────────────────────────────────────┐
│ APP / PLATFORM                                                 │
│ Boot • Storage • Window • Input • Audio Device • Platform APIs │
├────────────────────────────────────────────────────────────────┤
│ GAME STATES                                                    │
│ MainMenu • Campaign • Arcade • Pause • Briefing • Results      │
├────────────────────────────────────────────────────────────────┤
│ SIMULATION @ 60 HZ                                             │
│ Player • Enemy AI • Bullet Pool • Collision • Vehicles • Boss  │
│ Checkpoints • Damage • Physics • Objectives • Deterministic RNG│
├────────────────────────────────────────────────────────────────┤
│ PRESENTATION                                                   │
│ Sprite Animator • VFX • Camera • HUD • Audio Events • Dialogue  │
├────────────────────────────────────────────────────────────────┤
│ DATA / CONTENT                                                 │
│ Missions • Spawns • Weapons • Vehicles • Localization • Assets  │
└────────────────────────────────────────────────────────────────┘
```

## 17.3 Loops fixos e determinismo

**Regra:** `accumulator += min(realDelta, 0.1); while(accumulator>=1/60 && steps<4){simulate(1/60); accumulator-=1/60}; render(interpolation)`.

- Cap máximo de 4 passos por frame para impedir espiral em PC lento; registrar *slowdown* de simulação, sem acelerar o mundo para recuperar tempo infinito.
- Armas usam relógio de simulação, não `setTimeout` ou tempo de renderização.
- Para testes reprodutíveis, usar seed e sequência de inputs por frame; separar RNG cosmético de RNG de gameplay.
- Tempo de missões baseado em simulação ativa, nunca em áudio ou FPS da tela.
- Entidades removidas liberam projectiles e efeitos sem acumular referências.

## 17.4 Data-driven — exemplo de contrato de arma

```json
{
  "id": "W03",
  "nameKey": "weapon.faísca.name",
  "type": "explosive",
  "damage": 140,
  "fireIntervalMs": 910,
  "ammoOnPickup": 24,
  "maxAmmo": 36,
  "muzzleAsset": "vfx_rocket_launch",
  "projectileId": "rocket_faisca_v1",
  "fireEvent": "sfx_w03_ignite",
  "explosionEvent": "sfx_w03_boom",
  "friendlyFire": false
}
```

## 17.5 Data-driven — exemplo de encontro de fase

```json
{
  "mission": "M01",
  "sector": "M01-S2",
  "startTriggerX": 1480,
  "completion": { "type": "all_required_groups_defeated" },
  "maxActiveEnemies": 7,
  "groups": [
    { "atSecond": 0.5, "enemyType": "E01", "count": 3, "spawnId": "dock_left" },
    { "atSecond": 4.0, "enemyType": "E03", "count": 1, "spawnId": "dock_top" },
    { "atSecond": 6.0, "enemyType": "E02", "count": 2, "spawnId": "dock_right" }
  ],
  "rewards": ["pickup_w01_01", "rescue_fisher_02"],
  "checkpointAfter": true
}
```

Todos os IDs referenciados por fases devem ser validados contra catálogos durante a build. Um encontro sem spawner válido falha em build/teste — não apenas desaparece no runtime.

## 17.6 Estados do player

`IDLE`, `RUN`, `CROUCH`, `JUMP_UP`, `JUMP_APEX`, `FALL`, `LAND`, `AIM`, `FIRE`, `THROW`, `MELEE`, `INTERACT`, `ENTER_VEHICLE`, `VEHICLE`, `EXIT_VEHICLE`, `HURT`, `INVULNERABLE`, `DEAD`, `VICTORY`, `SCRIPTED`.

Usar **camadas de estados**: locomotion separada de arma, para atirar correndo ou pulando sem criar todas as combinações no mesmo enum. Transições têm prioridades documentadas, testes com sequências de inputs, e não podem ficar presos em `HURT`/`ENTER_VEHICLE` se a animação não carregar.

## 17.7 Sistema de colisão

- World tilemap para terreno estático; AABB por entidade e **swept AABB**/raycast para projéteis rápidos.
- Categorias de colisão `PLAYER`, `ENEMY`, `PLAYER_BULLET`, `ENEMY_BULLET`, `TERRAIN`, `ONEWAY`, `VEHICLE`, `TRIGGER`, `PICKUP`, `DECORATION`.
- Bullets com lifetime máximo 3 s; foguetes com timeout 6 s.
- Montar mundo por chunks/sectores; carregar antes de câmera chegar e remover após janela de segurança.
- Resolver contato em ordem determinística; nunca resolver dano duas vezes no mesmo tick de projétil.
- Hitbox separada do frame do sprite, com offsets por estado; editor visual mostra todos os polígonos.

## 17.8 Audio manager

```text
AudioBus
├─ Master
├─ Music
│  ├─ Base
│  ├─ Melody
│  ├─ Combat
│  └─ Danger
├─ Sfx
│  ├─ Weapons
│  ├─ Explosions
│  ├─ Vehicles
│  └─ Environment
├─ Voice
└─ UI
```

- Eventos sonoros são enfileirados por ID e hora de simulação; mixer converte para tempo de áudio sem drift.
- Navegador exige desbloqueio por gesto de usuário; mostrar estado no HUD/menu.
- `pause()` salva estado das camadas e `resume()` restaura; não reiniciar faixa do começo a cada pause.
- Fornecer *fallback* se falhar decode de OGG; menus nunca ficam bloqueados por áudio.

## 17.9 Sistema de saves

- Web: IndexedDB como store principal, exportação/importação JSON assinada por checksum não criptográfico (integridade contra corrupção casual), versão de schema e backup; preferências podem ficar em `localStorage` se necessário.
- PC nativo: dados de usuário em diretório de aplicativo próprio com escrita atômica (`tmp`→`rename`) e backups.
- Schema exemplo: `saveVersion`, `profileId`, `completedMissions`, `unlockedCharacters`, `rescueFlags`, `routeFlags`, `engineeringFlags`, `cosmetics`, `stats`, `options`.
- Migrações explícitas `v1→v2→v3`; nunca descartar save antigo silenciosamente.
- Dados importados são tratados como não confiáveis: validar tipos, tamanhos, limites e IDs.

## 17.10 Localização

- Arquivos `locales/pt-BR.json` e `locales/en-US.json`; nenhum texto fixo em sprites exceto logotipo.
- UI adapta comprimento de strings; suportar dinamicamente 20–35% maior que original.
- Nomes de personagem, ações e legenda mantêm consistência terminológica.
- Todas as falas de rádio têm legenda mesmo se áudio não for fornecido.

## 17.11 Coop local e plano de futuro online

**MVP:** um processo, simulação compartilhada, dois inputs e câmera única; política de dois controles configurados; inimigos e bosses não duplicados indiscriminadamente.

**Futuro online (fora do escopo 1.0):** sessão autoritativa/lockstep com rollback ou sincronização de estado conforme testes de determinismo; NAT traversal, latência, desync, reconexão e abusos exigem projeto separado. GitHub Pages hospeda conteúdo estático: não é servidor de partida autoritativo.

## 17.12 Publicação Web / GitHub Pages

- Build estática com caminho base configurável para `/nome-do-repositorio/`.
- Assets em caminhos relativos ao `base` correto, sem URLs absolutas `/assets/...` quando hospedado em subpasta.
- `index.html`, bundles e manifesto recebem cache versionado; evitar mistura de JS novo com assets antigos.
- Tela de loading apresenta progresso real de arquivos/bytes quando tecnicamente disponível e separa fase de decode.
- `visibilitychange`: pausar offline single-player; evitar perda de áudio e inputs presos na volta.
- Verificar HTTPS, fontes locais, cache, navegador sem WebGL suportado (mensagem clara), e política de autoplay.
- PWA instalável é **fase opcional**; se implementado, service worker não deve manter versões incompatíveis em cache.

## 17.13 Performance e orçamentos

| Indicador | Meta web desktop | Meta PC nativo |
|---|---|---|
| Simulação | 60 ticks/s estáveis | 60 ticks/s estáveis |
| Renderização | 60 FPS alvo | 60 FPS alvo; opções de mais Hz sem acelerar física |
| Frame time médio | ≤16,7 ms em hardware de referência | ≤16,7 ms com resolução de arte adequada |
| *P99* de frame | ≤25 ms em trecho exigente | ≤20 ms em configuração padrão |
| Entidades ativas | Pool limitado por design | Pool limitado por design |
| Partículas | Degradar automaticamente | Escalar qualidade por preset |
| Memória de assets | Orçamento inicial de 250 MB de uso em runtime | Orçamento inicial de 350 MB |
| Downloads | Pacote inicial alvo ≤35 MB + streaming de fases | Instalador modular, meta ≤600 MB |
| Carregamento entre fases | Meta 2–5 s em desktop com cache, variável por rede | Meta ≤3 s em SSD de referência |

As metas são **hipóteses de produção**; definir hardware de referência e testar com build real. Não afirmar que estão atingidas antes de medir.

## 17.14 Organização recomendada de repositório

```text
brasa-de-aco/
├─ README.md
├─ LICENSE
├─ docs/
│  ├─ GDD.md
│  ├─ ART_BIBLE.md
│  ├─ AUDIO_BIBLE.md
│  ├─ TECH_SPEC.md
│  ├─ QA_MATRIX.md
│  ├─ LORE.md
│  └─ RELEASE_NOTES.md
├─ public/
│  └─ assets/
│     ├─ characters/
│     ├─ enemies/
│     ├─ bosses/
│     ├─ vehicles/
│     ├─ tiles/
│     ├─ backgrounds/
│     ├─ vfx/
│     ├─ ui/
│     ├─ music/
│     ├─ sfx/
│     └─ voice/
├─ src/
│  ├─ app/
│  ├─ core/
│  │  ├─ loop/
│  │  ├─ physics/
│  │  ├─ entities/
│  │  ├─ combat/
│  │  ├─ ai/
│  │  ├─ vehicles/
│  │  ├─ bosses/
│  │  ├─ checkpoints/
│  │  └─ rng/
│  ├─ data/
│  ├─ levels/
│  ├─ renderer/
│  ├─ audio/
│  ├─ input/
│  ├─ ui/
│  ├─ save/
│  └─ localization/
├─ tests/
│  ├─ unit/
│  ├─ integration/
│  ├─ replay/
│  ├─ visual/
│  └─ performance/
├─ tools/
│  ├─ atlas/
│  ├─ validators/
│  └─ level-editor/
├─ package.json
└─ vite.config.ts
```

## 17.15 Definição de pronto por feature

Uma feature só é `DONE` se houver: conteúdo implementado; input e áudio conectados; falha/retentativa cobertas; opção de pausa/restauração; teste em 30 e 60 FPS de render (simulação 60 Hz); teste em coop quando pertinente; validação visual; código e dados versionados; nenhum erro de console na execução principal; comportamento documentado.

---

# 18. QA, PLAYTESTS, TELEMETRIA LOCAL E CERTIFICAÇÃO

## 18.1 Matriz de testes funcionais

| ID | Área | Teste de aceitação |
|---|---|---|
| T001 | Boot | Abre menu após limpar cache; sem asset 404. |
| T002 | Menu | Teclado/gamepad percorre todas as opções, sem foco invisível. |
| T003 | Armas | Todos os tipos causam dano correto por tick e respeitam ammo. |
| T004 | Movimento | Pulo, buffer, agachar, diagonais, borda e plataformas móveis. |
| T005 | FPS | 30/60/120 FPS de render produzem mesmo deslocamento por segundo. |
| T006 | Pausa | Abre/fecha em qualquer trecho sem input travado. |
| T007 | Overlays | Fechar documentos, briefing e opções retorna ao pai correto. |
| T008 | Veículo | Entrar/sair em 8 posições; não atravessa colisão. |
| T009 | Destruição | Peça removida não deixa colisão fantasma. |
| T010 | IA | Spawn nunca ocorre em hitbox nem ameaça sem aviso. |
| T011 | Checkpoint | Restaurar armas, vida, resgates, veículo e rota. |
| T012 | Coop | Dois jogadores concluem as 8 missões sem travas. |
| T013 | Boss | 8 chefes têm dano, fase, morte e recompensa reproduzíveis. |
| T014 | Narrativa | Final A sempre acessível, final B quando condições são cumpridas. |
| T015 | Áudio | Música não acelera; voz não reinicia tema; pause retoma posição. |
| T016 | Legendas | Todas as falas possuem texto PT-BR e EN. |
| T017 | Save | Import/export, backup, corrupção e migração. |
| T018 | Publicação | GitHub Pages em subpasta carrega todos os assets sem 404. |
| T019 | Acessibilidade | Flashes reduzidos, vibração desligada, mono e remapeamento. |
| T020 | Ranking | Recordes separados por modo, dificuldade e assistências. |
| T021 | Tela | 16:9/4:3, tela cheia e escala inteira sem deformação. |
| T022 | Controle | Gamepad desconectado/reconectado sem perda de perfil. |
| T023 | Partículas | Orçamento reduz sem esconder projéteis ou criar vazamento de memória. |
| T024 | Segurança de data | JSON de save invalido não trava boot. |

## 18.2 Certificação de missão

Para declarar uma missão **completa**: do menu até resultados em jogo real, realizar 5 execuções solo e 3 coop com logs de falha; concluir com arma básica, com veículo perdido e pelas duas rotas; vencer chefe em 3 dificuldades; carregar após morte em cada checkpoint; testar limite de FPS e áudio. Cada execução deve ter evidência `build/commit`, máquina/navegador, data, seed, caminho, resultado, bugs e reprodução.

## 18.3 Playtests qualitativos

Após cada missão, registrar:
- Qual perigo pareceu injusto e em qual coordenada?
- Teve algum período monótono maior que ~35 s?
- Quantas vezes o jogador morreu sem entender causa?
- Que arma foi ignorada por não ter função clara?
- Qual animação/som mais ajudou a reconhecer ameaça?
- A música escondeu algum sinal importante?
- Os dois jogadores se perderam ou se atrapalharam na câmera?
- O chefe ficou mais difícil por estratégia ou por excesso de efeitos?

## 18.4 Telemetria local de desenvolvimento

Capturar em builds de debug (sem enviar dados pessoais a servidores): `fps_avg`, `frame_p99`, `physics_ms`, `render_ms`, `audio_voices`, `active_entities`, `active_projectiles`, `memory_estimate`, `checkpoint_count`, `deaths_by_cause`, `mission_runtime`, `boss_phase_times` e `stuck_state`.

**Replays determinísticos:** capturar inputs por tick, build hash, seed, versão de dados; comando de teste reproduz a sessão e verifica `stateChecksum` a cada 60 ticks. Replays não substituem teste de áudio/visual e não devem ser anunciados como certificados sem executar.

## 18.5 Gates de lançamento

- **Gate A / Vertical slice:** missão 1 completa de entrada a resultados, 2 armas especiais, 1 tanque, 1 minichefe, 1 chefe, menu e áudio originais, testes T001–T009.
- **Gate B / Alpha:** 8 missões jogáveis, todos os chefes e rotas, saves e coop local sem *placeholder* fatal.
- **Gate C / Beta:** performance, animações completas, 34 cues de música planejados revisados, banco SFX e todas as opções.
- **Gate D / Release candidate:** nenhuma falha P0; lista P1 vazia ou aceita justificadamente; validação 8 missões; final A/B; criação de release e teste pós-publicação.

## 18.6 Classificação de bugs

- **P0:** jogo não abre, save perdido/corrompido por falha do programa, crash, chefe invencível, progresso bloqueado.
- **P1:** controle quebrado, inimigo invisível, veículo fica preso, pausa/menu errado, checkpoint duplicando, áudio acelerado, queda constante abaixo da meta de FPS.
- **P2:** efeito não sincronizado, animação rígida, navegação confusa, pequenas colisões, equilíbrio ruim.
- **P3:** detalhe cosmético, texto desalinhado, segredo pouco óbvio mas funcional.

Priorizar P0 e P1 sempre antes de adicionar fase ou arma nova.

---

# 19. BACKLOG DE IMPLEMENTAÇÃO POR PRIORIDADE

## P0 — fundação / vertical slice (sem prazo fictício)

- [ ] Inicializar projeto, build Vite, Pages e CI com teste de assets.
- [ ] Simulação 60 Hz, render desacoplado e resolução com pixel-perfect.
- [ ] Controles teclado e gamepad, remapeamento básico e estados de UI sem conflito.
- [ ] Player com correr, pular, agachar, tiro de 8 direções, granada, melee.
- [ ] W00/W01/W02/W03 com SFX e balística testados.
- [ ] 6 inimigos básicos E01/E02/E03/E06/E13/E15 e spawner.
- [ ] Destruição, pickup, resgate e score mínimo.
- [ ] Besouro-9 pilotável, dano, ejeção e integração com checkpoints.
- [ ] Missão 1 completa nas duas rotas, MB01 e Dragão-Guindaste.
- [ ] HUD de um jogador, tela de pause, briefing, missão completa, options áudio/vídeo.
- [ ] 4 faixas originais para slice: menu, fase 1, chefe 1 e vitória; SFX mínimos por evento.
- [ ] Save/checkpoint e testes de retomada.
- [ ] Prova de 60 FPS e testes de física em múltiplos refresh rates.

## P1 — conteúdo e campanha

- [ ] Mais 3 personagens, animações e retratos.
- [ ] Completar as 12 armas, 6 explosivos e módulos de escolha.
- [ ] Completar 7 veículos e todos os estados de dano.
- [ ] Implementar 22 arquétipos com IA e telegráficos.
- [ ] Missões 2–8 com bifurcações, ambientes e segredos.
- [ ] 6 minichefes e 8 chefes, fases e mortes animadas.
- [ ] Objetivos de engenharia para final B e epílogos A/B.
- [ ] Coop local completo, HUD de dois jogadores e todos os testes de respawn.
- [ ] Trilha original para toda a campanha + stems dinâmicos.
- [ ] Dublagem/legendas e narrativa por rádio.
- [ ] Telas de seleção, progresso, recordes e galeria.

## P2 — refinamento e certificação

- [ ] Arte final de animação, camadas de paralaxe, humor de fundo.
- [ ] Opções completas de acessibilidade e suporte a controles variados.
- [ ] Otimização de spritesheets, chunks, sons simultâneos, partículas e carregamento.
- [ ] Desafios adicionais, conquistas, treino, jukebox.
- [ ] Replays de teste, relatório de paridade e automação de QA.
- [ ] Versão PC nativa **somente após** estabilidade do núcleo e decisão técnica de runtime.
- [ ] Publicação Web versionada, regressão pós-deploy, changelog.

## P3 — extensões opcionais pós-lançamento

- [ ] Coop online depois de prova de determinismo, rede e reconexão.
- [ ] Editor público de mapas com validação de conteúdo.
- [ ] Modos semanais criados por modificadores offline.
- [ ] Fases bônus adicionais baseadas em novas ilhas, não apenas recolor.
- [ ] PWA offline com atualizações seguras e proteção contra cache antigo.

---

# 20. MATRIZ DE CONTEÚDO E CONTROLE DE ESCOPO

| Sistema | Mínimo jogável (MVP) | Jogo 1.0 | Fora de escopo 1.0 |
|---|---|---|---|
| Missões | 1 inteira | 8 inteiras, 2 rotas/missão | Campanha procedural |
| Personagens | 2 | 4 | Criação completa de personagem |
| Armas | 4 | 12 | 100 armas/evolução RPG |
| Explosivos | 1 | 6 | Crafting volumoso |
| Veículos | 1 | 7 | Customização peça a peça com física complexa |
| Inimigos | 6 | 22 | IA generativa sem controle |
| Chefes | 1 + 1 mini | 8 + 6 mini | Chefes aleatórios |
| Música | 4 faixas | Catálogo original completo | Uso de trilha da SNK |
| SFX | 30 eventos mínimos | 100–160 eventos | Sons extraídos de ROM |
| UI | Menu, opções, pausa, resultado | Todas as telas descritas | Loja online/battle pass |
| Coop | Solitário | 2 jogadores local | 4 jogadores online |
| Plataforma | Browser / Pages | Web PC + empacotamento futuro avaliado | Prometer PC nativo sem port real |
| Save | Checkpoint básico | Perfis, backup, import/export | Cloud save proprietário obrigatório |

## 20.1 Riscos e mitigação

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Escopo de 8 missões inviabiliza qualidade | Alta | Alto | Congelar P0 em slice vertical, não criar novos conteúdos antes de validar. |
| Pixel art muito detalhado fica ilegível | Média | Alto | Teste 1× e 2× com 30 jogadores; contraste em escala real. |
| Música encobre telegráficos | Média | Alto | Mix com prioridade de perigo e ducking por bus. |
| Coop local causa câmera injusta | Média | Alto | Arenas desenhadas para duas posições, tether e testes manuais. |
| Veículos quebram checkpoint | Média | Alto | Estados serializáveis e testes sistemáticos de ejeção. |
| FPS variável altera gameplay | Alta em protótipos | Alto | Física fixed-step, testes 30/60/120 de render. |
| Build funciona localmente, falha no Pages | Média | Alto | Teste automatizado do base path e asset manifest pós-build. |
| Áudio acelera ou fica mudo após pausa | Média | Médio/Alto | Relógio musical único, desbloqueio web e teste de retorno de foco. |
| Uso de material SNK gera problema de direitos | Alto se houver cópia | Alto | Arte, músicas, sons, nomes, história e código originais. |
| Web→PC nativo exige retrabalho | Média | Alto | Núcleo de gameplay isolado, plataforma independente, contrato de dados. |

## 20.2 Custo e prioridade criativa

Qualidade deve ser medida por **sensação de arma + animação + resposta sonora + padrão de chefe**, antes de criar cinquenta cenários. Uma missão visualmente memorável e totalmente jogável demonstra mais avanço que oito protótipos sem colisão, menu e áudio.

---

# 21. CRITÉRIOS DE ACEITAÇÃO DO JOGO COMPLETO

A versão 1.0 só poderá ser chamada de **jogo completo** quando:

- [ ] As oito missões têm começo, exploração de ambas as rotas, clímax, chefe, conclusão e retorno ao menu.
- [ ] Os dois finais estão implementados e podem ser atingidos em campanha válida.
- [ ] Não há sprites provisórios, músicas emprestadas de jogos comerciais ou efeitos sem licença.
- [ ] Todas as armas têm áudio, VFX, hitbox e balanceamento diferente.
- [ ] Todos os veículos têm entrada, saída, dano, destruição e alternativa a pé onde necessário.
- [ ] O jogador pode concluir a campanha com personagem diferente e em coop local.
- [ ] Todas as telas, opções e remapeamentos estão operantes.
- [ ] Desligar redução de movimento é opcional; jogo funciona com flashes reduzidos, legenda e mono.
- [ ] Save e load não causam perda de rota, personagem, inventário nem progresso.
- [ ] Ranking de Arcade funciona sem conflitar com assistência de gameplay.
- [ ] Música nunca acelera junto com FPS; efeitos não duplicam por trocar menu; voz não silencia perigo.
- [ ] Build Web funciona de fato na URL de Pages, sem `404` e sem erros no console em fluxo principal.
- [ ] Testes de regressão, logs e checklist de 8 missões estão registrados como **executados**, não apenas marcados.
- [ ] As cenas finais, créditos, menu de extras e retorno ao jogo funcionam sem travamento.

---

# 22. ORDEM DE EXECUÇÃO RECOMENDADA PARA DESENVOLVIMENTO

1. **Semana funcional 0 (marco, não estimativa cronológica):** protótipo cinza com movimento, tiro, colisão e inimigo. Testar sensação antes de criar arte final.
2. **Marco 1:** player animado, quatro armas, seis inimigos, partículas e áudio mínimo.
3. **Marco 2:** veículo Besouro-9, setor de exploração, um segredo, um resgate e um checkpoint.
4. **Marco 3:** chefe Dragão-Guindaste completo com três padrões e vitória.
5. **Marco 4:** menus, resultados, saves, configurações, acessibilidade e CI em GitHub Pages.
6. **Marco 5:** coop local, duas rotas da primeira missão, certificação da vertical slice.
7. **Marcos 6–12:** produzir as demais missões por ordem de risco de mecânica; não só por cronologia narrativa. Trecho de voo e plataformas móveis precisam de protótipos antecipados.
8. **Marco 13:** oito missões e finais completáveis, alpha funcional.
9. **Marco 14:** arte e áudio final, QA de performance, regressão, beta.
10. **Marco 15:** release Web; considerar runtime Rust nativo somente com dados e testes validados.

**Regra da equipe:** não anunciar “zerado do começo ao fim” sem vídeo/log de uma execução integral, e não anunciar “100% nativo” se ainda depender de browser incorporado.

---

# 23. PRÓXIMOS DOCUMENTOS DERIVADOS (A PARTIR DESTE GDD)

- `ART_BIBLE.md`: guia de personagens, poses, paletas, linhas, chefes, fundos e packs de sprites.
- `AUDIO_BIBLE.md`: briefs musicais detalhados por compasso, convenções de stems, catálogo de gravação e prioridades de mix.
- `LEVEL_M01.md` a `LEVEL_M08.md`: layout de colisão por tela, spawn em coordenadas, scripts e storyboards de cada trecho.
- `TECH_SPEC.md`: eventos, dados, APIs internas e arquitetura de teste.
- `QA_MATRIX.md`: casos de teste automatizados e manuais, evidências e status por build.
- `ROADMAP.md`: milestones, responsáveis, dependências, definição de pronto e histórico por revisão.

---

# 24. FONTES, LICENÇAS E NOTAS DE PRODUÇÃO

## Referências verificadas

1. SNK — história oficial da série (marcos: 1996, 2, X, 3, 4, 5, 6, 7, XX): https://www.snk-corp.co.jp/us/anniversary/metalslug30th/history/
2. SNK — página oficial da edição do primeiro jogo (1996 e contexto): https://www.snk-corp.co.jp/us/games/acaneogeo/metalslug/
3. DATA DISCS + SNK — trilha original de 1996, atribuição e faixas: https://data-discs.com/collections/records/products/data013-metal-slug
4. SNK Wiki / Fandom — lista secundária de chefes: https://metalslug.fandom.com/wiki/Bosses
5. Metal Slug Wiki — elementos do HUD e operações: https://metalslug.fandom.com/wiki/Status_Screen
6. Metal Slug Wiki — sistema de fases e terminologia: https://metalslug.fandom.com/wiki/List_of_Missions
7. Enciclopédia de contexto do jogo de 1996: https://en.wikipedia.org/wiki/Metal_Slug_(1996_video_game)

**Limite de escopo da pesquisa:** nomes de faixas e chefes listados são dados históricos de referência; os valores numéricos do GDD, comportamentos, personagens, mundo, 8 fases, HUD, interfaces, trilha proposta e IA dos inimigos são escolhas de design novas a serem prototipadas. Este documento **não** contém assets e **não** assegura que alguma funcionalidade já existe num jogo executável.

## Direitos autorais / originalidade

*Metal Slug* é propriedade intelectual de seus titulares. Para distribuição pública de **Brasa de Aço**, criar e usar apenas sprites, animações, música, efeitos, vozes, nomes próprios, narrativa e interface originais ou com licença expressa. Evitar logomarca, personagens, melodias, samplers, vozes e arquivos ROM do jogo de referência. O GDD é projeto de inspiração em mecânicas gerais do gênero, não projeto de reprodução fiel de conteúdo protegido.

---

# 25. RESUMO DE PRODUÇÃO

**O que está especificado neste GDD:** história em três atos; oito missões por setores e caminhos alternativos; duas conclusões; quatro heróis; 12 armas; seis explosivos; sete veículos; 22 inimigos; seis minichefes; oito chefes; controles; física; câmera; HUD solo/coop/veículo/chefe; navegação completa de menus; saves; coop; score; acessibilidade; arte e animação; trilha original e SFX; plataforma Web/PC; testes e roadmap.

**O que precisa ser construído de verdade:** código, sprites, cenários, músicas originais, efeitos, vozes, níveis, menus, testes e publicação. O passo de maior retorno é desenvolver e certificar a **Missão 1 completa** como vertical slice antes de expandir o restante.

**Fim do GDD v1.0.**

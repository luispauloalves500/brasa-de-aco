# Missão 2 — Trilho Partido

## Análise antes de implementar
Base: GDD 10.2; catálogos de armas, veículos, inimigos, chefes e música; objetivos de engenharia do Final B. O capítulo pede linguagem industrial/ferroviária própria, não recolor do mangue: vila, depósito, túnel/telhados, cruzamento, três vagões e locomotiva.

M2 usa W03 e não atribui nova arma numerada além do arsenal já existente; por isso não foram inventados tipos extras para inflar conteúdo. Os três novos arquétipos necessários são E04 (atirador), E08 (paraquedista) e E21 (elite com escudo/recuo). A Mula usa minas e rodas, não o obus/salto do Besouro.

## Implementação
- `src/rail.js`: layout, encontros, física de passarela móvel, veículo/minas, tráfego/vapor, engenharia, Baldo e Moloch.
- `src/rail-art.js`: direção visual industrial, tijolos, chaminés, sinalização, trilhos, vagões, sprites próprios de caminhonete, plataforma e locomotiva. Mantém renderer original de M1 como caminho separado.
- `src/cinematics.js`: quadros originais animados no briefing/epílogo, controlados pelo loop principal e respeitando redução de movimento.
- Progressão/menu/continue em `main.js` e `storage.js`, preservando o formato dos saves antigos.
- Três cues originais próprias em WebAudio, com 148/168/154 BPM, além das quatro cues anteriores.

Oito arquétipos usados: recruta, escudeiro, atirador, rádio, paraquedista, torre, Chacal e elite. As rotas têm posições, alturas, recompensas e desafios diferentes. Sete resgates em cada rota e três segredos com pistas visuais. O regulador depende de duas ações: libertar a engenheira da rota A e recuperar o componente. Ordem não importa; score não duplica; flags persistem após morte e continue e no registro da campanha.

Baldo usa plataforma com canhões giratórios, rajada em leque, granada e impacto marcado. Moloch tem canhões opcionais danificáveis, recuperação, três padrões, fases a 70/30%, colapso anunciado de plataformas e vulnerabilidade ampliada da caldeira. Destruir uma peça não bloqueia a vitória com arma básica. Válvulas permitem interromper vapor, mas a última fase reativa ataques telegráficos.

## Adaptações e limites
- O percurso é condensado. Não foi reproduzida a duração 5–7 min do plano de produção.
- O trem mantém jogador/colisão no referencial dos vagões e move cenário/trilhos. Câmera acompanha o jogador, sem empurrão automático para perigo. A passarela inferior é um fallback seguro, não um abismo oculto.
- Só existe um jogador. Segunda vaga da Mula/coop não são anunciados como prontos.
- Objetivo de engenharia fica salvo para capítulos futuros. Não se afirma que Final B já pode ser concluído sem missões 4/6/7/8.
- Animação e áudio são procedurais, não o banco final de sprites/vozes/stems do GDD.

## Correções compartilhadas
A regressão revelou ataques de inimigos que já tinham ficado atrás da câmera. Esses disparos foram bloqueados em ambas as missões. Também foi corrigido o timer de vitória residual ao reiniciar um capítulo. M1 passou novamente pelas duas rotas e cinco cenários Chromium.

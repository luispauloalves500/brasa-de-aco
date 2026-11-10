# BRASA DE AÇO — OPERAÇÃO HORIZONTE

**v0.3.0 · Duas missões jogáveis · Solo · PT-BR / EN**

Run-and-gun 2D original no arquipélago de Aurora Sul. Pixel art procedural, música e efeitos WebAudio originais, sem CDNs, conta ou servidor de partida. Não usa sprites, melodias ou gravações de jogos da SNK.

**Jogar:** https://luispauloalves500.github.io/brasa-de-aco/

![Antes/depois — polimento das duas missões](docs/polish/comparacao.png)

## Polimento visual e funcional — NOVO

- Lia/Bento com paletas, retratos, oito frames de corrida, mira em oito direções e poses de salto, agachar, tiro, granada, melee, dano, morte e vitória.
- Inimigos mais expressivos; novos detalhes de máquinas, esteiras ligadas ao movimento, rodas/pistões, danos e fumaça; chefes com painéis, rebites e partes móveis.
- Mangue ao pôr do sol, água com brilhos/reflexos, árvores e palafitas; ferrovia com vila, tanques de combustível, oficinas de telhado serrilhado, túnel e estação. Paralaxe, aves, névoa, vapor e partículas.
- Explosões em camadas, cápsulas, destroços, hitstop breve, recoil visual, pickups desenhados e recompensas flutuantes; HUD emoldurado e fonte pixel **Brasa Circuit** original/local.
- Mira atualiza sem disparar; câmera antecipa movimento; pressão limitada a dois avisos de inimigos; atiradores miram no ponto anunciado; escudos protegem pela frente, não pelas costas.
- Sons distintos por arma, prioridade de alertas, música com mix/percussão ajustados e redução temporária sob explosões. SFX silenciam na pausa.
- Recuperação automática de backup válido, preservando save corrompido; remapeamento não aceita aliases conflitantes; gamepads em slots não zero, Shift direito e toque remapeado.
- Detalhe de efeitos ajustável, preferência do sistema por movimento reduzido, redução de flashes/hitstop e anúncios de eventos para leitores de tela.

Veja [revisão completa](docs/POLIMENTO.md) e [estudo de animações](docs/polish/personagens.png). Nenhuma missão nova foi adicionada nesta atualização.

## Campanha disponível

### 01 · Fogo no Mangue
Praia, palafitas/canais, oficina, Besouro-9 e cais. Oito resgates, três segredos, Balde de Ferro e Dragão-Guindaste. Lia Torv ou Bento Arcos; pistola M-7, Carabina Cascata, Espingarda Cobalto, Lança-foguetes Faísca, granadas e melee. Todos os sistemas da primeira versão permanecem disponíveis.

### 02 · Trilho Partido
- Vila ferroviária em dois níveis, depósito de combustível, válvulas de vapor e explosões em cadeia.
- **Túnel de manutenção:** escudeiros, elite Cinza, engenheira e console do regulador.
- **Telhados das oficinas:** paraquedistas, atiradores e passarela móvel que carrega o jogador.
- Cruzamento com aviso de tráfego, **Mula de Aço** pilotável com metralhadora/minas e **Sargento Baldo e a Plataforma**.
- Embarque a pé em três vagões, com cenário/trilhos em movimento e colisões estáveis no referencial do trem. Há uma passarela inferior segura.
- **Locomotiva Moloch:** canhões danificáveis, três padrões, fases em 70%/30%, plataformas laterais que cedem com aviso e caldeira exposta/vapor com espaços seguros.
- Sete resgates; segredos na sinalização, relógio e vagão postal.
- Briefing e epílogo ilustrados/animados; novas falas originais PT-BR/EN.
- Três novas cues sintetizadas: **Rodas em Brasa**, **Sem Freios**, **Última Estação**.
- Engenheira + componente preservam o **primeiro regulador (1/4)** exigido pelo futuro Final B. O registro sobrevive a morte, continue e troca de missão. O Final B completo ainda não existe nesta versão.

A vitória na missão 1 libera a missão 2 e oferece acesso direto ao briefing seguinte. **Seleção de Missões** permite repetir capítulos liberados. Recordes válidos da versão anterior migram o desbloqueio da missão 1; checkpoints antigos continuam legíveis.

## Controles

| Ação | Teclado | Gamepad padrão |
|---|---|---|
| Andar | A/D ou ←/→ | Analógico / direcional |
| Mirar alto / diagonal | W/↑ + direção | Analógico / direcional |
| Agachar | S/↓ | Baixo |
| Tiro / melee contextual | J (segurar) | X / □ |
| Pulo variável | K / espaço | A / × |
| Granada; obus no Besouro; minas na Mula | L | B / ○ |
| Trocar arma (inclui pistola) | Q | Y / △ |
| Libertar / válvula / console / veículo | E | RB |
| Esquiva | Shift esquerdo/direito | RT |
| Pausa | Esc / P | Menu |
| Objetivos | Tab | View |

A Mula deve ser deixada com **E** antes dos vagões. Conserve foguetes com Q para enfrentar Moloch. Na rota do túnel, feche a válvula, liberte a engenheira e use E no console adiante. Resgates também podem ser liberados atirando nos cadeados.

Teclado remapeável nas opções; prompts compactos mostram as teclas padrão. Gamepad API com pausa na desconexão; compatibilidade física ainda precisa de playtest. Botões de toque auxiliares existem, mas o alvo de produção é desktop.

## Opções, áudio e saves

Três dificuldades, mira/escudo assistidos, melee opcional, volume mestre/música/SFX, mono, tremor e flashes/movimento reduzidos. Assistências separam os recordes. Música é liberada após interação. O jogo pausa ao perder foco.

Checkpoint e campanha ficam no navegador, sem envio a servidores. Saves têm checksum e backups; save inválido é preservado e, havendo backup válido, ele é recuperado automaticamente. Limpar dados do site remove o progresso. Uma nova operação substitui o checkpoint ativo, mas não rebaixa capítulos já concluídos nem o registro de engenharia. Não há importação/exportação ou cloud save nesta versão.

## Escopo real

As duas missões são adaptações compactas e autorais do GDD, não uma campanha 1.0 certificada. A duração-alvo de 5–7 minutos por capítulo não foi validada em playtest humano; os bots percorrem M2 em aproximadamente 80–90 segundos no cenário de teste. O trem usa referencial relativo com rolagem do cenário, não uma câmera que empurra o jogador para perigos.

**Ainda fora:** missões 3–8, demais armas/veículos/heróis, finais A/B completos, coop local/online (a segunda vaga da Mula não é funcional), dublagem gravada, port nativo, galeria/jukebox, ranking online e certificação de 60 FPS em hardware real.

## Executar e testar

```sh
python3 -m http.server 8089
# abrir http://localhost:8089/
npm test  # Node 20+; 65 testes
```

Nenhum build ou dependência em runtime: o bundle versionado já está no repositório. Pages publica `main`, raiz, com `.nojekyll`. Use servidor estático também em desenvolvimento.

Para alterar fontes: `npm ci && npm run build`. O esbuild é apenas ferramenta de desenvolvimento; nada é buscado em CDN. O bundle único evita misturar módulos antigos e novos no cache do navegador. Nas próximas versões, incremente a versão do `package.json` antes de gerar o bundle. Se a aba já estava aberta antes da atualização, recarregue com **Ctrl+F5**.

```sh
BASE=http://127.0.0.1:8089 CHROME=/caminho/chrome-headless-shell bash tools/browser-qa.sh
BASE=http://127.0.0.1:8089 CHROME=/caminho/chrome-headless-shell bash tools/rail-browser-qa.sh
BASE=http://127.0.0.1:8089 CHROME=/caminho/chrome-headless-shell bash tools/polish-browser-qa.sh
BASE=http://127.0.0.1:8089 CHROME=/caminho/chrome-headless-shell bash tools/perf-browser-qa.sh
```

Os harnesses usam navegadores headless isolados e `?qa=1`, sem sessões pessoais. Bots usam inputs e regras normais; não substituem playtest humano. Leia [análise](ANALISE.md), [GDD original](docs/GDD.md), [implementação M2](docs/MISSAO-02.md), [QA](docs/QA.md), [publicação](docs/PUBLICACAO.md) e [changelog](docs/RELEASE_NOTES.md).

Fonte dos menus: `assets/brasa-circuit.ttf`, original, gerada de `src/pixel-font.js` / `assets/glyphs.json` por `tools/generate-font.py` (fontTools apenas para regeneração). Os sprites são rasterizados em frames locais e mantidos em cache; nenhum asset externo é carregado.

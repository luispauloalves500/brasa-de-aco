# v0.2.0 — Trilho Partido

- Segunda missão autoral com seis trechos, duas rotas, sete resgates e três segredos.
- Atiradores, paraquedistas, elite Cinza; Mula de Aço com minas, Baldo e Locomotiva Moloch.
- Vapor/válvulas, tráfego anunciado, passarela móvel e três vagões no referencial do trem.
- Briefing/epílogo ilustrados, PT-BR/EN e três cues musicais originais.
- Seleção/desbloqueio de missões, encadeamento M1→M2, save compatível e regulador de engenharia persistente.
- Correções: inimigos fora da câmera não atiram; replay não herda timer de vitória.
- 47 testes e dez cenários Chromium em localhost e na URL pública. QA de publicação registrado separadamente.
- Bundle estático versionado e commitado, sem CDN, evitando mistura de módulos no cache. CI verifica que o bundle corresponde às fontes.
- Missões 3–8, coop, finais completos e certificação de hardware seguem fora.

---

# v0.1.0 — Baía Cobre

Primeira versão pública, vertical slice da Missão 1. Núcleo de combate, duas rotas, Lia/Bento, quatro armas, granadas, seis inimigos, Besouro-9, Balde de Ferro e Dragão-Guindaste. Menus, localização, opções, save e narrativa curta. Arte e áudio procedurais originais.

## Adaptações conscientes do GDD
- Canvas2D e JavaScript modular sem dependências em vez de build Vite/Pixi.
- Missão condensada; os seis setores são representados em um percurso contínuo, com variação de rota. Não se promete duração exata do GDD.
- Props e animações são desenhados por partes no Canvas, não os spritesheets finais da matriz de produção.
- Trilha sintetizada original em quatro cues, não o catálogo de 34 gravações/stems planejado.
- Save em localStorage com checksum e backups, não o sistema final de perfis/IndexedDB/importação.
- Recordes locais são persistidos por dificuldade/assistência; galeria e tela dedicada de ranking não fazem parte desta versão.
- Coop e sete missões adicionais foram deliberadamente adiados em favor do núcleo e de uma fase concluível.

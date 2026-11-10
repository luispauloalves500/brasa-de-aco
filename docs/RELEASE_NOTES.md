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

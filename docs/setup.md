# LIVE ARENA™ Core 10.1 — Setup

## GitHub Pages

1. Envia todos os ficheiros para o repositório.
2. Confirma que `index.html` está na raiz.
3. Vai a Settings → Pages.
4. Source: Deploy from branch.
5. Branch: main / root.
6. Save.

## Ficheiros

- `index.html` — versão completa com botões de teste.
- `overlay.html` — versão pública sem botões, ideal para OBS.
- `creator-control.html` — painel privado para enviar eventos.
- `config.json` — configuração base.
- `connector/cloud-connector.js` — placeholder para WebSocket/cloud.

## OBS

Usa:

`overlay.html`

como Browser Source.

## Próxima fase

Core 10.2:
- WebSocket real.
- Persistência de ranking.
- Perfis/guildas.
- Eventos globais sincronizados.

# Aniversário da Isabella

Abra o `index.html` no navegador para ver o site. Para uma experiência melhor durante a edição, use um servidor local simples, como a extensão Live Server do VS Code.

## Personalização

1. Coloque as fotos em assets/images/ e mantenha os nomes foto01.jpg até foto06.jpg, ou altere os caminhos no início de js/script.js.
2. A playlist de vocês já está configurada em siteConfig.playlist e aparece pelo player oficial incorporado do Spotify.
3. No começo de js/script.js, edite:
   - siteConfig.nome
   - siteConfig.dataAniversario
   - siteConfig.carta
   - a lista memories (legendas, datas, descrições e imagens)
   - siteConfig.playlist, se quiser trocar ou reorganizar músicas
   - [SEU NOME] no index.html

Enquanto não houver fotos, o site mostra placeholders e continua navegável. A playlist usa apenas os players e links oficiais do Spotify: o projeto não baixa nem extrai áudio.

## Spotify

O site não usa Client ID, Redirect URI nem login pela API do Spotify. Ao abrir a história, o player oficial aparece com a primeira música selecionada; o visitante aperta play nele.

Navegadores e o próprio Spotify podem bloquear áudio iniciado automaticamente. Não coloque senha, token, QR code ou sessão de uma conta no código: isso exporia a conta e não permite transmitir a música dela para todos os visitantes.

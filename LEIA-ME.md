# Controle de Temperaturas - gerar o APK

## Estrutura do repositório
```
.github/workflows/gerar-apk.yml   (conteúdo do arquivo gerar-apk.yml)
android-overrides/debug.keystore  (chave de assinatura fixa)
assets/icon-only.png
assets/icon-foreground.png
assets/icon-background.png
scripts/android_patch.js
www/index.html                    (o app)
capacitor.config.json
package.json
LEIA-ME.md
```

## Como gerar
1. Envie os arquivos para as pastas acima.
2. No GitHub: Add file > Create new file. No nome, digite `.github/workflows/gerar-apk.yml` e cole o conteúdo do `gerar-apk.yml`. Commit.
3. Aba **Actions** > **Gerar APK** > **Run workflow** (também roda sozinho a cada commit na main).
4. Quando terminar (verde), abra a execução, baixe **Temperaturas-APK** em Artifacts, extraia o zip e instale o `app-debug.apk`.

## Importante
- A chave `debug.keystore` é a mesma em todo APK gerado: novas versões instalam POR CIMA e os dados continuam no aparelho. Nunca troque esse arquivo.
- Dados do Chrome/site NÃO passam sozinhos para o APK: exporte o backup no site e restaure no app (Área do administrador).
- Impressão do relatório usa a impressão do Android (escolha "Salvar como PDF"). Backups e arquivos abrem a tela de compartilhar para salvar.
- Alerta no Telegram: no Cloudflare, `ALLOWED_ORIGIN` deve ter o site e o app separados por vírgula: `https://SEUUSUARIO.github.io,https://localhost`. Depois coloque o endereço do Worker em `ALERTA_URL` dentro de `www/index.html`.
- Se o app mudar de nome/ID (`appId` em capacitor.config.json), o Android o trata como outro app. Não altere.

# KaraokeStudio

Karaoke-app (PWA) som tar bort sången ur vilken låt som helst och lägger texten i takt. Allt körs i webbläsaren och sparas på telefonen.

## Driftsätt gratis på Cloudflare Pages
1. dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git → välj `karaokestudio`.
2. Build command: tomt. Build output directory: `/`. Spara och deploya.

Varje ny push uppdaterar appen automatiskt.

Typsnitt: Archivo och Caveat (SIL Open Font License, se `fonts/`).

Ordlistor i `lex/` (de 40 000 vanligaste orden per språk, för autokorrigering): [FrequencyWords](https://github.com/hermitdave/FrequencyWords) av Hermit Dave, CC BY-SA 4.0, byggda på OpenSubtitles.

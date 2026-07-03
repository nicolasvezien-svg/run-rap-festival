# Installation Wix - Run Rap Festival

## Fichiers

- `index.html` + dossier `assets/` : le jeu HTML5.
- `wix/page-code.js` : code Velo a coller dans la page Wix qui contient le jeu.
- `wix/runRapScores.jsw` : module backend Velo qui ajoute les scores dans la base Wix.
- `wix/score-bridge.html` : code HTML a coller dans un composant HTML Wix si le jeu est charge depuis une URL externe.

## 1. Heberger le jeu

Le jeu utilise `index.html` et le dossier `assets/`. Il faut donc que ces deux elements soient servis ensemble.

Options possibles :

- hebergement externe : ton domaine, serveur, Netlify, GitHub Pages, etc.
- Wix : utilise un composant `Embed HTML` pour charger l'URL du jeu via `wix/score-bridge.html`.

Important pour les assets :

```text
run-rap-festival/
  index.html
  assets/
    toutes les images du jeu
```

Le dossier `assets` doit rester au meme niveau que `index.html`, car le jeu charge les fichiers avec des chemins comme `assets/player_idle_0.png`.

Si tu heberges le jeu ailleurs que Wix, envoie donc tout le dossier `rap-flappy-festival` ou au minimum `index.html` + `assets/`.

URL attendue :

```text
https://ton-domaine.com/run-rap-festival/index.html
```

## 2. Creer la collection Wix

Dans Wix, active Velo puis cree une collection CMS avec cet ID exact :

```text
RunRapScores
```

Champs a creer :

| Field ID | Type |
| --- | --- |
| `firstName` | Texte |
| `email` | Email ou Texte |
| `score` | Nombre |

Le champ `title` existe par defaut dans les collections Wix. Le backend le remplit automatiquement avec `prenom - score`, mais tu n'as pas besoin de le creer.

Les permissions de la collection peuvent rester strictes, car l'insertion passe par le backend avec `suppressAuth`.

## 3. Ajouter le module backend

Dans Velo :

1. Ouvre `Backend`.
2. Cree un fichier Web Module nomme :

```text
runRapScores.jsw
```

3. Copie le contenu de `wix/runRapScores.jsw`.

## 4. Ajouter le jeu sur la page

Sur ta page Wix :

1. Ajoute un composant `Embed HTML`.
2. Donne-lui l'ID :

```text
rapGameFrame
```

3. Colle le contenu de `wix/score-bridge.html`.
4. Remplace `GAME_URL` par l'URL publique de ton `index.html`.

## 5. Ajouter le code de page

Dans le code Velo de la page qui contient le composant HTML :

1. Copie le contenu de `wix/page-code.js`.
2. Verifie que l'ID du composant est bien `#rapGameFrame`.
3. Publie le site.

## Fonctionnement

Quand un joueur valide son score, le jeu envoie :

- prenom
- email
- score

La page Wix recoit le message, appelle le backend, puis ajoute l'entree dans la collection `RunRapScores`.

# 📄 Fiche de spécification — `PasscodeInput`

---

## 1. 🔎 Objectif du composant

- **Nom** : `PasscodeInput`
- **Rôle** : Saisie de mot de passe court sous forme de code (ex : code PIN)
- **Utilisation prévue** : Connexion sécurisée, déverrouillage, écrans de validation sensible

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Autonome

- **Composants internes utilisés** :
    - `Input`
    - `Box` / `Stack` / `Text` (selon la disposition visuelle)

- **Slots / Children autorisés** :
    - [x] Non

---

## 3. ⚙️ Props attendues

| Prop         | Type                 | Requis | Par défaut | Description                                                     |
|--------------|----------------------|--------|------------|-----------------------------------------------------------------|
| `length`     | `number`             | ✅     | -          | Longueur du passcode à saisir                                   |
| `onChange`   | `(code: string) => void` | ✅ | -      | Callback appelé à chaque modification                           |
| `onComplete` | `(code: string) => void` | ❌ | -      | Appelé lorsque tous les caractères sont saisis                  |

---

## 4. 🎨 Variantes / États

- **États gérés** :
    - [x] `empty`
    - [x] `error`
    - [x] `filled`
    - [x] `valid`

---

## 5. 🧪 Comportements & Interactions

- Focus automatique
- Navigation par `Tab` ou clavier
- Retour arrière (`Backspace`) pour effacer et reculer
- Collage complet autorisé

---

## 6. Accessibilité

- Compatible avec lecteur d’écran
- Champs numérotés avec `aria-label`
- Support `aria-invalid`
- Support complet clavier

---

## 7. 🧩 Présets ou composants dérivés

---

## 8. 🧪 Tests attendus

- [x] Navigation clavier et backspace
- [x] Masquage visuel (`masked`)
- [x] Saisie numérique ou alpha-numérique
- [x] Accessibilité
- [x] Focus et ordre logique

---

## 9. 📐 Exemple(s) d’utilisation

```jsx
<PasscodeInput
  length={6}
  onChange={(val) => setCode(val)}
  onComplete={(val) => submit(val)}
/>
```
---

## 10. Lien Utile
[Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=16615-2109&m=dev)

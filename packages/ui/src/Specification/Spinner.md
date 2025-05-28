# 📄 Fiche de spécification — `Loading` / `Spinner`

---

## 1. 🔎 Objectif du composant

- **Nom** : `Loading` ou `Spinner`
- **Rôle** : Afficher un indicateur visuel que du contenu est en cours de chargement.
- **Utilisation prévue** :
    - Chargements très courts (moins de 2 secondes)
    - Boutons avec actions asynchrones
    - Affichage temporaire dans une carte, une modale ou une section de page

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Autonome (spinner seul)

- **Structure interne** :
    - Élément visuel animé 
    - Texte optionnel ("Chargement…", "Please wait", etc.)

- **Slots / Children autorisés** :

---

## 3. ⚙️ Props attendues

| Prop         | Type                                 | Requis | Par défaut   | Description                                       |
|--------------|--------------------------------------|--------|--------------|---------------------------------------------------|
| `size`       | `string`                             | ❌     | `"md"`       | Taille du loader                                 |
| `variant`    | `"string"`                           | ❌     | `"spinner"`  | Style d’animation utilisé                        |
| `label`      | `string`                             | ❌     | —            | Texte alternatif accompagnant le visuel          |

---

## 4. 🎨 Variantes / États

- **Taille (`size`)** :
    -  `sm`, `md`, `lg`, `xl`
  
- **Style (`variant`)** :
    - `line` : rotation d’une line avec tracker
    - `default` : rotation d'une ligne sans tracker
    - `dot` : points animés en séquence

---

## 5. 🧪 Comportements & Interactions

- **Accessibilité** :
    - `role="status"`
    - `aria-live="polite"`
    - `aria-label` ou `label` visible pour lecteur d’écran

- **Comportement typique** :
    - L’animation tourne jusqu’à disparition du loader
    - Peut être déclenché par état `isLoading` d’un parent

---

## 6. 🧩 Présets ou composants dérivés

- `ButtonLoader` : loader intégré à un bouton

---

## 7. 🧪 Tests attendus

- [x] Le loader apparaît selon le bon état
- [x] L’animation tourne correctement
- [x] Accessibilité ARIA respectée
- [x] Taille et style réactifs

---

## 8. 📐 Exemple(s) d’utilisation

```jsx
// Loader simple
<Loading />

// Loader avec texte
<Loading label="Chargement en cours…" />

// Loader variant 'dots'
<Loading variant="dot" size="sm" />
```

## 9. Liens utile
- [Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=1172-32&p=f&m=dev)
# 📄 Fiche de spécification — `Pagination`

---

## 1. 🔎 Objectif du composant

- **Nom** : `Pagination`
- **Rôle** : Permettre la navigation entre différentes pages d’un ensemble de données
- **Utilisation prévue** : Tableaux de données, listes d’articles, résultats de recherche

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Autonome

- **Composants internes utilisés** :
    - `Button`
    - `Text`

- **Slots / Children autorisés** :
    - [x] Non

---

## 3. ⚙️ Props attendues

| Prop           | Type       | Requis | Par défaut | Description                                                                              |
|----------------|------------|--------|------------|------------------------------------------------------------------------------------------|
| `page`         | `number`   | ✅     | -          | Page actuellement sélectionnée                                                           |
| `totalPages`   | `number`   | ✅     | -          | Nombre total de pages                                                                    |
| `onPageChange` | `function` | ✅     | -          | Callback quand une page est sélectionnée                                                 |
| `disabled`     | `boolean`  | ❌     | `false`    | Désactive toute la pagination                                                            |
| `padded`       | `boolean`  | ❌     | `false`    | gère la présence ou nom du padding horizontal                                            |
| `variant`      | `string`   | ❌     | ``         | Détermine  le rendu                                                                      |
| `align`        | `string`   | ❌     | `center`   | Détermine  comment les boutons et les pages sont aligné                                  |
| `shape`        | `string`   | ❌     | `squar`    | Détermine  la forme du background pour la page active (uniquement pour variant numbered) |

---

## 4. 🎨 Variantes / États

- **Variantes visuelles** :
    - `numbered`
    - `infos` (page x of y)
    - `goup`

- **États gérés** :
    - [x] `active`
    - [x] `hover`
    - [x] `focus`
    - [x] `disabled`

---

## 5. 🧪 Comportements & Interactions

- **Clic** : Sélectionne une page, déclenche `onPageChange`
- **Transitions / Animations** :
    - Animation facultative lors du changement de page

---

## 6. Accessibilité

- `role="navigation"` avec `aria-label="Pagination"`
- Chaque bouton doit avoir un `aria-label` descriptif
- `aria-current="page"` pour la page active
- Navigation clavier complète (tab, enter, etc.)

---

## 7. 🧩 Présets ou composants dérivés

---

## 8. 🧪 Tests attendus

- [x] Rendu correct avec différentes tailles de pagination
- [x] Navigation entre les pages avec `onPageChange`
- [ ] Test accessibilité (`aria-current`, `navigation`, clavier)
- [ ] Cas limite (page = 1, page = totalPages)

---

## 9. 📐 Exemple(s) d’utilisation

```jsx
<Pagination
  page={3}
  totalPages={10}
  onPageChange={(page) => setPage(page)}
  padded
  variant={"group"}
  align={"center"}
/>
```
---

## 10. Liens Utile
[Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=1547-265028&m=dev)


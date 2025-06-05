# 📄 Fiche de spécification — `EmptyState`

---

## 1. 🔎 Objectif du composant

- **Nom** : `EmptyState`
- **Rôle** : Informer l’utilisateur qu’il n’y a pas de données à afficher et proposer des actions correctives
- **Utilisation prévue** : Liste vide, recherche sans résultat, tableau vide, onboarding, pages d’erreur douce (ex : pas encore de contenu)

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Autonome
    - [x] Composable avec d’autres composants

- **Composants internes utilisés** :
    - `Icon` / `Illustration`
    - `Text`
    - `Button`

- **Slots / Children autorisés** :
    - [x] Oui

---

## 3. ⚙️ Props attendues

| Prop          | Type          | Requis | Par défaut | Description                      |
|---------------|---------------|--------|------------|----------------------------------|
| `title`       | `string`      | ✅     | -          | Titre principal affiché          |
| `description` | `string`      | ❌     | `""`       | Texte descriptif secondaire      |
| `icon`        | `ReactNode`   | ❌     | `null`     | Icône ou illustration à afficher |
| `actions`     | `ReactNode`   | ❌     | `null`     | Actions principales              |
| `variant`     | `string`      | ❌     | `default`  | définis le variant utilisé       |

---

## 4. 🎨 Variantes / États

- **Variantes visuelles (`variant`)** :
    - `default`
    - `illustration`
    - `iconWithBg`
    - `iconWithoutBg`

---

## 5. 🧪 Comportements & Interactions

- **Clic** : Interaction possible via le bouton `action`
- **Transitions / Animations** :
    - Optionnel (fade-in au chargement, animation d’illustration)

---

## 6. Accessibilité

- Titre avec balise `h2` ou `aria-labelledby
- Bouton focusable au clavier
- Utilisation de rôles explicites (`region`, `status`, etc.)

---

## 7. 🧩 Présets ou composants dérivés

- **Composants dérivés** :
    - `EmptySearchResult`
    - `EmptyTable`
    - `EmptyOnboarding`
- **Créés à partir de** : `EmptyState` avec différentes props

---

## 8. 🧪 Tests attendus

- [x] Test unitaire des props critiques (`title`, `action`)
- [x] Test de rendu (snapshot)
- [x] Test accessibilité (structure, focus)
- [x] Test visuel si présence d’illustration

---

## 9. 📐 Exemple(s) d’utilisation

```jsx
<EmptyState
  title="Aucun résultat trouvé"
  description="Essayez de modifier votre recherche ou de réinitialiser les filtres."
  icon={<SearchIcon size={48} />}
  action={<Button onClick={handleReset}>Réinitialiser</Button>}
/>

<EmptyState
  title="Pas encore de projet"
  description="Commencez par créer votre premier projet."
  action={<Button onClick={handleCreate}>Créer un projet</Button>}
/>
```
---
## 10. Liens utile
[Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=4980-382743&m=dev)
# 📄 Fiche de spécification — `Dropdown`

---

## 1. 🔎 Objectif du composant

- **Nom** : `Dropdown`,
- **Rôle** : Afficher un ensemble d’actions ou d’options dans un menu contextuel.
- **Utilisation prévue** :
  - Bouton "plus d’options"
  - Sélecteurs d’action sur des listes ou des cartes

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
  - [x] Composable 
  - [x] Autonome

- **Structure interne recommandée** :
  - `<Dropdown>` : conteneur principal
  - `<DropdownTrigger>` : élément déclencheur (souvent un bouton ou une icône)
  - `<DropdownContent>` : panneau affiché
  - `<DropdownItem>` : une action dans le menu
  - `<DropdownSeparator>` : séparateur visuel
  - `<DropdownLabel>` : titre de section dans le menu
  - `<DropdownGroup>` : regroupement logique d’items

- **Slots / Children autorisés** :
- `<DropdownTrigger>` 
  - `<DropdownContent>` 
  - `<DropdownItem>` 
  - `<DropdownSeparator>` 
  - `<DropdownLabel>` 
  - `<DropdownGroup>`

---

## 3. ⚙️ Props attendues

### `DropdownMenu`

| Prop      | Type                | Requis | Par défaut | Description                                     |
|-----------|---------------------|--------|------------|-------------------------------------------------|
| `open`    | `boolean`           | ❌     | —          | Mode contrôlé                                   |
| `onOpenChange` | `(boolean) => void` | ❌ | —          | Callback à l’ouverture/fermeture                |
| `align`   | `string`            | ❌ | `end`        | Comment le drop down s'alligne avec son trigger |

---

## 4. 🎨 Variantes / États

- **Alignement** :
  - `start`, `center`, `end`

- **État du trigger** :
  - `hover`
  - `focused`
  - `disabled`
  - `active`

- **État d’un item** :
  - `hover`
  - `focused`
  - `disabled`
  - `active`

---

## 5. 🧪 Comportements & Interactions

- S’ouvre au clic sur le `DropdownTrigger`
- Se ferme automatiquement après sélection
- Ferme avec `Esc` ou clic en dehors
- Navigation clavier :
  - `ArrowUp` / `ArrowDown` pour se déplacer
  - `Enter` / `Space` pour sélectionner
  - `Esc` pour fermer

---

## 6. Accessibilité

- Le bouton de déclenchement doit être un élément interactif (`<button>`) avec :
  - `aria-haspopup="menu"` pour indiquer qu’un menu va s’ouvrir
  - `aria-expanded="true/false"` pour refléter l’état ouvert/fermé
  - `aria-controls="id-menu"` pour relier le bouton au menu
- Le menu déroulant lui-même doit avoir :
  - `role="menu"` si c’est une liste d’actions
  - `id` correspondant à `aria-controls`
- Chaque élément dans le menu doit avoir :
  - `role="menuitem"` ou `menuitemradio` / `menuitemcheckbox` selon le comportement
- Prise en charge complète de la navigation clavier :
  - `Tab` pour entrer/sortir
  - `ArrowDown` / `ArrowUp` pour naviguer entre les items
  - `Enter` ou `Space` pour activer un item
  - `Escape` pour fermer le menu et revenir au bouton
- Focus géré manuellement à l’ouverture du menu (focus sur le 1er item)
- Indication claire du focus visuel pour chaque item
- Si le menu contient des sections ou groupes :
  - Utilisation de `role="group"` avec `aria-label` ou `aria-labelledby`

---

## 7. 🧩 Présets ou composants dérivés

---

## 8. 🧪 Tests attendus

- [x] Ouverture / fermeture correcte
- [x] Navigation clavier
- [x] Focus rétabli après fermeture
- [x] Items désactivés non sélectionnables
- [x] Props `side`, `align`, `offset` fonctionnelles

---

## 9. 📐 Exemple(s) d’utilisation

```tsx
<DropdownMenu>
  <DropdownTrigger asChild>
    <Button variant="outline">Options</Button>
  </DropdownTrigger>
  <DropdownContent side="bottom" align="start">
    <DropdownItem onSelect={() => alert("Éditer")}>
      ✏️ Éditer
    </DropdownItem>
    <DropdownItem onSelect={() => alert("Supprimer")} disabled>
      🗑️ Supprimer
    </DropdownItem>
    <DropdownSeparator />
    <DropdownItem onSelect={() => alert("Partager")}>
      📤 Partager
    </DropdownItem>
  </DropdownContent>
</DropdownMenu>
```
---

## 10. Liens utile
- [Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=1538-269977&m=dev)

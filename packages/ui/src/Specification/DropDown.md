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

### Accessibilité

- `role="menu"` sur `<DropdownContent>`
- `role="menuitem"` sur chaque `<DropdownItem>`
- Support ARIA : `aria-haspopup`, `aria-expanded`, focus management

---

## 6. 🧩 Présets ou composants dérivés

---

## 7. 🧪 Tests attendus

- [x] Ouverture / fermeture correcte
- [x] Navigation clavier
- [x] Focus rétabli après fermeture
- [x] Items désactivés non sélectionnables
- [x] Props `side`, `align`, `offset` fonctionnelles

---

## 8. 📐 Exemple(s) d’utilisation

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

## 9. Liens utile
- [Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=1538-269977&m=dev)

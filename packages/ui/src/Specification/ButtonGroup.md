# 📄 Fiche de spécification — `ButtonGroup`

---

## 1. 🔎 Objectif du composant

- **Nom** : `ButtonGroup`
- **Rôle** : Grouper visuellement et fonctionnellement plusieurs boutons.
- **Utilisation prévue** :
    - Barres d’actions (ex : édition, outils)
    - Navigation locale (ex : filtres de dates, mini-onglets)
    - Actions contextuelles regroupées

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Conteneur composable (wrappe plusieurs `<Button />`)
    - [x] Peut être utilisé dans des composants plus larges (`Toolbar`, `Card`, `Modal`)

- **Composants internes utilisés** :
    - `Button` (composants enfants)

- **Slots / Children autorisés** :
    - [x] Oui — via `children`
    - Les enfants doivent être exclusivement des `Button`, ou composants compatibles

---

## 3. ⚙️ Props attendues

| Prop         | Type                  | Requis | Par défaut | Description                                                              |
|--------------|-----------------------|--------|------------|--------------------------------------------------------------------------|
| `orientation`| `"horizontal"`\|`"vertical"` | ❌     | `horizontal` | Direction du groupe de boutons                                           |
| `selected`   | `string` \| `null`    | ❌     | `null`     | Identifiant du bouton sélectionné (utile pour les mini-onglets)          |
| `onSelect`   | `(value: string) => void` | ❌     | -          | Callback lors d’un clic dans un mode segmenté ou toggle                  |


---

## 4. 🎨 Variantes / États

- **Orientation** :
    - `horizontal` (par défaut)
    - `vertical`

- **Modes spéciaux** :
    - **Selectable** (un seul bouton actif à la fois, ex : onglets)

- **États gérés** :
    - [x] `focus` (groupé ou individuel)
    - [x] `disabled` (tout ou certains boutons)
    - [x] `selected` (mode toggle / tab)

---

## 5. 🧪 Comportements & Interactions

- **Clic** :
    - Peut déclencher l’action de chaque bouton
    - Peut aussi sélectionner (mode `toggle` ou `tabs`) avec `onSelect`

- **Accessibilité** :
    - Utiliser `role="group"` ou `role="tablist"` selon le contexte
    - Si `selected`, appliquer `aria-pressed`, `aria-selected`, ou `aria-current` sur les boutons

- **Keyboard navigation (optionnel)** :
    - Flèches gauche/droite pour naviguer entre les boutons
    - Entrée/Espace pour activer

---

## 6. 🧩 Présets ou composants dérivés

- **Dérivés** :
    - `DateRangeToggleGroup`
    - `TabButtonGroup`

- **Créés via** :
    - `ButtonGroup` + `Button` + `onSelect` personnalisé

---

## 7. 🧪 Tests attendus

- [x] Rendu horizontal / vertical correct
- [x] Comportement de sélection (avec `selected` / `onSelect`)
- [x] Support de `disabled` (global ou par bouton)
- [ ] Tests d’accessibilité (avec `axe` ou similar)

---

## 8. 📐 Exemple(s) d’utilisation

```jsx
<ButtonGroup selected="week" onSelect={setSelected}>
  <Button value="day">Jour</Button>
  <Button value="week">Semaine</Button>
  <Button value="month">Mois</Button>
</ButtonGroup>

<ButtonGroup orientation="vertical">
  <Button icon={<BoldIcon />} />
  <Button icon={<ItalicIcon />} />
  <Button icon={<UnderlineIcon />} />
</ButtonGroup>
```

## 9 Liens utile
- [Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=16427-545794&m=dev)


# 📄 Fiche de spécification — `Table`

---

## 1. 🔎 Objectif du composant

- **Nom** : `Table`
- **Rôle** : Afficher des données structurées sous forme de tableau
- **Utilisation prévue** : Tableaux de données, listes d’éléments, rapports, statistiques

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Autonome
    - [x] Composable avec d’autres composants

- **Composants internes utilisés** :
    - `Checkbox`
    - `Icon`
    - `Text`
    - `Button`

- **Slots / Children autorisés** :
    - [ ] Oui
    - [x] Non
    - **Détail** : Génération dynamique à partir de données

---

## 3. ⚙️ Props attendues

| Prop              | Type              | Requis | Par défaut     | Description                                              |
|-------------------|-------------------|--------|----------------|----------------------------------------------------------|
| `data`            | `array`           | ✅     | -              | Données à afficher                                       |
| `columns`         | `array`           | ✅     | -              | Configuration des colonnes (header, accessors, etc.)     |
| `selectable`      | `boolean`         | ❌     | `false`        | Active les cases à cocher pour sélection multiple        |
| `onRowSelect`     | `function`        | ❌     | `null`         | Callback lors de la sélection de lignes                  |
| `striped`         | `boolean`         | ❌     | `false`        | Active l’alternance de couleurs sur les lignes           |
| `onRowClick`      | `function`        | ❌     | `null`         | Callback lors du clic sur une ligne                      |
| `rowKey`          | `string | function` | ✅    | -              | Clé unique pour chaque ligne (id ou fonction de mappage) |
| `sortable`        | `boolean`         | ❌     | `false`        | Active le tri des colonnes                               |

---

## 4. 🎨 Variantes / États

- **Variantes visuelles** :
    - `striped` : une ligne sur deux avec une couleur de fond

- **États gérés** :
    - [x] `hover`
    - [x] `focus` (sur les éléments interactifs)
    - [x] `selected`
    - [x] `empty`
    - [x] `loading`

---

## 5. 🧪 Comportements & Interactions

- **Clic** : Ligne cliquable via `onRowClick`
- **Sélection multiple** : via checkbox si `selectable` activé
- **Tri** : optionnel par colonne si `sortable` activé
- **Transitions / Animations** : transition douce pour sélection ou hover

---

## 6. Accessibilité

- `role="table"` ou `role="grid"` selon l’interactivité
- `aria-selected` sur les lignes sélectionnées
- `aria-sort` sur les en-têtes triables
- Navigation clavier (tab, flèches, sélection)
- role="columnheader" pour les en-têtes de colonnes 
- role="rowheader" pour les en-têtes de ligne (si besoin)
- role="gridcell" ou role="cell" pour les cellules classiques
- Utiliser les attributs aria-labelledby ou aria-describedby pour lier chaque cellule à ses en-têtes (colonne et/ou ligne).
- ajouter une légende avec aria-describedby
- Si le tableau est triable, ajouter aria-sort sur les en-têtes (ascending, descending, none)


---

## 7. 🧩 Présets ou composants dérivés

- **Composants dérivés** :

---

## 8. 🧪 Tests attendus

- [x] Test unitaire des props critiques (`data`, `columns`)
- [x] Test d’interaction (sélection, tri, clic)
- [x] Test accessibilité (aria-roles, navigation)

---

## 9. 📐 Exemple(s) d’utilisation

```jsx
<Table
  data={users}
  columns={[
    { header: "Nom", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Rôle", accessor: "role" },
  ]}
  selectable
  striped
  onRowSelect={(rows) => console.log("Lignes sélectionnées", rows)}
  rowKey="id"
/>

```
--- 
## 10. Liens Utile
[Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=1135-1960&m=dev)

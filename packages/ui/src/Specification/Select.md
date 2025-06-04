# 📄 Fiche de spécification — `Select`

---

## 1. 🔎 Objectif du composant

- **Nom** : `Select`
- **Rôle** : Permettre à l’utilisateur de sélectionner une option (ou plusieurs) parmi une liste.
- **Utilisation prévue** : Formulaires, filtres, recherche avec suggestion.

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Autonome

- **Composants internes utilisés** :
    - `Input` (pour la version searchable)
    - `Listbox`, `OptionItem`
    - `Icon` (chevron, clear, etc.)

- **Slots / Children autorisés** :

---

## 3. ⚙️ Props attendues

| Prop          | Type                                 | Requis | Par défaut | Description                                                            |
|---------------|--------------------------------------|--------|------------|------------------------------------------------------------------------|
| `options`     | `{ label: string, value: string }[]` | ✅ | -          | Liste des options disponibles                                          |
| `value`       | `string` ou `string[]`               | ✅     | -          | Valeur sélectionnée                                                    |
| `onChange`    | `(value: string                      | string[]) => void` | ✅          | -                                                                      | Callback à la sélection                                     |
| `variant`     | `string`                             | ❌     | `default`  | Permet de choisir le variant                                           |
| `placeholder` | `string`                             | ❌     | `""`       | Placeholder affiché quand aucune valeur n’est sélectionnée             |
| `disabled`    | `boolean`                            | ❌     | `false`    | Désactive le select                                                    |
| `clearable`   | `boolean`                            | ❌     | `false`    | Permet de réinitialiser la sélection                                   |
| `size`        | `sm\|md`                             | ❌     | `sm`       | détermine la taille                                                    |
| `required`    | `boolean`                            | ❌     | `true`     | affichage d'un atérix ou non                                           |
| `helper`      | `string`                             | ❌     | ``         | affichage d'une icone help avec un tooltip ayant comme contenue helper |
| `hint`        | `string`                             | ❌     | ``         | affiche l'hint en dessous du select                                    |
| `label`       | `string`                             | ❌     | ``         | Label                                                                  |


---

## 4. 🎨 Variantes / États

- **variant** : 
  - `default`
  - `icone`
  - `avatar`
  - `dot`
  - `search`
  - `tag` (qui déterminerai si choix multiple ou non)

- **États gérés** :
    - [x] `hover`
    - [x] `focus`
    - [x] `disabled`
    - [x] `open`
    - [x] `selected`
    - [x] `error`

---

## 5. 🧪 Comportements & Interactions

- **Click sur le champ** : Ouvre la liste d’options
- **Recherche** : Filtrage en direct si `searchable`
- **Sélection** :
    - Simple : fermeture du menu après sélection
    - Multiple : affichage de tags ou liste groupée
- **Transitions / Animations** :
    - Apparition/disparition du menu avec fade ou scale
    - Highlight de l’option au survol

---

## 6. Accessibilité

- `role="combobox"` avec attributs ARIA dynamiques
- Prise en charge complète du clavier
- Support de `aria-disabled`, `aria-selected`, `aria-activedescendant`
- Annonce vocale des options survolées
- Focus clair et visible

---

## 7. 🧩 Présets ou composants dérivés

- **Composants dérivés** :
    - `CountrySelect`
    - `SearchableMultiSelect`
- **Créés à partir de** : `Select` + props custom

---

## 8. 🧪 Tests attendus

- [x] Sélection simple et multiple
- [x] Test accessibilité clavier et screen reader
- [x] Affichage des erreurs
- [x] Clear/reset si activé
- [x] Navigation et filtrage clavier

---

## 9. 📐 Exemple(s) d’utilisation

```jsx
<Select
  options={[
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" }
  ]}
  value="a"
  onChange={(value) => setValue(value)}
  size={"sm"}
  hint={"Un petit détails qui peux vous aidé"}
  helper={"Ce Champs ne concerne que les personnes résidant en belgique"}
/>
```
---
## 10. Liens Utile
[Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=7953-158014&m=dev)
# 📄 Fiche de spécification — `Checkbox`

---

## 1. 🔎 Objectif du composant

- **Nom** : `Checkbox`
- **Rôle** : Permettre à l'utilisateur de sélectionner une ou plusieurs options dans un ensemble.
- **Utilisation prévue** :
    - Sélections multiples dans des listes ou des formulaires
    - Paramètres activables/désactivables
    - Accord de consentement (CGU, newsletters, etc.)
    - Utilisable seul ou en groupe

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Autonome

- **Structure interne recommandée** :
    - `Checkbox`
    - `Text` label
    - `Text` description

- **Slots / Children autorisés** :

---

## 3. ⚙️ Props attendues

| Prop              | Type                         | Requis | Par défaut | Description                                  |
|-------------------|------------------------------|--------|----------|----------------------------------------------|
| `checked`         | `boolean`                    | ❌     | —        | Contrôle externe de l’état                   |
| `defaultChecked`  | `boolean`                    | ❌     | `false`  | État par défaut (mode non contrôlé)          |
| `onCheckedChange` | `(checked: boolean) => void` | ❌ | —    | Callback lors du changement                  |
| `disabled`        | `boolean`                    | ❌     | `false`  | Désactive la checkbox                        |
| `required`        | `boolean`                    | ❌     | `false`  | Requis pour la validation d’un formulaire    |
| `id`              | `string`                     | ❌     | auto-généré| Pour l’accessibilité (liée au `<label>`)     |
| `name`            | `string`                     | ❌     | —        | Nom du champ dans un formulaire              |
| `value`           | `string`                     | ❌     | `"on"`   | Valeur transmise lors de la soumission       |
| `indeterminate`   | `boolean`                    | ❌     | `false`  | État intermédiaire (ex. sélection partielle) |
| `size`            | `string`                     | ❌     |     | taille de la checkbox                        |
| `label`           | `string`                 | ❌     | ``    | label                                        |
| `extra`           | `string`                 | ❌     | ``    | description                                  |


---

## 4. 🎨 Variantes / États

- **État** :
    - `checked`,
    - `unchecked`, 
    - `indeterminate`
    - `disabled` 
    - `focused`
    - `hover`

- **Thèmes visuels** :
    - Case carrée classique
    - Icône de check, tiret pour état intermédiaire
    - Taille : `sm`, `md`

---

## 5. 🧪 Comportements & Interactions

- Clic sur la case → bascule de l’état
- Clic sur le label associé → coche la case
- Support du clavier :
    - `Tab` pour focus
    - `Space` pour changer d’état

---

## 6. Accessibilité


- Utilisation de l’élément natif `<input type="checkbox">`
- Association correcte d’un label visible via :
  - L’élément `<label for="id">` lié à l’`id` de l’input
  - Ou un `label` englobant directement l’input
- Texte de label clair et descriptif, visible par les lecteurs d’écran
- Prise en charge du clavier :
  - `Tab` pour focus
  - `Space` pour changer l’état
- Gestion des trois états si applicable : `checked`, `unchecked`, et `indeterminate`
- Utilisation d’`aria-checked` uniquement si composant custom sans `<input>`
- Ajout d’`aria-describedby` si une aide contextuelle est associée
- Indication visuelle du focus clavier sur la case ou son label
- Utilisation de `disabled` si la case doit être inactive

---

## 7. 🧩 Présets ou composants dérivés

---

## 8. 🧪 Tests attendus

- [x] Clic → coche/décoche
- [x] Navigation clavier (`Tab`, `Space`)
- [x] Fonctionne avec `checked` + `onCheckedChange`
- [x] Gestion de `indeterminate`
- [x] Accessibilité respectée

---

## 9. 📐 Exemple(s) d’utilisation

```tsx
  <Checkbox id="newsletter" name="newsletter" label={"mon label"} extra={"ma description"}/>
``` 
---

## 10. Liens utile
- [Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=1224-6867&m=dev)



  
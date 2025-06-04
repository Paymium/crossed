# 📄 Fiche de spécification — `RadioGroup`

---

## 1. 🔎 Objectif du composant

- **Nom** : `RadioGroup`
- **Rôle** : Permet à l’utilisateur de sélectionner une seule option parmi plusieurs
- **Utilisation prévue** : Formulaires, filtres, sélecteurs d’options visuelles

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [ ] Autonome
    - [x] Composable avec d’autres composants

- **Composants internes utilisés** :
    - `RadioItem`
    - `Label`
    - `Description` (optionnel)

- **Slots / Children autorisés** :
    - [x] Oui
    - **Détail** : Slot pour chaque option personnalisée ou rendu automatique via `options`

---

## 3. ⚙️ Props attendues

| Prop       | Type                                    | Requis | Par défaut | Description                                 |
|------------|-----------------------------------------|--------|------------|---------------------------------------------|
| `options`  | `Array<{ label, value, description? }>` | ❌     | `[]`       | Liste des options si non rendu via children |
| `value`    | `string`                                | ✅     | -          | Valeur sélectionnée                         |
| `onChange` | `(value: string) => void`               | ✅ | -          | Callback lors du changement de sélection    |
| `disabled` | `boolean`                               | ❌     | `false`    | Désactive tout le groupe                    |
| `name`     | `string`                                | ❌     | auto-gen   | Nom du groupe (utile pour les formulaires)  |
| `variant`  | `string`                                | ❌ | `""`       | détermine le type d'item utilisé            |
| `size`     | `sm \| md`                              | ❌ | `""`     | Determine la taille des item                |

---

## 4. 🎨 Variantes / États

- **Variantes visuelles** :
    - `icon` 
    - `card` 
    - `avatar`
    - `payment`
    - `classic`

- **États gérés** :
    - [x] `checked` 
    - [x] `disabled`
    - [x] `focus` (et focus checked)
    - [x] `hover` (et hover checked)

---

## 5. 🧪 Comportements & Interactions

- **Click sur une option** : Met à jour la valeur sélectionnée
- **Transitions / Animations** : Optionnelles, au focus ou changement de sélection

---

## 6. Accessibilité

- Utilisation de `role="radiogroup"` sur le conteneur
- Chaque option a `role="radio"`, `aria-checked`, `tabIndex`
- Prise en charge clavier complète (`Arrow` pour navigation, `Space` pour sélection)
- Prise en charge de `aria-disabled` pour les options désactivées

---

## 7. 🧩 Présets ou composants dérivés

---

## 8. 🧪 Tests attendus

- [x] Test unitaire des props critiques (`value`, `onChange`)
- [x] Test de navigation clavier
- [x] Test accessibilité (`role`, `aria-*`)
- [x] Test visuel si `variant=card`

---

## 9. 📐 Exemple(s) d’utilisation

```jsx
<RadioGroup
  value={selected}
  onChange={setSelected}
  options={[
    { label: 'Mensuel', value: 'monthly' },
    { label: 'Annuel', value: 'yearly', description: 'Économisez 20%' }
  ]}
  variant="payment"
  size={"md"}
/>
```
---

## 10. Liens utile
[Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=1142-80509&m=dev)

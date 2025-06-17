# 📄 Fiche de spécification — `DatePicker`

---

## 1. 🔎 Objectif du composant

- **Nom** : `DatePicker`
- **Rôle** : Sélecteur de date ou de plage de dates
- **Utilisation prévue** : Formulaires, filtres de recherche, processus multi-étapes

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Autonome

- **Composants internes utilisés** :
    - `Input`
    - `Calendar`
    - `Popover`
    - `Modal`
    - `Button`
    - `Icon`

- **Slots / Children autorisés** :
    - [x] Non
    - **Détail** : Comportement entièrement piloté via props

---

## 3. ⚙️ Props attendues

| Prop           | Type                                   | Requis | Par défaut | Description                                                            |
|----------------|----------------------------------------|--------|------------|------------------------------------------------------------------------|
| `value`        | `Date \| [Date, Date]`                 | ✅      | -          | Valeur actuelle (simple ou plage)                                      |
| `onChange`     | `(date: Date \| [Date, Date]) => void` | ✅      | -          | Callback lors d’un changement                                          |
| `placeholder`  | `string`                               | ❌      | `""`       | Texte affiché quand aucune date n’est sélectionnée                     |
| `minDate`      | `Date`                                 | ❌      | -          | Date minimale sélectionnable                                           |
| `maxDate`      | `Date`                                 | ❌      | -          | Date maximale sélectionnable                                           |
| `disabled`     | `boolean`                              | ❌      | `false`    | Désactive tout le sélecteur                                            |
| `asModal`      | `boolean`                              | ❌      | `false`    | affiche le date picker dans une modale au lieu d'un dropdown           |
| `range`        | `boolean`                              | ❌     | `false`    | choisis une plage ou une seul date                                     |
| `detailedView` | `boolean`                              | ❌     | `true`     | Vue étendu avec deux mois affiché et plus de détails ou vu plus simple |

---

## 4. 🎨 Variantes / États


- **États gérés** :
    - [x] `hover`
    - [x] `focus`
    - [x] `disabled`
    - [x] `selected`
    - [x] `range-start`
    - [x] `range-end`

---

## 5. 🧪 Comportements & Interactions

- **Clic** : Ouvre/ferme le calendrier
- **Sélection** : 1 ou 2 clics selon le mode (simple ou plage)
- **Transitions / Animations** : Ouverture/fermeture avec fade ou scale

---

## 6. Accessibilité

- Utiliser `role="dialog"` pour la popover de calendrier
- Fournir `aria-label` sur les jours et boutons de navigation
- Gérer le focus cyclique dans le calendrier
- Support de la navigation clavier : flèches, Home, End, PageUp, PageDown
- Labels associés à l'input via `aria-labelledby` ou `aria-label`
- État `disabled` sur les dates non sélectionnables via `aria-disabled`

---

## 7. 🧩 Présets ou composants dérivés

---

## 8. 🧪 Tests attendus

- [x] Test unitaire des props (`value`, `onChange`, `range`)
- [x] Test de rendu (ouverture calendrier)
- [x] Test accessibilité (navigation clavier, ARIA)
- [ ] Test visuel pour les états sélectionnés

## 9. 📐 Exemple(s) d’utilisation

```jsx
<DatePicker
  value={selectedDate}
  onChange={(date) => setSelectedDate(date)}
  placeholder="Sélectionner une date"
  detailedView={false}
  asModal
/>

<DatePicker
  value={[startDate, endDate]}
  onChange={([start, end]) => {
    setStartDate(start);
    setEndDate(end);
  }}
  placeholder="Choisir une période"
  range
/>
```

## 10. Liens Utile
[Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=1143-85678&p=f&m=dev)
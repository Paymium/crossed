# 📄 Fiche de spécification — `LineChart`

---

## 1. 🔎 Objectif du composant

- **Nom** : `LineChart`
- **Rôle** : Afficher des données sous forme de courbe pour visualiser des tendances
- **Utilisation prévue** : Dashboard, reporting, analytics

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Autonome

- **Composants internes utilisés** :
    - `ResponsiveContainer`
    - `XAxis`, `YAxis`
    - `Tooltip`, `Legend`
    - `Line`

- **Slots / Children autorisés** :
    - [x] Non

---

## 3. ⚙️ Props attendues

| Prop        | Type        | Requis | Par défaut | Description                          |
|-------------|-------------|--------|------------|--------------------------------------|
| `data`      | `array`     | ✅     | -          | Données à afficher                   |
| `xKey`      | `string`    | ✅     | -          | Clé à utiliser pour l’axe X          |
| `lines`     | `array`     | ✅     | -          | Tableau d’objets `{ key, color }` représentant chaque ligne |
| `height`    | `number`    | ❌     | `300`      | Hauteur du graphique                 |
| `showLegend`| `boolean`   | ❌     | `true`     | Affiche ou non la légende            |
| `showTooltip`| `boolean`  | ❌     | `true`     | Affiche ou non le tooltip            |

---

## 4. 🎨 Variantes / États


- **États gérés** :
    - [x] Données vides
    - [x] Erreur de format de données

---

## 5. 🧪 Comportements & Interactions

- **Hover sur une ligne** : affiche un tooltip avec la valeur
- **Responsive** : s’adapte à la taille du conteneur parent
- **Transitions / Animations** : oui (animation à l’apparition des courbes)

---

## 6. Accessibilité

- `role="img"` sur le conteneur SVG
- Texte accessible via `aria-label` ou `title` si nécessaire

---

## 7. 🧩 Présets ou composants dérivés

---

## 8. 🧪 Tests attendus

- [x] Test unitaire des props critiques
- [x] Test de rendu (snapshot)
- [x] Test accessibilité (éléments clés accessibles)
- [ ] Test visuel si besoin

---

## 9. 📐 Exemple(s) d’utilisation

```jsx
<LineChart
  data={[
    { date: '2024-01-01', users: 100 },
    { date: '2024-01-02', users: 150 },
  ]}
  xKey="date"
  lines={[{ key: 'users', color: '#4f46e5' }]}
/>
```
---

### 10. Liens Utile
[Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=1538-270468&m=dev)
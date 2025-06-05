# 📄 Fiche de spécification — `PieChart`

---

## 1. 🔎 Objectif du composant

- **Nom** : `PieChart`
- **Rôle** : Représenter des proportions sous forme de secteurs circulaires
- **Utilisation prévue** : Dashboard, visualisation simple de parts de données (statistiques, répartition, etc.)

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Autonome

- **Composants internes utilisés** :
    - `Pie`
    - `Tooltip`
    - `Legend`
    - `ResponsiveContainer`

- **Slots / Children autorisés** :
    - [x] Non

---

## 3. ⚙️ Props attendues

| Prop         | Type        | Requis | Par défaut | Description                                                |
|--------------|-------------|--------|------------|------------------------------------------------------------|
| `data`       | `array`     | ✅     | -          | Données à représenter (`[{ name, value }]`)                |
| `colors`     | `array`     | ❌     | `[]`       | Couleurs personnalisées pour chaque secteur                |
| `dataKey`    | `string`    | ✅     | `"value"`  | Clé utilisée pour la valeur de chaque secteur              |
| `nameKey`    | `string`    | ❌     | `"name"`   | Clé utilisée pour le nom affiché dans le tooltip/légende   |
| `showLegend` | `boolean`   | ❌     | `true`     | Afficher ou non la légende                                 |
| `showTooltip`| `boolean`   | ❌     | `true`     | Afficher ou non les tooltips au survol                    |
| `height`     | `number`    | ❌     | `300`      | Hauteur du graphique                                       |

---

## 4. 🎨 Variantes / États


- **États gérés** :
    - [x] Données vides
    - [x] Erreur de format

---

## 5. 🧪 Comportements & Interactions

- **Survol** : Tooltip avec nom + valeur
- **Responsive** : S’adapte au parent si contenu dans `ResponsiveContainer`
- **Transitions / Animations** : Oui (apparition des secteurs animée)

---

## 6. Accessibilité

- `role="img"` pour le conteneur
- `title`/`desc` pour description contextuelle des données
- Utilisation d'attributs ARIA pour nommer les secteurs

---

## 7. 🧩 Présets ou composants dérivés

- **Composants dérivés** :
    - `DonutChart` (PieChart avec un trou central)
- **Créés à partir de** : `PieChart` avec props spécifiques

---

## 8. 🧪 Tests attendus

- [x] Test unitaire des props critiques
- [x] Test de rendu (snapshot)
- [x] Test accessibilité

---

## 9. 📐 Exemple(s) d’utilisation

```jsx
<PieChart
  data={[
    { name: 'Produit A', value: 400 },
    { name: 'Produit B', value: 300 },
    { name: 'Produit C', value: 300 },
  ]}
  colors={['#8884d8', '#82ca9d', '#ffc658']}
/>
```
---

## 10. Liens Utile
[Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=1538-270726&m=dev)

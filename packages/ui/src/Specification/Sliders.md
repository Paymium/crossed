# 📄 Fiche de spécification — `Slider`

---

## 1. 🔎 Objectif du composant

- **Nom** : `Slider`
- **Rôle** : Permettre à l’utilisateur de sélectionner une valeur ou une plage de valeurs dans un intervalle défini, de manière interactive.
- **Utilisation prévue** :
    - Filtres dynamiques (prix, durée, etc.)
    - Réglage de volume, luminosité, vitesse, etc.
    - Champs de formulaire visuels
    - Contrôle de paramètres dans des outils ou dashboards

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Autonome

- **Structure interne** :
    - `track` : la ligne sur laquelle on glisse
    - `range` : la partie remplie 
    - `thumb(s)` : bouton(s) glissable(s)
    - `label(s)` : facultatif, texte lié à la valeur

- **Slots / Children autorisés** :

---

## 3. ⚙️ Props attendues

| Prop            | Type                                      | Requis | Par défaut   | Description                                          |
|-----------------|-------------------------------------------|--------|--------------|------------------------------------------------------|
| `value`         | `number` ou `[number, number]`            | ✅     | —            | Valeur actuelle (ou plage de valeurs)               |
| `onChange`      | `(value) => void`                         | ✅     | —            | Callback à la modification                          |
| `min`           | `number`                                  | ❌     | `0`          | Valeur minimale                                      |
| `max`           | `number`                                  | ❌     | `100`        | Valeur maximale                                      |
| `step`          | `number`                                  | ❌     | `1`          | Incrément entre deux valeurs                         |
| `disabled`      | `boolean`                                 | ❌     | `false`      | Rend le slider non interactif                       |
| `LabelPosition` | `string`                                  | ❌     | `false`      | Affiche la valeur actuelle sous le slider           |
| `marks`         | `Array<{ value: number, label: string }>` | ❌ | `[]`         | Points de repère fixes avec label optionnel         |

---

## 4. 🎨 Variantes / États


- **LabelPosition** :
    - `none` pas de label,
    - `under`
    - `floating-top`

---

## 5. 🧪 Comportements & Interactions

- **Contrôle par souris, clavier et touch** :
    - Flèches pour déplacement précis
    - Glissement (drag and drop)

- **Comportement mobile** :
    - Doit être facilement manipulable au doigt

---

## 6. Accessibilité

- Utilisation de l’élément natif `<input type="range">` si possible
- Sinon, utiliser `role="slider"` sur l’élément personnalisé
- Fournir les attributs :
  - `aria-valuemin` — valeur minimale
  - `aria-valuemax` — valeur maximale
  - `aria-valuenow` — valeur actuelle
  - `aria-valuetext` si la valeur affichée a besoin d’un format lisible (ex: "50 %")
- Ajout de `aria-label` ou `aria-labelledby` pour décrire l’usage du slider
- Support du clavier obligatoire :
  - `Left` / `Down` : diminue la valeur
  - `Right` / `Up` : augmente la valeur
  - `Home` / `End` : aller à la valeur min / max
- Affichage visuel de la valeur recommandé, surtout pour des valeurs précises
- Dans le cas d’un slider double (intervalle), chaque curseur doit être focusable et accessible indépendamment : 
  - Avoir role="slider"
  - Un aria-valuenow propre 
  - Partager le même aria-valuemin/max 
  - Avoir des aria-label distincts (ex: "Prix minimum", "Prix maximum")
- le slider doit être manipulable au click, au gliser et au toucher 
---

## 7. 🧩 Présets ou composants dérivés

---

## 8. 🧪 Tests attendus

- [x] Valeurs mises à jour correctement
- [x] Respect de `min`, `max`, `step`
- [x] Comportement range fonctionnel
- [x] Interaction clavier + mobile
- [x] Accessibilité ARIA
- [x] Affichage des labels et tooltips

---

## 9. 📐 Exemple(s) d’utilisation

```jsx
// Slider simple
<Slider value={values} onChange={setValue} min={0} max={100} labelPosition={"under"}/>

```
---

## 10. Liens utile
- [Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=1087-58516&m=dev)
# 📄 Fiche de spécification — `ProgressBar`

---

## 1. 🔎 Objectif du composant

- **Nom** : `ProgressBar`
- **Rôle** : Afficher l’avancement d’un processus ou d’une tâche sous forme de pourcentage.
- **Utilisation prévue** :
    - Chargement de fichier, import/export
    - Étapes de formulaire ou onboarding
    - Téléchargement / traitement d’un fichier
    - Visualisation de l’avancement d’une action utilisateur

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Autonome

- **Structure interne** :
    - `wrapper` (la barre vide)
    - `bar` (la partie remplie en fonction du `value`)
    - Optionnel : `label` (texte ou pourcentage)

- **Slots / Children autorisés** :
    - Non (progression pure)

---

## 3. ⚙️ Props attendues

| Prop            | Type                                             | Requis | Par défaut | Description                                          |
|-----------------|--------------------------------------------------|--------|-----------|------------------------------------------------------|
| `value`         | `number`                                         | ✅     | —         | Valeur de progression en % (0–100)                   |
| `max`           | `number`                                         | ❌     | `100`     | Valeur maximale (utile pour progressions partielles) |
| `labelPosition` | `string`                                         | ❌     | `right`   | position du label                                    |
| `type`          | `string`                                         | ❌     | `bar`     | Type de bar (droite, cercle, demi cercle)            |
| `size`          | `string`                                         | ❌     | ``          | Type de bar (droite, cercle, demi cercle)            |

---

## 4. 🎨 Variantes / États

- **Type** :
    - `bar` 
    - `circle`
    - `half`

- **Size** : (seulement pour hald et circle)
    - `xxs`
    - `xs`
    - `sm`
    - `md`
    - `lg`

- **LabelPosition** : (seulement pour bar)
    - `right`
    - `under`
    - `floating-top`
    - `floating-bottom`
    - `none` pas de label

- **États spéciaux** :
    - `indeterminate` (optionnel) : barre en chargement infini, sans pourcentage

---

## 5. 🧪 Comportements & Interactions

- **Comportement** :
    - Affiche une barre remplie proportionnellement à `value`
    - Peut afficher un texte ou pourcentage si `label`est present 

- **Accessibilité** :
    - `role="progressbar"`
    - Attributs `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
    - Texte visible pour lecteur d’écran (si non affiché)

---

## 6. 🧩 Présets ou composants dérivés

---

## 7. 🧪 Tests attendus

- [x] Affichage correct selon `value`
- [x] Support `max` personnalisé
- [x] Affichage du label ou pourcentage
- [x] Accessibilité ARIA

---

## 8. 📐 Exemple(s) d’utilisation

```jsx
// Progression simple
<ProgressBar value={45} />

// Avec label personnalisé
<ProgressBar value={value} label={`${value}%`} labelPosition={"floating-top"} />

// circulaire
<ProgressBar value={value} label={`${value}%`} labelPosition={"floating-top"} type={"circle"} size={"md"} />
``` 

## 9. Liens utile
- [Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=1157-90228&m=dev)

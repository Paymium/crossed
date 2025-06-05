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

---

## 6. Accessibilité

progress bar
- Utilisation de l’élément natif `<progress>` si possible
- Sinon, utiliser `role="progressbar"` sur un élément div ou span
- Fournir les attributs :
  - `aria-valuemin` — valeur minimale
  - `aria-valuemax` — valeur maximale
  - `aria-valuenow` — valeur actuelle
  - `aria-valuetext` si la valeur affichée a besoin d’un format lisible (ex: "50 %")
- Ajouter un `aria-label` ou `aria-labelledby` pour décrire le but du chargement
- Si nécessaire, afficher le pourcentage visuellement et textuellement
- Doit être visible ou annoncé par un lecteur d’écran si important pour la tâche utilisateur
- Si le progrès est **indéfini** (chargement en cours sans fin connue), ne pas définir `aria-valuenow`

---

## 7. 🧩 Présets ou composants dérivés

---

## 8. 🧪 Tests attendus

- [x] Affichage correct selon `value`
- [x] Support `max` personnalisé
- [x] Affichage du label ou pourcentage
- [x] Accessibilité ARIA

---

## 9. 📐 Exemple(s) d’utilisation

```jsx
// Progression simple
<ProgressBar value={45} />

// Avec label personnalisé
<ProgressBar value={value} label={`${value}%`} labelPosition={"floating-top"} />

// circulaire
<ProgressBar value={value} label={`${value}%`} labelPosition={"floating-top"} type={"circle"} size={"md"} />
``` 
---

## 10. Liens utile
- [Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=1157-90228&m=dev)

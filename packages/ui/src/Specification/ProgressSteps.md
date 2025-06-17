# 📄 Fiche de spécification — `ProgressSteps`

---

## 1. 🔎 Objectif du composant

- **Nom** : `ProgressSteps`
- **Rôle** : Indiquer visuellement la progression d’un utilisateur dans un processus multi-étapes
- **Utilisation prévue** : Formulaire d’inscription, tunnel de paiement, onboarding, étapes de configuration

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Autonome

- **Composants internes utilisés** :
    - `Icon`
    - `Text`
    - `StepperItem` (ou `Step`)

- **Slots / Children autorisés** :
    - Non

---

## 3. ⚙️ Props attendues

| Prop          | Type                         | Requis | Par défaut | Description                                         |
|---------------|------------------------------|--------|------------|-----------------------------------------------------|
| `steps`       | `array`                      | ✅     | -          | Liste des étapes                                    |
| `currentStep` | `number`                     | ✅     | -          | Index de l’étape actuelle (0-based)                 |
| `orientation` | `"horizontal" \| "vertical"` | ❌ | `"horizontal"` | Affichage horizontal ou vertical                    |
| `onStepClick` | `function`                   | ❌     | `null`     | Callback quand une étape est cliquée (si cliquable) |
| `clickable`   | `boolean`                    | ❌     | `false`    | Les étapes sont interactives ou non                 |
| `size`        | `string`                     | ❌     | ``    | Taille des icone et du texte                        |

---

## 4. 🎨 Variantes / États

- **Variantes visuelles** :
    - `horizontal`
    - `vertical`

- **États gérés** :
    - [x] `completed`
    - [x] `active`
    - [x] `disabled` (si étape future non activée)
    - [x] `notStarted`

- **Size** : 
  - `sm`
  - `md`

- **Variant** : 
  - `dot`
  - `number`
  - `icon`
  - `minimal`
  - `minimalConnected`
  - `line`


---

## 5. 🧪 Comportements & Interactions

- **Clic** : Si `clickable`, l’étape déclenche un `onStepClick`
- **Transitions / Animations** :
    - Transition douce entre les étapes (progression visuelle)

---

## 6. Accessibilité

- `role="list"` sur le conteneur principal
- `role="listitem"` pour chaque étape
- `aria-current="step"` sur l’étape en cours
- Support de navigation clavier (si interactif)

---

## 7. 🧩 Présets ou composants dérivés


---

## 8. 🧪 Tests attendus

- [x] Rendu de toutes les étapes
- [x] État visuel correct (`active`, `completed`, `disabled`)
- [ ] Interaction (`onStepClick`)

---

## 9. 📐 Exemple(s) d’utilisation

```jsx
<ProgressSteps
  steps={[
    { label: "Informations", description: "Vos coordonnées", status: "completed" },
    { label: "Paiement", description: "Méthode de paiement", status: "current" },
    { label: "Confirmation", description: "Validation de la commande", status: "disabled" },
  ]}
  currentStep={1}
/>
```
---

## 10. Liens Utile 
[Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=1135-1960&m=dev)
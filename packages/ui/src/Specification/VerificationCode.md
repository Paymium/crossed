# 📄 Fiche de spécification — `VerificationCodeInput`

---

## 1. 🔎 Objectif du composant

- **Nom** : `VerificationCodeInput`
- **Rôle** : Champ de saisie pour code de vérification (OTP, confirmation)
- **Utilisation prévue** : Authentification à deux facteurs, validation d’adresse email, confirmation de paiement

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Autonome

- **Composants internes utilisés** :
    - `Input`
    - `Text`
    - `Box` ou `Stack` pour la disposition

- **Slots / Children autorisés** :
    - [x] Non

---

## 3. ⚙️ Props attendues

| Prop         | Type                     | Requis | Par défaut | Description                                               |
|--------------|--------------------------|--------|------------|-----------------------------------------------------------|
| `length`     | `number`                 | ✅     | -          | Nombre de chiffres attendus                               |
| `onChange`   | `(code: string) => void` | ✅ | -          | Callback déclenché à chaque modification complète du code |
| `onComplete` | `(code: string) => void` | ❌ | -          | Callback déclenché lorsque tous les champs sont remplis   |
| `isDisabled` | `boolean`                | ❌     | `false`    | Désactive tous les champs                                 |
| `size`       | `string`                 | ❌     | `sm`       | taille des champs                                         |
| `hint`        | `string`                             | ❌     | ``         | affiche l'hint en dessous du select                                    |


---

## 4. 🎨 Variantes / États

- **size**:
  - `xs`
  - `sm`
  - `md`
  - `lg`

- **États gérés** :
    - [x] `focus` (par champ)
    - [x] `filled`
    - [x] `disabled`
    - [x] `error`
    - [x] `masked`

---

## 5. 🧪 Comportements & Interactions

- **Navigation au clavier** : passage automatique au champ suivant
- **Backspace** : retour au champ précédent si vide
- **Collage global** : collage d’un code complet dans un champ unique réparti automatiquement
- **Transitions / Animations** :
    - Highlight doux sur focus
    - Transition de validation optionnelle

---

## 6. Accessibilité

- Compatible lecteurs d’écran
- Navigation logique via `Tab`
- Champs correctement labellisés (`aria-label` ou `aria-labelledby`)
- Support de `aria-invalid` et `aria-disabled`

---

## 7. 🧩 Présets ou composants dérivés

---

## 8. 🧪 Tests attendus

- [x] Navigation clavier et backspace
- [x] Collage de code complet
- [x] Masquage du code
- [x] Focus auto et ordre logique
- [x] Accessibilité des champs

---

## 9. 📐 Exemple(s) d’utilisation

```jsx
<VerificationCodeInput
  length={6}
  onChange={(code) => setCode(code)}
  onComplete={(code) => submitCode(code)}
  size={"lg"}
  hint={"Ce code vous a été envoyé par mail"}
/>
```
---

## 10. Liens utile
[Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=1106-66907&m=dev)

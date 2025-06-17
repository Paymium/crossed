# 📄 Fiche de spécification — `Input`

---

## 1. 🔎 Objectif du composant

- **Nom** : `Input`
- **Rôle** : Champ de saisie de texte
- **Utilisation prévue** : Formulaires, filtres, barres de recherche, modales

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Autonome

- **Composants internes utilisés** :
    - `Label`
    - `Icon` (optionnel pour préfixe/suffixe)
    - `HelperText`

- **Slots / Children autorisés** :
    - [x] Non

---

## 3. ⚙️ Props attendues

| Prop          | Type          | Requis | Par défaut | Description               |
|---------------|---------------|--------|------------|---------------------------|
| `type`        | `string`      | ❌     | `text`     | Type de l’input (`text`, `email`, `password`...) |
| `value`       | `string`      | ✅     | -          | Valeur de l’input         |
| `onChange`    | `(e) => void` | ✅     | -          | Callback lors d’une saisie |
| `placeholder` | `string`      | ❌     | `""`       | Texte d’aide dans le champ |
| `disabled`    | `boolean`     | ❌     | `false`    | Désactive le champ        |
| `readOnly`    | `boolean`     | ❌     | `false`    | Champ en lecture seule    |
| `error`       | `boolean`     | ❌     | `false`    | Affiche un état d’erreur  |
| `iconLeft`    | `ReactNode`   | ❌     | `null`     | Icône à gauche du champ   |
| `size`        | `string`      | ❌     | `md`       | `sm`\| `md`               |
| `maxLength`   | `number`      | ❌     | -          | Nombre maximal de caractères |
| `variant`     | `string`      | ❌     | -          | permet de choisir parmis certains preset |
| `required`    | `boolean`                            | ❌     | `true`     | affichage d'un atérix ou non                                           |
| `helper`      | `string`                             | ❌     | ``         | affichage d'une icone help avec un tooltip ayant comme contenue helper |
| `hint`        | `string`                             | ❌     | ``         | affiche l'hint en dessous du select |
| `label`       | `string`                             | ❌     | ``         | Label                     |


---

## 4. 🎨 Variantes / États
Je ne sais pas dans quelle mesure les variant serait pas plutôt des préset / composant a part avec des props enrichis sinon les select a l'intérieur me semble compliqué a gérer 
- **variant** :
  - `mail`
  - `phone`
  - `amount`
  - `website`
  - `cardNumber`
  - `copy`
  - `tag` pour Vincent : résultat de l’auto complétion, tu commences à taper quelque chose et on affiche le tag correspondant, A mon sens plutôt un select qu'un input

- **États gérés** :
    - [x] `focus` (et focus si error)
    - [x] `hover` (et hover si error)
    - [x] `disabled` (et disabled si error)
    - [x] `error` 
    - [x] `readOnly`
    - [x] `filled` / `empty`

---

## 5. 🧪 Comportements & Interactions

- **Focus clavier et visuel**
- **Support des raccourcis clavier natifs**
- **Affichage de message d’erreur si applicable**
- **Transitions / Animations** :
    - Fade ou slide du message d’erreur
    - Animation de survol/focus douce

---

## 6. Accessibilité

- `role="textbox"` ou `type` spécifique
- Support clavier complet
- Attributs ARIA : `aria-*`
- Liens avec `label` et `aria-describedby` pour les aides
- Text size min 16px pour mobile (évite zoom)

---

## 7. 🧩 Présets ou composants dérivés

---

## 8. 🧪 Tests attendus

- [x] Affichage et interaction clavier
- [x] Test d’accessibilité (focus, label, erreurs)
- [x] Test mobile (taille texte)
- [x] Test input controlé vs non contrôlé

---

## 9. 📐 Exemple(s) d’utilisation

```jsx
<Input
  type="email"
  placeholder="Entrer votre email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```
---

## 10. Liens Utile
[Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=3531-403305&m=dev)

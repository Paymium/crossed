# 📄 Fiche de spécification — `TextArea`

---

## 1. 🔎 Objectif du composant

- **Nom** : `TextArea`
- **Rôle** : Champ de saisie de texte multiligne
- **Utilisation prévue** : Formulaires, commentaires, messages, description longue

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Autonome

- **Composants internes utilisés** :
    - `Label`
    - `HelperText`

- **Slots / Children autorisés** :
    - [x] Non

---

## 3. ⚙️ Props attendues

| Prop          | Type                  | Requis | Par défaut | Description                                          |
|---------------|-----------------------|--------|------------|------------------------------------------------------|
| `value`       | `string`              | ✅     | -          | Valeur du champ                                      |
| `onChange`    | `(e) => void`         | ✅     | -          | Callback lors de la saisie                           |
| `placeholder` | `string`              | ❌     | `""`       | Texte d’aide affiché dans le champ                   |
| `disabled`    | `boolean`             | ❌     | `false`    | Champ désactivé                                      |
| `rows`        | `number`              | ❌     | `3`        | Nombre de lignes visibles                            |
| `maxLength`   | `number`              | ❌     | -          | Nombre maximum de caractères                         |
| `error`       | `boolean`             | ❌     | `false`    | Affiche un état d’erreur                             |
| `resize`      | `"none" \| "vertical" \| "both"` | ❌ | `"vertical"` | Contrôle du redimensionnement par l’utilisateur      |
| `required`    | `boolean`                            | ❌     | `true`     | affichage d'un atérix ou non                                           |
| `helper`      | `string`                             | ❌     | ``         | affichage d'une icone help avec un tooltip ayant comme contenue helper |
| `hint`        | `string`                             | ❌     | ``         | affiche l'hint en dessous du select                                    |
| `label`       | `string`                             | ❌     | ``         | Label                                                                  |

---

## 4. 🎨 Variantes / États

- **États gérés** :
    - [x] `focus`
    - [x] `disabled`
    - [x] `error`
    - [x] `filled` / `empty`

---

## 5. 🧪 Comportements & Interactions

- **Support clavier standard**
- **Sélection et tabulation fonctionnelles**
- **Affichage du nombre de caractères si `maxLength` fourni**

- **Transitions / Animations** :
    - Apparition douce du message d’erreur ou compteur

---

## 6. Accessibilité

- Lié à un `label` par `htmlFor`
- `aria-invalid`, `aria-readonly`, `aria-disabled`
- `aria-describedby` pour message d’aide ou compteur
- Compatible lecteurs d’écran

---

## 7. 🧩 Présets ou composants dérivés

---

## 8. 🧪 Tests attendus

- [x] Interaction clavier
- [x] Accessibilité (focus, erreurs, messages)
- [x] Comportement `maxLength` / compteur
- [x] Rendu mobile et desktop

---

## 9. 📐 Exemple(s) d’utilisation

```jsx
<TextArea
  placeholder="Décrivez votre projet ici..."
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>
```
--- 

## 10. Liens Utile 
[Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=1238-360&m=dev)

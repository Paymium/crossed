# 📄 Fiche de spécification — `[NomDuComposant]`

---

## 1. 🔎 Objectif du composant

- **Nom** : `[NomDuComposant]`
- **Rôle** : (Ex : Bouton d’action principal, carte produit, bannière d’erreur, etc.)
- **Utilisation prévue** : (Ex : Page produit, modale, formulaire...)

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [ ] Autonome
    - [ ] Composable avec d’autres composants

- **Composants internes utilisés** :
    - `Icon`
    - `Text`
    - `Button`, etc.

- **Slots / Children autorisés** :
    - [ ] Oui
    - [ ] Non
    - **Détail** : (ex : slot pour l'icône, ou children pour le contenu libre)

---

## 3. ⚙️ Props attendues

| Prop        | Type        | Requis | Par défaut | Description                          |
|-------------|-------------|--------|------------|--------------------------------------|
| `variant`   | `string`    | ❌     | `primary`  | Type visuel du composant             |
| `icon`      | `ReactNode` | ❌     | `null`     | Icône à afficher                     |
| `onClick`   | `function`  | ✅     | -          | Callback lors du clic                |
| `disabled`  | `boolean`   | ❌     | `false`    | Composant désactivé ou non           |
| `loading`   | `boolean`   | ❌     | `false`    | Affiche un loader                    |

---

## 4. 🎨 Variantes / États

- **Variantes visuelles (`variant`)** :
    - `primary`
    - `secondary`
    - `ghost`
    - `danger`

- **États gérés** :
    - [ ] `hover`
    - [ ] `focus`
    - [ ] `active`
    - [ ] `disabled`
    - [ ] `loading`

---

## 5. 🧪 Comportements & Interactions

- **Clic** : `(ex : déclenche un handler)`
- **Accessibilité** : `role="button"`, `aria-*`, focus visible
- **Transitions / Animations** : (oui/non + détail)

---

## 6. Accessibilité

---

## 7. 🧩 Présets ou composants dérivés

- **Composants dérivés** :
    - `PrimaryButton`
    - `IconButton`
- **Créés à partir de** : `Button` avec props ou wrapper

---

## 8. 🧪 Tests attendus

- [ ] Test unitaire des props critiques
- [ ] Test de rendu (snapshot)
- [ ] Test accessibilité (focus, clavier)
- [ ] Test visuel si besoin

---

## 9. 📐 Exemple(s) d’utilisation

```jsx
<Button variant="primary" onClick={handleSubmit}>
  Valider
</Button>

<Button variant="ghost" icon={<TrashIcon />} onClick={handleDelete} />
```
--- 

## 10 Liens utile 
- [Figma](https://www.figma.com)
# 📄 Fiche de spécification — `NumPad`

---

## 1. 🔎 Objectif du composant

- **Nom** : `NumPad`
- **Rôle** : Permettre une saisie rapide de chiffres via une interface de type clavier numérique
- **Utilisation prévue** : Authentification par code, saisie de montant, interfaces tactiles ou mobiles

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Autonome

- **Composants internes utilisés** :
    - `Button`
    - `Icon`
    - `Display` (affichage de la saisie si applicable)

- **Slots / Children autorisés** :
    - [ ] Oui
    - [x] Non
    - **Détail** : -

---

## 3. ⚙️ Props attendues

| Prop          | Type         | Requis | Par défaut | Description                                         |
|---------------|--------------|--------|------------|-----------------------------------------------------|
| `onInput`     | `function`   | ✅     | -          | Callback appelé à chaque saisie de chiffre          |
| `onDelete`    | `function`   | ❌     | -          | Callback appelé lors d’un appui sur le bouton effacer |
| `onSubmit`    | `function`   | ❌     | -          | Callback appelé quand la saisie est validée         |
| `disabled`    | `boolean`    | ❌     | `false`    | Rend le pavé inactif                                |

---

## 4. 🎨 Variantes / États

- **États gérés** :
    - [x] `disabled`
    - [x] `active`

---

## 5. 🧪 Comportements & Interactions

- **Clic** : Ajoute un chiffre à l'entrée ou déclenche un événement spécifique (effacer, valider)
- **Transitions / Animations** :
    - Animation de pression sur bouton
    - Effet visuel de retour pour chaque touche

---

## 6. Accessibilité

- Tous les boutons doivent avoir un `aria-label` clair (`"Chiffre 1"`, `"Effacer"`, etc.)

---

## 7. 🧩 Présets ou composants dérivés

---

## 8. 🧪 Tests attendus

- [x] Test de saisie pour chaque chiffre
- [x] Test du bouton delete
- [x] Test callback submit
- [x] Test accessibilité
- [ ] Test visuel si besoin

---

## 9. 📐 Exemple(s) d’utilisation

```jsx
<NumPad
  onInput={(val) => setValue((prev) => prev + val)}
  onDelete={() => setValue((prev) => prev.slice(0, -1))}
  onSubmit={() => handleSubmit(value)}
/>
```
---

## 10. Liens utile
[Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=16637-2154&m=dev)
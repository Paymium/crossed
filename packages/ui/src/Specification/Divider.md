# 📄 Fiche de spécification — `Divider`

---

## 1. 🔎 Objectif du composant

- **Nom** : `Divider`
- **Rôle** : Séparer visuellement différentes sections de contenu
- **Utilisation prévue** : Interfaces denses, formulaires, pages de paramètres, tableaux de bord

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Autonome
    - [x] Composable

- **Composants internes utilisés** :
    -  `Box` 
    - `Text`
    - `Button`

- **Slots / Children autorisés** :
    - [x] Oui (si divider avec label)

---

## 3. ⚙️ Props attendues

| Prop       | Type        | Requis | Par défaut   | Description                               |
|------------|-------------|--------|--------------|-------------------------------------------|
| `children` | `ReactNode` | ❌     | `null`       | permet de choisir le composant à afficher |
| `variant`  | `string`    | ❌     | `null`       | permet de choisir le variant              |

---

## 4. 🎨 Variantes / États

- **Variant** :
    - `simple`
    - `double`
    - `fill`

---

## 5. 🧪 Comportements & Interactions

- Comportement dépendent des children

---

## 6. Accessibilité

- Utilisation de la balise native `<hr>` ou rôle `separator`
- Label accessible si texte fourni (`aria-label` ou texte lisible)

---

## 7. 🧩 Présets ou composants dérivés

---

## 8. 🧪 Tests attendus

- [x] Rendu horizontal / vertical
- [x] Présence d’un label si fourni
- [x] Accessibilité (rôle, label)
- [x] Style visuel (épaisseur, couleur, dashed)

---

## 9. 📐 Exemple(s) d’utilisation

```jsx
<Divider>
  <Heading>Notifications</Heading>
</Divider>

<Divider>
  <Button>View All</Button>
  <Button>Active</Button>
  <Button>Inactive</Button>
</Divider>
```
--- 

## 10. Liens utils
[Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=1252-126908&m=dev)

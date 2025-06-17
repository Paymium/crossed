# 📄 Fiche de spécification — `Breadcrumbs`

---

## 1. 🔎 Objectif du composant

- **Nom** : `Breadcrumbs`
- **Rôle** : Afficher la hiérarchie de navigation pour aider l'utilisateur à comprendre où il se trouve
- **Utilisation prévue** : Header de page, navigation secondaire, pages de contenu profond

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Autonome

- **Composants internes utilisés** :
    - `Link`
    - `Icon`
    - `Text`

- **Slots / Children autorisés** :
    - [x] Non

---

## 3. ⚙️ Props attendues

| Prop         | Type                | Requis | Par défaut | Description                                       |
|--------------|---------------------|--------|------------|---------------------------------------------------|
| `items`      | `Array<Breadcrumb>` | ✅     | -          | Liste des éléments du breadcrumb                  |
| `separator`  | `ReactNode`         | ❌     | `/`        | Élément de séparation entre les liens             |
| `onNavigate` | `(item) => void`    | ❌     | -          | Callback personnalisé lors du clic sur un élément |
| `variant`    | `string`            | ❌     | -          | choisis le variant a utilisé                      |

---

## 4. 🎨 Variantes / États

- **separator** :
    - `slash`
    - `chevron`

- **variant** : 
  - `text`
  - `line`
  - `button`

- **États gérés** :
    - [x] `hover`
    - [x] `focus`
    - [x] `active`
    - [ ] `disabled`
    - [x] `current`

---

## 5. 🧪 Comportements & Interactions

- **Clic** : Déclenche une navigation ou un callback si défini
- **Transitions / Animations** :
    - Non (sauf hover doux sur les liens)

---

## 6. Accessibilité

- Respect des rôles et attributs ARIA (`nav`, `aria-current`)
- Liens accessibles au clavier
- Les séparateurs visuels doivent être visuellement présents, mais invisibles pour les lecteurs d’écran :
- Utiliser un élément <nav> avec aria-label="Fil d’Ariane" (ou "Breadcrumb" pour l'anglais) 
- L’élément actif (la page actuelle) doit être marqué avec aria-current="page" 


---

## 7. 🧩 Présets ou composants dérivés


---

## 8. 🧪 Tests attendus

- [x] Test unitaire des props (`items`, `separator`)
- [x] Test de rendu (snapshot)
- [x] Test accessibilité (aria, clavier)
- [ ] Test de raccourcissement (`maxItems`)

---

## 9. 📐 Exemple(s) d’utilisation

```jsx
<Breadcrumbs
  items={[
    { label: 'Accueil', href: '/' },
    { label: 'Produits', href: '/produits' },
    { label: 'Catégorie', href: '/produits/categorie' },
    { label: 'Produit X', isCurrent: true }
  ]}
  separator={<ChevronRightIcon />}
/>
```
---

## 10. Liens utile
[Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=1122-2216&m=dev)
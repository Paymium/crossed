# 📄 Fiche de spécification — `HeaderNavigation`

---

## 1. 🔎 Objectif du composant

- **Nom** : `HeaderNavigation`
- **Rôle** : Menu de navigation principal positionné dans l’en-tête de l’application
- **Utilisation prévue** : Applications simples, sites vitrines, applications à navigation horizontale

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Autonome
    - [x] Composable avec d’autres composants

- **Composants internes utilisés** :
    - `NavItem`
    - `Logo`
    - `Button`
    - `Avatar` (optionnel)

- **Slots / Children autorisés** :
    - [x] Oui

---

## 3. ⚙️ Props attendues

| Prop         | Type         | Requis | Par défaut | Description                                                |
|--------------|--------------|--------|------------|------------------------------------------------------------|
| `items`      | `array`      | ✅     | -          | Liste des liens de navigation (label, href, actif…)        |
| `onNavigate` | `function`   | ❌     | `null`     | Callback déclenché lors de la navigation                   |
| `activePath` | `string`     | ❌     | `null`     | Chemin actif pour styliser l’élément courant               |
| `variant`    | `string`     | ❌     | `null`     | détermine le variant utilisé                               |

---

## 4. 🎨 Variantes / États

- **Variantes visuelles (`variant`)** :
    - `simple`
    - `dual`

- **États gérés** :
    - [x] `hover`
    - [x] `focus`
    - [x] `active`

---

## 5. 🧪 Comportements & Interactions

- **Clic** : Redirige vers une route ou déclenche un callback
- **Transitions / Animations** :
    - Soulignement fluide
    - Transition de couleur sur hover/active

---

## 6. Accessibilité

- Respect des rôles de navigation (`nav`, `aria-label`)
- Support du focus visible
- Annonce correcte de l’élément actif (`aria-current`)

---

## 7. 🧩 Présets ou composants dérivés

---

## 8. 🧪 Tests attendus

- [x] Test unitaire des props
- [x] Test de rendu avec différentes configurations
- [x] Test accessibilité (navigation clavier, focus)
- [x] Test visuel (hover, actif)

---

## 9. 📐 Exemple(s) d’utilisation

```jsx
<HeaderNavigation
  items={[
    { label: "Accueil", href: "/" },
    { label: "Fonctionnalités", href: "/features" },
    { label: "Tarifs", href: "/pricing" },
  ]}
  activePath="/features"
  actions={<UserAvatar />}
  onNavigate={(href) => router.push(href)}
/>
```
---

## 10. Liens utiles
[Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=1550-264633&m=dev)
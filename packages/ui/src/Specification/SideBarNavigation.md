# 📄 Fiche de spécification — `SidebarNavigation`

---

## 1. 🔎 Objectif du composant

- **Nom** : `SidebarNavigation`
- **Rôle** : Permettre une navigation verticale dans l'application
- **Utilisation prévue** : Dashboards, back-offices, applications à menus denses

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Autonome
    - [x] Composable avec d’autres composants

- **Composants internes utilisés** :
    - `NavItem`
    - `Icon`
    - `Text`
    - `Accordion` (optionnel pour les menus imbriqués)

- **Slots / Children autorisés** :
    - [x] Oui

---

## 3. ⚙️ Props attendues

| Prop         | Type         | Requis | Par défaut | Description                                                |
|--------------|--------------|--------|------------|------------------------------------------------------------|
| `items`      | `array`      | ✅     | -          | Liste des éléments de navigation (label, icon, href, etc.) |
| `onNavigate` | `function`   | ❌     | `null`     | Callback lors du clic sur un item                          |
| `activePath` | `string`     | ❌     | `null`     | Permet de définir l’élément actif via le path              |
| `variant`    | `string`     | ❌     | `null`     | détermine le variant utilisé                               |

---

## 4. 🎨 Variantes / États

- **variant** :
    - `simple`
    - `dual`
    - `slim`
    - `withDivider`
    - `widthHeading`

- **États gérés** :
    - [x] `hover`
    - [x] `focus`
    - [x] `active`

---

## 5. 🧪 Comportements & Interactions

- **Clic** : Navigue ou déclenche un callback
- **Transitions / Animations** :
    - Animation du `collapse`/`expand`
    - Animation des hover ou transitions actives

---

## 6. Accessibilité

- Utilisation des rôles `navigation`, `aria-current`, `aria-expanded`
- Navigation clavier (tab, flèches, etc.)

---

## 7. 🧩 Présets ou composants dérivés

---

## 8. 🧪 Tests attendus

- [x] Test unitaire des interactions
- [x] Test de rendu avec et sans items
- [x] Test de l’état `collapsed`
- [x] Test d’accessibilité

---

## 9. 📐 Exemple(s) d’utilisation

```jsx
<SidebarNavigation
  items={[
    { icon: <HomeIcon />, label: "Dashboard", href: "/dashboard" },
    { icon: <SettingsIcon />, label: "Paramètres", href: "/settings" },
  ]}
  activePath="/dashboard"
  onNavigate={(href) => router.push(href)}
  footer={<UserMenu />}
  collapsed={false}
/>

<SideBarNavigation>
  <SideBarNavigation.Header><Search /></SideBarNavigation.Header>
  <SideBarNavigation.Content><Nav /></SideBarNavigation.Content>
  <SideBarNavigation.Footer><Footer></SideBarNavigation.Footer>
</SideBarNavigation>
```
---

## 10. Liens utiles
[Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=1550-264633&m=dev)


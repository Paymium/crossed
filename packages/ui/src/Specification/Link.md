# 📄 Fiche de spécification — `Link`

---

## 1. 🔎 Objectif du composant

- **Nom** : `Link`
- **Rôle** : Fournir une navigation vers une autre page ou section
- **Utilisation prévue** : Navigation principale ou secondaire, liens contextuels dans le texte, CTA discrets

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Autonome

- **Composants internes utilisés** :
    - `Text`

- **Slots / Children autorisés** :
    - [ ] Non

---

## 3. ⚙️ Props attendues

| Prop                 | type         | Requis | Par défaut | Description                                   |
|----------------------|--------------|--------|------------|-----------------------------------------------|
| `href`               | `string`     | ✅      | -          | URL vers laquelle le lien redirige            |
| `external`           | `boolean`    | ❌       | false      | Indique si le lien ouvre une nouvelle fenêtre |
| `onClick`            | `() => void` | ❌        | -          | Callback exécuté au clic                      |
| `variant`            | `string`     | ❌         | default    | permet de choisir le variant                  |
| `disabled`  | `boolean`    | ❌            | false      | Rend le lien inactif visuellement et au clic  |

---

## 4. 🎨 Variantes / États

- **variant** :
    - `default`
    - `colored`
    - `underline`

- **États gérés** :
    - [x] `hover`
    - [x] `focus`
    - [x] `active`
    - [x] `disabled`

---

## 5. 🧪 Comportements & Interactions

- **Clic** : Navigue ou exécute une fonction
- **Transitions / Animations** :
    - Légère animation sur hover ou focus (underline, changement de couleur)

---

## 6. Accessibilité

- Lien accessible via le clavier
- Rôle `link` implicite via `<a>`
- Focus visible
- target="_blank"` + `rel="noopener noreferrer"` si `external` est vrai
- Attributs ARIA pour indiquer `disabled` si nécessaire

---

## 7. 🧩 Présets ou composants dérivés

---

## 8. 🧪 Tests attendus

- [x] Test unitaire des props (`href`, `external`, `variant`)
- [x] Test de rendu (snapshot)
- [x] Test accessibilité (`focus`, `aria-disabled`)
- [ ] Test navigation simulée (si applicable)

---

## 9. 📐 Exemple(s) d’utilisation

```jsx
<Link href="/dashboard">
  Accéder au tableau de bord
</Link>

<Link href="https://external.com" external icon={<ExternalLinkIcon />}>
  Lien externe
</Link>
```
---

## 10. Liens utile
[Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=3287-429423&m=dev)

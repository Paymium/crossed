# 📄 Fiche de spécification — `Card`

---

## 1. 🔎 Objectif du composant

- **Nom** : `Card`
- **Rôle** : Conteneur visuel pour grouper et mettre en valeur un contenu
- **Utilisation prévue** : Dashboard, aperçu de contenu, listes d’éléments, mises en page

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Autonome
    - [x] Composable

- **Composants internes utilisés** :
    - `Text`
    - `Image`
    - `Button`
    - `Icon`

- **Slots / Children autorisés** :
    - [x] Oui

---

## 3. ⚙️ Props attendues

| Prop        | Type       | Requis | Par défaut | Description                                                  |
|-------------|------------|--------|------------|--------------------------------------------------------------|
| `Pressable` | `boolean`  | ❌     | -          | Indique si la carte peut être pressable dans son ensemble    |
| `onClick`   | `function` | ❌     | -          | Rendu cliquable avec action associée (si pressable === true) |
| `as`        | `string`   | ❌     | `div`      | Élément HTML utilisé pour le wrapper (`div`, `a`, etc.)      |
| `size`      | `string`   | ❌     | ``         | Permet de définir des padding et gap différent               |
| `dropDown`  | `DropDown` | ❌     | ``      | Affiche ou non le trigger dropDown                           |

---

## 4. 🎨 Variantes / États

- **États gérés** :
    - [x] `hover`
    - [x] `focus`
    - [x] `active`

---

## 5. 🧪 Comportements & Interactions

- **Clic** : Possible si `onClick` est défini
- **Transitions / Animations** : Oui (hover / focus avec ombres et bordures)

---

## 6. Accessibilité

- Respecter les rôles (`article`, `link`, `button`) selon le contexte
- `tabIndex` si la carte est interactive
- `aria-pressed` ou `aria-selected` si nécessaire

---

## 7. 🧩 Présets ou composants dérivés

- **Composants dérivés** :
    - `Metrics`
    - `InlineCTA`
    - `ButtonCard`

---

## 8. 🧪 Tests attendus

- [x] Test unitaire des props critiques
- [x] Test de rendu
- [ ] Test accessibilité (focus, rôles)
- [ ] Test visuel

---

## 9. 📐 Exemple(s) d’utilisation

```jsx
<Card variant="outline" shadow onClick={() => alert('Clicked!')}>
  <h3>Card title</h3>
  <p>Content goes here</p>
</Card>
```
---

## 10. Lien Utile
Plusieurs type de carte existe

[metrics](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=1561-265555&m=dev)

[inlineCTA](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=127-2907&p=f&m=dev)
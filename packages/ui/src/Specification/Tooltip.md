# 📄 Fiche de spécification — `Tooltip`

---

## 1. 🔎 Objectif du composant

- **Nom** : `Tooltip`
- **Rôle** : Fournir des informations complémentaires ou descriptives sur un élément au survol (hover) ou au focus.
- **Utilisation prévue** :
    - Expliquer des icônes ou actions ambiguës
    - Donner des indications supplémentaires sans alourdir l’interface

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Autonome
    - [x] Composable 

- **Structure interne** :
    - Un `wrapper` qui contient l’élément déclencheur
    - Une `Floating` flottant positionné dynamiquement

- **Slots / Children autorisés** :
    - `Trigger`

---

## 3. ⚙️ Props attendues

| Prop            | Type                         | Requis | Par défaut | Description                                          |
|-----------------|------------------------------|--------|------------|------------------------------------------------------|
| `content`       | `string` \| `ReactNode`      | ✅     | —          | Contenu du tooltip affiché à l’utilisateur           |
| `children`      | `ReactElement`               | ✅     | —          | Élément déclencheur (doit accepter un ref)          |
| `placement`     | `"top"`, `"bottom"`, `"left"`, `"right"` | ❌ | `"top"`   | Position du tooltip par rapport à l’élément         |
| `disabled`      | `boolean`                    | ❌     | `false`    | Désactive le tooltip                                 |
| `open`          | `boolean`                    | ❌     | —          | Contrôle manuel d’ouverture                          |
| `onOpenChange`  | `(open: boolean) => void`    | ❌     | —          | Callback à l’ouverture/fermeture                     |

---

## 4. 🎨 Variantes / États

- **Variant** : 
    - default
    - indicator : Avec indicateur triangulaire ou non

- **Placements** :
    - `top`, `bottom`, `left`, `right`, `top-start`, `top-end`, `bottom-start`, `bottom-end`

- **Transitions** :
    - Fade in/out
    - Scale léger

- **États gérés** :
    - Affiché (`open`)
    - Masqué
    - Focus visible (accessibilité clavier)
    - Désactivé (`disabled`)

---

## 5. 🧪 Comportements & Interactions

- **Affichage** :
    - Au survol (mouse hover)
    - Au focus (clavier)
    - Au click
    - Ouverture contrôlée (si `open` est fourni)

- **Masquage** :
    - Mouse leave
    - Blur
    - onclick

---

## 6. Accessibilité

- Le tooltip doit être associé à un élément déclencheur (ex: bouton, icône) via :
  - `aria-describedby="id-tooltip"` sur l’élément déclencheur
- Le contenu du tooltip doit avoir un `id` unique correspondant à `aria-describedby`
- Le tooltip doit être visible uniquement quand l’élément est focusé ou survolé (hover/focus)
- Support clavier pour afficher/cacher le tooltip (ex: focus, `Esc` pour fermer)
- Le tooltip ne doit pas apparaître de manière persistante pour éviter la surcharge d’informations

---

## 7. 🧩 Présets ou composants dérivés


---

## 8. 🧪 Tests attendus

- [x] Affichage au hover / focus
- [x] Delay respecté
- [x] Position correcte selon `placement`
- [x] Support de contenu long ou riche
- [x] Accessibilité ARIA
- [x] Interaction clavier

---

## 9. 📐 Exemple(s) d’utilisation

```jsx
// Simple tooltip
<Tooltip content="Supprimer">
  <button aria-label="Supprimer">
    <TrashIcon />
  </button>
</Tooltip>

// Placement à droite
<Tooltip content="Profil" placement="right">
  <Avatar />
</Tooltip>

// Tooltip contrôlé manuellement
<Tooltip content="Info" open={show} onOpenChange={setShow}>
  <InfoIcon />
</Tooltip>
```
---

## 10. Liens utile
- [Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=1538-270360&m=dev)

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

- **Accessibilité** :
    - `role="tooltip"` requis
    - `aria-describedby` associé à l’élément trigger
    - Doit être focusable si interactif

---

## 6. 🧩 Présets ou composants dérivés


---

## 7. 🧪 Tests attendus

- [x] Affichage au hover / focus
- [x] Delay respecté
- [x] Position correcte selon `placement`
- [x] Support de contenu long ou riche
- [x] Accessibilité ARIA
- [x] Interaction clavier

---

## 8. 📐 Exemple(s) d’utilisation

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

## 9. Liens utile
- [Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=1538-270360&m=dev)

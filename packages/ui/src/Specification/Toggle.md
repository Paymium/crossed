# 📄 Fiche de spécification — `Toggle`

---

## 1. 🔎 Objectif du composant

- **Nom** : `Toggle` (ou `Switch`)
- **Rôle** : Permettre à l’utilisateur d’activer ou désactiver une fonctionnalité (état binaire ON/OFF)
- **Utilisation prévue** :
    - Paramètres utilisateur (ex : Notifications ON/OFF)
    - Contrôle de fonctionnalités ou préférences (ex : Mode sombre, Mute)
    - Réglages rapides (souvent en mobile)

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Autonome
    - [x] Composable 

- **Composants internes utilisés** :
    - `button` ou `input[type="checkbox"]`
    - Visuel de piste (`track`) et curseur (`thumb`)
    - `Text` label
    - `Text` descriptif 

- **Slots / Children autorisés** :
    - 

---

## 3. ⚙️ Props attendues

| Prop        | Type                         | Requis | Par défaut | Description                                    |
|-------------|------------------------------|--------|------------|------------------------------------------------|
| `checked`   | `boolean`                    | ✅     | —          | État actif (ON/OFF)                            |
| `onChange`  | `(checked: boolean) => void` | ✅     | —          | Callback déclenché lors d’un changement d’état |
| `disabled`  | `boolean`                    | ❌     | `false`    | Désactive les interactions                     |
| `size`      | `string`                     | ❌     | `"sm"`      | Taille du toggle                               |
| `label`     | `string`                     | ❌     | —          | Label texte pour accessibilité / usage combiné |
| `extra`     | `string`                     | ❌     | —          | Text additionel                                |

---

## 4. 🎨 Variantes / États

- **Taille (`size`)** :
    - `sm`
    - `md` 

- **États visuels gérés** :
    - [x] Actif (`checked`)
    - [x] Inactif
    - [x] Désactivé (`disabled`)
    - [x] Focus (pour accessibilité clavier)
    - [x] Hover


---

## 5. 🧪 Comportements & Interactions

- **Click / Tap** :
    - Change l’état de `checked`
    - Déclenche `onChange`

- **Clavier** :
    - Utilisation de la touche `Espace` ou `Entrée` pour activer/désactiver
    - `tabIndex` pour navigation


---

## 6. Accessibilité

- Utiliser l’élément natif `<input type="checkbox">` si possible
- Sinon, utiliser un élément avec `role="switch"` pour un composant custom
- Fournir `aria-checked="true"` ou `false` selon l’état du toggle
- Ajouter un `aria-label`, `aria-labelledby` ou associer un `<label>` visible
- Support de la navigation clavier :
  - `Tab` pour focus
  - `Space` pour changer l’état
- Texte explicite ou contextuel sur l’usage du toggle (ex: "Activer les notifications")
- Si le switch est désactivé : ajouter l’attribut `disabled` ou `aria-disabled="true"`
---

## 7. 🧩 Présets ou composants dérivés


---

## 8. 🧪 Tests attendus

- [x] Affichage ON / OFF correct
- [x] Interaction souris / clavier
- [x] Désactivation complète via `disabled`
- [x] Accessibilité avec screen reader (`aria-*`, `label`)

---

## 9. 📐 Exemple(s) d’utilisation

```jsx
// Basique
<Toggle checked={enabled} onChange={setEnabled} />

// Avec label
<Toggle checked={enabled} onChange={setEnabled} label={"Remember me"} />

// Avec label et extra
<Toggle checked={enabled} onChange={setEnabled} label={"Remember me"} extra={"Save my login details for the next time"}/>
```
---

## 10. Liens utile
- [Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=1102-4181&m=dev)

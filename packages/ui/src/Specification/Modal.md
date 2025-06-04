# 📄 Fiche de spécification — `Modal`

---

## 1. 🔎 Objectif du composant

- **Nom** : `Modal`
- **Rôle** : Fenêtre secondaire pour afficher du contenu, demander une action ou fournir des informations complémentaires.
- **Utilisation prévue** : Formulaires, confirmations, messages contextuels, affichage de contenu détaillé.

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Autonome
    - [x] Composable 

- **Composants internes utilisés** :
    - `Floating`
    - `Overlay`
    - `Header`
    - `CloseButton`
    - `Title`
    - `Body`
    - `Footer`

- **Slots / Children autorisés** :
    - [x] Oui
    - **Détail** : Slot pour le header, body, footer ou contenu libre.

---

## 3. ⚙️ Props attendues

| Prop              | Type       | Requis | Par défaut | Description                                                                                                     |
|-------------------|------------|--------|-----------|-----------------------------------------------------------------------------------------------------------------|
| `open`            | `boolean`  | ✅     | -         | Contrôle d’ouverture de la modal                                                                                |
| `onClose`         | `function` | ✅     | -         | Callback pour fermer la modal                                                                                   |
| `title`           | `string`   | ❌     | -         | Titre affiché dans l’en-tête                                                                                    |
| `description`     | `string`   | ❌     | -         | Description facultative                                                                                         |
| `size`            | `"sm"      | "md" | "lg"      | "xl"`                                                                                                           | ❌ | `"md"` | Taille de la modal                                 |
| `adapt`           | `boolean`  | ❌     | `false`   | gère l'affichage responsive (pas de sheet sur browser)                                                          |
| `closable`        | `boolean`  | ❌     | `true`    | Affiche ou non le bouton de fermeture, gère également le comportement au press du overlay ou gesture sur mobile |
| `initialFocusRef` | `Ref`      | ❌     | -         | Élément qui reçoit le focus à l’ouverture                                                                       |

---

## 4. 🎨 Variantes / États

- **Variantes visuelles** :
    - `error`
    - `warning`
    - `success`
    - `icon`
    - `none`
    - 

- **États gérés** :
    - [x] `open`
    - [x] `closed`
    - [x] `loading` (optionnel selon le contenu)

---

## 5. 🧪 Comportements & Interactions

- **Ouverture** : Affiche l’overlay et le contenu modal
- **Fermeture** : Clic sur overlay (si closable), bouton close ou `ESC`
- **Focus trap** : Empêche le focus de sortir de la modal
- **Transitions / Animations** : Oui, entrée/sortie en fondu ou glissement

---

## 6. Accessibilité

- `role="dialog"` et `aria-modal="true"`
- Focus piégé à l’intérieur de la modal
- Focus initial sur élément important (ou transmis par `initialFocusRef`)
- Échappement via `ESC` pris en charge
- Lien sémantique entre `title`, `description` et le contenu (`aria-labelledby`, `aria-describedby`)
- Navigation clavier complète

---

## 7. 🧩 Présets ou composants dérivés

- **Composants dérivés** :
    - `ConfirmationModal`
    - `warningModal`
    - `ErrorModal`
    - `Preset`
- **Créés à partir de** : `Modal` avec composition personnalisée via props ou slots

---

## 8. 🧪 Tests attendus

- [x] Test ouverture/fermeture
- [x] Test accessibilité (`aria-*`, focus trap)
- [x] Test navigation clavier (`Tab`, `Shift+Tab`, `ESC`)
- [x] Test affichage conditionnel (titre, description, closable)
- [x] Test responsive (plein écran ou taille définie)

---

## 9. 📐 Exemple(s) d’utilisation

```jsx
<Modal open={isOpen} onClose={handleClose}>
  <Modal.Header>
    <Headline>Complete your profile</Headline>
    <CloseButton/>
  </Modal.Header>
  <Modal.Body>
    <Content/>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>Annuler</Button>
    <Button variant="Primary" onClick={handleDelete}>Publish</Button>
  </Modal.Footer>
</Modal>
```
---

## 10. Liens utile
[Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=1547-264666&m=dev)
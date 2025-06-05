# 📄 Fiche de spécification — `Sheet`

---

## 1. 🔎 Objectif du composant

- **Nom** : `Sheet`
- **Rôle** : Panneau coulissant qui affiche du contenu secondaire sans quitter la page principale
- **Utilisation prévue** : Formulaire rapide, affichage de détails, paramètres, menus contextuels

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Autonome
    - [x] Composable avec d’autres composants

- **Composants internes utilisés** :
    - `Overlay`
    - `Panel`
    - `CloseButton`
    - `Header`, `Footer` (optionnels)

- **Slots / Children autorisés** :
    - [x] Oui

---

## 3. ⚙️ Props attendues

| Prop          | Type        | Requis | Par défaut | Description                                       |
|---------------|-------------|--------|------------|---------------------------------------------------|
| `open`        | `boolean`   | ✅     | `false`    | Contrôle l’ouverture ou la fermeture du panneau   |
| `onClose`     | `function`  | ✅     | -          | Callback déclenché lors de la fermeture           |
| `withOverlay` | `boolean`   | ❌     | `true`     | Affiche un fond sombre derrière le panneau        |
| `closable`        | `boolean`  | ❌     | `true`    | Affiche ou non le bouton de fermeture, gère également le comportement au press du overlay ou gesture sur mobile |
| `initialFocusRef` | `Ref`      | ❌     | -         | Élément qui reçoit le focus à l’ouverture                                                                       |

---

## 4. 🎨 Variantes / États

- **États gérés** :
    - [x] `open`
    - [x] `closed`
    - [x] `disabled` (interaction bloquée)

---

## 5. 🧪 Comportements & Interactions

- **Clic** : Fermeture via croix, bouton d’action ou clic sur overlay si autorisé
- **Transitions / Animations** :
    - Animation de slide depuis le côté choisi
    - Fade pour l’overlay

---

## 6. Accessibilité

- Utiliser `aria-labelledby` et `aria-describedby` pour contextualiser le contenu
- Focus trap et retour du focus à la fermeture

---

## 7. 🧩 Présets ou composants dérivés

- **Composants dérivés** :
    - `Preset` utiliser pour des Sheet "classique"
- **Créés à partir de** : `Sheet` avec contenu et logique métier intégrés

---

## 8. 🧪 Tests attendus

- [x] Ouverture / fermeture contrôlée
- [x] Test du focus trap
- [x] Test accessibilité (dialogue ARIA)
- [x] Test des différentes positions et tailles

---

## 9. 📐 Exemple(s) d’utilisation

```jsx
<Sheet open={open} onClose={() => setOpen(false)} position="left" size="lg">
  <SheetHeader>
    <h2>Paramètres</h2>
  </SheetHeader>
  <SheetBody>
    <Form />
  </SheetBody>
  <SheetFooter>
    <Button onClick={handleSave}>Enregistrer</Button>
  </SheetFooter>
</Sheet>
```
---

## 10. Liens utile
[Figma](https://www.figma.com/design/C63d1IdiWFQCoal3EvqIrG/Paymium-App-V.2?node-id=63-33364&m=dev)
# 📄 Fiche de spécification — `Button`

---

## 1. 🔎 Objectif du composant

- **Nom** : `Button`
- **Rôle** : Les boutons indiquent les actions que les utilisateurs peuvent entreprendre.
- **Utilisation prévue** : Sur les formulaires, dans les modales, dans les cartes produits, etc.

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Autonome
    - [x] Composable

- **Composants internes utilisés** :
    - `Icon` (optionnel si Text)
    - `Text` (optionnel si Icone)

- **Slots / Children autorisés** :
    - [x] Oui
    - **Détail** : `children` utilisé pour afficher le texte ou le contenu HTML du bouton.

---

## 3. ⚙️ Props attendues

| Prop        | Type           | Requis | Par défaut | Description                                 |
|-------------|----------------|--------|------------|---------------------------------------------|
| `variant`   | `string`       | ❌     | `primary`  | Style visuel (`primary`, `secondary`, etc.) |
| `size`      | `string`       | ❌     | `md`       | Taille (`sm`, `md`, `lg`)                   |
| `onPress`   | `function`     | ✅     | -          | Fonction déclenchée au clic                 |
| `disabled`  | `boolean`      | ❌     | `false`    | Désactive l'interaction                     |
| `loading`   | `boolean`      | ❌     | `false`    | Affiche un spinner, désactive le bouton     |
| `iconLeft`  | `ReactNode`    | ❌     | `null`     | Icône affichée à gauche du texte            |
| `iconRight` | `ReactNode`    | ❌     | `null`     | Icône affichée à droite du texte            |
| `alignSelf` | `string`       | ❌     | ``   | alignement du button                        |
| `style`     | `crossMethode` | ❌     | ``   | style aditionel                             |
| `text`      | `string`       | ❌     | ``   | texte a l'intérieur du button               |

---

## 4. 🎨 Variantes / États

- **Variantes (`variant`)** :
    - `primary`
    - `secondary`
    - `tertiary`
    - `danger`

- **Taille (`size`)** :
    - `sm`
    - `md`
    - `lg`
    - `xl`

- **États gérés** :
    - [x] `hover`
    - [x] `focus`
    - [x] `disabled`
    - [x] `loading`

---

## 5. 🧪 Comportements & Interactions

- **Clic** : Déclenche `onClick` si `!disabled && !loading`
- **Transitions / Animations** :
    - Transition de couleur et d’ombre au `hover/focus`
    - Affichage conditionnel du spinner avec transition douce

---

## 6. Accessibilité

- Navigation clavier supportée (`Tab`, `Enter`, `Space`)
- Focus visible (`:focus-visible` recommandé ou alternative accessible)
- Utilisation de l’attribut `disabled` natif pour l'état désactivé
- Utilisation de `aria-pressed` si bouton à état toggle
- Utilisation de `aria-controls` et `aria-expanded` si bouton déclencheur (ex : menu, accordéon)
- Contraste texte/fond respectant le minimum WCAG (≥ 4.5:1)
- Utilisation de `aria-busy` ou `aria-disabled` en cas d’état de chargement personnalisé
- Utilisation de `aria-describedby` si besoin d’un complément d’information

---

## 7. 🧩 Présets ou composants dérivés

- **Composants dérivés** :
    - `PrimaryButton` (bouton accentué)
    - `IconButton` (bouton avec seulement une icône)

- **Créés via** : des wrappers avec props préconfigurées

---

## 8. 🧪 Tests attendus

- [x] Test `onClick` appelé si cliquable
- [x] Test `disabled` empêche les interactions
- [x] Test du rendu du `spinner` en `loading`
- [ ] Test accessibilité avec axe ou jest-axe

---

## 9. 📐 Exemple(s) d’utilisation

```jsx
<Button variant="primary" onPress={handleClick} text={"Valider"} />
<Button 
  variant="primary" 
  onPress={handleClick} 
  text={"Valider"} 
  iconLeft={<Icone/>} 
  disabled={disabled} 
  loading={loading}
/>

<Button variant="primary" onPress={handleClick}>
  <Button.Text>Valider</Button.Text>
</Button>

<Button onClick={handleDelete}>
  <Button.Text>Valider</Button.Text>
  <Button.Icone><Icone /></Button.Icone>
</Button>

```
---

## 10 Liens utile 
- [Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=1-1183&p=f&m=dev)
# 📄 Fiche de spécification — `Notification` | `Toatser`

---

## 1. 🔎 Objectif du composant

- **Nom** : `Notification`
- **Rôle** : Afficher des messages périphériques pour informer ou alerter l’utilisateur
- **Utilisation prévue** : Feedback système, alertes légères, confirmations d’actions, erreurs passagères

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Autonome
    - [x] Composable

- **Composants internes utilisés** :
    - `Icon`
    - `Text`
    - `Button` (fermeture ou action secondaire)

- **Slots / Children autorisés** :
    - [x] Oui
    - **Détail** : contenu libre ou structuré (titre, message, action)


---

## 3. ⚙️ Props attendues

| Prop         | Type         | Requis | Par défaut  | Description                                  |
|--------------|--------------|--------|-------------|----------------------------------------------|
| `variant`    | `string`     | ❌     | `info`      | Type de notification |
| `title`      | `string`     | ❌     | `null`      | Titre de la notification                     |
| `message`    | `string`     | ✅     | -           | Message principal                            |
| `icon`       | `ReactNode`  | ❌     | `null`      | Icône optionnelle                            |
| `closable`   | `boolean`    | ❌     | `true`      | Affiche un bouton de fermeture               |
| `onClose`    | `function`   | ❌     | `null`      | Callback lors de la fermeture                |
| `duration`   | `number`     | ❌     | `5000`      | Durée d’affichage automatique (en ms)        |
| `position`   | `string`     | ❌     | `top-right` | Position à l’écran : `top-left`, `top-right`, etc. |

---

## 4. 🎨 Variantes / États

- **Variantes visuelles (`variant`)** :
    - `image`
    - `default`
    - `success`
    - `error`
    - `warning`
    - `noIcon`
    - `GrayIcon`

- **États gérés** :
    - [x] `visible`
    - [x] `hidden`
    - [x] `hover`
    - [x] `focus` (si actions interactives)

---

## 5. 🧪 Comportements & Interactions

- **Clic** : bouton de fermeture ou action secondaire
- **Transitions / Animations** : Oui (slide ou fade à l’apparition/disparition)

---

## 6. Accessibilité

- `role="status"` pour les notifications informatives
- `role="alert"` pour les notifications critiques (erreurs, avertissements)
- Fermeture accessible au clavier (`Tab`, `Enter`, `Esc`)
- Annonce via screen reader si possible (`aria-live="polite"` ou `assertive`)

---

## 7. 🧩 Présets ou composants dérivés

- **Composants dérivés** :
    - `Toast`
    - `ErrorNotification`
- **Créés à partir de** : `Notification` avec configuration prédéfinie

---

## 8. 🧪 Tests attendus

- [x] Test unitaire des props critiques
- [x] Test de rendu (snapshot)
- [x] Test accessibilité (rôles, live region, fermeture clavier)

---

## 9. 📐 Exemple(s) d’utilisation

```jsx
<Notification
  variant="success"
  title="Succès"
  message="Votre profil a bien été mis à jour."
  duration={3000}
/>

<Notification
  variant="error"
  message="Échec de l’enregistrement."
  closable
  onClose={() => console.log('fermé')}
/>
```
---

## 10. Liens utile
[Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=1135-1960&m=dev)
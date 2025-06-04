# 📄 Fiche de spécification — `Alert`

---

## 1. 🔎 Objectif du composant

- **Nom** : `Alert`
- **Rôle** : Afficher un message d'information, de succès, d'erreur ou d'avertissement
- **Utilisation prévue** : Feedback utilisateur, information non bloquante, avertissement système

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Autonome
    - [x] Composable avec d’autres composants

- **Composants internes utilisés** :
    - `Icon`
    - `Text`
    - `Button` (optionnel pour close / action)

- **Slots / Children autorisés** :
    - [x] Oui
    - **Détail** : slot pour contenu libre ou children pour texte personnalisé

---

## 3. ⚙️ Props attendues

| Prop          | Type        | Requis | Par défaut | Description                                                                      |
|---------------|-------------|--------|------------|----------------------------------------------------------------------------------|
| `variant`     | `string`    | ❌     | `default`  | couleur de l'icone                                                               |
| `icon`        | `ReactNode` | ❌     | `null`     | Icône personnalisée                                                              |
| `title`       | `string`    | ❌     | `null`     | Titre optionnel                                                                  |
| `description` | `string`    | ❌     | `null`     | Texte secondaire                                                                 |
| `closable`    | `boolean`   | ❌     | `false`    | Affiche ou non un bouton de fermeture                                            |
| `onClose`     | `function`  | ❌     | `null`     | Callback lors de la fermeture                                                    |
| `action`      | `ReactNode` | ❌     | `null`     | Bouton ou élément interactif complémentaire                                      |
| `fullWidth`   | `boolean`   | ❌     | `false`    | change l'affichage pour passer d'une floating a conteur prenant toute la largeur |


---

## 4. 🎨 Variantes / États

- **Variantes visuelles (`variant`)** :
    - `default`
    - `gray`
    - `brand`
    - `success`
    - `error`
    - `warning`

- **États gérés** :
    - [x] `visible`
    - [x] `hidden`
    - [x] `hover`
    - [x] `focus` (si action ou bouton)
    - [x] `disabled` (si action)

---

## 5. 🧪 Comportements & Interactions

- **Clic** : sur bouton de fermeture ou action complémentaire
- **Transitions / Animations** : Oui (fade in/out sur apparition/disparition)

---

## 6. Accessibilité

- `role="alert"` pour les messages importants (error, warning)
- `role="status"` pour les messages non bloquants (info, success)
- Focus visible sur les éléments interactifs
- Bouton de fermeture accessible via clavier (`aria-label="Fermer"`)

---

## 7. 🧩 Présets ou composants dérivés

- **Composants dérivés** :
    - `ErrorAlert`
    - `SuccessAlert`
- **Créés à partir de** : `Alert` avec `variant` et contenu prédéfini

---

## 8. 🧪 Tests attendus

- [x] Test unitaire des props critiques
- [x] Test de rendu (snapshot)
- [x] Test accessibilité (focus, rôle, clavier)
- [ ] Test visuel si besoin

---

## 9. 📐 Exemple(s) d’utilisation

```jsx
<Alert variant="error" title="Erreur de connexion" description="Veuillez vérifier vos identifiants." closable onClose={handleClose} />

<Alert variant="success">
  <strong>Succès !</strong> Votre profil a bien été mis à jour.
</Alert>
```

---
## 10. Liens utile
[figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=1135-1960&m=dev)
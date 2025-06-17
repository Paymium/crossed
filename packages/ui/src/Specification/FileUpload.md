# 📄 Fiche de spécification — `FileUploader`

---

## 1. 🔎 Objectif du composant

- **Nom** : `FileUploader`
- **Rôle** : Permettre à l’utilisateur de téléverser un ou plusieurs fichiers.
- **Utilisation prévue** : Formulaires, modales, ou upload autonome.

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [] Autonome

- **Composants internes utilisés** :
    - `Button`
    - `Icon`
    - `Text`
    - `ProgressBar` (optionnel)
    - `FileItem` (liste des fichiers)

- **Slots / Children autorisés** :

---

## 3. ⚙️ Props attendues

'un| Prop          | Type                      | Requis | Par défaut | Description                                         |
|---------------|---------------------------|--------|------------|-----------------------------------------------------|
| `multiple`    | `boolean`                 | ❌     | `false`    | Permet l’upload de plusieurs fichiers               |
| `accept`      | `string`                  | ❌     | `*`        | Types de fichiers acceptés (`.png,.pdf,image/*`)    |
| `onChange`    | `(files: File[]) => void` | ✅ | -          | Callback déclenché à la sélection/téléversement     |
| `disabled`    | `boolean`                 | ❌     | `false`    | Désactive la zone de drop/click                     |
| `dragAndDrop` | `boolean`                 | ❌     | `true`     | Active la fonctionnalité de drag & drop             |
| `uploading`   | `boolean`                 | ❌     | `false`    | Affiche l’état de chargement (ex: spinner/progress) |
| `fileList`    | `File[]`                  | ❌     | `[]`       | Liste des fichiers sélectionnés ou déjà uploadés    |
| `variant`     | `string`                  | ❌     | `bar`      | Permet de choisir le rendu bar ou fill              |
| `status`      | `string`                  | ❌     | `empty`    | gère l'état de la télversion                        |
---

## 4. 🎨 Variantes / États

- **variant** :
  - `bar` : affiche une progressBar
  - `fill` la progression est visible via le background qui change de couleur de manière progressive

- **Status** : 
    -  `uploading`
    -  `error`
    -  `completed`
    -  `empty`

- **États gérés** :
    - [x] `hover`
    - [x] `focus`
    - [x] `dragover`
    - [x] `disabled`
   

---

## 5. 🧪 Comportements & Interactions

- **Drag & Drop** : Glisser-déposer avec retour visuel
- **Click** : Clic sur la zone déclenche la fenêtre de sélection
- **Preview (optionnel)** : Affiche les fichiers sélectionnés
- **Transitions / Animations** :
    - Animation légère sur `dragenter/leave`
    - Chargement progressif avec `ProgressBar` si applicable

---

## 6. Accessibilité

- Input type="file"
- Zone interagissable avec clavier (`tabIndex`, `role="button"`)
- Texte d’aide descriptif (`aria-describedby`)
- Statut d’upload lisible (`aria-live="polite"`)
- Boutons de suppression marqués avec `aria-label`
- Support des navigateurs avec ou sans drag & drop
- pour une zone de drag & drop role="buton" ou "region" ainsi qu'un "aria-label"
- une fois le document téléversé ajouté un aria-describedby="filename"
- erreur claire pour les fichier non géré

---

## 7. 🧩 Présets ou composants dérivés

---

## 8. 🧪 Tests attendus

- [x] Upload simple avec clic
- [x] Upload avec drag & drop
- [x] Test accessibilité clavier + ARIA
- [x] Test upload multiples / fichiers interdits
- [x] Test d’annulation ou suppression de fichier

---

## 9. 📐 Exemple(s) d’utilisation

```jsx
<FileUploader
  multiple
  accept=".png,.jpg"
  onChange={(files) => handleUpload(files)}
  variant={"fill"}
/>
```
---

## 10. Liens Utile
[Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=1175-101146&m=dev)

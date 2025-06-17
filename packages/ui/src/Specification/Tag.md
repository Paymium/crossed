# 📄 Fiche de spécification — `Tag`

---

## 1. 🔎 Objectif du composant

- **Nom** : `Tag`
- **Rôle** : Représenter un élément sélectionné, une catégorie, un filtre actif, ou une action utilisateur dans un format compact.
- **Utilisation prévue** :
    - Sélection multiple (ex : tags dans un champ de saisie)
    - Filtres (ex : filtres actifs dans une interface de recherche)
    - Visualisation d’éléments choisis (ex : intérêts, mots-clés)
    - Actions secondaires (ex : clic pour naviguer ou supprimer)

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Autonome
    - [x] Composable 

- **Composants internes utilisés** :
    - `Icon` (optionnel)
    - `Text` (label)
    - `Conteur` (optionnel)
    - `Checkbox`(optionnel)

- **Slots / Children autorisés** :
    - [x] Oui — `children` ou `label`
    - Peut contenir :
        - Un texte
        - Une icône à gauche
        - Un bouton de suppression à droite
        - une CheckBox comme première élement 

---

## 3. ⚙️ Props attendues

| Prop       | Type         | Requis | Par défaut | Description                            |
|------------|--------------|--------|------------|----------------------------------------|
| `label`    | `string`     | ✅     | —          | Texte du tag                           |
| `variant`  | `string`     | ❌     | `default`  | Style                                  |
| `size`     | `"string"    | ❌     | `sm`       | Taille du tag                          |
| `closable` | `boolean`    | ❌     | `false`    | Affiche une icône de fermeture         |
| `onClose`  | `() => void` | ❌     | —          | Callback lors du clic sur la croix     |
| `icon`     | `ReactNode`  | ❌     | `null`     | Icône affichée avant le label          |
| `count`    | `number`     | ❌     | -          | Affiche un compteur a la fin du tag    |
| `selected` | `boolean`    | ❌     | `false`    | Affiche le tag comme actif/sélectionné |
| `onClick`  | `() => void` | ❌     | —          | Rend le tag cliquable (ex : filtre)    |

---

## 4. 🎨 Variantes / États

- **Variants (`variant`)** :
    - `default` sans checkbox
    -  `checkbox` avec checkBox

- **Taille (`size`)** :
    - `sm` (compact, 24px)
    - `md` (standard, 32px)
    - `lg` (grand, 40px — rare)

- **États gérés** :
    - `selected` (quand checkbox coché)

---

## 5. 🧪 Comportements & Interactions

- **Clic principal** (`onClick`) :
    - Peut activer/désactiver un état `selected`
    - Peut servir de filtre ou de navigation

- **Clic sur la croix** (`onClose`) :
    - Supprime ou retire le tag


---

## 6. Accessibilité

- Utilisation d’un rôle sémantique adapté selon le type de tag :
  - `role="button"` si le tag est cliquable
  - `role="option"` si utilisé dans un groupe sélectionnable
- Si le tag est supprimable, ajouter un bouton interne avec `aria-label="Supprimer [nom du tag]"`
- Texte visible lisible par les lecteurs d’écran
- Support de la navigation clavier :
  - `Tab` pour focus
  - `Enter` ou `Space` pour déclencher une action
  - `Backspace` ou `Delete` pour supprimer, si pertinent
  - si liste de tag le contener doit avoir le role "liste" et les tag "listitem"
- Utilisation de `aria-selected="true"` si le tag est sélectionné dans une liste
- Focus clair et visible sur chaque tag interactif
- Utilisation de `aria-describedby` si des instructions complémentaires sont nécessaires
---

## 7. 🧩 Présets ou composants dérivés

- `InputTagField` : champ d'entrée multivaleurs avec `Tag` générés
- `RemovableTag` : preset avec `closable: true`

---

## 8. 🧪 Tests attendus

- [x] Fonctionnement du `closable` + `onClose`
- [x] Clic cliquable si `onClick`
- [x] Accessibilité clavier et ARIA

---

## 9. 📐 Exemple(s) d’utilisation

```jsx
<Tag label="React" variant="default" />

<Tag label="Supprimer" variant="default" closable onClose={() => alert("Supprimé")} />

<Tag label="Filtre actif" selected variant={'checkbox'} onClick={() => toggleFilter()} />

```
---

## 10. Liens utile
- [Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=3309-406742&m=dev)
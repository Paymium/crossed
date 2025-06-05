# 📄 Fiche de spécification — `Badge`

---

## 1. 🔎 Objectif du composant

- **Nom** : `Badge`
- **Rôle** : Afficher une information complémentaire, secondaire ou un indicateur visuel (ex : statut, notification, label).
- **Utilisation prévue** :
    - Indiquer un nombre de notifications ou d’éléments non lus
    - Signaler un statut (ex : "nouveau", "en cours", "terminé")
    - Accompagner du texte ou des composants (ex : dans une carte ou une liste)

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Autonome
    - [x] Composable 

- **Composants internes utilisés** :
    - `Text` optionnel si icon
    - `Icon` optionnel si text

- **Slots / Children autorisés** :
    - [x] Oui — contenu du badge (texte, nombre, icône)
    - Peut contenir :
        - un texte
        - une icône

---

## 3. ⚙️ Props attendues

| Prop        | Type           | Requis | Par défaut | Description                        |
|-------------|----------------|--------|------------|------------------------------------|
| `variant`   | `string`       | ❌     | `default`  | Style du badge                     |
| `color`     | `string`       | ❌     | `default`  | Style du badge                     |
| `label`     | `string`       | ❌     | ``         | text a l'intérieur du badge        |
| `size`      | `string`       | ❌     | `sm`       | Taille du badge (`sm`, `md`, `lg`) |
| `iconLeft`  | `ReactNode`    | ❌     | `null`     | Icône affichée avant le texte      |
| `iconRight` | `ReactNode`    | ❌     | `null`     | Icône affichée après le texte      |

---

## 4. 🎨 Variantes / États

- **Variantes (`variant`)** :
    - `pill`
    - `default`
    - `modern`

- **Taille (`size`)** :
    - `sm`
    - `md`
    - `lg`
- **Colors (`color`)** :
    - `gray`
    - `brand`
    - `error`
    - `warning`
    - `success`
    - `grayBlue`
    - `blueLight`
    - `blue`
    - `indigo`
    - `purple`
    - `pink`
    - `orange`

---

## 5. 🧪 Comportements & Interactions

- **Statique** — ne déclenche pas d’action
- Peut être animé à l’apparition

---

## 6. Accessibilité

---

## 7. 🧩 Présets ou composants dérivés

- `NotificationBadge` : badge avec un icon `dot` 
- `StatusBadge` : avec `variant` dynamique (selon un statut : actif, en pause...)
- `LabelBadge` : texte court (type "Beta", "Admin", "Urgent")
- `BadgeGroup` : un badge au debut ou a la fin d'un autre badge le badge a l'intérieur a un backgroundColor different mais un text de la même couleurs que le badge parent Variant modern ou pill uniquement 

---

## 8. 🧪 Tests attendus


---

## 9. 📐 Exemple(s) d’utilisation

```jsx
// Label simple
<Badge variant="pill" label={Nouveau} />

// avec Icone
<Badge variant={'default'} color={"warning"} size={'lg'} >
  <Badge.Icon>
    <BellIcon />
  </Badge.Icon>
  <Badge.Text>Text</Badge.Text>
</Badge>
```
--- 

## 10 Liens utile
- [Figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=4826-406139&m=dev)
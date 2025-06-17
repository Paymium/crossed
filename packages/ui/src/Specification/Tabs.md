# 📄 Fiche de spécification — `Tabs`

---

## 1. 🔎 Objectif du composant

- **Nom** : `Tabs`
- **Rôle** : Organiser des contenus similaires ou liés dans une interface en les répartissant dans des sections navigables via des onglets.
- **Utilisation prévue** :
    - Afficher différentes vues dans une même page
    - Paramètres ou préférences utilisateurs
    - Interfaces complexes (dashboards, CMS, etc.)

---

## 2. 🧱 Structure & Composabilité

- **Composant autonome ou composable ?** :
    - [x] Autonome
    - [x] Composable

- **Structure interne recommandée** :
    - `<Tabs>` : conteneur principal
    - `<TabsList>` : conteneur des boutons d’onglets
    - `<TabsTrigger>` : un onglet individuel
    - `<TabsContent>` : le contenu associé à un onglet

- **Slots / Children autorisés** :
    - `<Tabs>` 
    - `<TabsList>`
    - `<TabsTrigger>`
    - `<TabsContent>`

---

## 3. ⚙️ Props attendues

### `Tabs`

| Prop            | Type                         | Requis | Par défaut | Description                                                      |
|-----------------|------------------------------|--------|----------|------------------------------------------------------------------|
| `defaultValue`  | `string`                     | ✅     | —        | Onglet sélectionné par défaut                                    |
| `routes`        | `array`                      | ❌ | -        | Tableau d'objet représentant les différent onglet et leur pannel |
| `onValueChange` | `(value: string) => void`    | ❌ | —        | Callback lors d’un changement d’onglet                           |
| `orientation`   | `"horizontal" \| "vertical"` | ❌ | `"horizontal"` | Orientation des onglets                                          |
| `variant`       | `string                      | ❌ | ``       | différent variant possible                                       |
| `fullWidth`     | `boolean`                    | ❌ | `"false"` | la list des Tabs prends toute les place disponnbile              |
| `fullWidth`     | `string`                     | ❌ |          | taille des boutons de la liste                                   |
---

## 4. 🎨 Variantes / États

- **Orientation** :
    - Horizontal (par défaut)
    - Vertical 

- **Variant** :
    - `brand`
    - `gray`
    - `underline`
    - `button`
    - `minimal`

- **État** :
    - `active`
    - `hover`
    - `focus`
    - `disabled`

- **size** :
    - `sm`
    - `md`

Dans sa configuration mobiel les tabs sont remplacé par un select
---

## 5. 🧪 Comportements & Interactions

- Clic sur un onglet → affiche le contenu associé
- Support du clavier :
    - Flèches gauche/droite (ou haut/bas en mode vertical)
    - `Enter` ou `Space` pour activer
- Changement de tab via `Tab` navigation


---

## 6. Accessibilité

- Conteneur avec `role="tablist"` pour définir le groupe d’onglets
- Chaque onglet :
  - `role="tab"`
  - `aria-selected="true"` pour l’onglet actif aria-selected false pour les autre
  - `aria-controls="id-du-panel"` pour lier à son contenu
  - Attribut `id` unique (référencé par le panel)
  - Focusable avec `Tab` et activable avec `Enter` ou `Space`
  - onglet disabled ne doivent pas être focusable 
- Chaque panneau de contenu :
  - `role="tabpanel"`
  - `id` correspondant à `aria-controls` de son onglet
  - `aria-labelledby="id-de-l’onglet"` pour relier le panel à son onglet
  - Doit être visible seulement quand son onglet est actif (affichage/masquage)
- Navigation clavier entre les onglets avec :
  - `ArrowRight` et `ArrowLeft` (ou `ArrowDown`/`ArrowUp` selon orientation)
- Indicateur visuel clair pour l’onglet actif et pour le focus clavier
- Texte d’onglet descriptif (ex : pas "onglet 1", mais "Détails produit")
---

## 7. 🧩 Présets ou composants dérivés


---

## 8. 🧪 Tests attendus

- [x] Passage d’un onglet à l’autre
- [x] Respect de la valeur `defaultValue` ou `value`
- [x] Accessibilité ARIA
- [x] Navigation clavier fonctionnelle
- [x] Comportement dans layout responsif

---

## 9. 📐 Exemple(s) d’utilisation

```tsx
<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Compte</TabsTrigger>
    <TabsTrigger value="password">Mot de passe</TabsTrigger>
  </TabsList>

  <TabsContent value="account">
    <AccountForm />
  </TabsContent>

  <TabsContent value="password">
    <PasswordForm />
  </TabsContent>
</Tabs>
```
---

## 10. Liens utile
  [figma](https://www.figma.com/design/BE2sfEyiN6lmoEw5l9kXY4/Design-system-V.2?node-id=1547-265252&m=dev)

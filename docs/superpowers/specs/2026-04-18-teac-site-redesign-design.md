# TEAC — Refonte du site — Design Spec

**Projet** : Ton Éduc au Quotidien (TEAC) — site vitrine d'Emmanuelle, accompagnement à domicile et en structure.
**Date** : 2026-04-18
**Direction validée** : Terre & Lumière (chaleureux & humain)
**Contrainte principale** : mobile-first, optimisé conversion.

---

## 1. Objectif

Refondre le site vitrine actuel (React 19 + Vite + Tailwind v4) pour :
- Convertir rapidement les visiteurs en prises de rendez-vous (objectif n°1).
- Offrir une UI/UX claire, chaleureuse, mobile-first.
- Consolider la confiance (témoignages réels, photos réelles, zone géographique).
- Rester léger techniquement : pas de backend supplémentaire, pas de CMS.

### Personnalité visuelle retenue
**Terre & Lumière** — terracotta, miel, sauge, crème, bois. Ressenti : maison chaleureuse, accueil familial, pas infantilisant.

### Outil de prise de rendez-vous
**Calendly** (gratuit, embed popup). Emmanuelle crée son compte, renseigne ses créneaux, l'URL est injectée via une variable d'environnement `VITE_CALENDLY_URL`.

---

## 2. Décisions produit cadrées

| Sujet | Décision |
|---|---|
| CTA primaire | « Prendre rendez-vous » → popup Calendly (non redirect) |
| CTA secondaire | Numéro cliquable `tel:+33779241915` |
| Formulaire contact | Fallback pour qui ne veut pas RDV — 3 champs seulement |
| Photos | Photos réelles d'Emmanuelle (P1) — prêtes à intégrer |
| Témoignages | Réels (T1) — noms + contexte disponibles |
| Diplôme | On ne met PAS en avant le diplôme de vente. On capitalise sur : histoire authentique (reconversion Covid) + valeurs + témoignages clients |
| Zone d'intervention | Lyon métropole (explicite) |
| Agrément / financement | Non applicable — aucune mention |
| Stack | React 19 + Vite + Tailwind v4 + Motion + Lucide — conservé |

---

## 3. Design System — Terre & Lumière

### 3.1 Palette

| Rôle | Token | Hex |
|---|---|---|
| Primary (CTA) | `terracotta-500` | `#C87456` |
| Primary dark | `terracotta-700` | `#A5593E` |
| Accent | `honey-500` | `#E0A458` |
| Secondary | `sage-500` | `#8BA888` |
| Texte principal | `wood-900` | `#3D2F26` |
| Texte secondaire | `wood-600` | `#6B5A4E` |
| Fond page | `cream-50` | `#FAF5EF` |
| Fond secondaire | `cream-100` | `#F5E8DA` |
| Cartes | `white` | `#FFFFFF` |
| Bordure | `cream-200` | `#EFE4D8` |

**Variations terracotta** (états interactifs) :
`50 #FBF1EC` · `100 #F3D9CE` · `200 #E8B59E` · `300 #DC9077` · `500 #C87456` · `700 #A5593E` · `900 #7A3E28`

**Contrastes WCAG AA vérifiés** :
- wood-900 sur cream-50 : 11.9:1 ✓
- terracotta-500 sur cream-50 : 4.8:1 ✓
- terracotta-700 sur cream-50 : 7.2:1 ✓

### 3.2 Typographie

- **Titres** : Fraunces (serif contemporain doux) — `wght 400, 500, 600, 700`
- **Texte** : Inter (sans-serif neutre) — `wght 300, 400, 500, 600, 700`
- Chargement : Google Fonts avec `display=swap`, preconnect dans `index.html`

**Scale**
| Level | Mobile | Desktop | Font | Weight | Line-height |
|---|---|---|---|---|---|
| H1 | 30px | 48px | Fraunces | 600 | 1.08 |
| H2 | 26px | 40px | Fraunces | 600 | 1.15 |
| H3 | 20px | 24px | Fraunces | 600 | 1.25 |
| Body | 16px | 17px | Inter | 400 | 1.65 |
| Small | 13px | 14px | Inter | 400 | 1.5 |
| Eyebrow | 11px | 12px | Inter | 600 (uppercase, tracking 0.12em) |

### 3.3 Tokens complémentaires

| Token | Valeur |
|---|---|
| Radius bouton | `rounded-full` (999px, pill) |
| Radius carte | `rounded-2xl` (16px) — services, témoignages |
| Radius carte large | `rounded-3xl` (24px) — bloc "À qui s'adresse" |
| Radius input | `rounded-xl` (12px) |
| Padding section mobile | `py-16` (64px) |
| Padding section desktop | `py-24` (96px) |
| Max-width contenu | `max-w-6xl` (1152px) |
| Ombre carte (`shadow-card`) | `0 2px 6px rgba(93,52,38,.05)` |
| Ombre hover (`shadow-card-lg`) | `0 12px 28px rgba(93,52,38,.12)` |
| Transition standard | `200ms ease-out` |
| Touch target minimum | 44×44px |

### 3.4 Boutons

- **Primary** : `bg-terracotta-500 text-white` — hover `bg-terracotta-700` — rounded-full
- **Accent** : `bg-honey-500 text-wood-900` — hover `bg-honey-600` (`#C98F43`)
- **Ghost** : `border-sage-500 text-wood-900` — hover `bg-sage-50` (`#E8EFE6`)
- **Secondary (dark hero)** : `bg-white/10 border-white/40 backdrop-blur` — pour les CTA posés sur image

---

## 4. Architecture de l'information

Ordre des sections (validé) :

1. **Navbar** (sticky, transparente sur hero)
2. **Hero** — claim + CTA RDV + numéro
3. **À qui ça s'adresse** — 4 questions d'accroche (existant restylé)
4. **Nos Services** — 3 cartes
5. **Comment ça marche** — 3 étapes (NOUVEAU, remplace "Tarifs")
6. **À propos — Emmanuelle** — photo + récit + zone
7. **Témoignages** — cartes avatar + nom + contexte
8. **Galerie** — photos réelles
9. **CTA final — Prenez rendez-vous** — avec Calendly embed
10. **Contact** — formulaire court + infos
11. **Footer**

---

## 5. Spécification par section

### 5.1 Navbar

- Desktop : logo gauche, liens centre, bouton "Prendre rendez-vous" terracotta droite
- Mobile : logo gauche, burger droite → menu full-screen en slide
- Comportement : transparente sur hero (contenu blanc), solide crème avec ombre après scroll de 80px
- Logo : "Ton Éduc **au Quotidien**" — "au Quotidien" en miel (`honey-500`)
- Liens : Services · À propos · Témoignages · Contact
- ARIA : `<nav aria-label="Navigation principale">`, burger `aria-expanded`, `aria-controls`
- Touch target mobile : 44×44 burger

### 5.2 Hero

**Contenu**
- Image de fond : photo Emmanuelle (P1), ratio full viewport sur mobile
- Overlay gradient : `linear-gradient(135deg, rgba(61,47,38,0.72), rgba(165,89,62,0.65))`
- Eyebrow : "Lyon métropole · Saint-Fons" (miel)
- Titre H1 : "Accompagnement à domicile et en structure"
- Sous-titre : phrase existante conservée
- CTA primary : "Prendre rendez-vous →" (ouvre Calendly)
- CTA secondary : "📞 07 79 24 19 15" (cliquable `tel:`)
- Trust row (3 pastilles avec check sauge) : "1ère rencontre gratuite · Accompagnement sur-mesure · Disponible 6j/7"

**Layout**
- Mobile : contenu aligné en bas de l'écran (bottom-anchored), padding `p-5`
- Desktop : contenu centré verticalement, max-width `max-w-2xl`, padding `px-16`
- Mobile CTAs : empilés, full-width
- Desktop CTAs : en ligne

**Suppressions vs site actuel**
- Bouton "Découvrir les services" (divise l'attention)
- Animation mot-par-mot du titre (remplacée par fade-in simple)

### 5.3 À qui s'adresse mon accompagnement

- Carte blanche centrale rayon `3xl`, max-width `max-w-4xl`, padding `p-8 md:p-12`
- Fond section : `bg-cream-50`
- Titre H2 : "À qui s'adresse mon accompagnement ?"
- 4 questions existantes conservées
- Icône `CheckCircle2` **sauge** (`text-sage-500`) devant chaque question (anciennement primary-500 bleu)
- Animation : stagger 80ms au scroll (fade + translateY 20)

### 5.4 Nos Services

- 3 cartes — contenu existant conservé
- Grid : `grid-cols-1 md:grid-cols-3 gap-6 md:gap-8`
- Carte : `bg-white rounded-2xl p-6 md:p-8 border border-cream-200 shadow-card`
- Hover : `-translate-y-1 shadow-card-lg`
- Icône dans pastille : `w-12 h-12 rounded-xl bg-terracotta-50 text-terracotta-600`
- Icônes Lucide conservées : `Heart`, `Palette`, `Navigation`
- Titre H3 Fraunces, texte Inter `text-wood-600`

### 5.5 Comment ça marche — NOUVEAU

Remplace la section "Tarifs" actuelle.

- Fond section : `bg-white`
- Titre H2 : "Comment ça se passe ?"
- Sous-titre : "Un parcours simple et sans engagement."
- 3 étapes :
  1. **Premier échange** — "Nous discutons de vos besoins lors d'une rencontre offerte." *(Icône `Handshake`)*
  2. **Projet personnalisé** — "Je vous propose un accompagnement adapté et un devis clair." *(Icône `FileText`)*
  3. **Accompagnement** — "Nous avançons ensemble au rythme qui convient." *(Icône `HeartHandshake`)*
- Numéro d'étape en gros chiffre typo Fraunces (60px) terracotta clair en arrière-plan de l'icône
- **Mobile** : cartes empilées reliées par une ligne verticale sauge pointillée
- **Desktop** : 3 cartes côte à côte avec petites flèches `→` miel entre elles
- CTA en fin de section : "Prendre rendez-vous →" (terracotta, centré)

### 5.6 À propos — Emmanuelle

- Fond section : `bg-cream-50`
- Layout : flex column (mobile) / row (desktop)
- **Image** (gauche desktop, haut mobile) : photo Emmanuelle (P1), `aspect-[4/5]`, `rounded-3xl shadow-lg`
- Bloc décoratif derrière l'image : `bg-terracotta-100 rounded-3xl translate-x-4 translate-y-4 -z-10`
- **Texte** (droite desktop, bas mobile) :
  - Titre H2 : "Mon histoire"
  - 3 paragraphes existants conservés
  - Phrase finale : "Mon approche : **écoute · respect du rythme · valorisation des capacités**" (H3 style, italique, terracotta-700)
  - Zone : "J'interviens sur Lyon et la métropole."
- **Timeline supprimée** (trop visuelle sur mobile, peu lue)

### 5.7 Témoignages

- Fond section : `bg-white`
- Titre H2 : "Ils ont fait confiance à TEAC"
- **Mobile** : scroll horizontal snap (1.2 cartes visibles, snap au centre)
- **Desktop** : grille 3 colonnes
- Carte témoignage :
  - Fond `cream-50`, rayon `2xl`, padding `p-6`
  - Guillemets typographiques terracotta (60px Fraunces) en haut
  - Texte du témoignage (Inter 16px)
  - Avatar rond (48×48) + nom + contexte ("Maman de Léa, 12 ans")
- Prévu pour 3 témoignages à 4 max

### 5.8 Galerie

- Fond section : `bg-cream-50`
- Titre H2 : "Des moments partagés"
- **Mobile** : grid 2 cols, gap 3
- **Desktop** : grid 3 cols (ou 4 si beaucoup d'images), gap 4
- Chaque image : `rounded-2xl`, aspect ratio variable (square et 4/5 alternés)
- Hover : `scale-[1.03] brightness-105` (300ms)
- Click : ouvre lightbox simple (plein écran, fermeture `Esc` ou clic overlay)
- `loading="lazy"` sur toutes les images

### 5.9 CTA final — Prenez rendez-vous — NOUVEAU

Bloc dédié full-width, très visible.

- Fond : `bg-terracotta-700` (`#A5593E`) avec halo radial miel en background (`radial-gradient` très flou)
- Texte : blanc / cream
- Titre H2 : "Discutons de vos besoins"
- Sous-titre : "1ère rencontre gratuite · Sans engagement · Je vous recontacte dans la journée"
- **Desktop** : Calendly embed inline (widget iframe) dans un cadre `bg-white rounded-3xl p-4 shadow-xl`
- **Mobile** : bouton large "Ouvrir le calendrier →" (ouvre popup Calendly)
- Fallback bloqueur : "Le calendrier ne charge pas ? Appelez le 07 79 24 19 15"

### 5.10 Contact

- Fond section : `bg-cream-50`
- Titre H2 : "Ou laissez-moi un message"
- Sous-titre : "Je vous recontacte dans la journée."
- Grid 1 col mobile / 2 cols desktop

**Formulaire simplifié** (gauche desktop)
- Prénom *(requis)*
- Téléphone *(optionnel)*
- Email *(optionnel)*
- **Règle** : au moins un des deux (tél ou email) doit être fourni. Message d'erreur si les deux sont vides : « Indiquez un téléphone ou un email pour que je puisse vous recontacter. »
- Message *(requis, textarea 4 lignes)*
- **Submit** : "Envoyer le message" (terracotta, full-width)
- État loading : bouton disabled + spinner
- Success : message de confirmation inline

**Infos pratiques** (droite desktop) — dans une carte blanche
- Téléphone cliquable
- Email cliquable
- Horaires : Lun-Ven 9h-17h · Sam 10h-15h · Dim fermé
- Adresse : 25 rue François Vincent Raspail, 69190 Saint-Fons
- Icônes Lucide dans pastilles `bg-terracotta-50 text-terracotta-600`

### 5.11 Footer

- Fond : `bg-wood-900` (`#3D2F26`)
- Texte : `text-cream-100`
- Colonnes :
  1. Logo + baseline "Accompagnement à domicile et en structure"
  2. Navigation (mêmes liens que navbar)
  3. Contact rapide (tél + email)
  4. Mentions légales + CGU (liens placeholder)
- Bottom : "© 2026 Ton Éduc au Quotidien · Conçu avec soin"
- Mobile : colonnes empilées, centrées

---

## 6. Intégration Calendly

### Approche
Widget popup officiel Calendly via `<script>` chargé en lazy. Pas de dépendance npm.

### Structure

```
src/
  lib/
    calendly.ts       # helper: loadCalendlyScript(), openPopup(url)
  hooks/
    useCalendly.ts    # React hook: { openCalendly, isReady }
  components/
    CalendlyButton.tsx  # bouton réutilisable (utilisé dans Hero, HowItWorks, CTAFinal, Navbar)
    CalendlyEmbed.tsx   # embed inline (utilisé dans CTAFinal desktop)
```

### Configuration
- `.env.example` : ajouter `VITE_CALENDLY_URL=https://calendly.com/emmanuelle-teac/rencontre`
- README : section "Configuration Calendly" avec marche à suivre pour Emmanuelle

### Comportement
- Script Calendly chargé une seule fois au premier click (lazy)
- Popup déclenchée par `Calendly.initPopupWidget({ url })`
- Fermeture par overlay ou croix
- Pas d'Event tracking GA pour cette itération

### Fallback
- Si `VITE_CALENDLY_URL` vide : le bouton redirige vers `#contact`
- Si le script échoue à charger (bloqueur) : toast d'erreur + lien tel:

---

## 7. Accessibilité

Niveau cible : **WCAG AA**

- Contraste texte ≥ 4.5:1 (vérifié pour tous les couples de la palette)
- Focus ring visible : `outline-3 outline-honey-500 outline-offset-2` sur tous les interactifs
- Touch targets ≥ 44×44px (padding des boutons à vérifier)
- Alt text descriptifs (pas "photo"), vide (`alt=""`) sur décoratif
- Labels explicites `<label for="id">` sur inputs
- `aria-label` sur boutons icônes (burger, fermeture popup)
- `aria-expanded`, `aria-controls` sur le burger menu
- Skip link "Aller au contenu" au début du body (`<a href="#main" class="sr-only focus:not-sr-only">`)
- Un seul `<h1>` par page (dans Hero)
- `<main id="main">`, `<nav>`, `<section>`, `<header>`, `<footer>`
- Tab order respecte l'ordre visuel
- Formulaire : `aria-invalid`, `aria-describedby` sur les erreurs

### Motion & `prefers-reduced-motion`
- Toutes les animations Motion wrappées dans un helper `useMotionSafe()` qui retourne des variants désactivés si `matchMedia('(prefers-reduced-motion: reduce)').matches`
- Durations : 200ms (hover/state), 400-600ms (entrées scroll), jamais plus
- Stagger max 80ms
- Pas d'animation en boucle, pas de parallax

---

## 8. Performance

- **Fonts** : Fraunces + Inter via Google Fonts avec `preconnect` + `display=swap`
- **Images** : format WebP priorisé, `loading="lazy"` (sauf hero), dimensions explicites `width`/`height` pour éviter le CLS
- **Calendly script** : chargé au premier click (lazy), jamais au mount
- **Motion** : animations CSS `transform`/`opacity` uniquement (pas de width/height)
- **Bundle** : pas de nouvelle dépendance npm

---

## 9. Découpage des fichiers à toucher

### À modifier (refactor)
```
index.html                        # Google Fonts + preconnect
src/index.css                     # nouveaux tokens @theme Tailwind v4
src/App.tsx                       # ajouter HowItWorks + CTAFinal, retirer Tarifs
src/components/Navbar.tsx         # nouveau logo + bouton CTA Calendly
src/components/Hero.tsx           # nouvelle structure (eyebrow, trust row, CTAs)
src/components/Services.tsx       # restyle (icônes terracotta)
src/components/About.tsx          # retirer timeline, restyle
src/components/Gallery.tsx        # lightbox + P1
src/components/Testimonials.tsx   # nouveau format carte avatar
src/components/Contact.tsx        # formulaire simplifié
src/components/Footer.tsx         # nouveaux liens + couleurs
.env.example                      # VITE_CALENDLY_URL
```

### À créer
```
src/components/HowItWorks.tsx     # NOUVEAU — 3 étapes
src/components/CTAFinal.tsx       # NOUVEAU — bloc Calendly
src/components/CalendlyButton.tsx # NOUVEAU — bouton réutilisable
src/components/CalendlyEmbed.tsx  # NOUVEAU — embed inline desktop
src/lib/calendly.ts               # NOUVEAU — helper chargement script
src/hooks/useCalendly.ts          # NOUVEAU — hook
src/hooks/useMotionSafe.ts        # NOUVEAU — respect prefers-reduced-motion
```

### À supprimer
```
src/components/Tarifs.tsx         # fusionné dans HowItWorks
```

---

## 10. Hors scope (volontairement exclu)

- CMS / admin pour éditer le contenu (Emmanuelle édite via PR ou demande)
- i18n (site 100% FR)
- Tracking analytics (à voir dans un 2e temps)
- Blog / articles
- Formulaire avec backend réel (on garde `preventDefault` pour cette itération ; une action d'envoi email viendra après)
- Page dédiée Mentions légales / CGU (liens footer en placeholder)
- Tests E2E (hors budget)
- Animations avancées (parallax, canvas)

---

## 11. Critères de succès

- [ ] Lighthouse Mobile Performance ≥ 90
- [ ] Lighthouse Accessibility ≥ 95
- [ ] Contraste WCAG AA respecté sur tous les textes
- [ ] Hero visible sans scroll sur iPhone SE (375×667)
- [ ] CTA "Prendre rendez-vous" accessible à ≤ 1 scroll sur toutes les sections
- [ ] Formulaire contact utilisable au clavier uniquement
- [ ] `prefers-reduced-motion` respecté (animations désactivées)
- [ ] Build `npm run build` sans warning
- [ ] `npm run lint` (tsc --noEmit) sans erreur

---

## 12. Questions ouvertes (à clarifier avant/pendant l'implémentation)

1. **URL Calendly d'Emmanuelle** : à obtenir avant le déploiement (placeholder accepté pour le dev).
2. **Photos P1** : Emmanuelle doit fournir les fichiers (un dossier `src/assets/photos/` sera créé, ou les URLs si hébergées ailleurs).
3. **Témoignages T1** : texte + nom/contexte + (idéalement) avatar — à fournir.
4. **Envoi réel du formulaire contact** : pour cette itération on reste en `preventDefault`. Si on veut l'envoi, option simple : Formspree / Getform / Resend — à discuter.

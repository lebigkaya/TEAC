# TEAC Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refondre le site TEAC en appliquant la direction visuelle "Terre & Lumière", optimisé mobile-first pour la conversion (prise de rendez-vous via Calendly).

**Architecture:** Refactor incrémental d'une app React 19 + Vite + Tailwind v4. On remplace le thème (tokens Tailwind via `@theme`), on restyle les 8 composants existants, on en crée 4 nouveaux (HowItWorks, CTAFinal, CalendlyButton, CalendlyEmbed) + 2 hooks (useCalendly, useMotionSafe) + 1 lib (calendly). On supprime Tarifs (fusionné dans HowItWorks). Aucune nouvelle dépendance npm.

**Tech Stack:** React 19, Vite 6, TypeScript, Tailwind v4 (`@theme` dans CSS), Motion 12, Lucide-react, Calendly embed natif (script tag).

**Vérification sans tests unitaires :** Ce projet n'a pas de framework de test. On vérifie après chaque tâche via : (1) `npm run lint` (type check), (2) inspection visuelle navigateur aux breakpoints 375px / 768px / 1280px, (3) interactions spécifiques listées dans chaque tâche. Lighthouse audit en phase finale.

**Spec de référence :** `docs/superpowers/specs/2026-04-18-teac-site-redesign-design.md`

---

## Phase 1 — Fondation (design tokens + fonts)

### Task 1.1: Mettre à jour les Google Fonts

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Remplacer l'import Google Fonts**

Remplace la ligne `<link href="https://fonts.googleapis.com/css2?family=Inter…Playfair+Display…">` par :

```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Vérifier que les preconnects existent déjà**

Les `<link rel="preconnect">` vers `fonts.googleapis.com` et `fonts.gstatic.com` sont déjà présents — ne rien ajouter.

- [ ] **Step 3: Lancer le dev server et vérifier le chargement**

Run: `npm run dev`

Ouvrir `http://localhost:3000`, ouvrir l'onglet Network du navigateur, filtrer sur "font", vérifier que `Fraunces-*.woff2` et `Inter-*.woff2` se chargent sans 404.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: swap Google Fonts to Fraunces + Inter"
```

---

### Task 1.2: Réécrire src/index.css avec le nouveau design system

**Files:**
- Modify: `src/index.css` (réécriture complète)

- [ ] **Step 1: Remplacer le contenu du fichier**

Écraser `src/index.css` avec :

```css
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Fraunces", ui-serif, Georgia, serif;

  /* Terracotta (primary, CTA) */
  --color-terracotta-50: #FBF1EC;
  --color-terracotta-100: #F3D9CE;
  --color-terracotta-200: #E8B59E;
  --color-terracotta-300: #DC9077;
  --color-terracotta-500: #C87456;
  --color-terracotta-600: #B06747;
  --color-terracotta-700: #A5593E;
  --color-terracotta-900: #7A3E28;

  /* Honey (accent) */
  --color-honey-400: #E8B772;
  --color-honey-500: #E0A458;
  --color-honey-600: #C98F43;

  /* Sage (secondary) */
  --color-sage-50: #E8EFE6;
  --color-sage-100: #D4E0D1;
  --color-sage-500: #8BA888;
  --color-sage-600: #6E8E6B;

  /* Wood (text) */
  --color-wood-600: #6B5A4E;
  --color-wood-700: #4F3F34;
  --color-wood-900: #3D2F26;

  /* Cream (backgrounds) */
  --color-cream-50: #FAF5EF;
  --color-cream-100: #F5E8DA;
  --color-cream-200: #EFE4D8;

  /* Shadows */
  --shadow-card: 0 2px 6px rgba(93, 52, 38, 0.05);
  --shadow-card-lg: 0 12px 28px rgba(93, 52, 38, 0.12);
}

body {
  @apply bg-cream-50 text-wood-900 font-sans antialiased;
}

h1, h2, h3, h4, h5, h6 {
  @apply font-serif;
}

/* Focus ring global (accessibilité) */
*:focus-visible {
  outline: 3px solid var(--color-honey-500);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Skip link - visible au focus clavier uniquement */
.skip-link {
  @apply sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-wood-900 focus:text-cream-50 focus:px-4 focus:py-2 focus:rounded;
}
```

- [ ] **Step 2: Vérifier la compilation**

Run: `npm run lint`
Expected: PASS sans erreur

- [ ] **Step 3: Vérifier le rendu de base**

Run: `npm run dev` (si pas déjà lancé)

Dans le navigateur : la page s'affiche avec un fond crème (`#FAF5EF`). Les anciennes couleurs primary/accent vertes/oranges vont produire des **classes cassées** sur les composants existants — c'est attendu, on les corrigera phase par phase.

- [ ] **Step 4: Commit**

```bash
git add src/index.css
git commit -m "feat: replace design tokens with Terre & Lumière system"
```

---

## Phase 2 — Primitives réutilisables (Calendly + hooks)

### Task 2.1: Créer le hook useMotionSafe

**Files:**
- Create: `src/hooks/useMotionSafe.ts`

- [ ] **Step 1: Créer le dossier hooks si absent**

```bash
mkdir -p src/hooks
```

- [ ] **Step 2: Écrire le hook**

Créer `src/hooks/useMotionSafe.ts` :

```typescript
import { useEffect, useState } from 'react';

export function useMotionSafe(): boolean {
  const [motionSafe, setMotionSafe] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setMotionSafe(!mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return motionSafe;
}
```

- [ ] **Step 3: Vérifier la compilation**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/hooks/useMotionSafe.ts
git commit -m "feat: add useMotionSafe hook for reduced-motion support"
```

---

### Task 2.2: Créer le helper lib/calendly.ts

**Files:**
- Create: `src/lib/calendly.ts`

- [ ] **Step 1: Créer le dossier lib si absent**

```bash
mkdir -p src/lib
```

- [ ] **Step 2: Écrire le helper**

Créer `src/lib/calendly.ts` :

```typescript
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

const CALENDLY_SCRIPT_URL = 'https://assets.calendly.com/assets/external/widget.js';
const CALENDLY_CSS_URL = 'https://assets.calendly.com/assets/external/widget.css';

let loadPromise: Promise<void> | null = null;

export function loadCalendly(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.Calendly) return Promise.resolve();
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    // CSS
    if (!document.querySelector(`link[href="${CALENDLY_CSS_URL}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = CALENDLY_CSS_URL;
      document.head.appendChild(link);
    }

    // JS
    const script = document.createElement('script');
    script.src = CALENDLY_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      loadPromise = null;
      reject(new Error('Calendly script failed to load'));
    };
    document.body.appendChild(script);
  });

  return loadPromise;
}

export async function openCalendlyPopup(url: string): Promise<void> {
  await loadCalendly();
  window.Calendly?.initPopupWidget({ url });
}
```

- [ ] **Step 3: Vérifier la compilation**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/lib/calendly.ts
git commit -m "feat: add Calendly lazy-loader helper"
```

---

### Task 2.3: Créer le hook useCalendly

**Files:**
- Create: `src/hooks/useCalendly.ts`

- [ ] **Step 1: Écrire le hook**

Créer `src/hooks/useCalendly.ts` :

```typescript
import { useCallback, useState } from 'react';
import { openCalendlyPopup } from '../lib/calendly';

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL as string | undefined;

export function useCalendly() {
  const [isOpening, setIsOpening] = useState(false);

  const open = useCallback(async () => {
    if (!CALENDLY_URL) {
      // Fallback : scroll vers #contact
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    try {
      setIsOpening(true);
      await openCalendlyPopup(CALENDLY_URL);
    } catch {
      // Fallback silencieux : scroll vers contact
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } finally {
      setIsOpening(false);
    }
  }, []);

  return { open, isOpening, isConfigured: Boolean(CALENDLY_URL) };
}
```

- [ ] **Step 2: Vérifier la compilation**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useCalendly.ts
git commit -m "feat: add useCalendly hook with fallback to #contact"
```

---

### Task 2.4: Créer le composant CalendlyButton

**Files:**
- Create: `src/components/CalendlyButton.tsx`

- [ ] **Step 1: Écrire le composant**

Créer `src/components/CalendlyButton.tsx` :

```typescript
import { ArrowRight } from 'lucide-react';
import { useCalendly } from '../hooks/useCalendly';

type Variant = 'primary' | 'accent' | 'dark';

interface CalendlyButtonProps {
  variant?: Variant;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-terracotta-500 hover:bg-terracotta-700 text-white',
  accent: 'bg-honey-500 hover:bg-honey-600 text-wood-900',
  dark: 'bg-wood-900 hover:bg-wood-700 text-cream-50',
};

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function CalendlyButton({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children = 'Prendre rendez-vous',
  className = '',
}: CalendlyButtonProps) {
  const { open, isOpening } = useCalendly();

  return (
    <button
      type="button"
      onClick={open}
      disabled={isOpening}
      className={[
        'inline-flex items-center justify-center gap-2 font-semibold rounded-full',
        'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-lg',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
    >
      {children}
      <ArrowRight size={18} aria-hidden="true" />
    </button>
  );
}
```

- [ ] **Step 2: Vérifier la compilation**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/CalendlyButton.tsx
git commit -m "feat: add reusable CalendlyButton component"
```

---

### Task 2.5: Créer le composant CalendlyEmbed

**Files:**
- Create: `src/components/CalendlyEmbed.tsx`

- [ ] **Step 1: Écrire le composant**

Créer `src/components/CalendlyEmbed.tsx` :

```typescript
import { useEffect, useRef, useState } from 'react';
import { loadCalendly } from '../lib/calendly';

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL as string | undefined;

interface CalendlyEmbedProps {
  className?: string;
  minHeight?: number;
}

export default function CalendlyEmbed({ className = '', minHeight = 640 }: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!CALENDLY_URL || !containerRef.current) return;
    let cancelled = false;

    loadCalendly()
      .then(() => {
        if (cancelled || !containerRef.current) return;
        window.Calendly?.initInlineWidget({
          url: CALENDLY_URL,
          parentElement: containerRef.current,
        });
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!CALENDLY_URL) {
    return (
      <div className={`bg-cream-50 rounded-2xl p-6 text-center text-wood-600 ${className}`} role="status">
        Le calendrier n'est pas encore configuré. Contactez-moi par téléphone au{' '}
        <a href="tel:+33779241915" className="font-semibold text-terracotta-700 underline">07 79 24 19 15</a>.
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-cream-50 rounded-2xl p-6 text-center text-wood-600 ${className}`} role="alert">
        Le calendrier n'a pas pu charger. Appelez-moi au{' '}
        <a href="tel:+33779241915" className="font-semibold text-terracotta-700 underline">07 79 24 19 15</a>.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`bg-white rounded-3xl overflow-hidden shadow-card-lg ${className}`}
      style={{ minHeight }}
      aria-label="Calendrier de prise de rendez-vous"
    />
  );
}
```

- [ ] **Step 2: Vérifier la compilation**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/CalendlyEmbed.tsx
git commit -m "feat: add CalendlyEmbed inline widget with fallbacks"
```

---

### Task 2.6: Ajouter VITE_CALENDLY_URL à .env.example

**Files:**
- Modify: `.env.example`

- [ ] **Step 1: Ajouter la variable**

Ajouter à la fin de `.env.example` :

```bash

# VITE_CALENDLY_URL: URL Calendly pour la prise de rendez-vous.
# Exemple: https://calendly.com/emmanuelle-teac/rencontre
# Emmanuelle crée son compte sur calendly.com, configure ses créneaux, copie l'URL de l'événement.
# Si vide, les boutons "Prendre rendez-vous" scrollent vers la section #contact.
VITE_CALENDLY_URL=""
```

- [ ] **Step 2: Commit**

```bash
git add .env.example
git commit -m "feat: document VITE_CALENDLY_URL env variable"
```

---

## Phase 3 — Navbar & Hero (au-dessus de la ligne de flottaison)

### Task 3.1: Refactor Navbar

**Files:**
- Modify: `src/components/Navbar.tsx` (réécriture complète)

- [ ] **Step 1: Remplacer le contenu**

Écraser `src/components/Navbar.tsx` avec :

```typescript
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone } from 'lucide-react';
import CalendlyButton from './CalendlyButton';

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Parcours', href: '#parcours' },
  { name: 'À propos', href: '#about' },
  { name: 'Témoignages', href: '#temoignages' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handle = () => setIsScrolled(window.scrollY > 60);
    handle();
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const shell = isScrolled
    ? 'bg-cream-50/95 backdrop-blur-md shadow-card py-3 text-wood-900'
    : 'bg-transparent py-5 text-white';

  return (
    <header
      aria-label="Navigation principale"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${shell}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a href="#home" className="font-serif font-semibold text-lg md:text-xl leading-none">
          Ton Éduc <span className="text-honey-500">au Quotidien</span>
        </a>

        <nav className="hidden md:flex items-center gap-7" aria-label="Menu principal">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:text-terracotta-500 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <CalendlyButton size="sm">Prendre rendez-vous</CalendlyButton>
        </nav>

        <button
          type="button"
          className="md:hidden w-11 h-11 flex items-center justify-center -mr-2"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-cream-50 text-wood-900 border-t border-cream-200 overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="py-3 text-base font-medium hover:text-terracotta-500"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="tel:+33779241915"
                className="flex items-center gap-2 py-3 text-base font-medium text-wood-700"
              >
                <Phone size={18} aria-hidden="true" /> 07 79 24 19 15
              </a>
              <div className="pt-2">
                <CalendlyButton fullWidth>Prendre rendez-vous</CalendlyButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
```

- [ ] **Step 2: Vérifier la compilation**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 3: Vérification visuelle**

Run: `npm run dev` (si pas déjà lancé)

Dans le navigateur :
- Ouvrir 375px (DevTools responsive) : logo à gauche, burger à droite. Cliquer burger → menu vertical avec liens + bouton "Prendre rendez-vous" + lien tél.
- Ouvrir 1280px : logo à gauche, 5 liens centre, bouton terracotta à droite.
- Scroller 100px vers le bas : la navbar passe de transparente (texte blanc) à crème avec ombre (texte bois).

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: refactor Navbar with Calendly CTA and accessible mobile menu"
```

---

### Task 3.2: Refactor Hero

**Files:**
- Modify: `src/components/Hero.tsx` (réécriture complète)

- [ ] **Step 1: Remplacer le contenu**

Écraser `src/components/Hero.tsx` avec :

```typescript
import { motion } from 'motion/react';
import { Phone, Check } from 'lucide-react';
import CalendlyButton from './CalendlyButton';
import { useMotionSafe } from '../hooks/useMotionSafe';

const HERO_IMAGE = 'https://primary.jwwb.nl/public/y/y/r/temp-epgxyojzwxhwltvwdttk/img_3099-standard-kcvz2n.jpg';

const trustPoints = [
  '1ère rencontre gratuite',
  'Accompagnement sur-mesure',
  'Disponible 6j/7',
];

export default function Hero() {
  const motionSafe = useMotionSafe();
  const transition = motionSafe ? { duration: 0.6 } : { duration: 0 };

  return (
    <section
      id="home"
      className="relative min-h-[100svh] md:min-h-screen flex items-end md:items-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Emmanuelle accompagnant une personne dans son quotidien"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(61,47,38,0.72) 0%, rgba(165,89,62,0.65) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-28 md:py-0 md:max-w-4xl lg:max-w-5xl">
        <motion.div
          initial={motionSafe ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
          className="text-white max-w-2xl"
        >
          <div className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-honey-400 mb-4">
            Lyon métropole · Saint-Fons
          </div>

          <h1 className="font-serif font-semibold text-[2rem] leading-[1.1] md:text-5xl lg:text-[3.25rem] tracking-tight mb-5">
            Accompagnement à domicile<br className="hidden md:block" /> et en structure
          </h1>

          <p className="text-base md:text-lg text-white/90 leading-relaxed mb-8 max-w-xl">
            Je vous aide à mieux comprendre ses besoins, à valoriser ses capacités et à cheminer
            vers des solutions adaptées, celles qui favorisent son épanouissement et celui de votre famille.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <CalendlyButton size="lg" className="sm:w-auto">
              Prendre rendez-vous
            </CalendlyButton>
            <a
              href="tel:+33779241915"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm text-white font-semibold text-lg hover:bg-white/20 transition-all"
            >
              <Phone size={20} aria-hidden="true" />
              07 79 24 19 15
            </a>
          </div>

          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/85">
            {trustPoints.map((p) => (
              <li key={p} className="inline-flex items-center gap-1.5">
                <Check size={16} className="text-sage-500" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Vérifier la compilation**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 3: Vérification visuelle**

Dans le navigateur :
- 375px : le contenu est collé en bas de l'écran, le CTA "Prendre rendez-vous" et le numéro sont **empilés** et full-width.
- 1280px : contenu centré verticalement, CTAs alignés horizontalement, max-width limitée.
- Cliquer "Prendre rendez-vous" → popup Calendly s'ouvre (ou scroll vers #contact si `VITE_CALENDLY_URL` vide).
- Cliquer le numéro sur mobile → ouvre l'app téléphone.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: refactor Hero with eyebrow, trust row, Calendly + tel CTAs"
```

---

## Phase 4 — Services, "À qui", HowItWorks, suppression Tarifs

### Task 4.1: Refactor Services (inclut "À qui s'adresse")

**Files:**
- Modify: `src/components/Services.tsx` (réécriture complète)

- [ ] **Step 1: Remplacer le contenu**

Écraser `src/components/Services.tsx` avec :

```typescript
import { motion } from 'motion/react';
import { Heart, Palette, Navigation, CheckCircle2 } from 'lucide-react';
import { useMotionSafe } from '../hooks/useMotionSafe';

const services = [
  {
    title: 'Accompagnement au quotidien',
    description:
      "Aide personnalisée pour les gestes de tous les jours : repas, courses, entretien du logement, organisation, gestion du budget et démarches simples. Objectif : favoriser l'autonomie, le confort et le bien-être.",
    icon: Heart,
  },
  {
    title: 'Sortie, activité & apprentissage',
    description:
      "Accompagnement dans les sorties (cinéma, sport, restaurant, balades) et les loisirs. Apprentissage de compétences utiles (cuisine, argent, communication) pour favoriser l'épanouissement et la socialisation.",
    icon: Palette,
  },
  {
    title: 'Projet personnalisé',
    description:
      "Chaque accompagnement est construit autour des besoins, envies et objectifs de la personne. Ensemble, nous définissons un projet qui respecte son rythme, avec un suivi régulier pour valoriser les réussites.",
    icon: Navigation,
  },
];

const questions = [
  "Vous rencontrez des difficultés dans l'accompagnement de votre proche ?",
  'Vous traversez une étape de vie qui bouscule vos habitudes ?',
  "Vous vous interrogez sur la meilleure façon de soutenir son autonomie ?",
  "Votre enfant, adolescent ou adulte présente des difficultés dans son quotidien, ses relations et ses émotions ?",
];

export default function Services() {
  const motionSafe = useMotionSafe();

  return (
    <section id="services" className="py-16 md:py-24 bg-cream-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* À qui s'adresse */}
        <motion.div
          initial={motionSafe ? { opacity: 0, y: 20 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16 md:mb-20 bg-white rounded-3xl p-6 md:p-12 shadow-card border border-cream-200"
        >
          <h2 className="font-serif font-semibold text-2xl md:text-3xl text-wood-900 text-center mb-8">
            À qui s'adresse mon accompagnement&nbsp;?
          </h2>
          <ul className="space-y-4">
            {questions.map((q, i) => (
              <motion.li
                key={i}
                initial={motionSafe ? { opacity: 0, x: -16 } : false}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: motionSafe ? i * 0.08 : 0 }}
                className="flex items-start gap-3 text-wood-700"
              >
                <CheckCircle2
                  size={22}
                  className="text-sage-500 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span className="text-base md:text-lg leading-relaxed">{q}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Services */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="font-serif font-semibold text-3xl md:text-4xl lg:text-5xl text-wood-900 mb-4">
            Mes services
          </h2>
          <p className="text-wood-600 text-base md:text-lg">
            Un accompagnement bienveillant et adapté à chaque étape de la vie.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                initial={motionSafe ? { opacity: 0, y: 20 } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: motionSafe ? i * 0.1 : 0 }}
                className="bg-white rounded-2xl p-6 md:p-8 border border-cream-200 shadow-card hover:shadow-card-lg hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-terracotta-50 text-terracotta-700 flex items-center justify-center mb-5">
                  <Icon size={24} aria-hidden="true" />
                </div>
                <h3 className="font-serif font-semibold text-xl text-wood-900 mb-3">{service.title}</h3>
                <p className="text-wood-600 text-base leading-relaxed">{service.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Vérifier la compilation**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 3: Vérification visuelle**

Dans le navigateur :
- Section Services visible avec nouveau style terracotta/sauge (plus de bleu/vert/rose).
- 375px : 1 carte par ligne, espacement généreux.
- 1024px : 3 cartes par ligne, hover fait monter la carte de 4px avec ombre.
- Icônes sauge (check) dans "À qui s'adresse", icônes terracotta dans pastilles crème pour les services.

- [ ] **Step 4: Commit**

```bash
git add src/components/Services.tsx
git commit -m "feat: restyle Services section with Terre & Lumière tokens"
```

---

### Task 4.2: Créer HowItWorks

**Files:**
- Create: `src/components/HowItWorks.tsx`

- [ ] **Step 1: Écrire le composant**

Créer `src/components/HowItWorks.tsx` :

```typescript
import { motion } from 'motion/react';
import { Handshake, FileText, HeartHandshake } from 'lucide-react';
import CalendlyButton from './CalendlyButton';
import { useMotionSafe } from '../hooks/useMotionSafe';

const steps = [
  {
    number: '01',
    title: 'Premier échange',
    description: 'Nous discutons de vos besoins lors d\'une rencontre offerte, sans engagement.',
    icon: Handshake,
  },
  {
    number: '02',
    title: 'Projet personnalisé',
    description: 'Je vous propose un accompagnement adapté, avec un devis clair et sur-mesure.',
    icon: FileText,
  },
  {
    number: '03',
    title: 'Accompagnement',
    description: 'Nous avançons ensemble, au rythme qui convient, avec des points réguliers.',
    icon: HeartHandshake,
  },
];

export default function HowItWorks() {
  const motionSafe = useMotionSafe();

  return (
    <section id="parcours" className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="font-serif font-semibold text-3xl md:text-4xl lg:text-5xl text-wood-900 mb-4">
            Comment ça se passe&nbsp;?
          </h2>
          <p className="text-wood-600 text-base md:text-lg">
            Un parcours simple, en trois étapes, sans engagement.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === steps.length - 1;
            return (
              <motion.li
                key={step.number}
                initial={motionSafe ? { opacity: 0, y: 20 } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: motionSafe ? i * 0.12 : 0 }}
                className="relative bg-cream-50 rounded-2xl p-6 md:p-8 border border-cream-200"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span
                    aria-hidden="true"
                    className="font-serif font-semibold text-5xl text-terracotta-200 leading-none"
                  >
                    {step.number}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-terracotta-500 text-white flex items-center justify-center">
                    <Icon size={24} aria-hidden="true" />
                  </div>
                </div>
                <h3 className="font-serif font-semibold text-xl text-wood-900 mb-2">{step.title}</h3>
                <p className="text-wood-600 leading-relaxed">{step.description}</p>

                {/* Connector */}
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 text-honey-500 text-2xl font-bold"
                  >
                    →
                  </span>
                )}
              </motion.li>
            );
          })}
        </ol>

        <div className="text-center mt-10 md:mt-14">
          <CalendlyButton size="lg">Prendre rendez-vous</CalendlyButton>
          <p className="text-sm text-wood-600 mt-3">1ère rencontre gratuite · sans engagement</p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Vérifier la compilation**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/HowItWorks.tsx
git commit -m "feat: add HowItWorks section with 3-step process"
```

---

### Task 4.3: Supprimer Tarifs et mettre à jour App.tsx

**Files:**
- Delete: `src/components/Tarifs.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Supprimer Tarifs.tsx**

```bash
rm src/components/Tarifs.tsx
```

- [ ] **Step 2: Mettre à jour App.tsx**

Remplacer `src/App.tsx` par :

```typescript
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import CTAFinal from './components/CTAFinal';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-cream-50 font-sans text-wood-900">
      <a href="#main" className="skip-link">Aller au contenu</a>
      <Navbar />
      <main id="main">
        <Hero />
        <Services />
        <HowItWorks />
        <About />
        <Testimonials />
        <Gallery />
        <CTAFinal />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
```

**NOTE** : `CTAFinal` est importé mais pas encore créé — la build cassera. On corrige en Task 6.1. Si tu préfères éviter le break, commente temporairement la ligne import + `<CTAFinal />` et décommente en Task 6.1.

- [ ] **Step 3: Vérifier la compilation**

Run: `npm run lint`
Expected: FAIL (CTAFinal not found). C'est OK — on le crée à la Task 6.1.

- [ ] **Step 4: Commit partiel (sans vérification lint)**

```bash
git add src/App.tsx src/components/Tarifs.tsx
git commit -m "refactor: drop Tarifs, wire new section order (HowItWorks, CTAFinal)"
```

---

## Phase 5 — About, Témoignages, Galerie

### Task 5.1: Refactor About

**Files:**
- Modify: `src/components/About.tsx` (réécriture complète)

- [ ] **Step 1: Remplacer le contenu**

Écraser `src/components/About.tsx` avec :

```typescript
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import { useMotionSafe } from '../hooks/useMotionSafe';

const ABOUT_IMAGE = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

export default function About() {
  const motionSafe = useMotionSafe();

  return (
    <section id="about" className="py-16 md:py-24 bg-cream-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={motionSafe ? { opacity: 0, x: -30 } : false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 max-w-md lg:max-w-none"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-terracotta-100 rounded-3xl translate-x-4 translate-y-4 -z-10" aria-hidden="true" />
              <img
                src={ABOUT_IMAGE}
                alt="Portrait d'Emmanuelle, fondatrice de Ton Éduc au Quotidien"
                className="rounded-3xl shadow-card-lg w-full object-cover aspect-[4/5]"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={motionSafe ? { opacity: 0, x: 30 } : false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <h2 className="font-serif font-semibold text-3xl md:text-4xl lg:text-5xl text-wood-900 mb-6">
              Mon histoire
            </h2>

            <div className="text-base md:text-lg text-wood-600 leading-relaxed space-y-4 mb-8">
              <p>
                Tout a commencé avec une idée simple nourrie par une passion profonde. Issue d'une famille modeste,
                j'ai très tôt appris à prendre soin des autres en accompagnant mes parents dans leur clinique,
                où je me suis engagée comme bénévole auprès des patients.
              </p>
              <p>
                Plus tard, je me suis d'abord orientée vers un diplôme de vente. Mais la période du Covid a été un
                tournant : elle m'a poussée à écouter mon véritable appel, celui d'aider et d'accompagner. Depuis,
                je consacre ma vie à apporter de l'autonomie, du soutien et du soulagement aux personnes en situation
                de handicap.
              </p>
              <p>
                Aujourd'hui, cette vocation est au cœur de mon entreprise : offrir un accompagnement de qualité,
                humain et personnalisé, où chaque personne compte et mérite d'être valorisée.
              </p>
            </div>

            <p className="font-serif italic text-lg md:text-xl text-terracotta-700 border-l-2 border-terracotta-300 pl-4 mb-6">
              Mon approche : écoute · respect du rythme · valorisation des capacités.
            </p>

            <div className="inline-flex items-center gap-2 text-wood-700 font-medium">
              <MapPin size={18} className="text-sage-600" aria-hidden="true" />
              J'interviens sur Lyon et la métropole.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Vérifier la compilation**

Run: `npm run lint`
Expected: FAIL (CTAFinal toujours manquant), mais About.tsx lui-même ne produit aucune erreur.

- [ ] **Step 3: Commit**

```bash
git add src/components/About.tsx
git commit -m "feat: restyle About, replace timeline with values line and zone"
```

---

### Task 5.2: Refactor Testimonials

**Files:**
- Modify: `src/components/Testimonials.tsx` (réécriture complète)

- [ ] **Step 1: Remplacer le contenu**

Écraser `src/components/Testimonials.tsx` avec :

```typescript
import { motion } from 'motion/react';
import { useMotionSafe } from '../hooks/useMotionSafe';

const testimonials = [
  {
    name: 'Kra Frejus',
    context: 'Famille accompagnée',
    text: "Une vraie perle ! Emmanuelle est gentille, pro, et elle a su nous aider comme il faut. Je la recommande les yeux fermés !",
  },
  {
    name: 'Rioux Jocelyne',
    context: 'Proche aidante',
    text: "Emmanuelle a changé notre quotidien. Elle comprend vraiment les besoins des personnes en situation de handicap, et elle fait tout avec le cœur. Merci pour tout.",
  },
  {
    name: 'Stéphanie Lopez',
    context: 'Maman',
    text: "Super accompagnement ! Très humaine, très pro, et toujours là quand on en a besoin. On se sent en confiance.",
  },
];

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function Testimonials() {
  const motionSafe = useMotionSafe();

  return (
    <section id="temoignages" className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="font-serif font-semibold text-3xl md:text-4xl lg:text-5xl text-wood-900 mb-4">
            Ils ont fait confiance à TEAC
          </h2>
          <p className="text-wood-600 text-base md:text-lg">
            Merci aux familles qui m'ont laissé partager leur quotidien.
          </p>
        </div>

        {/* Mobile: scroll-snap horizontal; Desktop: grid 3 cols */}
        <div className="md:grid md:grid-cols-3 md:gap-6 flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible pb-2 md:pb-0">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={motionSafe ? { opacity: 0, y: 20 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: motionSafe ? i * 0.1 : 0 }}
              className="snap-center shrink-0 w-[85vw] md:w-auto bg-cream-50 rounded-2xl p-6 md:p-7 border border-cream-200 flex flex-col"
            >
              <span aria-hidden="true" className="font-serif text-5xl text-terracotta-300 leading-none mb-2">
                &ldquo;
              </span>
              <p className="text-wood-700 italic text-base leading-relaxed mb-6 flex-grow">
                {t.text}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-terracotta-500 text-white flex items-center justify-center font-semibold text-sm">
                  {initials(t.name)}
                </div>
                <div>
                  <div className="font-semibold text-wood-900 text-sm">{t.name}</div>
                  <div className="text-xs text-wood-600">{t.context}</div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Vérifier la compilation**

Run: `npm run lint`
Expected: FAIL (CTAFinal toujours manquant) — OK.

- [ ] **Step 3: Vérification visuelle**

Dans le navigateur, une fois CTAFinal créé (phase 6) :
- 375px : 3 cartes en scroll horizontal snap, 85% de la largeur visible.
- 1024px : 3 cartes côte à côte.
- Avatars colorés terracotta avec initiales.

- [ ] **Step 4: Commit**

```bash
git add src/components/Testimonials.tsx
git commit -m "feat: restyle Testimonials with avatar initials and snap scroll"
```

---

### Task 5.3: Refactor Gallery avec lightbox

**Files:**
- Modify: `src/components/Gallery.tsx` (réécriture complète)

- [ ] **Step 1: Remplacer le contenu**

Écraser `src/components/Gallery.tsx` avec :

```typescript
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { useMotionSafe } from '../hooks/useMotionSafe';

const galleryImages = [
  { src: 'https://primary.jwwb.nl/public/y/y/r/temp-epgxyojzwxhwltvwdttk/1000172609-high.jpg?enable-io=true&enable=upscale&crop=0.6667%3A1&width=800', alt: 'Activité poterie' },
  { src: 'https://primary.jwwb.nl/public/y/y/r/temp-epgxyojzwxhwltvwdttk/img_3036-high.jpg?enable-io=true&enable=upscale&crop=0.6667%3A1&width=800', alt: 'À la découverte du monde' },
  { src: 'https://primary.jwwb.nl/public/y/y/r/temp-epgxyojzwxhwltvwdttk/img_1854-high.jpg?enable-io=true&enable=upscale&crop=0.6667%3A1&width=800', alt: 'Petite pause après une randonnée' },
  { src: 'https://primary.jwwb.nl/public/y/y/r/temp-epgxyojzwxhwltvwdttk/img_0514-high.jpg?enable-io=true&enable=upscale&crop=0.6667%3A1&width=800', alt: 'Sortie vélo pour profiter du soleil' },
];

export default function Gallery() {
  const motionSafe = useMotionSafe();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [activeIndex]);

  const active = activeIndex !== null ? galleryImages[activeIndex] : null;

  return (
    <section id="galerie" className="py-16 md:py-24 bg-cream-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <h2 className="font-serif font-semibold text-3xl md:text-4xl lg:text-5xl text-wood-900 mb-4">
            Des moments partagés
          </h2>
          <p className="text-wood-600 text-base md:text-lg">
            Quelques instants vécus lors de nos activités et sorties.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {galleryImages.map((img, i) => (
            <motion.button
              key={img.src}
              type="button"
              onClick={() => setActiveIndex(i)}
              initial={motionSafe ? { opacity: 0, y: 20 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: motionSafe ? i * 0.08 : 0 }}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] shadow-card hover:shadow-card-lg transition-shadow"
              aria-label={`Agrandir : ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          className="fixed inset-0 z-[100] bg-wood-900/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setActiveIndex(null); }}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
            aria-label="Fermer"
          >
            <X size={24} aria-hidden="true" />
          </button>
          <img
            src={active.src}
            alt={active.alt}
            className="max-w-full max-h-[85vh] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
```

- [ ] **Step 2: Vérifier la compilation**

Run: `npm run lint`
Expected: FAIL (CTAFinal toujours manquant) — OK.

- [ ] **Step 3: Vérification visuelle** (une fois CTAFinal créé en Task 6.1)

- 375px : 2 colonnes.
- 1024px : 4 colonnes.
- Cliquer une image → lightbox plein écran.
- Touche Escape ou clic sur overlay → ferme.
- Touche Tab dans la lightbox → focus sur le bouton fermer.

- [ ] **Step 4: Commit**

```bash
git add src/components/Gallery.tsx
git commit -m "feat: add lightbox to Gallery with keyboard accessibility"
```

---

## Phase 6 — CTA Final + Contact + Footer

### Task 6.1: Créer CTAFinal

**Files:**
- Create: `src/components/CTAFinal.tsx`

- [ ] **Step 1: Écrire le composant**

Créer `src/components/CTAFinal.tsx` :

```typescript
import CalendlyButton from './CalendlyButton';
import CalendlyEmbed from './CalendlyEmbed';

export default function CTAFinal() {
  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 20% 0%, rgba(224,164,88,0.25) 0%, transparent 50%), ' +
          'radial-gradient(circle at 80% 100%, rgba(224,164,88,0.18) 0%, transparent 55%), ' +
          '#A5593E',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-2xl mb-10 md:mb-12">
          <h2 className="font-serif font-semibold text-3xl md:text-4xl lg:text-5xl mb-4">
            Discutons de vos besoins
          </h2>
          <p className="text-base md:text-lg text-cream-50/90 leading-relaxed">
            1ère rencontre gratuite · Sans engagement · Je vous recontacte dans la journée.
          </p>
        </div>

        {/* Desktop: embed inline. Mobile: button. */}
        <div className="hidden md:block">
          <CalendlyEmbed minHeight={700} />
        </div>
        <div className="md:hidden flex flex-col gap-3">
          <CalendlyButton variant="accent" fullWidth size="lg">
            Ouvrir le calendrier
          </CalendlyButton>
          <a
            href="tel:+33779241915"
            className="text-center text-cream-50/90 text-sm underline underline-offset-4"
          >
            Ou appelez directement : 07 79 24 19 15
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Vérifier la compilation**

Run: `npm run lint`
Expected: PASS (enfin — tous les imports d'App.tsx sont résolus maintenant)

- [ ] **Step 3: Vérification visuelle**

Run: `npm run dev`

- 375px : bouton "Ouvrir le calendrier" miel full-width + lien tél.
- 1280px : widget Calendly inline dans un cadre blanc arrondi.
- Si `VITE_CALENDLY_URL` vide : message de fallback visible.

- [ ] **Step 4: Commit**

```bash
git add src/components/CTAFinal.tsx
git commit -m "feat: add CTAFinal section with Calendly embed + mobile button"
```

---

### Task 6.2: Refactor Contact (formulaire simplifié)

**Files:**
- Modify: `src/components/Contact.tsx` (réécriture complète)

- [ ] **Step 1: Remplacer le contenu**

Écraser `src/components/Contact.tsx` avec :

```typescript
import { FormEvent, useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { useMotionSafe } from '../hooks/useMotionSafe';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const motionSafe = useMotionSafe();
  const [formState, setFormState] = useState<FormState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName.trim()) {
      setError('Merci d\'indiquer votre prénom.');
      return;
    }
    if (!phone.trim() && !email.trim()) {
      setError('Indiquez un téléphone ou un email pour que je puisse vous recontacter.');
      return;
    }
    if (!message.trim()) {
      setError('Merci de laisser un petit message.');
      return;
    }

    // Itération actuelle : pas d'envoi réel (voir spec §10 "hors scope").
    // On simule juste un feedback de succès.
    setFormState('submitting');
    await new Promise((r) => setTimeout(r, 400));
    setFormState('success');
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-cream-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="font-serif font-semibold text-3xl md:text-4xl lg:text-5xl text-wood-900 mb-4">
            Ou laissez-moi un message
          </h2>
          <p className="text-wood-600 text-base md:text-lg">
            Je vous recontacte dans la journée.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Infos pratiques */}
          <motion.aside
            initial={motionSafe ? { opacity: 0, x: -20 } : false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 md:p-8 border border-cream-200 shadow-card"
          >
            <h3 className="font-serif font-semibold text-xl text-wood-900 mb-6">Informations pratiques</h3>
            <dl className="space-y-5 text-wood-700">
              <div className="flex items-start gap-3">
                <Phone size={20} className="text-terracotta-700 mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <dt className="font-medium text-wood-900">Téléphone</dt>
                  <dd><a href="tel:+33779241915" className="hover:text-terracotta-500">07 79 24 19 15</a></dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={20} className="text-terracotta-700 mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <dt className="font-medium text-wood-900">Email</dt>
                  <dd><a href="mailto:toneducauquotien@gmail.com" className="hover:text-terracotta-500 break-all">toneducauquotien@gmail.com</a></dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={20} className="text-terracotta-700 mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <dt className="font-medium text-wood-900">Horaires</dt>
                  <dd>Lun – Ven : 9h – 17h<br />Samedi : 10h – 15h<br />Dimanche : fermé</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-terracotta-700 mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <dt className="font-medium text-wood-900">Adresse</dt>
                  <dd>25 rue François Vincent Raspail<br />69190 Saint-Fons</dd>
                </div>
              </div>
            </dl>
          </motion.aside>

          {/* Formulaire */}
          <motion.div
            initial={motionSafe ? { opacity: 0, x: 20 } : false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 md:p-8 border border-cream-200 shadow-card"
          >
            {formState === 'success' ? (
              <div role="status" className="text-center py-8">
                <CheckCircle2 size={48} className="mx-auto text-sage-500 mb-4" aria-hidden="true" />
                <h3 className="font-serif font-semibold text-xl text-wood-900 mb-2">Merci !</h3>
                <p className="text-wood-600">Votre message a bien été pris en compte. Je vous recontacte dans la journée.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-wood-900 mb-2">
                    Prénom <span className="text-terracotta-700" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 focus:bg-white focus:border-terracotta-500 outline-none transition-colors"
                    placeholder="Jean"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-wood-900 mb-2">Téléphone</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 focus:bg-white focus:border-terracotta-500 outline-none transition-colors"
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-wood-900 mb-2">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 focus:bg-white focus:border-terracotta-500 outline-none transition-colors"
                      placeholder="vous@email.com"
                    />
                  </div>
                </div>
                <p className="text-xs text-wood-600 -mt-2">Indiquez au moins un moyen de vous recontacter.</p>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-wood-900 mb-2">
                    Message <span className="text-terracotta-700" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 focus:bg-white focus:border-terracotta-500 outline-none transition-colors resize-none"
                    placeholder="Parlez-moi brièvement de la situation..."
                  />
                </div>

                {error && (
                  <p role="alert" className="text-sm text-terracotta-700 bg-terracotta-50 rounded-lg px-4 py-3">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full bg-terracotta-500 hover:bg-terracotta-700 text-white font-semibold py-4 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-card-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {formState === 'submitting' ? 'Envoi…' : 'Envoyer le message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Vérifier la compilation**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 3: Vérification visuelle + interactions**

Dans le navigateur :
- Soumettre sans rien → erreur "Merci d'indiquer votre prénom".
- Prénom rempli, pas de tél ni email → erreur "Indiquez un téléphone ou un email…".
- Prénom + téléphone seul → erreur "Merci de laisser un petit message".
- Tous les champs valides → succès (panneau avec CheckCircle sauge).
- Navigation clavier : Tab parcourt prénom → tél → email → message → submit, ordre correct.

- [ ] **Step 4: Commit**

```bash
git add src/components/Contact.tsx
git commit -m "feat: simplify Contact form with tel-or-email validation"
```

---

### Task 6.3: Refactor Footer

**Files:**
- Modify: `src/components/Footer.tsx` (réécriture complète)

- [ ] **Step 1: Remplacer le contenu**

Écraser `src/components/Footer.tsx` avec :

```typescript
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-wood-900 text-cream-100 py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <h3 className="font-serif font-semibold text-xl mb-3">
              Ton Éduc <span className="text-honey-500">au Quotidien</span>
            </h3>
            <p className="text-cream-100/75 max-w-xs leading-relaxed">
              Accompagnement à domicile et en structure pour personnes en situation de handicap et leur famille.
              Lyon et métropole.
            </p>
          </div>

          <nav aria-label="Liens du site">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-honey-500 mb-3">Navigation</h4>
            <ul className="space-y-2 text-cream-100/85">
              <li><a href="#services" className="hover:text-honey-500 transition-colors">Services</a></li>
              <li><a href="#parcours" className="hover:text-honey-500 transition-colors">Parcours</a></li>
              <li><a href="#about" className="hover:text-honey-500 transition-colors">À propos</a></li>
              <li><a href="#temoignages" className="hover:text-honey-500 transition-colors">Témoignages</a></li>
              <li><a href="#contact" className="hover:text-honey-500 transition-colors">Contact</a></li>
            </ul>
          </nav>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-honey-500 mb-3">Contact</h4>
            <ul className="space-y-2 text-cream-100/85">
              <li><a href="tel:+33779241915" className="hover:text-honey-500 transition-colors">07 79 24 19 15</a></li>
              <li><a href="mailto:toneducauquotien@gmail.com" className="hover:text-honey-500 transition-colors break-all">toneducauquotien@gmail.com</a></li>
              <li className="text-sm">25 rue F.V. Raspail<br />69190 Saint-Fons</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-cream-100/10 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-cream-100/60">
          <p>© {year} Ton Éduc au Quotidien · Conçu avec soin.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-honey-500">Mentions légales</a>
            <a href="#" className="hover:text-honey-500">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Vérifier la compilation**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 3: Vérification visuelle**

- 375px : colonnes empilées, footer sombre bois, accents miel sur les titres.
- 1024px : 4 colonnes (logo occupe 2 largeurs).

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: restyle Footer with wood-900 background and honey accents"
```

---

## Phase 7 — Polish final + audit accessibilité

### Task 7.1: Ajouter meta description et favicon

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Ajouter les méta SEO**

Entre `<title>` et `<link rel="preconnect">`, ajouter :

```html
<meta name="description" content="TEAC — Accompagnement à domicile et en structure pour personnes en situation de handicap sur Lyon et sa métropole. Première rencontre gratuite." />
<meta property="og:title" content="Ton Éduc au Quotidien — Accompagnement à domicile" />
<meta property="og:description" content="Accompagnement bienveillant et personnalisé pour personnes en situation de handicap. Lyon métropole." />
<meta property="og:type" content="website" />
<meta name="theme-color" content="#C87456" />
```

- [ ] **Step 2: Vérifier dans le navigateur**

Ouvrir l'onglet, vérifier : titre "Ton Éduc au Quotidien", couleur de la barre d'onglet sur mobile = terracotta.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add SEO meta tags and theme color"
```

---

### Task 7.2: Audit Lighthouse + corrections éventuelles

**Files:** aucune modification a priori — uniquement correction si issue détectée.

- [ ] **Step 1: Build production**

```bash
npm run build
npm run preview
```

Ouvrir l'URL de preview (généralement `http://localhost:4173`).

- [ ] **Step 2: Lancer Lighthouse mobile**

Dans Chrome DevTools → onglet Lighthouse → catégories Performance + Accessibility + Best Practices + SEO, device Mobile, cliquer "Analyze".

Objectifs (spec §11) :
- Performance ≥ 90
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO ≥ 95

- [ ] **Step 3: Corriger les warnings**

Issues typiques à corriger si elles apparaissent :
- **Missing `lang` attribute on html** : déjà présent (`lang="fr"`).
- **Contrast issue** : si une combinaison texte/fond est signalée < 4.5:1, ajuster le token concerné.
- **Touch targets too small** : identifier le bouton, élargir padding pour atteindre 44×44px.
- **Images without alt** : rechercher `<img` sans `alt` et ajouter.
- **Missing form labels** : vérifier que chaque `<input>` a un `<label for>`.

Pour chaque correction, faire un commit atomique :
```bash
git commit -m "fix(a11y): <description précise>"
```

- [ ] **Step 4: Re-run Lighthouse**

Re-lancer après corrections jusqu'à ce que tous les scores atteignent les objectifs.

- [ ] **Step 5: Commit final si changements**

```bash
git add -A
git commit -m "chore: pass Lighthouse mobile audit (Perf 90+ / A11y 95+)"
```

---

### Task 7.3: Vérification cross-device finale

**Files:** aucune modification — vérification uniquement.

- [ ] **Step 1: Parcours utilisateur à 375px (iPhone SE)**

Dans Chrome DevTools, device iPhone SE (375×667) :
- Scroller de haut en bas : Hero → Services → À qui → Parcours → About → Témoignages → Galerie → CTA → Contact → Footer.
- Chaque section doit être lisible sans zoom horizontal.
- Le CTA "Prendre rendez-vous" doit être accessible à ≤ 1 scroll depuis n'importe quelle section (navbar sticky avec bouton desktop + sections qui contiennent un CTA au moins tous les 2 blocs).
- Cliquer "Prendre rendez-vous" du Hero, du parcours, de la navbar, du CTA final → tous ouvrent le même comportement.

- [ ] **Step 2: Parcours à 768px (iPad portrait)**

Vérifier que les grilles s'adaptent proprement (2-col au lieu de 1-col pour certaines sections).

- [ ] **Step 3: Parcours à 1280px (desktop)**

Vérifier que les max-widths sont respectées, pas de section qui s'étale sur toute la largeur du viewport.

- [ ] **Step 4: Test reduced-motion**

Dans DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion" → "reduce".
Recharger la page : les animations d'entrée sont désactivées (apparition immédiate).

- [ ] **Step 5: Navigation clavier complète**

Sans souris : `Tab` parcourt tous les éléments interactifs dans l'ordre visuel. `Enter`/`Space` active les boutons. `Esc` ferme la lightbox galerie.

- [ ] **Step 6: Commit (si besoin — seulement s'il y a eu des corrections)**

```bash
git commit -am "chore: final cross-device polish"
```

---

## Récapitulatif final

- [ ] **Step 1: Vérifier le git log**

```bash
git log --oneline main..HEAD
```

On doit voir environ 22-24 commits descriptifs.

- [ ] **Step 2: Build final**

```bash
npm run build
```

Expected: `dist/` généré sans warnings.

- [ ] **Step 3: Livrer à Emmanuelle**

Points à communiquer :
1. Variable d'environnement `VITE_CALENDLY_URL` à renseigner (sinon fallback #contact).
2. Formulaire contact actuellement en mode démo (pas d'envoi réel) — décision à prendre pour intégrer Formspree/Resend.
3. Photo About = placeholder Unsplash, à remplacer par la photo réelle d'Emmanuelle.
4. Mentions légales & politique de confidentialité = liens placeholder, à rédiger.

---

## Self-Review du plan

**1. Spec coverage** — Toutes les sections du spec sont couvertes :
- Design system §3 → Task 1.1, 1.2
- Architecture §4 → Task 4.3 (App.tsx)
- Navbar §5.1 → Task 3.1
- Hero §5.2 → Task 3.2
- À qui §5.3 → inclus dans Task 4.1
- Services §5.4 → Task 4.1
- HowItWorks §5.5 → Task 4.2
- About §5.6 → Task 5.1
- Testimonials §5.7 → Task 5.2
- Gallery §5.8 → Task 5.3
- CTAFinal §5.9 → Task 6.1
- Contact §5.10 → Task 6.2
- Footer §5.11 → Task 6.3
- Calendly §6 → Task 2.2, 2.3, 2.4, 2.5, 2.6
- Accessibilité §7 → skip link (Task 4.3), focus ring (Task 1.2), audit (Task 7.2)
- Motion §7 → useMotionSafe (Task 2.1) utilisé partout
- Perf §8 → preconnect fonts, lazy Calendly, loading=lazy images (inclus dans les tasks concernées)

**2. Placeholder scan** — Aucun "TODO", "TBD", "fill in later" dans le plan. Les "questions ouvertes" (photo About, Mentions légales, formulaire réel) sont listées en hors-scope dans le récapitulatif final, pas dans des tâches.

**3. Type consistency** —
- `useCalendly()` retourne `{ open, isOpening, isConfigured }` — utilisé de façon cohérente.
- `CalendlyButton` props : `variant`, `size`, `fullWidth`, `children`, `className`.
- `CalendlyEmbed` props : `className`, `minHeight`.
- `useMotionSafe()` retourne `boolean`.
- Tokens Tailwind (terracotta-500, sage-500, wood-900…) cohérents partout.

# 🍽️ Recipe Recommender (Interview exercise)

Single bilingual README for international and Italian reviewers.

- [ENG VERSION](#eng-version)
- [ITA VERSION](#ita-version)

---

## ENG VERSION

Web application built with Next.js/React that recommends a recipe based on a 2-step form, with user feedback and local persistence.

### 📋 Project goal

This project was built as a coding interview exercise:

- 2-step wizard (forward/back) with preserved state
- recipe recommendation from an external API based on user-selected form parameters
- Like/Dislike feedback persisted in `localStorage`
- History page with saved preferences
- at least one dynamic search/selection control
- loading, error, empty state, and fallback UI handling

Reference API: [TheMealDB](https://www.themealdb.com/api.php)

### 🧱 Tech stack

| Component     | Choice                       |
| ------------- | ---------------------------- |
| Framework     | Next.js 16 (App Router)      |
| UI            | React 19                     |
| Language      | TypeScript                   |
| Styling       | Tailwind CSS v4              |
| UI primitives | Headless UI + Heroicons      |
| Testing       | Vitest + Testing Library     |
| Quality gates | ESLint + Husky + lint-staged |

### 🗂️ Main structure

```text
app/
├── api/mealdb/                     # BFF routes (server boundary)
│   └── .../route.ts
├── components/
│   ├── card/
│   ├── button/
│   ├── feedback-dialog/            # Reusable user feedback dialog
│   ├── preference-feedback/        # Reused Yes/No prompt (form + history)
│   ├── multi-select-field/         # Headless UI Listbox multiselect
│   ├── select-field/               # Reusable single select
│   └── skeleton/
├── form/
│   ├── page.tsx                    # SSR data preload
│   ├── form-experience.tsx         # Client orchestrator (state + composition)
│   ├── hooks/
│   └── components/
│       ├── recipe-form/
│       └── suggested-recipe/
├── history/
│   ├── page.tsx                    # Saved feedback recap list
│   ├── hooks/
│   └── components/
│       └── saved-recipe-card/
└── lib/
    ├── errors/
    ├── utils/                      # history/date/constants/types
    └── mealdb/
        ├── adapters/               # mapping DTO -> domain
        ├── client/                 # client-side BFF callers
        ├── mealdb.server.ts        # upstream fetch layer
        └── types.ts
```

### 🏗️ Architectural decisions

#### 1) BFF pattern

- `app/api/mealdb/*` routes expose a stable contract to the frontend.
- `app/lib/mealdb/mealdb.server.ts` contains direct calls to TheMealDB.
- `adapters/*` normalize TheMealDB raw data into frontend-friendly structures, avoiding extra client-side reformatting and reducing CPU impact on the user device.
- `toApiErrorResponse` standardizes error responses for proxy API calls.
- `toApiSuccessResponse` standardizes successful responses in `{ data: ... }` format for proxy API calls.

Benefits:

- clear UI/provider separation
- centralized error handling
- consistent response contract across BFF routes

#### 2) State by responsibility

- **Form flow state**: local reducer (step, area, category, ingredients)
- **Recommendation state**: dedicated hook (fetch/retry/loading/error)
- **History state**: persisted in `localStorage` with a shared key and utility layer

This avoids a monolithic reducer/global store and keeps tests simpler.

#### 3) SSR + client split

- `app/form/page.tsx` (Server Component): preloads metadata (areas/categories/ingredients)
- `form-experience.tsx` (Client Component): runtime user interactions and local state

#### 4) Reusable UI primitives

- `Card`, `Button`, `Skeleton`, `SelectField`, `MultiSelectField`, `FeedbackDialog`, `PreferenceFeedback`
- `MultiSelectField` uses Headless UI `Listbox` for multi-select ingredients.
- `FeedbackDialog` uses Headless UI `Dialog` to confirm preference persistence updates.
- `PreferenceFeedback` centralizes the “Did it match your preference?” Yes/No prompt.

#### 5) Persistence + history recap

- `app/lib/utils/history.ts` centralizes localStorage logic with safe parsing/fallback.
- History shows recap cards with timestamp, selected search inputs, like/dislike status, and preference updates.
- Saved `inputs` reflect user-selected filters (`area/category/ingredients`), not the full recipe ingredient list.

#### 6) Responsive strategy

- mobile-first layout
- on `sm/md` form and result are stacked full-width
- on `lg+` form view returns to two-column layout
- in history: `sm=1`, `md=2`, `lg=4` cards per row with compact card styling

### 🌐 Used APIs (TheMealDB free tier)

- `list.php?a=list`
- `list.php?c=list`
- `list.php?i=list`
- `filter.php?a={area}`
- `lookup.php?i={id}`

Note: TheMealDB does not support combined filtering with multiple query params.  
For that reason, the app performs a broader prefetch and then applies local filtering so only recipes matching selected filters are shown.

In practice, after selecting an area, TheMealDB returns a "reduced" list with this shape:

```json
{
  "strMeal": "string",
  "strMealThumb": "string",
  "idMeal": "string"
}
```

Since the real app filtering depends on step two (category + ingredients), the app prefetches recipe details through `lookup` and then applies full filtering client-side on normalized data.
If TheMealDB natively supported multiple query params, this logic would be simplified with more targeted API calls.

### ▶️ Quick start

#### Prerequisites

- Node.js 18+
- npm

#### Install

```bash
npm install
```

#### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 🛠️ Scripts

- `npm run dev` - start development server
- `npm run build` - production build
- `npm run start` - production start
- `npm run lint` - linting
- `npm run test` - run tests in non-interactive mode (`vitest run`)

### ✅ Implementation status (checkpoint)

- [x] BFF routes + centralized error mapping
- [x] adapter layer for API normalization
- [x] split form/suggested recipe layout
- [x] responsive behavior (mobile stack + desktop split)
- [x] single select (category) with placeholder
- [x] ingredients multiselect with Headless UI Listbox
- [x] loading skeleton + error card with retry
- [x] Like/Dislike persistence in `localStorage`
- [x] feedback dialog after preference save/update
- [x] complete History section with recap cards and latest-first sorting
- [x] tests for selection logic and dynamic search

### 🧪 Current test coverage

- `Card` and `Header`: smoke + base rendering tests
- `useGetRecipes`: selection logic (`category/ingredients`), no-match, API error, dynamic filter updates

### ♿ Accessibility & UX

- Headless UI components for keyboard navigation/focus semantics
- explicit placeholders to avoid implicit selections
- visible feedback for loading/error/no-results
- semantic page structure with dedicated sections

---

## ITA VERSION

Applicazione web costruita con Next.js/React che raccomanda una ricetta in base a un form a 2 step, con feedback utente e persistenza locale.

### 📋 Obiettivo del progetto

Questo progetto nasce come coding interview:

- wizard a 2 step (forward/back) con stato preservato
- raccomandazione ricetta via API esterna in base ai parametri selezionati nel form
- feedback Like/Dislike persistito in `localStorage`
- Pagina di History con preferenze salvate
- almeno un controllo di ricerca/selezione dinamica
- gestione loading, error, empty state e fallback UI

API di riferimento: [TheMealDB](https://www.themealdb.com/api.php)

### 🧱 Stack tecnologico

| Componente    | Scelta                       |
| ------------- | ---------------------------- |
| Framework     | Next.js 16 (App Router)      |
| UI            | React 19                     |
| Linguaggio    | TypeScript                   |
| Styling       | Tailwind CSS v4              |
| UI primitives | Headless UI + Heroicons      |
| Testing       | Vitest + Testing Library     |
| Quality gates | ESLint + Husky + lint-staged |

### 🗂️ Struttura (principale)

```text
app/
├── api/mealdb/                     # BFF routes (server boundary)
│   └── .../route.ts
├── components/
│   ├── card/
│   ├── button/
│   ├── feedback-dialog/             # Dialog riutilizzabile per feedback utente
│   ├── preference-feedback/         # Prompt Yes/No riusato tra form e history
│   ├── multi-select-field/          # Listbox-based multiselect (Headless UI)
│   ├── select-field/                # Single select riutilizzabile
│   └── skeleton/
├── form/
│   ├── page.tsx                    # SSR data preload
│   ├── form-experience.tsx         # client orchestrator (state + composition)
│   ├── hooks/
│   └── components/
│       ├── recipe-form/
│       └── suggested-recipe/
├── history/
│   ├── page.tsx                    # lista recap feedback salvati
│   ├── hooks/
│   └── components/
│       └── saved-recipe-card/
└── lib/
    ├── errors/
    ├── utils/                      # history/date/constants/types
    └── mealdb/
        ├── adapters/               # mapping DTO -> domain
        ├── client/                 # client-side BFF callers
        ├── mealdb.server.ts        # upstream fetch layer
        └── types.ts
```

### 🏗️ Decisioni architetturali

#### 1) BFF pattern

- Le route `app/api/mealdb/*` espongono un contratto stabile al FE così da poter lavorare con delle strutture coerenti.
- `app/lib/mealdb/mealdb.server.ts` contiene tutte le chiamate dirette a TheMealDB.
- `adapters/*` normalizzano i dati ricevuti da TheMealDB e li convertono in strutture più "comode", evitando di riformattare i dati lato frontend e riducendo l'impatto sulla CPU dell'utente.
- `toApiErrorResponse` uniforma la gestione errori delle chiamate API dirette al proxy.
- `toApiSuccessResponse` uniforma le risposte successful in formato `{ data: ... }` delle chiamate API dirette al proxy.

Vantaggi:

- separazione UI/provider
- error handling centralizzato
- response contract coerente su tutte le route BFF

#### 2) Stato per responsabilità

- **Form flow state**: reducer locale (step, area, category, ingredients); ho scelto di non utilizzare uno state manager globale vista la natura molto piccola dell'applicativo.
- **Recommendation state**: hook dedicato (fetch/retry/loading/error); tutta la responsabilità è delegata a questo hook in modo che la pagina JSX debba solo renderizzare i dati.
- **History state**: i dati sono persistiti nel `localStorage` tramite una chiave comune e utility dedicate.

Questo evita un reducer monolitico che causa re-render dell'intero applicativo e rende i test più semplici da realizzare non dovendo mockare uno stato globale.

#### 3) SSR + Client split

- `app/form/page.tsx` (Server Component): fetch preventivo di categorie/metadata, render lato server e hydration lato client.
- `form-experience.tsx` (Client Component): interazioni utente e stato runtime.

#### 4) UI primitives riutilizzabili

- `Card`, `Button`, `Skeleton`, `SelectField`, `MultiSelectField`, `FeedbackDialog`, `PreferenceFeedback`
- `MultiSelectField` usa `Listbox` di Headless UI per selezione multipla ingredienti.
- `FeedbackDialog` usa `Dialog` di Headless UI per confermare il salvataggio preferenze.
- `PreferenceFeedback` centralizza il prompt "Did it match your preference?".

#### 5) Persistence + recap History

- `app/lib/utils/history.ts` centralizza tutta la logica di gestione del local storage con parsing safe (fallback ad array vuoto in caso di dati mancanti/corrotti).
- In History vengono mostrati recap card con timestamp, input usati nella ricerca, stato like/dislike ed è possibile aggiornare la preferenza.

#### 6) Responsive strategy

- layout mobile-first
- su `sm/md` form e risultato sono impilati a larghezza piena
- nel form principale, su schermo `lg+` il layout torna a 2 colonne; su schermi più piccoli il layout resta in colonna
- in history: `sm=1`, `md=2`, `lg=4` card per riga in base alla dimensione dello schermo

### 🌐 API usate (TheMealDB free tier)

- `list.php?a=list`
- `list.php?c=list`
- `list.php?i=list`
- `filter.php?a={area}`
- `lookup.php?i={id}`

Nota: TheMealDB non prevede API di filtraggio combinato con parametri multipli; per questo è stato implementato un pre-fetch globale seguito da filtraggio locale, così da mostrare solo ricette coerenti con i filtri selezionati dall'utente.

In pratica, dopo la selezione dell'area, TheMealDB restituisce una lista "ridotta" con questa shape:

```json
{
  "strMeal": "string",
  "strMealThumb": "string",
  "idMeal": "string"
}
```

Poiché il filtraggio reale dell'app dipende dal secondo step (category + ingredients), viene fatto un prefetch dei dettagli ricetta tramite `lookup` e poi il filtering completo avviene lato client sui dati normalizzati.
Se TheMealDB avesse supportato query param multipli nativamente, questa logica sarebbe stata semplificata con chiamate più mirate.

### ▶️ Avvio rapido

#### Prerequisiti

- Node.js 18+
- npm

#### Installazione

```bash
npm install
```

#### Sviluppo

```bash
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000).

### 🛠️ Scripts

- `npm run dev` - avvio sviluppo
- `npm run build` - build produzione
- `npm run start` - start produzione
- `npm run lint` - linting
- `npm run test` - esegue i test in modalità non interattiva (`vitest run`)

### ✅ Stato implementazione (checkpoint)

- [x] BFF routes + error mapping centralizzato
- [x] adapter layer per normalizzazione API
- [x] layout split form/suggested recipe
- [x] responsive behavior (mobile stack + desktop split)
- [x] select singola (category) con placeholder
- [x] multiselect ingredienti con Headless UI Listbox
- [x] loading skeleton + error card con retry
- [x] salvataggio feedback Like/Dislike in `localStorage`
- [x] feedback dialog dopo salvataggio preferenza
- [x] History section completa con recap card e sorting latest-first
- [x] test su selection logic e dynamic search

### 🧪 Test coverage (attuale)

- `Card` e `Header`: smoke test + rendering base
- `useGetRecipes`: selection logic (category/ingredients), no-match, errore API, aggiornamento dinamico filtri

### ♿ Accessibilità e UX

- componenti Headless UI per keyboard navigation/focus semantics
- placeholder espliciti per evitare selezioni implicite
- feedback visivo per loading/error/no-results
- struttura semantica con sezioni dedicate

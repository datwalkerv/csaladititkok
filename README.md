<div align="center">

<img src="https://raw.githubusercontent.com/datwalkerv/csaladititkok/refs/heads/main/public/logo.png" width="20%" alt="Családi Titkok" />

# csaladititkok

**Mikor megy a Családi Titkok?**

Valós idejű visszaszámláló és teljes adásrend a Családi Titkok sorozathoz a Super TV2 műsorán.

</div>

## ✨ Key Features

- **⏱️ Live Countdown**: Real-time animated countdown timer with flipping digit tiles showing exactly when the next episode airs.
- **📺 Full Schedule**: Complete upcoming episode list from the live XMLTV feed, grouped by day and paginated.
- **🌍 Timezone-Aware**: Automatically detects the visitor's timezone and displays all air times in their local time — with a country flag badge in the corner.
- **🎨 Animated Background**: Subtle, looping blob animations powered by Framer Motion for a polished, premium feel.
- **📡 Live Feed Parsing**: Fetches and parses the public XMLTV feed on the server, filtered to Super TV2 only, refreshed every hour.
- **🌟 Premium UI/UX**: Glass-surface cards, radial gradient background, Bebas Neue typography, and smooth micro-animations inspired by Apple, Linear, and Vercel.


## 🛠️ Technology Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Runtime & View Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with CSS-level custom theme variables
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Type Safety**: [TypeScript](https://www.typescriptlang.org/)
- **XML Parsing**: [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser)
- **Fonts**: [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue) (Display & Numerals)
- **Data Source**: [XMLTV Feed](https://github.com/dobrosi/xmltv) — public Hungarian TV schedule


## ⚙️ Environment Variables

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_BASE_URL` | Production URL used for canonical links, OG metadata, and sitemap | `https://csaladititkok.vercel.app` |


## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

<br>

**Made with love for Hungarian TV fans. 📺**  
*Never miss a Családi Titkok episode again.*

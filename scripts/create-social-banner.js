const sharp = require('sharp');
const fs = require('fs');

async function buildBanner() {
  const width = 1920;
  const height = 1080;
  const uploadDir = 'C:/Users/jasmi/.gemini/antigravity/brain/e4b47d56-6deb-475c-8b5d-6af3c64dda5e/.user_uploaded/';

  // 1. Crop real screenshots with borders
  const snippetImg = await sharp(uploadDir + 'media_1794672461418_bd8b1b8b.jpg')
    .extract({ left: 175, top: 120, width: 840, height: 450 })
    .resize(540, 290)
    .toBuffer();

  const courseImg = await sharp(uploadDir + 'media_1794673349173_9cf2b7e4.jpg')
    .extract({ left: 160, top: 110, width: 860, height: 460 })
    .resize(540, 290)
    .toBuffer();

  const communityImg = await sharp(uploadDir + 'media_1794673774778_933a4b93.jpg')
    .extract({ left: 165, top: 135, width: 840, height: 440 })
    .resize(540, 290)
    .toBuffer();

  const logoBuf = await sharp('public/logo-full.png')
    .resize({ height: 85 })
    .toBuffer();

  // SVG overlay for Neo-Brutalist layout
  const svgOverlay = Buffer.from(`
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <!-- Background pattern -->
    <rect width="${width}" height="${height}" fill="#F5F3FF"/>
    <defs>
      <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="2" fill="#DDD6FE"/>
      </pattern>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#grid)"/>

    <!-- Top Badge -->
    <rect x="1360" y="50" width="460" height="52" fill="#10B981" stroke="#0A0A0A" stroke-width="4"/>
    <text x="1590" y="85" font-family="Impact, Arial Black, sans-serif" font-size="22" fill="#0A0A0A" text-anchor="middle" letter-spacing="1">🚀 100% FREE &amp; OPEN-SOURCE</text>

    <!-- Main Title & Tagline -->
    <rect x="100" y="160" width="280" height="36" fill="#7C3AED" stroke="#0A0A0A" stroke-width="3"/>
    <text x="240" y="185" font-family="Courier New, monospace" font-weight="bold" font-size="18" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">DEVELOPER PLATFORM</text>

    <text x="100" y="255" font-family="Impact, Arial Black, sans-serif" font-size="62" fill="#0A0A0A" letter-spacing="1">THE ALL-IN-ONE DEVELOPER VAULT</text>
    <text x="100" y="305" font-family="Arial, sans-serif" font-weight="600" font-size="24" fill="#4B5563">Curated Snippets Vault • YouTube Playlists to Interactive Courses • Dev Communities</text>

    <!-- CARD 1: Snippets Vault -->
    <rect x="106" y="366" width="552" height="525" fill="#0A0A0A"/>
    <rect x="100" y="360" width="552" height="525" fill="#FFFFFF" stroke="#0A0A0A" stroke-width="4"/>
    <rect x="100" y="360" width="552" height="60" fill="#FEF08A" stroke="#0A0A0A" stroke-width="4"/>
    <text x="120" y="400" font-family="Impact, Arial Black, sans-serif" font-size="24" fill="#0A0A0A">⚡ CODE SNIPPETS VAULT</text>
    <rect x="500" y="374" width="135" height="34" fill="#7C3AED" stroke="#0A0A0A" stroke-width="2"/>
    <text x="567" y="396" font-family="Courier New, monospace" font-weight="bold" font-size="14" fill="#FFFFFF" text-anchor="middle">1-CLICK COPY</text>
    <text x="120" y="455" font-family="Arial, sans-serif" font-weight="bold" font-size="18" fill="#0A0A0A">Save, search &amp; reuse production code</text>
    <text x="120" y="485" font-family="Arial, sans-serif" font-size="15" fill="#4B5563">• Multi-file snippets with IDE terminal view</text>
    <text x="120" y="510" font-family="Arial, sans-serif" font-size="15" fill="#4B5563">• Flutter, React, Next.js, Python, Backend tags</text>
    <text x="120" y="535" font-family="Arial, sans-serif" font-size="15" fill="#4B5563">• 1-click instant clipboard copy</text>
    <rect x="104" y="570" width="544" height="294" fill="#0A0A0A"/>

    <!-- CARD 2: YouTube to Courses -->
    <rect x="690" y="366" width="552" height="525" fill="#0A0A0A"/>
    <rect x="684" y="360" width="552" height="525" fill="#FFFFFF" stroke="#0A0A0A" stroke-width="4"/>
    <rect x="684" y="360" width="552" height="60" fill="#F43F5E" stroke="#0A0A0A" stroke-width="4"/>
    <text x="704" y="400" font-family="Impact, Arial Black, sans-serif" font-size="24" fill="#FFFFFF">🎥 YOUTUBE → DEV COURSES</text>
    <rect x="1090" y="374" width="130" height="34" fill="#FEF08A" stroke="#0A0A0A" stroke-width="2"/>
    <text x="1155" y="396" font-family="Courier New, monospace" font-weight="bold" font-size="14" fill="#0A0A0A" text-anchor="middle">ZERO SETUP</text>
    <text x="704" y="455" font-family="Arial, sans-serif" font-weight="bold" font-size="18" fill="#0A0A0A">Turn any YouTube playlist into an LMS course</text>
    <text x="704" y="485" font-family="Arial, sans-serif" font-size="15" fill="#4B5563">• Creators paste playlist link to auto-generate</text>
    <text x="704" y="510" font-family="Arial, sans-serif" font-size="15" fill="#4B5563">• Curriculum breakdown &amp; lesson tracking</text>
    <text x="704" y="535" font-family="Arial, sans-serif" font-size="15" fill="#4B5563">• Progress percentage bar &amp; video player</text>
    <rect x="688" y="570" width="544" height="294" fill="#0A0A0A"/>

    <!-- CARD 3: Dev Communities -->
    <rect x="1274" y="366" width="552" height="525" fill="#0A0A0A"/>
    <rect x="1268" y="360" width="552" height="525" fill="#FFFFFF" stroke="#0A0A0A" stroke-width="4"/>
    <rect x="1268" y="360" width="552" height="60" fill="#67E8F9" stroke="#0A0A0A" stroke-width="4"/>
    <text x="1288" y="400" font-family="Impact, Arial Black, sans-serif" font-size="24" fill="#0A0A0A">👥 DEV HUBS &amp; SPACES</text>
    <rect x="1660" y="374" width="145" height="34" fill="#7C3AED" stroke="#0A0A0A" stroke-width="2"/>
    <text x="1732" y="396" font-family="Courier New, monospace" font-weight="bold" font-size="14" fill="#FFFFFF" text-anchor="middle">COLLABORATE</text>
    <text x="1288" y="455" font-family="Arial, sans-serif" font-weight="bold" font-size="18" fill="#0A0A0A">Collaborate with specialized tech spaces</text>
    <text x="1288" y="485" font-family="Arial, sans-serif" font-size="15" fill="#4B5563">• Flutter Artisans, Next.js &amp; React Masters</text>
    <text x="1288" y="510" font-family="Arial, sans-serif" font-size="15" fill="#4B5563">• Fullstack Ninjas, Python &amp; ML Hub</text>
    <text x="1288" y="535" font-family="Arial, sans-serif" font-size="15" fill="#4B5563">• Custom spaces, group snippets &amp; articles</text>
    <rect x="1272" y="570" width="544" height="294" fill="#0A0A0A"/>

    <!-- Bottom Footer Bar -->
    <rect x="106" y="936" width="1720" height="84" fill="#0A0A0A"/>
    <rect x="100" y="930" width="1720" height="84" fill="#0A0A0A" stroke="#0A0A0A" stroke-width="4"/>
    <text x="130" y="980" font-family="Courier New, monospace" font-weight="bold" font-size="28" fill="#FEF08A">🔗 EXPLORE: snipent-hub.vercel.app</text>
    <text x="1050" y="980" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="#FFFFFF">⚡ Fast • 📱 Fully Responsive • 🛡️ Safe &amp; Clean • 💡 Open For All</text>
  </svg>
  `);

  await sharp(svgOverlay)
    .composite([
      { input: logoBuf, top: 40, left: 100 },
      { input: snippetImg, top: 572, left: 106 },
      { input: courseImg, top: 572, left: 690 },
      { input: communityImg, top: 572, left: 1274 }
    ])
    .png()
    .toFile('public/snippethub-ui-showcase.png');

  console.log('UI Showcase Banner generated at public/snippethub-ui-showcase.png');
}

buildBanner().catch(console.error);

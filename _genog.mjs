import sharp from "sharp";
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#0369a1"/><stop offset="1" stop-color="#075985"/>
  </linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="80" y="120" font-family="Arial, sans-serif" font-size="34" fill="#bae6fd">FlightComp</text>
  <text x="80" y="250" font-family="Arial, sans-serif" font-size="80" font-weight="bold" fill="#ffffff">Flight delayed or</text>
  <text x="80" y="345" font-family="Arial, sans-serif" font-size="80" font-weight="bold" fill="#ffffff">cancelled?</text>
  <text x="80" y="445" font-family="Arial, sans-serif" font-size="46" font-weight="bold" fill="#bae6fd">Check what you're owed up to &#163;520 / &#8364;600</text>
  <text x="80" y="520" font-family="Arial, sans-serif" font-size="30" fill="#e0f2fe">UK261 &amp; EU261 · independent · claim free or via an agency</text>
</svg>`;
await sharp(Buffer.from(svg)).png().toFile("app/opengraph-image.png");
console.log("written app/opengraph-image.png");

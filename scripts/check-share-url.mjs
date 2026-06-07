import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const html = readFileSync("prototypes/99-questions-h5-v3.html", "utf8");

assert.equal(
  html.includes("web-production-5a977.up.railway.app"),
  false,
  "share URL must not point at the old Railway host"
);
assert.match(
  html,
  /const getTestShareUrl = \(\) => `\$\{window\.location\.origin\}\$\{window\.location\.pathname\}`;/,
  "share URL must be generated from the current page origin and pathname"
);
assert.match(
  html,
  /encodeURIComponent\(getTestShareUrl\(\)\)/,
  "QR URL must encode the current share URL"
);
assert.match(
  html,
  /qr\.src = getTestShareQrImage\(\);/,
  "poster QR must use the dynamic QR URL"
);

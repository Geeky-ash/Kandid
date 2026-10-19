/**
 * check-token-drift.js
 * standalone runner to verify @kandid/ui-tokens values against Stitch MCP project tokens (theme "Warm Editorial Glass", Project ID 931723337622910157).
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 running @kandid/ui-tokens automated drift check against stitch mcp (project 931723337622910157)...');

const colorsFile = fs.readFileSync(path.join(__dirname, '../src/colors.ts'), 'utf8');
const typographyFile = fs.readFileSync(path.join(__dirname, '../src/typography.ts'), 'utf8');
const radiiFile = fs.readFileSync(path.join(__dirname, '../src/radii.ts'), 'utf8');
const spacingFile = fs.readFileSync(path.join(__dirname, '../src/spacing.ts'), 'utf8');
const contrastFile = fs.readFileSync(path.join(__dirname, '../src/contrast.ts'), 'utf8');

const checks = [];

function assertContains(rule, fileContent, searchStr, notes) {
  const passed = fileContent.includes(searchStr);
  checks.push({
    rule,
    passed,
    expected: searchStr,
    actual: passed ? 'MATCH' : 'MISSING',
    notes,
  });
}

// 1. primary canvas and container background verification
assertContains('background.primary equals #FCF9F4', colorsFile, "'#FCF9F4'", 'warm editorial cream canvas');
assertContains('background.secondary equals #F0EDE9', colorsFile, "'#F0EDE9'", 'warm container background');

// 2. brand palette verification
assertContains('brand.gold equals #C5A880', colorsFile, "'#C5A880'", 'champagne gold container fill');
assertContains('brand.sage equals #5B7E68', colorsFile, "'#5B7E68'", 'sage mist feedback');
assertContains('text.primary equals #1C1A18', colorsFile, "'#1C1A18'", 'rich dark espresso text');
assertContains('text.secondary equals #6B635A', colorsFile, "'#6B635A'", 'warm mid-gray body text');

// 3. gold button contrast enforcement
assertContains('text.onGold equals espresso #1C1A18', colorsFile, "onGold: '#1C1A18'", 'white on gold strictly banned (fails wcag aa at 2.2:1)');

// 4. typography rules
assertContains('typography.headline equals Playfair Display', typographyFile, "'Playfair Display'", 'editorial headline typeface');
assertContains('typography.body equals Plus Jakarta Sans', typographyFile, "'Plus Jakarta Sans'", 'ui & body typeface');
assertContains('typography minimum text floor is 12px', typographyFile, 'bodySm: 12', 'min 12px enforced system-wide');

// 5. radii scale
assertContains('radius.pill equals 9999', radiiFile, 'pill: 9999', 'pill-shaped buttons and cue cards');
assertContains("radius.2xl equals 24", radiiFile, "'2xl': 24", 'card radius');
assertContains("radius.3xl equals 32", radiiFile, "'3xl': 32", 'modal and tab bar radius');

// 6. spacing scale
assertContains('space.marginMobile equals 20', spacingFile, 'marginMobile: 20', '1.25rem mobile layout margin');
assertContains('space.gutter equals 16', spacingFile, 'gutter: 16', '1.0rem card gutter');

// 7. contrast pairs check
assertContains('contrast pair espresso_text_on_gold_fill', contrastFile, "computedRatio: 5.5", 'meets WCAG AA');
assertContains('contrast pair primary_text_on_canvas', contrastFile, "computedRatio: 14.8", 'meets WCAG AAA');

const failedChecks = checks.filter(c => !c.passed);

if (failedChecks.length > 0) {
  console.error('\n❌ token drift check failed:');
  for (const fail of failedChecks) {
    console.error(`  - [FAILED] ${fail.rule}: expected ${fail.expected} (${fail.notes ?? ''})`);
  }
  process.exit(1);
} else {
  console.log(`\n✅ all ${checks.length} token drift & contrast checks passed with 0 unverified drift!`);
}

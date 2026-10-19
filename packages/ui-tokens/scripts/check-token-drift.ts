/**
 * check-token-drift.ts
 * verifies @kandid/ui-tokens against Stitch MCP project tokens (theme "Warm Editorial Glass", Project ID 931723337622910157).
 * executed as part of release checklist & definition of done.
 */

import { colors } from '../src/colors';
import { typography } from '../src/typography';
import { radius } from '../src/radii';
import { space } from '../src/spacing';
import { verifiedContrastPairs } from '../src/contrast';

interface ValidationResult {
  rule: string;
  passed: boolean;
  expected: string;
  actual: string;
  notes?: string;
}

const checks: ValidationResult[] = [];

function assertToken(rule: string, actual: string | number, expected: string | number, notes?: string) {
  const passed = actual === expected;
  checks.push({
    rule,
    passed,
    expected: String(expected),
    actual: String(actual),
    notes,
  });
}

console.log('🔍 running @kandid/ui-tokens automated drift check against stitch mcp (project 931723337622910157)...');

// 1. primary canvas and container background verification
assertToken('background.primary equals #FCF9F4', colors.background.primary, '#FCF9F4', 'warm editorial cream canvas');
assertToken('background.secondary equals #F0EDE9', colors.background.secondary, '#F0EDE9', 'warm container background');

// 2. brand palette verification
assertToken('brand.gold equals #C5A880', colors.brand.gold, '#C5A880', 'champagne gold container fill');
assertToken('brand.sage equals #5B7E68', colors.brand.sage, '#5B7E68', 'sage mist feedback');
assertToken('text.primary equals #1C1A18', colors.text.primary, '#1C1A18', 'rich dark espresso text');
assertToken('text.secondary equals #6B635A', colors.text.secondary, '#6B635A', 'warm mid-gray body text');

// 3. gold button contrast enforcement
assertToken('text.onGold equals espresso #1C1A18', colors.text.onGold, '#1C1A18', 'white on gold strictly banned (fails wcag aa at 2.2:1)');

// 4. typography rules
assertToken('typography.headline equals Playfair Display', typography.fontFamilies.headline, 'Playfair Display', 'editorial headline typeface');
assertToken('typography.body equals Plus Jakarta Sans', typography.fontFamilies.body, 'Plus Jakarta Sans', 'ui & body typeface');
assertToken('typography minimum text floor is >= 12px', typography.fontSize.bodySm >= 12, true, 'min 12px enforced system-wide');

// 5. radii scale
assertToken('radius.pill equals 9999', radius.pill, 9999, 'pill-shaped buttons and cue cards');
assertToken('radius.2xl equals 24', radius['2xl'], 24, 'card radius');
assertToken('radius.3xl equals 32', radius['3xl'], 32, 'modal and tab bar radius');

// 6. spacing scale
assertToken('space.marginMobile equals 20', space.marginMobile, 20, '1.25rem mobile layout margin');
assertToken('space.gutter equals 16', space.gutter, 16, '1.0rem card gutter');

// 7. wcag contrast pairs check
for (const pair of verifiedContrastPairs) {
  const passes = pair.computedRatio >= 4.5;
  checks.push({
    rule: `contrast pair: ${pair.name} >= 4.5:1`,
    passed: passes,
    expected: '>= 4.5',
    actual: `${pair.computedRatio}:1`,
    notes: pair.usageNotes,
  });
}

const failedChecks = checks.filter(c => !c.passed);

if (failedChecks.length > 0) {
  console.error('\n❌ token drift check failed:');
  for (const fail of failedChecks) {
    console.error(`  - [FAILED] ${fail.rule}: expected ${fail.expected}, got ${fail.actual} (${fail.notes ?? ''})`);
  }
  process.exit(1);
} else {
  console.log(`\n✅ all ${checks.length} token drift & contrast checks passed with 0 unverified drift!`);
}

# dataviz validate_palette.js, chart series on the dark panel

Run 2026-11-01T21:59Z. Sent #2A9FD6 (solid), confirmed #D55181 (dashed). Surface #002033.

```

Palette (dark, surface #002033, categorical): 2 slots
  [PASS] Lightness band         all 2 inside L 0.48–0.67
  [PASS] Chroma floor           all 2 >= 0.1
  [PASS] CVD separation         worst adjacent #D55181↔#2A9FD6 ΔE 13.2 (deutan) · tritan 31.8
  [PASS] Normal-vision floor    worst adjacent #D55181↔#2A9FD6 ΔE 27.1 (normal)
  [PASS] Contrast vs surface    all 2 >= 3:1

  → ALL CHECKS PASS  (CVD in the 6–8 floor band is legal ONLY with secondary encoding: direct labels, gaps, or texture)
  scope: categorical palettes only. For a lone status/text color check text contrast with this script's apca() or contrast(); for a sequential ramp, lightness monotonicity.

```

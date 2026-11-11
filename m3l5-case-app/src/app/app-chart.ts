import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { ApexOptions, ChartComponent } from 'ng-apexcharts';

/**
 * One ApexCharts chart from an options object built in charts.ts, drawn at its container's height.
 * ApexCharts reads a percentage height once, when it first draws, so the height is measured and passed
 * in pixels, and the chart is redrawn when it changes. Same wrapper as the M3 L4 app's.
 */
@Component({
  selector: 'app-chart',
  imports: [ChartComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <figure class="frame" [attr.aria-label]="label()">
      @if (sized(); as o) {
        <apx-chart
          [chart]="o.chart!"
          [series]="$any(o.series)"
          [colors]="o.colors"
          [stroke]="o.stroke"
          [fill]="o.fill"
          [xaxis]="o.xaxis"
          [yaxis]="o.yaxis"
          [grid]="o.grid"
          [legend]="o.legend"
          [markers]="o.markers"
          [dataLabels]="o.dataLabels"
          [tooltip]="o.tooltip"
          [states]="o.states"
          [annotations]="o.annotations"
          [plotOptions]="o.plotOptions"
        />
      }
    </figure>
  `,
  styles: `
    :host {
      display: block;
      position: relative;
      flex: 1 1 auto;
      min-height: 0;
    }

    /* Out of the flow, so the chart can never push its own container taller. */
    .frame {
      position: absolute;
      inset: 0;
      margin: 0;
    }
  `,
})
export class AppChart {
  readonly options = input.required<ApexOptions>();
  /** What the chart shows, for screen readers. */
  readonly label = input.required<string>();

  private readonly height = signal(0);
  readonly sized = computed<ApexOptions | null>(() => {
    const h = this.height();
    const o = this.options();
    return h > 0 ? { ...o, chart: { ...o.chart!, height: h } } : null;
  });

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const observer = new ResizeObserver(([entry]) => {
      const h = Math.floor(entry.contentRect.height);
      // Small changes are layout jitter; redrawing for them would only flicker.
      if (h > 0 && Math.abs(h - this.height()) > 6) this.height.set(h);
    });
    afterNextRender(() => observer.observe(host));
    inject(DestroyRef).onDestroy(() => observer.disconnect());
  }
}

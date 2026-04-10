import type { SliceRendererProps } from '@/slices/types';
import type { CmsSlice } from '@/lib/site-data/types';

export default function TestimonialRail({ slice }: SliceRendererProps<CmsSlice>) {
  return (
    <section className={`slice slice-testimonials slice-testimonials--${slice.variation}`}>
      <div className="container section-shell">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">{String(slice.primary.eyebrow ?? '')}</p>
          <h2>{String(slice.primary.title ?? '')}</h2>
        </div>
        <div className="testimonial-grid" data-reveal-group>
          {slice.items.map((item, index) => (
            <blockquote key={`${slice.id}-${index}`} className="testimonial-card">
              <p>“{String(item.quote ?? '')}”</p>
              <footer>
                <strong>{String(item.name ?? '')}</strong>
                <span>{String(item.role ?? '')}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

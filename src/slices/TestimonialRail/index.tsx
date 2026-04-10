import type { SliceRendererProps } from '@/slices/types';
import type { CmsSlice } from '@/lib/site-data/types';
import { textValue } from '@/slices/utils';

export default function TestimonialRail({ slice }: SliceRendererProps<CmsSlice>) {
  return (
    <section className={`slice slice-testimonials slice-testimonials--${slice.variation}`}>
      <div className="container section-shell">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">{textValue(slice.primary.eyebrow)}</p>
          <h2>{textValue(slice.primary.title)}</h2>
        </div>
        <div className="testimonial-grid" data-reveal-group>
          {slice.items.map((item, index) => (
            <blockquote key={`${slice.id}-${index}`} className="testimonial-card">
              <p>“{textValue(item.quote)}”</p>
              <footer>
                <strong>{textValue(item.name)}</strong>
                <span>{textValue(item.role)}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

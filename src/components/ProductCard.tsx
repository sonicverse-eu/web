import ProjectIcon from './ProjectIcon';

export interface ProductCardProps {
  slug: string;
  title: string;
  summary: string;
  status: string;
  href: string;
  audience?: string;
  index?: number;
}

export default function ProductCard({
  slug,
  title,
  summary,
  status,
  href,
  audience,
  index = 0,
}: ProductCardProps) {
  return (
    <a
      className="product-card"
      href={href}
      data-reveal
      data-reveal-delay={(index * 0.1).toFixed(2)}
    >
      <div className="product-card-icon">
        <ProjectIcon slug={slug} size={22} />
      </div>
      <div className="product-card-header">
        <div className="product-card-title-row">
          <h3 className="product-card-title">{title}</h3>
          <span className={`badge badge-${status}`}>{status}</span>
        </div>
        <p className="product-card-summary">{summary}</p>
      </div>
      {audience && <p className="product-card-audience">{audience}</p>}
      <span className="product-card-cta">Explore project →</span>
    </a>
  );
}

export interface Partner {
  name: string;
  src: string;
  href?: string;
}

interface LogoCloudProps {
  label?: string;
  partners: Partner[];
}

export default function LogoCloud({ label, partners }: LogoCloudProps) {
  if (!partners.length) return null;

  return (
    <div className="logo-cloud card bg-base-100 shadow-lg" data-reveal>
      {label && <p className="logo-cloud-label">{label}</p>}
      {partners.map((partner) =>
        partner.href ? (
          <a
            key={partner.name}
            href={partner.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={partner.name}
          >
            <img src={partner.src} alt={partner.name} loading="lazy" />
          </a>
        ) : (
          <img key={partner.name} src={partner.src} alt={partner.name} loading="lazy" />
        )
      )}
    </div>
  );
}

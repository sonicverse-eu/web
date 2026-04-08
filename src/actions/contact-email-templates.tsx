import type { CSSProperties, ReactNode } from 'react';

type EmailShellProps = {
  accent: string;
  background: string;
  cardStyle: CSSProperties;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

type TeamContactEmailProps = {
  threadId: string;
  name: string;
  email: string;
  company?: string;
  detailsUrl?: string;
  category: string;
  message: string;
};

type SubmitterContactEmailProps = {
  threadId: string;
  name: string;
  detailsUrl?: string;
  category: string;
  message: string;
};

const shellStyle: CSSProperties = {
  margin: 0,
  padding: '28px',
  fontFamily: 'Arial, sans-serif',
  color: '#1f1236'
};

const cardStyle: CSSProperties = {
  width: '100%',
  maxWidth: '680px',
  margin: '0 auto',
  borderCollapse: 'collapse',
  background: '#ffffff',
  borderRadius: '18px',
  overflow: 'hidden',
  boxShadow: '0 12px 36px rgba(68,35,145,0.15)'
};

const submitterCardStyle: CSSProperties = {
  ...cardStyle,
  maxWidth: '640px',
  boxShadow: '0 12px 36px rgba(42,87,167,0.14)'
};

const headerCellStyle: CSSProperties = {
  padding: '22px 24px',
  color: '#ffffff'
};

const bodyCellStyle: CSSProperties = {
  padding: '20px 24px'
};

const eyebrowStyle: CSSProperties = {
  margin: 0,
  fontSize: '12px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  opacity: 0.9
};

const titleStyle: CSSProperties = {
  margin: '8px 0 0',
  fontSize: '24px',
  lineHeight: 1.2
};

const subtitleStyle: CSSProperties = {
  margin: '10px 0 0',
  fontSize: '14px',
  opacity: 0.92
};

const infoTableStyle: CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  border: '1px solid #e7dfff',
  borderRadius: '12px',
  overflow: 'hidden'
};

const keyCellStyle: CSSProperties = {
  padding: '10px 12px',
  fontWeight: 700,
  color: '#4f2ea4',
  borderBottom: '1px solid #e7dfff'
};

const valueCellStyle: CSSProperties = {
  padding: '10px 12px',
  color: '#2b1c4a',
  borderBottom: '1px solid #e7dfff'
};

const sectionTitleStyle: CSSProperties = {
  margin: '20px 0 8px',
  fontSize: '16px',
  color: '#2c1a52'
};

const messageBoxStyle: CSSProperties = {
  padding: '14px',
  borderRadius: '12px',
  fontSize: '14px',
  lineHeight: 1.6,
  whiteSpace: 'pre-wrap'
};

const threadBadgeStyle: CSSProperties = {
  margin: '0 0 16px',
  padding: '10px 12px',
  borderRadius: '10px',
  background: '#eef5ff',
  color: '#204a99',
  fontSize: '15px',
  fontWeight: 700
};

const bodyCopyStyle: CSSProperties = {
  margin: '0 0 12px',
  fontSize: '15px',
  lineHeight: 1.65
};

const metaCopyStyle: CSSProperties = {
  margin: '0 0 12px',
  fontSize: '14px',
  color: '#3d2b63'
};

const messageLabelStyle: CSSProperties = {
  margin: '0 0 8px',
  fontSize: '13px',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: '#6f5ea0'
};

const footerCopyStyle: CSSProperties = {
  margin: '16px 0 0',
  fontSize: '14px',
  lineHeight: 1.6,
  color: '#514172'
};

const linkStyle: CSSProperties = {
  color: '#2358bb'
};

function EmailShell({ accent, background, cardStyle, eyebrow, title, subtitle, children }: EmailShellProps) {
  return (
    <div style={{ ...shellStyle, background }}>
      <table role="presentation" width="100%" style={cardStyle}>
        <tbody>
          <tr>
            <td style={{ ...headerCellStyle, background: accent }}>
              <p style={eyebrowStyle}>{eyebrow}</p>
              <h1 style={titleStyle}>{title}</h1>
              {subtitle ? <p style={subtitleStyle}>{subtitle}</p> : null}
            </td>
          </tr>
          <tr>
            <td style={bodyCellStyle}>{children}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function InfoTable({ rows }: { rows: Array<[string, string]> }) {
  return (
    <table role="presentation" width="100%" style={infoTableStyle}>
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label}>
            <td style={keyCellStyle}>{label}</td>
            <td style={valueCellStyle}>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function TeamContactEmail({
  threadId,
  name,
  email,
  company,
  detailsUrl,
  category,
  message
}: TeamContactEmailProps) {
  const rows: Array<[string, string]> = [
    ['Thread ID', threadId],
    ['Name', name],
    ['Email', email],
    ['Company', company || '-'],
    ['Reference URL', detailsUrl || '-'],
    ['Category', category]
  ];

  return (
    <EmailShell
      accent="linear-gradient(135deg,#6b33df,#4f7dff)"
      background="#f4efff"
      cardStyle={cardStyle}
      eyebrow="Sonicverse Contact Desk"
      title="New inbound request"
      subtitle={`Thread: ${threadId}`}
    >
      <InfoTable rows={rows} />
      <h2 style={sectionTitleStyle}>Message</h2>
      <div
        style={{
          ...messageBoxStyle,
          border: '1px solid #e7dfff',
          background: '#faf8ff'
        }}
      >
        {message}
      </div>
    </EmailShell>
  );
}

export function SubmitterContactEmail({
  threadId,
  name,
  detailsUrl,
  category,
  message
}: SubmitterContactEmailProps) {
  return (
    <EmailShell
      accent="linear-gradient(135deg,#2f6df7,#34a4ff)"
      background="#eff4ff"
      cardStyle={submitterCardStyle}
      eyebrow="Sonicverse Support"
      title="Your request is in"
    >
      <p style={bodyCopyStyle}>
        Hi {name}, thanks for reaching out. Your request has been routed and tracked with this thread
        ID:
      </p>
      <p style={threadBadgeStyle}>{threadId}</p>
      <p style={metaCopyStyle}>Request type: {category}</p>
      {detailsUrl ? (
        <p style={metaCopyStyle}>
          Reference URL: <a href={detailsUrl} style={linkStyle}>{detailsUrl}</a>
        </p>
      ) : null}
      <p style={messageLabelStyle}>Your message</p>
      <div
        style={{
          ...messageBoxStyle,
          border: '1px solid #dbe8ff',
          background: '#f9fbff'
        }}
      >
        {message}
      </div>
      <p style={footerCopyStyle}>A maintainer will follow up within two business days.</p>
    </EmailShell>
  );
}

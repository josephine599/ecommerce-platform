export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      color: 'white',
      marginTop: '6rem',
      padding: '4rem 2rem 1.5rem',
      borderTop: '3px solid #0ea5e9',
      width: '100vw',
      marginLeft: 'calc(-50vw + 50%)',
      marginRight: 'calc(-50vw + 50%)',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', marginBottom: '2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Brand Section */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2rem' }}>🎁</span>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700',
                background: 'linear-gradient(135deg, #0ea5e9, #e84c3d)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: 0
              }}>
                JozeyStore
              </h3>
            </div>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1rem' }}>
              Premium quality products delivered fast to your doorstep.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <a href="#" title="Facebook" style={{ color: '#0ea5e9', fontSize: '1.5rem', transition: 'all 0.3s', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>📱</a>
              <a href="#" title="Twitter" style={{ color: '#0ea5e9', fontSize: '1.5rem', transition: 'all 0.3s', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>🐦</a>
              <a href="#" title="Instagram" style={{ color: '#0ea5e9', fontSize: '1.5rem', transition: 'all 0.3s', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>📷</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ marginBottom: '1rem', fontWeight: '600', fontSize: '1rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.75rem' }}>
                <a href="/" style={{ color: '#cbd5e1', transition: 'all 0.3s ease', textDecoration: 'none', paddingLeft: '0.5rem', display: 'inline-block' }} 
                   onMouseEnter={(e) => { e.target.style.color = '#0ea5e9'; e.target.style.paddingLeft = '1rem'; }}
                   onMouseLeave={(e) => { e.target.style.color = '#cbd5e1'; e.target.style.paddingLeft = '0.5rem'; }}>
                  ➜ Home
                </a>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <a href="/cart" style={{ color: '#cbd5e1', transition: 'all 0.3s ease', textDecoration: 'none', paddingLeft: '0.5rem', display: 'inline-block' }}
                   onMouseEnter={(e) => { e.target.style.color = '#0ea5e9'; e.target.style.paddingLeft = '1rem'; }}
                   onMouseLeave={(e) => { e.target.style.color = '#cbd5e1'; e.target.style.paddingLeft = '0.5rem'; }}>
                  ➜ Shop
                </a>
              </li>
              <li>
                <a href="/" style={{ color: '#cbd5e1', transition: 'all 0.3s ease', textDecoration: 'none', paddingLeft: '0.5rem', display: 'inline-block' }}
                   onMouseEnter={(e) => { e.target.style.color = '#0ea5e9'; e.target.style.paddingLeft = '1rem'; }}
                   onMouseLeave={(e) => { e.target.style.color = '#cbd5e1'; e.target.style.paddingLeft = '0.5rem'; }}>
                  ➜ Account
                </a>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h4 style={{ marginBottom: '1rem', fontWeight: '600', fontSize: '1rem' }}>Support</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.75rem' }}>
                <span style={{ color: '#cbd5e1', fontSize: '0.9rem', display: 'block' }}>📧 anyangojozey@gmail.com</span>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <span style={{ color: '#cbd5e1', fontSize: '0.9rem', display: 'block' }}>📱 +254 703290162</span>
              </li>
              <li>
                <span style={{ color: '#10b981', fontSize: '0.9rem', display: 'block', fontWeight: '500' }}>✓ Mon - Fri: 9AM - 6PM</span>
              </li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h4 style={{ marginBottom: '1rem', fontWeight: '600', fontSize: '1rem' }}>Payment Methods</h4>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{ background: '#1e293b', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.85rem', color: '#cbd5e1', border: '1px solid #0ea5e9' }}>💳 Card</span>
              <span style={{ background: '#1e293b', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.85rem', color: '#cbd5e1', border: '1px solid #10b981' }}>📞 M-Pesa</span>
              <span style={{ background: '#1e293b', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.85rem', color: '#cbd5e1', border: '1px solid #06b6d4' }}>🏦 Bank</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '1.5rem',
          textAlign: 'center',
          color: '#94a3b8'
        }}>
          <p style={{ fontSize: '0.875rem' }}>
            © {currentYear} JozeyStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
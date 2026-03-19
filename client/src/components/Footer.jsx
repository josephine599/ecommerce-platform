import { useState } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showMpesaModal, setShowMpesaModal] = useState(false);
  const [mpesaNumber, setMpesaNumber] = useState('');

  const handleMpesaClick = () => {
    setSelectedPayment('mpesa');
    setShowMpesaModal(true);
    setMpesaNumber('');
  };

  const handleMpesaSubmit = () => {
    if (mpesaNumber.trim()) {
      alert(`M-Pesa payment initiated for: ${mpesaNumber}`);
      setShowMpesaModal(false);
    } else {
      alert('Please enter a valid phone number');
    }
  };

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
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook" style={{ color: '#0ea5e9', fontSize: '1.5rem', transition: 'all 0.3s', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}> 📱 </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter" style={{ color: '#0ea5e9', fontSize: '1.5rem', transition: 'all 0.3s', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}> 🐦 </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram" style={{ color: '#0ea5e9', fontSize: '1.5rem', transition: 'all 0.3s', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}> 📷 </a>
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
                <a href="mailto:anyangojozey@gmail.com" style={{ color: '#cbd5e1', fontSize: '0.9rem', display: 'block', textDecoration: 'none', transition: 'all 0.3s ease', cursor: 'pointer' }} 
                   onMouseEnter={(e) => { e.currentTarget.style.color = '#0ea5e9'; }}
                   onMouseLeave={(e) => { e.currentTarget.style.color = '#cbd5e1'; }}>
                  📧 anyangojozey@gmail.com
                </a>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <a href="tel:+254703290162" style={{ color: '#cbd5e1', fontSize: '0.9rem', display: 'block', textDecoration: 'none', transition: 'all 0.3s ease', cursor: 'pointer' }} 
                   onMouseEnter={(e) => { e.currentTarget.style.color = '#0ea5e9'; }}
                   onMouseLeave={(e) => { e.currentTarget.style.color = '#cbd5e1'; }}>
                  📱 +254 703290162
                </a>
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
              <button 
                onClick={() => setSelectedPayment('card')}
                style={{ 
                  background: selectedPayment === 'card' ? '#0ea5e9' : '#1e293b',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  color: selectedPayment === 'card' ? '#0f172a' : '#cbd5e1',
                  border: `2px solid ${selectedPayment === 'card' ? '#0ea5e9' : '#0ea5e9'}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontWeight: selectedPayment === 'card' ? '600' : '400'
                }}
                onMouseEnter={(e) => {
                  if (selectedPayment !== 'card') {
                    e.currentTarget.style.background = '#334155';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedPayment !== 'card') {
                    e.currentTarget.style.background = '#1e293b';
                  }
                }}
              >
                💳 Card
              </button>
              <button 
                onClick={handleMpesaClick}
                style={{ 
                  background: selectedPayment === 'mpesa' ? '#10b981' : '#1e293b',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  color: selectedPayment === 'mpesa' ? '#0f172a' : '#cbd5e1',
                  border: `2px solid ${selectedPayment === 'mpesa' ? '#10b981' : '#10b981'}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontWeight: selectedPayment === 'mpesa' ? '600' : '400'
                }}
                onMouseEnter={(e) => {
                  if (selectedPayment !== 'mpesa') {
                    e.currentTarget.style.background = '#059669';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedPayment !== 'mpesa') {
                    e.currentTarget.style.background = '#1e293b';
                  }
                }}
              >
                📞 M-Pesa
              </button>
              <button 
                onClick={() => setSelectedPayment('bank')}
                style={{ 
                  background: selectedPayment === 'bank' ? '#06b6d4' : '#1e293b',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  color: selectedPayment === 'bank' ? '#0f172a' : '#cbd5e1',
                  border: `2px solid ${selectedPayment === 'bank' ? '#06b6d4' : '#06b6d4'}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontWeight: selectedPayment === 'bank' ? '600' : '400'
                }}
                onMouseEnter={(e) => {
                  if (selectedPayment !== 'bank') {
                    e.currentTarget.style.background = '#0891b2';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedPayment !== 'bank') {
                    e.currentTarget.style.background = '#1e293b';
                  }
                }}
              >
                🏦 Bank
              </button>
            </div>
            {selectedPayment && (
              <p style={{ color: '#0ea5e9', fontSize: '0.75rem', marginTop: '0.5rem', fontWeight: '500' }}>
                ✓ {selectedPayment === 'card' ? 'Credit/Debit Card' : selectedPayment === 'mpesa' ? 'M-Pesa' : 'Bank Transfer'} selected
              </p>
            )}
          </div>
        </div>

        {/* M-Pesa Modal */}
        {showMpesaModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              padding: '2rem',
              borderRadius: '12px',
              border: '2px solid #10b981',
              minWidth: '300px',
              maxWidth: '500px',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
            }}>
              <h3 style={{ color: '#10b981', marginTop: 0, marginBottom: '1rem' }}>
                📞 Enter M-Pesa Number
              </h3>
              <p style={{ color: '#cbd5e1', marginBottom: '1rem', fontSize: '0.9rem' }}>
                Please enter your M-Pesa registered phone number to proceed with payment.
              </p>
              <input
                type="tel"
                placeholder="e.g., +254 703 290 162"
                value={mpesaNumber}
                onChange={(e) => setMpesaNumber(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleMpesaSubmit()}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: '2px solid #10b981',
                  background: '#1e293b',
                  color: '#cbd5e1',
                  fontSize: '0.95rem',
                  boxSizing: 'border-box',
                  marginBottom: '1rem',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#0ea5e9'}
                onBlur={(e) => e.target.style.borderColor = '#10b981'}
              />
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => {
                    setShowMpesaModal(false);
                    setMpesaNumber('');
                  }}
                  style={{
                    padding: '0.5rem 1.5rem',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    background: 'transparent',
                    color: '#cbd5e1',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#334155';
                    e.currentTarget.style.borderColor = '#0ea5e9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = '#cbd5e1';
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleMpesaSubmit}
                  style={{
                    padding: '0.5rem 1.5rem',
                    borderRadius: '6px',
                    border: 'none',
                    background: '#10b981',
                    color: '#0f172a',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#059669';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#10b981';
                  }}
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        )}

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
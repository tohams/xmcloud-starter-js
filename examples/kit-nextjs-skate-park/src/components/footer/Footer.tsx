'use client';

import React, { useState } from 'react';
import './footer.css';

// Social media icons as SVG components
const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const PinterestIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
  </svg>
);

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    style={{ 
      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.3s ease'
    }}
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const ArrowIcon = () => (
  <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
    <path d="M1.5 1L6.5 6L1.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink = ({ href, children }: FooterLinkProps) => (
  <a href={href} className="footer-link">
    <span>{children}</span>
    <ArrowIcon />
  </a>
);

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionSection = ({ title, children, isOpen, onToggle }: AccordionSectionProps) => (
  <div className="footer-accordion">
    <button className="footer-accordion__header" onClick={onToggle} aria-expanded={isOpen}>
      <span>{title}</span>
      <ChevronIcon isOpen={isOpen} />
    </button>
    <div className={`footer-accordion__content ${isOpen ? 'footer-accordion__content--open' : ''}`}>
      {children}
    </div>
  </div>
);

const Footer = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const aboutUsLinks = [
    { href: '/about-us/about-the-aha-asa', label: 'About the AHA/ASA' },
    { href: '/about-us/our-impact', label: 'Our Impact' },
    { href: '/about-us/annual-report', label: 'Annual Report' },
    { href: '/about-us/financial-information', label: 'Financial Information' },
    { href: '/about-us/international-programs', label: 'International Programs' },
    { href: '/about-us/latest-heart-and-stroke-news', label: 'Latest Heart and Stroke News' },
    { href: '/about-us/media-newsroom', label: 'Media Newsroom' },
    { href: '/about-us/careers', label: 'Careers' },
  ];

  const getInvolvedLinks = [
    { href: '/get-involved/donate-now', label: 'Donate Now' },
    { href: '/get-involved/make-a-memorial-gift', label: 'Make a Memorial Gift' },
    { href: '/get-involved/ways-to-give', label: 'Ways to Give' },
    { href: '/get-involved/advocate', label: 'Advocate' },
    { href: '/get-involved/volunteer', label: 'Volunteer' },
    { href: '/get-involved/go-red-for-women', label: 'Go Red For Women' },
    { href: '/get-involved/shopheart', label: 'ShopHeart' },
    { href: '/get-involved/shopcpr', label: 'ShopCPR' },
  ];

  const ourSitesLinks = [
    { href: 'https://www.heart.org', label: 'American Heart Association' },
    { href: 'https://www.stroke.org', label: 'American Stroke Association' },
    { href: '/cpr-and-ecc', label: 'CPR & ECC' },
    { href: '/professional-heart-daily', label: 'Professional Heart Daily' },
    { href: '/more-sites', label: 'More Sites' },
  ];

  const policyLinks = [
    { href: '/careers', label: 'Careers' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/medical-advice-disclaimer', label: 'Medical Advice Disclaimer' },
    { href: '/accessibility-statement', label: 'Accessibility Statement' },
    { href: '/copyright-policy', label: 'Copyright Policy' },
    { href: '/ethics-policy', label: 'Ethics Policy' },
    { href: '/conflict-of-interest-policy', label: 'Conflict of Interest Policy' },
    { href: '/linking-policy', label: 'Linking Policy' },
    { href: '/whistleblower-policy', label: 'Whistleblower Policy' },
    { href: '/content-editorial-guidelines', label: 'Content Editorial Guidelines' },
    { href: '/suppliers-and-providers', label: 'Suppliers & Providers' },
    { href: '/state-fundraising-notices', label: 'State Fundraising Notices' },
  ];

  return (
    <footer className="aha-footer">
      {/* Disclaimer */}
      <div className="footer-disclaimer">
        <p>
          *All health/medical information on this website has been reviewed and approved by the American Heart Association, based on scientific research and American Heart Association guidelines.{' '}
          <a href="/content-editorial-process">Find more information on our content editorial process.</a>
        </p>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-main__inner">
          {/* Desktop Layout */}
          <div className="footer-desktop">
            {/* Column 1: Logo and Contact Info */}
            <div className="footer-column footer-column--contact">
            <div className="footer-logo">
              <img 
                src="/AHA_Full.svg" 
                alt="American Heart Association" 
                width="160"
              />
            </div>
              
              <div className="footer-contact-info">
                <h4>National Center</h4>
                <p>7272 Greenville Ave.</p>
                <p>Dallas, TX 75231</p>
              </div>

              <div className="footer-contact-info">
                <h4>Customer Service</h4>
                <p>1-800-242-8721</p>
              </div>

              <a href="/contact-us" className="footer-contact-button">
                Contact Us
              </a>

              <div className="footer-contact-info">
                <h4>Hours</h4>
                <p>Monday - Friday: 7 a.m. – 7 p.m. CT</p>
                <p>Saturday: 9 a.m. - 5 p.m. CT</p>
                <p>Closed on Sundays</p>
              </div>

              <div className="footer-contact-info">
                <h4>Tax Identification Number</h4>
                <p>13-5613797</p>
              </div>
            </div>

            {/* Column 2: About Us */}
            <div className="footer-column">
              <h3 className="footer-column__title">About Us</h3>
              <nav className="footer-links">
                {aboutUsLinks.map((link) => (
                  <FooterLink key={link.href} href={link.href}>{link.label}</FooterLink>
                ))}
              </nav>
            </div>

            {/* Column 3: Get Involved */}
            <div className="footer-column">
              <h3 className="footer-column__title">Get Involved</h3>
              <nav className="footer-links">
                {getInvolvedLinks.map((link) => (
                  <FooterLink key={link.href} href={link.href}>{link.label}</FooterLink>
                ))}
              </nav>
            </div>

            {/* Column 4: Our Sites */}
            <div className="footer-column">
              <h3 className="footer-column__title">Our Sites</h3>
              <nav className="footer-links">
                {ourSitesLinks.map((link) => (
                  <FooterLink key={link.href} href={link.href}>{link.label}</FooterLink>
                ))}
              </nav>
            </div>
          </div>

          {/* Mobile Layout - Accordions */}
          <div className="footer-mobile">
            {/* Logo */}
            <div className="footer-mobile__logo">
              <img 
                src="/AHA_Full.svg" 
                alt="American Heart Association" 
                width="150"
              />
            </div>

            {/* Contact Us Accordion */}
            <AccordionSection 
              title="Contact Us" 
              isOpen={openSection === 'contact'} 
              onToggle={() => toggleSection('contact')}
            >
              <div className="footer-accordion__contact">
                <div className="footer-contact-info">
                  <h4>National Center</h4>
                  <p>7272 Greenville Ave.</p>
                  <p>Dallas, TX 75231</p>
                </div>
                <div className="footer-contact-info">
                  <h4>Customer Service</h4>
                  <p>1-800-242-8721</p>
                </div>
                <a href="/contact-us" className="footer-contact-button">Contact Us</a>
                <div className="footer-contact-info">
                  <h4>Hours</h4>
                  <p>Monday - Friday: 7 a.m. – 7 p.m. CT</p>
                  <p>Saturday: 9 a.m. - 5 p.m. CT</p>
                  <p>Closed on Sundays</p>
                </div>
                <div className="footer-contact-info">
                  <h4>Tax Identification Number</h4>
                  <p>13-5613797</p>
                </div>
              </div>
            </AccordionSection>

            {/* About Us Accordion */}
            <AccordionSection 
              title="About Us" 
              isOpen={openSection === 'about'} 
              onToggle={() => toggleSection('about')}
            >
              <nav className="footer-links">
                {aboutUsLinks.map((link) => (
                  <FooterLink key={link.href} href={link.href}>{link.label}</FooterLink>
                ))}
              </nav>
            </AccordionSection>

            {/* Get Involved Accordion */}
            <AccordionSection 
              title="Get Involved" 
              isOpen={openSection === 'involved'} 
              onToggle={() => toggleSection('involved')}
            >
              <nav className="footer-links">
                {getInvolvedLinks.map((link) => (
                  <FooterLink key={link.href} href={link.href}>{link.label}</FooterLink>
                ))}
              </nav>
            </AccordionSection>

            {/* Our Sites Accordion */}
            <AccordionSection 
              title="Our Sites" 
              isOpen={openSection === 'sites'} 
              onToggle={() => toggleSection('sites')}
            >
              <nav className="footer-links">
                {ourSitesLinks.map((link) => (
                  <FooterLink key={link.href} href={link.href}>{link.label}</FooterLink>
                ))}
              </nav>
            </AccordionSection>
          </div>
        </div>
      </div>

      {/* Social and Trust Badges */}
      <div className="footer-social-section">
        <div className="footer-social-section__inner">
          <div className="footer-social">
            <a href="https://www.facebook.com/AmericanHeart" aria-label="Facebook" className="footer-social__icon">
              <FacebookIcon />
            </a>
            <a href="https://www.instagram.com/american_heart" aria-label="Instagram" className="footer-social__icon">
              <InstagramIcon />
            </a>
            <a href="https://twitter.com/American_Heart" aria-label="X (Twitter)" className="footer-social__icon">
              <XIcon />
            </a>
            <a href="https://www.tiktok.com/@americanheartassociation" aria-label="TikTok" className="footer-social__icon">
              <TikTokIcon />
            </a>
            <a href="https://www.youtube.com/user/americanheartassoc" aria-label="YouTube" className="footer-social__icon">
              <YouTubeIcon />
            </a>
            <a href="https://www.linkedin.com/company/american-heart-association" aria-label="LinkedIn" className="footer-social__icon">
              <LinkedInIcon />
            </a>
            <a href="https://www.pinterest.com/americanheart" aria-label="Pinterest" className="footer-social__icon">
              <PinterestIcon />
            </a>
          </div>

          <div className="footer-badges">
            <a href="#" className="footer-badge-link">
              <img src="/images/footer/nhc_optimized.png" alt="National Health Council Standards of Excellence Certification Program" />
            </a>
            <a href="#" className="footer-badge-link">
              <img src="/images/footer/Better_Business_Bureau_logo.png" alt="BBB Accredited Charity" />
            </a>
            <a href="#" className="footer-badge-link">
              <img src="/images/footer/Charity_Navigator_logo_120.jpg" alt="Charity Navigator 4-Star Rating" />
            </a>
            <a href="#" className="footer-badge-link">
              <img src="/images/footer/sectigo_trust_seal_140w.png" alt="Secured by Sectigo" />
            </a>
          </div>
        </div>
      </div>

      {/* Policy Links */}
      <div className="footer-policy">
        <div className="footer-policy__inner">
          <nav className="footer-policy__links">
            {policyLinks.map((link, index) => (
              <React.Fragment key={link.href}>
                <a href={link.href}>{link.label}</a>
                {index < policyLinks.length - 1 && <span className="footer-policy__divider">|</span>}
              </React.Fragment>
            ))}
          </nav>
          
          <a href="/your-privacy-rights" className="footer-policy__privacy">Your Privacy Rights</a>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        <div className="footer-copyright__inner">
          <p>©2026 American Heart Association, Inc. All rights reserved. Unauthorized use prohibited.</p>
          <p>The American Heart Association is a qualified 501(c)(3) tax-exempt organization.</p>
          <p>*Red Dress ™ DHHS, Go Red ™ AHA ; National Wear Red Day® is a registered trademark.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

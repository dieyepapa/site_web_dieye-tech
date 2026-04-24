import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  const [lang, setLang] = useState('fr');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const observerRef = useRef(null);

  // Navigation scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reveal on scroll observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const toggleLang = () => {
    setLang(lang === 'fr' ? 'en' : 'fr');
  };

  const openMenu = () => {
    setIsMenuOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  const handleNavClick = (id) => {
    closeMenu();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleServiceClick = (serviceId) => {
    closeMenu();
    const element = document.getElementById(`service-${serviceId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getText = (fr, en) => {
    return lang === 'fr' ? fr : en;
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <a href="#hero" className="nav-logo" onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}>
          Dieye'<span>Tech</span>
        </a>
        <ul className="nav-links">
          <li><a href="#hero" onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}>{getText('Accueil', 'Home')}</a></li>
          <li><a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>{getText('À Propos', 'About')}</a></li>
          <li className="dropdown">
            <button className="dropdown-btn">{getText('Services', 'Services')} ▼</button>
            <div className="dropdown-content">
              <a href="#service-web" onClick={(e) => { e.preventDefault(); handleServiceClick('web'); }}>{getText('Développement Web', 'Web Development')}</a>
              <a href="#service-mobile" onClick={(e) => { e.preventDefault(); handleServiceClick('mobile'); }}>{getText('Développement Mobile', 'Mobile Development')}</a>
              <a href="#service-design" onClick={(e) => { e.preventDefault(); handleServiceClick('design'); }}>{getText('Design & Branding', 'Design & Branding')}</a>
            </div>
          </li>
          <li><a href="#collaboration" onClick={(e) => { e.preventDefault(); handleNavClick('collaboration'); }}>{getText('Collaboration', 'Collaboration')}</a></li>
          <li><a href="#portfolio" onClick={(e) => { e.preventDefault(); handleNavClick('portfolio'); }}>{getText('Portfolio', 'Portfolio')}</a></li>
          <li><a href="#contact" className="nav-cta" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>{getText('Contact', 'Contact')}</a></li>
        </ul>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button className="lang-switch" onClick={toggleLang}>
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
          <button className="hamburger" onClick={openMenu}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <button className="mobile-close" onClick={closeMenu}>×</button>
        <a href="#hero" onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}>{getText('Accueil', 'Home')}</a>
        <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>{getText('À Propos', 'About')}</a>
        <a href="#service-web" onClick={(e) => { e.preventDefault(); handleServiceClick('web'); }}>{getText('Développement Web', 'Web Development')}</a>
        <a href="#service-mobile" onClick={(e) => { e.preventDefault(); handleServiceClick('mobile'); }}>{getText('Développement Mobile', 'Mobile Development')}</a>
        <a href="#service-design" onClick={(e) => { e.preventDefault(); handleServiceClick('design'); }}>{getText('Design & Branding', 'Design & Branding')}</a>
        <a href="#collaboration" onClick={(e) => { e.preventDefault(); handleNavClick('collaboration'); }}>{getText('Collaboration', 'Collaboration')}</a>
        <a href="#portfolio" onClick={(e) => { e.preventDefault(); handleNavClick('portfolio'); }}>{getText('Portfolio', 'Portfolio')}</a>
        <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>{getText('Contact', 'Contact')}</a>
      </div>

      {/* Hero Section */}
      <section id="hero">
        <div className="hero-banner">
          <div className="hero-badge">
            <span className="hero-badge-text">{getText('✨ Agence Digitale Premium · Sénégal', '✨ Premium Digital Agency · Senegal')}</span>
          </div>
          <h1 className="hero-title">
            {getText("Votre idée,", "Your idea,")}
            <br />
            <span className="hero-title-highlight">{getText("notre solution", "our solution")}</span>
          </h1>
          <p className="hero-description">
            {getText(
              "Dieye'Tech transforme vos concepts en solutions digitales performantes. Développement web, mobile et design sur mesure pour faire rayonner votre entreprise au Sénégal et dans le monde.",
              "Dieye'Tech transforms your concepts into high-performance digital solutions. Custom web, mobile and design development to make your business shine in Senegal and worldwide."
            )}
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => handleServiceClick('web')}>
              {getText('🚀 Découvrir nos services', '🚀 Discover our services')}
              <span className="btn-arrow">→</span>
            </button>
            <button className="btn-secondary" onClick={() => handleNavClick('contact')}>
              {getText('💬 Parler de votre projet', '💬 Talk about your project')}
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">5<span>+</span></span>
              <span className="stat-text">{getText('Projets innovants', 'Innovative projects')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100<span>%</span></span>
              <span className="stat-text">{getText('Clients conquis', 'Clients conquered')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24<span>/7</span></span>
              <span className="stat-text">{getText('Support dédié', 'Dedicated support')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Details Section */}
      <section id="services">
        <div className="container">
          <div className="section-header reveal">
            <p className="section-eyebrow">{getText('Notre savoir-faire', 'Our expertise')}</p>
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: getText('Des <em>solutions</em> complètes', 'Complete <em>solutions</em>') }} />
            <div className="section-line"></div>
          </div>

          {/* Service 1 - Développement Web */}
          <div id="service-web" className="service-detail reveal">
            <div className="service-detail-header">
              <div className="service-detail-icon">💻</div>
              <h3 className="service-detail-title">{getText('Développement Web', 'Web Development')}</h3>
            </div>
            <p className="service-detail-description">
              {getText(
                "Créez une présence en ligne puissante avec des sites web modernes, rapides et parfaitement optimisés. Que vous ayez besoin d'un site vitrine élégant, d'une boutique e-commerce performante ou d'une application web complexe, nous donnons vie à votre vision digitale.",
                "Create a powerful online presence with modern, fast and perfectly optimized websites. Whether you need an elegant showcase site, a high-performance e-commerce store or a complex web application, we bring your digital vision to life."
              )}
            </p>
            <div className="service-tech-grid">
              <span className="tech-tag">React / Next.js</span>
              <span className="tech-tag">JavaScript / TypeScript</span>
              <span className="tech-tag">Node.js / Express</span>
              <span className="tech-tag">WordPress / WooCommerce</span>
              <span className="tech-tag">Tailwind CSS</span>
              <span className="tech-tag">SEO Optimisation</span>
              <span className="tech-tag">Performance LCP</span>
            </div>
          </div>

          {/* Service 2 - Développement Mobile */}
          <div id="service-mobile" className="service-detail reveal">
            <div className="service-detail-header">
              <div className="service-detail-icon">📱</div>
              <h3 className="service-detail-title">{getText('Développement Mobile', 'Mobile Development')}</h3>
            </div>
            <p className="service-detail-description">
              {getText(
                "Touchez vos clients où qu'ils soient avec des applications mobiles intuitives et performantes. Nous développons des apps iOS et Android sur mesure, offrant une expérience utilisateur fluide et des fonctionnalités puissantes pour votre business.",
                "Reach your customers wherever they are with intuitive and high-performance mobile applications. We develop custom iOS and Android apps, offering a smooth user experience and powerful features for your business."
              )}
            </p>
            <div className="service-tech-grid">
              <span className="tech-tag">React Native</span>
              <span className="tech-tag">Flutter</span>
              <span className="tech-tag">iOS / Android</span>
              <span className="tech-tag">Firebase</span>
              <span className="tech-tag">API REST</span>
              <span className="tech-tag">Push Notifications</span>
            </div>
          </div>

          {/* Service 3 - Design & Branding */}
          <div id="service-design" className="service-detail reveal">
            <div className="service-detail-header">
              <div className="service-detail-icon">🎨</div>
              <h3 className="service-detail-title">{getText('Design & Branding', 'Design & Branding')}</h3>
            </div>
            <p className="service-detail-description">
              {getText(
                "Construisez une identité visuelle forte et mémorable qui vous différencie de la concurrence. Notre approche combine créativité et stratégie pour créer des logos, chartes graphiques et supports de communication qui marquent les esprits.",
                "Build a strong and memorable visual identity that sets you apart from the competition. Our approach combines creativity and strategy to create logos, graphic charts and communication materials that leave a lasting impression."
              )}
            </p>
            <div className="service-tech-grid">
              <span className="tech-tag">Logo Design</span>
              <span className="tech-tag">Branding / Identité</span>
              <span className="tech-tag">UI/UX Design</span>
              <span className="tech-tag">Figma / Adobe XD</span>
              <span className="tech-tag">Print / Packaging</span>
              <span className="tech-tag">Motion Design</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <div className="container">
          <div className="section-header reveal">
            <p className="section-eyebrow">{getText('Qui sommes-nous ?', 'Who are we?')}</p>
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: getText('Une histoire <em>sénégalaise</em>', 'A <em>Senegalese</em> story') }} />
            <div className="section-line"></div>
          </div>

          <div className="about-context reveal">
            <div className="context-header">
              <div className="context-icon">🌍</div>
              <h3 className="about-subtitle">{getText('Le Contexte', 'The Context')}</h3>
            </div>
            <div className="context-content">
              <p className="about-text-large">
                {getText(
                  "Le Sénégal et l'Afrique connaissent une transformation numérique sans précédent. Pourtant, de nombreuses entreprises peinent à trouver des partenaires digitaux qui comprennent réellement leurs besoins, leur marché et leurs réalités locales. Les solutions importées sont souvent trop chères, inadaptées ou déconnectées des attentes des consommateurs africains.",
                  "Senegal and Africa are undergoing an unprecedented digital transformation. Yet many businesses struggle to find digital partners who truly understand their needs, their market and their local realities. Imported solutions are often too expensive, unsuitable or disconnected from African consumer expectations."
                )}
              </p>
              <p className="about-text-highlight">
                {getText(
                  "C'est dans ce contexte que Dieye'Tech est née : pour offrir une alternative locale, de qualité internationale, accessible et parfaitement adaptée au marché sénégalais.",
                  "It is in this context that Dieye'Tech was born: to offer a local alternative, of international quality, accessible and perfectly adapted to the Senegalese market."
                )}
              </p>
            </div>
          </div>

          <div className="about-problem reveal">
            <div className="problem-header">
              <div className="problem-icon">⚠️</div>
              <h3 className="about-subtitle">{getText('Les Défis', 'The Challenges')}</h3>
            </div>
            <div className="problem-grid">
              <div className="problem-card">
                <div className="problem-card-icon">💸</div>
                <h4>{getText('Coûts prohibitifs', 'Prohibitive costs')}</h4>
                <p>{getText('Des devis multipliés par 3 à 5 comparés aux standards locaux', 'Quotes multiplied by 3 to 5 compared to local standards')}</p>
              </div>
              <div className="problem-card">
                <div className="problem-card-icon">🌍</div>
                <h4>{getText('Déconnexion culturelle', 'Cultural disconnection')}</h4>
                <p>{getText('Des solutions pensées ailleurs, sans comprendre les usages locaux', 'Solutions designed elsewhere, without understanding local usage')}</p>
              </div>
              <div className="problem-card">
                <div className="problem-card-icon">⏱️</div>
                <h4>{getText('Délais interminables', 'Endless delays')}</h4>
                <p>{getText('Des projets qui s\'étendent sur 6 mois ou plus', 'Projects that extend over 6 months or more')}</p>
              </div>
              <div className="problem-card">
                <div className="problem-card-icon">🔧</div>
                <h4>{getText('Absence de support', 'No support')}</h4>
                <p>{getText('Un service après-vente inexistant une fois le projet livré', 'Non-existent after-sales service once the project is delivered')}</p>
              </div>
            </div>
          </div>

          <div className="about-solution reveal">
            <div className="solution-header">
              <div className="solution-icon-header">💡</div>
              <h3 className="about-subtitle">{getText('Notre Approche', 'Our Approach')}</h3>
            </div>
            <div className="solution-grid">
              <div className="solution-card">
                <div className="solution-card-icon">🎯</div>
                <h4>{getText('Sur mesure & accessible', 'Tailor-made & accessible')}</h4>
                <p>{getText('Des solutions adaptées à votre budget, sans compromis sur la qualité', 'Solutions adapted to your budget, without compromising on quality')}</p>
              </div>
              <div className="solution-card">
                <div className="solution-card-icon">⚡</div>
                <h4>{getText('Rapide & efficace', 'Fast & efficient')}</h4>
                <p>{getText('Livraison en 2 à 6 semaines, avec des méthodes agiles', 'Delivery in 2 to 6 weeks, with agile methods')}</p>
              </div>
              <div className="solution-card">
                <div className="solution-card-icon">🤝</div>
                <h4>{getText('Accompagnement total', 'Total support')}</h4>
                <p>{getText('Support 24/7, formation et maintenance incluses', '24/7 support, training and maintenance included')}</p>
              </div>
              <div className="solution-card">
                <div className="solution-card-icon">🚀</div>
                <h4>{getText('Performance garantie', 'Performance guaranteed')}</h4>
                <p>{getText('Technologies modernes, SEO optimisé et résultats mesurables', 'Modern technologies, optimized SEO and measurable results')}</p>
              </div>
            </div>
          </div>

          <div className="about-founder reveal">
            <div className="founder-content">
              <div className="founder-text">
                <div className="founder-badge">{getText('Le Fondateur', 'The Founder')}</div>
                <h4 className="founder-name">Abdoulaye Dieye</h4>
                <p className="founder-title">{getText('Fullstack Developer & Digital Entrepreneur', 'Fullstack Developer & Digital Entrepreneur')}</p>
                <p className="founder-desc">
                  {getText(
                    "Passionné par les technologies et l'entrepreneuriat depuis mon plus jeune âge, j'ai fondé Dieye'Tech avec une vision claire : démocratiser l'accès aux solutions digitales de pointe au Sénégal. Formé aux standards internationaux, je mets mon expertise au service des entreprises locales qui veulent rayonner.",
                    "Passionate about technology and entrepreneurship since a young age, I founded Dieye'Tech with a clear vision: democratize access to cutting-edge digital solutions in Senegal. Trained to international standards, I put my expertise at the service of local businesses that want to shine."
                  )}
                </p>
              </div>
              <div className="founder-photo">
                <div className="photo-placeholder">
                  <span>👨‍💻</span>
                  <div className="photo-glow"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Section - NOUVELLE SECTION */}
      <section id="collaboration">
        <div className="container">
          <div className="section-header reveal">
            <p className="section-eyebrow">{getText('Travaillons ensemble', 'Let\'s work together')}</p>
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: getText('Vous avez un <em>projet</em> ?', 'You have a <em>project</em> ?') }} />
            <div className="section-line"></div>
          </div>

          <div className="collab-grid">
            <div className="collab-card reveal">
              <div className="collab-icon">🤝</div>
              <h3>{getText('Collaboration', 'Collaboration')}</h3>
              <p>{getText(
                "Vous êtes une startup, une entreprise ou un porteur de projet ? Vous cherchez un développeur pour concrétiser votre idée ? Discutons ensemble de votre projet.",
                "Are you a startup, a company or a project holder? Looking for a developer to bring your idea to life? Let's discuss your project together."
              )}</p>
              
              <h4>{getText('📌 Ce que je propose', '📌 What I offer')}</h4>
              <ul className="collab-list">
                <li>{getText('Développement web sur mesure', 'Custom web development')}</li>
                <li>{getText('Applications mobiles iOS & Android', 'iOS & Android mobile apps')}</li>
                <li>{getText('Design & identité visuelle', 'Design & visual identity')}</li>
                <li>{getText('Accompagnement technique', 'Technical support')}</li>
                <li>{getText('Audit et conseil', 'Audit & consulting')}</li>
              </ul>
            </div>

            <div className="collab-card reveal">
              <div className="collab-icon">📞</div>
              <h3>{getText('Parlons de votre projet', 'Let\'s talk about your project')}</h3>
              <p>{getText(
                "Que vous ayez un cahier des charges précis ou simplement une idée, contactez-moi. Je vous répondrai sous 24h pour échanger sur vos besoins.",
                "Whether you have a detailed specification or just an idea, contact me. I will get back to you within 24 hours to discuss your needs."
              )}</p>
              
              <div className="collab-contact">
                <a href="mailto:pvpvdieye10@gmail.com" className="collab-contact-item">
                  <span className="collab-contact-icon">✉️</span>
                  <span>pvpvdieye10@gmail.com</span>
                </a>
                <a href="tel:+221782624146" className="collab-contact-item">
                  <span className="collab-contact-icon">📞</span>
                  <span>+221 78 262 41 46</span>
                </a>
                <a href="https://wa.me/221762101794" className="collab-contact-item">
                  <span className="collab-contact-icon">💬</span>
                  <span>WhatsApp : +221 76 210 17 94</span>
                </a>
              </div>
              
              <p className="collab-note">
                {getText(
                  "📌 Simple et direct : un email, un appel ou un message WhatsApp. Je vous réponds personnellement.",
                  "📌 Simple and direct: an email, a call or a WhatsApp message. I will answer you personally."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio">
        <div className="container">
          <div className="section-header reveal">
            <p className="section-eyebrow">{getText('Nos créations', 'Our creations')}</p>
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: getText('Ils nous ont <em>confié</em> leurs projets', 'They <em>trusted</em> us with their projects') }} />
            <div className="section-line"></div>
          </div>
          
          <div className="portfolio-showcase reveal">
            <div className="portfolio-preview">
              <div className="portfolio-preview-card">
                <div className="portfolio-preview-icon">🛍️</div>
                <h4>{getText('E-commerce', 'E-commerce')}</h4>
                <p>{getText('Boutiques en ligne performantes', 'High-performance online stores')}</p>
              </div>
              <div className="portfolio-preview-card">
                <div className="portfolio-preview-icon">📱</div>
                <h4>{getText('Applications', 'Applications')}</h4>
                <p>{getText('Apps mobiles innovantes', 'Innovative mobile apps')}</p>
              </div>
              <div className="portfolio-preview-card">
                <div className="portfolio-preview-icon">🎨</div>
                <h4>{getText('Branding', 'Branding')}</h4>
                <p>{getText('Identités visuelles uniques', 'Unique visual identities')}</p>
              </div>
            </div>
            
            <div className="portfolio-cta">
              <a 
                href="https://votre-portfolio.com" 
                className="portfolio-button"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{getText('🎯 Voir mon portfolio complet', '🎯 View my complete portfolio')}</span>
                <span className="portfolio-button-arrow">→</span>
              </a>
              <p className="portfolio-note">
                {getText('Découvrez tous mes projets, études de cas et réalisations', 'Discover all my projects, case studies and achievements')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="reveal">
              <p className="section-eyebrow">{getText('Passons à l\'action', 'Let\'s take action')}</p>
              <h2 className="section-title" dangerouslySetInnerHTML={{ __html: getText('Transformons votre <em>vision</em> en réalité', 'Turn your <em>vision</em> into reality') }} />
              <div className="section-line"></div>
              <p className="contact-desc">
                {getText(
                  "Vous avez un projet en tête ? Une idée qui vous tient à cœur ? Ensemble, donnons vie à votre vision digitale. Je vous accompagne de la conception à la réalisation, avec une écoute attentive et des solutions sur mesure.",
                  "You have a project in mind? An idea that matters to you? Together, let's bring your digital vision to life. I support you from design to completion, with attentive listening and tailored solutions."
                )}
              </p>
              <div className="contact-info">
                <div className="contact-info-item">
                  <span>📍</span>
                  <span>{getText('Dakar, Sénégal', 'Dakar, Senegal')}</span>
                </div>
                <div className="contact-info-item">
                  <span>⏰</span>
                  <span>{getText('Lun - Ven: 9h - 18h', 'Mon - Fri: 9am - 6pm')}</span>
                </div>
                <div className="contact-info-item">
                  <span>🚀</span>
                  <span>{getText('Réponse sous 24h', 'Response within 24h')}</span>
                </div>
              </div>
              <div className="contact-social">
                <a href="#" className="social-btn" title="LinkedIn">in</a>
                <a href="#" className="social-btn" title="Instagram">📷</a>
                <a href="#" className="social-btn" title="Twitter/X">𝕏</a>
                <a href="#" className="social-btn" title="GitHub">🐙</a>
              </div>
            </div>
            <div className="reveal reveal-delay-1">
              <div className="contact-items">
                <a href="tel:+221782624146" className="contact-item">
                  <div className="contact-icon">📞</div>
                  <div>
                    <div className="contact-item-label">{getText('Téléphone', 'Phone')}</div>
                    <div className="contact-item-value">+221 78 262 41 46</div>
                  </div>
                </a>
                <a href="https://wa.me/221762101794" className="contact-item">
                  <div className="contact-icon">💬</div>
                  <div>
                    <div className="contact-item-label">WhatsApp</div>
                    <div className="contact-item-value">+221 76 210 17 94</div>
                  </div>
                </a>
                <a href="mailto:pvpvdieye10@gmail.com" className="contact-item">
                  <div className="contact-icon">✉️</div>
                  <div>
                    <div className="contact-item-label">Email</div>
                    <div className="contact-item-value">pvpvdieye10@gmail.com</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-logo">Dieye'<span>Tech</span></div>
          <p className="footer-tagline">{getText('L\'excellence numérique à la sénégalaise', 'Senegalese digital excellence')}</p>
        </div>
        <p className="footer-copy">
          {getText('© 2026 Dieye\'Tech. Tous droits réservés.', '© 2026 Dieye\'Tech. All rights reserved.')}
        </p>
      </footer>

      {/* WhatsApp Button */}
      <a href="https://wa.me/221762101794" className="whatsapp-btn" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
};

export default App;
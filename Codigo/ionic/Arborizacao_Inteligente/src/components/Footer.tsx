import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <div className={styles.footerLogo}>
            <img src="/imagens/salvando-a-terra-com-tecnologia-artificial 2.png" alt="Logo Arborização Inteligente" />
          </div>
          <p className={styles.footerDesc}>Promovendo arborização inteligente e sustentabilidade ambiental nas cidades.</p>
        </div>

        <div className={styles.footerSection}>
          <h3>Links Úteis</h3>
          <nav className={styles.footerLinks}>
            <Link to="/">Início</Link>
            <Link to="/sobre-nos">Sobre-nós</Link>
            <Link to="/contato">Contato</Link>
            <Link to="/upload">Alerta verde</Link>
          </nav>
        </div>

        <div className={styles.footerSection}>
          <h3>Conecte-se</h3>
          <div className={styles.socialLinks}>
            <a href="https://www.instagram.com/arborizacao_inteligente?igsh=M2N2ZmZtaDdtNTcz" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <img src="/imagens/Instagram.png" alt="Instagram" />
            </a>
            <a href="https://mail.google.com/mail/u/0/?pli=1#inbox?compose=new" target="_blank" rel="noopener noreferrer" aria-label="Email">
              <img src="/imagens/mail.png" alt="Email" />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© {currentYear} Arborização Inteligente. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

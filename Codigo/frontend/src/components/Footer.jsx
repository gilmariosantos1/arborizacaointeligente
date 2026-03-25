import { Link } from 'react-router-dom'
import styles from '../styles/Footer.module.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Logo e Descrição */}
        <div className={styles.footerSection}>
          <div className={styles.footerLogo}>
            <img src="/imagens/3442850 3.png" alt="Logo Arborização Inteligente" />
          </div>
          <p className={styles.footerDesc}>
            Promovendo arborização inteligente e sustentabilidade ambiental nas cidades.
          </p>
        </div>

        {/* Links Rápidos */}
        <div className={styles.footerSection}>
          <h3>Links Úteis</h3>
          <nav className={styles.footerLinks}>
            <Link to="/">Início</Link>
            <Link to="/sobre-nos">Sobre-nós</Link>
            <Link to="/aplicativo">Aplicativo</Link>
            <Link to="/contato">Contato</Link>
            <Link to="/upload">Upload</Link>
          </nav>
        </div>

        {/* Redes Sociais */}
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

        {/* Newsletter */}
        <div className={styles.footerSection}>
          <h3>Newsletter</h3>
          <p className={styles.newsletterText}>Receba atualizações sobre arborização</p>
          <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Seu email" required />
            <button type="submit">Enviar</button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className={styles.footerBottom}>
        <p>© {currentYear} Arborização Inteligente. Todos os direitos reservados.</p>
        <div className={styles.footerLinks}>
          <a href="#">Privacidade</a>
          <a href="#">Termos</a>
        </div>
      </div>
    </footer>
  )
}

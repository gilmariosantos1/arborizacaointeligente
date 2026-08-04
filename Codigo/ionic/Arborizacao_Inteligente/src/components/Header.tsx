import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css';
import Button from './Button';
import { useAuth } from '../auth/AuthContext';

const menuIcon = '/imagens/Menu.svg';

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const { signed, logout } = useAuth();

  const toggleNav = () => setNavOpen((prev) => !prev);
  const closeNav = () => setNavOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img src="/imagens/salvando-a-terra-com-tecnologia-artificial 2.png" alt="Logo Arborização Inteligente" />
        </Link>

        <nav className={styles.navDesktop}>
          <Link to="/">Início</Link>
          <Link to="/sobre-nos">Sobre-nós</Link>
          <Link to="/contato">Contato</Link>
          <Link to="/upload">Alerta verde</Link>
        </nav>

        {signed ? (
          <div className={styles.authButtons}>
            <button type="button" className={styles.loginLink} onClick={logout} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
              <span>Sair</span>
              <img className={styles.imageLogout} src="/imagens/logout.png" alt="" />
            </button>
          </div>
        ) : (
          <div className={styles.authButtons}>
            <Link to="/login" className={styles.loginLink}>
              <span>Entrar</span>
            </Link>
            <Button component={Link} to="/cadastro" variant="primary" size="medium">
              Cadastre-se
            </Button>
          </div>
        )}

        <button className={styles.menuBtn} onClick={toggleNav} aria-label="Menu">
          <img src={menuIcon} alt="Ícone do menu de opções" />
        </button>
      </div>

      {navOpen && (
        <>
          <div className={styles.navOverlay} onClick={closeNav} />
          <nav className={styles.navMobile}>
            <Link to="/" className={styles.navMobileLink} onClick={closeNav}>Início</Link>
            <Link to="/sobre-nos" className={styles.navMobileLink} onClick={closeNav}>Sobre-nós</Link>
            <Link to="/contato" className={styles.navMobileLink} onClick={closeNav}>Contato</Link>
            <Link to="/upload" className={styles.navMobileLink} onClick={closeNav}>Upload</Link>
            <hr className={styles.divider} />

            {signed ? (
              <button type="button" className={styles.loginNavLink} onClick={() => { logout(); closeNav(); }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                <span>Sair</span>
                <img className={styles.imageLogoutNav} src="/imagens/logout.png" alt="" />
              </button>
            ) : (
              <>
                <Link to="/login" className={styles.navMobileLink} onClick={closeNav}>Entrar</Link>
                <Button component={Link} to="/cadastro" variant="primary" size="medium" isFullWidth onClick={closeNav} className={styles.mobileSignup}>
                  Cadastre-se
                </Button>
              </>
            )}
          </nav>
        </>
      )}
    </header>
  );
}

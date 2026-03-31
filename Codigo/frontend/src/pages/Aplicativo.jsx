import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from '../styles/Aplicativo.module.css'

export default function Aplicativo() {
  return (
    <div className={styles.container}>
      <Header />

      
      <section className={styles.verde}></section>

      <section className={styles.aplicativo}>
        <h2>Aplicativo</h2>
        <div className={styles.conteudo}>
          <div className={styles.img}>
            <img src="/imagens/aplicativo.png" alt="Aplicativo Arborização Inteligente" />
            <p className={styles.arborizacao}>Arborização Inteligente</p>
          </div>
          <p className={styles.discricao}>
            O aplicativo<strong> Arborização Inteligente</strong> conta com um sistema de monitoramento, onde, sua função é localizar árvores 
            e especificar tanto sua espécie (invasora ou local), como também se está em local de risco (postes de luz, muito próximo de casas etc). 
            O aplicativo serve para as pessoas e também empresas que desejam antecipar problemas de falta de energia após tempestades ou caso aconteça algum acidente.
          </p>
        </div>

        <div className={styles.tracos2}>
          <img className={styles.tracoEsquerda01} src="/imagens/tracos-tecnologicos-esquerda.png" alt="" />
          <img className={styles.tracoEsquerda02} src="/imagens/tracos-tecnologicos-esquerda.png" alt="" />
          <img className={styles.tracoDireira01} src="/imagens/tracos-tecnologicos-direita.png" alt="" />
          <img className={styles.tracoDireira02} src="/imagens/tracos-tecnologicos-direita.png" alt="" />
        </div>
      </section>

      <section className={styles.download}>
        <div className={styles.app}>
          <h3 className={styles.titulo}>Baixe o aplicativo!</h3>
          <a href="#">Clique aqui para instalar</a>
          <img src="/imagens/aplicativo.png" alt="Aplicativo Arborização Inteligente" />
        </div>
      </section>

      <Footer />
    </div>
  )
}

import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from '../styles/Upload.module.css'

export default function Upload() {
  const handleUpload = () => {
    alert('Clique para fazer upload de uma imagem')
  }

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <h1>Envie sua imagem!</h1>
        <p>
          Envie uma imagem de uma árvore invasora <br /> e/ou de um local mal arborizado
        </p>
        <input type="button" value="Upload" onClick={handleUpload} />
      </main>

      <Footer />
    </div>
  )
}

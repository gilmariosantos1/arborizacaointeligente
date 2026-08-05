import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Section from '../components/Section'
import Card from '../components/Card'
import Button from '../components/Button'
import styles from '../styles/Home.module.css'

export default function Home() {
  const benefits = [
    {
      icon: '🌳',
      title: 'Qualidade do Ar',
      desc: 'As árvores absorvem CO₂ e filtram poluentes, melhorando a qualidade do ar urbano e reduzindo problemas respiratórios.'
    },
    {
      icon: '❄️',
      title: 'Redução de Temperatura',
      desc: 'Criam sombra e reduzem o efeito "ilha de calor", mantendo as cidades mais frescas e confortáveis.'
    },
    {
      icon: '💧',
      title: 'Controle de Enchentes',
      desc: 'Absorvem água da chuva e regulam o ciclo hidrológico, prevenindo enchentes e erosão.'
    },
    {
      icon: '❤️',
      title: 'Bem-estar Mental',
      desc: 'A proximidade com natureza reduz estresse, melhora saúde mental e promove atividade física.'
    },
    {
      icon: '🌍',
      title: 'Mitigação Climática',
      desc: 'Capturam CO₂ atmosférico, atuando como agentes naturais contra as mudanças climáticas globais.'
    },
    {
      icon: '🦋',
      title: 'Biodiversidade',
      desc: 'Fornecem habitat para aves, insetos e mamíferos, preservando o equilíbrio ecológico urbano.'
    }
  ]

  const whyArborize = [
    {
      number: '01',
      title: 'Sustentabilidade',
      desc: 'Contribui para cidades mais sustentáveis e resilientes aos impactos climáticos.'
    },
    {
      number: '02',
      title: 'Saúde Pública',
      desc: 'Melhora a qualidade de vida, reduzindo doenças respiratórias e promovendo bem-estar.'
    },
    {
      number: '03',
      title: 'Comunidade',
      desc: 'Cria espaços verdes que fortalecem a comunidade e promovem convivência.'
    },
    {
      number: '04',
      title: 'Valorização',
      desc: 'Aumenta o valor dos imóveis e a atratividade das regiões arborizadas.'
    }
  ]

  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        {/* Hero Section */}
        <Section className={styles.heroSection} hasBackground>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Arborização Inteligente para Cidades Sustentáveis
            </h1>
            <p className={styles.heroSubtitle}>
              Transforme o ambiente urbano através de soluções inovadoras de arborização
            </p>
            <div className={styles.heroButtons}>
              <Button 
                variant="primary" 
                size="large" 
                href="https://www.ufsm.br/unidades-universitarias/ccne/2024/06/20/a-importancia-da-arborizacao-urbana-para-cidades-sustentaveis"
                target="_blank"
              >
                Saiba Mais <span style={{ marginLeft: '8px', display: 'inline-block' }}>↗</span>
              </Button>
              <Button 
                variant="secondary" 
                size="large" 
                to="/contato" 
                component={Link}
              >
                Entre em Contato
              </Button>
            </div>
          </div>
        </Section>

        {/* Video Section */}
        <Section title="Conheça Nosso Movimento" subtitle="Assista ao vídeo e entenda a importância da arborização">
          <div className={styles.videoContainer}>
            <iframe 
              src="https://www.youtube.com/embed/hbw9idS-8OA?si=ta4Y-lffMSiJUJ9s" 
              title="YouTube video about smart arborization" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            ></iframe>
          </div>
        </Section>

        {/* O que é Arborização */}
        <Section title="O que é Arborização?" hasBackground={true} variant="light">
          <div className={styles.contentWithImage}>
            <img 
              src="/imagens/image 3.png" 
              alt="Igreja verde ao pôr do sol ilustrando arborização urbana" 
              className={styles.sectionImage}
            />
            <div className={styles.textContent}>
              <p>
                A arborização refere-se ao processo de plantio e manutenção inteligente de árvores em áreas urbanas. É uma prática essencial para a criação de ambientes mais verdes e saudáveis nas cidades, visando melhorar a qualidade de vida das pessoas e promover a sustentabilidade ambiental.
              </p>
              <p>
                Envolve a escolha adequada das espécies, plantio correto, manejo e manutenção contínua das árvores ao longo do tempo. Além dos benefícios estéticos, desempenha um papel crucial na melhoria da qualidade do ar, redução de poluição e absorção de dióxido de carbono.
              </p>
              <p>
                <strong>Requer planejamento adequado, envolvimento da comunidade e cuidados contínuos para garantir o sucesso e sustentabilidade.</strong>
              </p>
            </div>
          </div>
        </Section>

        {/* Benefícios - Cards */}
        <Section title="Benefícios da Arborização" subtitle="Conheça as vantagens que a arborização traz para a cidade">
          <div className={styles.benefitsGrid}>
            {benefits.map((benefit, idx) => (
              <Card key={idx} variant="elevated">
                <div className={styles.benefitCard}>
                  <div className={styles.benefitIcon}>{benefit.icon}</div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* Por que Arborizar */}
        <Section hasBackground={true} variant="light">
          <div className={styles.whySection}>
            <div className={styles.whyContent}>
              <img 
                src="/imagens/21439018_6432897 1.png" 
                alt="Argumento para arborização urbana"
                className={styles.sectionImage}
              />
              <div className={styles.whyList}>
                <h2>Por que Arborizar as Cidades?</h2>
                <div className={styles.reasonsGrid}>
                  {whyArborize.map((reason, idx) => (
                    <div key={idx} className={styles.reasonCard}>
                      <div className={styles.reasonNumber}>{reason.number}</div>
                      <h4>{reason.title}</h4>
                      <p>{reason.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* CTA Section */}
        <Section className={styles.ctaSection} hasBackground variant="dark">
          <div className={styles.ctaContent}>
            <h2>Faça Parte da Revolução Verde</h2>
            <p>Junte-se a nós na missão de transformar cidades em ambientes mais sustentáveis e saudáveis</p>
            <Button variant="success" size="large" to="/cadastro" component={Link}>
              Comece Agora
            </Button>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  )
  
}

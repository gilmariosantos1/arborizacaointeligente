import Header from '../components/Header'
import Footer from '../components/Footer'
import Section from '../components/Section'
import Card from '../components/Card'
import styles from '../styles/SobreNos.module.css'

export default function SobreNos() {
  const team = [
    {
      name: 'Prof. Júlio César',
      role: 'Orientador',
      bio: 'Professor e mentor do projeto'
    },
    {
      name: 'Júlio Monteiro',
      role: 'Fundador',
      bio: 'Visão e estratégia do projeto'
    }
  ]

  const mission = [
    {
      icon: '🎯',
      title: 'Nossa Missão',
      desc: 'Promover arborização inteligente e sustentável nas cidades através de tecnologia e engajamento comunitário.'
    },
    {
      icon: '👁️',
      title: 'Nossa Visão',
      desc: 'Cidades mais verdes, saudáveis e sustentáveis para as futuras gerações.'
    },
    {
      icon: '💚',
      title: 'Nossos Valores',
      desc: 'Sustentabilidade, inovação, comunidade e comprometimento com o meio ambiente.'
    }
  ]

  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        {/* Hero Section */}
        <Section 
          className={styles.heroSection}
          hasBackground
          title="Sobre Nós"
          subtitle="Conheca a história e a visão por trás da Arborização Inteligente"
        ></Section>

        {/* Story Section */}
        <Section 
          title="Nossa História"
          subtitle="Como tudo começou"
        >
          <div className={styles.storyContent}>
            <img 
              src="/imagens/imagem-integrantes.png" 
              alt="Equipe do projeto" 
              className={styles.storyImage}
            />
            <div className={styles.storyText}>
              <p>
                O projeto Arborização Inteligente surgiu da necessidade de promover um ambiente mais verde e saudável. Começou quando o Prof. Júlio César e Júlio Monteiro reconheceram os desafios de arborização em Nossa Senhora da Glória e decidiram transformar essa realidade.
              </p>
              <p>
                A ausência de árvores locais e a falta de preservação do bioma resulta em problemas climáticos urbanos. Com isso, criamos um sistema inteligente de monitoramento arbóreo e geolocalização de espécies para promover sustentabilidade e mudar a realidade das cidades.
              </p>
              <p>
                <strong>Nosso objetivo é criar cidades mais verdes, saudáveis e sustentáveis através da inovação tecnológica e engajamento comunitário.</strong>
              </p>
            </div>
          </div>
        </Section>

        {/* Mission/Vision/Values */}
        <Section 
          title="Princípios" 
          subtitle="O que nos guia"
          hasBackground={true}
          variant="light"
        >
          <div className={styles.missionGrid}>
            {mission.map((item, idx) => (
              <Card key={idx} variant="elevated">
                <div className={styles.principleCard}>
                  <div className={styles.principleIcon}>{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* Technology Section */}
        <Section title="Nossa Tecnologia" subtitle="Como funcionamos">
          <div className={styles.techGrid}>
            <Card variant="outlined">
              <div className={styles.techCard}>
                <img src="/imagens/planta-tecnologica.png" alt="Planta tecnológica" className={styles.techImage} />
                <h3>Monitoramento Inteligente</h3>
                <p>Sistema avançado de monitoramento de árvores em tempo real com dados precisos.</p>
              </div>
            </Card>
            <Card variant="outlined">
              <div className={styles.techCard}>
                <img src="/imagens/arvore-tecnologica.png" alt="Árvore tecnológica" className={styles.techImage} />
                <h3>Análise de Dados</h3>
                <p>Análise inteligente de padrões de arborização para otimizar estratégias de plantio.</p>
              </div>
            </Card>
          </div>
        </Section>

        {/* Team Section */}
        <Section 
          title="Nosso Time" 
          subtitle="Pessoas apaixonadas por sustentabilidade"
          hasBackground={true}
          variant="light"
        >
          <div className={styles.teamGrid}>
            {team.map((member, idx) => (
              <Card key={idx} variant="elevated">
                <div className={styles.teamCard}>
                  <div className={styles.avatar}>👤</div>
                  <h3>{member.name}</h3>
                  <p className={styles.role}>{member.role}</p>
                  <p className={styles.bio}>{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* Impact Section */}
        <Section title="Nosso Impacto">
          <div className={styles.impactGrid}>
            <div className={styles.impactCard}>
              <div className={styles.impactNumber}>100+</div>
              <div className={styles.impactLabel}>Árvores Monitoradas</div>
            </div>
            <div className={styles.impactCard}>
              <div className={styles.impactNumber}>50+</div>
              <div className={styles.impactLabel}>Contribuidores</div>
            </div>
            <div className={styles.impactCard}>
              <div className={styles.impactNumber}>1</div>
              <div className={styles.impactLabel}>Cidade Transformada</div>
            </div>
            <div className={styles.impactCard}>
              <div className={styles.impactNumber}>∞</div>
              <div className={styles.impactLabel}>Futuro Sustentável</div>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  )
}

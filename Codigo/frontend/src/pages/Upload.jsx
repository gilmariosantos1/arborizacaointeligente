import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
import MapSelector from '../components/MapSelector'
import FormInput from '../components/FormInput'
import Button from '../components/Button'
import { uploadService } from '../services/uploadService'
import styles from '../styles/Upload.module.css'

export default function Upload() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    assunto: '',
    endereco: '',
    localizacao: '',
    descricao: '',
    imagem: null
  })
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const assuntoSuggestions = [
    'Queda de árvore',
    'Local mal arborizado',
    'Local sem árvore'
  ]

  const handleUpload = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setFormData({
      assunto: '',
      endereco: '',
      localizacao: '',
      descricao: '',
      imagem: null
    })
    setSelectedLocation(null)
    setErrors({})
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLocationSelect = (location) => {
    setSelectedLocation(location)
    // Formatar coordenadas para exibição
    const formattedLocation = `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`
    setFormData(prev => ({
      ...prev,
      localizacao: formattedLocation
    }))

    // Scroll automático para o campo de localização
    setTimeout(() => {
      const locationField = document.getElementById('localizacao')
      if (locationField) {
        locationField.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
        // Adicionar destaque temporário
        locationField.style.backgroundColor = '#e8f4fd'
        locationField.style.transition = 'background-color 0.5s'
        setTimeout(() => {
          locationField.style.backgroundColor = ''
        }, 2000)
      }
    }, 100)
  }

  const handleAddressSearch = async () => {
    if (!formData.endereco.trim()) return

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.endereco)}&limit=1`
      )
      const data = await response.json()

      if (data && data.length > 0) {
        const location = {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        }
        setSelectedLocation(location)
        const formattedLocation = `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`
        setFormData(prev => ({
          ...prev,
          localizacao: formattedLocation
        }))
      } else {
        alert('Endereço não encontrado. Tente ser mais específico.')
      }
    } catch (error) {
      console.error('Erro ao buscar endereço:', error)
      alert('Erro ao buscar endereço. Tente novamente.')
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        imagem: file
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.assunto.trim()) {
      newErrors.assunto = 'Assunto é obrigatório'
    }

    if (!formData.localizacao.trim()) {
      newErrors.localizacao = 'Selecione uma localização no mapa ou digite um endereço'
    }

    if (!formData.descricao.trim()) {
      newErrors.descricao = 'Descrição é obrigatória'
    }

    if (!formData.imagem) {
      newErrors.imagem = 'Selecione uma imagem'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsLoading(true)
      try {
        await uploadService.enviarRelato(formData)
        alert('Relato enviado com sucesso!')
        handleCloseModal()
      } catch (err) {
        setErrors({ geral: err.message || 'Erro ao enviar relato. Tente novamente.' })
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <h1>Envie sua imagem!</h1>
        <p>
          Envie uma imagem de uma árvore invasora <br /> e/ou de um local mal arborizado
        </p>
        <Button variant="primary" size="large" onClick={handleUpload}>
          Upload
        </Button>
      </main>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className={styles.modalContent}>
          <h2>Reportar Problema de Arborização</h2>

          <form onSubmit={handleSubmit} className={styles.uploadForm}>
            {/* Assunto */}
            <div className={styles.formGroup}>
              <label htmlFor="assunto" className={styles.label}>
                Assunto *
              </label>
              <input
                id="assunto"
                name="assunto"
                type="text"
                list="assunto-suggestions"
                placeholder="Digite o assunto do problema..."
                value={formData.assunto}
                onChange={handleInputChange}
                className={`${styles.input} ${errors.assunto ? styles.error : ''}`}
              />
              <datalist id="assunto-suggestions">
                {assuntoSuggestions.map((suggestion, index) => (
                  <option key={index} value={suggestion} />
                ))}
              </datalist>
              {errors.assunto && <span className={styles.errorMsg}>{errors.assunto}</span>}
            </div>

            {/* Endereço */}
            <div className={styles.formGroup}>
              <label htmlFor="endereco" className={styles.label}>
                Endereço
              </label>
              <div className={styles.addressGroup}>
                <input
                  id="endereco"
                  name="endereco"
                  type="text"
                  placeholder="Digite rua, cidade, bairro..."
                  value={formData.endereco}
                  onChange={handleInputChange}
                  className={styles.addressInput}
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="small"
                  onClick={handleAddressSearch}
                  className={styles.searchButton}
                >
                  Buscar
                </Button>
              </div>
            </div>

            {/* Localização */}
            <FormInput
              label="Localização"
              placeholder="Coordenadas serão preenchidas automaticamente"
              value={formData.localizacao}
              readOnly
              error={errors.localizacao}
            />

            {/* Mapa */}
            <MapSelector
              onLocationSelect={handleLocationSelect}
              selectedLocation={selectedLocation}
            />

            {/* Descrição */}
            <div className={styles.formGroup}>
              <label htmlFor="descricao" className={styles.label}>
                Descrição *
              </label>
              <textarea
                id="descricao"
                name="descricao"
                placeholder="Descreva o problema em detalhes..."
                value={formData.descricao}
                onChange={handleInputChange}
                className={`${styles.textarea} ${errors.descricao ? styles.error : ''}`}
                rows="4"
              />
              {errors.descricao && <span className={styles.errorMsg}>{errors.descricao}</span>}
            </div>

            {/* Upload de imagem */}
            <div className={styles.formGroup}>
              <label htmlFor="imagem" className={styles.label}>
                Imagem *
              </label>
              <input
                type="file"
                id="imagem"
                accept="image/*"
                onChange={handleImageUpload}
                className={`${styles.fileInput} ${errors.imagem ? styles.error : ''}`}
              />
              {formData.imagem && (
                <div className={styles.imagePreview}>
                  <img
                    src={URL.createObjectURL(formData.imagem)}
                    alt="Preview"
                    className={styles.previewImg}
                  />
                </div>
              )}
              {errors.imagem && <span className={styles.errorMsg}>{errors.imagem}</span>}
            </div>

            {/* Botões */}
            {errors.geral && (
              <p className={styles.errorGeral}>{errors.geral}</p>
            )}
            <div className={styles.buttonGroup}>
              <Button variant="secondary" type="button" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? 'Enviando...' : 'Enviar'}
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      <Footer />
    </div>
  )
}

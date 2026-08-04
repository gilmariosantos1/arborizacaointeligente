import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonText,
} from '@ionic/react';
import Header from '../components/Header';
import MapSelector from '../components/MapSelector';
import { useAuth } from '../auth/AuthContext';
import { createAlerta } from '../services/alertaService';
import './ArborizacaoPages.css';

type Location = { lat: number; lng: number };

const Upload: React.FC = () => {
  const history = useHistory();
  const { signed, user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [formData, setFormData] = useState({
    assunto: '',
    endereco: '',
    localizacao: '',
    descricao: '',
    imagem: null as File | null,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const assuntoSuggestions = ['Queda de árvore', 'Local mal arborizado', 'Local sem árvore'];

  const handleUpload = () => setIsModalOpen(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ assunto: '', endereco: '', localizacao: '', descricao: '', imagem: null });
    setSelectedLocation(null);
    setErrors({});
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    const formattedLocation = `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`;
    setFormData((prev) => ({ ...prev, localizacao: formattedLocation }));
  };

  const handleAddressSearch = async () => {
    if (!formData.endereco.trim()) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.endereco)}&limit=1`,
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const location = {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        };
        setSelectedLocation(location);
        setFormData((prev) => ({
          ...prev,
          localizacao: `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`,
        }));
      } else {
        window.alert('Endereço não encontrado. Tente ser mais específico.');
      }
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
      window.alert('Erro ao buscar endereço. Tente novamente.');
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFormData((prev) => ({ ...prev, imagem: file }));
  };

  const validateForm = () => {
    const nextErrors: { [key: string]: string } = {};

    if (!formData.assunto.trim()) nextErrors.assunto = 'Assunto é obrigatório';
    if (!formData.localizacao.trim()) nextErrors.localizacao = 'Selecione uma localização no mapa ou digite um endereço';
    if (!formData.descricao.trim()) nextErrors.descricao = 'Descrição é obrigatória';
    if (!formData.imagem) nextErrors.imagem = 'Selecione uma imagem';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm() || !selectedLocation || !user?.id) return;

    try {
      const dados = new FormData();
      dados.append('assunto', formData.assunto);
      dados.append('descricao', formData.descricao);
      dados.append('latitude', String(selectedLocation.lat));
      dados.append('longitude', String(selectedLocation.lng));
      dados.append('data_alerta', new Date().toISOString().slice(0, 19).replace('T', ' '));
      dados.append('imagem', formData.imagem as File);
      dados.append('usuario_id_usuario', String(user.id));

      await createAlerta(dados);
      window.alert('Upload realizado com sucesso!');
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao enviar alerta:', error);
      window.alert('Erro ao enviar o alerta. Tente novamente.');
    }
  };

  if (!signed) {
    return (
      <IonPage>
        <Header />
        <IonContent className="page-content">
          <div className="auth-card">
            <IonText>
              <h2>Para nos enviar um alerta é preciso ter uma conta!</h2>
            </IonText>
            <p className="small-muted centered">
              Se ainda não tiver, crie sua conta gratuitamente agora ou faça login.
            </p>
            <div className="button-row" style={{ justifyContent: 'center' }}>
              <IonButton onClick={() => history.push('/cadastro')}>Cadastrar</IonButton>
              <IonButton fill="outline" onClick={() => history.push('/login')}>Entrar</IonButton>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <Header />
      <IonContent className="page-content">
        <div className="upload-card">
          <h2 className="section-title">Envie sua imagem!</h2>
          <p>Envie uma imagem de uma árvore invasora e/ou de um local mal arborizado.</p>
          <IonButton expand="block" shape="round" onClick={handleUpload}>Upload</IonButton>
        </div>

        {isModalOpen && (
          <div className="form-card" style={{ margin: '16px auto', maxWidth: '760px' }}>
            <h2 className="section-title">Reportar Problema de Arborização</h2>

            <form onSubmit={handleSubmit} className="form-grid">
              <IonItem lines="full">
                <IonLabel position="floating">Assunto *</IonLabel>
                <input
                  value={formData.assunto}
                  onChange={(event) => handleInputChange('assunto', event.target.value)}
                  list="assunto-suggestions"
                  style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', padding: '0.5rem 0' }}
                />
              </IonItem>
              <datalist id="assunto-suggestions">
                {assuntoSuggestions.map((suggestion) => (
                  <option key={suggestion} value={suggestion} />
                ))}
              </datalist>
              {errors.assunto && <div className="error-text">{errors.assunto}</div>}

              <IonItem lines="full">
                <IonLabel position="floating">Endereço</IonLabel>
                <IonInput value={formData.endereco} onIonChange={(e) => handleInputChange('endereco', String(e.detail.value ?? ''))} />
              </IonItem>

              <IonButton type="button" expand="block" fill="outline" onClick={handleAddressSearch}>
                Buscar endereço
              </IonButton>

              <IonItem lines="full">
                <IonLabel position="floating">Localização</IonLabel>
                <IonInput value={formData.localizacao} readonly />
              </IonItem>
              {errors.localizacao && <div className="error-text">{errors.localizacao}</div>}

              <MapSelector onLocationSelect={handleLocationSelect} selectedLocation={selectedLocation} />

              <IonItem lines="full">
                <IonLabel position="floating">Descrição *</IonLabel>
                <IonTextarea rows={4} value={formData.descricao} onIonChange={(e) => handleInputChange('descricao', String(e.detail.value ?? ''))} />
              </IonItem>
              {errors.descricao && <div className="error-text">{errors.descricao}</div>}

              <IonItem lines="full">
                <IonLabel>Imagem *</IonLabel>
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ marginTop: '12px' }} />
              </IonItem>
              {errors.imagem && <div className="error-text">{errors.imagem}</div>}

              {formData.imagem && (
                <div className="preview-box">
                  <img src={URL.createObjectURL(formData.imagem)} alt="Preview" />
                </div>
              )}

              <div className="button-row">
                <IonButton type="button" fill="outline" onClick={handleCloseModal}>Cancelar</IonButton>
                <IonButton type="submit">Enviar</IonButton>
              </div>
            </form>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Upload;

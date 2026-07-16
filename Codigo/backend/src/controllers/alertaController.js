import db from '../models/indexModel.js'

const { Alerta } = db

export const criarAlerta = async (req, res) => {
  try {
    const { assunto, descricao, latitude, longitude, data_alerta, usuario_id_usuario, municipalidade_id_municipalidade } = req.body
    const imagem_endereco = `/uploads/alertas/${req.file.filename}`

    const alerta = await Alerta.create({
      assunto,
      descricao,
      latitude,
      longitude,
      imagem_endereco,
      data_alerta,
      usuario_id_usuario,
      municipalidade_id_municipalidade
    })

    res.status(201).json(alerta)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}

export const listarAlertas = async (req, res) => {
  try {
    const alertas = await Alerta.findAll({
      include: [
        db.User ? { model: db.User, as: 'usuario' } : null,
        db.Municipalidade ? { model: db.Municipalidade, as: 'municipalidade' } : null,
      ].filter(Boolean)
    })
    res.json(alertas)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}

export const atualizarStatusAlerta = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const alerta = await Alerta.findByPk(id)
    if (!alerta) {
      return res.status(404).json({ erro: 'Alerta não encontrado' })
    }

    alerta.status = status
    await alerta.save()

    res.json(alerta)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}
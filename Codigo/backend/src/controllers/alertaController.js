import db from '../models/index.js'

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
      include: [db.Usuario, db.Municipalidade] // opcional: traz os dados relacionados junto
    })
    res.json(alertas)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}
const generateUniqueId = require("../utils/generateUniqueId");
const crypto = require("crypto");
const connection = require("../database/connection");

class OngController {
  async index(req, res) {
    const ongs = await connection("ongs").select("*");
    return res.json(ongs);
  }

  async store(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;
    const id = generateUniqueId();
    await connection("ongs").insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });
    return res.json({ id });
  }
}

module.exports = new OngController();

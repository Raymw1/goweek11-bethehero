const connection = require("../database/connection");

class SessionController {
  async store(req, res) {
    const { id } = req.body;
    const ong = await connection("ongs").where("id", id).select("name").first();
    if (!ong)
      return res
        .status(400)
        .json({ error: { message: "No ong found with this ID!" } });
    return res.json(ong);
  }
}

module.exports = new SessionController();

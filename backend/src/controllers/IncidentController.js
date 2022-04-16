const { response } = require("express");
const connection = require("../database/connection");

class IncidentController {
  async index(req, res) {
    const { page = 1 } = req.query;
    let [count] = await connection("incidents").count();
    const incidents = await connection("incidents")
      .join("ongs", "ongs.id", "=", "incidents.ong_id")
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        "ongs.id",
        "ongs.name",
        "ongs.email",
        "ongs.whatsapp",
        "ongs.city",
        "ongs.uf",
        "incidents.*",
      ]);
    res.header("X-Total-Count", count["count(*)"]);
    return res.json(incidents);
  }

  async store(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;
    const [id] = await connection("incidents").insert({
      title,
      description,
      value,
      ong_id,
    });
    return res.json({ id });
  }

  async destroy(req, res) {
    const ong_id = req.headers.authorization;
    const incident = await connection("incidents")
      .where("id", req.params.id)
      .select("ong_id")
      .first();
    if (!incident)
      return res
        .status(404)
        .json({ errors: { message: "Incident not found!" } });
    if (incident.ong_id !== ong_id)
      return res
        .status(401)
        .json({ error: { message: "Operation not permitted!" } });
    await connection("incidents").where("id", req.params.id).delete();
    return res.status(204).send();
  }
}

module.exports = new IncidentController();

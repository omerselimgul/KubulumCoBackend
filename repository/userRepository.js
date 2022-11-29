const sql = require("mssql");

// db config
const configOdDB = {
  user: "test",
  password: "test",
  server: "localhost",
  database: "DBKULUP",
  trustServerCertificate: true,
};

const getById = async (id) => {
    try {
        var pool = await sql.connect(configOdDB)
        var data = await pool.request()
                            .input("UserId", sql.Int, id)
                            .query("SELECT * FROM TBLUSERS WHERE UserId = @UserId")
        return data.recordset[0]
    } catch(err) {
        throw err
    } finally {
        sql?.close()
        pool?.close()
    }
}

module.exports = {
    getById
}

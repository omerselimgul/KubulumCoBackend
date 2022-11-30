const sql = require("mssql");

// db config
const configOdDB = {
  user: "test",
  password: "test",
  server: "localhost",
  database: "DBKULUP",
  trustServerCertificate: true,
};

const createClub = async (insertData) => {
  try {
    const { ClubName, ClubMail, UniversityId, Description, UserId } = insertData;
    var pool = await sql.connect(configOdDB);
    var data = await pool
      .request()
      .input("ClubName", sql.NVarChar(50), ClubName)
      .input("ClubMail", sql.NVarChar(50), ClubMail)
      .input("UniversityId", sql.Int, UniversityId)
      .input("Description", sql.NVarChar(1000), Description)
      .query(
        "INSERT INTO TBLCLUBS (ClubName, ClubMail, UniversityId, Description) VALUES (@ClubName, @ClubMail, @UniversityId, @Description)"
      );
    if (data.rowsAffected.length > 0) {


      data = await pool
        .request()
        .input("ClubMail", sql.NVarChar(50), ClubMail)
        .query("SELECT * FROM TBLCLUBS WHERE ClubMail = @ClubMail");

      let addAdmin = await pool
        .request()
        .input("UserId", sql.Int, UserId)
        .input("ClubId", sql.Int, data.recordset[0].ClubId)
        .query("insert into TBLCLUBADMIN (UserId,ClubId) values (@UserId,@ClubId)");

      return data.recordset[0];
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  } finally {
    pool?.close();
    sql?.close();
  }
};

const getByEmail = async (mail) => {
  try {
    var pool = await sql.connect(configOdDB);
    var data = await pool
      .request()
      .input("ClubMail", sql.NVarChar(50), mail)
      .query("SELECT * FROM TBLCLUBS WHERE ClubMail = @ClubMail");
    return data.recordset[0];
  } catch (err) {
    throw err;
  } finally {
    pool?.close();
    sql?.close();
  }
};

const getAll = async () => {
  try {
    var pool = await sql.connect(configOdDB);
    var data = await pool
      .request()
      .query(
        "SELECT c.ClubId, c.ClubName, c.ClubMail, c.UniversityId, u.UniversityName " +
        "FROM TBLCLUBS c INNER JOIN TBLUNIVERSITIES AS u " +
        "ON c.UniversityId = u.UniversityId"
      );
    return data.recordset;
  } catch (err) {
    throw err;
  } finally {
    pool?.close();
    sql?.close();
  }
};

const getById = async (id) => {
  try {
    var pool = await sql.connect(configOdDB);
    var data = await pool
      .request()
      .input("ClubId", sql.Int, id)
      .query("SELECT * FROM TBLCLUBS WHERE ClubId = @ClubId");
    return data.recordset[0];
  } catch (err) {
    throw err;
  } finally {
    pool?.close();
    sql?.close();
  }
};

const getByClubNameContains = async (name) => {
  try {
    var pool = await sql.connect(configOdDB);
    var data = await pool
      .request()
      .query(`SELECT * FROM TBLCLUBS WHERE ClubName LIKE '%${name}%' `);
    return data.recordset;
  } catch (err) {
    throw err;
  } finally {
    pool?.close();
    sql?.close();
  }
};

const remove = async (id) => {
  try {
    var pool = await sql.connect(configOdDB);
    var data = await pool
      .request()
      .input("ClubId", sql.Int, id)
      .query("DELETE FROM TBLCLUBS WHERE ClubId = @ClubId");
  } catch (err) {
    throw err;
  } finally {
    pool?.close();
    sql?.close();
  }
};

const update = async (id, updateData) => {
  try {
    const { ClubName, ClubMail, Description } = updateData;
    var pool = await sql.connect(configOdDB);
    var data = await pool
      .request()
      .input("ClubId", sql.Int, id)
      .input("ClubName", sql.NVarChar(50), ClubName)
      .input("ClubMail", sql.NVarChar(50), ClubMail)
      .input("Description", sql.NVarChar(1000), Description)
      .query(
        "UPDATE TBLCLUBS SET ClubName=@ClubName, ClubMail = @ClubMail, Description = @Description WHERE ClubId = @ClubId"
      );
    if (data.rowsAffected.length > 0) {
      data = await pool
        .request()
        .input("ClubId", sql.Int, id)
        .query("SELECT * FROM TBLCLUBS WHERE ClubId = @ClubId");
      return data.recordset[0];
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  } finally {
    pool?.close();
    sql?.close();
  }
};

module.exports = {
  createClub,
  getByEmail,
  getAll,
  getById,
  getByClubNameContains,
  remove,
  update,
};

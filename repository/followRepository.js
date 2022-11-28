const sql = require("mssql");

// db config
const configOdDB = {
  user: "test",
  password: "test",
  server: "localhost",
  database: "DBKULUP",
  trustServerCertificate: true,
};

const createFollow = async (insertData) => {
  try {
    const { UserId, ClubId } = insertData;
    var pool = await sql.connect(configOdDB);
    var data = await pool
      .request()
      .input("UserId", sql.Int, UserId)
      .input("ClubId", sql.Int, ClubId)
      .query(
        "INSERT INTO TBLFOLLOWS (UserId, ClubId) VALUES (@UserId, @ClubId)"
      );
    if (data.rowsAffected.length > 0) {
      data = await pool
        .request()
        .input("UserId", sql.Int, UserId)
        .input("ClubId", sql.Int, ClubId)
        .query(
          "SELECT f.FollowId, u.Username, u.UserId, c.ClubId, c.ClubName, uni.UniversityName " +
            "FROM TBLFOLLOWS AS f INNER JOIN TBLUSERS AS u " +
            "ON f.UserId = u.UserId " +
            "INNER JOIN TBLCLUBS as c " +
            "ON f.ClubId = c.ClubId " +
            "INNER JOIN TBLUNIVERSITIES AS uni " +
            "ON c.UniversityId = uni.UniversityId " +
            "WHERE f.UserId = @UserId AND f.ClubId = @ClubId"
        );
      return data.recordset[0];
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  } finally {
    sql?.close();
    pool?.close();
  }
};

const getByUserIdAndClubId = async (searchData) => {
  try {
    const { UserId, ClubId } = searchData;
    var pool = await sql.connect(configOdDB);
    var data = await pool
      .request()
      .input("UserId", sql.Int, UserId)
      .input("ClubId", sql.Int, ClubId)
      .query(
        "SELECT * FROM TBLFOLLOWS WHERE UserId = @UserId AND ClubId = @ClubId"
      );
    return data.recordset[0];
  } catch (err) {
    throw err;
  } finally {
    sql?.close();
    pool?.close();
  }
};

const remove = async (removeData) => {
  try {
    const { UserId, ClubId } = removeData;
    var pool = await sql.connect(configOdDB);
    var data = await pool
      .request()
      .input("UserId", sql.Int, UserId)
      .input("ClubId", sql.Int, ClubId)
      .query(
        "DELETE FROM TBLFOLLOWS WHERE UserId = @UserId AND ClubId = @ClubId"
      );
  } catch (err) {
    throw err;
  } finally {
    sql?.close();
    pool?.close();
  }
};

module.exports = {
  createFollow,
  getByUserIdAndClubId,
  remove
};

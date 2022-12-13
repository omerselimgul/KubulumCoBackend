const sql = require("mssql");

// db config
const configOdDB = {
  user: "test",
  password: "test",
  server: "localhost",
  database: "DBKULUP",
  trustServerCertificate: true,
};

const create = async (insertData) => {
  try {
    const { ClubId, PostHeader, PostText, UserId } = insertData;
    var pool = await sql.connect(configOdDB);
    var data = await pool
      .request()
      .input("ClubId", sql.Int, ClubId)
      .input("PostHeader", sql.NVarChar(50), PostHeader)
      .input("PostText", sql.NVarChar(300), PostText)
      .input("UserId", sql.Int, UserId)
      .query(
        "INSERT INTO TBLPOSTS (ClubId, PostHeader, PostText, UserId) VALUES (@ClubId, @PostHeader, @PostText, @UserId)"
      );
    if (data.rowsAffected.length > 0) {
      data = await pool
        .request()
        .input("ClubId", sql.Int, ClubId)
        .input("UserId", sql.Int, UserId)
        .input("PostHeader", sql.NVarChar(50), PostHeader)
        .query(
          "SELECT p.*, c.ClubName, u.UserName, uni.UniversityName FROM TBLPOSTS p " +
            "INNER JOIN TBLCLUBS AS c ON p.ClubId = c.ClubId " +
            "INNER JOIN TBLUSERS AS u ON p.UserId = u.UserId " +
            "INNER JOIN TBLUNIVERSITIES AS uni ON c.UniversityId = uni.UniversityId " +
            "WHERE p.UserId=@UserId AND p.ClubId=@ClubId AND p.PostHeader=@PostHeader"
        );
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

const getById = async (id) => {
  try {
    var pool = await sql.connect(configOdDB);
    var data = await pool
      .request()
      .input("PostId", sql.Int, id)
      .query(
        "SELECT p.*, c.ClubName, u.UserName, uni.UniversityName FROM TBLPOSTS p " +
          "INNER JOIN TBLCLUBS AS c ON p.ClubId = c.ClubId " +
          "INNER JOIN TBLUSERS AS u ON p.UserId = u.UserId " +
          "INNER JOIN TBLUNIVERSITIES AS uni ON c.UniversityId = uni.UniversityId " +
          "WHERE p.PostId=@PostId"
      );
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
        "SELECT p.*, c.ClubName, u.UserName, uni.UniversityName FROM TBLPOSTS p " +
          "INNER JOIN TBLCLUBS AS c ON p.ClubId = c.ClubId " +
          "INNER JOIN TBLUSERS AS u ON p.UserId = u.UserId " +
          "INNER JOIN TBLUNIVERSITIES AS uni ON c.UniversityId = uni.UniversityId "
      );
    return data.recordset;
  } catch (err) {
    throw err;
  } finally {
    pool?.close();
    sql?.close();
  }
}

const getByClubId = async (ClubId) => {
  try {
    var pool = await sql.connect(configOdDB);
    var data = await pool
      .request()
      .input("ClubId",sql.Int, ClubId)
      .query(
        "SELECT p.*, c.ClubName, u.UserName, uni.UniversityName FROM TBLPOSTS p " +
          "INNER JOIN TBLCLUBS AS c ON p.ClubId = c.ClubId " +
          "INNER JOIN TBLUSERS AS u ON p.UserId = u.UserId " +
          "INNER JOIN TBLUNIVERSITIES AS uni ON c.UniversityId = uni.UniversityId " +
          "WHERE c.ClubId=@ClubId"
      );
    return data.recordset;
  } catch (err) {
    throw err;
  } finally {
    pool?.close();
    sql?.close();
  }
}


const update = async (updateData) => {
  try {
    const {PostId, PostHeader, PostText } = updateData
    var pool = await sql.connect(configOdDB)
    var data = await pool.request()
                    .input("PostId", sql.Int, PostId)
                    .input("PostHeader", sql.NVarChar(50), PostHeader)
                    .input("PostText", sql.NVarChar(300), PostText)
                    .query("UPDATE TBLPOSTS SET PostHeader=@PostHeader, PostText=@PostText WHERE PostId=@PostId")
    if(data.rowsAffected.length > 0 ){
        data = await pool.request()
                          .input("PostId", sql.Int, PostId)
                          .query(
                            "SELECT p.*, c.ClubName, u.UserName, uni.UniversityName FROM TBLPOSTS p " +
                              "INNER JOIN TBLCLUBS AS c ON p.ClubId = c.ClubId " +
                              "INNER JOIN TBLUSERS AS u ON p.UserId = u.UserId " +
                              "INNER JOIN TBLUNIVERSITIES AS uni ON c.UniversityId = uni.UniversityId " +
                              "WHERE p.PostId=@PostId"
                          );
        return data.recordset[0]
    } else {
      return null;
    }

  } catch(err) {
    throw err
  } finally {
    sql?.close()
    pool?.close()
  }
}

const remove = async (postId) => {
  try {
    var pool = await sql.connect(configOdDB)
    var data = await pool.request()
                          .input("PostId", sql.Int, postId)
                          .query("DELETE FROM TBLPOSTS WHERE PostId=@PostId")
    if(data.rowsAffected.length > 0) {
      return true
    }else {
      false
    }
  } catch(err) {
    throw err
  } finally {
    sql?.close()
    pool?.close()
  }
}

module.exports = {
  create,
  getById,
  getAll,
  getByClubId,
  update,
  remove
};

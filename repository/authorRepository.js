const sql = require('mssql')

const configOfDB = {
    user: 'test',
    password: 'test',
    server: 'localhost',
    database: 'DBKULUP',
    trustServerCertificate: true,
}
const deleteAuthor = async (data) => {
    let { User, Club } = data
    try {
        var pool = await sql.connect(configOfDB);
        var data = await pool.request()
            .input('UserId', sql.Int, User)
            .input('ClubId', sql.Int, Club)
            .query("delete from TBLCLUBADMIN where UserId=@UserId and ClubId=@ClubId");
        if (data.rowsAffected.length > 0) {
            return data.recordset;
        }
        else {
            return null
        }
    } catch (error) {
        throw error;
    } finally {
        pool?.close;
        sql?.close;
    }
}
const addAuthor = async (data) => {
    let { User, Club } = data
    try {
        var pool = await sql.connect(configOfDB);
        var data = await pool.request()
            .input('UserId', sql.Int, User)
            .input('ClubId', sql.Int, Club)
            .query("insert into TBLCLUBADMIN (UserId,ClubId) values (@UserId,@ClubId)");
        if (data.rowsAffected.length > 0) {
            return data.recordset;
        }
        else {
            return null
        }
    } catch (error) {
        throw error;
    } finally {
        pool?.close;
        sql?.close;
    }
}
const getByUserId = async (UserId) => {
    try {
        var pool = await sql.connect(configOfDB);
        var data = await pool.request()
            .input('UserId', sql.Int, UserId)
            .query("select UserId,TBLCLUBS.ClubId,ClubName,ClubMail,UniversityId,Description from TBLCLUBADMIN inner join TBLCLUBS on TBLCLUBS.ClubId= TBLCLUBADMIN.ClubId where UserId=@UserId");
        if (data.rowsAffected.length > 0) {
            return data.recordset;
        }
        else {
            return null
        }
    } catch (error) {
        throw error;
    } finally {
        pool?.close;
        sql?.close;
    }
}
const getByClubId = async (ClubId) => {
    try {
        var pool = await sql.connect(configOfDB);
        var data = await pool.request()
            .input('ClubId', sql.Int, ClubId)
            .query("select TBLUSERS.* from TBLCLUBADMIN  inner join TBLUSERS on TBLUSERS.UserId= TBLCLUBADMIN.UserId where ClubId=@ClubId");
        if (data.rowsAffected.length > 0) {
            return data.recordset;
        }
        else {
            return null
        }
    } catch (error) {
        throw error;
    } finally {
        pool?.close;
        sql?.close;
    }
}
module.exports = {
    getByUserId,
    getByClubId,
    addAuthor,
    deleteAuthor
}
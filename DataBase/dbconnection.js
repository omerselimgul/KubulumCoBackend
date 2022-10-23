const sql = require('mssql')

const configOdDB = {
    user: 'test',
    password: 'test',
    server: 'localhost',
    database: 'DBKULUP',
    trustServerCertificate: true,
    // user: 'test',
    // password: 'test',
    // server: 'localhost',
    // database: 'DBKULUP',
    // trustServerCertificate: true,

}
const getUserByUsernameOfDb = async (username) => {
    try {

        var pool = await sql.connect(configOdDB);
        var data = await pool.request()
            .input('username', sql.VarChar, username)
            .query("select * from TBLUSERS where username=@username");
        if (data.rowsAffected.length > 0) {
            return data;
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
const registerRequestOfUserTable = async (username, password) => {
    try {

        var pool = await sql.connect(configOdDB);
        var data = await pool.request()
            .input('username', sql.VarChar, username)
            .input('password', sql.VarChar, password)
            .query("Insert Into TBLUSERS (username,userpassword) Values (@username,@password) ");
        if (data.rowsAffected.length > 0) {
            data = await pool.request()
                .input('username', sql.VarChar, username)
                .query("select * from TBLUSERS where username=@username ");
                // bu kısım tek requestte de halledilebilir gibi ama kontrolu zor olabilir !Discuss
            // for (let i = 0; i < data.rowsAffected; i++) {
            //     effectedRow.push(data.recordset[i]);
            // }

            return data;
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
    registerRequestOfUserTable,
    getUserByUsernameOfDb
}


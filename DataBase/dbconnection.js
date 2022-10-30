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
const getUserByUsernameOfDb = async (Username) => {
    try {

        var pool = await sql.connect(configOdDB);
        var data = await pool.request()
            .input('Username', sql.VarChar, Username)
            .query("select * from TBLUSERS where Username=@Username");
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
const registerRequestOfUserTable = async (body) => {
    try {
        let {Username,Password,Email,Birthdate,Cinsiyet,Universite,Bolum}=body
        var pool = await sql.connect(configOdDB);
        var data = await pool.request()
            .input('Username', sql.VarChar, Username)
            .input('password', sql.VarChar, Password)
            .input('Email', sql.VarChar, Email)
            .input('Birthdate', sql.Date, Birthdate)
            .input('Cinsiyet', sql.VarChar, Cinsiyet)
            .input('Universite', sql.VarChar, Universite)
            .input('Bolum', sql.VarChar, Bolum)
            .query("Insert Into TBLUSERS (Username,Userpassword,Email,Birthdate,Cinsiyet,Universite,Bolum) Values (@Username,@password,@Email,@Birthdate,@Cinsiyet,@Universite,@Bolum) ");
        if (data.rowsAffected.length > 0) {
            data = await pool.request()
                .input('Username', sql.VarChar, Username)
                .query("select * from TBLUSERS where Username=@Username ");
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


const sql = require('mssql')

const configOfDB = {
    user: 'test',
    password: 'test',
    server: 'localhost',
    database: 'DBKULUP',
    trustServerCertificate: true,
}
const getById = async (UserId) => {
    try {
        var pool = await sql.connect(configOfDB);
        var data = await pool.request()
            .input('UserId', sql.Int, UserId)
            .query("select * from TBLUSERS where UserId=@UserId");
        if (data.rowsAffected.length > 0) {
            return data.recordset[0];
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
const getByEmail = async (Email) => {
    try {
        var pool = await sql.connect(configOfDB);
        var data = await pool.request()
            .input('Email', sql.NVarChar(50), Email)
            .query("select * from TBLUSERS where Email=@Email");
        if (data.rowsAffected.length > 0) {
            return data.recordset[0];
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
const getByUserame = async (Username) => {
    try {

        var pool = await sql.connect(configOfDB);
        var data = await pool.request()
            .input('Username', sql.NVarChar(50), Username)
            .query("select * from TBLUSERS where Username=@Username");
        if (data.rowsAffected.length > 0) {
            return data.recordset[0];
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
const updateUser = async (body) => {
    try {
        let { UpdatedUsername, UpdatedUserpassword, Email, Birthdate, Cinsiyet, Universite, Bolum, UserId } = body
        var pool = await sql.connect(configOfDB);
        var data = await pool.request()
            .input('UpdatedUsername', sql.NVarChar(50), UpdatedUsername)
            .input('UpdatedUserpassword', sql.NVarChar(500), UpdatedUserpassword)
            .input('Email', sql.NVarChar(50), Email)
            .input('Universite', sql.NVarChar(50), Universite)
            .input('Birthdate', sql.Date, Birthdate)
            .input('Cinsiyet', sql.NVarChar(5), Cinsiyet)
            .input('Bolum', sql.NVarChar(50), Bolum)
            .input('UserId', sql.Int, UserId)
            .query("UPDATE TBLUSERS SET Username=@UpdatedUsername,Userpassword=@UpdatedUserpassword,Universite=@Universite,Bolum=@Bolum,Cinsiyet=@Cinsiyet, Birthdate=@Birthdate ,Email=@Email WHERE UserId=@UserId")
        // insert into TBLUSERS(Username, Userpassword, Universite, Bolum, Cinsiyet, Birthdate, Email) values(@Username, @Userpassword, @Universite, @Bolum, @Cinsiyet, @Birthdate, @Email) where UserId =@UserID ");
        if (data.rowsAffected.length > 0) {
            data = await pool.request()
                .input('Username', sql.NVarChar(50), UpdatedUsername)
                .query("select * from TBLUSERS where Username=@Username ");
            // bu kısım tek requestte de halledilebilir gibi ama kontrolu zor olabilir !Discuss
            // for (let i = 0; i < data.rowsAffected; i++) {
            //     effectedRow.push(data.recordset[i]);
            // }

            return data.recordset[0];
        }
        else {
            return null
        }
    }
    catch (error) {
        throw error;
    } finally {

        pool?.close;
        sql?.close;

    }
}
const createdUser = async (body) => {
    try {
        let { Username, Userpassword, Email, Birthdate, Cinsiyet, Universite, Bolum } = body
        var pool = await sql.connect(configOfDB);
        var data = await pool.request()
            .input('Username', sql.NVarChar(50), Username)
            .input('Userpassword', sql.NVarChar(500), Userpassword)
            .input('Email', sql.NVarChar(50), Email)
            .input('Universite', sql.NVarChar(50), Universite)
            .query("Insert Into TBLUSERS (Username,Userpassword,Email,Universite) Values (@Username,@Userpassword,@Email,@Universite) ");
        if (data.rowsAffected.length > 0) {
            data = await pool.request()
                .input('Username', sql.NVarChar(50), Username)
                .query("select * from TBLUSERS where Username=@Username ");
            // bu kısım tek requestte de halledilebilir gibi ama kontrolu zor olabilir !Discuss
            // for (let i = 0; i < data.rowsAffected; i++) {
            //     effectedRow.push(data.recordset[i]);
            // }

            return data.recordset[0];
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
    getById,
    getByUserame,
    createdUser,
    getByEmail,
    updateUser
}


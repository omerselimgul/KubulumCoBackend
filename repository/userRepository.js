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
            .query("SELECT u.UserId, u.Username, u.Email, u.Birthdate, u.Cinsiyet, u.Bolum, uni.UniversityName "+ 
                   "FROM TBLUSERS u INNER JOIN TBLUNIVERSITIES AS uni ON u.Universite = uni.UniversityId " + 
                   "WHERE UserId = @UserId");
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
            .query("SELECT u.UserId, u.Username, u.Email, u.Birthdate, u.Cinsiyet, u.Bolum, uni.UniversityName "+ 
            "FROM TBLUSERS u INNER JOIN TBLUNIVERSITIES AS uni ON u.Universite = uni.UniversityId " + 
            "WHERE Email = @Email");
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
            .query("SELECT u.UserId, u.Username, u.Email, u.Birthdate, u.Cinsiyet, u.Bolum, uni.UniversityName "+ 
            "FROM TBLUSERS u INNER JOIN TBLUNIVERSITIES AS uni ON u.Universite = uni.UniversityId " + 
            "WHERE Username = @Username");
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
        let { Username, Userpassword, Email, Birthdate, Cinsiyet, Universite, Bolum, UserId } = body
        var pool = await sql.connect(configOfDB);
        var data = await pool.request()
            .input('Username', sql.NVarChar(50), Username)
            .input('Userpassword', sql.NVarChar(500), Userpassword)
            .input('Email', sql.NVarChar(50), Email)
            .input('Universite', sql.NVarChar(50), Universite)
            .input('Birthdate', sql.Date, Birthdate)
            .input('Cinsiyet', sql.NVarChar(5), Cinsiyet)
            .input('Bolum', sql.NVarChar(50), Bolum)
            .input('UserId', sql.Int, UserId)
            .query("UPDATE TBLUSERS SET Username=@Username,Userpassword=@Userpassword,Universite=@Universite,Bolum=@Bolum,Cinsiyet=@Cinsiyet, Birthdate=@Birthdate ,Email=@Email WHERE UserId=@UserId")
        // insert into TBLUSERS(Username, Userpassword, Universite, Bolum, Cinsiyet, Birthdate, Email) values(@Username, @Userpassword, @Universite, @Bolum, @Cinsiyet, @Birthdate, @Email) where UserId =@UserID ");
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
            .input('Universite', sql.Int, Universite)
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

const getCurrentUser = async (userData) => {
    try {
        const { UserId } = userData
        var pool = await sql.connect(configOfDB);
        var data = await pool.request()
            .input("UserId", sql.Int, UserId)
            .query("SELECT u.UserId, u.Username, u.Email, u.Birthdate, u.Cinsiyet, u.Bolum, uni.UniversityName "+ 
                   "FROM TBLUSERS u INNER JOIN TBLUNIVERSITIES AS uni ON u.Universite = uni.UniversityId " + 
                   "WHERE UserId = @UserId")
        return data.recordset[0]

    } catch (error) {
        throw error;
    } finally {

        pool?.close;
        sql?.close;

    }
}

const changePassword = async (UserId, Password) => {
    try {
        var pool = await sql.connect(configOfDB);
        var data = await pool.request()
            .input("UserId", sql.Int, UserId)
            .input("Password",sql.NVarChar(500), Password)
            .query("UPDATE TBLUSERS SET Userpassword = @Password WHERE UserId = @UserId")
        if(data.rowsAffected.length > 0) {
            data = await pool.request()
                .input("UserId", sql.Int, UserId)
                .query("SELECT * FROM TBLUSERS WHERE UserId = @UserId")
            return data.recordset[0] // db de hata oldumu onu denetlemek için. frontend tarafına gönderilmeyecek
        }
        return null;

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
    updateUser,
    getCurrentUser,
    changePassword
}


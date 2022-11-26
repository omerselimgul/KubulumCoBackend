const clubRepository = require("../repository/clubRepository")
const { CustomError } = require("../helpers/error/CustomError.js");
const universityRepository = require("../repository/universityRepository")

const create = async (req, res, next) => {
    try {
        //TODO: check if unveristy exists
        const university = await universityRepository.getById(req.body.UniversityId)
        if(!university) {
            return res.status(404).json({
                success:false,
                message:"Universite bulunamadı"
            })
        }

        // TODO: check if mail is in use
        const clubByEmail = await clubRepository.getByEmail(req.body.ClubMail)
        if(clubByEmail) {
            return res.status(400).json({
                success:false,
                message:"Email kullanımda"
            })
        }

        const data = await clubRepository.createClub(req.body)
        if(!data) {
            return res.status(500).json({
                success: false,
                message: "Bir hata olustu",
              });
        }

        return res.status(201).json({
            success:true,
            message:"Klup eklendi",
            data:data
        })
    } catch(err) {
        return next(new CustomError(err, 500))
    } 
}

const list = async (req, res, next) => {
    try {
        const data = await clubRepository.getAll()
        return res.status(200).json({
            success:true,
            message:"Klupler listelendi",
            data:data
        })
    } catch(err) {
        return next(new CustomError(err, 500))
    } 
}

const getById = async (req, res, next) => {
    try {
        const data = await clubRepository.getById(req.params.id)
        if(!data) {
            return res.status(404).json({
                success:false,
                message:"Klup bulunamadı"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Klup listelendi",
            data:data
        })
    } catch(err) {
        return next(new CustomError(err, 500))
    } 
}

const getByClubNameContains = async (req, res, next) => {
    try {
        const data = await clubRepository.getByClubNameContains(req.query.name)
        return res.status(200).json({
            success:true,
            message:"Klup listelendi",
            data:data
        })
    } catch(err) {
        return next(new CustomError(err, 500))
    } 
}

const deleteClub = async (req, res, next) => {
    try {
        // TODO: check if club exists
        const data = await clubRepository.getById(req.params.id)
        if(!data) {
            return res.status(404).json({
                success:false,
                message:"Klup bulunamadı"
            })
        }
        await clubRepository.remove(req.params.id)
        return res.status(200).json({
            success:true,
            message:"Klup silindi",
            data:data
        })
    } catch(err) {
        return next(new CustomError(err, 500))
    }
}

const update = async (req, res, next) => {
    try {
        // TODO: check if club exists
        const club = await clubRepository.getById(req.params.id)
        if(!club) {
            return res.status(404).json({
                success:false,
                message:"Klup bulunamadı"
            })
        }
        const data = await clubRepository.update(req.params.id, req.body)
        if(!data) {
            return res.status(500).json({
                success:false,
                message:"Güncelleme sırasında bilinmeyen bir hata oluştu"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Klup güncellendi",
            data:data
        })
        
    } catch(err) {
        return next(new CustomError(err, 500))
    }
}

module.exports = {
    create,
    list,
    getById,
    getByClubNameContains,
    deleteClub,
    update
}
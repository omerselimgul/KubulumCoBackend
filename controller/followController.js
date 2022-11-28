const { CustomError } = require("../helpers/error/CustomError.js");
const followRepository = require("../repository/followRepository");

const follow = async (req, res, next) => {
  try {
    const followData = await followRepository.getByUserIdAndClubId(req.body);
    if (!followData) {
      // Kullanıcı kulubu takip etmiyor. Takip etsin

      const data = await followRepository.createFollow(req.body);
      if (!data) {
        return res.status(500).json({
          success: false,
          message: "Bir hata oluştu",
        });
      }
      return res.status(201).json({
        success: true,
        message: "Kulup takip edildi",
        data: data,
      });
    } else {
        // kullanıcı kulubu takip ediyor, takibi geri çek
        await followRepository.remove(req.body)
        return res.status(200).json({
            success:true,
            message:"Takip bırakıldı",
            data:followData
        })
    }
  } catch (err) {
    return next(new CustomError(err, 500));
  }
};

module.exports = {
  follow,
};

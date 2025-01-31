const cloudinary = require("cloudinary");

// config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.upload = async (req, res) => {
  let result = await cloudinary.v2.uploader.upload(req.body.image, {
    public_id: `${Date.now()}`,
    resource_type: "auto",
    folder: "MERN Chat App",
  });
  res.json({
    public_id: result.public_id,
    url: result.secure_url,
  });
};

exports.remove = (req, res) => {
  console.log("REMOVE FROM SERVER");
  let image_id = req.body.public_id;
  cloudinary.uploader.destroy(image_id, (error, result) => {
    if (error) return res.json({ success: false, error: error });
    res.send("Deleted");
  });
};

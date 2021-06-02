const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: "dyrannvyu",
//   api_key: "393359382227387",
//   api_secret: "gpDRaf4r-8kVQ2Ec9vb5TEiy-TY",
// });

cloudinary.config({
  cloud_name: process.env.COUDINARY_CLOUD_NAME,
  api_key: process.env.COUDINARY_API_KEY,
  api_secret: process.env.COUDINARY_API_SECRET,
});

// exports.upload = (req, res) => {
//   cloudinary.uploader.upload(
//     req.body.image,
//     { public_id: `${Date.now()}`, resource_type: "auto" },
//     function (err, result) {
//       if (err) res.json(err);
//       res.json({
//         public_id: result.public_id,
//         url: result.secure_url,
//       });
//     }
//   );
// };

exports.upload = async (req, res) => {
  let result = await cloudinary.uploader.upload(req.body.image, {
    public_id: `${Date.now()}`,
    resource_type: "auto",
  });
  res.json({
    public_id: result.public_id,
    url: result.secure_url,
  });
};

exports.remove = (req, res) => {
  let image_id = req.body.public_id;

  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) return result.json({ success: false, err });
    res.json("ok");
  });
};

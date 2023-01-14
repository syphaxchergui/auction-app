import multer from "multer";

export const uploadItemImage = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(file.mimetype);
      cb("Non valide file !", false);
    }
  },
});

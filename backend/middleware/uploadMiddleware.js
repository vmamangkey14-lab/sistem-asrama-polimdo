const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Make sure upload directory exists using absolute path
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

// FILTER IMAGE
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("File harus berupa gambar (jpeg, jpg, png)"));
  }
};

const multerInstance = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Wrapper to intercept multer errors and return clean response
const wrapMiddleware = (middlewareFn) => {
  return (req, res, next) => {
    middlewareFn(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
              message: "Ukuran foto maksimal 5 MB",
            });
          }
          return res.status(400).json({
            message: `File upload error: ${err.message}`,
          });
        }
        return res.status(400).json({
          message: err.message,
        });
      }
      next();
    });
  };
};

const upload = {
  single: (fieldname) => wrapMiddleware(multerInstance.single(fieldname)),
  array: (fieldname, maxCount) => wrapMiddleware(multerInstance.array(fieldname, maxCount)),
  fields: (fields) => wrapMiddleware(multerInstance.fields(fields)),
  any: () => wrapMiddleware(multerInstance.any()),
  none: () => wrapMiddleware(multerInstance.none()),
};

module.exports = upload;
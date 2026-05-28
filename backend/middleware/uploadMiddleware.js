const multer = require("multer");

const path = require("path");

// STORAGE
const storage =
  multer.diskStorage({

    destination:
      function (
        req,
        file,
        cb
      ) {

        cb(
          null,
          "uploads/"
        );

      },

    filename:
      function (
        req,
        file,
        cb
      ) {

        const uniqueName =
          Date.now() +
          path.extname(
            file.originalname
          );

        cb(
          null,
          uniqueName
        );

      },

  });

// FILTER IMAGE
const fileFilter =
  (req, file, cb) => {

    const allowedTypes =
      /jpeg|jpg|png/;

    const extname =
      allowedTypes.test(
        path.extname(
          file.originalname
        ).toLowerCase()
      );

    const mimetype =
      allowedTypes.test(
        file.mimetype
      );

    if (
      extname &&
      mimetype
    ) {

      return cb(
        null,
        true
      );

    } else {

      cb(
        "File harus berupa gambar"
      );

    }

  };

const upload = multer({

  storage,

  fileFilter,

});

module.exports = upload;
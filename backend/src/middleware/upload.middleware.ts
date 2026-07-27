import multer from "multer";

export const upload = multer({
    storage: multer.memoryStorage(),
});

const bannerImageMimeTypes = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
]);

export const bannerUpload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (_request, file, callback) => {
        if (!bannerImageMimeTypes.has(file.mimetype)) {
            callback(new Error("Only JPEG, PNG, and WebP images are allowed."));
            return;
        }

        callback(null, true);
    },
});

import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/alertas/');
    },
    filename: (req, file, cb) => {
        const nomeUnico = `${Date.now()}-${file.originalname}`;
        cb(null, nomeUnico);
    }
});

export const upload = multer({ storage });
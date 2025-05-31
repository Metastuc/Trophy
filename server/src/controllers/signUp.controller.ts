import { type Request, type Response } from "express";
import { type TypedResponse } from "../type/response";
import { db } from '../utils/firebase.js';
import { getStorage } from 'firebase-admin/storage';
import { isValidImageFormat } from '../utils/fileValidation.js';
import multer, { FileFilterCallback } from 'multer';
import { v4 as uuidv4 } from 'uuid';

// Define custom request type with file
interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

// Configure multer for memory storage
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        if (isValidImageFormat(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Unsupported file format. Please upload GIF, JPEG, JPG, or PNG'));
        }
    }
}).single('pfp');

export const signUp = async (
    req: MulterRequest,
    res: Response<TypedResponse<{ message?: string }>>
): Promise<void> => {
    try {
        // Handle file upload
        upload(req, res, function (err: any) {
            (async () => {
                if (err) {
                    return res.status(400).json({
                        status: "error",
                        message: err instanceof Error ? err.message : "An error occurred"
                    });
                }
        
                const {
                    username,
                    email,
                    bio,
                    farcaster,
                    address,
                    pfp // For base64 string
                }: {
                    username?: string;
                    email?: string;
                    bio?: string;
                    farcaster?: string;
                    address?: string;
                    pfp?: string;
                } = req.body;
        
                let uploadedPfp = "url"; // Default fallback
        
                try {
                    if (req.file) {
                        const storage = getStorage();
                        const bucket = storage.bucket();
                        const fileExtension = req.file.originalname.split('.').pop();
                        const filename = `profile_pictures/${address}_${uuidv4()}.${fileExtension}`;
                        const file = bucket.file(filename);
        
                        await file.save(req.file.buffer, {
                            metadata: {
                                contentType: req.file.mimetype
                            }
                        });
        
                        const [url] = await file.getSignedUrl({
                            action: 'read',
                            expires: '03-01-2500'
                        });
        
                        uploadedPfp = url;
                    } else if (pfp && pfp.startsWith('data:')) {
                        const matches = pfp.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
                        if (!matches || matches.length !== 3) throw new Error('Invalid base64 string');
        
                        const mimeType = matches[1];
                        const base64Data = matches[2];
        
                        if (!isValidImageFormat(mimeType)) {
                            throw new Error('Unsupported file format. Please upload GIF, JPEG, JPG, or PNG');
                        }
        
                        const buffer = Buffer.from(base64Data, 'base64');
                        const storage = getStorage();
                        const bucket = storage.bucket();
                        const filename = `profile_pictures/${address}_${uuidv4()}.${mimeType.split('/')[1]}`;
                        const file = bucket.file(filename);
        
                        await file.save(buffer, {
                            metadata: {
                                contentType: mimeType
                            }
                        });
        
                        const [url] = await file.getSignedUrl({
                            action: 'read',
                            expires: '03-01-2500'
                        });
        
                        uploadedPfp = url;
                    }
        
                    const userData = {
                        uploadedPfp,
                        username: username ?? "",
                        email: email ?? "",
                        bio: bio ?? "",
                        farcaster: farcaster ?? "",
                        address: address ?? "",
                        totalStreams: 0
                    };
        
                    await db.collection('users').add(userData);
        
                    console.log("user signed up:", userData);
        
                    return res.status(201).json({
                        status: "success",
                        message: "User signed up successfully"
                    });
        
                } catch (error) {
                    console.error('Error processing profile picture:', error);
                    return res.status(400).json({
                        status: "error",
                        message: error instanceof Error ? error.message : "Failed to process profile picture"
                    });
                }
            })();
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Failed to create user",
        });
    }
};

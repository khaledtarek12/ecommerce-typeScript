import {  Request} from "express";
import multer from "multer";
import ApiErrors from "../utils/apiErrors";


interface Fields { 
  name: string;
  maxCount: number;
}

const uploadOptions = ({ fileTypes }: { fileTypes: string[] }) : multer.Multer => {
  const multerStorage = multer.memoryStorage();
  const multerFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => { 
    const isValidType: boolean = fileTypes.some((type) => file.mimetype.startsWith(type));
    
    if (isValidType) {
      cb(null, true);
    } else {
      cb(new ApiErrors("the file type is not supported", 400));
    }

  };
  return multer({ storage: multerStorage, fileFilter: multerFilter });
}

export const uploadSingleFile = (fileTypes: string[] , fieldName: string)=> uploadOptions({ fileTypes: fileTypes }).single(fieldName);
export const uploadMultipleFiles = (fileTypes: string[], fieldName: Fields[]) => uploadOptions({ fileTypes: fileTypes }).fields(fieldName);
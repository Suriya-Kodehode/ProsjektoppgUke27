import { baseUrl as base } from "../../config.js";

const filePaths = {
    icons: "/images/icons",
}

const getFilePath = (folderKey, fileName) => {
    const folderPath = filePaths[folderKey];
    if (!folderPath) {
        console.error(`Invalid folder key: ${folderKey}`);
        return "";
    }
    // Use encodeURIComponent but then decode back the characters we want to allow
    const encodedFileName = encodeURIComponent(fileName)
        .replace(/%3D/g, '=')
        .replace(/%2C/g, ',')
    return `${base}${folderPath}/${encodedFileName}`;
};

const path = (folderKey, fileNames) => {
    // Handle single file (string)
    if (typeof fileNames === 'string') {
        return getFilePath(folderKey, fileNames);
    }
    
    // Handle object for bulk import with custom keys
    if (Array.isArray(fileNames) && fileNames.length === 1 && typeof fileNames[0] === "object") {
        const fileObject = fileNames[0];
        const result = {};

        for (const [key, fileName] of Object.entries(fileObject)) {
            result[key] = getFilePath(folderKey, fileName);
        }
        return result;
    }
    
    // Handle array of files
    if (Array.isArray(fileNames)) {
        return fileNames.map(fileName => getFilePath(folderKey, fileName));
    }
    
    // Invalid input
    console.error('Invalid fileNames parameter. Expected string, array, or object.');
    return null;
};

export default path;

// Use examples:
// import path from '@/assets/FileManager.js';

// Single file
// const singleIcon = path("icons", "home.svg");

// Multiple files (array) 
// const iconArray = path("icons", ["home.svg", "user.svg", "settings.svg"]);

// Bulk import with object keys
// const iconSet = path("icons", [{ home: "home.svg", user: "user.svg" }]);

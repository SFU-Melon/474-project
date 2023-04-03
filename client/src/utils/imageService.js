import { axiosApiInstance } from '../utils/axiosConfig';

export const IMAGE_TYPE_PROFILE = "profile";
export const IMAGE_TYPE_POST = "post";

export const handleImageFileUpload = async (file, imageType) => {
    console.log("IMAGE TYPE", imageType)
    if (file) {
        try {
            const data = new FormData();
            data.append('file', file);
            const response = await axiosApiInstance.post("/image/api/upload", data, {
                headers: { 'Content-Type': 'multipart/form-data' },
                params: { imageType },
            });
            console.log(response.data.imageUrl); // The S3 object URL of the uploaded file
            return response.data.imageUrl;
        } catch (err) {
            console.log(err);
        }
    } else {
        return null;
    }
}

export const handleImageDelete = async (imageUrl) => {
    try {
        const response = await axiosApiInstance.delete("/image/api/delete", {
            data: { imageUrl },
        });
        console.log(response.data);
    } catch (err) {
        console.log(err);
    }
}

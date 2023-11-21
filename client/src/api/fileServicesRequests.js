import axios from 'axios';

export const fetchFiles = async () => {
    try {
        const response = await axios.get('http://ilove.kharkiv.ua/api/getFileList');
        if (response.data && response.data.files) {
            return response.data.files;
        }
    } catch (error) {
        console.error('Ошибка получения списка файлов:', error);
    }
};

export const uploadFile = async (selectedFile) => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
        const response = await axios.post('http://ilove.kharkiv.ua/api/uploadFile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (response.data) {
            return response.data.file;
        }
    } catch (err) {
        console.error('Ошибка при загрузке файла:', err);
    }
};

export const deleteFile = async (fileName) => {
    const part = fileName.split('/');
    const partFileName = part[5];

    try {
        const response = await axios.delete(`http://ilove.kharkiv.ua/api/delete/${partFileName}`);
        if (response.data) {
            return true;
        }
    } catch (err) {
        console.error(`Ошибка при удалении файла ${fileName}:`, err);
        return false;
    }
};


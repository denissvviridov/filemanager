import './App.css';
import {Button, Checkbox, IconButton, List, ListItem} from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DoneIcon from '@mui/icons-material/Done';
import {useEffect, useRef, useState} from "react";
import axios from 'axios'
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import Header from "./components/Header";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { fetchFiles, uploadFile, deleteFile } from './api/fileServicesRequests'; // Импорт функций из файла


function App() {
    const inputRef = useRef(null)
    const [filesList, setFilesList] = useState([])
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [deleteAlert, setDeleteAlert] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);


    useEffect(() => {
        fetchFiles().then((files) => {
            if (files) {
                setFilesList(files);
            }
        });
    }, [])


    //Логика для наведения курсором на файл
    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };
    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };
    const handleFileSelect = () => {
        inputRef.current.click();
    };

//
    //Скачивание файла на компь'ютер
    const handleDownload = (fileName) => {

        const part = fileName.split("/")
        const partFileName = part[5]

        console.log(partFileName)
        const link = document.createElement('a');
        link.href = `http://ilove.kharkiv.ua/uploads/${partFileName}`;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const handleSelect = (item) => {
        const isSelected = selectedItems.includes(item);
        if (isSelected) {
            setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    }

    //Удаление всех отмеченных файлов
    const handleDeleteSelected = async () => {
        try {
            const responses = await Promise.all(
                selectedItems.map(async (fileName) => {
                    const part = fileName.split("/");
                    const partFileName = part[5];

                    console.log(partFileName)

                    try {
                        const response = await axios.delete(`http://ilove.kharkiv.ua/api/delete/${partFileName}`);
                        if (response) {
                            window.location.reload()
                        }
                    } catch (err) {
                        // Обработка ошибок при удалении файлов
                        console.error(`Ошибка при удалении файла ${fileName}:`, err);
                        return null;
                    }
                })
            );
        } catch (err) {
            console.log(err)
        }

    }

    const handleDelete = async (fileName) => {
        const isSuccess = await deleteFile(fileName);
        if (isSuccess) {
            const updatedFilesList = filesList.filter((file) => file !== fileName);
            setFilesList(updatedFilesList);
            fetchFiles(); // или обновление списка файлов
            setDeleteAlert(true);

            setTimeout(() => {
                setDeleteAlert(false);
            }, 5000);
        }
    };
    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        const uploadedFile = await uploadFile(selectedFile);
        if (uploadedFile) {
            setFilesList((prev) => [...prev, uploadedFile]);
            fetchFiles(); // или обновление списка файлов
            console.log(uploadedFile);
            window.location.reload();
        }
    };

    return (
        <div className="App">
            {
                deleteAlert ? <div className='deleteAlert'>Файл удален!</div> : null
            }

            <div className="container">
                <input
                    ref={inputRef}
                    type="file"
                    name="file"
                    style={{display: 'none'}}
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                />
                <Header handleDeleteSelected={handleDeleteSelected} selectedItems={selectedItems.length}
                        handleFileSelect={handleFileSelect}/>
                <List className='list'>
                    {filesList.map((file, index) => (

                            <ListItem
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                                className='listItem'
                                key={index} sx={{width: '280px'}}
                            >
                                <div className="setting_wrap">
                                    {hoveredIndex === index && (
                                        <>
                                            <IconButton sx={{color: 'red'}} variant="contained"
                                                        onClick={() => handleDelete(file)}>
                                                <DeleteForeverIcon sx={{fontSize: '40px'}}/>
                                            </IconButton>
                                            <IconButton sx={{color: 'green'}} variant="contained"
                                                        onClick={() => handleSelect(file)}>
                                                {
                                                    selectedItems.includes(file) ? <HighlightOffIcon/> :
                                                        <DoneIcon sx={{fontSize: '40px'}}/>
                                                }

                                            </IconButton>
                                        </>
                                    )}
                                </div>

                                <div className="iconWrap">
                                    <AssignmentIcon/>
                                </div>

                                <p>
                                    <strong> Name of document:</strong> {index}
                                </p>

                                {hoveredIndex === index && (
                                    <Button variant="contained" onClick={() => handleDownload(file)}>
                                        <SystemUpdateAltIcon/>
                                    </Button>
                                )}
                            </ListItem>
                        )
                    )
                    }
                </List>
            </div>
        </div>
    );
}

export default App;

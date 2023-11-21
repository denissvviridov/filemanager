import React from 'react';
import {Checkbox, IconButton} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const Header = ({handleFileSelect, selectedItems, handleDeleteSelected}) => {

    return (
        <div className='header'>
            <div className="header_wrapper">
                <Checkbox/>
                <div className="group">

                    <IconButton onClick={handleFileSelect}>
                        <FileDownloadIcon/>
                    </IconButton>
                    <IconButton onClick={handleDeleteSelected}>
                        <DeleteForeverIcon />
                    </IconButton>

                    <IconButton>
                        <FileUploadIcon/>
                    </IconButton>

                </div>
                <IconButton>
                    <HighlightOffIcon/>
                </IconButton>
            </div>
            <span>Выбранно файлов: {selectedItems}</span>
        </div>
    );
};

export default Header;
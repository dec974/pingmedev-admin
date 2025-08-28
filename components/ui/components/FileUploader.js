import { useState, useRef } from "react";
import styles from "../../../styles/ui/components/FileUploader.module.css";

function FileUploader({ onFilesChange, multiple = true, accept }) {
    const [files, setFiles] = useState([]);
    const [dragOver, setDragOver] = useState(false);
    const inputRef = useRef();

    const preventDefaults = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        preventDefaults(e);
        setDragOver(false);
        const droppedFiles = e.dataTransfer.files;
        addFiles(droppedFiles);
    };

    const addFiles = (fileList) => {
        const newFiles = Array.from(fileList);
        setFiles((prevFiles) => {
        const combined = multiple ? [...prevFiles, ...newFiles] : newFiles;
        onFilesChange && onFilesChange(combined);
        return combined;
        });
    };

    const handleChange = (e) => {
        addFiles(e.target.files);
    };

    const removeFile = (index) => {
        setFiles((prevFiles) => {
        const newFiles = [...prevFiles];
        newFiles.splice(index, 1);
        onFilesChange && onFilesChange(newFiles);
        return newFiles;
        });
    };

    return (
        <div
        className={`${styles.uploader} ${dragOver ? styles.dragOver : ''}`}
        onDragEnter={(e) => {
            preventDefaults(e);
            setDragOver(true);
        }}
        onDragLeave={(e) => {
            preventDefaults(e);
            setDragOver(false);
        }}
        onDragOver={preventDefaults}
        onDrop={handleDrop}
        onClick={() => inputRef.current && inputRef.current.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
            inputRef.current && inputRef.current.click();
            }
        }}
        aria-label="Zone de dépôt de fichiers, cliquez ou glissez-déposez vos fichiers ici"
        >
        Cliquez ou glissez-déposez vos fichiers ici
        <input
            type="file"
            multiple={multiple}
            accept={accept}
            onChange={handleChange}
            className={styles.fileInput}
            ref={inputRef}
        />
        {files.length > 0 && (
            <div className={styles.fileList} aria-live="polite">
            {files.map((file, index) => (
                <div key={index} className={styles.fileItem}>
                <span>{file.name}</span>
                <button
                    onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                    }}
                    aria-label={`Supprimer le fichier ${file.name}`}
                    className={styles.removeBtn}
                >
                    &times;
                </button>
                </div>
            ))}
            </div>
        )}
        </div>
    );
}

export default FileUploader;
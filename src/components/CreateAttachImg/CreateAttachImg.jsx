import React, { useState, useRef } from 'react';
import styles from './CreateAttachImg.module.scss';
import { Plus, Check, Trash, RefreshCcw, ArrowUpFromLine, MoveRight } from "lucide-react";

export const CreateAttachImg = ({ onImageChange }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const resetImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onImageChange) {
      onImageChange(null);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.match('image.*')) {
      processImage(file);
    }
  };

  const processImage = (file) => {
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      if (onImageChange) {
        onImageChange(file);
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.match('image.*')) {
      processImage(file);
    }
  };

  return (
    <div 
      className={`${styles.popup_image_block} ${isDragging ? styles.dragging : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleImageUpload}
      />
      
      {imagePreview ? (
        <div className={styles.image_preview_container}>
          <img
            src={imagePreview}
            alt="Preview"
            className={styles.image_preview}
          />
          <div className={styles.popup_image_btn}>
            <button 
              onClick={triggerFileInput}
              title="Заменить изображение"
            >
              <RefreshCcw size={20} color="rgb(224, 222, 222)" strokeWidth={1.5} />
            </button>
            <button 
              onClick={resetImage}
              title="Удалить изображение"
            >
              <Trash size={20} color="rgb(224, 222, 222)" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.upload_area}>
          <button
            className={styles.popup_upload_btn}
            onClick={triggerFileInput}
          >
            <ArrowUpFromLine size={28} color="rgb(224, 222, 222)" strokeWidth={1.5} />
            <span>Прикрепить</span>
          </button>
        </div>
      )}
    </div>
  );
};
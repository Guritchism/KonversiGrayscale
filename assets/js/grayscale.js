/**
 * Grayscale Image Converter
 * Aplikasi untuk mengkonversi gambar berwarna menjadi grayscale
 * menggunakan HTML5 Canvas dan operasi matriks
 * 
 * Menggunakan standar ITU-R BT.601 untuk konversi RGB ke grayscale:
 * Grayscale = (0.299 × Red) + (0.587 × Green) + (0.114 × Blue)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inisialisasi elemen-elemen DOM yang diperlukan
  const dragArea = document.querySelector(".drag-area");
  const dragText = dragArea.querySelector("header");
  const button = document.getElementById("btn");
  const input = document.getElementById("finput");
  const originalCanvas = document.getElementById("original-canvas");
  const grayscaleCanvas = document.getElementById("grayscale-canvas");
  const grayscaleBtn = document.getElementById("gs-btn");
  const downloadBtn = document.getElementById("download-btn");
  const backBtn = document.getElementById("back-btn");
  
  // Konstanta untuk validasi file
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB dalam bytes
  
  // Variabel untuk menyimpan informasi gambar
  let file = null;
  let fileName = '';
  let originalImage = null;

  // Fungsi utilitas untuk memformat ukuran file
  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Fungsi untuk menampilkan pesan error
  function showError(message) {
    alert(message);
  }

  // Fungsi untuk validasi file yang diunggah
  function validateFile(file) {
    // Periksa keberadaan file
    if (!file) {
      showError("Tidak ada file yang dipilih");
      return false;
    }

    // Periksa tipe file
    if (!file.type.match(/image.*/)) {
      showError("File yang Anda pilih bukan gambar");
      return false;
    }

    // Periksa ukuran file
    if (file.size > MAX_FILE_SIZE) {
      const maxSize = formatFileSize(MAX_FILE_SIZE);
      const actualSize = formatFileSize(file.size);
      showError(`Ukuran file terlalu besar (${actualSize}). Maksimum ukuran file adalah ${maxSize}`);
      return false;
    }

    return true;
  }

  // Koefisien matriks untuk konversi grayscale (standar ITU-R BT.601)
  const GRAYSCALE_MATRIX = {
    red: 0.299,    // Koefisien untuk warna merah
    green: 0.587,  // Koefisien untuk warna hijau
    blue: 0.114    // Koefisien untuk warna biru
  };

  // Fungsi untuk mengkonversi gambar menjadi grayscale
  function convertToGrayscale(sourceCanvas, targetCanvas, useOriginalSize = false) {
    const ctx = sourceCanvas.getContext('2d');
    const targetCtx = targetCanvas.getContext('2d');
    
    // Ambil data piksel gambar
    const imageData = ctx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
    const data = imageData.data;
    
    // Proses data gambar menggunakan operasi matriks
    for (let i = 0; i < data.length; i += 4) {
      // Terapkan transformasi matriks
      const grayValue = Math.round(
        data[i] * GRAYSCALE_MATRIX.red +      // Kanal merah
        data[i + 1] * GRAYSCALE_MATRIX.green + // Kanal hijau
        data[i + 2] * GRAYSCALE_MATRIX.blue    // Kanal biru
      );
      
      // Set nilai RGB ke nilai grayscale yang sama
      data[i] = grayValue;     // Merah
      data[i + 1] = grayValue; // Hijau
      data[i + 2] = grayValue; // Biru
      // Kanal alpha (data[i + 3]) tidak diubah
    }
    
    // Jika menggunakan ukuran asli, set dimensi canvas sesuai gambar asli
    if (useOriginalSize) {
      targetCanvas.width = originalImage.width;
      targetCanvas.height = originalImage.height;
      targetCtx.putImageData(imageData, 0, 0);
    } else {
      // Untuk preview, gunakan ukuran yang sudah diskala
      targetCtx.putImageData(imageData, 0, 0);
    }
    
    return targetCanvas;
  }

  // Event handler untuk tombol-tombol
  button.addEventListener("click", () => {
    input.click();
  });

  grayscaleBtn.addEventListener("click", () => {
    if (!file) {
      showError("Silakan unggah gambar terlebih dahulu");
      return;
    }
    convertToGrayscale(originalCanvas, grayscaleCanvas);
    downloadBtn.style.display = 'block';
  });

  backBtn.addEventListener("click", () => {
    // Reset state aplikasi
    file = null;
    fileName = '';
    originalImage = null;
    
    // Bersihkan canvas
    const originalCtx = originalCanvas.getContext('2d');
    const grayscaleCtx = grayscaleCanvas.getContext('2d');
    originalCtx.clearRect(0, 0, originalCanvas.width, originalCanvas.height);
    grayscaleCtx.clearRect(0, 0, grayscaleCanvas.width, grayscaleCanvas.height);
    
    // Reset tampilan UI
    downloadBtn.style.display = 'none';
    document.querySelector(".canvas-container").style.display = "none";
    document.querySelector(".input-container").style.display = "flex";
    dragText.textContent = "Seret & Lepas untuk Mengunggah File";
    
    // Bersihkan input file
    input.value = '';
  });

  downloadBtn.addEventListener("click", () => {
    // Buat canvas sementara untuk konversi ukuran penuh
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = originalImage.width;
    tempCanvas.height = originalImage.height;
    
    // Gambar gambar asli dengan ukuran penuh
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(originalImage, 0, 0);
    
    // Konversi ke grayscale dengan ukuran penuh
    convertToGrayscale(tempCanvas, tempCanvas, true);

    // Buat link unduhan dengan gambar ukuran penuh
    const link = document.createElement('a');
    const baseName = fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
    link.download = `${baseName}-grayscale.png`;
    link.href = tempCanvas.toDataURL('image/png');
    link.click();
  });

  // Handler untuk drag and drop
  dragArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dragArea.classList.add("active");
    dragText.textContent = "Lepaskan untuk Mengunggah";
  });

  dragArea.addEventListener("dragleave", () => {
    dragArea.classList.remove("active");
    dragText.textContent = "Seret & Lepas untuk Mengunggah File";
  });

  dragArea.addEventListener("drop", (event) => {
    event.preventDefault();
    dragArea.classList.remove("active");
    dragText.textContent = "Seret & Lepas untuk Mengunggah File";
    
    const droppedFile = event.dataTransfer.files[0];
    handleFile(droppedFile);
  });

  // Handler untuk input file
  input.addEventListener("change", (event) => {
    const selectedFile = event.target.files[0];
    handleFile(selectedFile);
  });

  // Fungsi untuk menangani file yang diunggah
  function handleFile(uploadedFile) {
    if (!validateFile(uploadedFile)) {
      return;
    }

    file = uploadedFile;
    fileName = file.name;
    
    const reader = new FileReader();
    
    reader.onload = function(event) {
      originalImage = new Image();
      originalImage.onload = function() {
        // Hitung dimensi yang diskala untuk preview
        const maxPreviewWidth = 500;
        const maxPreviewHeight = 400;
        const scale = Math.min(
          maxPreviewWidth / originalImage.width,
          maxPreviewHeight / originalImage.height,
          1
        );
        const previewWidth = Math.floor(originalImage.width * scale);
        const previewHeight = Math.floor(originalImage.height * scale);

        // Atur ukuran canvas preview
        originalCanvas.width = previewWidth;
        originalCanvas.height = previewHeight;
        grayscaleCanvas.width = previewWidth;
        grayscaleCanvas.height = previewHeight;

        // Gambar preview yang telah diskala
        const originalCtx = originalCanvas.getContext('2d');
        const grayscaleCtx = grayscaleCanvas.getContext('2d');
        
        // Gunakan imageSmoothingQuality untuk hasil yang lebih baik
        originalCtx.imageSmoothingEnabled = true;
        originalCtx.imageSmoothingQuality = 'high';
        grayscaleCtx.imageSmoothingEnabled = true;
        grayscaleCtx.imageSmoothingQuality = 'high';
        
        originalCtx.drawImage(originalImage, 0, 0, previewWidth, previewHeight);
        grayscaleCtx.drawImage(originalImage, 0, 0, previewWidth, previewHeight);

        // Perbarui teks area drag dengan informasi file
        const fileSize = formatFileSize(file.size);
        dragText.textContent = `File: ${fileName} (${fileSize})`;
        
        // Tampilkan container preview
        document.querySelector(".canvas-container").style.display = "flex";
        document.querySelector(".input-container").style.display = "none";
      };
      originalImage.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

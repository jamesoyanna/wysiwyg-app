// export const handleImageUpload = async (file) => {
//     try {
//       // Create a new FormData object
//       const formData = new FormData();
//       formData.append('file', file); // Append the selected file to the FormData
  
//       // Add your Cloudinary upload preset name
//       const uploadPreset = 'YOUR_CLOUDINARY_UPLOAD_PRESET';
      
//       // Add your Cloudinary cloud name
//       const cloudName = 'YOUR_CLOUDINARY_CLOUD_NAME';
  
//       // Make a POST request to the Cloudinary upload API
//       const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'X-Requested-With': 'XMLHttpRequest',
//         },
//       });
  
//       if (response.ok) {
//         const data = await response.json();
//         const imageUrl = data.secure_url; // Get the secure URL of the uploaded image
  
//         // Set the selected image with the Cloudinary URL
//             (imageUrl);
//       } else {
//         console.error('Image upload failed');
//       }
//     } catch (error) {
//       console.error('Image upload error:', error);
//     }
//   };
  
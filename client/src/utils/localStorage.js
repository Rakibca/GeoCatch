// export const getSavedImageIds = () => {
//   const savedImageIds = localStorage.getItem('saved_images')
//     ? JSON.parse(localStorage.getItem('saved_images'))
//     : [];

//   return savedImageIds;
// };

// export const saveImagesIds = (imageIdArr) => {
//   if (imageIdArr.length) {
//     localStorage.setItem('saved_images', JSON.stringify(bookIdArr));
//   } else {
//     localStorage.removeItem('saved_images');
//   }
// };

// export const removeImageId = (bookId) => {
//   const savedImageIds = localStorage.getItem('saved_images')
//     ? JSON.parse(localStorage.getItem('saved_images'))
//     : null;

//   if (!savedImageIds) {
//     return false;
//   }

//   const updatedSavedImageIds = savedImageIds?.filter((savedImageId) => savedImageId !== ImageId);
//   localStorage.setItem('saved_images', JSON.stringify(updatedSavedImageIds));

//   return true;
// };
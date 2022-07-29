// Email validation
export function validateEmail(email) {
    var match = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return match.test(String(email).toLowerCase());
}
export function pluralize(name, count) {
  if (count === 1) {
    return name;
  }
  return name + 's';
}

export function getExif() {
    var img1 = document.getElementById("img1");
    //update image1 reference to cover the uploaded image
    EXIF.getData(img1, function() {
      let allData = EXIF.getAllTags(this);

      let latdegrees = (allData.GPSLatitude[0].numerator)/(allData.GPSLatitude[0].denominator);
      let latminutes = (allData.GPSLatitude[1].numerator)/(allData.GPSLatitude[1].denominator);
      let latseconds = (allData.GPSLatitude[2].numerator)/(allData.GPSLatitude[2].denominator);

      let latitude = latdegrees + (latminutes/60) + (latseconds/3600);

      if (EXIF.getTag(this, "GPSLatitudeRef") === "S") {
        latitude = -latitude
      }

      let longdegrees = (allData.GPSLongitude[0].numerator)/(allData.GPSLongitude[0].denominator);
      let longminutes = (allData.GPSLongitude[1].numerator)/(allData.GPSLongitude[1].denominator);
      let longseconds = (allData.GPSLongitude[2].numerator)/(allData.GPSLongitude[2].denominator);

      let longitude = longdegrees + (longminutes/60) + (longseconds/3600);

      if (EXIF.getTag(this, "GPSLongitudeRef") === "W") {
        longitude = -longitude
      }
      console.log(latitude + ", " + longitude)

      return [latitude, longitude];
 
})}

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('shop-shop', 1);
    let db, tx, store;
    request.onupgradeneeded = function(e) {
      const db = request.result;
      db.createObjectStore('products', { keyPath: '_id' });
      db.createObjectStore('categories', { keyPath: '_id' });
      db.createObjectStore('cart', { keyPath: '_id' });
    };

    request.onerror = function(e) {
      console.log('There was an error');
    };

    request.onsuccess = function(e) {
      db = request.result;
      tx = db.transaction(storeName, 'readwrite');
      store = tx.objectStore(storeName);

      db.onerror = function(e) {
        console.log('error', e);
      };

      switch (method) {
        case 'put':
          store.put(object);
          resolve(object);
          break;
        case 'get':
          const all = store.getAll();
          all.onsuccess = function() {
            resolve(all.result);
          };
          break;
        case 'delete':
          store.delete(object._id);
          break;
        default:
          console.log('No valid method');
          break;
      }

      tx.oncomplete = function() {
        db.close();
      };
    };
  });
}

function deepClone(obj) {
  
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

 
  if (Array.isArray(obj)) {
    const copy = [];
    for (let i = 0; i < obj.length; i++) {
      copy[i] = deepClone(obj[i]); 
    }
    return copy;
  }

  
  const copy = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepClone(obj[key]); 
    }
  }
  return copy;
}

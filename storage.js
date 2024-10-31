export function saveToLocalStorage(data) {
    try {
      localStorage.setItem('chemicalData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }
  
  export function loadFromLocalStorage() {
    try {
      const data = localStorage.getItem('chemicalData');
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return null;
    }
  }
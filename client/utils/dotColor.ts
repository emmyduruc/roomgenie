export const getDotColor = (
    price: number | null,
    priceInPMS: number | null,
    hasError: boolean | undefined
  ): 'red' | 'green' | 'yellow' | null => {
    if (hasError) {
      return 'red'; 
    } else if (price !== null && priceInPMS !== null && priceInPMS !== 0) {
      const priceDifferencePercent = ((price - priceInPMS) / priceInPMS) * 100;
  
      if (price === priceInPMS) {
        return 'green'; 
      } else if (priceDifferencePercent >= 4) {
        return 'red'; 
      } else if (priceDifferencePercent <= -4) {
        return 'yellow'; 
      } else {
        return null; 
      }
    } else {
      return null; 
    }
  };
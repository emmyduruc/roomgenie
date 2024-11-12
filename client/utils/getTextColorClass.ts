export const getTextColorClass = (
    dotColor: 'red' | 'green' | 'yellow' | null
  ): string => {
    if (dotColor === 'red') {
      return 'text-red-500';
    } else if (dotColor === 'green') {
      return 'text-white';
    } else if (dotColor === 'yellow') {
      return 'text-white';
    } else {
      return 'text-black';
    }
  };

  export const getBgColorClass = ( dotColor: 'red' | 'green' | 'yellow' | null) => {
    if (dotColor === 'red') {
      return 'bg-red-100';
    } else if (dotColor === 'green') {
      return 'bg-rpg-blue';
    } else if (dotColor === 'yellow') {
      return 'bg-rpg-blue';
    } else {
      return 'bg-white';
    }
  }
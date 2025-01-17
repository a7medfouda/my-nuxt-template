export const calculateDuration = (index: number) => {
  const baseDuration = 500;
  const increment = 200;
  return baseDuration + index * increment;
};

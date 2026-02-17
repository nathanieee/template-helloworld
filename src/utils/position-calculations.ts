export const calculateCirclePosition = (
  index: number,
  total: number,
  radius: number,
  centerX: number,
  centerY: number
) => {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle),
  };
};

export const calculateGridPosition = (
  index: number,
  columns: number,
  spacingX: number,
  spacingY: number,
  startX: number,
  startY: number
) => {
  const col = index % columns;
  const row = Math.floor(index / columns);
  return {
    x: startX + col * spacingX,
    y: startY + row * spacingY,
  };
};

export const getCenterOfCanvas = (width: number, height: number) => {
  return {
    x: width / 2,
    y: height / 2,
  };
};

export const lerp = (start: number, end: number, progress: number) => {
  return start + (end - start) * progress;
};

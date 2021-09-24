export const generateLinearGradient = (args: {
  angle: number;
  colors: { color: string; stop: number }[];
}) => {
  return `linear-gradient(${args.angle}deg ,${[...args.colors]
    .sort((a, b) => a.stop - b.stop)
    .map((color) => `${color.color} ${color.stop}%`)
    .join(",")})`;
};

export const generateRadialGradient = (args: {
  type: string;
  at: string;
  colors: { color: string; stop: number }[];
}) =>
  `radial-gradient(${args.type} at ${args.at}, ${[...args.colors]
    .sort((a, b) => a.stop - b.stop)
    .map((color) => `${color.color} ${color.stop}%`)
    .join(",")})`;

export function addAlpha(hex: string, alpha: number) {
  return `${hex}${Math.floor(alpha * 255)
    .toString(16)
    .padStart(2, "0")}`;
}

export function getImageUrl(imagePath: string, callerUrl: string) {
  return new URL(`${imagePath}`, callerUrl).href;
}

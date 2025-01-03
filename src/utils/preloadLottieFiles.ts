const lottieFiles = import.meta.glob(
  "/src/assets/anxy/customizing/**/**/*.json",
  {
    eager: true,
  }
);

export function preloadLottieFiles() {
  const files = Object.entries(lottieFiles).map(([filePath, content]) => ({
    name: filePath,
    content,
  }));

  return files;
}

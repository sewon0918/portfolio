// const lottieFiles = import.meta.glob(
//   "/src/assets/anxy/customizing/**/**/*.json",
//   {
//     eager: true,
//   }
// );

// export function preloadLottieFiles() {
//   const files = Object.entries(lottieFiles).map(([filePath, content]) => ({
//     name: filePath,
//     content,
//   }));

//   return files;
// }

async function preloadLottieFile(url: string) {
  const response = await fetch(`${url}`, { cache: "force-cache" }); // 캐시를 강제적으로 사용
  if (!response.ok) {
    throw new Error(`Failed to load Lottie file: ${url}`);
  }
  return await response.json();
}

export async function preloadAllLottieFiles() {
  const lottieFiles = import.meta.glob(
    "../assets/anxy/customizing/**/**/*.json"
  );

  const fileUrls = Object.entries(lottieFiles).map(
    ([filePath, content]) => filePath
  );
  const promises = fileUrls.map((url) => preloadLottieFile(url));
  const files = await Promise.all(promises);
  return files;
}

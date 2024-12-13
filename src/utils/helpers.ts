export function addAlpha(hex: string, alpha: number) {
  return `${hex}${Math.floor(alpha * 255)
    .toString(16)
    .padStart(2, "0")}`;
}

export function getImageUrl(imagePath: string, callerUrl: string) {
  return new URL(`${imagePath}`, callerUrl).href;
}
export function getRemainigTime(dday: string) {
  const offset = new Date().getTimezoneOffset() * 60000;
  const today = new Date(Date.now() - offset).toISOString();

  const endTime = new Date(dday).getTime();
  const startTime = new Date(today).getTime();
  const diff = endTime - startTime;

  return diff;
}

export function getRemainigTimeString(diff: number) {
  const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= diffDay * (1000 * 60 * 60 * 24);
  const diffHour = Math.floor(diff / (1000 * 60 * 60));
  diff -= diffHour * (1000 * 60 * 60);
  const diffMin = Math.floor(diff / (1000 * 60));
  diff -= diffMin * (1000 * 60);
  const diffSec = Math.floor(diff / 1000);

  return `${diffDay > 0 ? `${diffDay}일 ` : ""}${
    diffHour > 0 ? `${diffHour}시간 ` : ""
  }${diffMin > 0 || diffHour > 0 ? `${diffMin}분 ` : ""}${diffSec}초`;
}

export function getDateByToday(num: number) {
  // const offset = new Date().getTimezoneOffset() * 60000;
  // const today = new Date(Date.now() - offset).toISOString();
  const today = new Date();
  const result = new Date(today.setDate(today.getDate() + num));
  return result.toISOString().substring(0, 10);
}

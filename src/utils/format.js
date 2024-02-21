/**
 * @returns 当前时间，"09:12 AM"
 */
function getCurrentTime() {
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // 将小时调整为12小时制
  hours = hours % 12;
  hours = hours ? hours : 12; // 如果小时为0，则设置为12

  // 将分钟转换为两位数
  minutes = minutes < 10 ? '0' + minutes : minutes;

  const formattedTime = `${hours}:${minutes} ${ampm}`;

  return formattedTime;
}

/**
 * @returns 当前时间，"yyyy-MM-dd HH:mm:ss"
 */
function formatDateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');

  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
}

export { getCurrentTime, formatDateTime}
// 시간 나누기 함수
export function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600); // 전체 시간(초)을 3600으로 나누어 시간을 구합니다.
  const minutes = Math.floor((seconds % 3600) / 60); // 남은 초를 60으로 나누어 분을 구합니다.
  const remainingSeconds = seconds % 60; // 남은 초를 구합니다.

  // 시간, 분, 초를 두 자리 수 형태로 만듭니다. 예: 5 -> 05
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export function caloriesPerSecond(
  weightKg: number,
  activityMETs = 3,
  seconds: number
) {
  // 활동으로 인한 시간당 칼로리 소모량 계산
  const caloriesPerHour = activityMETs * weightKg * 1;

  // 시간당 칼로리 소모량을 초당 칼로리 소모량으로 변환
  const caloriesPerSecond = caloriesPerHour / 3600;

  // 총 소모된 칼로리량 계산
  const totalCaloriesBurned = caloriesPerSecond * seconds;

  return totalCaloriesBurned.toFixed(2);
}

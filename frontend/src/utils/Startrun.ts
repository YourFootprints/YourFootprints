// 시간 나누기 함수
export function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600); // 전체 시간(초)을 3600으로 나누어 시간을 구합니다.
  const minutes = Math.floor((seconds % 3600) / 60); // 남은 초를 60으로 나누어 분을 구합니다.
  const remainingSeconds = seconds % 60; // 남은 초를 구합니다.

  // 시간, 분, 초를 두 자리 수 형태로 만듭니다. 예: 5 -> 05
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");
  const time = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  return time;
}

export function caloriesPerSecond(distanceKm: number, weightKg: number) {
  // 상수 정의
  const METs = 3.3; // 산책의 METs 값
  const speedKmH = 5; // 평균 걷는 속도 (시간당 5km)

  // 걷는 시간을 거리와 속도를 이용하여 계산 (시간 단위)
  const walkingTimeHours = distanceKm / speedKmH;

  // 걷는 시간을 분 단위로 변환
  const walkingTimeMinutes = walkingTimeHours * 60;

  // 칼로리 소모량 계산
  const caloriesBurned = 0.0175 * weightKg * METs * walkingTimeMinutes;

  return caloriesBurned;
}

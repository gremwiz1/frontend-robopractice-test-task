export function countTime(start: string, end: string) {
  const startTimeArray = start.split("-");
  const endTimeArray = end.split("-");
  const finishTime = parseInt(endTimeArray[0]) * 60 + parseInt(endTimeArray[1]);
  const startTime =
    parseInt(startTimeArray[0]) * 60 + parseInt(startTimeArray[1]);
  const deltaTime = finishTime - startTime;
  return deltaTime;
}

export function parseTime(time: number) {
  const hours = (time - (time % 60)) / 60;
  const minutes = time % 60;
  if (hours === 0 && minutes === 0) {
    return "0";
  }
  return `${hours}:${minutes}`;
}

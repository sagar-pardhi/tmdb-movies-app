export const formatRuntime = (minutes: number) => {
  if (!minutes) return "";

  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hrs === 0) return `${mins}m`;
  return `${hrs}h ${mins}m`;
};

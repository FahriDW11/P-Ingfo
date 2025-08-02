export function formatDate(dateString) {
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
  return new Date(dateString).toLocaleDateString("id-ID", options);
}

export function countdownToDate(dateString) {
  const now = new Date();
  const targetDate = new Date(dateString);
  const diffTime = targetDate - now;

  if (diffTime <= 0) return "Waktu telah habis";

  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

  if (days === 0) return `${hours} jam ${minutes} menit`;
  if (days === 0 && hours === 0) return `${minutes} menit`;

  return `${days} hari ${hours} jam ${minutes} menit`;
}

export const TEAM_PHOTOS: Record<string, string> = {
  "Rahul Jat": "/images/team-rahul-jat.jpg",
  "Diya Artani": "/images/team-diya-artani.jpg",
  "Adithya Suvarna": "/images/team-adithya-suvarna.jpg",
  "Ganesh Tiwari": "/images/team-ganesh-tiwari.jpg",
};

export function getTeamPhoto(name: string): string | undefined {
  return TEAM_PHOTOS[name]?.trim() || undefined;
}
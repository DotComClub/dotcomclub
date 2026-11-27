export const TEAM_PHOTOS: Record<string, string> = {
  "Rahul Jat": "/images/team-core/rahul-jat.jpg",
  "Diya Artani": "/images/team-core/diya-artani.jpg",
  "Adithya Suvarna": "/images/team-core/adithya-suvarna.jpg",
  "Ganesh Tiwari": "/images/team-core/ganesh-tiwari.jpg",
};

export function getTeamPhoto(name: string): string | undefined {
  return TEAM_PHOTOS[name]?.trim() || undefined;
}
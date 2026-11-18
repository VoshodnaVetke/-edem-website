import { notFound } from "next/navigation";
import photoCounts from "../../../config/game-photo-counts.json";
import { games } from "../../../config/past-games";
import { GameDetails } from "./GameDetails";

export const dynamicParams = false;

export function generateStaticParams() {
  return games.map(({ slug }) => ({ slug }));
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = games.find((entry) => entry.slug === slug);
  if (!game) notFound();
  const counts: Partial<Record<string, number>> = photoCounts;
  return <GameDetails game={game} photoCount={counts[slug] ?? 0} />;
}

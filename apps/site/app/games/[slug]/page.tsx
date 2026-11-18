import { notFound } from "next/navigation";
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
  return <GameDetails game={game} />;
}

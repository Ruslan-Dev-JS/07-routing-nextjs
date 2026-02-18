import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export const dynamic = "force-dynamic";

export default async function NotesFilterPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugs = slug ?? [];
  const tag = slugs[0];

  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["notes", 1, "", tag || ""],
      queryFn: () => fetchNotes(1, "", tag),
    });
  } catch (err) {
    console.error("Prefetch error", err);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient key={tag ?? "all"} initialTag={tag} />
    </HydrationBoundary>
  );
}


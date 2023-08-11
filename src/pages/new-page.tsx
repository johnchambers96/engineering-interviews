import { usePersistData } from "@/hook/persist-data";
import Link from "next/link";

export default function NewPage() {
  const { reposSaved } = usePersistData();

  return (
    <main>
      {reposSaved.map((repo) => (
        <h1 key={repo.id}>{repo.name}</h1>
      ))}
      <Link href="/">Home page</Link>
    </main>
  );
}

import { usePersistData } from "@/hook/persist-data";
import { getOrgRepos } from "@/service/github";
import Link from "next/link";

type HomeProps = {
  data?: GetOrgsRepo[];
  error: boolean;
};

export default function Home({ data }: HomeProps) {
  const { handleRepoSelect, handleRepoRemove, reposSaved } = usePersistData();
  return (
    <main>
      {data?.map((repo) => {
        const isSelected = !!reposSaved.find((item) => item.id === repo.id);
        return (
          <div key={repo.id}>
            <p>{repo.name}</p>
            <button
              onClick={() => {
                isSelected ? handleRepoRemove(repo.id) : handleRepoSelect(repo);
              }}
            >
              {isSelected ? "Selected" : "Select"}
            </button>
          </div>
        );
      })}
      <Link href="/new-page">New page</Link>
    </main>
  );
}

export const getServerSideProps = async () => {
  try {
    const userData = await getOrgRepos("vercel");
    return {
      props: {
        data: userData,
        error: false,
      },
    };
  } catch (error) {
    console.log("server side error:", error);
    return {
      props: {
        data: [],
        error: true,
      },
    };
  }
};

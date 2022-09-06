import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery([
    "example.hello",
    { text: "from tRPC" },
  ]);

  if (isLoading) return <h5> Loading </h5>;

  return (
    <>
      <Head>
        <title>Conduit : T3 stack</title>
      </Head>

      <div>{data ? <p>{data.greeting}</p> : <p>Loading..</p>}</div>
    </>
  );
};

export default Home;

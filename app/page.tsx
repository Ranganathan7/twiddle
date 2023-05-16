import NewTweetForm from "@/components/NewTweetForm";

const Home: React.FC = () => {
  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-white pt-2">
        <h1 className="text-lg font-bold mb-2 px-4">Home</h1>
      </header>
      <NewTweetForm />
    </>
  );
};

export default Home;

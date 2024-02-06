import Link from "next/link";
import {redirect} from "next/navigation";
import {currentUser} from "@clerk/nextjs";

const Home =  async () => {
    const user = await currentUser();

    if(user) {
        redirect("/chat");
    }
  return (
      <div className="hero min-h-screen bg-base-200 overflow-y-hidden">
          <div className="hero-content flex-col lg:flex-row-reverse">
              <p>IMAGE</p>
              <div>
                  <h1 className="text-6xl font-bold">MasterChefGPT</h1>
                  <p className="py-6 max-w-2xl leading-loose">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                  <Link href="/sign-in" className="btn btn-accent">Get Started</Link>
              </div>
          </div>
      </div>
  );
}

export default Home;

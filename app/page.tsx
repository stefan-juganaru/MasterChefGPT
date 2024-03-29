import Link from "next/link";
import {redirect} from "next/navigation";
import {currentUser} from "@clerk/nextjs";
import chef from "@/assets/chef.svg"
import Image from "next/image"

const Home =  async () => {
    const user = await currentUser();

    if(user) {
        redirect("/chat");
    }
  return (
      <div className="hero min-h-screen bg-base-200 overflow-y-hidden">
          <div className="hero-content grid-cols-[1fr,auto]">
              <div>
                  <h1 className="text-4xl font-bold lg:text-6xl">MasterChefGPT</h1>
                  <p className="py-6 max-w-xl leading-loose">Discover the joy of cooking with our AI Chef, your personal culinary assistant. Tailored to your preferences and skill level,
                      it offers guided recipes and meal suggestions based on ingredients you already have.</p>
                  <Link href="/sign-in" className="btn btn-accent">Get Started</Link>
              </div>
              <Image src={chef} width={525} height={525} alt="landing chef" className="hidden lg:block"/>
          </div>
      </div>
  );
}

export default Home;

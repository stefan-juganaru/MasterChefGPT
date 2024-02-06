import {auth, UserProfile} from "@clerk/nextjs"
import {fetchUserTokensById} from "@/utils/actions";

const Page = async () => {
    const {userId} = auth();
    const currentTokens = await fetchUserTokensById(userId!);
    return (
        <div className="pt-4">
            <h2 className="mb-8 ml-8 text-xl font-extrabold">Token Amount : {currentTokens}</h2>
            <UserProfile/>
        </div>
    )
}
export default Page

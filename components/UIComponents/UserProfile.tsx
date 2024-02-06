import {UserButton, currentUser, auth} from "@clerk/nextjs"
import {checkTokenTimer, fetchOrGenerateTokens} from "@/utils/actions";

const UserProfile = async () => {
    const user = await currentUser();
    const {userId} = auth();

    await fetchOrGenerateTokens(userId!);
    await checkTokenTimer(userId!);
    return (
        <div className="flex place-items-center gap-4">
            <p>{user?.emailAddresses[0].emailAddress}</p>
            <UserButton afterSignOutUrl="/"/>
        </div>
    )
}
export default UserProfile

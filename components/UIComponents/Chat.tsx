"use client"
import {useState, useEffect, useRef} from "react";
import {useMutation} from "@tanstack/react-query";
import {fetchUserTokensById, generateChatMessages, subtractTokens} from "@/utils/actions";
import toast from "react-hot-toast";
import OpenAI from "openai";
import ChatCompletionMessage = OpenAI.ChatCompletionMessage;
import {useAuth} from "@clerk/nextjs";
import {useChat, useCompletion} from "ai/react";

type UserMessage = {
    role: string;
    content: string
}

type ChatMessage = UserMessage | ChatCompletionMessage

const Chat = () => {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
    const {userId} = useAuth();
    const [text, setText] = useState("");
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]); // [ "hello", "hi"
    // const {mutate: createMessage, isPending} = useMutation({
    //     mutationFn: async (query: ChatMessage) => {
    //         const currentTokens = await fetchUserTokensById(userId!);
    //         if(currentTokens! < 100) {
    //             toast.error("You don't have enough tokens to generate a response");
    //             return ;
    //         }
    //
    //         const response = await generateChatMessages([...messages, query]);
    //         if(!response) {
    //             toast.error("Something went wrong...");
    //             return ;
    //         }
    //         setMessages((prev)=> [...prev, response.message]);
    //         const newTokens = await subtractTokens(userId!, response.tokens!);
    //         toast.success(`${newTokens} tokens remaining...`);
    //     }
    // });

    // const handleSubmit = (e: { preventDefault: () => void; } ) => {
    //     e.preventDefault();
    //     const query = {role: "user", content: text};
    //     createMessage(query);
    //     setMessages((prev)=> [...prev, query]);
    //     document.getElementById("chat-input")?.focus();
    //     setText("");
    // }

    const handleSubmitExtra = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const currentTokens = await fetchUserTokensById(userId!);
        if(currentTokens! < 100) {
            toast.error("You don't have enough tokens to generate a response");
            return ;
        }
        const newTokens = await subtractTokens(userId!, 150); //VERCEL AI SDK DOES NOT HAVE USAGE METRICS ( WE HARDCODE FOR NOW)
        toast.success(`${newTokens} tokens remaining...`);

        handleSubmit(e);
    }

    return (
        <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]" >
            <div className="">
                {
                    messages.map(({role, content}, index) => {
                        const avatar = role == 'user' ? '👤' : '🤖';
                        const bcg = role === 'user' ? 'bg-base-200' : 'bg-base-100';

                        return <div key={index} className={`${bcg} flex py-6 -mx-8 text-md md:text-xl  leading-loose border-b border-base-300`}>
                            <span className="mx-4">{avatar}</span>
                            <p className="max-w-3xl">{content}</p>
                        </div>
                    })
                }
            </div>
            <form className="max-w-3xl pt:12" onSubmit={handleSubmitExtra}>
                <div className="join w-full">
                    <input type="text" placeholder="text here" className="input input-bordered join-item w-full" value={input} onChange={handleInputChange} required/>
                    <button className="join-item btn btn-outline" type="submit" disabled={isLoading}>Send</button>
                </div>
            </form>

        </div>
    )
}
export default Chat

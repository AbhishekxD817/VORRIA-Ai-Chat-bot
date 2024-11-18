import * as React from "react"
import { Ghost, Menu, Send } from "lucide-react"
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../../components/ui/avatar"
import { Button } from "../../components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { useSidebar } from "../../components/ui/sidebar"
import { useForm } from 'react-hook-form'
import api, { wrapAsync } from "../../api/config/api"
import { toast } from "react-toastify"
import { DNA } from "react-loader-spinner"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export function SideBarButton() {
    const { toggleSidebar } = useSidebar()

    return <Button onClick={toggleSidebar} variant="outline">
        <Menu />
    </Button>
}

export default function ChatSection({ messages, setMessages }) {

    const { handleSubmit, reset, register } = useForm();


    // response coming from ai
    const [responding, setResponding] = React.useState(false);

    const handlePromptSubmit = async (data) => {
        reset();

        setMessages((prevMessages) => [
            ...prevMessages,
            {
                sender: "user",
                content: data.prompt,
            },
        ]);

        try {
            setResponding(true);
            const response = await api.post(`/chat`, data);
            setResponding(false);


            if (response && response.status == 200) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        sender: "ai",
                        content: response.data.response,
                    },
                ]);

                toast.success(response.data.message);
                return;
            }
            else {
                toast.info(response.data.message);
                return;
            }
        } catch (error) {
            setResponding(false);
            const { message = "Something went wrong" } = error;
            toast.error(message);
            return;
        }
    }


    // scroll to bottom
    const chatEndRef = React.useRef(null);
    // Function to scroll to the bottom
    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <>
            {
                responding &&
                <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full">
                    <DNA
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                    />
                </div>
            }


            <Card className="min-h-screen flex w-full flex-col">
                <CardHeader className="sticky top-0 bg-white border-b flex flex-row items-center gap-4">
                    <SideBarButton />
                    <div className="flex items-center space-x-4">
                        <Avatar>
                            <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStBt2buxeKQcxYN3KznlTj8E80I-9x3WqnkA&s" alt="Image" />
                            <AvatarFallback>V</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium leading-none">Vorria</p>
                            <p className="text-sm text-muted-foreground">~ Ai chatbot</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto overflow-x-hidden pt-4">
                    <div className="space-y-4">
                        {messages.map((message, index) => (
                            <ReactMarkdown
                                key={index}
                                className={cn(
                                    "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm break-words prose",
                                    message.sender === "user"
                                        ? "ml-auto bg-primary text-primary-foreground"
                                        : "bg-muted"
                                )}
                            >
                                {message.content}
                            </ReactMarkdown>
                        ))}
                    </div>
                </CardContent>
                <div ref={chatEndRef}></div>
                <CardFooter className="sticky bottom-0 w-full border-t bg-white pt-1 rounded-t-md">
                    <form
                        onSubmit={handleSubmit(handlePromptSubmit)}
                        className="flex w-full items-center space-x-2"
                    >
                        <Input
                            id="prompt"
                            {...register("prompt")}
                            name="prompt"
                            placeholder="Type your message..."
                            className="flex-1"
                            autoComplete="off"
                        />
                        <Button type="submit" size="icon" disabled={responding}>
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Send</span>
                        </Button>
                    </form>
                </CardFooter>
            </Card>


        </>
    )
}
import React, { useEffect, useRef, useState } from 'react'
import SideBar from '../../myComponents/SideBar/SideBar'
import ChatSection from '../../myComponents/ChatSection/ChatSection'
import { SidebarProvider } from '../../components/ui/sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Hourglass } from 'react-loader-spinner'
import { Progress } from "../../components/ui/progress"
import { toast } from 'react-toastify'
import api, { wrapAsync } from '../../api/config/api'

export function ProgressBar() {
    const [progress, setProgress] = React.useState(13)

    React.useEffect(() => {
        if (progress < 90) {
            const timer = setTimeout(() => setProgress((state) => {
                return state + 5
            }), 500)
            return () => clearTimeout(timer)
        }
    }, [progress])

    return <Progress value={progress} className="w-[60%]" />
}

const Chat = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((store) => store.auth);
    const [chatsLoading, setChatsLoading] = useState(false);

    // title change
    useEffect(() => {
        document.title = "Chat | Vorria Ai"
    }, [])

    // auth
    useEffect(() => {
        if (!auth.user || auth.user == null) {
            return navigate('/auth');
        }
    }, [auth.user])












    // fetch chat messages
    const [messages, setMessages] = React.useState([])

    React.useEffect(() => {
        (async function () {
            await fetchChatMessages();
        })()
    }, [])

    const fetchChatMessages = async () => {
        try {
            setChatsLoading(true);
            let response = await wrapAsync(() => api.get('/chat'));
            setChatsLoading(false);
            if (response) {
                setMessages(response.chat);
                toast.success("Chat successfully recovered")
                return;
            }
            return;
        } catch (error) {
            setChatsLoading(false);
            const { message = "Something went wrong while fetching messages" } = error;
            toast.error(message);
            return;
        }
    }






    return (
        <>
            {
                (auth.loading) &&
                <div className='min-h-screen w-full h-screen flex justify-center items-center'>
                    <Hourglass
                        visible={true}
                        height="50"
                        width="50"
                        ariaLabel="hourglass-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        colors={['#306cce', '#72a1ed']}
                    />
                </div>
            }

            {/* show only if user is logged in */}
            {
                chatsLoading &&
                <div className='w-64 min-h-screen flex-col gap-2 flex justify-center items-center mx-auto'>
                    <span className='animate-pulse text-gray-500 text-sm'>Please wait, chats loading...</span>
                    <ProgressBar />
                </div>
            }
            {
                (auth.user && !chatsLoading) &&
                < div >
                    <SidebarProvider>
                        <SideBar />
                        <main className='w-full h-full'>
                            <ChatSection messages={messages} setMessages={setMessages} />
                        </main>
                    </SidebarProvider>
                </div >
            }
        </>
    )
}

export default Chat
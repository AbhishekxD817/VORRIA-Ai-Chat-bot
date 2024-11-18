import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../../components/ui/sidebar"
import {toast} from 'react-toastify'
import { AlignVerticalJustifyCenterIcon, Calendar, ChevronDown, Computer, Home, Inbox, Laptop, Link, Link2, Link2Off, LinkIcon, LucideForkKnife, LucideKeyRound, LucideLink, LucideMessageSquareText, MailOpen, MessageCircle, MessageSquare, Plus, Search, Settings, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu'
import { useDispatch, useSelector } from "react-redux"
import { Button } from "../../components/ui/button";
import { reset } from "../../store/slices/authSlice";
import { useEffect } from "react";
import { logoutUser } from "../../store/actions/authActions";

export default function SideBar() {
    const auth = useSelector((store) => store.auth);

    const handleLogoutBtn = () => {
        try {
            dispatch(logoutUser());
            dispatch(reset());
            toast.info('Logout Successful');

        } catch (error) {
            const { message = "Error occured while logging out" } = error;
            toast.error(message);
        }
        return;
    }

    const dispatch = useDispatch();

    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="underline underline-offset-2 text-md flex gap-2 mb-4"><User />{auth.user.name}</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {/* account */}
                            <SidebarMenuItem >
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuButton variant="outline">
                                            Account
                                            <ChevronDown className="ml-auto" />
                                        </SidebarMenuButton>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                                        <DropdownMenuItem>
                                            <Button variant={'destructive'} className="w-full" onClick={(e) => { handleLogoutBtn() }}>Logout</Button>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton variant={'outline'} className="bg-emerald-100">

                                    <a target="_blank" href="https://www.linkedin.com/in/abhishek-kumar-817-in/" className="flex gap-2 justify-center items-center"> <Laptop size={15} /> Dev - Abhishek Kumar <Link2 size={15} /> </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}

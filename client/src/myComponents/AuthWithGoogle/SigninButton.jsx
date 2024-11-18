
import React from 'react'
import { LogIn } from 'lucide-react'
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { googleOAuthHandler } from "../../store/actions/authActions";
import { useNavigate } from 'react-router-dom'
import { Button } from "../../components/ui/button"

const SigninButton = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signInWithGoogle = async (authResponse) => {
        try {
            if (authResponse['code']) {
                const response = await dispatch(googleOAuthHandler(authResponse['code']));
                if (response.type == 'googleOAuthHandler/fulfilled') {
                    toast.success(response.payload.message);
                    return navigate("/chat");
                } else {
                    toast.error(response.payload.message);
                    return;
                }

            } else {
                toast.error('Google Signin failed');
                return;
            }
        } catch (error) {
            const { message = "Error while signin with google" } = error;
            toast.error(message);
            return;
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: signInWithGoogle,
        onError: signInWithGoogle,
        flow: 'auth-code'
    })


    return (
        <Button
            className="w-full"
            onClick={googleLogin}
        >
            <LogIn className="mr-2 h-4 w-4" />
            Sign in with Google
        </Button>
    )
}

export default SigninButton
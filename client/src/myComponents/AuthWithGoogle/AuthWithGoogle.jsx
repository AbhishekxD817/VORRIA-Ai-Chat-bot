import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import SigninButton from "./SigninButton"
import { GoogleOAuthProvider } from '@react-oauth/google'


export default function AuthWithGoogle() {


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Authenticate First</CardTitle>
                    <CardDescription className="text-center">Sign in to your account</CardDescription>
                </CardHeader>
                <CardContent>

                    <GoogleOAuthProvider clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}>
                        <SigninButton />
                    </GoogleOAuthProvider>

                </CardContent>
            </Card>
        </div>
    )
}
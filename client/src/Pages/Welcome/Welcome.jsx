import { useEffect } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { MessageCircle, Zap, Shield, ArrowRight, Linkedin, Contact, Contact2, ContactRound, ContactIcon, LucideContact, Computer, Code, CodeXml } from 'lucide-react'
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

export default function Welcome() {
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();

  // title change
  useEffect(() => {
    document.title = "Vorria Ai"
  }, [])

  // redirect to /chat if logged in
  useEffect(() => {
    if (auth.user) {
      return navigate("/chat");
    }
  }, [auth.user])



  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <MessageCircle className="h-6 w-6 mr-2" />
          <span className="font-bold">Vorria AI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">

          <a target="_blank" className="flex gap-1 items-center px-2 bg-teal-100 rounded-full p-1 text-sm font-medium hover:underline underline-offset-4" href="https://github.com/AbhishekxD817/VORRIA-Ai-Chat-bot">
            Code<CodeXml size={15} />
          </a>
          <Button variant="outline" asChild>
            <Link className="flex gap-1 items-center px-2  rounded-full p-1 text-sm font-medium hover:underline underline-offset-4" to={'/auth'}>
              Sign-in
            </Link>
          </Button>

        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Vorria AI
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Experience the future of conversation with our advanced text-based AI chatbot.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild><Link to={"/chat"}>Get Started</Link></Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <MessageCircle className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Natural Conversations</h3>
                <p className="text-gray-500 dark:text-gray-400">Engage in fluid, human-like dialogues with our AI.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Zap className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Lightning Fast Responses</h3>
                <p className="text-gray-500 dark:text-gray-400">Get instant answers to your queries, 24/7.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
                <p className="text-gray-500 dark:text-gray-400">Your conversations are always protected and confidential.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="w-full md:w-1/2 space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">About Vorria AI</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Vorria AI is a cutting-edge text chat-based AI developed by Abhishek XD. Our mission is to revolutionize
                  digital interactions by providing an intelligent, responsive, and user-friendly chatbot experience.
                </p>
                <Button variant="outline">Learn More About Us</Button>
              </div>
              <div className="w-full md:w-1/2">
                <div className="aspect-video rounded-xl bg-gray-200 dark:bg-gray-800">
                  <img src="https://www.simplilearn.com/ice9/free_resources_article_thumb/Types_of_Artificial_Intelligence.jpg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-8">Get in Touch</h2>
            <div className="max-w-md mx-auto space-y-4">
              <Input placeholder="Your email" type="email" />
              <Input placeholder="Subject" />
              <textarea
                className="w-full h-32 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none resize-none"
                placeholder="Your message"
              ></textarea>
              <Button className="w-full">
                Send Message
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 Vorria AI. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
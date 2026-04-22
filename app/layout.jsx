import "@/assets/styles/globals.css";
import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar"
 import { ToastContainer, toast } from 'react-toastify';

export const metadata = {
    title: "PropertyPulse | Find The Perfect Rental",
    description: "Find your dream rental property",
    keywords: "rental, find rentals, find properties"
}

const MainLayout = ({ children }) => {
    return (
        <AuthProvider>
            <html lang='en'>
                <body>
                    <main>
                        <Navbar />
                        {children}
                        <Footer />
                        <ToastContainer />
                    </main>
                </body>
            </html>
        </AuthProvider>
    )
}

export default MainLayout

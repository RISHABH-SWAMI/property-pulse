import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import HomeProperties from "@/components/HomeProperties"
import InfoBoxes from "@/components/InfoBoxes";
import connectedDB from "@/config/database";

const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </>
  )
}

export default HomePage

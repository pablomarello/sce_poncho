import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { MapCard } from "../components/MapCard"

export function Map () {
  return (
    <div >
      <Navbar isTransparent={true}/>
      <div className="pt-[4.5rem]"> {/* Ajusta el margen superior según sea necesario */}
        <MapCard />
      </div>
      <Footer/>
    </div>
  )
}

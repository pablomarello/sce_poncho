import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { QuestionCard } from "../components/QuestionCard"
import { ImageCard } from "../components/ImageCard"

export function Trivia () {
  return (
    <div>
      <Navbar/>
      <ImageCard/>
      <QuestionCard/>
      <Footer/>
    </div>
  )
}

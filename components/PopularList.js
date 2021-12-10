import PopularListItem from "./PopularListItem"
import { Modal, Button} from 'react-bootstrap'
import { useState } from "react";
import RandomizerModal from "./RandomizerModal";

export default function PopularList({ list }) {
  const [show, setShow] = useState(false);
  const [randomMovie, setRandomMovie] = useState(null)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRandomizerClick = () => {
    handleClose()
    let index = Math.floor(Math.random() * ((list.results.length - 1) - 0 + 1) + 0);
    setRandomMovie(list.results[index])
    handleShow()
  }

  return (
    <>
      <RandomizerModal movies={list} />
      <ul className="list-group">
        {list ?
        <>
         {list.results.map((movie, index) => {
           return <PopularListItem movieData={movie} key={index} />
         })}
         </>
        :
         null}
      </ul>
    </>
  )
}
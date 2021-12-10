import PopularListItem from "./PopularListItem"
import { Modal, Button} from 'react-bootstrap'
import { useState } from "react";

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
      <Modal show={show} onHide={handleClose} size='lg' centered>
        <Modal.Header closeButton>
          <Modal.Title>Randomizer!</Modal.Title>
        </Modal.Header>
        <Modal.Body><PopularListItem movieData={randomMovie}/></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRandomizerClick}>
            Re-roll
          </Button>
        </Modal.Footer>
      </Modal>
    {list || list.results.length > 1 ?
      <button className="btn btn-warning" onClick={handleRandomizerClick}>Im Feeling Lucky!</button>
      :
      null
      }
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
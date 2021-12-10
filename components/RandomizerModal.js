import { Modal, Button } from 'react-bootstrap'
import { useState } from 'react'
import PopularListItem from './PopularListItem'

export default function RandomizerModal ({ movies }) {

  const [show, setShow] = useState(false);
  const [randomMovie, setRandomMovie] = useState(null)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRandomizerClick = () => {
    handleClose()
    let index = Math.floor(Math.random() * ((movies.results.length - 1) - 0 + 1) + 0);
    setRandomMovie(movies.results[index])
    handleShow()
  }

  return (
    <>
      {movies || movies.results.length > 1 ?
      <button className="btn btn-warning" onClick={handleRandomizerClick}>Im Feeling Lucky!</button>
      :
      null
      }
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
  </>
  )
}
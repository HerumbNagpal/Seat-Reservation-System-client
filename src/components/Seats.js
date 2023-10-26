import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Modal/Modal.css'
import './styles.css'


export default function Seats() {
    const [allSeats, setAllSeats] = useState([])
    const [numSeats, setNumSeats] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalText, setModalText] = useState("")
    const fetchSeats = async () => {
        const response = await axios.get('https://seat-reservation-byherumb.onrender.com/seats')
        setAllSeats(response.data)
        console.log("My seats", allSeats);
    }
    useEffect(() => {
        fetchSeats();
    }, [])

    const handleSeats = (e) => {
        console.log(typeof (e.target.value))
        const newSeatNum = Number(e.target.value)
        console.log(typeof (newSeatNum))
        setNumSeats(newSeatNum)
    }

    const handleBtn = async () => {
        // console.log(`Booking ${numSeats} seats`)
        const data = { numSeats: numSeats }
        const result = await axios.post('https://seat-reservation-byherumb.onrender.com/bookMultiple', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(result)
        setModalText(result.data.message)
        setShowModal(!showModal)
        fetchSeats();
        setNumSeats('')
    }

    const closeModal = () =>{
        setShowModal(!showModal)
    }


    return (
        <div className='seatPage' >
            <div style={{ textAlign: 'start' }} >

                <h1>Seat Reservation System</h1>

                <p>Enter the number of seats you want to book  </p>
                <div className='inps' >
                    <select value={numSeats} onChange={(e) => handleSeats(e)} >
                        <option disabled={numSeats.length < 1 ? false : true} value="Number of seats">Number of Searts</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                    </select>
                    <button className='btn' onClick={handleBtn} disabled={numSeats.length < 1 ? true : false} style={{backgroundColor :numSeats.length < 1 ? 'grey' : "" }}>BOOK</button>
                </div>
            </div>
            <div className='table' >
                {allSeats.map((seat, index) => {
                    return (
                        <div key={index} className="seat" style={{ backgroundColor: seat.isReserved ? "red" : " " }} >
                            <p> {seat.seatNumber} </p>
                        </div>
                    )
                })}
            </div>

            {showModal && (
                <div className="modal">
                    <div  className="overlay"></div>
                    <div className="modal-content">
                        <h2>Seats booked </h2>
                        <p>
                            {modalText}
                        </p>

                        <button className="modal-btn" onClick={closeModal}>
                            CLOSE
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LiveTracking from '../components/LiveTracking';
import LocationSearchPanel from '../components/LocationSearchPanel';
import 'remixicon/fonts/remixicon.css'
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';

const Home = () => {
  const [ pickup, setPickup ] = useState('')
  const [ destination, setDestination ] = useState('')
  const [ panelOpen, setPanelOpen ] = useState(false)
  const vehiclePanelRef = useRef(null)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const [ vehiclePanel, setVehiclePanel ] = useState(false)
  const [ activeField, setActiveField ] = useState(null)
  const [ confirmRidePanel, setConfirmRidePanel ] = useState(false)
  const [ vehicleType, setVehicleType ] = useState(null)
  const [ fare, setFare ] = useState({})
  const [ vehicleFound, setVehicleFound ] = useState(false)



  const submitHandler = (e) => {
    e.preventDefault()
}

useGSAP(function () {
    if (panelOpen) {
        gsap.to(panelRef.current, {
            height: '70%',
            padding: 24
           
        })
        gsap.to(panelCloseRef.current, {
            opacity: 1
        })
    } else {
        gsap.to(panelRef.current, {
            height: '0%',
            padding: 0
           
        })
        gsap.to(panelCloseRef.current, {
            opacity: 0
        })
    }
}, [ panelOpen ])
useGSAP(function () {
  if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
          transform: 'translateY(0)'
      })
  } else {
      gsap.to(vehiclePanelRef.current, {
          transform: 'translateY(100%)'
      })
  }
}, [ vehiclePanel ])
useGSAP(function () {
  if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
          transform: 'translateY(0)'
      })
  } else {
      gsap.to(confirmRidePanelRef.current, {
          transform: 'translateY(100%)'
      })
  }
}, [ confirmRidePanel ])

const handlePickupChange = async (e) => {
  setPickup(e.target.value)
  try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: e.target.value },
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }

      })
      setPickupSuggestions(response.data)
  } catch {
      // handle error
  }
}

const handleDestinationChange = async (e) => {
  setDestination(e.target.value)
  try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: e.target.value },
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })
      setDestinationSuggestions(response.data)
  } catch {
      // handle error
  }
}

  return (
    <div className='h-screen relative overflow-hidden'>
            <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <div className='h-screen w-screen'>
                {/* image for temporary use  */}
                <LiveTracking />
            </div>
            <div className=' flex flex-col justify-end h-screen absolute top-0 w-full'>
                <div className='h-[30%] p-6 bg-white relative'>
                    <h5 ref={panelCloseRef} onClick={() => {
                        setPanelOpen(false)
                    }} className='absolute opacity-0 right-6 top-6 text-2xl'>
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className='text-2xl font-semibold'>Find a trip</h4>
                    <form className='relative py-3' onSubmit={(e) => {
                        submitHandler(e)
                    }}>
                        <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('pickup')
                            }}
                            value={pickup}
                            onChange={handlePickupChange}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
                            type="text"
                            placeholder='Add a pick-up location'
                        />
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('destination')
                            }}
                            value={destination}
                            onChange={handleDestinationChange}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
                            type="text"
                            placeholder='Enter your destination' />
                    </form>
                    <button
                        
                        className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
                        Find Trip
                    </button>
                </div>
                <div ref={panelRef} className='bg-white h-0'>
                    <LocationSearchPanel/>
                </div>
            </div>
            <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <VehiclePanel
                    selectVehicle={setVehicleType}
                    fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
            </div>
            <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
                <ConfirmRide
                    // createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}

                    setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
            </div>
           
        </div>
  )
}

export default Home

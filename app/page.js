'use client';
import { useEffect, useState } from "react";
import CustomerHeader from "./_components/customerHeader";
import RestaurantFooter from "./_components/RestaurantFooter";
import Image from 'next/image';
import { useRouter } from "next/navigation";
export default function Home() {

  const [locations, setLocations] = useState([]);  // Initial state set to an empty array
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showLocation, setShowLocation] = useState(false);  // Use boolean for toggling visibility
  const [restaurants, setRestaurants] = useState([]);  // Initial state set to an empty array
  const router = useRouter();

  useEffect(() => {
    loadLocations();
    loadRestaurants();  // Optionally, load all restaurants initially
  }, []);

  const loadLocations = async () => {
    try {
      let response = await fetch('http://localhost:3000/api/customer/locations');
      response = await response.json();

      console.log("Locations API response:", response);  // Log the response to inspect it

      if (response.success && Array.isArray(response.result)) {
        setLocations(response.result);  // Ensure the result is an array
      } else {
        setLocations([]);  // Fallback to an empty array
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
      setLocations([]);  // Fallback to an empty array in case of error
    }
  };

  const loadRestaurants = async (params = {}) => {
    try {
      let url = "http://localhost:3000/api/customer?";
      
      // Append parameters if available
      if (params?.location) {
        url += `location=${params.location}`;
      } else if (params?.restaurant) {
        url += `restaurant=${params.restaurant}`;
      }

      let response = await fetch(url);
      response = await response.json();

      console.log("Restaurants API response:", response);  // Log the response to inspect it

      if (response.success && Array.isArray(response.result)) {
        setRestaurants(response.result);  // Ensure the result is an array
      } else {
        setRestaurants([]);  // Fallback to an empty array
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      setRestaurants([]);  // Fallback to an empty array in case of error
    }
  };

  const handleListItem = (item) => {
    setSelectedLocation(item);
    setShowLocation(false);
    loadRestaurants({ location: item });  // Load restaurants for the selected location
  };

  return (
    <div className="main">
      <main className="flex min-h-screen flex-col items-center justify-between p-24">

        <CustomerHeader />

        <div className="input-wrapper">
          {/* Input for selecting a location */}
          <input
            className="select-input"
            value={selectedLocation}
            type="text"
            onClick={() => setShowLocation(true)}  // Show location list on click
            placeholder="Select place"
          />
          {/* Location dropdown list */}
          <ul className="location-list">
            {
              showLocation && locations?.length > 0 && locations.map((item) => (
                <li key={item} onClick={() => handleListItem(item)}>
                  {item}
                </li>
              ))
            }
          </ul>

          {/* Input for searching by restaurant name */}
          <input 
            className="search-input" 
            onChange={(event) => loadRestaurants({ restaurant: event.target.value })} 
            type="text" 
            placeholder="Enter Food or Restaurant name" 
          />
        </div>

        {/* Main page banner */}
        <div className="main-page-banner">
          <div className="mb">
            <div className="text">
              <h1>STAY HOME</h1>
              <h1>WE DELIVER</h1>
            </div>
            <div className="pic">
              <Image
                src="/Image.jpg"  // Ensure this is the correct path to your image
                alt="Main banner"
                width={350}
                height={250}
              />
            </div>
          </div>
        </div>

        {/* Restaurant list */}
        <div className="restaurant-list-container">
          {
            restaurants?.length > 0 ? restaurants.map((item) => (

              <div onClick={()=>router.push(`explore/${item.name}` + "?id=" +item._id)} className="restaurant-wrapper" key={item.name}>
                <div className="heading-wrapper">
                  <h2>{item.name}</h2>
                  <h3>Contact: {item.contact}</h3>
                </div>
                <div className="address-wrapper">
                  <div><h3>{item.city}, </h3></div>
                  <div className="address"><h3>{item.address}, Email: {item.email}</h3></div>
                </div>
              </div>
            )) : <p>No restaurants found</p>  // Show a fallback message if no restaurants
          }
        </div>

        <RestaurantFooter />

      </main>
    </div>
  );
}

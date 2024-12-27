import { useState } from "react";
import backgroundImage from "./assets/3.jpeg"
import backgroundImage2 from "./assets/forst.jpeg"

export default function App() {

  const [formData, setFormData] = useState({
    electricityUsageKWh: '',
    transportationUsageGallonsPerMonth: '',
    shortFlight: '',
    mediumFlight: '',
    longFlight: '',
    dietaryChoice: 'Vegan'
  });

  const [result, setResult] = useState<any>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{

      e.preventDefault()

      try{
        const response = await fetch("http://localhost:3001/calculate", {
          method: "POST",
          headers:{
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData)
        })

        const data = await response.json()
        setResult(data);


      } catch (err){
        console.log(err);
        
      }

  }

  return (
    <>
      <div
      className="min-h-screen flex items-center justify-center p-5 flex-col"
      style={{
        backgroundImage: `url(${backgroundImage})`
      }}
      >
        <div className="bg-gray-200 p-10 w-full max-w-screen-lg"
        style={{
        backgroundImage: `url(${backgroundImage2})`,
        backgroundSize: "cover",
      }}
      >

        <h1 className="text-5xl font-bold mb-6 text-center text-white">
          My Carbon Footprint
        </h1>

        <p className="text-xl font-bold mb-6 text-center text-white">
          @arnavdeepaware 
        </p>
        </div>

      </div>
    </>
  );
}


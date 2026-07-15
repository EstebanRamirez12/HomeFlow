import {useEffect, useState } from 'react'
import { Camera } from 'lucide-react';
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [mensaje, setMensaje] = useState('Backend: No')

  const fetchTest = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/test/getTest");

      const data = await response.text();

      setMensaje(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTest();
  }, []);

  return (
    <>    
      <div>
        <Camera color="red" size={48} />
      </div>
      <h1>{mensaje}</h1>
      <AppRoutes />
    </>
  )
}

export default App

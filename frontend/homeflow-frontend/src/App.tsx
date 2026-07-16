import { useEffect, useState } from 'react'
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
      <AppRoutes />
      <h1>{mensaje}</h1>
    </>
  )
}

export default App

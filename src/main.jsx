import { createRoot } from "react-dom/client"
import App from "./App.jsx"

// Asegurarse de que el DOM esté cargado antes de renderizar
document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("root")

  if (rootElement) {
    createRoot(rootElement).render(<App />)
  } else {
    console.error('No se encontró el elemento con id "root" en el DOM')
  }
})
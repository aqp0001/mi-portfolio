"use client"

import { useState, useCallback, useEffect } from "react"
import { DndContext } from "@dnd-kit/core"
import { User, Rocket, Briefcase, Zap, Mail, Menu } from "lucide-react"
import DraggableFrame from "./components/DraggableFrame"
import AboutContent from "./components/portfolio/AboutContent"
import ProjectsContent from "./components/portfolio/ProjectsContent"
import ExperienceContent from "./components/portfolio/ExperienceContent"
import SkillsContent from "./components/portfolio/SkillsContent"
import ContactContent from "./components/portfolio/ContactContent"

const App = () => {
  const [time, setTime] = useState(new Date())
  const [selectedIcon, setSelectedIcon] = useState(null)

  // Actualizar reloj cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const desktopIcons = [
    { id: "about", name: "Sobre Mí", icon: User, position: { x: 50, y: 50 }, component: AboutContent },
    { id: "projects", name: "Proyectos", icon: Rocket, position: { x: 50, y: 180 }, component: ProjectsContent },
    {
      id: "experience",
      name: "Experiencia",
      icon: Briefcase,
      position: { x: 50, y: 310 },
      component: ExperienceContent,
    },
    { id: "skills", name: "Habilidades", icon: Zap, position: { x: 150, y: 50 }, component: SkillsContent },
    { id: "contact", name: "Contacto", icon: Mail, position: { x: 150, y: 180 }, component: ContactContent },
  ]

  const [openWindows, setOpenWindows] = useState({})
  const [minimizedWindows, setMinimizedWindows] = useState({})
  const [windowPositions, setWindowPositions] = useState({})
  const [windowOrder, setWindowOrder] = useState({})

  const handleIconClick = useCallback(
    (iconId) => {
      setSelectedIcon(iconId)

      // Si la ventana está minimizada, la restauramos
      if (minimizedWindows[iconId]) {
        setMinimizedWindows((prev) => {
          const newMinimized = { ...prev }
          delete newMinimized[iconId]
          return newMinimized
        })
        setWindowOrder((prev) => {
          const newOrder = { ...prev }
          const maxOrder = Math.max(...Object.values(newOrder), 0)
          newOrder[iconId] = maxOrder + 1
          return newOrder
        })
        return
      }

      // Si la ventana ya está abierta, la traemos al frente
      if (openWindows[iconId]) {
        setWindowOrder((prev) => {
          const newOrder = { ...prev }
          const maxOrder = Math.max(...Object.values(newOrder), 0)
          newOrder[iconId] = maxOrder + 1
          return newOrder
        })
        return
      }

      // Abrir nueva ventana
      setOpenWindows((prev) => ({ ...prev, [iconId]: true }))

      // Posición inicial de la ventana (centrada con offset)
      const windowCount = Object.keys(openWindows).length
      setWindowPositions((prev) => ({
        ...prev,
        [iconId]: {
          x: 200 + windowCount * 30,
          y: 100 + windowCount * 30,
        },
      }))

      // Traer al frente
      setWindowOrder((prev) => {
        const newOrder = { ...prev }
        const maxOrder = Math.max(...Object.values(newOrder), 0)
        newOrder[iconId] = maxOrder + 1
        return newOrder
      })
    },
    [openWindows, minimizedWindows],
  )

  const handleIconDoubleClick = useCallback(
    (iconId) => {
      handleIconClick(iconId)
    },
    [handleIconClick],
  )

  const handleCloseWindow = useCallback((iconId) => {
    setOpenWindows((prev) => {
      const newWindows = { ...prev }
      delete newWindows[iconId]
      return newWindows
    })
    setMinimizedWindows((prev) => {
      const newMinimized = { ...prev }
      delete newMinimized[iconId]
      return newMinimized
    })
    setSelectedIcon(null)
  }, [])

  const handleMinimizeWindow = useCallback((iconId) => {
    setMinimizedWindows((prev) => ({ ...prev, [iconId]: true }))
  }, [])

  const handleTaskbarAppClick = useCallback(
    (iconId) => {
      if (minimizedWindows[iconId]) {
        // Restaurar ventana minimizada
        setMinimizedWindows((prev) => {
          const newMinimized = { ...prev }
          delete newMinimized[iconId]
          return newMinimized
        })
        setWindowOrder((prev) => {
          const newOrder = { ...prev }
          const maxOrder = Math.max(...Object.values(newOrder), 0)
          newOrder[iconId] = maxOrder + 1
          return newOrder
        })
      } else {
        // Traer al frente o minimizar si ya está al frente
        const currentMaxOrder = Math.max(...Object.values(windowOrder), 0)
        if (windowOrder[iconId] === currentMaxOrder) {
          // Si ya está al frente, minimizar
          setMinimizedWindows((prev) => ({ ...prev, [iconId]: true }))
        } else {
          // Si no está al frente, traer al frente
          setWindowOrder((prev) => {
            const newOrder = { ...prev }
            newOrder[iconId] = currentMaxOrder + 1
            return newOrder
          })
        }
      }
    },
    [minimizedWindows, windowOrder],
  )

  const handleDragEnd = useCallback(
    (event) => {
      const { active, delta } = event
      if (active && openWindows[active.id]) {
        setWindowPositions((prev) => ({
          ...prev,
          [active.id]: {
            x: (prev[active.id]?.x || 0) + delta.x,
            y: (prev[active.id]?.y || 0) + delta.y,
          },
        }))
      }
    },
    [openWindows],
  )

  const handleWindowClick = useCallback((iconId) => {
    setWindowOrder((prev) => {
      const newOrder = { ...prev }
      const maxOrder = Math.max(...Object.values(newOrder), 0)
      newOrder[iconId] = maxOrder + 1
      return newOrder
    })
  }, [])

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="desktop">
        {/* Iconos del escritorio */}
        {desktopIcons.map((icon) => {
          const IconComponent = icon.icon
          return (
            <div
              key={icon.id}
              className={`desktop-icon ${selectedIcon === icon.id ? "selected" : ""}`}
              style={{
                left: icon.position.x,
                top: icon.position.y,
              }}
              onClick={() => setSelectedIcon(icon.id)}
              onDoubleClick={() => handleIconDoubleClick(icon.id)}
            >
              <div className="icon-image">
                <IconComponent size={24} />
              </div>
              <div className="icon-label">{icon.name}</div>
            </div>
          )
        })}

        {/* Ventanas abiertas */}
        {desktopIcons.map((icon) => {
          if (!openWindows[icon.id]) return null

          const Component = icon.component
          const IconComponent = icon.icon
          return (
            <DraggableFrame
              key={icon.id}
              id={icon.id}
              initialPosition={windowPositions[icon.id] || { x: 200, y: 100 }}
              onToggleActive={handleCloseWindow}
              onMinimize={handleMinimizeWindow}
              isActive={!minimizedWindows[icon.id]}
              canClose={true}
              canMinimize={true}
              onFrameClick={handleWindowClick}
              zIndex={windowOrder[icon.id] || 0}
              title={icon.name}
              icon={IconComponent}
            >
              <Component />
            </DraggableFrame>
          )
        })}
      </div>

      {/* Barra de tareas */}
      <div className="taskbar">
        <button className="start-button">
          <Menu size={16} />
          Portfolio
        </button>

        <div className="taskbar-apps">
          {desktopIcons.map((icon) => {
            if (!openWindows[icon.id]) return null

            const IconComponent = icon.icon
            const isMinimized = minimizedWindows[icon.id]
            const isActive = !isMinimized && windowOrder[icon.id] === Math.max(...Object.values(windowOrder), 0)

            return (
              <div
                key={icon.id}
                className={`taskbar-app ${isActive ? "active" : ""} ${isMinimized ? "minimized" : ""}`}
                onClick={() => handleTaskbarAppClick(icon.id)}
                title={icon.name}
              >
                <IconComponent size={16} />
                <span>{icon.name}</span>
              </div>
            )
          })}
        </div>

        <div className="time-display">
          <div className="time">{time.toLocaleTimeString()}</div>
          <div className="date">{time.toLocaleDateString()}</div>
        </div>
      </div>
    </DndContext>
  )
}

export default App

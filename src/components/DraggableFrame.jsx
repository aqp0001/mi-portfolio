"use client"

import { useState, useEffect } from "react"
import { useDraggable } from "@dnd-kit/core"
import { Minus, Square, X } from "lucide-react"

const DraggableFrame = ({
  id,
  children,
  initialPosition,
  onToggleActive,
  onMinimize,
  isActive,
  canClose,
  canMinimize,
  onFrameClick,
  zIndex,
  title,
  icon: IconComponent,
}) => {
  const [position, setPosition] = useState(initialPosition)
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: {
      isActive,
    },
  })

  useEffect(() => {
    setPosition(initialPosition)
  }, [initialPosition])

  const style = {
    transform: `translate3d(${position.x + (transform ? transform.x : 0)}px, ${position.y + (transform ? transform.y : 0)}px, 0)`,
    position: "absolute",
    maxWidth: "90%",
    width: "600px",
    minHeight: "400px",
    background: "rgba(30, 30, 30, 0.95)",
    border: "1px solid #555",
    borderRadius: "8px",
    color: "#ddd",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(10px)",
    display: isActive ? "block" : "none",
    zIndex: zIndex + 1000,
  }

  const titleBarStyle = {
    background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "8px 12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontWeight: "600",
    borderRadius: "8px 8px 0 0",
    fontSize: "14px",
  }

  const handleClose = (e) => {
    e.stopPropagation()
    if (canClose) {
      onToggleActive(id)
    }
  }

  const handleMinimize = (e) => {
    e.stopPropagation()
    if (canMinimize) {
      onMinimize(id)
    }
  }

  return (
    <div style={style} onClick={() => onFrameClick(id)}>
      <div style={titleBarStyle}>
        <div
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          style={{
            flex: 1,
            cursor: "grab",
            padding: "4px",
            marginRight: "8px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {IconComponent && <IconComponent size={16} />}
          <span>{title || id}</span>
        </div>
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          {canMinimize && (
            <button
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "4px",
                border: "none",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.2s",
              }}
              onClick={handleMinimize}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)")}
              title="Minimizar"
            >
              <Minus size={14} />
            </button>
          )}
          <button
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)")}
            title="Maximizar"
          >
            <Square size={12} />
          </button>
          <button
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "4px",
              border: "none",
              backgroundColor: canClose ? "rgba(220, 53, 69, 0.8)" : "rgba(108, 117, 125, 0.5)",
              color: "white",
              cursor: canClose ? "pointer" : "default",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.2s",
            }}
            onClick={handleClose}
            disabled={!canClose}
            onMouseEnter={(e) => {
              if (canClose) e.target.style.backgroundColor = "rgba(220, 53, 69, 1)"
            }}
            onMouseLeave={(e) => {
              if (canClose) e.target.style.backgroundColor = "rgba(220, 53, 69, 0.8)"
            }}
            title="Cerrar"
          >
            <X size={14} />
          </button>
        </div>
      </div>
      <div
        style={{
          padding: "20px",
          minHeight: "350px",
          backgroundColor: "rgba(40, 40, 40, 0.9)",
          borderRadius: "0 0 8px 8px",
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default DraggableFrame

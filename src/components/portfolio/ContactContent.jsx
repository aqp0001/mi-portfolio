const ContactContent = () => {
  return (
    <div style={{ color: "#e0e0e0" }}>
      <h2 style={{ color: "#667eea", marginBottom: "20px" }}>Contacto</h2>

      <p style={{ lineHeight: "1.6", marginBottom: "25px" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </p>

      <div style={{ marginBottom: "20px" }}>
        <h4 style={{ color: "#764ba2", marginBottom: "10px" }}>📧 Email</h4>
        <p>ejemplo@email.com</p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h4 style={{ color: "#764ba2", marginBottom: "10px" }}>💼 LinkedIn</h4>
        <p>linkedin.com/in/tu-perfil</p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h4 style={{ color: "#764ba2", marginBottom: "10px" }}>🐙 GitHub</h4>
        <p>github.com/tu-usuario</p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h4 style={{ color: "#764ba2", marginBottom: "10px" }}>📱 Teléfono</h4>
        <p>+1 (555) 123-4567</p>
      </div>

      <p style={{ lineHeight: "1.6", fontSize: "14px", color: "#aaa", marginTop: "25px" }}>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </div>
  )
}

export default ContactContent

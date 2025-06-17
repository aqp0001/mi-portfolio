const SkillsContent = () => {
  const skills = [
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "Python", level: 75 },
    { name: "CSS/SCSS", level: 85 },
    { name: "MongoDB", level: 70 },
  ]

  return (
    <div style={{ color: "#e0e0e0" }}>
      <h2 style={{ color: "#667eea", marginBottom: "20px" }}>Habilidades</h2>

      <p style={{ lineHeight: "1.6", marginBottom: "25px" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </p>

      <div>
        {skills.map((skill, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
                fontSize: "14px",
              }}
            >
              <span>{skill.name}</span>
              <span>{skill.level}%</span>
            </div>
            <div
              style={{
                width: "100%",
                height: "8px",
                backgroundColor: "#555",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${skill.level}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "4px",
                  transition: "width 0.3s ease",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillsContent

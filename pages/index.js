export default function Home() {
  const projects = [
    {
      id: 1,
      title: "项目 1",
      description: "这是我的第一个项目描述",
      image: "https://via.placeholder.com/300x200?text=Project+1",
      link: "https://github.com"
    },
    {
      id: 2,
      title: "项目 2", 
      description: "这是我的第二个项目描述",
      image: "https://via.placeholder.com/300x200?text=Project+2",
      link: "https://github.com"
    }
  ];

  return (
    <>
      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: system-ui; background: linear-gradient(135deg, #f5f5f5 0%, #fafafa 100%); }
        html { scroll-behavior: smooth; }
        
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        
        .navbar-brand h2 {
          font-size: 1.8rem;
          background: linear-gradient(135deg, #0070f3 0%, #0051b3 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
        }
        
        .navbar-links {
          display: flex;
          list-style: none;
          gap: 2.5rem;
          margin: 0;
        }
        
        .navbar-links a {
          color: #333;
          text-decoration: none;
          font-weight: 500;
        }
        
        .main { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .hero { text-align: center; padding: 4rem 2rem; }
        .hero h1 { font-size: 3.5rem; background: linear-gradient(135deg, #0070f3 0%, #0051b3 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 1rem; }
        .hero p { font-size: 1.3rem; color: #666; }
        
        .projects { margin: 4rem 0; }
        .projects h2 { font-size: 2.5rem; text-align: center; margin-bottom: 3rem; }
        
        .project-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }
        
        .project-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        
        .project-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2); }
        .project-card img { width: 100%; height: 220px; object-fit: cover; }
        .project-content { padding: 1.8rem; }
        .project-content h3 { color: #0070f3; margin-bottom: 0.7rem; }
        .project-content a { padding: 0.6rem 1.2rem; background: linear-gradient(135deg, #0070f3 0%, #0051b3 100%); color: white; border-radius: 6px; text-decoration: none; font-weight: 600; display: inline-block; }
        
        .contact { margin: 4rem 0; text-align: center; }
        .contact h2 { font-size: 2.5rem; margin-bottom: 1rem; }
        
        .footer {
          text-align: center;
          padding: 3rem 2rem;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          color: #e0e0e0;
          margin-top: 4rem;
        }
        
        .social-links { display: flex; justify-content: center; gap: 2rem; margin-top: 1.5rem; }
        .social-links a { color: #0070f3; border: 1px solid #0070f3; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; }
      `}</style>

      <nav className="navbar">
        <div className="navbar-brand"><h2>Aoki</h2></div>
        <ul className="navbar-links">
          <li><a href="/">首页</a></li>
          <li><a href="#projects">作品</a></li>
          <li><a href="#contact">联系</a></li>
        </ul>
      </nav>

      <main className="main">
        <section className="hero">
          <h1>欢迎来到我的作品集</h1>
          <p>我是一位全栈开发工程师</p>
        </section>

        <section className="projects" id="projects">
          <h2>我的作品</h2>
          <div className="project-grid">
            {projects.map(p => (
              <div key={p.id} className="project-card">
                <img src={p.image} alt={p.title} />
                <div className="project-content">
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <a href={p.link}>查看项目 →</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <h2>联系我</h2>
          <p>欢迎发送消息！</p>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Aoki Portfolio</p>
      </footer>
    </>
  );
}

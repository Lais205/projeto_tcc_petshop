export default function SiteFooter() {
  return (
    <footer className="footer" id="contato">
      <div className="footer-grid">
        <div className="footer-col">
          <a className="logo footer-logo" href="/">
            <span className="logo-badge">🐾</span><span>PetVita</span>
          </a>
          <p>O petshop feito com amor. Produtos, estética e atendimento veterinário.</p>
          <div className="hours-badge">
            <strong>Horário de Funcionamento:</strong><br />
            Segunda a Sábado: 08h00 - 20h00<br />
            Domingos e Feriados: 09h00 - 15h00
          </div>
        </div>
        <div className="footer-col">
          <h3>Navegação</h3>
          <ul className="footer-links">
            <li><a href="#inicio">Início</a></li>
            <li><a href="#produtos">Produtos</a></li>
            <li><a href="#servicos">Serviços</a></li>
            <li><a href="#contato">Contatos</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Categorias</h3>
          <ul className="footer-links">
            <li><a href="#produtos">Rações Cães &amp; Gatos</a></li>
            <li><a href="#produtos">Farmácia Veterinária</a></li>
            <li><a href="#produtos">Acessórios &amp; Camas</a></li>
            <li><a href="#servicos">Banho e Tosa</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Atendimento e Contato</h3>
          <ul className="contact-list">
            <li className="contact-item">Av. Ficticia, 1500 - Bela Pista, São Paulo - SP</li>
            <li className="contact-item">(11) 300-0000 / (11) 91111-1111</li>
            <li className="contact-item">lais25carvalho25@gmail.com</li>
            <li className="contact-item">@petvita_oficial</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 PetVita Petshop — Projeto de Software (TCC).</p>
      </div>
    </footer>
  );
}

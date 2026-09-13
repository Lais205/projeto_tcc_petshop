import React from 'react';

export default function Footer() {
  return (
    <footer className="footer" id="contato">
      <div className="footer-grid">
        <div className="footer-col">
          <div className="logo" style={{ color: '#FFF', marginBottom: '16px' }}>
            <span className="logo-badge">🐾</span>
            <span>PetVita</span>
          </div>
          <p>
            O petshop feito com amor. Produtos, estética e atendimento veterinário.
          </p>
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
            <li><a href="#">Rações Cães & Gatos</a></li>
            <li><a href="#">Farmácia Veterinária</a></li>
            <li><a href="#">Acessórios & Camas</a></li>
            <li><a href="#">Banho e Tosa</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Atendimento e Contato</h3>
          <ul className="contact-list">
            <li className="contact-item">
              <span>Av. Ficticia, 1500 - Bela Pista, São Paulo - SP</span>
            </li>
            <li className="contact-item">
              <span>(11) 300-0000 / (11) 91111-1111</span>
            </li>
            <li className="contact-item">
              <span>lais25carvalho25@gmail.com</span>
            </li>
            <li className="contact-item">
              <span>@petvita_oficial</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 PetVita Petshop — Projeto de Software (TCC). Desenvolvido em React.</p>
      </div>
    </footer>
  );
}

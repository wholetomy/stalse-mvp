"use client";

export default function page() {
  return (
    <>
      <div className="abas">
        <ul className="nav-tabs">
          <li className="nav-item">
            <a className="nav-link active">Início</a>
          </li>
        </ul>
      </div>

      <div className="tab-content">
        <div className="painel">
          <div className="painel-title">
            <span>Bem-vindo(a) ao Stalse MVP</span>
          </div>
          <div className="painel-body">
            <p>Selecione uma opção no menu à esquerda para começar.</p>
          </div>
        </div>
      </div>
    </>
  );
}

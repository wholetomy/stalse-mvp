"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Tickets() {
  const router = useRouter();
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleDetalhes = (id) => {
    router.push(`/tickets/${id}`);
  };

  useEffect(() => {
    async function fetchTickets() {
      try {
        const response = await fetch("http://127.0.0.1:8000/tickets");
        if (!response.ok) {
          throw new Error("Erro ao buscar tickets");
        }
        const data = await response.json();

        const mapped = data.map((t) => ({
          id: t.id,
          cliente: t.customer_name,
          canal: t.channel,
          assunto: t.subject,
          status: t.status,
          prioridade: t.priority,
          criadoEm: new Date(t.created_at).toLocaleDateString("pt-BR"),
          created_at_raw: t.created_at,
        }));

        setTickets(mapped);
        setFilteredTickets(mapped);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchTickets();
  }, []);

  const applyFilters = () => {
    let temp = [...tickets];

    if (statusFilter) {
      temp = temp.filter((t) => t.status === statusFilter);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      temp = temp.filter(
        (t) =>
          t.created_at_raw.toLowerCase().includes(term) ||
          t.cliente.toLowerCase().includes(term) ||
          t.canal.toLowerCase().includes(term) ||
          t.assunto.toLowerCase().includes(term) ||
          t.status.toLowerCase().includes(term) ||
          t.prioridade.toLowerCase().includes(term)
      );
    }

    setFilteredTickets(temp);
    setCurrentPage(1);
  };

  const handleSearch = () => applyFilters();
  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    applyFilters();
  };
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") applyFilters();
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);

  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <>
      <div className="abas">
        <ul className="nav-tabs">
          <li className="nav-item">
            <a className="nav-link active">Tickets</a>
          </li>
        </ul>
      </div>

      <div className="tab-content">
        <div className="painel space-below">
          <div className="painel-title">
            <span>Pesquisar</span>
          </div>
          <div className="painel-body">
            <div className="flex-div">
              <div className="flex-div-column">
                <span>Pesquisar</span>
                <input
                  type="text"
                  className="form-control form-control-200"
                  placeholder="Digite o termo"
                  value={searchTerm}
                  onChange={handleInputChange}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <div className="flex-div-column">
                <span>Status</span>
                <select
                  value={statusFilter}
                  onChange={handleStatusChange}
                  className="form-control form-control-200"
                >
                  <option value="">Todos</option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                  <option value="in_progress">In progress</option>
                </select>
              </div>
              <div>
                <button className="button-padrao" onClick={handleSearch}>
                  Pesquisar
                </button>
              </div>
            </div>
            <div className="space-above">
              <span>
                Dica: Você pode pesquisar por "Cliente", "Canal", "Assunto", "Status", e "Prioridade".
              </span>
            </div>
          </div>
        </div>

        <div className="painel">
          <div className="painel-title">
            <span>Tabela de tickets</span>
          </div>
          <div className="painel-body">
            {loading ? (
              <p>Carregando...</p>
            ) : (
              <>
                <table className="gridview-style gridview-style-with-buttons">
                  <thead>
                    <tr>
                      <th>Detalhes</th>
                      <th>ID</th>
                      <th>Cliente</th>
                      <th>Canal</th>
                      <th>Assunto</th>
                      <th>Status</th>
                      <th>Prioridade</th>
                      <th>Criado em</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTickets.length > 0 ? (
                      currentTickets.map((t) => (
                        <tr key={t.id}>
                          <td>
                            <button className="button-azul" onClick={() => handleDetalhes(t.id)}>
                              Detalhes
                            </button>
                          </td>
                          <td>{t.id}</td>
                          <td>{t.cliente}</td>
                          <td>{t.canal}</td>
                          <td>{t.assunto}</td>
                          <td>{t.status}</td>
                          <td>{t.prioridade}</td>
                          <td>{t.criadoEm}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8">Nenhum ticket encontrado</td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {totalPages > 1 && (
                  <div className="flex-div-align-center space-above">
                    <button className="button-padrao" onClick={goToPrevPage} disabled={currentPage === 1}>
                      Anterior
                    </button>
                    <span>
                      Página {currentPage} de {totalPages}
                    </span>
                    <button className="button-padrao" onClick={goToNextPage} disabled={currentPage === totalPages}>
                      Próximo
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
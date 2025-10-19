"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TicketDetails({ params }) {
  const { ticketId } = use(params);
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 🔸 Buscar detalhes do ticket
  useEffect(() => {
    async function fetchTicket() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/tickets/${ticketId}`);
        if (!res.ok) throw new Error("Erro ao carregar ticket");
        const data = await res.json();
        setTicket(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchTicket();
  }, [ticketId]);

  async function updateTicket(field, value) {
    try {
      const res = await fetch(`http://127.0.0.1:8000/tickets/${ticketId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
      if (!res.ok) throw new Error("Erro ao atualizar ticket");
      setTicket((prev) => ({ ...prev, [field]: value }));
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) return <p>Carregando...</p>;
  if (!ticket) return <p>Ticket não encontrado.</p>;

  return (
    <>
      <div className="abas">
        <ul className="nav-tabs">
          <li className="nav-item">
            <a className="nav-link active">Detalhes do Ticket</a>
          </li>
        </ul>
      </div>

      <div className="tab-content">
        <div className="painel space-below">
          <div className="painel-title">
            <span>Informações do Ticket</span>
          </div>
          <div className="painel-body">
            <div className="flex-div-column">
              <p><strong>ID:</strong> {ticket.id}</p>
              <p><strong>Cliente:</strong> {ticket.customer_name}</p>
              <p><strong>Canal:</strong> {ticket.channel}</p>
              <p><strong>Assunto:</strong> {ticket.subject}</p>
              <p><strong>Criado em:</strong> {new Date(ticket.created_at).toLocaleString()}</p>
              <p><strong>Status:</strong> {ticket.status}</p>
              <p><strong>Prioridade:</strong> {ticket.priority}</p>
            </div>
          </div>
        </div>
        <div className="painel space-below">
          <div className="painel-title">
            <span>Alterar Status</span>
          </div>
          <div className="painel-body">
            <div className="flex-div">
              <button
                className="button-padrao"
                onClick={() => updateTicket("status", "open")}
              >
                Open
              </button>
              <button
                className="button-padrao"
                onClick={() => updateTicket("status", "in_progress")}
              >
                In Progress
              </button>
              <button
                className="button-padrao"
                onClick={() => updateTicket("status", "closed")}
              >
                Closed
              </button>
            </div>
          </div>
        </div>
        <div className="painel space-below">
          <div className="painel-title">
            <span>Alterar Prioridade</span>
          </div>
          <div className="painel-body">
            <div className="flex-div">
              <button
                className="button-padrao"
                onClick={() => updateTicket("priority", "low")}
              >
                Low
              </button>
              <button
                className="button-padrao"
                onClick={() => updateTicket("priority", "normal")}
              >
                Normal
              </button>
              <button
                className="button-padrao"
                onClick={() => updateTicket("priority", "high")}
              >
                High
              </button>
            </div>
          </div>
        </div>
        <div>
            <button className="button-azul" onClick={() => router.push("/tickets")}>Voltar</button>
        </div>
      </div>
    </>
  );
}
"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const res = await fetch("http://127.0.0.1:8000/metrics");
        if (!res.ok) throw new Error("Erro ao carregar métricas");
        const data = await res.json();
        setMetrics(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMetrics();
  }, []);

  if (loading) return <p>Carregando métricas...</p>;
  if (!metrics) return <p>Erro ao carregar métricas</p>;

  const totalTickets = metrics.total_tickets ?? 0;
  const ticketsPerDay = metrics.tickets_per_day ?? [];
  const topTypes = metrics.top_types ?? [];

  const lastDay = ticketsPerDay[ticketsPerDay.length - 1];
  const prevDay = ticketsPerDay[ticketsPerDay.length - 2];

  const dailyGrowth =
    lastDay && prevDay
      ? (((lastDay.count - prevDay.count) / prevDay.count) * 100).toFixed(1)
      : null;

  const mostCommonType =
    topTypes.length > 0
      ? topTypes.reduce((a, b) => (a.count > b.count ? a : b))
      : null;

  return (
    <>
      <div className="abas">
        <ul className="nav-tabs">
          <li className="nav-item">
            <a className="nav-link active">Dashboard</a>
          </li>
        </ul>
      </div>

      <div className="tab-content">
        <div className="painel space-below">
          <div className="painel-title">
            <span>Visão geral</span>
          </div>
          <div className="painel-body">
            <div className="flex-div">
              {/* Total de tickets */}
              <div className="card-metric highlight">
                <h3>Total de Tickets</h3>
                <p className="metric-number">{totalTickets}</p>
                <span className="metric-sub">Desde o início</span>
              </div>

              {/* Variação diária */}
              <div className="card-metric">
                <h3>Último Dia</h3>
                <p className="metric-number">
                  {lastDay ? lastDay.count : "0"}
                </p>
                {dailyGrowth && (
                  <span
                    className={`metric-sub ${
                      dailyGrowth >= 0 ? "growth-up" : "growth-down"
                    }`}
                  >
                    {dailyGrowth >= 0 ? "▲" : "▼"} {dailyGrowth}% vs dia anterior
                  </span>
                )}
              </div>
              <div className="card-metric">
                <h3>Tipo mais comum</h3>
                <p className="metric-number">
                  {mostCommonType ? mostCommonType.type : "—"}
                </p>
                <span className="metric-sub">
                  {mostCommonType ? `${mostCommonType.count} tickets` : ""}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="painel">
          <div className="painel-title">
            <span>Top categorias de tickets</span>
          </div>
          <div className="painel-body">
            <table className="gridview-style">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Quantidade</th>
                  <th>% do Total</th>
                </tr>
              </thead>
              <tbody>
                {topTypes.length > 0 ? (
                  topTypes.map((t, idx) => (
                    <tr key={idx}>
                      <td>{t.type}</td>
                      <td>{t.count}</td>
                      <td>{((t.count / totalTickets) * 100).toFixed(1)}%</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">Nenhum dado disponível</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

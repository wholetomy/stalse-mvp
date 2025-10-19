"use client";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="sidebar open">
      <div className="logo-details">
        <Link href="/" className="logo_link flex-div-align-center">
          <i id="icon" className="bx bx-code"></i>
          <span className="logo_name">Stalse MVP</span>
        </Link>
      </div>

      <ul className="nav-list">
        <li>
          <Link href="/tickets" className="button-sidebar">
            <i id="ticketsIcone" className="bx bx-list-ul"></i>
            <span id="ticketsTexto" className="links_name">
              Tickets
            </span>
          </Link>
          <span className="tooltip">Tickets</span>
        </li>

        <li>
          <Link href="/dashboard" className="button-sidebar">
            <i id="dashboardIcone" className="bx bx-grid-alt"></i>
            <span id="dashboardTexto" className="links_name">
              Dashboard
            </span>
          </Link>
          <span className="tooltip">Dashboard</span>
        </li>
      </ul>
    </div>
  );
}
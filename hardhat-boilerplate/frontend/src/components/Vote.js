import React from "react";
import { CodinomeSelect } from "./CodinomeSelect";

export function Vote({ vote, tokenSymbol, voting, alunos }) {
  if (!voting) {
    return (
      <div>
        <h4>Votação</h4>
        <p className="text-muted">A Votação está fechada.</p>
      </div>
    );
  }

  return (
    <div>
      <h4>Votação</h4>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          const formData = new FormData(event.target);
          const codinome = formData.get("codinome");
          const amount = formData.get("amount");

          if (codinome && amount) {
            vote(codinome, amount);
          }
        }}
      >
        <div className="form-group">
          <label>Codinome</label>
          <CodinomeSelect alunos={alunos} />
        </div>
        <div className="form-group">
          <label>Quantidade de {tokenSymbol} (1 or 2)</label>
          <select className="form-control" name="amount" defaultValue="1">
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
        <div className="form-group">
          <input className="btn btn-primary" type="submit" value="Votar" />
        </div>
      </form>
    </div>
  );
}

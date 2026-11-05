import React from "react";
import { CodinomeSelect } from "./CodinomeSelect";

export function AdminPanel({
  voting,
  issueToken,
  updateUser,
  votingOn,
  votingOff,
  tokenSymbol,
  alunos,
}) {
  return (
    <div>
      <h4>Admin</h4>

      <p>
        A votação está <b>{voting ? "aberta" : "fechada"}</b>.{" "}
        {voting ? (
          <button className="btn btn-sm btn-warning" onClick={votingOff}>
            Fechar Votação
          </button>
        ) : (
          <button className="btn btn-sm btn-success" onClick={votingOn}>
            Abir Votação
          </button>
        )}
      </p>

      <h5>Dar tokens</h5>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.target);
          const codinome = formData.get("codinome");
          const amount = formData.get("amount");
          if (codinome && amount) {
            issueToken(codinome, amount);
          }
        }}
      >
        <div className="form-group">
          <label>Codinome</label>
          <CodinomeSelect alunos={alunos} />
        </div>
        <div className="form-group">
          <label>Quantidade de {tokenSymbol}</label>
          <input
            className="form-control"
            type="number"
            step="1"
            min="1"
            name="amount"
            placeholder="1"
            required
          />
        </div>
        <div className="form-group">
          <input className="btn btn-primary" type="submit" value="Issue" />
        </div>
      </form>

      <h5>Registrar usuário</h5>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.target);
          const codinome = formData.get("codinome");
          const addr = formData.get("addr");
          if (codinome && addr) {
            updateUser(codinome, addr);
          }
        }}
      >
        <div className="form-group">
          <label>Codinome</label>
          <input className="form-control" type="text" name="codinome" required />
        </div>
        <div className="form-group">
          <label>Endereço</label>
          <input className="form-control" type="text" name="addr" required />
        </div>
        <div className="form-group">
          <input className="btn btn-primary" type="submit" value="Register" />
        </div>
      </form>
    </div>
  );
}

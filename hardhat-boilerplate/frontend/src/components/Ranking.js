import React from "react";
import { ethers } from "ethers";

export function Ranking({ alunos, tokenSymbol, selectedAddress }) {
  const ordenados = [...alunos].sort((a, b) =>
    b.saldo.gt(a.saldo) ? 1 : b.saldo.lt(a.saldo) ? -1 : 0
  );

  return (
    <div>
      <h4>Ranking</h4>
      <table className="table table-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Codinome</th>
            <th>{tokenSymbol}</th>
          </tr>
        </thead>
        <tbody>
          {ordenados.map((aluno, i) => (
            <tr
              key={aluno.codinome}
              className={
                aluno.endereco.toLowerCase() === selectedAddress.toLowerCase()
                  ? "table-primary"
                  : undefined
              }
            >
              <td>{i + 1}</td>
              <td>{aluno.codinome}</td>
              <td>{ethers.utils.formatUnits(aluno.saldo, 18)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

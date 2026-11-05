import React from "react";

export function CodinomeSelect({ alunos }) {
  return (
    <select className="form-control" name="codinome" required defaultValue="">
      <option value="" disabled>
        Selecione um aluno
      </option>
      {alunos.map((aluno) => (
        <option key={aluno.codinome} value={aluno.codinome}>
          {aluno.codinome}
        </option>
      ))}
    </select>
  );
}

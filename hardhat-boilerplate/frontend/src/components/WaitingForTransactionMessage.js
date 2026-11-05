import React from "react";

export function WaitingForTransactionMessage({ txHash }) {
  return (
    <div className="alert alert-info" role="alert">
      Esperando pela transação <strong>{txHash}</strong>....
    </div>
  );
}

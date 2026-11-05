import React from "react";

export function TransactionSuccessMessage({ txHash, dismiss }) {
  return (
    <div className="alert alert-success" role="alert">
      Transação confirmada: <strong>{txHash}</strong>
      <button
        type="button"
        className="close"
        aria-label="Close"
        onClick={dismiss}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}

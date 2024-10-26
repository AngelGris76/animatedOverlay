const Dialog = ({ onAcept, onCancel }) => {
  return (
    <div>
      <p>Esta seguro que quiere aceptar</p>
      <button type="button" onClick={onAcept}>
        aceptar
      </button>
      <button type="button" onClick={onCancel}>
        cancelar
      </button>
    </div>
  );
};
export default Dialog;

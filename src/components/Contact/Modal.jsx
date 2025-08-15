import s from "./Modal.module.css";

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className={s.backdrop} onClick={onClose}>
      <div className={s.panel} onClick={(e) => e.stopPropagation()}>
        {title && <h3 className={s.title}>{title}</h3>}
        {children}
        <div className={s.actions}>
          <button className="btn" onClick={onClose}>Отмена</button>
          <button className="btn-primary px-4 py-2 rounded-md" onClick={onClose}>Отправить</button>
        </div>
      </div>
    </div>
  );
}

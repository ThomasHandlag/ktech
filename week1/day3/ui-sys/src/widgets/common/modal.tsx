export type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
  closeLabel?: string;
  isShow: boolean;
  onClickOutside?: () => void;
};

const Modal = (props: ModalProps) => {
  return (
    <div onClick={(e) => {
      if (e.target === e.currentTarget) {
        props.onClickOutside?.();
      }
    }}
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 ${
        props.isShow ? "visible" : "hidden"
      }`}
    >
      <div className={`bg-white p-4 rounded shadow-lg ${props.className}`}>
        {props.title && (
          <h2 className="text-lg font-semibold mb-4">{props.title}</h2>
        )}
        {props.children}
        <button
          onClick={props.onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          {props.closeLabel || "Close"}
        </button>
      </div>
    </div>
  );
};

export default Modal;

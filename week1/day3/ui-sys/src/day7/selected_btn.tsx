type SelectedBtnProps = {
  isSelected: boolean;
  onClick?: () => void;
  label: string;
}

const SelectedBtn = (props: SelectedBtnProps) => {
    return (
        <button
            className={`px-4 py-2 rounded-md shadow-md capitalize text-nowrap ${
                props.isSelected ? "bg-indigo-500" : "bg-gray-300"
            }`}
            onClick={props.onClick}
        >
            {props.label}
        </button>
    );
};

export default SelectedBtn;

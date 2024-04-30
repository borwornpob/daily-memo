export const SwitchButton = ({
  checked,
  onChange,
  name,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  name: string;
}) => {
  return (
    <>
      {!checked ? (
        <button
          className="btn btn-xs btn-primary"
          onClick={() => {
            onChange(false);
          }}
        >
          {name}
        </button>
      ) : (
        <button
          className="btn btn-xs btn-secondary"
          onClick={() => {
            onChange(true);
          }}
        >
          {name}
        </button>
      )}
    </>
  );
};

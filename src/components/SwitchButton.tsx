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
          className="btn btn-xs btn-primary mr-4"
          onClick={() => {
            onChange(false);
          }}
        >
          {name}
        </button>
      ) : (
        <button
          className="btn btn-xs btn-secondary mr-4"
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

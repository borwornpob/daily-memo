import Image from "next/image";

interface UserCardProps {
  name: string;
  avatar?: string;
}

const defaultProps: UserCardProps = {
  name: "Borwornpob Thumrongchotikhun",
};

const UserCard = (props: UserCardProps) => {
  // turn John Doe to JD
  const nameFormatted = props.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="bg-base-100 rounded-md p-2 space-x-2 flex flex-row items-center">
      <div className="avatar">
        {props.avatar ? (
          <Image
            src={props.avatar}
            alt="avatar"
            width={10}
            height={10}
            className="rounded-full"
          />
        ) : (
          <div className="avatar placeholder">
            <div className="bg-accent text-neutral-content rounded-full w-10">
              <span>{nameFormatted}</span>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <span className="font-bold">{props.name}</span>
      </div>
    </div>
  );
};

UserCard.defaultProps = defaultProps;

export { UserCard };

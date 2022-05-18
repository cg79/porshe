import { AvatarProps } from "../data-types/data-types";

const Avatar = (props: AvatarProps) => {
  const { picture } = props;

  if (!picture) {
    return null;
  }
  return (
    <div className="avatar-container">
      <img src={picture} className="avatar" />
    </div>
  );
};

export default Avatar;

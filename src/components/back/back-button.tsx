import { useRouter } from "next/router";

const BackButton = () => {
  const router = useRouter();

  const btnClick = () => {
    router.back();
  };

  return (
    <div onClick={btnClick} style={{width:"25px",color:"green", cursor:"pointer"}}>
      <img src="/static/back-arrow.svg"></img>
    </div>
  );
};

export default BackButton;

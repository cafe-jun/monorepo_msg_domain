import SoundOffIcon from "@assets/buttons/sound-off-btn.svg";
import SoundOnIcon from "@assets/buttons/sound-on-btn.svg";
import ControlButton from "@components/ControlButton";

function SoundControlButton() {
  //   const [isSoundOn, setIsSoundOn] = useRecoilState(isSoundOnState);
  const handleControl = () => {
    console.log("test");
  };
  return (
    <ControlButton
      onClick={handleControl}
      //   onClick={() => setIsSoundOn((prev) => !prev)}
      labelText={`SOUND ${true ? "ON" : "OFF"}`}
      aria-label={`효과음 ${true ? "켜짐" : "꺼짐"}`}
    >
      {/* {isSoundOn ? (
        <img src={SoundOnIcon} alt="효과음 켜짐" />
      ) : (
        <img src={SoundOffIcon} alt="효과음 꺼짐" />
      )} */}
    </ControlButton>
  );
}

export default SoundControlButton;

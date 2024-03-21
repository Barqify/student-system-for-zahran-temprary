import { component$ } from "@builder.io/qwik";
interface Props {
  src: string;
  speed: number;
  style: {
    width: string;
    height: string;
  }
  loop: boolean;
  autoPlay: boolean;
}
export default component$<Props>((props) => {
  return (
    <>
      <lottie-player
        src={props.src}
        background="Transparent"
        speed={props.speed}
        style={props.style}
        direction={1}
        mode="normal"
        loop={props.loop}
        autoPlay={props.autoPlay}
      />
      <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
    </>
  );
});

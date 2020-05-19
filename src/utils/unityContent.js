import Unity, { UnityContent } from "react-unity-webgl";


const unityContent = new UnityContent(
    `${process.env.PUBLIC_URL}/games/Build/games.json`,
    `${process.env.PUBLIC_URL}/games/Build/UnityLoader.js`,
    {
      unityVersion: 2019.1
    }
  );

  export default unityContent;
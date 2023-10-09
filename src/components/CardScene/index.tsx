import React from "react";
import { useThree } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import "./styles.css";
import NewsCard from "../NewsCard/indes";
import { observer } from "mobx-react-lite";

const CardSceneComponent: React.FC = () => {
  const viewport = useThree((state) => state.viewport);
  const padding = 20;
  const cameraProps = {
    left: -viewport.width / 2 - padding,
    right: viewport.width / 2 + padding,
    top: viewport.height / 2 + padding,
    bottom: -viewport.height / 2 - padding,
    near: 0.1,
    far: 1000,
    position: [0, 0, 5] as unknown as THREE.Vector3,
  };

  return (
    <>
      <OrthographicCamera makeDefault {...cameraProps} />
      <NewsCard />
    </>
  );
};

export const CardScene = observer(CardSceneComponent);

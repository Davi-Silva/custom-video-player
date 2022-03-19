import styled from "styled-components";
import { IVideo } from "@interfaces/components/Video";
import { fade } from "@styles/animations";

export const Container = styled.div<IVideo>`
  width: 100%;
  position: ${({ isFullscreen }) => (isFullscreen ? "fixed" : "relative")};
  ${({ isFullscreen }) =>
    isFullscreen && "left: 0; right: 0;height: 100%; background: #000"};
`;

export const ControlsOverlay = styled.div`
  font-size: 1.6rem;
  position: absolute;
  color: #fff;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: grid;
  grid-template-areas:
    "top top top"
    "left center right"
    "left center right"
    "bottom bottom bottom";
`;

export const CenterControls = styled.div`
  grid-area: center;
  display: flex;
  align-items: center;
  justify-content: center;
  .active {
    animation: ${fade} 0.5s linear forwards;
  }
  .playIcon {
    opacity: 0;
    svg {
      font-size: 2rem;
    }
  }
`;

export const TopControls = styled.div`
  grid-area: top;
`;

export const LeftControls = styled.div`
  grid-area: left;
  display: flex;
  align-items: center;
  justify-content: center;
  .active {
    animation: ${fade} 0.5s linear forwards;
  }
  .backwardsIcon {
    opacity: 0;
    svg {
      font-size: 2rem;
    }
  }
`;

export const RightControls = styled.div`
  grid-area: right;
  display: flex;
  align-items: center;
  justify-content: center;
  .active {
    animation: ${fade} 0.5s linear forwards;
  }
  .forwardsIcon {
    opacity: 0;
    svg {
      font-size: 2rem;
    }
  }
`;

export const BottomControls = styled.div`
  grid-area: bottom;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 0 0.9rem 0.9rem 0.9rem;
`;

export const ControlsContainer = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
  align-items: center;
  padding: 1rem;
  border-radius: 0.5rem;
  transition: background 0.3s ease-in-out;
  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }
`;

export const BottomLeftControlsGroup = styled.div`
  display: flex;
  gap: 1.2rem;
`;

export const BottomRightControlsGroup = styled.div`
  display: flex;
  gap: 1.2rem;
`;

export const PlayButton = styled.div`
  cursor: pointer;
  svg {
    font-size: 1.4rem;
  }
`;

export const VolumeButton = styled.div`
  cursor: pointer;
  svg {
    font-size: 1.6rem;
  }
`;

export const VolumeAndSliderContainer = styled.div`
  position: relative;
`;

export const VolumeSliderContainer = styled.div`
  background: rgba(0, 0, 0, 0.5);
  border-radius: 0.5rem;
  padding: 1rem;
  position: absolute;
  transform: translateY(-11.5rem);
`;

export const VolumeSlider = styled.div`
  background: rgba(255, 255, 255, 0.5);
  border-radius: 0.5rem;
  width: fit-content;
  height: 8rem;
  transform: rotate(180deg);
  cursor: pointer;
  div {
    border-radius: 4rem;
    background: rgba(255, 255, 255, 1);
    width: 0.25rem;
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 0.25rem;
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  background: rgba(148, 148, 148, 0.4);
  &:focus {
    outline: red;
  }
`;

export const CurrentProgressBar = styled.div`
  height: 100%;
  width: 0%;
  background: red;
  border-radius: 1rem;
  overflow: hidden;
`;

export const TimeContainer = styled.div`
  font-size: 1.2rem;
  display: flex;
  flex-direction: row;
  gap: 0.4rem;
  align-items: center;
`;

export const SettingsButton = styled.div`
  cursor: pointer;
  svg {
    font-size: 1.4rem;
  }
`;

export const FullscreenButton = styled.div`
  cursor: pointer;
  svg {
    font-size: 1.4rem;
  }
`;

export const PictureInPictureButton = styled.div`
  cursor: pointer;
  svg {
    font-size: 1.4rem;
  }
`;

export const VideoContainer = styled.video`
  z-index: 1;
`;

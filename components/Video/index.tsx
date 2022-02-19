import { useRef, useState, useEffect, useCallback } from "react";
import {
  FaPlay,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaPause,
  FaCompress,
  FaCog,
  FaExternalLinkAlt,
} from "react-icons/fa";

import {
  Container,
  VideoContainer,
  ControlsOverlay,
  CenterControls,
  TopControls,
  BottomControls,
  LeftControls,
  RightControls,
  PlayButton,
  ControlsContainer,
  VolumeButton,
  BottomLeftControlsGroup,
  BottomRightControlsGroup,
  FullscreenButton,
  SettingsButton,
  PictureInPictureButton,
  ProgressBar,
  CurrentProgressBar,
  TimeContainer,
} from "@styles/components/Video";

const Video = () => {
  const ref = useRef(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const video: HTMLVideoElement = ref.current.querySelector("video");
    video.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const video: HTMLVideoElement = ref.current.querySelector("video");
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }, [isPaused]);

  const handlePlayVideo = useCallback(() => {
    setIsPaused(!isPaused);
  }, [isPaused]);

  const toggleMuteVideo = useCallback(() => {
    setIsMuted(!isMuted);
  }, [isMuted]);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  const handlePictureInPicture = useCallback(() => {
    const video: HTMLVideoElement = ref.current.querySelector("video");
    video.requestPictureInPicture();
  }, []);

  const handlePlayonSpaceBar = (e) => {
    if (e.keyCode == 32) {
      const video: HTMLVideoElement = ref.current.querySelector("video");
      handlePlayVideo();
    }
  };

  const getCurrentTime = (container: HTMLElement, video: HTMLVideoElement) => {
    let currentMinutes = Math.floor(video.currentTime / 60);
    let currentSeconds = Math.floor(video.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(video.duration / 60);
    let durationSeconds = Math.floor(video.duration - durationMinutes * 60);

    const currentTime = container.querySelector("#currentTime");
    const duration = container.querySelector("#duration");

    currentTime.innerHTML = `${currentMinutes}:${
      currentSeconds < 10 ? "0" + currentSeconds : currentSeconds
    }`;
    duration.innerHTML = `${durationMinutes}:${durationSeconds}`;
  };

  const handleTimeUpdate = () => {
    const videoContainer: HTMLVideoElement = ref.current;
    const video: HTMLVideoElement = videoContainer.querySelector("video");

    getCurrentTime(videoContainer, video);
    const percentage = (video.currentTime / video.duration) * 100;

    const progressBar: HTMLElement =
      videoContainer.querySelector("#currentProgress");

    progressBar.style.width = `${percentage}%`;
  };

  const handleClickProgress = (e) => {
    const progressBar: HTMLElement = ref.current.querySelector("#progressBar");
    const video: HTMLVideoElement = ref.current.querySelector("video");

    const progressTime =
      (e.nativeEvent.offsetX / progressBar.offsetWidth) * video.duration;

    video.currentTime = progressTime;
  };

  const handleDoubleClickLeft = () => {
    const video: HTMLVideoElement = ref.current.querySelector("video");
    video.currentTime -= 10;
  };

  const handleDoubleClickRight = () => {
    const video: HTMLVideoElement = ref.current.querySelector("video");
    video.currentTime += 10;
  };

  const handleDoubleClickCenter = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Container
      ref={ref}
      isFullscreen={isFullscreen}
      onKeyPress={(e) => handlePlayonSpaceBar(e)}
    >
      <ControlsOverlay>
        <TopControls></TopControls>
        <LeftControls onDoubleClick={handleDoubleClickLeft}></LeftControls>
        <CenterControls
          onClick={handlePlayVideo}
          onDoubleClick={handleDoubleClickCenter}
        />
        <RightControls onDoubleClick={handleDoubleClickRight}></RightControls>
        <BottomControls>
          <ControlsContainer>
            <BottomLeftControlsGroup>
              <PlayButton onClick={handlePlayVideo}>
                {isPaused ? <FaPause /> : <FaPlay />}
              </PlayButton>
              <VolumeButton onClick={toggleMuteVideo}>
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </VolumeButton>
            </BottomLeftControlsGroup>
            <ProgressBar
              onClick={(e) => handleClickProgress(e)}
              id="progressBar"
            >
              <CurrentProgressBar id="currentProgress" />
            </ProgressBar>
            <BottomRightControlsGroup>
              <TimeContainer>
                <span id="currentTime">0:00</span>
                {"/"}
                <span id="duration">0:00</span>
              </TimeContainer>
              <SettingsButton>
                <FaCog />
              </SettingsButton>
              <PictureInPictureButton onClick={handlePictureInPicture}>
                <FaExternalLinkAlt />
              </PictureInPictureButton>
              <FullscreenButton onClick={toggleFullscreen}>
                {isFullscreen ? <FaCompress /> : <FaExpand />}
              </FullscreenButton>
            </BottomRightControlsGroup>
          </ControlsContainer>
        </BottomControls>
      </ControlsOverlay>
      <VideoContainer
        controls={false}
        height="100%"
        width="100%"
        onTimeUpdate={handleTimeUpdate}
        autoPlay={false}
        // onKeyPress={}
      >
        <source src={`${process.env.VIDEO_ENDPOINT}/stream/video`} />
      </VideoContainer>
    </Container>
  );
};

export default Video;

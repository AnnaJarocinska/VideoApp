const WatchVideoModal = ({ videoId, close }) => (
  <>
    <iframe
      title={videoId}
      type="text/html"
      width="640"
      height="360"
      src={`http://www.youtube.com/embed/${videoId}?autoplay=1`}
    />
    <button onClick={() => close(null)}>x</button>
  </>
);

export default WatchVideoModal;

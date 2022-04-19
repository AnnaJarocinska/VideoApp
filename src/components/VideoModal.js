const WatchVideoModal = ({ src, close }) => ( <>
    <iframe
      title={src}
      type="text/html"
      width="640"
      height="360"
      src= {src}
    />
    <button onClick={() => close(null)}>x</button>
  </>
);

export default WatchVideoModal;

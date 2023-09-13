import { Image } from 'antd';

function ImageForGrid (props) {
  return (
    <span>
        <Image
            src={props.src}
        />
    </span>
  );
};

export default ImageForGrid;
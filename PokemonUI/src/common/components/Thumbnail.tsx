import React, { useEffect, useState } from "react";

//
// It renders an image.
//

const Thumbnail = (props: { file: any; alt?: string }) => {
  const [thumb, setThumb] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.file != null) {
      setLoading(true);
      let reader = new FileReader();

      reader.onloadend = () => {
        setLoading(false);
        setThumb(reader.result);
      };

      reader.readAsDataURL(props.file);
    }
  }, [props.file]);

  return (
    <div>
      {loading && <p>loading...</p>}

      {!loading && <img src={thumb} alt={props.alt !== "" ? props.alt : props.file} className="img-thumbnail" />}
    </div>
  );
};

export default Thumbnail;

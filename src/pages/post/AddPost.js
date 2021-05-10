import { useContext, useState } from "react";
import { Context } from "../../contexts/ContextProvider";
import AddPost2 from "./AddPost2";
import img1 from "../../images/img1.gif";
import img2 from "../../images/img2.gif";
import img3 from "../../images/img3.gif";
import img4 from "../../images/img4.gif";

function AddPost(prop) {
  const { zone } = useContext(Context);
  const [zid, setZid] = useState(null);
  const [isZoneChoose, setIsZoneChoose] = useState(false);
  const handleZoneChoose = (zid) => {
    setIsZoneChoose(true);
    setZid(zid);
  };

  const Img = [img1, img2, img3, img4];

  return (
    <div className="container">
      {isZoneChoose ? (
        <AddPost2
          zid={zid}
          setIsZoneChoose={setIsZoneChoose}
          setIsAddPost={prop.setIsAddPost}
        />
      ) : (
        <>
          <div className="text-center">
            <h2>Choose Topic Type</h2>
          </div>
          <div className="row">
            {zone.map((item, index) => (
              <div
                onClick={() => handleZoneChoose(item.id)}
                key={index}
                style={{ cursor: "pointer" }}
                className="col-12 col-md-6 p-3 text-center"
              >
                <img
                  src={Img[+item.Images - 1]}
                  width={400}
                  height={300}
                  alt={item.Images}
                />

                <h5 className="text-center">{item.ZoneName}</h5>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default AddPost;

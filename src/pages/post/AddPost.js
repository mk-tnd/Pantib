import { useContext, useState } from "react";
import { Context } from "../../contexts/ContextProvider";
import AddPost2 from "./AddPost2";

function AddPost(prop) {
  const { zone } = useContext(Context);
  const [zid, setZid] = useState(null);
  const [isZoneChoose, setIsZoneChoose] = useState(false);
  const handleZoneChoose = (zid) => {
    setIsZoneChoose(true);
    setZid(zid);
  };
  console.log(zone);
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
                className="col-12 col-md-6"
              >
                <img src={item.Images} alt={item.ZoneName} />
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

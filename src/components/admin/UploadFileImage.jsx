import React, { useState } from "react";
import { toast } from "react-toastify";
import Resize from "react-image-file-resizer";
import { removeFiles, uploadFiles } from "../../api/product";
import useEcomStore from "../../store/ecom-store";
import { Loader, X } from "lucide-react";
const UploadFileImage = ({ dataForm, setDataForm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const token = useEcomStore((state) => state.token);
  const handleOnChange = (e) => {
    setIsLoading(true);
    const files = e.target.files;
    if (files) {
      setIsLoading(true);
      let allFiles = dataForm.images; // [] array empty
      for (let i = 0; i < files.length; i++) {
        // console.log(files[i]);
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast.error(`File ${file.name} is not images`);
          continue;
        }

        // Image Resize
        Resize.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (data) => {
            // Endpoint Backend
            // console.log("data", data);
            uploadFiles(token, data)
              .then((res) => {
                console.log(res);
                allFiles.push(res.data);
                setDataForm({ ...dataForm, images: allFiles });
                setIsLoading(false);
                toast.success("Upload Image Success");
              })
              .catch((err) => {
                setIsLoading(false);
                console.log(err);
              });
          },
          "base64"
        );
      }
    }
  };
  // console.log(dataForm);
  const handleDelete = (public_id) => {
    // console.log(public_id);
    const images = dataForm.images;
    removeFiles(token, public_id)
      .then((res) => {
        const filterImages = images.filter((item, index) => {
          // console.log(item);
          return item.public_id !== public_id;
        });
        console.log("filterImages : ", filterImages);
        setDataForm({ ...dataForm, images: filterImages });
        toast.error(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="my-4">
      <div className="flex mx-4 my-4 gap-4">
        {isLoading && <Loader className="animate-spin w-16 h-16" />}

        {dataForm.images.map((item, index) => (
          <div className="relative" key={index}>
            <img
              className="w-24 h-24 hover:scale-105 rounded-lg"
              src={item.url}
            />
            <span
              className="absolute top-1 right-1 bg-red-500  rounded-2xl cursor-pointer p-1 flex items-center justify-center hover:scale-110"
              onClick={() => handleDelete(item.public_id)}
            >
              <X className="w-4 h-4" />
            </span>
          </div>
        ))}
      </div>
      <div>
        <input type="file" name="images" multiple onChange={handleOnChange} />
      </div>
    </div>
  );
};

export default UploadFileImage;

import axios from "axios";
// import { UserState } from "../components/context/UserProvider";
import Resizer from "react-image-file-resizer";
import { auth } from "../firebase";

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

export const fileUploadAndResize = async (file) => {
  // const user = JSON.parse(window.localStorage.getItem("user"));
  // console.log(file);
  const authToken = await auth.currentUser.getIdToken();
  if (file) {
    const resizedFileUri = await resizeFile(file);
    return axios.post(
      `${process.env.REACT_APP_API}/uploadimages`,
      {
        image: resizedFileUri,
      },
      {
        headers: {
          authtoken: authToken,
        },
      }
    );
  }
};

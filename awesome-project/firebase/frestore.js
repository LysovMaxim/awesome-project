import { collection, addDoc } from "firebase/firestore";
import { db } from "./config";

export const writeDataToFirestore = async ({
  login,
  userId,
  imageUser,
  password,
  email,
}) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      email: email,
      password: password,
      imageUser: imageUser,
      login: login,
      userId: userId,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const writeDataToFirestorePost = async ({
  photo,
  location,
  locationTitle,
  namePost,
  login,
  userId,
  comments,
  likes
}) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      login: login,
      userId: userId,
      photo: photo,
      location: location,
      locationTitle: locationTitle,
      namePost: namePost,
      comments: comments,
      likes: likes,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

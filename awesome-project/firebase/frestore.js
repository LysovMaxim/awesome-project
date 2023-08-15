import { collection, addDoc, } from "firebase/firestore";
import { db } from "./config";

export const writeDataToFirestore = async ({
  login,
  userId,
  imageUser,
  password,
  email
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
// export const getDataFromFirestore = async ({ email }) => {
//   try {
//     const snapshot = await getDocs(collection(db, "users"));
//     console.log(snapshot);
//     // Перевіряємо у консолі отримані дані
//     snapshot.forEach((doc) => console.log(`${doc.id} =>`, doc.data()));
//     //   const user = snapshot.find(user => user.data.email === email)

//     // Повертаємо масив обʼєктів у довільній формі
//     // return snapshot.map((doc) => ({ id: doc.id, data: doc.data() }));
//     //   return console.log(user)
//   } catch (error) {
//     // console.log(error);
//     throw error;
//   }
// };

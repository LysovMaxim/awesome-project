import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import rectangle from "../pictures/rectangle.png";
import ellipse from "../pictures/ellipse.png";
import ellipse2 from "../pictures/ellipse2.png";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { doc, updateDoc, addDoc, collection, getDocs, increment, query, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase/config';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

// const COURSES = [
//   {
//     id: "1",
//     photo: ellipse,
//     comment:
//       "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
//     date: "09 червня 2020",
//     clock: "08:40",
//   },
//   {
//     id: "2",
//     photo: ellipse2,
//     comment:
//       "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
//     date: "09 червня 2020",
//     clock: "08:42",
//     autor: 1,
//   },
//   {
//     id: "3",
//     photo: ellipse,
//     comment: "Thank you! That was very helpful!",
//     date: "09 червня 2020",
//     clock: "08:44",
//   },
// ];

export const CommentsScreen = () => {
  // const [courses, setCourses] = useState(COURSES);
  const [comments, setComments] = useState([]);

  [comment, setComment] = useState('');
  const { imageUser,login,userId } = useSelector((state) => state.auth);

  const navigation = useNavigation();

  const { params } = useRoute();

    useEffect(() => {
      
       const postRef = doc(db, 'posts', params.postId);
      const commentsCollectionRef = collection(postRef, 'comments');

    onSnapshot(commentsCollectionRef, (data) => {
      const commentsData = data.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      console.log(commentsData)
      setComments(commentsData);
    });
  }, []);

    const onPost = async () => {
        try {
            const postId = params && params.postId;
            if (!postId) {
                console.log('postId отсутствует в params');
                return;
            }

            const postRef = doc(db, 'posts', postId);
            const commentsCollectionRef = collection(postRef, 'comments');

            await addDoc(commentsCollectionRef, {
              login,
              imageUser,
              comment,
              userId,
              date: format(new Date(), 'dd MMMM, yyyy | HH:mm', { locale: uk }),
            });

            await updateDoc(postRef, {
                comments: increment(1),
            });
            console.log("документ создан");
        } catch (error) {
            console.log(error);
        }

        setComment('');
    };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.registr}>Коментарі</Text>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.post}>
          <Image source={{ uri: params.uri }} style={{ width: 343, height:240}}/>
        </View>
        <ScrollView style={styles.scrollView}>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <View key={comment.data.id}>
                <View
                  style={{
                    marginTop: 24,
                    flexDirection: userId === comment.data.userId ? "row-reverse" : "row",
                  }}
                >
                  <Image
                    style={{
                      marginRight: userId === comment.data.userId ? 0 : 16,
                      marginLeft: userId === comment.data.userId ? 16 : 0,
                      width: 28,
                      height: 28,
                      backgroundColor: "#F6F6F6",
                      borderRadius: 50
                    }}
                    source={{ uri: comment.data.imageUser }}
                  />
                  <View style={styles.messageText}>
                    <Text key={comment.id}>{comment.data.comment}</Text>
                    <Text
                      style={{
                        marginTop: 8,
                        color: "#BDBDBD",
                        fontFamily: "Roboto-Regular",
                        fontSize: 10,
                        fontWeight: 400,
                        left: userId === comment.data.userId ? 151 : null,
                      }}
                    >
                      {comment.data.date}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          ):<Text>No comments yet</Text>}
        </ScrollView>
        <TextInput
          style={{
            marginTop: 16,
            backgroundColor: "#F6F6F6",
            borderWidth: 1,
            borderRadius: 100,
            width: "100%",
            height: 50,
            padding: 16,
            borderColor: "#E8E8E8",
          }}
          placeholder="Коментувати..."
          value={comment}
          onChangeText={setComment}
              
        />
        <TouchableOpacity style={styles.btnSend} onPress={onPost}>
          <Feather name="arrow-up" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 343,
    alignSelf: "center",
  },
  header: {
    height: 88,
    paddingBottom: 11,
    paddingTop: 55,
    borderBottomWidth: 1,
    borderBottomColor: "#b3b3b3",
  },
  registr: {
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,
  },
  back: {
    position: "absolute",
    left: 16,
    top: 54,
  },
  post: {
    alignItems: "center",
    justifyContent: "center",
    top: 32,
    height: 240,
    backgroundColor: "#F6F6F6",
    width: 343,
    alignSelf: "center",
    
  },
  scrollView: {
    marginTop: 60,
    height:328
  },
  messagePhoto: {
    marginRight: 16,
  },
  messageText: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    width: 299,
    backgroundColor: "#F6F6F6",
    borderTopLeftRadius: 6,
    borderBottomEndRadius: 6,
    borderBottomLeftRadius: 6,
  },
  btnSend: {
    alignItems: "center",
    justifyContent: "center",
    top: 652,
    left: 300,
    position: "absolute",
    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
});

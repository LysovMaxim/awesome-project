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
import { useState } from "react";

const COURSES = [
  {
    id: "1",
    photo: ellipse,
    comment:
      "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
    date: "09 червня 2020",
    clock: "08:40",
  },
  {
    id: "2",
    photo: ellipse2,
    comment:
      "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
    date: "09 червня 2020",
    clock: "08:42",
    autor: 1,
  },
  {
    id: "3",
    photo: ellipse,
    comment: "Thank you! That was very helpful!",
    date: "09 червня 2020",
    clock: "08:44",
  },
];

export const CommentsScreen = () => {
  const [courses, setCourses] = useState(COURSES);
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.registr}>Коментарі</Text>
        <TouchableOpacity style={styles.back}>
          <AntDesign name="arrowleft" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.post}>
          <Image source={rectangle} />
        </View>
        <ScrollView style={styles.scrollView}>
          {courses.map((course) => (
            <View key={course.id}>
              <View
                style={{
                  marginTop: 24,
                  flexDirection: course.autor === 1 ? "row-reverse" : "row",
                }}
              >
                <Image
                  style={{
                    marginRight: course.autor === 1 ? 0 : 16,
                    marginLeft: course.autor === 1 ? 16 : 0,
                  }}
                  source={course.photo}
                />
                <View style={styles.messageText}>
                  <Text key={course.id}>{course.comment}</Text>
                  <Text
                    style={{
                      marginTop: 8,
                      color: "#BDBDBD",
                      fontFamily: "Roboto-Regular",
                      fontSize: 10,
                      fontWeight: 400,
                      left: course.autor === 1 ? 151 : null,
                    }}
                  >
                    {course.date} | {course.clock}
                  </Text>
                </View>
              </View>
            </View>
          ))}
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
        />
        <TouchableOpacity style={styles.btnSend}>
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
    marginTop: 30,
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

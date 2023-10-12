import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import useLike from "../hooks/useLike.js";
import useComment from "../hooks/useComment.js";
import useShare from "../hooks/useShare.js";
import PostButton from "./PostButton.js";
export default function Post(props) {
  const { like, isLike, setLike, setisLike } = useLike(
    props.like,
    props.isLike
  );
  const { comment, isComment, setComment, setisComment } = useComment(
    props.comment,
    props.isComment
  );
  const { share, isShare, setShare, setisShare } = useShare(
    props.share,
    props.isShare
  );

  const LikeAction = () => {
    if (isLike) {
      setLike(like - 1);
    } else {
      setLike(like + 1);
    }
    setisLike(!isLike);
  };

  const CommentAction = () => {
    if (isComment) {
      setComment(comment - 1);
    } else {
      setComment(comment + 1);
    }
    setisComment(!isComment);
  }

  const ShareAction = () =>{
    if (isShare) {
      setShare(share - 1);
    } else {
      setShare(share + 1);
    }
    setisShare(!isShare);
  }

  return (
    <View style={styles.post}>
      <View style={styles.user}>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            borderColor: "hotpink",
            borderWidth: "1px",
          }}
          source={{ uri: props.avatar }}
        />
        <Text style={styles.username}> {props.author} </Text>
      </View>
      <View style={styles.body}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {props.content}
        </Text>
        <Image
          style={{ width: "100%", height: 400, borderRadius: 10 }}
          source={{ uri: props.image }}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.like}>{like} Likes</Text>
        <Text style={styles.comment}>{comment} Comments</Text>
        <Text>{share} Share</Text>
      </View>
      <View style={styles.action}>
          <PostButton icon="heart" text="like" handleOnClick={LikeAction} color="hotpink"/>
          <PostButton icon="comment" text="comment" handleOnClick={CommentAction} color="blue"/>
          <PostButton icon="share" text="share" handleOnClick={ShareAction} color="red"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "pink",
    padding: 15,
    backgroundColor: "white",
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  info: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  body: {
    marginTop: 10,
  },
  like: {
    marginRight: 10,
    color: "pink",
  },
  comment: {
    marginRight: 10,
    color: "blue",
  },
  action: {
    paddingTop: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: "pink",
  },
});

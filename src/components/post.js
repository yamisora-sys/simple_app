import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable} from "react-native";
import Icon  from 'react-native-vector-icons/FontAwesome'
import {useState} from 'react'
import useLike from '../hooks/useLike.js'
import useComment from '../hooks/useComment.js'
import useShare from '../hooks/useShare.js'
export default function Post(props) {
    const {like, isLike, setLike, setisLike} = useLike(props.like, props.isLike)
    const {comment, isComment, setComment, setisComment} = useComment(props.comment, props.isComment)
    const {share, isShare, setShare, setisShare} = useShare(props.share, props.isShare)
  return (
    <View style={styles.post}>
      <View style={styles.user}>
        <Image
          style={{ width: 50, height: 50, borderRadius: 50 }}
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
        
        <Pressable style={styles.actionlike} onPress={()=>{
            if(isLike){
                setLike(like-1)
            }
            else{
                setLike(like+1)
            }
            setisLike(!isLike)
        }}>
            <Icon name="heart" size={20} color="pink" />
            <Text >Like</Text>
        </Pressable>
        
        
        <Pressable style={styles.actioncomment} onPress={()=>{
            if(isComment){
                setComment(comment-1)
            }
            else{
                setComment(comment+1)
            }
            setisComment(!isComment)
        }}>
            <Icon name="comment" size={20} color="blue" />
            <Text >Comment</Text>
        </Pressable>
        
        
        <Pressable style={styles.actionshare} onPress={()=>{
            if(isShare){
                setShare(share-1)
            }
            else{
                setShare(share+1)
            }
            setisShare(!isShare)
        }}>
            <Icon name="share" size={20} color="pink" />
            <Text>Share</Text>
        </Pressable>
        
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    marginTop: 10,
    marginBottom: 10,
    width: "80%",
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
    width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      borderTopWidth: 1,
      borderColor: 'pink',
  },
    actionlike: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actioncomment: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionshare: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});

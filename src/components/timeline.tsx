import {
  collection,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";

export interface ITweet {
  id: string;
  photo: string;
  tweet: string;
  userId: string;
  username: string;
  createAt: number;
}

const Wrapper = styled.div``;

export default function Timeline() {
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const fetchTweets = async () => {
    const tweetsQuery = query(
      collection(db, "tweets"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(tweetsQuery);
    const result = snapshot.docs.map((doc) => {
      const { tweet, createAt, username, userId, photo } = doc.data();
      return { id: doc.id, tweet, createAt, username, userId, photo };
    });
    setTweets(result);
  };

  useEffect(() => {
    fetchTweets();
  }, []);
  return <Wrapper>{JSON.stringify(tweets)}</Wrapper>;
}

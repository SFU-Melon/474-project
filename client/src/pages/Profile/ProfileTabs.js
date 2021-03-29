import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ProfilePostCard from "./ProfilePostCard";
import NullPost from "./NullPost";
import { useUserContext } from "../../contexts/UserContext";

export default function ProfileTabs(props) {
  const { user } = useUserContext();
  return (
    <Tabs>
      <TabList>
        <Tab>{props.username ? `${props.username}'s Posts` : "Your Posts"}</Tab>
        <Tab>
          {props.username
            ? `Posts ${props.username} Likes`
            : "Posts You've Liked"}
        </Tab>
        {user?.username === props.username && <Tab>{"Saved Posts"}</Tab>}
      </TabList>

      <TabPanel>
        {props.userPosts?.length > 0 ? (
          props?.userPosts.map((post) => (
            <ProfilePostCard key={post.id} post={post}></ProfilePostCard>
          ))
        ) : (
          <NullPost />
        )}
      </TabPanel>
      <TabPanel>
        {props.userLikedPosts?.length > 0 ? (
          props.userLikedPosts?.map((post) => (
            <ProfilePostCard key={post.id} post={post}></ProfilePostCard>
          ))
        ) : (
          <NullPost />
        )}
      </TabPanel>

      <TabPanel>
        {props.savedPosts?.length > 0 ? (
          props.savedPosts?.map((post) => (
            <ProfilePostCard key={post.id} post={post}></ProfilePostCard>
          ))
        ) : (
          <NullPost />
        )}
      </TabPanel>
    </Tabs>
  );
}

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ProfilePostCard from "./ProfilePostCard";
import NullPost from "./NullPost";

export default function ProfileTabs(props) {
  return (
    <Tabs>
      <TabList>
        <Tab>{props.username ? `${props.username}'s Posts` : "Your Posts"}</Tab>
        <Tab>
          {props.username
            ? `Posts ${props.username} Likes`
            : "Posts You've Liked"}
        </Tab>
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
    </Tabs>
  );
}

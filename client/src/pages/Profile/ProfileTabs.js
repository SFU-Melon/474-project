import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PostCard from "../../components/PostCard";
import NullPost from "./NullPost";

export default (props) => (
  <Tabs>
    <TabList>
        <Tab>Your Posts</Tab>
        <Tab>Posts You've Liked</Tab>
    </TabList>

    <TabPanel>
        {props.userPosts?.length > 0 ? props?.userPosts.map((post) => (
            <PostCard key={post.id} post={post}></PostCard>
            )) : <NullPost/>}
    </TabPanel>
    <TabPanel>
        {props.userLikedPosts?.length > 0 ? props.userLikedPosts?.map((post) => (
            <PostCard key={post.id} post={post}></PostCard>
            )) : <NullPost/>}
    </TabPanel>
  </Tabs>
);
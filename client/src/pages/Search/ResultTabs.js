import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ProfilePostCard from "../Profile/ProfilePostCard";
import SmallPlantCard from "./SmallPlantCard";
import SmallUserCard from "./SmallUserCard";
import NullPost from "../Profile/NullPost";

export default function ResultTabs(props) {
  return (
    <Tabs>
      <TabList>
        <Tab>Posts</Tab>
        <Tab>Plants</Tab>
        <Tab>Users</Tab>
      </TabList>

      <TabPanel>
        {props.posts?.length > 0 ? (
          props?.posts.map((post) => (
            <ProfilePostCard key={post.id} post={post}></ProfilePostCard>
          ))
        ) : (
          <NullPost />
        )}
      </TabPanel>

      <TabPanel>
        {props.plants?.length > 0 ? (
          props.plants?.map((plant) => <SmallPlantCard plant={plant} />)
        ) : (
          <NullPost />
        )}
      </TabPanel>

      <TabPanel>
        {props.users?.length > 0 ? (
          props?.users.map((user) => <SmallUserCard person={user} />)
        ) : (
          <NullPost />
        )}
      </TabPanel>
    </Tabs>
  );
}

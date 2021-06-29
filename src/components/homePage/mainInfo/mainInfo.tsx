import React from 'react';
import { Tab, Tabs } from '@material-ui/core';


interface TabProps {
   label?: string,
   href?: string
}

const LinkTab: React.FC<TabProps> = (props) => {
   return (
      <Tab
         component="a"
         onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            event.preventDefault();
         }}
         {...props}
      />
   );
}

interface TabContentProps {
   children?: React.ReactNode;
   index: number;
   value: number;
}

const TabContent: React.FC<TabContentProps> = (props) => {
   return (
      <div
         role="tabpanel"
         hidden={props.value !== props.index}
      >
         {props.value === props.index && (
            <React.Fragment>
               {props.children}
            </React.Fragment>
         )}
      </div>
   )
}

export const MainInfo: React.FC = () => {
   const [value, setValue] = React.useState<number>(0);

   const onTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
   }

   return (
      <div style={{display: 'flex'}}>
         <Tabs
            variant='standard'
            orientation='vertical'
            value={value}
            onChange={onTabChange}
         >
            <LinkTab
               label='Профиль'
               href='/home/profile'
            />
            <LinkTab
               label='История транзакций'
               href='/home/profile'
            />
         </Tabs>
         <TabContent
            value={value}
            index={0}
         >
            <div>Profile</div>
         </TabContent>
         <TabContent
            value={value}
            index={1}
         >
            <div>Transaction info</div>
         </TabContent>
      </div>
   )
}
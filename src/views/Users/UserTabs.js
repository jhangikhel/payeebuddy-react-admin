import React, { useEffect, useState } from 'react'
import { CTab, CTabContent, CTabList, CTabPanel, CTabs } from '@coreui/react'
import axios from 'axios'
import { TranactionHistory } from './TranactionHistory';

export const UserTabs = ({ userId }) => {
   
    const [selectedTab, setSelectedTab] = useState("home")
    
    return (
        <CTabs onChange={setSelectedTab} activeItemKey={selectedTab}>
            <CTabList variant="tabs">
                <CTab itemKey="home">Transactions</CTab>
                <CTab itemKey="profile">Profile</CTab>
                <CTab itemKey="contact">Contact</CTab>
                
            </CTabList>
            <CTabContent>
                <CTabPanel className="p-3" itemKey="home">
                    <TranactionHistory userId={userId} />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="profile">
                    Profile tab content
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="contact">
                    Contact tab content
                </CTabPanel>
               
            </CTabContent>
        </CTabs>
    )
}

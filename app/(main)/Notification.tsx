import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Images from '@/constants/images';
import { Header } from '@/components';
import { rMS } from '@/styles/responsive';

const Notifications = [
   {
    id: 1,
    title: 'Donation Successful',
    message: 'Your donation to the orphans in Healer is       successful',
    date: '11/12/2023',
    icon: Images.Moth,
    backgroundColor: '#FFE5E5',
  },
  {
    id: 2,        
    title: 'Campaign Completed',
    message: 'Your Foundation is completed and $5,700      Education fundraises',
    date: '11/12/2023',
    icon: Images.Moth1,
    backgroundColor: '#FEE2E2',
  },
  {
    id: 3,
    title: 'Donation Cancelled',
    message: 'Your donation to Heal world organization is    cancelled',
    date: '11/12/2023',
    icon: Images.Moth2,
    backgroundColor: '#FEE2E2',
  },
  {
    id: 4,
    title: 'Campaign Published : Ongoing',
    message: 'You have successfully Created a campaign',
    date: '11/12/2023',
    icon: Images.Moth,
    backgroundColor: '#FEE2E2',
  },
  {
    id: 5,
    title: 'Donation Successful',
    message: 'Your donation to the orphans in Healer is        successful',
    date: '11/12/2023',
    icon: Images.Moth1,
    backgroundColor: '#FEE2E2',
  },
  {
    id: 6,
    title: 'Campaign Completed',
    message: 'Your Foundation is completed and $5,700       Education fundraises',
    date: '11/12/2023',
    icon: Images.Moth2,
    backgroundColor: '#FEE2E2',
  },
  {
    id: 7,
    title: 'Donation Cancelled',
    message: 'Your donation to Heal world organization is      cancelled',
    date: '11/12/2023',
    icon: Images.Moth,
    backgroundColor: '#FEE2E2',
  },
  {
    id: 8,
    title: 'Campaign Published :Outgoing',
    message: 'You have successfully Created a campaign', 
    date: '11/12/2023',
    icon: Images.Moth1,
    backgroundColor: '#FEE2E2',
  },
  {
    id: 9,
    title: 'Donation Successful',
    message: 'Your donation to the orphans in Healer is        successful',
    date: '11/12/2023',
    icon: Images.Moth2,
    backgroundColor: '#FEE2E2',
  },
  {
    id: 10,
    title: 'Campaign Completed',
    message: 'Your Foundation is completed and $5,700        Education fundraises',
    date: '11/12/2023',
    icon:Images.Moth1,
    backgroundColor: '#FEE2E2',
  },
  {
    id: 11,
    title: 'Donation Cancelled',
    message: 'Your donation to Heal world organization is         cancelled',
    date: '11/12/2023',
    icon: Images.Moth2,
    backgroundColor: '#FEE2E2',
  },
];

const UnreadNotifications = [
  {
    id: 101,
    title: 'New Request Pending',
    message: 'You have a pending blood donation                 request',
    date: '12/12/2023',
    icon: Images.Moth,
    backgroundColor: '#FEE2E2',
  },
  {
    id: 102,
    title: 'New Message',
    message: 'You received a new message from the      campaign team',
    date: '12/12/2023',
    icon: Images.Moth1,
    backgroundColor: '#FEE2E2',
  },
   {
    id: 103,
    title: 'Donation Cancelled',
    message: 'Your donation to Heal world organization is         cancelled',
    date: '11/12/2023',
    icon: Images.Moth2,
    backgroundColor: '#FEE2E2',
  },
];

const NotificationScreen = () => {
  const [active, setActive] = useState('All');
  const dataToRender = active === 'All' ? Notifications : UnreadNotifications;

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ paddingHorizontal: rMS(16) }}
    >
      {/* Header */}
      <Header title="Notification" menu={true} />

      {/* Tabs */}
      <View
        className="flex-row rounded-full mt-4 self-start"
        style={{
          width: rMS(160),
          height: rMS(40),
          backgroundColor: '#FEE2E2',
        }}
      >
        <TouchableOpacity
          className={`flex-1 items-center justify-center rounded-full ${
            active === 'All' ? 'bg-red' : ''
          }`}
          onPress={() => setActive('All')}
        >
          <Text
            style={{
              fontSize: rMS(12),
              color: active === 'All' ? 'white' : '#7F1D1D',
            }}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 items-center justify-center rounded-full ${
            active === 'Donate' ? 'bg-red' : ''
          }`}
          onPress={() => setActive('Donate')}
        >
          <Text
            style={{
              fontSize: rMS(12),
              color: active === 'Donate' ? 'white' : '#7F1D1D',
            }}
          >
            Unread
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <ScrollView style={{ marginTop: rMS(20) }}>
        {dataToRender.map((item) => (
          <View
            key={item.id}
            className="flex-row rounded-xl mb-3 items-start"
            style={{
              backgroundColor: item.backgroundColor,
              padding: rMS(12),
            }}
          >
            <View
              className="items-center justify-center rounded-xl mr-4"
              style={{
                width: rMS(50),
                height: rMS(50),
                marginTop: rMS(4),
                borderWidth: rMS(2),
                borderColor: '#7F1D1D',
                backgroundColor: '#7F1D1D',
              }}
            >
              <item.icon width={rMS(28)} height={rMS(28)} />
            </View>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <Text
                  style={{
                    fontSize: rMS(16),
                    fontWeight: '600',
                    color: '#7F1D1D',
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontSize: rMS(10),
                    color: '#7F1D1D',
                  }}
                >
                  {item.date}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: rMS(13),
                  color: '#7F1D1D',
                  marginTop: rMS(4),
                }}
              >
                {item.message}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationScreen;

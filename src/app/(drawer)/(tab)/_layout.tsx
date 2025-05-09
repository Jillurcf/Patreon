import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { IconSymbol } from '@/app-example/components/ui/IconSymbol.ios'
import { SvgXml } from 'react-native-svg'
import { IconMessage, IconMessageFocus, IconSearch, IconSearchFocus } from '@/src/assets/icons/icons'

type Props = {}

const _layout = (props: Props) => {
  return (


    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#141316',
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarIconStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{marginTop: "50%", display: "flex", alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <SvgXml
                xml={focused ? IconSearchFocus : IconSearch}
                width={24}
                height={24}
                fill={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="MessageList"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{marginTop: "50%", display: "flex", alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <SvgXml
                xml={focused ? IconMessageFocus : IconMessage}
                width={24}
                height={24}
                fill={color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
    
  
  
  )
}

export default _layout

const styles = StyleSheet.create({})
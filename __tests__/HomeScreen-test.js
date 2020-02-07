import React from "react"
import "react-native"
import HomeScreen from '../screens/HomeScreen'
import renderer from 'react-test-renderer'

test('Home Screen snapshot', () => {
  const snap = renderer.create(
    <HomeScreen />
  ).toJSON()
  expect(snap).toMatchSnapshot()
})
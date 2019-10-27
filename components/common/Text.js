import React from 'react';
import { Text as DefaultText } from 'react-native';

const Text = (props) =>
    <DefaultText style={{ fontSize: 18, fontFamily: "WorkSansLight", ...props.style }}>
        {props.children}
    </DefaultText>
const Title = (props) =>
    <Text style={{ fontSize: 40, marginBottom: 12, ...props.style }}>
        {props.children}
    </Text>
const Subtitle = (props) =>
    <Text style={{ fontSize: 24, ...props.style }}>
        {props.children}
    </Text>
export { Title, Subtitle, Text };

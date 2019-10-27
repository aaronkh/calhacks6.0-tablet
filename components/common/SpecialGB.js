import React from "react";
import {StyleSheet, Text, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 8
  },
  gradient: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black"
  }
});

const SpecialGB = (props) => {
    const {
      children,
      style,
      text,
      textStyle,
      gradientBegin,
      gradientEnd,
      height,
      width,
      radius,
      onPressAction,
      disabled,
    } = props;


    const diagonalGradient = {
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 }
    };

    return (
      <TouchableOpacity
        style={[styles.button, { height, width }, style]}
        onPress={disabled ? null : () => {
          if (onPressAction) {
            return onPressAction();
          }
        }}
      >
          {children}
      </TouchableOpacity>
    );
  }

SpecialGB.defaultProps = {
  gradientBegin: "#00d2ff",
  gradientEnd: "#3a47d5",
  gradientDirection: "horizontal",
  height: 75,
  radius: 25,
  impact: false,
  impactStyle: "Heavy",
  textStyle: {},
  disabled: false,
  disabledGradientBegin: "#D3D3D3",
  disabledGradientEnd: "#696969",
};

export default SpecialGB;
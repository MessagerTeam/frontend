import {FC} from "react";
import {ButtonProps} from "./button.types"
import {Pressable, Text} from "react-native";
import {styles} from "./button.styles"

export const Button:FC<ButtonProps> = ({...props}) => {
    return <Pressable className={`
        h-12 items-center justify-center
        rounded-xl bg-primary px-5
        ${props.disabled ? "opacity-50" : ""}
      `} onPress={() => props.onPress?.()} ><Text>{props.children}</Text></Pressable>
}
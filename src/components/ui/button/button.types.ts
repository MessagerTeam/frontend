
export type ButtonProps = {
    type: 'button' | 'submit' | 'reset',
    children?: React.ReactNode,
    classList?: string[],
    disabled?: boolean,
    onPress?: () => void
}
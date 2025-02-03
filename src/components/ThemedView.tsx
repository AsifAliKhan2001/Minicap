import { Box, BoxProps } from "@gluestack-ui/themed";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = BoxProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <Box bg={backgroundColor} style={style} {...otherProps} />;
}

import { Spinner, Center, Overlay } from "@gluestack-ui/themed";

type LoaderProps = {
  isLoading: boolean;
};

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <Overlay>
      <Center h="$full" w="$full" bg="$backgroundDark800:alpha.60">
        <Spinner size="large" color="$white" />
      </Center>
    </Overlay>
  );
};

export default Loader;

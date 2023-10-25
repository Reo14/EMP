import {
  Flex,
  Menu,
  Link as ChakraLink,
  MenuButton,
  Text,
  Icon,
} from "@chakra-ui/react";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { AppDispatch } from "../../store/configureStore";
import { logOut } from "../../store/reducers/auth";

type NavItemProps = {
  navSize: string;
  title: string;
  icon: React.ComponentType;
  to: string;
};

const NavItem: FC<NavItemProps> = ({ navSize, title, icon, to }) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
    if (to === "/sign-in") {
      dispatch(logOut());
    }
  };
  return (
    <Flex
      mt={10}
      flexDir="column"
      w="100%"
      alignItems={navSize === "small" ? "center" : "flex-start"}
      marginTop="2rem"
    >
      <Menu placement="right">
        <ChakraLink
          p={3}
          borderRadius={8}
          _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
          w={navSize === "large" ? "100%" : undefined}
          as={RouterLink}
          to={to}
          onClick={handleLogout}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon as={icon} fontSize="lg" color="gray.500" />
              <Text ml={2} display={navSize == "small" ? "none" : "flex"}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </ChakraLink>
      </Menu>
    </Flex>
  );
};

export default NavItem;

import {
  Avatar,
  Divider,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  EditIcon,
  InfoOutlineIcon,
  LockIcon,
  UnlockIcon,
  StarIcon,
} from "@chakra-ui/icons";
import { FC, useState } from "react";
import { AppDispatch, RootState } from "../../store/configureStore";
import { useDispatch, useSelector } from "react-redux";
import NavItem from "./NavItems";

type SidebarProps = {
  navSize: string;
  setNavSize: React.Dispatch<React.SetStateAction<string>>;
};

const Sidebar: FC<SidebarProps> = ({ navSize, setNavSize }) => {
  const username = useSelector<RootState, string>(
    (state) => state.auth.username
  );
  const isLoggedIn = useSelector<RootState, boolean>(
    (state) => state.auth.isLoggedIn
  );
  const role = useSelector<RootState, string>((state) => state.auth.role);

  return (
    <Flex
      pos="sticky"
      left="5"
      w={navSize === "small" ? "75px" : "200px"}
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex
        p="0.5rem"
        flexDir="column"
        alignItems={navSize === "small" ? "center" : "flex-start"}
        as="nav"
      >
        <IconButton
          background="none"
          mt={5}
          _hover={{ background: "none" }}
          icon={<HamburgerIcon />}
          aria-label="Toggle Navigation"
          onClick={() => {
            if (navSize === "small") {
              setNavSize("large");
            } else {
              setNavSize("small");
            }
          }}
        />
        {isLoggedIn ? (
          role === "HR" ? (
            <>
              <NavItem
                navSize={navSize}
                title="Employee Profiles"
                icon={EditIcon}
                to="/hr/all-employees"
              />
              <NavItem
                navSize={navSize}
                title="Visa Management"
                icon={InfoOutlineIcon}
                to="/hr/visa-management"
              />
              <NavItem
                navSize={navSize}
                title="Application Review"
                icon={StarIcon}
                to="/hr/hiring-management"
              />
              <NavItem
                navSize={navSize}
                title="Log out"
                icon={UnlockIcon}
                to="/sign-in"
              />
            </>
          ) : (
            <>
              <NavItem
                navSize={navSize}
                title="Personal Infos"
                icon={EditIcon}
                to="/employee-infos"
              />
              <NavItem
                navSize={navSize}
                title="Visa Status"
                icon={InfoOutlineIcon}
                to="/employee-visa"
              />
              <NavItem
                navSize={navSize}
                title="Log out"
                icon={UnlockIcon}
                to="/sign-in"
              />
            </>
          )
        ) : (
          <NavItem
            navSize={navSize}
            title="Log in"
            icon={LockIcon}
            to="/sign-in"
          />
        )}
      </Flex>

      <Flex
        p="0.5rem"
        flexDir="column"
        w="100%"
        alignItems={navSize === "small" ? "center" : "flex-start"}
        mb={4}
        borderTop="5px solid gray"
        display={isLoggedIn ? "flex" : "none"}
      >
        <Divider display={navSize === "small" ? "none" : "flex"} />
        <Flex mt={4} align="center">
          <Avatar size="sm" src="https://bit.ly/dan-abramov" />
          <Flex
            flexDir="column"
            ml={4}
            display={navSize === "small" ? "none" : "flex"}
          >
            <Heading as="h3" size="sm">
              {username}
            </Heading>
            <Text color="gray">{role}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Sidebar;

import {
  Avatar,
  Divider,
  Flex,
  Heading,
  IconButton,
  Text,
  Box
} from "@chakra-ui/react";
import { BsFileEarmarkPerson } from "react-icons/bs";
import { PiFilesDuotone, PiSignOutBold, PiSignInBold } from "react-icons/pi";
import { AiOutlineProfile } from "react-icons/ai";
import { MdOutlinePreview } from "react-icons/md";
import {
  HamburgerIcon,
  InfoOutlineIcon,
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
      w={navSize === "small" ? "75px" : "220px"}
      transition="width 0.05s"
      flexDir="column"
      justifyContent="space-between"
      height="100vh"
    >
      <Flex
        p="0.5rem"
        flexDir="column"
        alignItems={navSize === "small" ? "center" : "flex-start"}
        transition="align-items 0.05s"
        as="nav"
      >
        <Flex 
          flexDir="row"
          justifyContent="space-between"
          alignItems="center"
          p="0.5rem"
          mt={navSize === "small" ? "0.5rem" : "0"}
          transition="margin-top 0.05s"
        >
          <Flex
            flexDir="column"
            display={navSize === "small" ? "none" : "block"}
            transition="display 0.05s"
          >
            <Heading>Chuwa</Heading>
            <Text fontSize="xs" color="gray.400">Management System</Text>
          </Flex>
          <IconButton
            background="none"
            _hover={{ background: "none" }}
            icon={<HamburgerIcon />}
            aria-label="Toggle Navigation"
            ml={navSize === "small" ? "0" : "1rem"}
            onClick={() => {
              if (navSize === "small") {
                setNavSize("large");
              } else {
                setNavSize("small");
              }
            }}
          />
        </Flex>
        <Divider display={navSize === "small" ? "none" : "flex"} transition="display 0.05s" />
        {isLoggedIn ? (
          role === "HR" ? (
            <>
              <NavItem
                navSize={navSize}
                title="Employee Profiles"
                icon={AiOutlineProfile}
                to="/hr/all-employees"
              />
              <NavItem
                navSize={navSize}
                title="Visa Management"
                icon={PiFilesDuotone}
                to="/hr/visa-management"
              />
              <NavItem
                navSize={navSize}
                title="Application Review"
                icon={MdOutlinePreview}
                to="/hr/hiring-management"
              />
              <NavItem
                navSize={navSize}
                title="Log out"
                icon={PiSignOutBold}
                to="/sign-in"
              />
            </>
          ) : (
            <>
              <NavItem
                navSize={navSize}
                title="Personal Infomation"
                icon={InfoOutlineIcon}
                to="/employee-infos"
              />
              <NavItem
                navSize={navSize}
                title="Visa Status"
                icon={BsFileEarmarkPerson}
                to="/employee-visa"
              />
              <NavItem
                navSize={navSize}
                title="Log out"
                icon={PiSignOutBold}
                to="/sign-in"
              />
            </>
          )
        ) : (
          <NavItem
            navSize={navSize}
            title="Log in"
            icon={PiSignInBold}
            to="/sign-in"
          />
        )}
      </Flex>

      {/* 新增的Flex元素 */}
      {/* <Flex flexGrow={1} /> */}

      <Flex
        p="0.5rem"
        flexDir="column"
        w={navSize === "small" ? "75px" : "220px"}
        alignItems={navSize === "small" ? "center" : "flex-start"}
        mb={4}
        display={isLoggedIn ? "flex" : "none"}
        transition="w 0.05s"
        position="fixed"
        bottom="0"
      >
        <Divider display={navSize === "small" ? "none" : "flex"} />
        <Flex mt={4} align="center" px={4}>
          <Avatar size="sm" src="https://bit.ly/dan-abramov" />
          <Flex
            flexDir="column"
            ml={4}
            display={navSize === "small" ? "none" : "flex"}
            transition="display 0.05s"
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

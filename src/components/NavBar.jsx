import React, { useEffect } from "react";
import { MoonIcon, SunIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { setData, setLoading } from "../utils/chartReducer";

import {
  Box,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";

const URL = "http://fetest.pangeatech.net/data";

function NavBar({ isDarkMode, toggleColorMode }) {
  const dispatch = useDispatch();
  const filterList = useSelector((state) => state.chart.filterList);

  const getData = async (dispatch) => {
    dispatch(setLoading(true));
  
    const response = await axios.get(URL);
  
    dispatch(setData(response.data));
    dispatch(setLoading(false));
  };
  
  const getFilteredData = async (filters, dispatch) => {
    dispatch(setLoading(true));
  
    const response = await axios.get(URL);
  
    if (filters.includes("ALL") || filters.length === 0) {
      dispatch(setData(response.data));
      return;
    }
  
    const filteredData = filters.map((filter) => {
      return response.data.filter((data) => data.revenue_type === filter);
    });
    const flatData = filteredData.flat(1);
    dispatch(setData(flatData));
    dispatch(setLoading(false));
  };  

  const handleFilterChange = (filters) => {
    getFilteredData(filters, dispatch);
  };

  useEffect(() => {
    getData(dispatch);
  }, []);

  return (
    <Box
      bg={isDarkMode ? "blackAlpha.600" : "blue.500"}
      borderBottom={isDarkMode ? "1px solid gray" : "1px solid black"}
      h="15vh"
      w="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDir="row"
      padding={{ base: 4, md: 8, lg: 8, xl: 8 }}
      paddingX={{ base: 4, md: 8, lg: 8, xl: 8 }}
    >
      <Menu>
        <MenuButton as={Button} rightIcon={<TriangleDownIcon />}>
          All Revenue type
        </MenuButton>

        <MenuList>
          <MenuOptionGroup type="checkbox" onChange={handleFilterChange}>
            {filterList &&
              filterList.map((filter, index) => (
                <MenuItemOption key={index} value={filter}>
                  {filter}
                </MenuItemOption>
              ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>

      <Box display="flex" alignItems="center" gap={8}>
        <Text color="white" fontSize="md">
          Hi, John Doe
        </Text>

        <IconButton aria-label="Toggle Mode" onClick={toggleColorMode}>
          {isDarkMode ? <SunIcon /> : <MoonIcon />}
        </IconButton>
      </Box>
    </Box>
  );
}

export default NavBar;

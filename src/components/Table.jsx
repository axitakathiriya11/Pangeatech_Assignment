import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Button,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

export default function TableData({isDarkMode}) {
  const data = useSelector((state) => state.chart.data);
  const [page, setPage] = useState(0);
  const [currentPageData, setCurrentPageData] = useState([]);

  const handlePageChange = (navigate) => {
    if (navigate === "next") {
      page < data.length / 10 - 1 && setPage((prev) => prev + 1);
    } else {
      page > 0 && setPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (data.length) setCurrentPageData(data.slice(page * 10, (page + 1) * 10));
  }, [data, page]);

  return (
    <Box
      w="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDir="row"
      padding={{ base: 4, md: 8, lg: 8, xl: 8 }}
      paddingX={{ base: 4, md: 8, lg: 8, xl: 8 }}
    >
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              {data.length > 0 &&
                Object.keys(data[0]).map((key, index) => (
                  <Td key={index} fontWeight="medium">
                    {key.toUpperCase()}
                  </Td>
                ))}
            </Tr>
          </Thead>
          <Tbody>
            {currentPageData.length > 0 &&
              currentPageData.map((item, index) => (
                <Tr key={index}>
                  {item &&
                    Object.keys(item).map((key, index) => (
                      <Td key={index}>{item[key]}</Td>
                    ))}
                </Tr>
              ))}
          </Tbody>
        </Table>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={8}
          marginTop="30px"
        >
          <Button
            onClick={() => handlePageChange("prev")}
            leftIcon={<ArrowLeftIcon />}
          >
            Previous
          </Button>
          <Button
            onClick={() => handlePageChange("next")}
            rightIcon={<ArrowRightIcon />}
          >
            Next
          </Button>
        </Box>
      </TableContainer>
    </Box>
  );
}

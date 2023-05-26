// import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
// import { faMagnifyingGlass } from "@fortawesome/free-regular-svg-icons";
import { Box, Tooltip, Button } from "@chakra-ui/react";
import { fas, faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(fas, faSearch);
const SideDrawer = () => {
  // const [search, setSearch] = useState("");
  // const [searchResult, setSearchResult] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [loadingChat, setLoadingChat] = useState();
  return (
    <>
      <Box>
        <Tooltip label="Search User to chat" placement="bottom-end">
          <Button variant={"ghost"}>
            <FontAwesomeIcon icon="search" />

            {/* <i className={faSearch}></i> */}
          </Button>
        </Tooltip>
      </Box>
    </>
  );
};

export default SideDrawer;

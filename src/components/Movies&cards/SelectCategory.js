import * as React from "react";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { useRecoilState } from "recoil";

import { _selectType } from "../../services/atom";

export default function SelectBasic() {
  const [selectType, setSelectType] = useRecoilState(_selectType);
  const isDark = localStorage.getItem("theme");
  const handleChange = (event, newValue) => {
    setSelectType(newValue);
  };
  return (
    <Select
      variant={isDark === "dark" ? "solid" : "plain"}
      defaultValue="now_playing"
      onChange={handleChange}
      // color="neutral"
      sx={{
        // alignSelf: "center",
        width: "100%",
        // m: "auto",
        // mb: 2,
        maxWidth: "200px",
      }}
    >
      <Option value="now_playing">Now Playing</Option>
      <Option value="popular">Popular</Option>
      <Option value="top_rated">Top Rated</Option>
      <Option value="upcoming">Upcoming</Option>
    </Select>
  );
}

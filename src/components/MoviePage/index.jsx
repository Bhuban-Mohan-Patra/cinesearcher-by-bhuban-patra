import React, { useState } from "react";

import { Search } from "neetoicons";
import { Input } from "neetoui";

const MoviePage = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="p-6">
      <div className="mx-auto mb-8 max-w-2xl">
        <Input
          className="rounded-lg border border-[#ddd]"
          placeholder="Search movie or series..."
          prefix={<Search />}
          type="text"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
      </div>
    </div>
  );
};

export default MoviePage;

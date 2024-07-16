import MovieCard from "../components/Movies&cards/MovieCard";
import SkeletonCardMoive from "../components/Skeletons/SkeletonCardMoive";
import React, { useState, useEffect } from "react";

function Movie() {
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div>
        {showSkeleton ? (
          <div>
            <SkeletonCardMoive />
          </div>
        ) : (
          <MovieCard />
        )}
      </div>
    </div>
  );
}

export default Movie;

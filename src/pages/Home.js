import React, { useState, useEffect } from "react";
import GradientCover from "../components/Movies&cards/GradientCover";
import SkeletonMovies from "../components/Skeletons/SkeletonMovies";

function Home() {
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return <div>{showSkeleton ? <SkeletonMovies /> : <GradientCover />}</div>;
}

export default Home;

import React from "react";

import GradientCard from "components/cards/GradientCard";

const GradientCardContainer = () => {
  return (
    <GradientCard>
      <span className="badge badge-pill badge-theme-3 align-self-start mb-3">
        GOGO
      </span>
      <p className="lead text-white">MAGIC IS IN THE DETAILS</p>
      <p className="text-white">Yes, it is indeed!</p>
    </GradientCard>
  );
};
export default GradientCardContainer;

import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

const Like = (props) => {
  const heart = props.liked ? faHeart : farHeart;
  return (
    <FontAwesomeIcon
      style={{ cursor: "pointer" }}
      onClick={props.onClick}
      icon={heart}
    />
  );
};

export default Like;

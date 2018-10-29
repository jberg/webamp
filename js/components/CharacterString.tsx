import React from "react";
import Character from "./Character";

interface Props {
  children: string;
}

const CharacterString = (props: Props) => {
  const text = `${props.children}` || "";
  const chars = text.split("");
  return chars.map((character, index) => (
    <Character key={index + character}>{character}</Character>
  ));
};

export default CharacterString;

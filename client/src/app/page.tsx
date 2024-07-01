"use client";

import Link from "next/link";
import { useState } from "react";

export default function Landing() {
  const [name, setName] = useState("");

  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      <Link href={`/rooms/room/?name=${name}`}>Join</Link>
    </div>
  );
}

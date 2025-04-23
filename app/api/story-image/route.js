// app/api/story-image/route.js
import { ImageResponse } from "@vercel/og";
import StoryImage from "../../../components/StoryImage";
import React from "react";

export const runtime = "edge";

export async function POST(req) {
  const body = await req.json();
  const { traits, idealTraits, summary, people } = body;

  return new ImageResponse(
    <StoryImage traits={traits} idealTraits={idealTraits} summary={summary} people={people} />,
    {
      width: 1080,
      height: 1920,
      fonts: [
        {
          name: "Inter",
          data: await fetch(
            new URL("../../../public/fonts/ELEGANTTYPEWRITERRegular.ttf", import.meta.url)
          ).then((res) => res.arrayBuffer()),
          style: "normal",
          weight: 400
        }
      ]
    }
  );
}

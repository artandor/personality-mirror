// app/api/story-image/route.js
import satori from "satori";
import { Resvg } from "@resvg/resvg-wasm";
import { ensureResvgInitialized } from "../../../lib/init-resvg.js";

import { NextResponse } from "next/server";
import StoryImage from "../../../components/StoryImage";
import React from "react";
import { readFile } from "fs/promises";

export async function POST(req) {
  const fontPath = `${process.cwd()}/public/fonts/ELEGANTTYPEWRITERRegular.ttf`;
  const fontData = await readFile(fontPath);

  await ensureResvgInitialized();

  const body = await req.json();
  const { traits, idealTraits, summary, people } = body;

  const svg = await satori(
    <StoryImage traits={traits} idealTraits={idealTraits} summary={summary} people={people} />, 
    {
      width: 1080,
      height: 1920,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          style: "normal",
          weight: 400
        }
      ]
    }
  );

  const png = new Resvg(svg).render().asPng();

  return new NextResponse(png, {
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": "inline; filename=story.png"
    }
  });
}

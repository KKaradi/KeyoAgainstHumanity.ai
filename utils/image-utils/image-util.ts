import type { NextPage } from 'next'
import { useState } from "react";
import Head from 'next/head'
import Image from 'next/image'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function generateImage(prompt: string): Promise<string> {
  const response = await fetch('/api/predictions', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: prompt,
    }),
  });
  let prediction = await response.json();
  if (response.status !== 201) {
    return "https://www.pngitem.com/pimgs/m/119-1190874_warning-icon-png-png-download-icon-transparent-png.png";
  }
  let realPrediction = prediction;
  
  while (
    prediction.status !== "succeeded" &&
    prediction.status !== "failed"
  ) {
    await sleep(1000);
    const response = await fetch("/api/predictions/" + prediction.id);
    prediction = await response.json();
    if (response.status !== 200) {
      return "https://www.pngitem.com/pimgs/m/119-1190874_warning-icon-png-png-download-icon-transparent-png.png";
    }
    realPrediction = prediction;
  }
  return realPrediction.output[0];
};
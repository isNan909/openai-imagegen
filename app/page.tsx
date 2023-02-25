'use client'

import React, { useState } from "react";
import styles from './page.module.css'
export default function Home() {
  const [searchVal, setSearchVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  async function generateImage(): Promise<any>{
    setLoading(true);
    setSearchVal("");
    const url = await fetch(`http://localhost:3000/api/generate`, {
      method: 'POST',
      body: JSON.stringify({
        prompt: `${searchVal}`,
        n: 1,
        size: "1024x1024",
      }),
    });
    setImage(url.url);
    setLoading(false);
  }

  return (
    <main className={styles.main}>
      <h1>AI Image Generation with OpenAI</h1>
      <input value={searchVal} type="text"  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchVal(event.target.value)}/>
      <button onClick={() => generateImage()}>{loading ? 'loading...' : 'generate image'}</button>
      {image && <>
        <img src={image} alt="ai generated"/>
      </>}
    </main>
  )
}

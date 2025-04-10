/**
 * This file handles POST requests
   - things to add
      index.html to send the requests
          

*/

import http from "http";
import https from "node:https"
import { VercelRequest, VercelResponse } from "@vercel/node";

interface UrlStatus {
  url: string;
  status: number | string;
}

function checkUrl(url: string) {
  return new Promise((resolve) => {
    http
      .get(url, (res) => {
        resolve({ url, status: res.statusCode || "Unknown" });

      })
      .on("error", (err) => {
        resolve({ url, status: err.message });
      });
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  //CORS headers for allowing requests from any origin
  res.setHeader("Access-Control-Allow-Origin","*")//allows all origins
  res.setHeader("Access-Control-Allow-Methods","POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers","Content-Type")

  if(req.method === "OPTIONS"){
    //Handling preflight requests 
    res.status(200).end();
    return;
  }
  
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { urls }: { urls: string[] } = req.body;
  if (!urls || !Array.isArray(urls)) {
    res.status(400).json({ error: 'Invalid input: "urls" must be an array' });
    return;
  }


  const results = await Promise.all(urls.map(checkUrl));
  res.status(200).json(results)
}

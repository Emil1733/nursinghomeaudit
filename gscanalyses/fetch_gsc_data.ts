import fs from "fs";
import path from "path";
import { google } from "googleapis";

// Place your Service Account JSON key in the project root as 'gsc-credentials.json'
const KEY_FILE_PATH = path.join(process.cwd(), "gsc-credentials.json");

// ⚠️ The site URL registered in Google Search Console
const SITE_URL = 'sc-domain:nursinghomeaudit.com';

// Last 7 days, offset by 2 days (GSC data has a 48hr processing delay)
const today = new Date();
const endDate = new Date(today);
endDate.setDate(endDate.getDate() - 2);
const startDate = new Date(endDate);
startDate.setDate(startDate.getDate() - 7);

const formatDate = (date: Date) => date.toISOString().split("T")[0];
const startStr = formatDate(startDate);
const endStr = formatDate(endDate);

console.log(`Pulling data from: ${startStr} to ${endStr}`);

async function auth() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });
  return google.webmasters({ version: "v3", auth });
}

async function fetchGscData(
  searchconsole: any,
  dimensions: string[],
  rowLimit = 1000,
) {
  try {
    const res = await searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: startStr,
        endDate: endStr,
        dimensions,
        rowLimit,
      },
    });
    return res.data.rows || [];
  } catch (error: any) {
    console.error(
      `Error:`,
      error.response?.data?.error?.message || error.message,
    );
    return [];
  }
}

function formatAsCsv(data: any[], dimensionName: string) {
  let csv = `Top ${dimensionName.toLowerCase()}s,Clicks,Impressions,CTR,Position\n`;
  data.forEach((row) => {
    const key = row.keys[0];
    const ctr = row.ctr ? (row.ctr * 100).toFixed(2) + "%" : "0%";
    const pos = row.position ? row.position.toFixed(2) : "0";
    csv += `"${key}",${row.clicks || 0},${row.impressions || 0},${ctr},${pos}\n`;
  });
  return csv;
}

async function run() {
  if (!fs.existsSync(KEY_FILE_PATH)) {
    console.error(
      "❌ gsc-credentials.json not found. Place your Service Account JSON key in the project root.",
    );
    process.exit(1);
  }

  const searchconsole = await auth();

  const rawDate = new Date().toISOString().split("T")[0].replace(/-/g, "_");
  const outDir = path.join(process.cwd(), "gscanalyses", `api_pull_${rawDate}`);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  console.log("Fetching Top Queries...");
  fs.writeFileSync(
    path.join(outDir, "Queries.csv"),
    formatAsCsv(await fetchGscData(searchconsole, ["query"]), "Queries"),
    "utf-8",
  );

  console.log("Fetching Top Pages...");
  fs.writeFileSync(
    path.join(outDir, "Pages.csv"),
    formatAsCsv(await fetchGscData(searchconsole, ["page"]), "Pages"),
    "utf-8",
  );

  console.log("Fetching Top Countries...");
  fs.writeFileSync(
    path.join(outDir, "Countries.csv"),
    formatAsCsv(await fetchGscData(searchconsole, ["country"]), "Countries"),
    "utf-8",
  );

  console.log("Fetching Top Devices...");
  fs.writeFileSync(
    path.join(outDir, "Devices.csv"),
    formatAsCsv(await fetchGscData(searchconsole, ["device"]), "Devices"),
    "utf-8",
  );

  console.log(`\n✅ Done! Output saved to: ${outDir}`);
}

run();

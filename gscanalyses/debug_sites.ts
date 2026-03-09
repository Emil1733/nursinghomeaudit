import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';

const KEY_FILE_PATH = path.join(process.cwd(), 'gsc-credentials.json');

async function main() {
  if (!fs.existsSync(KEY_FILE_PATH)) {
    console.error('❌ gsc-credentials.json not found');
    process.exit(1);
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  const sc = google.webmasters({ version: 'v3', auth });
  
  try {
    const res = await sc.sites.list();
    let output = '--- Authorized Sites ---\n';
    if (res.data.siteEntry) {
      res.data.siteEntry.forEach(site => {
        output += `- ${site.siteUrl} (Permission: ${site.permissionLevel})\n`;
      });
    } else {
      output += 'No sites found. Ensure the service account email is added as a user in GSC.\n';
    }
    output += '------------------------\n';
    console.log(output);
    fs.writeFileSync('gsc_sites.txt', output);
  } catch (error) {
    console.error('Error fetching sites:', error);
  }
}

main();

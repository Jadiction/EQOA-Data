import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import https from "node:https";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const GITHUB_OWNER = "Jadiction";
const GITHUB_REPO = "EQOA-Data";
const QUESTS_DIR = path.join(rootDir, "Quests");
const INFORMATION_DIR = path.join(rootDir, "Information");
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

function parseNextLink(linkHeader) {
  if (!linkHeader) return null;
  const links = linkHeader.split(",");

  for (const entry of links) {
    const match = entry.match(/<([^>]+)>\s*;\s*rel="([^"]+)"/);
    if (match?.[2] === "next") {
      return match[1];
    }
  }

  return null;
}

function httpsRequest(url) {
  return new Promise((resolve) => {
    const headers = {
      "User-Agent": "EQOA-Data-Builder",
      "Accept": "application/vnd.github.v3+json"
    };

    if (GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
    }

    const request = https.get(url, {
      headers: {
        ...headers
      },
      timeout: 10000
    }, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve({
              statusCode: res.statusCode,
              data: JSON.parse(data),
              nextUrl: parseNextLink(res.headers.link),
            });
          } else {
            resolve({ statusCode: res.statusCode, data: [], nextUrl: null });
          }
        } catch (e) {
          resolve({ statusCode: res.statusCode, data: [], nextUrl: null });
        }
      });
    });

    request.on("timeout", () => {
      request.destroy();
      resolve({ statusCode: 408, data: [], nextUrl: null });
    });

    request.on("error", () => {
      resolve({ statusCode: 500, data: [], nextUrl: null });
    });
  });
}

async function fetchFileContributors(filePath) {
  const githubPath = filePath.split(path.sep).join("/");
  let url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits?path=${encodeURIComponent(githubPath)}&per_page=100`;
  
  try {
    const contributors = new Map();
    let pageCount = 0;

    while (url && pageCount < 20) {
      const response = await httpsRequest(url);
      if (!Array.isArray(response.data) || response.statusCode < 200 || response.statusCode >= 300) {
        break;
      }

      for (const commit of response.data) {
        if (commit.author) {
          const key = commit.author.login;
          if (!contributors.has(key)) {
            contributors.set(key, {
              login: commit.author.login,
              id: commit.author.id,
              commits: 0
            });
          }
          contributors.get(key).commits++;
        }
      }

      url = response.nextUrl;
      pageCount++;
    }

    return Array.from(contributors.values()).sort((a, b) => b.commits - a.commits);
  } catch (error) {
    return [];
  }
}

async function addContributorsToFile(filePath, relativePath) {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(content);

    const contributors = await fetchFileContributors(relativePath);

    if (contributors.length > 0) {
      data.contributors = contributors;
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      return contributors.length;
    }
    
    return 0;
  } catch (error) {
    return 0;
  }
}

async function processDirectory(dir) {
  let processedCount = 0;
  let contributorCount = 0;

  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(rootDir, fullPath);

      if (entry.isDirectory()) {
        const result = await processDirectory(fullPath);
        processedCount += result.processedCount;
        contributorCount += result.contributorCount;
      } else if (entry.isFile() && path.extname(entry.name) === ".json") {
        const count = await addContributorsToFile(fullPath, relativePath);
        if (count > 0) {
          console.log(`✓ ${relativePath}: ${count} contributor(s)`);
          contributorCount += count;
        }
        processedCount++;
      }
    }
  } catch (error) {
    // Silently continue on error
  }

  return { processedCount, contributorCount };
}

async function main() {
  console.log(`\n📊 Fetching GitHub contributors for ${GITHUB_OWNER}/${GITHUB_REPO}...\n`);

  try {
    console.log("Processing Quests directory...");
    const questResult = await processDirectory(QUESTS_DIR);

    console.log("\nProcessing Information directory...");
    const infoResult = await processDirectory(INFORMATION_DIR);

    const totalProcessed = questResult.processedCount + infoResult.processedCount;
    const totalContributors = questResult.contributorCount + infoResult.contributorCount;

    console.log(`\n✅ Complete!`);
    console.log(`   Files processed: ${totalProcessed}`);
    console.log(`   Contributors added: ${totalContributors}`);
  } catch (error) {
    console.error("Fatal error:", error);
    process.exit(1);
  }
}

main();
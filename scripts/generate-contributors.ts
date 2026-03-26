import { promises as fs } from "node:fs";
import https from "node:https";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const GITHUB_OWNER = "Jadiction";
const GITHUB_REPO = "EQOA-Data";
const QUESTS_DIR = path.join(rootDir, "Quests");
const INFORMATION_DIR = path.join(rootDir, "Information");
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

interface Contributor {
  login: string;
  id: number;
  commits: number;
}

interface JsonObject {
  [key: string]: unknown;
}

interface RequestResult {
  statusCode: number;
  data: unknown;
  nextUrl: string | null;
}

interface ProcessResult {
  processedCount: number;
  contributorCount: number;
  processedPaths: string[];
}

function isObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isBotAuthor(author: JsonObject): boolean {
  if (author.type === "Bot") return true;

  const login = typeof author.login === "string" ? author.login.toLowerCase() : "";
  if (login === "github-actions[bot]" || login === "dependabot[bot]") {
    return true;
  }

  return login.endsWith("[bot]") || login.includes("dependabot");
}

function parseNextLink(linkHeader: string | string[] | undefined): string | null {
  if (!linkHeader) return null;
  const links = Array.isArray(linkHeader) ? linkHeader.join(",").split(",") : linkHeader.split(",");

  for (const entry of links) {
    const match = entry.match(/<([^>]+)>\s*;\s*rel="([^"]+)"/);
    if (match?.[2] === "next") {
      return match[1];
    }
  }

  return null;
}

function httpsRequest(url: string): Promise<RequestResult> {
  return new Promise((resolve) => {
    const headers: Record<string, string> = {
      "User-Agent": "EQOA-Data-Builder",
      Accept: "application/vnd.github.v3+json",
    };

    if (GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
    }

    const request = https.get(
      url,
      {
        headers,
        timeout: 10_000,
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          try {
            if ((res.statusCode ?? 500) >= 200 && (res.statusCode ?? 500) < 300) {
              resolve({
                statusCode: res.statusCode ?? 500,
                data: JSON.parse(data),
                nextUrl: parseNextLink(res.headers.link),
              });
            } else {
              resolve({ statusCode: res.statusCode ?? 500, data: [], nextUrl: null });
            }
          } catch {
            resolve({ statusCode: res.statusCode ?? 500, data: [], nextUrl: null });
          }
        });
      },
    );

    request.on("timeout", () => {
      request.destroy();
      resolve({ statusCode: 408, data: [], nextUrl: null });
    });

    request.on("error", () => {
      resolve({ statusCode: 500, data: [], nextUrl: null });
    });
  });
}

async function fetchFileContributors(filePath: string): Promise<Contributor[]> {
  const githubPath = filePath.split(path.sep).join("/");
  let url: string | null = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits?path=${encodeURIComponent(githubPath)}&per_page=100`;

  try {
    const contributors = new Map<string, Contributor>();
    let pageCount = 0;

    while (url && pageCount < 20) {
      const response = await httpsRequest(url);
      if (!Array.isArray(response.data) || response.statusCode < 200 || response.statusCode >= 300) {
        break;
      }

      for (const commit of response.data) {
        if (!isObject(commit) || !isObject(commit.author) || isBotAuthor(commit.author)) {
          continue;
        }

        const login = typeof commit.author.login === "string" ? commit.author.login : null;
        if (!login) {
          continue;
        }

        const id = typeof commit.author.id === "number" ? commit.author.id : 0;
        if (!contributors.has(login)) {
          contributors.set(login, { login, id, commits: 0 });
        }

        const contributor = contributors.get(login)!;
        contributor.commits += 1;
      }

      url = response.nextUrl;
      pageCount += 1;
    }

    return [...contributors.values()].sort((a, b) => b.commits - a.commits);
  } catch {
    return [];
  }
}

async function addContributorsToFile(filePath: string, relativePath: string): Promise<number> {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    const parsed = JSON.parse(content);
    if (!isObject(parsed)) {
      return 0;
    }

    const contributors = await fetchFileContributors(relativePath);
    if (contributors.length === 0) {
      return 0;
    }

    parsed.contributors = contributors;
    await fs.writeFile(filePath, `${JSON.stringify(parsed, null, 2)}\n`);
    return contributors.length;
  } catch {
    return 0;
  }
}

async function collectJsonFiles(dir: string): Promise<string[]> {
  const jsonFiles: string[] = [];

  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        jsonFiles.push(...await collectJsonFiles(fullPath));
      } else if (entry.isFile() && path.extname(entry.name) === ".json" && entry.name !== "_meta.json") {
        jsonFiles.push(path.relative(rootDir, fullPath));
      }
    }
  } catch {
    // Continue on error.
  }

  return jsonFiles;
}

async function processDirectory(dir: string): Promise<ProcessResult> {
  let processedCount = 0;
  let contributorCount = 0;
  const processedPaths: string[] = [];

  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(rootDir, fullPath);

      if (entry.isDirectory()) {
        const result = await processDirectory(fullPath);
        processedCount += result.processedCount;
        contributorCount += result.contributorCount;
        processedPaths.push(...result.processedPaths);
      } else if (entry.isFile() && path.extname(entry.name) === ".json" && entry.name !== "_meta.json") {
        const count = await addContributorsToFile(fullPath, relativePath);
        if (count > 0) {
          console.log(`✓ ${relativePath}: ${count} contributor(s)`);
          contributorCount += count;
        }
        processedCount += 1;
        processedPaths.push(relativePath);
      }
    }
  } catch {
    // Continue on error.
  }

  return { processedCount, contributorCount, processedPaths };
}

async function main(): Promise<void> {
  console.log(`\nFetching GitHub contributors for ${GITHUB_OWNER}/${GITHUB_REPO}...\n`);

  try {
    console.log("Processing Quests directory...");
    const questResult = await processDirectory(QUESTS_DIR);

    console.log("\nProcessing Information directory...");
    const infoResult = await processDirectory(INFORMATION_DIR);
    const infoDatabaseFiles = await collectJsonFiles(path.join(INFORMATION_DIR, "databases"));
    const processedInfoPaths = new Set(infoResult.processedPaths);
    const missingDatabaseFiles = infoDatabaseFiles.filter((file) => !processedInfoPaths.has(file));

    if (missingDatabaseFiles.length > 0) {
      throw new Error(
        `Information/databases files were not processed by the contributor script:\n${missingDatabaseFiles.join("\n")}`,
      );
    }

    const totalProcessed = questResult.processedCount + infoResult.processedCount;
    const totalContributors = questResult.contributorCount + infoResult.contributorCount;

    console.log("\nComplete.");
    console.log(`  Files processed: ${totalProcessed}`);
    console.log(`  Contributors added: ${totalContributors}`);
    console.log(`  Information/databases JSON files accounted for: ${infoDatabaseFiles.length}`);
  } catch (error) {
    console.error("Fatal error:", error);
    process.exit(1);
  }
}

main();
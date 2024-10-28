import * as fs from "fs";
import * as path from "path";

// Function to copy CSS files
const copyCSSFiles = (srcDir: string, destDir: string) => {
  // Get all files from the source directory
  const files = fs.readdirSync(srcDir);

  // Ensure the destination directory exists
  fs.mkdirSync(destDir, { recursive: true });

  // Iterate over files
  files.forEach((file) => {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);

    // Check if it's a directory
    if (fs.lstatSync(srcPath).isDirectory()) {
      // Recursively copy CSS files in subdirectories
      copyCSSFiles(srcPath, destPath);
    } else if (path.extname(file) === ".css") {
      // Copy CSS file
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${srcPath} to ${destPath}`);
    }
  });
};

// Define source and destination paths
const srcDir = path.join(__dirname, "../src");
const destDir = path.join(__dirname, "../dist");

// Copy CSS files from src to dist
copyCSSFiles(srcDir, destDir);

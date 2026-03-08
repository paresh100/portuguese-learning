import prompts from 'prompts';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import ora from 'ora';

const PROJECT_ROOT = process.cwd();

async function main() {
    console.log('\n');
    console.log(chalk.bold.magenta('╔════════════════════════════════════════════════════════╗'));
    console.log(chalk.bold.magenta('║        MASTER ANTIGRAVITY - PROJECT INITIALIZER        ║'));
    console.log(chalk.bold.magenta('╚════════════════════════════════════════════════════════╝'));
    console.log('\n');

    const response = await prompts([
        {
            type: 'text',
            name: 'projectName',
            message: 'What is the name of this project?',
            initial: 'My Awesome Portfolio'
        },
        {
            type: 'text',
            name: 'authorName',
            message: 'What is your name (for SEO/Author tag)?',
            initial: 'Rachel Singer'
        },
        {
            type: 'text',
            name: 'description',
            message: 'Short description for SEO:',
            initial: 'A premium portfolio showcasing digital craftsmanship.'
        },
        {
            type: 'text',
            name: 'primaryColor',
            message: 'What is your primary brand color (Hex)?',
            initial: '#0a0a0a'
        }
    ]);

    if (!response.projectName) return;

    const spinner = ora('Configuring project...').start();

    // 1. Update package.json name (sanitized)
    try {
        const packageJsonPath = path.join(PROJECT_ROOT, 'package.json');
        const packageJson = await fs.readJson(packageJsonPath);
        packageJson.name = response.projectName.toLowerCase().replace(/[^a-z0-9-]/g, '-');
        packageJson.description = response.description;
        await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    } catch (e) {
        spinner.fail('Failed to update package.json');
        console.error(e);
    }

    // 2. Update layout.tsx (Metadata)
    try {
        const layoutPath = path.join(PROJECT_ROOT, 'src/app/layout.tsx');
        let layoutContent = await fs.readFile(layoutPath, 'utf-8');

        // Simple regex replacements for metadata
        layoutContent = layoutContent.replace(/default: ".*?"/, `default: "${response.projectName}"`);
        layoutContent = layoutContent.replace(/template: "%s \| .*?"/, `template: "%s | ${response.authorName}"`);
        layoutContent = layoutContent.replace(/authors: \[{ name: ".*?" }\]/, `authors: [{ name: "${response.authorName}" }]`);
        layoutContent = layoutContent.replace(/creator: ".*?"/, `creator: "${response.authorName}"`);

        await fs.writeFile(layoutPath, layoutContent);
    } catch (e) {
        spinner.warn('Could not update layout.tsx metadata automatically.');
    }

    // 3. Update globals.css (Primary Color)
    try {
        const cssPath = path.join(PROJECT_ROOT, 'src/app/globals.css');
        let cssContent = await fs.readFile(cssPath, 'utf-8');
        cssContent = cssContent.replace(/--foreground: #.*?;/, `--foreground: ${response.primaryColor};`);
        await fs.writeFile(cssPath, cssContent);
    } catch (e) {
        spinner.warn('Could not update globals.css color.');
    }

    spinner.succeed(chalk.green('Project successfully configured!'));
    console.log('\n');
    console.log(chalk.cyan('You are ready to launch. Run:'));
    console.log(chalk.bold('npm run dev'));
    console.log('\n');
}

main().catch(console.error);

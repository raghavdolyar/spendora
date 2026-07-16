import fs from 'fs';
import path from 'path';

function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            // Remove shadows
            content = content.replace(/shadow-(sm|md|lg|xl|2xl|inner|none)/g, '');
            content = content.replace(/shadow-[a-zA-Z0-9-]+\/[0-9]+/g, '');
            
            // Fix text shadow or multiple spaces
            content = content.replace(/hover:shadow-[a-z]+/g, '');
            
            // Replace gradients with solid vibrant colors
            // bg-linear-to-br from-violet-400 to-violet-600 -> bg-indigo-700
            content = content.replace(/bg-linear-to-[a-z]{1,2}\s+from-([a-z]+)-400\s+to-\1-[67]00/g, 'bg-$1-700');
            content = content.replace(/bg-linear-to-[a-z]{1,2}\s+from-violet-500\s+to-violet-600/g, 'bg-indigo-700');
            content = content.replace(/bg-linear-to-[a-z]{1,2}\s+from-rose-500\s+to-rose-600/g, 'bg-rose-700');
            content = content.replace(/bg-linear-to-br\s+from-violet-50\s+via-white\s+to-blue-50/g, 'bg-slate-50');
            content = content.replace(/bg-linear-to-br\s+from-violet-500\s+to-violet-700/g, 'bg-indigo-700');
            content = content.replace(/bg-linear-to-[a-z]{1,2}\s+from-violet-600\s+via-violet-700\s+to-violet-800/g, 'bg-indigo-800');
            
            content = content.replace(/from-violet-400\s+to-violet-600/g, 'bg-indigo-700');
            content = content.replace(/from-([a-z]+)-400\s+to-\1-600/g, 'bg-$1-600');
            
            content = content.replace(/bg-linear-to-br/g, '');
            content = content.replace(/bg-linear-to-b/g, '');

            // Convert violet styling to indigo (more sophisticated academic feel)
            content = content.replace(/text-violet-/g, 'text-indigo-');
            content = content.replace(/bg-violet-/g, 'bg-indigo-');
            content = content.replace(/border-violet-/g, 'border-indigo-');
            content = content.replace(/ring-violet-/g, 'ring-indigo-');
            content = content.replace(/hover:text-violet-/g, 'hover:text-indigo-');
            content = content.replace(/hover:bg-violet-/g, 'hover:bg-indigo-');

            // Reduce border radius slightly for a sharper academic look
            content = content.replace(/rounded-2xl/g, 'rounded-md');
            content = content.replace(/rounded-3xl/g, 'rounded-lg');
            content = content.replace(/rounded-xl/g, 'rounded-md');

            // Do not universally replace rounded-full, since we might need it for avatars/radio buttons.
            // Let's replace button rounded-full with rounded-sm
            content = content.replace(/rounded-full\s+border\s+border-slate-200/g, 'rounded-md border border-slate-300');

            // Clean up extra spaces
            content = content.replace(/\s{2,}/g, ' ');

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content);
                console.log(`Updated: ${fullPath}`);
            }
        }
    }
}

processDirectory(path.join(process.cwd(), 'src'));

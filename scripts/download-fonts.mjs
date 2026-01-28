import https from 'https';
import fs from 'fs';
import path from 'path';

const fonts = [
    {
        url: 'https://github.com/rsms/inter/raw/master/docs/font-files/Inter-Regular.woff2',
        dest: 'public/fonts/Inter-Regular.woff2'
    },
    {
        url: 'https://github.com/rsms/inter/raw/master/docs/font-files/Inter-Bold.woff2',
        dest: 'public/fonts/Inter-Bold.woff2'
    },
    {
        url: 'https://raw.githack.com/MohammadQt/font-itheric/master/Cairo-Regular.woff2',
        dest: 'public/fonts/Cairo-Regular.woff2'
    },
    {
        url: 'https://raw.githack.com/MohammadQt/font-itheric/master/Cairo-Bold.woff2',
        dest: 'public/fonts/Cairo-Bold.woff2'
    }
];

async function download(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            rejectUnauthorized: false // Bypass SSL revocation/cert issues if needed
        }, (response) => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                // Handle redirect
                download(response.headers.location, dest).then(resolve).catch(reject);
                return;
            }
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded ${dest}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            reject(err);
        });
    });
}

async function main() {
    const fontsDir = path.join(process.cwd(), 'public', 'fonts');
    if (!fs.existsSync(fontsDir)) {
        fs.mkdirSync(fontsDir, { recursive: true });
    }

    for (const font of fonts) {
        try {
            await download(font.url, font.dest);
        } catch (err) {
            console.error(`Error downloading ${font.url}: ${err.message}`);
        }
    }
}

main();

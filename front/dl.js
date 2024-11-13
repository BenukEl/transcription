import https from 'https'
import fs from 'fs'
import packageLock from './package-lock.json' assert {type : 'json'}

const total = Object.keys(packageLock.packages).length
let nb = 0
for (const pack in packageLock.packages) {
    nb++;
    if (!pack) {
        continue;
    }

    const url = packageLock.packages[pack].resolved
    if (url) {
        const filename = url.split('/').pop()
        https.get(url, res => {
            const streamWriter = fs.createWriteStream(`output/${filename}`)
            streamWriter.on('finish', () => {
                streamWriter.close();
                console.log(`${nb}/${total} - ${filename}`)
        })
            res.pipe(streamWriter)
        })
    }
}
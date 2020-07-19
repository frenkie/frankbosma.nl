import Fs from 'fs';
import Path from 'path';
import Axios from 'axios';

const UPLOAD_PATH = './public/img/uploads';
const SERVE_PATH = '/img/uploads';
const mimeTypes = {
    html: 'text/html',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    png: 'image/png',
    js: 'text/javascript',
    css: 'text/css'
};

async function downloadImage ( fileName ) {

    const url = process.env.UPLOAD_ENDPOINT +'/'+ fileName;
    const path = Path.resolve( UPLOAD_PATH, fileName );
    const writer = Fs.createWriteStream( path, { flags: 'w' } );

    const response = await Axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });

    return new Promise((resolve, reject) => {

        if ( response && ! ( response.status >= 400 ) ) {
            response.data.pipe( writer );

            writer.on('finish', resolve);
            writer.on('error', function () {
                console.log('downloadImage caught error');
                reject();
            });

        } else {
            reject();
        }
    });
}

function serveFile ( res, path ) {

    const mimeType = mimeTypes[ Path.extname( path ).substring( 1 ) ] ;

    if ( mimeType ) {

        res.writeHead( 302, {'Location': path });
        res.end();

    } else {
        res.statusCode = 400;
        res.end();
    }
}

export default (req, res) => {

    return new Promise( (resolve, reject) => {

        if ( !( req.query && req.query.file ) ) {

            res.statusCode = 401;
            res.end();
            reject();

        } else {

            const fileName = req.query.file;
            const path = Path.resolve( UPLOAD_PATH, fileName );

            if ( ! Fs.existsSync( path ) ) {
                downloadImage( fileName ).then( () => {

                    serveFile( res, Path.resolve( SERVE_PATH, fileName ) );
                    resolve();

                }, () => {
                    res.statusCode = 404;
                    res.end();
                    reject();
                } );
            } else {
                serveFile( res, Path.resolve( SERVE_PATH, fileName ) );
                resolve();
            }
        }
    });
}
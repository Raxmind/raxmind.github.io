export default {
    async fetch(request, _env) {
        return await handleRequest(request);
    }
}

async function handleRequest(request) {
    let reqHeaders = new Headers(request.headers),
        outBody, outStatus = 200,
        outStatusText = 'OK',
        outCt = null,
        outHeaders = new Headers({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": reqHeaders.get('Access-Control-Allow-Headers') || "Accept, Authorization, Cache-Control, Content-Type, DNT, If-Modified-Since, Keep-Alive, Origin, User-Agent, X-Requested-With, Token, x-access-token"
        });

    try {
        let url = request.url.substr(8);
        url = decodeURIComponent(url.substr(url.indexOf('/') + 1));

        if (request.method == "OPTIONS" || url.length < 3 || url.indexOf('.') == -1 || url == "favicon.ico" || url == "robots.txt") {
            const invalid = !(request.method == "OPTIONS" || url.length === 0)
            outBody = JSON.stringify({
                code: invalid ? 400 : 0,
                usage: 'Host/{URL}'
            });
            outCt = "application/json";
            outStatus = invalid ? 400 : 200;
        } else {
            url = fixUrl(url);
            let ip = request.headers.get('CF-Connecting-IP');
            let country = request.headers.get('CF-IPCountry');

            if (url.indexOf('.m3u') >= 0 || url.indexOf('.ts') >= 0) {
                let fp = {
                    method: request.method,
                    headers: {}
                }

                const allowHeaders = ['connection', 'accept-encoding'];
                let he = reqHeaders.entries();
                for (let h of he) {
                    const key = h[0],
                        value = h[1];
                    if (allowHeaders.includes(key.toLowerCase())) {
                        fp.headers[key] = value;
                    }
                }

                fp.headers['user-agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36';


                if (["POST", "PUT", "PATCH", "DELETE"].indexOf(request.method) >= 0) {
                    const ct = (reqHeaders.get('content-type') || "").toLowerCase();
                    if (ct.includes('application/json')) {
                        fp.body = JSON.stringify(await request.json());
                    } else if (ct.includes('application/text') || ct.includes('text/html')) {
                        fp.body = await request.text();
                    } else if (ct.includes('form')) {
                        fp.body = await request.formData();
                    } else {
                        fp.body = await request.blob();
                    }
                }

                let fr = (await fetch(url, fp));
                outCt = fr.headers.get('content-type');
                outStatus = fr.status;
                outStatusText = fr.statusText;
                outBody = fr.body;
            } else {
                return Response.redirect(url, 302);
            }
        }
    } catch (err) {
        outCt = "application/json";
        outBody = JSON.stringify({
            code: -1,
            msg: JSON.stringify(err.stack) || err
        });
        outStatus = 500;
    }

    if (outCt && outCt != "") {
        outHeaders.set("content-type", outCt);
    }

    let response = new Response(outBody, {
        status: outStatus,
        statusText: outStatusText,
        headers: outHeaders
    })

    return response;
}

function fixUrl(url) {
    if (url.includes("://")) {
        return url;
    } else if (url.includes(':/')) {
        return url.replace(':/', '://');
    } else {
        return "http://" + url;
    }
}
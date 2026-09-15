import http.server
import socketserver
import os
import sys

DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def check_redirect(self):
        req_path = self.path.split('?')[0]
        query = ('?' + self.path.split('?')[1]) if '?' in self.path else ''

        # 1. Redirect /index.html or /index to /
        if req_path in ('/index.html', '/index'):
            self.send_response(301)
            self.send_header('Location', '/' + query)
            self.end_headers()
            return True

        # 2. Redirect /page.html to /page
        if req_path.endswith('.html'):
            clean = req_path[:-5]
            self.send_response(301)
            self.send_header('Location', clean + query)
            self.end_headers()
            return True

        # 3. Redirect trailing slashes: /about/ -> /about
        if req_path != '/' and req_path.endswith('/'):
            clean = req_path.rstrip('/')
            self.send_response(301)
            self.send_header('Location', clean + query)
            self.end_headers()
            return True

        return False

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_HEAD(self):
        if self.check_redirect():
            return
        super().do_HEAD()

    def do_GET(self):
        if self.check_redirect():
            return
        super().do_GET()

    def translate_path(self, path):
        fs_path = super().translate_path(path)
        # 1. If exact file/folder exists, serve it
        if os.path.exists(fs_path):
            return fs_path

        # 2. If path.html exists, serve it
        candidate = fs_path.rstrip('/') + '.html'
        if os.path.isfile(candidate):
            return candidate

        # 3. Fallback for relative asset paths if requested under a pseudo-directory
        clean_path = path.split('?')[0].lstrip('/')
        if '/' in clean_path:
            asset_candidate = os.path.join(DIRECTORY, clean_path.split('/', 1)[1])
            if os.path.exists(asset_candidate):
                return asset_candidate

        return fs_path

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", port), CleanURLHandler) as httpd:
        print(f"Serving {DIRECTORY} with clean URLs on http://localhost:{port}")
        httpd.serve_forever()

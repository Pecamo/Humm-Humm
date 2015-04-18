#!/usr/bin/python3.4

from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs
import json
import os
from os import curdir, sep

CWD = os.path.abspath('.')


hostName = "localhost"
hostPort = 31415


def make_index(relative_path):

    absolute_path = os.path.abspath(relative_path)
    file_list = os.listdir(absolute_path)

    relative_list = []
    for file_name in file_list:
        relative_name = os.path.join(relative_path, file_name)
        relative_list.append(relative_name)

    html_list = []
    for r in relative_list:
        r = r + "/" if os.path.isdir(r) else r
        html_list.append('<a href="http://localhost:31415/%s">%s</a><br>' % (r, r))

    page_template = "<html><head></head><body>%s</body></html>"

    ret = page_template % ('\n'.join(html_list))

    return ret


class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        try:

            if self.path.endswith('/'):
                relative_path = self.path[1:]
                relative_path = relative_path if len(relative_path) > 0 else '.'
                page = make_index(relative_path)
                self.send_html(page)

            elif self.path.endswith(".html"):
                f = open(curdir + sep + self.path, 'r')
                self.send_html(f.read())
                f.close()
            elif self.path.endswith(".css"):
                f = open(curdir + sep + self.path, 'r')
                self.send_css(f.read())
                f.close()
            elif self.path.endswith(".js"):
                f = open(curdir + sep + self.path, 'r')
                self.send_js(f.read())
                f.close()
            else:
                filepath = self.path[1:]
                f = open( os.path.join(CWD, filepath), "rb")
                self.send_file(f.read())
                f.close()

        except IOError as e :
            print(e)
            self.send_error(404,'File Not Found: %s' % self.path)

    def send_html(self, html: str):
        self.send(200, [("Content-type", "text/html")], bytes(html, encoding="utf -8"))

    def send_file(self, file: bytes):
        self.send(200, [("Content-type", "application/octet-stream")], file)

    def send_js(self, js: str):
        self.send(200, [("Content-type", "application/javascript")], bytes(js, encoding="utf-8"))

    def send_css(self, js: str):
        self.send(200, [("Content-type", "text/css")], bytes(js, encoding="utf-8"))

    def send(self, code: int, headers: [(str, str)],  data: bytes):
        self.send_response(code)
        for header in headers:
            self.send_header(header[0], header[1])
        self.end_headers()
        self.wfile.write(data)


def bytes_json_from_dict(data: dict):
    return bytes(json.dumps(data), encoding="utf-8")



myServer = HTTPServer((hostName, hostPort), MyServer)

print("Server Starts :", hostName, "-", hostPort)

try:
    myServer.serve_forever()
except KeyboardInterrupt:
    print()
    pass

myServer.server_close()
print("Server Stops :", hostName, "-", hostPort)

#!/usr/bin/python3.4

from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse
import os
import cgi
from os import curdir, sep
from helpers import *
from pymongo import MongoClient
import gridfs

CWD = os.path.abspath('.')


hostName = "0.0.0.0"
hostPort = 31415
main_file = "view.html"

db = MongoClient().humm_humm
fs = gridfs.GridFS(db)


class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):

        try:
            send_type = get_res_type(self.path).value
            if self.path == "/":
                path = main_file
            else:
                path = self.path[1:]

            path = curdir + sep + path

            do_send = getattr(self, "send_" + send_type)
            do_send(path)

        except IOError as e:
            print(e)
            self.send_error(404, "Resource not found : %s" % self.path)

    def do_POST(self):
        length = self.headers['content-length']
        data = self.rfile.read(int(length))
        ref = fs.put(data)

        self.send_response(200)

    def send_html(self, path: str):
        self.send(200, [("Content-type", "text/html")], path)

    def send_file(self, path: str):
        self.send(200, [("Content-type", "application/octet-stream")], path)

    def send_js(self, path: str):
        self.send(200, [("Content-type", "application/javascript")], path)

    def send_css(self, path: str):
        self.send(200, [("Content-type", "text/css")], path)

    def send(self, code: int, headers: [(str, str)],  path: str):
        file = open(path, 'rb')
        self.send_response(code)
        for header in headers:
            self.send_header(header[0], header[1])
        self.end_headers()
        self.wfile.write(file.read())




myServer = HTTPServer((hostName, hostPort), MyServer)

print("Server Starts :", hostName, "-", hostPort)

try:
    myServer.serve_forever()
except KeyboardInterrupt:
    print()
    pass

myServer.server_close()
print("Server Stops :", hostName, "-", hostPort)

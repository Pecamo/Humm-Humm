#!/usr/bin/python3.4

__author__ = "Jeremy Rabasco"

from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs
import json


hostName = "localhost"
hostPort = 31415


class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        query = urlparse(self.path).query
        parsed_args = parse_qs(query)
        cleaned_path = urlparse(self.path).path
        print(parsed_args)
        self.send(200, b"<html><body><h3>SALUT !</h3></body></html>")

    def send(self, code: int,  data: bytes):
        self.send_response(code)
        self.send_header("Content-type", "text/html")
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

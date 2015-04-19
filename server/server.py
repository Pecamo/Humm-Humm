#!/usr/bin/python3.4

from http.server import BaseHTTPRequestHandler, HTTPServer
import os
from os import curdir, sep
from helpers import *
from pymongo import MongoClient
import gridfs
import re
from bson.objectid import ObjectId

CWD = os.path.abspath('.')


hostName = "0.0.0.0"
hostPort = 31415
main_file = "view.html"

db = MongoClient().humm_humm
fs = gridfs.GridFS(db)


class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):

        path = self.path.split("?")[0]

        try:
            send_type = get_res_type(path).value
            if self.path == "/":
                path = main_file
            else:
                path = path[1:]

            path = curdir + sep + path

            do_send = getattr(self, "send_" + send_type)
            do_send(path)

        except IOError as e:
            print(e)
            self.send_error(404, "Resource not found : %s" % self.path)

    def do_POST(self):
        if self.path.split("/")[-1] == "sounds":
            data = self.get_post_data()
            ref = fs.put(data)

            response = "/player/" + str(ref)

            self.send_text(response)
        else:
            self.send_error(400, "Cannot upload here.")

    def get_post_data(self) -> bytes:
        data = self.rfile.readline()
        print(data)
        data = self.rfile.readline()
        print(data)
        data = self.rfile.readline()
        print(data)
        data = self.rfile.readline()
        print(data)
        data = self.rfile.readline()
        print(data)
        data = self.rfile.readline()
        print(data)
        data = self.rfile.readline()
        print(data)
        data = self.rfile.readline()
        print(data)
        data = self.rfile.readline()
        print(data)
        data = self.rfile.readline()
        print(data)
        data = self.rfile.readline()
        print(data)
        data = self.rfile.readline()
        print(data)
        data = self.rfile.readline()
        print(data)
        data = self.rfile.readline()
        print(data)
        # useless comment
        return data

    def send_html(self, path: str):
        self.send_path(200, [("Content-type", "text/html")], path)

    def send_file(self, path: str):
        self.send_path(200, [("Content-type", "application/octet-stream")], path)

    def send_js(self, path: str):
        self.send_path(200, [("Content-type", "application/javascript")], path)

    def send_css(self, path: str):
        self.send_path(200, [("Content-type", "text/css")], path)

    def send_sound(self, path: str):
        file_id = ObjectId(path.split("/")[-1])
        self.send_response(200)
        self.send_header("Content-type", "application/octet-stream")
        self.end_headers()
        self.wfile.write(fs.get(file_id).read())

    def send_player(self, path: str):
        file_id = path.split("/")[-1]
        self.send_text(get_player_for_sound(file_id))

    def send_text(self, text:str):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write(bytes(text, encoding="utf-8"))

    def send_path(self, code: int, headers: [(str, str)],  path: str):
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

#!/bin/sh
asd() {
	kill $pid
}
trap asd QUIT INT KILL
python server/server.py &
pid=$!
while inotifywait -e move server
do
    kill $pid
    fg
    python server/server.py &
    pid=$!
done
kill $pid

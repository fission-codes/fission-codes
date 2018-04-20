#!/usr/bin/env bash
PROCESS_COUNT=`ps aux | grep ganache-cli | wc -l`
if [ "$PROCESS_COUNT" -lt "2" ];  #one process will be pgrep, if two processes then ganache-cli is running
then
    echo "ganache-cli is not running.  you can launch with: npm run start:testrpc &"
    exit -1
fi

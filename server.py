import sys
import os
import threading
import socket

bufsize = 8192
fname = sys.argv[1]
fsize = os.stat(fname).st_size
k=0
iter = 0

#this function help in  editing foo file in which log details are inserted
def process(l,l1):
    lines = l1-l
    size=0
    fo=open("foo.txt","a")
    with open(sys.argv[1]) as f:
        line2 = f.readlines()
        for i in line2:
            size += 1
            if size>l:
                if(size > l):
                    fo.write(i + "\n")
                else:
                    fo.write(i)
    fo.close()
                

def check_log_file():
    k1=0
    global k
    with open(sys.argv[1]) as f:
        lines1=f.readlines()
        k1=len(lines1)
    if k1 > k:
        process(k,k1)
        k=k1
    threading.Timer(5, check_log_file).start()

#this function helps in knowing wether file has been changes or not
check_log_file()
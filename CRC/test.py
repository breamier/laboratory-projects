import socket
import threading

PORT = 5050
SERVER = "192.168.1.32"
SERVER = socket.gethostbyname(socket.gethostname())
ADDR = (SERVER, PORT)

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(ADDR) # we bound the socket to an address

def handle_client(conn, addr):
    print(f"[NEW CONNECTION] {addr} connected.")
    
    #get client name
    c_name = conn.recv(1024).decode()
    print(f"{c_name} at '{addr}' has joined the server")
    
    #Welcome message
    msg = f"Hi {c_name}! Welcome to the server. Type [bye] to exit the server"
    conn.send(msg.encode())
    
    while True:
        #receive message
        recv_msg = conn.recv(1024).decode()
        print(f"{c_name} > {recv_msg}")
        
        if recv_msg == "[bye]":
            print(f"{c_name} has disconnected")
            conn.close()            #Close connection to client
            break
        
        #send message
        send_msg = input("Server > ")
        conn.send(send_msg.encode())


# handle new connections
def start():
    server.listen()
    print(f"[LISTENING] Server is listening on {SERVER}")
    while True:
        conn, addr = server.accept()
        thread = threading.Thread(target=handle_client, args=(conn, addr))
        thread.start()
        print(f"[ACTIVE CONNECTIONS] {threading.active_count() - 1}")

print("[STARTING] server is starting...")
start()
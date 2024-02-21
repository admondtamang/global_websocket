# Global socket

Donot worry about hosting a socket. You can use this tool to emit socket event in a instant.

## Send event
In postman, select POST method and use url: https://socket.admondtamang.com.np/api/emit,
And in body, choose raw and select json:
you should mention key and payload as below
```
{
    "key":"your_key",
    "payload":"{color:'red'}"
}
```
Example:

![image](https://github.com/admondtamang/global_websocket/assets/22430270/2a37f662-3da8-4473-ad1c-d38551db4d65)

Note : key and payload is compulsory

## Listen to events
In postman, click new and select socket.io, 
inser url: https://socket.admondtamang.com.np
event_name: your_key and switch on the listen toggle

Example:

![image](https://github.com/admondtamang/global_websocket/assets/22430270/9a6933c1-35b1-44a5-892f-f346254e096d)

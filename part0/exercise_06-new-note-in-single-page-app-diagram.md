```mermaid
sequenceDiagram
    participant browser
    participant server

    Note over browser: The user creates a new note


    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

    activate server


    server-->>browser: {"message": "note created"}
    Note right of browser: The event handler prevent the default handling of form's submit. <br>Then renders the new note on the page and sends the new note to the server.



    deactivate server
```

# Music Forever

## Project Description
Music Forever is a server-client application designed to manage and serve audio files. The server stores file elements and provides them to the client on request. This project is intended to help developers learn how to deploy full-stack applications on Windows IIS, using Express for the server and React with Vite for the client.

## Development Purposes
The primary goal of this project is to learn how to deploy web applications on Windows IIS. The server is built using NodeJS and Express, while the client is developed with React and Vite. This project serves as a practical exercise in full-stack development and deployment, focusing on integrating various technologies to create a functional and efficient music streaming service.

## Technology Stack

| Layer   | Technology                       | Version      |
|---------|-----------------------------------|--------------|
| Server  | Node.js                           | v20.18.0     |
|         | Express                           | ^4.21.0      |
|         | Multer                            | ^1.4.5-lts.1 |
| Client  | React                             | ^18.3.1      |
|         | Formik                            | ^2.4.6       |
|         | React Audio Player                | ^0.17.0      |
|         | Vite                              | ^5.4.1       |

## Project Features

1. **Landing Page**  
   ![Landing Page](https://i.imgur.com/BHrarSJ.png)
   A welcoming page that provides an overview of the app and its purpose.

2. **Add New Music**  
   ![Add New Music](https://i.imgur.com/EMxNBFa.png)
   A form to upload and add new music files to the server's library.

3. **Explore the Music Library and Play Audio**  
   ![Explore the Music Library and Play Audio](https://i.imgur.com/39T54on.png)
   Browse the music library, select tracks, and listen to audio directly from the client.

## Installation Process

### Prerequisites:
- Ensure you have **Node.js** installed (v20.18.0 or higher).
- For deployments on **Windows IIS**:
  - [**URL Rewrite**](https://www.iis.net/downloads/microsoft/url-rewrite) latest tool
  - [**Application Request Routing**](https://www.iis.net/downloads/microsoft/application-request-routing) latest tool
  - [**IIS Node**](https://github.com/tjanczuk/iisnode/releases/tag/v0.2.21) latest version

## Installation Process

### Steps to Run the Project Locally:
1. **Clone the repository**:
    ```bash
    git clone https://github.com/Javithor360/music-forever-trial.git
    ```
2. **Open two terminals on the project repository**:
    ```bash
    cd music-forever-trial
    ```
3. **On the first terminal, install server dependencies**:
    ```bash
    cd server
    npm install
    ```
4. **On the second terminal, install client dependencies**:
    ```bash
    cd client
    npm install
    ```
5. **Start both modules with the same command on both terminals**:
    ```bash
    npm run dev
    ```
    
### Deployment steps on Windows IIS
1. Create a `/sites` directory on `C:/`
2. Move both directories modules, `client` and `server` to the newly created `/sites` directory
4. Install the dependencies on each module with `npm install`
5. On the `client` module compile the code with `npm run build`
6. Open the IIS software and add new sites per each module
   - For the `client` choose the following physical path: `C:/sites/client/dist`
   - For the `server` choose the following physical path: `C:/sites/server`
   - Other futher configurations are optional
7. Go to your root directory on the IIS and check your machine name
8. Then open the `Feature Delegation` panel and change the delegation of `Handler Mapppings` to `Read/Write`
9. Navigate to `Application Pools` section on the sidebar and change the `client` module `.NET CLR Version` to `No Managed Code`
10. Finally, go to the `server` module and select the `Handler Mapping` option and check if `ìisnode` handler is set, if not follow these extra steps:
   - On the right actions panel select `Module Mapping`
   - Fill parameters with the following information
     - Request path: `index.js` (server's main file)
     - Module: `iisnode`
     - Executable: empty
     - Name: `iisnode`
11. Open the `client` module on any code editor and create a `.env` file with the same content as the provided `.env.example` file
    - Specify the URL according to your machine name.
      - `VITE_API_BASE_URL=http://YOUR_MACHINE_NAME:YOUR_SELECTED_PORT_FOR_THE_SERVER/api`
      - `VITE_MEDIA_SERVER_URL=http://YOUR_MACHINE_NAME:YOUR_SELECTED_PORT_FOR_THE_SERVER`
12. Start both modules on IIS and navigate to their ports

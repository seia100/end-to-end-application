# **Guía para Instalar Docker**

## **1. Verificar Requisitos Previos**
Antes de instalar Docker, asegúrate de que tu sistema cumple con los siguientes requisitos:
- **Sistema Operativo Compatible**:
    - Windows 10/11 Pro, Enterprise o Education (con WSL2 habilitado para Windows).
    - Ubuntu 20.04 o superior.
    - macOS 10.15 o superior.
- **Procesador Compatible**:
    - x86_64 o ARM64.

## **2. Instalación en Diferentes Sistemas Operativos**

### **2.1 Instalación en Windows**
1. **Descargar Docker Desktop**:
    - Ve a la página oficial de Docker Desktop: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop).
    - Descarga el instalador para Windows.

2. **Habilitar WSL2** (si no está habilitado):
    - Abre PowerShell como administrador y ejecuta:
      ```bash
      dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
      dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
      ```
    - Reinicia tu máquina.
    - Descarga el **paquete de actualización WSL2** desde [aquí](https://aka.ms/wsl2kernel).

3. **Instalar Docker Desktop**:
    - Ejecuta el instalador descargado.
    - Sigue las instrucciones, asegurándote de habilitar la integración con WSL2.
    - Reinicia si es necesario.

4. **Verificar la Instalación**:
    - Abre una terminal y ejecuta:
      ```bash
      docker --version
      ```

### **2.2 Instalación en Ubuntu**
1. **Actualizar el Sistema**:
    ```bash
    sudo apt update
    sudo apt upgrade -y
    ```

2. **Instalar Paquetes Requeridos**:
    ```bash
    sudo apt install -y ca-certificates curl gnupg lsb-release
    ```

3. **Agregar la Clave GPG de Docker**:
    ```bash
    sudo mkdir -m 0755 -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    ```

4. **Agregar el Repositorio de Docker**:
    ```bash
    echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    ```

5. **Instalar Docker Engine**:
    ```bash
    sudo apt update
    sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    ```

6. **Habilitar y Verificar Docker**:
    - Habilitar Docker para que inicie automáticamente:
      ```bash
      sudo systemctl enable docker
      sudo systemctl start docker
      ```
    - Verificar que Docker está instalado correctamente:
      ```bash
      docker --version
      ```

7. **Permitir Uso sin `sudo` (Opcional)**:
    ```bash
    sudo usermod -aG docker $USER
    newgrp docker
    ```

### **2.3 Instalación en macOS**
1. **Descargar Docker Desktop**:
    - Ve a la página oficial de Docker Desktop: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop).
    - Descarga el instalador para macOS.

2. **Instalar Docker Desktop**:
    - Abre el archivo `.dmg` descargado.
    - Arrastra el ícono de Docker a la carpeta de Aplicaciones.
    - Abre Docker Desktop desde las aplicaciones y sigue las instrucciones.

3. **Verificar la Instalación**:
    - Abre una terminal y ejecuta:
      ```bash
      docker --version
      ```

---

## **3. Verificar la Instalación**
Una vez instalado Docker en cualquier sistema operativo, verifica que funciona ejecutando:
```bash
docker --version

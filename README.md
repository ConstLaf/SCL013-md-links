# MD-LINKS

  

## Índice

  
 [1.Introducción](#1-introduccion)

[2. Producto](#2-producto)
*  ##### 2.1 Definición del producto
* ##### 2.2 Principales usuarios
* ##### 2.3 Uso y aplicación
* ##### 2.4 Historias de usuario

 [3. Proceso creativo](#3-imagen-final-del-producto)

 [4. Organización y planificación](#6-organizacion-y-planificacion)

  [5. Objetivos de aprendizaje](#5-obejtivos-de-aprendizaje)

## 1. Introducción

En la actualidad hay muchas plataformas que manejan texto plano, en las cuales es muy común encontrar archivos con extencion .md. 
Estos archivos vienen en un formato o lenguaje llamado Markdown que muchas veces contienen links o vínculos que están rotos o que ya no son validos y perjudican a la calidad de informacion del archivo, dada esta problemática nace la necesidad de crear una herramienta que pueda romper ese circulo.

  

## 2. Producto

*  #### 2.1 DEFINICIÓN DE PRODUCTO:
Nuestro producto es una librería o como nosotros le llamamos una herramienta muy útil para aquellos usuarios que están en constante contacto con archivos de extencion .md
Utilizamos node.js y javascript como mecanismos de creación y la terminal o consola como motor para hacerlo viable.
Nuestro producto nos permite iniciar una interacción con el usuario desde la consola, reconocer el archivo que nos esta dando, leer, recorrer, seleccionar y en listar los links o enlaces que se encuentran dentro del archivo, una vez reconocidos, nuestro producto validara o enviara una serie de estadísticas que nos dirán si el link es funcional o si esta roto, proporcionando al usuario una solución a la hora de trabajar con archivos de extencion.md

*  #### 2.2  PRINCIPALES USUARIOS:

Nuestros principales usuarios son personas que están mayormente en el mundo de la programación ya que el lenguaje Markdown se da mas asiduamente en plataformas de este rubro.

*  #### 2.3  USO Y APLICACIÓN:

**Instalación:**
Nuestro módulo se puede instalar mediante NPM aplicando el siguiente comando en la terminal o consola:
                    `npm install <github-user>/md-links`
**Aplicación y uso:**                    
Este módulo incluye tanto un ejecutable como una interfaz que podemos importar con  para usarlo programáticamente:
                `const md-links = require('ruta del archivo')` 
     
 *  #### 2.4  HISTORIAS DE USUARIO:   
 
 **Historia 1:**
 
Yo como usuario/developer quiero que el programa reconozca lo que estoy escribiendo en la terminal

**Pasos:**
- Verificar archivo o ruta
- Determinar si es absoluta o relativa.
- Transformar ruta relativa en absoluta
- Si esta absoluta, esta ok.   

 **Historia 2:**
 
Yo como developer quiero que la aplicación sea capaz de discernir rutas archivos o directorios

**Pasos:**
- Verificar si es dir o archivo.md
- Identifica archivo .md
- Si es directorio o directorios, buscar dentro archivos.md

 **Historia 3:**
 
Como usuario quiero que el software sea capaz de leer archivos .md, recorre el contenido de dichos archivos y que en liste los links.

**Pasos:**

- Lea archivos extensión .md
- Busque links dentro del archivo .md
- Cada link se guarde dentro de un array de objetos
- Cada link tiene propiedades: href, texto <a> y un file
- href: URL encontrada.
- Text: Texto que aparecía dentro del link  < a > truncado a 50 caracteres 
- file: Ruta del archivo donde se encontró el link.
- Que se impriman en terminal los links encontrados
- Imprimir en pantalla las options --validate, --stats y --validate + --stats

## 3. Proceso creativo:

*  #### 3.1 Diagrama de flujo
![diagrama](http://imgfz.com/i/oB1D9PL.png)

*  #### 3.2 Imagen del producto:
![imagen1](http://imgfz.com/i/KPaofcb.jpeg)
![imagen2](http://imgfz.com/i/QtGOskn.jpeg)


## 4. Organización y planificación:

- Nuestro equipo se planifico con distintas herramientas de trabajo tales como Trello y Miro
- ![trello](http://imgfz.com/i/uJnvmP6.png)
- ![miro](http://imgfz.com/i/7OrsdFk.jpeg)


  

## 5. Objetivos de aprendizaje:

A continuación puedes ver los objetivos de aprendizaje de este proyecto:

  

###  JavaScript

  

* [x] Uso de condicionales (if-else | switch | operador ternario)

* [x] Uso de funciones (parámetros | argumentos | valor de retorno)

* [x] Manipular arrays (filter | map | sort | reduce)

* [x] Manipular objects (key | value)

* [x] Uso ES modules ([`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)

| [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export))

* [x] [Uso de callbacks.](https://developer.mozilla.org/es/docs/Glossary/Callback_function)

* [x] [Consumo de Promesas.](https://scotch.io/tutorials/javascript-promises-for-dummies#toc-consuming-promises)

* [x] [Creación de Promesas.](https://www.freecodecamp.org/news/how-to-write-a-javascript-promise-4ed8d44292b8/)

  

###  Node

  

* [x] Uso de sistema de archivos. ([fs](https://nodejs.org/api/fs.html), [path](https://nodejs.org/api/path.html))

* [x] Instalar y usar módulos. ([npm](https://www.npmjs.com/))

* [x] Creación de modules. [(CommonJS)](https://nodejs.org/docs/latest-v0.10.x/api/modules.html)

* [x] [Configuración de package.json.](https://docs.npmjs.com/files/package.json)

* [x] [Configuración de npm-scripts](https://docs.npmjs.com/misc/scripts)

* [x] Uso de CLI (Command Line Interface - Interfaz de Línea de Comando)

  

###  Testing

  

* [ ] [Testeo unitario.](https://jestjs.io/docs/es-ES/getting-started)

* [ ] [Testeo asíncrono.](https://jestjs.io/docs/es-ES/asynchronous)

* [ ] Uso de Mocks manuales.

  

###  Estructura del código y guía de estilo

  

* [x] Organizar y dividir el código en módulos (Modularización)

* [x] Uso de identificadores descriptivos (Nomenclatura | Semántica)

* [x] Uso de linter (ESLINT)

  

###  Git y GitHub

  

* [x] Uso de comandos de git (add | commit | pull | status | push)

* [x] Manejo de repositorios de GitHub (clone | fork | gh-pages)

* [x] Colaboración en Github (branches | pull requests | |tags)

* [x] Organización en Github (projects | issues | labels | milestones)

  

###  HTTP

  

* [x] Verbos HTTP ([http.get](https://nodejs.org/api/http.html#http_http_get_options_callback))

  

###  Fundamentos de programación

  

* [x] [Recursión.](https://www.youtube.com/watch?v=lPPgY3HLlhQ)
